import { Router, raw } from "express";
import { z } from "zod";
import { prisma } from "../config/database.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { encrypt, decrypt, maskSecret } from "../services/crypto.js";
import {
  verifyKey,
  fetchCustomers,
  verifyWebhookSignature,
  StripeError,
} from "../services/stripe.js";
import { scoreAndPersist } from "../services/scoring-runner.js";
import { emitToTenant } from "../services/websocket.js";

const router = Router();

/* ------------------------------------------------------------------ *
 * Webhook — must be public and read the raw body for signature checks,
 * so it is declared before the auth middleware below.
 * ------------------------------------------------------------------ */

router.post(
  "/stripe/webhook",
  raw({ type: "application/json" }),
  async (req, res) => {
    const signature = req.headers["stripe-signature"];
    if (typeof signature !== "string") {
      res.status(400).json({ message: "Missing signature" });
      return;
    }

    const payload = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : "";

    let event: { type?: string; data?: { object?: Record<string, unknown> } };
    try {
      event = JSON.parse(payload);
    } catch {
      res.status(400).json({ message: "Invalid payload" });
      return;
    }

    // The account id on the event tells us which tenant it belongs to.
    const accountId =
      typeof (event as { account?: string }).account === "string"
        ? (event as { account: string }).account
        : null;

    const integrations = await prisma.integration.findMany({
      where: { provider: "stripe", status: "connected" },
    });

    const integration = integrations.find((row) => {
      const settings = row.settings as { accountId?: string; webhookSecret?: string };
      return accountId ? settings.accountId === accountId : true;
    });

    if (!integration) {
      // Nothing to attribute this to; acknowledge so Stripe stops retrying.
      res.json({ received: true, handled: false });
      return;
    }

    const settings = integration.settings as { webhookSecret?: string };
    if (settings.webhookSecret) {
      const valid = verifyWebhookSignature(payload, signature, settings.webhookSecret);
      if (!valid) {
        res.status(400).json({ message: "Signature verification failed" });
        return;
      }
    }

    const object = event.data?.object ?? {};
    const customerId = typeof object.customer === "string" ? object.customer : null;

    // Billing events that change churn risk warrant an immediate re-score.
    const rescoreEvents = [
      "customer.subscription.deleted",
      "customer.subscription.updated",
      "customer.subscription.created",
      "invoice.payment_failed",
      "invoice.payment_succeeded",
    ];

    if (event.type && rescoreEvents.includes(event.type) && customerId) {
      const customer = await prisma.customer.findFirst({
        where: { tenantId: integration.tenantId, sourceId: customerId },
        select: { id: true, company: true, name: true },
      });

      if (customer) {
        await prisma.event.create({
          data: {
            type:
              event.type === "customer.subscription.deleted"
                ? "churn"
                : event.type === "invoice.payment_failed"
                  ? "warning"
                  : "upgrade",
            message: `Stripe: ${event.type.replace(/\./g, " ")}`,
            customerId: customer.id,
            tenantId: integration.tenantId,
            metadata: { stripeEvent: event.type },
          },
        });

        await scoreAndPersist(integration.tenantId, [customer.id]);
        emitToTenant(integration.tenantId, "customer:updated", {
          customerId: customer.id,
        });
      }
    }

    res.json({ received: true, handled: true });
  }
);

/* ------------------------------------------------------------------ *
 * Authenticated management endpoints
 * ------------------------------------------------------------------ */

router.use(authenticate);

