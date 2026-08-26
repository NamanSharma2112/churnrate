import { Router } from "express";
import { z } from "zod";
import { prisma } from "../config/database.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  detectMapping,
  normalizeRows,
  FIELD_SPECS,
  CANONICAL_FIELDS,
  type CanonicalField,
} from "../services/schema-mapping.js";
import { scoreAndPersist } from "../services/scoring-runner.js";
import { emitToTenant } from "../services/websocket.js";

const router = Router();

router.use(authenticate);

/** A spreadsheet cell — anything JSON can carry. */
const cellSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
const rowsSchema = z.array(z.record(z.string(), cellSchema)).min(1).max(50000);

/**
 * Describes the fields the platform understands, so the import UI can render a
 * mapping editor without hard-coding the list.
 */
router.get("/schema", (_req, res) => {
  res.json({
    fields: CANONICAL_FIELDS.map((field) => ({
      field,
      label: FIELD_SPECS[field].label,
      description: FIELD_SPECS[field].description,
      type: FIELD_SPECS[field].type,
      required: field === "email",
      examples: FIELD_SPECS[field].aliases.slice(0, 4),
    })),
  });
});

const analyzeSchema = z.object({
  rows: rowsSchema,
  fileName: z.string().optional(),
});

/**
 * Dry run: works out which column means what and returns a preview, so the user
 * can confirm or correct the mapping before anything is written.
 */
router.post("/analyze", validate(analyzeSchema), (req, res) => {
  try {
    const { rows } = req.body as { rows: Record<string, unknown>[] };
    const detected = detectMapping(rows);
    const { rows: normalized, errors } = normalizeRows(rows, detected.mapping, detected.unmapped);

    res.json({
      rowCount: rows.length,
      columns: Object.keys(rows[0] ?? {}),
      mapping: detected.mapping,
      matches: detected.matches,
      unmapped: detected.unmapped,
      missingRequired: detected.missingRequired,
      canImport: detected.missingRequired.length === 0 && normalized.length > 0,
      validRows: normalized.length,
      invalidRows: errors.length,
      errors: errors.slice(0, 20),
      // A sample of exactly what would be written, in our own vocabulary.
      preview: normalized.slice(0, 10),
    });
  } catch (err) {
    console.error("Analyze error:", err);
    res.status(500).json({ message: "Could not analyse this file" });
  }
});

const mappingSchema = z
  .record(z.string(), z.string())
  .refine(
    (m) => Object.keys(m).every((k) => (CANONICAL_FIELDS as string[]).includes(k)),
    { message: "Mapping contains an unknown field" }
  );

const importSchema = z.object({
  rows: rowsSchema.optional(),
  /** Legacy shape: already-canonical records. */
  customers: z.array(z.record(z.string(), cellSchema)).optional(),
  mapping: mappingSchema.optional(),
  fileName: z.string().optional(),
  /** Run churn predictions on the imported rows (default on). */
  predict: z.boolean().default(true),
});

/**
 * Imports rows in whatever shape the company exports them, then scores the
 * affected customers so the dashboard is populated immediately.
 */
router.post(
  "/import",
  authorize("admin", "analyst"),
  validate(importSchema),
  async (req, res) => {
    try {
      const body = req.body as {
        rows?: Record<string, unknown>[];
        customers?: Record<string, unknown>[];
        mapping?: Record<string, string>;
        fileName?: string;
        predict: boolean;
      };

      const rawRows = body.rows ?? body.customers;
      if (!rawRows?.length) {
        res.status(400).json({ message: "No rows to import" });
        return;
      }

      const tenantId = req.user!.tenantId;

      // An explicit mapping from the confirmation step wins; otherwise detect it.
      const detected = detectMapping(rawRows);
      const mapping = (body.mapping ?? detected.mapping) as Partial<
        Record<CanonicalField, string>
      >;
      const mappedColumns = new Set(Object.values(mapping));
      const unmapped = Array.from(
        rawRows.reduce<Set<string>>((set, row) => {
          Object.keys(row).forEach((k) => {
            if (!mappedColumns.has(k)) set.add(k);
          });
          return set;
        }, new Set())
      );

      if (!mapping.email) {
        res.status(400).json({
          message:
            "No email column found. Map one of your columns to Email and try again.",
          columns: Object.keys(rawRows[0] ?? {}),
          suggestion: detected.mapping,
        });
        return;
      }

      const { rows, errors } = normalizeRows(rawRows, mapping, unmapped);

      let imported = 0;
      let updated = 0;
      const touchedIds: string[] = [];

      for (const row of rows) {
        try {
          const existing = await prisma.customer.findUnique({
            where: { email_tenantId: { email: row.email, tenantId } },
            select: { id: true },
          });

          const data = {
            name: row.name,
            company: row.company,
            plan: row.plan,
            mrr: row.mrr,
            ...(row.healthScore !== null ? { healthScore: row.healthScore } : {}),
            ...(row.signupDate ? { signupDate: row.signupDate } : {}),
            ...(row.lastActiveAt ? { lastActiveAt: row.lastActiveAt } : {}),
            supportTickets: row.supportTickets,
            featureUsagePct: row.featureUsagePct,
            loginFrequency: row.loginFrequency,
            npsScore: row.npsScore,
            contractValue: row.contractValue,
            externalId: row.externalId,
            attributes: row.attributes as object,
            source: "csv",
          };

          const customer = existing
            ? await prisma.customer.update({ where: { id: existing.id }, data })
            : await prisma.customer.create({
                data: { ...data, email: row.email, tenantId },
              });

          touchedIds.push(customer.id);
          if (existing) updated++;
          else imported++;
        } catch (err) {
          errors.push({ email: row.email, row: 0, error: (err as Error).message });
        }
      }

      const batch = await prisma.importBatch.create({
        data: {
          tenantId,
          source: "csv",
          fileName: body.fileName ?? null,
          rowCount: rawRows.length,
          imported,
          updated,
          skipped: errors.length,
          mapping: mapping as object,
          errors: errors.slice(0, 50) as object,
        },
      });

      if (imported > 0) {
        await prisma.event.create({
          data: {
            type: "signup",
            message: `Imported ${imported} new customer${imported === 1 ? "" : "s"}${
              body.fileName ? ` from ${body.fileName}` : ""
            }`,
            tenantId,
          },
        });
      }

      // Score right away so the dashboard is never blank after an import.
      let scored = 0;
      if (body.predict && touchedIds.length > 0) {
        const result = await scoreAndPersist(tenantId, touchedIds);
        scored = result.scored;
      }

      emitToTenant(tenantId, "import:complete", {
        batchId: batch.id,
        imported,
        updated,
        scored,
      });

      res.json({
        message: `Import complete: ${imported} added, ${updated} updated, ${errors.length} skipped`,
        batchId: batch.id,
        imported,
        updated,
        skipped: errors.length,
        scored,
        mapping,
        errors: errors.slice(0, 10),
      });
    } catch (err) {
      console.error("Import error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

/** Import history for the data page. */
router.get("/imports", async (req, res) => {
  try {
    const batches = await prisma.importBatch.findMany({
      where: { tenantId: req.user!.tenantId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    res.json({ imports: batches });
  } catch (err) {
    console.error("Import history error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
