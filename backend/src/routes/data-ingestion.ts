import { Router } from "express";
import { z } from "zod";
import { prisma } from "../config/database.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.use(authenticate);

const bulkImportSchema = z.object({
  customers: z.array(
    z.object({
      name: z.string(),
      email: z.string().email(),
      company: z.string().optional(),
      plan: z.enum(["free", "starter", "pro", "enterprise"]).default("free"),
      mrr: z.number().min(0).default(0),
      signupDate: z.string().optional(),
    })
  ),
});

router.post(
  "/import",
  authorize("admin", "analyst"),
  validate(bulkImportSchema),
  async (req, res) => {
    try {
      const { customers } = req.body;
      const tenantId = req.user!.tenantId;

      let imported = 0;
      let skipped = 0;
      const errors: { email: string; error: string }[] = [];

      for (const c of customers) {
        try {
          await prisma.customer.upsert({
            where: { email_tenantId: { email: c.email, tenantId } },
            create: {
              ...c,
              tenantId,
              signupDate: c.signupDate ? new Date(c.signupDate) : new Date(),
            },
            update: {
              name: c.name,
              company: c.company,
              plan: c.plan,
              mrr: c.mrr,
            },
          });
          imported++;
        } catch (err) {
          skipped++;
          errors.push({
            email: c.email,
            error: (err as Error).message,
          });
        }
      }

      res.json({
        message: `Import complete: ${imported} imported, ${skipped} skipped`,
        imported,
        skipped,
        errors: errors.slice(0, 10),
      });
    } catch (err) {
      console.error("Import error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
