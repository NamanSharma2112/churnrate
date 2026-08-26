/**
 * Runs churn predictions over a set of customers and writes the results back.
 * Shared by the import flow, the Stripe sync, and the manual batch endpoint so
 * they cannot drift apart.
 */
import { prisma } from "../config/database.js";
import {
  predictMany,
  deriveHealthScore,
  engagementTrendFor,
} from "./churn-scoring.js";
import { emitToTenant } from "./websocket.js";

export interface ScoringResult {
  scored: number;
  atRisk: number;
  modelVersion: string | null;
}

/**
 * @param customerIds Restricts scoring to these customers; omit to score the
 *                    whole tenant.
 */
export async function scoreAndPersist(
  tenantId: string,
  customerIds?: string[]
): Promise<ScoringResult> {
  const customers = await prisma.customer.findMany({
    where: {
      tenantId,
      ...(customerIds?.length ? { id: { in: customerIds } } : {}),
    },
    select: {
      id: true,
      mrr: true,
      plan: true,
      healthScore: true,
      signupDate: true,
      lastActiveAt: true,
      supportTickets: true,
      featureUsagePct: true,
      loginFrequency: true,
      npsScore: true,
    },
  });

  if (customers.length === 0) {
    return { scored: 0, atRisk: 0, modelVersion: null };
  }

  const predictions = await predictMany(customers);

  let atRisk = 0;
  let modelVersion: string | null = null;

  for (const customer of customers) {
    const prediction = predictions.get(customer.id);
    if (!prediction) continue;

    modelVersion ??= prediction.model_version ?? null;
    if (prediction.risk_level === "high" || prediction.risk_level === "critical") atRisk++;

    // Companies that do not send a health score get one derived from their own
    // signals, so the column is meaningful rather than a flat 50.
    const healthScore =
      customer.healthScore === 50 ? deriveHealthScore(customer) : customer.healthScore;

    await prisma.$transaction([
      prisma.prediction.create({
        data: {
          customerId: customer.id,
          probability: prediction.probability,
          riskLevel: prediction.risk_level,
          topFactors: prediction.top_factors,
          modelVersion: prediction.model_version ?? null,
        },
      }),
      prisma.customer.update({
        where: { id: customer.id },
        data: {
          churnRisk: prediction.probability,
          riskLevel: prediction.risk_level,
          healthScore,
          engagementTrend: engagementTrendFor(customer),
        },
      }),
    ]);
  }

  emitToTenant(tenantId, "predictions:updated", {
    scored: customers.length,
    atRisk,
  });

  return { scored: customers.length, atRisk, modelVersion };
}
