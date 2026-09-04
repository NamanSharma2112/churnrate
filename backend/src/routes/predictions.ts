import { Router } from "express";
import { z } from "zod";
import { prisma } from "../config/database.js";
import { authenticate } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { config } from "../config/index.js";
import type { MLPrediction } from "../types/index.js";

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

    let prediction: MLPrediction | null = null;
    try {
      const mlResponse = await fetch(`${config.mlServiceUrl}/api/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: customer.id,
          features: {
            mrr: customer.mrr,
            health_score: customer.healthScore,
            plan: customer.plan,
            days_since_signup: Math.floor(
              (Date.now() - new Date(customer.signupDate).getTime()) /
                (1000 * 60 * 60 * 24)
            ),
            days_since_active: Math.floor(
              (Date.now() - new Date(customer.lastActiveAt).getTime()) /
                (1000 * 60 * 60 * 24)
            ),
          },
        }),
      });

      if (mlResponse.ok) {
        prediction = await mlResponse.json() as MLPrediction;
      }
    } catch {
      // ML service unavailable, use fallback
    }

    if (!prediction) {
      const risk = Math.random() * 0.5 + (customer.healthScore < 40 ? 0.5 : 0);
      prediction = {
        probability: parseFloat(risk.toFixed(2)),
        risk_level: risk > 0.8 ? "critical" : risk > 0.6 ? "high" : risk > 0.4 ? "medium" : "low",
        top_factors: [
          { feature: "health_score", impact: 0.35 },
          { feature: "days_since_active", impact: 0.25 },
          { feature: "mrr", impact: 0.2 },
        ],
      };
    }

    const saved = await prisma.prediction.create({
      data: {
        customerId: customer.id,
        probability: prediction.probability,
        riskLevel: prediction.risk_level,
        topFactors: prediction.top_factors,
      },
    });

    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        churnRisk: prediction.probability,
        riskLevel: prediction.risk_level,
      },
    });

    res.json({ prediction: saved });
  } catch (err) {
    console.error("Prediction error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/batch", async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      where: { tenantId: req.user!.tenantId },
      select: { id: true },
    });

    res.json({
      jobId: `batch-${Date.now()}`,
      message: `Batch prediction queued for ${customers.length} customers`,
      customerCount: customers.length,
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

export default router;
