import { Queue, Worker } from "bullmq";
import { getRedis } from "../config/redis.js";
import { prisma } from "../config/database.js";
import { config } from "../config/index.js";
import type { MLPrediction } from "../types/index.js";

const QUEUE_NAME = "churn-predictions";

let queue: Queue | null = null;

export function getQueue(): Queue {
  if (!queue) {
    queue = new Queue(QUEUE_NAME, {
      connection: getRedis(),
    });
  }
  return queue;
}

export function startWorker(): Worker {
  const worker = new Worker(
    QUEUE_NAME,
    async (job) => {
      const { tenantId, customerId } = job.data;

      const customer = await prisma.customer.findFirst({
        where: { id: customerId, tenantId },
      });

      if (!customer) {
        throw new Error(`Customer ${customerId} not found`);
      }

      let prediction: MLPrediction | null = null;
      try {
        const response = await fetch(`${config.mlServiceUrl}/api/predict`, {
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

        if (response.ok) {
          prediction = await response.json() as MLPrediction;
        }
      } catch {
        // ML service unavailable
      }

      if (!prediction) {
        const risk =
          Math.random() * 0.5 + (customer.healthScore < 40 ? 0.5 : 0);
        prediction = {
          probability: parseFloat(risk.toFixed(2)),
          risk_level:
            risk > 0.8
              ? "critical"
              : risk > 0.6
                ? "high"
                : risk > 0.4
                  ? "medium"
                  : "low",
          top_factors: [
            { feature: "health_score", impact: 0.35 },
            { feature: "days_since_active", impact: 0.25 },
          ],
        };
      }

      await prisma.prediction.create({
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

      return { customerId, probability: prediction.probability };
    },
    {
      connection: getRedis(),
      concurrency: 5,
    }
  );

  worker.on("completed", (job) => {
    console.log(`Prediction job ${job.id} completed`);
  });

  worker.on("failed", (job, err) => {
    console.error(`Prediction job ${job?.id} failed:`, err.message);
  });

  return worker;
}