/** Connection status for every provider, with secrets masked. */
router.get("/", async (req, res) => {
  try {
    const integrations = await prisma.integration.findMany({
      where: { tenantId: req.user!.tenantId },
    });

    res.json({
      integrations: integrations.map((row) => {
        const settings = row.settings as { accountName?: string; keyHint?: string };
        return {
          provider: row.provider,
          status: row.status,
          accountName: row.accountName,
          keyHint: settings.keyHint ?? null,
          lastSyncedAt: row.lastSyncedAt,
          lastSyncStats: row.lastSyncStats,
        };
      }),
    });
  } catch (err) {
    console.error("List integrations error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const connectSchema = z.object({
  apiKey: z
    .string()
    .min(20, "That does not look like a Stripe secret key")
    .refine(
      (key) => key.startsWith("sk_") || key.startsWith("rk_"),
      "Use a Stripe secret key (sk_…) or restricted key (rk_…)"
    ),
  webhookSecret: z.string().optional(),
});

/**
 * Connects a Stripe account. We verify the key against Stripe before storing it
 * so a typo fails here rather than silently at sync time.
 */
router.post(
  "/stripe/connect",
  authorize("admin"),
  validate(connectSchema),
  async (req, res) => {
    try {
      const { apiKey, webhookSecret } = req.body as {
        apiKey: string;
        webhookSecret?: string;
      };

      const account = await verifyKey(apiKey);
      const tenantId = req.user!.tenantId;

      await prisma.integration.upsert({
        where: { tenantId_provider: { tenantId, provider: "stripe" } },
        create: {
          tenantId,
          provider: "stripe",
          status: "connected",
          credentials: encrypt(apiKey),
          accountName: account.name,
          settings: {
            accountId: account.id,
            keyHint: maskSecret(apiKey),
            livemode: apiKey.includes("_live_"),
            ...(webhookSecret ? { webhookSecret } : {}),
          },
        },
        update: {
          status: "connected",
          credentials: encrypt(apiKey),
          accountName: account.name,
          settings: {
            accountId: account.id,
            keyHint: maskSecret(apiKey),
            livemode: apiKey.includes("_live_"),
            ...(webhookSecret ? { webhookSecret } : {}),
          },
        },
      });

      res.json({
        message: `Connected to ${account.name}`,
        provider: "stripe",
        accountName: account.name,
        keyHint: maskSecret(apiKey),
        livemode: apiKey.includes("_live_"),
      });
    } catch (err) {
      if (err instanceof StripeError) {
        res.status(err.status === 401 ? 401 : 400).json({ message: err.message });
        return;
      }
      console.error("Stripe connect error:", err);
      res.status(500).json({ message: "Could not connect to Stripe" });
    }
  }
);

/**
 * Pulls the Stripe account into the platform and scores everything it imported.
 */
router.post("/stripe/sync", authorize("admin", "analyst"), async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;
    const integration = await prisma.integration.findUnique({
      where: { tenantId_provider: { tenantId, provider: "stripe" } },
    });

    if (!integration || integration.status !== "connected") {
      res.status(404).json({ message: "Stripe is not connected" });
      return;
    }

    const apiKey = decrypt(integration.credentials);
    const records = await fetchCustomers(apiKey);

    let imported = 0;
    let updated = 0;
    let churned = 0;
    const touchedIds: string[] = [];

    for (const record of records) {
      const existing = await prisma.customer.findUnique({
        where: { email_tenantId: { email: record.email, tenantId } },
        select: { id: true },
      });

      const data = {
        name: record.name,
        company: record.company,
        plan: record.plan,
        mrr: record.mrr,
        signupDate: record.signupDate,
        lastActiveAt: record.lastActiveAt,
        ...(record.healthScore !== null ? { healthScore: record.healthScore } : {}),
        ...(record.supportTickets !== null
          ? { supportTickets: record.supportTickets }
          : {}),
        source: "stripe",
        sourceId: record.sourceId,
        attributes: record.attributes as object,
      };

      const customer = existing
        ? await prisma.customer.update({ where: { id: existing.id }, data })
        : await prisma.customer.create({ data: { ...data, email: record.email, tenantId } });

      touchedIds.push(customer.id);
      if (existing) updated++;
      else imported++;
      if (record.churned) churned++;
    }

    const scoring = await scoreAndPersist(tenantId, touchedIds);

    const stats = {
      imported,
      updated,
      churned,
      scored: scoring.scored,
      atRisk: scoring.atRisk,
      syncedAt: new Date().toISOString(),
    };

    await prisma.integration.update({
      where: { id: integration.id },
      data: { lastSyncedAt: new Date(), lastSyncStats: stats },
    });

    await prisma.importBatch.create({
      data: {
        tenantId,
        source: "stripe",
        fileName: integration.accountName,
        rowCount: records.length,
        imported,
        updated,
        skipped: 0,
        mapping: { provider: "stripe" },
      },
    });

    emitToTenant(tenantId, "integration:synced", { provider: "stripe", ...stats });

    res.json({
      message: `Synced ${records.length} Stripe customers (${imported} new, ${updated} updated)`,
      ...stats,
    });
  } catch (err) {
    if (err instanceof StripeError) {
      res.status(400).json({ message: err.message });
      return;
    }
    console.error("Stripe sync error:", err);
    res.status(500).json({ message: "Stripe sync failed" });
  }
});

router.delete("/stripe", authorize("admin"), async (req, res) => {
  try {
    await prisma.integration.deleteMany({
      where: { tenantId: req.user!.tenantId, provider: "stripe" },
    });
    res.json({ message: "Stripe disconnected" });
  } catch (err) {
    console.error("Stripe disconnect error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
