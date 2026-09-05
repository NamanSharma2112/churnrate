import { Router } from "express";
import { z } from "zod";
import { prisma } from "../config/database.js";
import { authenticate } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { config } from "../config/index.js";
import { predictOne, buildFeatures } from "../services/churn-scoring.js";
import { scoreAndPersist } from "../services/scoring-runner.js";

const router = Router();

router.use(authenticate);

const predictSchema = z.object({
  customerId: z.string().uuid(),
});

router.post("/predict", validate(predictSchema), async (req, res) => {
  try {
    const { customerId } = req.body;
    const customer = await prisma.customer.findFirst({
      where: { id: customerId, tenantId: req.user!.tenantId },
    });

    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }

    const prediction = await predictOne(customer);

    const saved = await prisma.prediction.create({
      data: {
        customerId: customer.id,
        probability: prediction.probability,
        riskLevel: prediction.risk_level,
        topFactors: prediction.top_factors,
        modelVersion: prediction.model_version ?? null,
      },
    });

    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        churnRisk: prediction.probability,
        riskLevel: prediction.risk_level,
      },
    });

    res.json({ prediction: saved, features: buildFeatures(customer) });
  } catch (err) {
    console.error("Prediction error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Scores every customer in the tenant. Runs inline rather than returning a fake
 * job id, so the caller knows the work actually happened.
 */
router.post("/batch", async (req, res) => {
  try {
    const result = await scoreAndPersist(req.user!.tenantId);

    res.json({
      message:
        result.scored === 0
          ? "No customers to score yet — import your data first"
          : `Scored ${result.scored} customer${result.scored === 1 ? "" : "s"}`,
      scored: result.scored,
      atRisk: result.atRisk,
      modelVersion: result.modelVersion,
    });
  } catch (err) {
    console.error("Batch prediction error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Human-readable names for the raw feature keys the model reports.
const FEATURE_LABELS: Record<string, string> = {
  health_score: "Health Score",
  days_since_active: "Days Since Active",
  days_since_signup: "Tenure",
  mrr: "Monthly Revenue",
  plan: "Plan Tier",
  support_tickets: "Support Tickets",
  login_frequency: "Login Frequency",
  usage_drop: "Usage Drop",
};

router.get("/feature-importance", async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;

    // topFactors is stored per prediction, so average each feature's impact
    // across the tenant's recent predictions.
    const predictions = await prisma.prediction.findMany({
      where: { customer: { tenantId } },
      select: { topFactors: true },
      orderBy: { createdAt: "desc" },
      take: 500,
    });

    const totals = new Map<string, { sum: number; count: number }>();
    for (const prediction of predictions) {
      const factors = prediction.topFactors;
      if (!Array.isArray(factors)) continue;

      for (const factor of factors) {
        if (typeof factor !== "object" || factor === null) continue;
        const { feature, impact } = factor as {
          feature?: unknown;
          impact?: unknown;
        };
        if (typeof feature !== "string" || typeof impact !== "number") continue;

        const entry = totals.get(feature) ?? { sum: 0, count: 0 };
        entry.sum += Math.abs(impact);
        entry.count += 1;
        totals.set(feature, entry);
      }
    }

    const features = [...totals.entries()]
      .map(([feature, { sum, count }]) => ({
        feature: FEATURE_LABELS[feature] ?? feature,
        importance: parseFloat((sum / count).toFixed(3)),
      }))
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 8);

    res.json({ features, sampleSize: predictions.length });
  } catch (err) {
    console.error("Feature importance error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/history/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId as string;

    // Scope the lookup to the tenant so ids cannot be probed across accounts.
    const customer = await prisma.customer.findFirst({
      where: { id: customerId, tenantId: req.user!.tenantId },
      select: { id: true },
    });

    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }

    const predictions = await prisma.prediction.findMany({
      where: { customerId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    res.json({ predictions });
  } catch (err) {
    console.error("Prediction history error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/** Model metadata for the ML Models page — real numbers, not hard-coded ones. */
router.get("/model/info", async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;

    let service: Record<string, unknown> | null = null;
    try {
      const response = await fetch(`${config.mlServiceUrl}/api/model/info`, {
        signal: AbortSignal.timeout(5000),
      });
      if (response.ok) service = (await response.json()) as Record<string, unknown>;
    } catch {
      // Service down — reported as offline below.
    }

    const [total, scored, latest] = await Promise.all([
      prisma.customer.count({ where: { tenantId } }),
      // Counted by "has a stored prediction", not "churnRisk > 0" — a genuinely
      // healthy customer scores 0.0000 and was being reported as unscored.
      prisma.customer.count({ where: { tenantId, predictions: { some: {} } } }),
      prisma.prediction.findFirst({
        where: { customer: { tenantId } },
        orderBy: { createdAt: "desc" },
        select: { createdAt: true, modelVersion: true },
      }),
    ]);

    res.json({
      online: service !== null,
      version: (service?.version as string) ?? latest?.modelVersion ?? null,
      metrics: (service?.metrics as Record<string, number>) ?? null,
      coverage: {
        totalCustomers: total,
        scoredCustomers: scored,
        lastRunAt: latest?.createdAt ?? null,
      },
    });
  } catch (err) {
    console.error("Model info error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/** Feature importance for the ML Models page. */
router.get("/feature-importance", async (req, res) => {
  try {
    const predictions = await prisma.prediction.findMany({
      where: { customer: { tenantId: req.user!.tenantId } },
      orderBy: { createdAt: "desc" },
      take: 200,
      select: { topFactors: true },
    });

    // Average the per-customer factors so the chart reflects this tenant's data.
    const totals = new Map<string, { sum: number; count: number }>();
    for (const row of predictions) {
      const factors = row.topFactors as { feature: string; impact: number }[] | null;
      if (!Array.isArray(factors)) continue;
      for (const factor of factors) {
        const entry = totals.get(factor.feature) ?? { sum: 0, count: 0 };
        entry.sum += Math.abs(factor.impact);
        entry.count += 1;
        totals.set(factor.feature, entry);
      }
    }

    const features = Array.from(totals.entries())
      .map(([feature, { sum, count }]) => ({
        feature,
        importance: Math.round((sum / count) * 1000) / 1000,
      }))
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 8);

    res.json({ features });
  } catch (err) {
    console.error("Feature importance error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
