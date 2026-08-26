/**
 * Turns a stored customer into model features, calls the ML service, and falls
 * back to a deterministic heuristic when the service is unreachable.
 *
 * The fallback is intentionally rule-based rather than random: a dashboard that
 * shows different numbers on every refresh is worse than no numbers at all.
 */
import { config } from "../config/index.js";
import type { MLPrediction } from "../types/index.js";

export interface ScorableCustomer {
  id: string;
  mrr: number;
  plan: string;
  healthScore: number;
  signupDate: Date | string;
  lastActiveAt: Date | string;
  supportTickets?: number | null;
  featureUsagePct?: number | null;
  loginFrequency?: number | null;
  npsScore?: number | null;
}

export interface ModelFeatures {
  mrr: number;
  health_score: number;
  plan: string;
  days_since_signup: number;
  days_since_active: number;
  support_tickets: number;
  feature_usage_pct: number;
  login_frequency: number;
  nps_score: number;
}

const DAY_MS = 1000 * 60 * 60 * 24;

function daysSince(value: Date | string): number {
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) return 0;
  return Math.max(0, Math.floor((Date.now() - time) / DAY_MS));
}

/**
 * Derives a health score for companies that do not track one, from the signals
 * they did provide. Recency dominates because it is the signal every dataset has.
 */
export function deriveHealthScore(customer: ScorableCustomer): number {
  const daysSinceActive = daysSince(customer.lastActiveAt);
  const recency = Math.max(0, 100 - daysSinceActive * 2.2);

  const parts: { value: number; weight: number }[] = [{ value: recency, weight: 3 }];

  if (customer.featureUsagePct !== null && customer.featureUsagePct !== undefined) {
    parts.push({ value: customer.featureUsagePct, weight: 2 });
  }
  if (customer.loginFrequency !== null && customer.loginFrequency !== undefined) {
    parts.push({ value: Math.min(customer.loginFrequency / 20, 1) * 100, weight: 1.5 });
  }
  if (customer.npsScore !== null && customer.npsScore !== undefined) {
    parts.push({ value: customer.npsScore * 10, weight: 1.5 });
  }
  if (customer.supportTickets !== null && customer.supportTickets !== undefined) {
    parts.push({ value: Math.max(0, 100 - customer.supportTickets * 12), weight: 1 });
  }

  const total = parts.reduce((sum, p) => sum + p.weight, 0);
  const weighted = parts.reduce((sum, p) => sum + p.value * p.weight, 0) / total;
  return Math.round(Math.min(Math.max(weighted, 0), 100));
}

/**
 * Builds the full feature vector. Anything the company did not supply is
 * estimated from what they did, so the model always sees nine real inputs
 * instead of silently defaulting half of them.
 */
export function buildFeatures(customer: ScorableCustomer): ModelFeatures {
  const daysSinceSignup = daysSince(customer.signupDate);
  const daysSinceActive = daysSince(customer.lastActiveAt);

  const healthScore =
    customer.healthScore > 0 && customer.healthScore !== 50
      ? customer.healthScore
      : deriveHealthScore(customer);

  // Estimates below keep missing columns from pinning every customer to the
  // same default; they scale with the signals we do have.
  const featureUsage =
    customer.featureUsagePct ?? Math.min(Math.max(healthScore * 0.8, 5), 100);
  const loginFrequency =
    customer.loginFrequency ?? Math.max(0, 20 - daysSinceActive * 0.6);
  const npsScore = customer.npsScore ?? Math.min(Math.max(healthScore / 10, 0), 10);
  const supportTickets =
    customer.supportTickets ?? (healthScore < 40 ? 4 : healthScore < 70 ? 2 : 1);

  return {
    mrr: customer.mrr,
    health_score: healthScore,
    plan: customer.plan,
    days_since_signup: daysSinceSignup,
    days_since_active: daysSinceActive,
    support_tickets: Math.round(supportTickets),
    feature_usage_pct: Math.round(featureUsage * 100) / 100,
    login_frequency: Math.round(loginFrequency * 100) / 100,
    nps_score: Math.round(npsScore * 100) / 100,
  };
}

export function riskLevelFor(probability: number): string {
  if (probability > 0.8) return "critical";
  if (probability > 0.6) return "high";
  if (probability > 0.4) return "medium";
  return "low";
}

/**
 * Deterministic logistic fallback mirroring the shape of the trained model, so
 * the platform still ranks customers sensibly with the ML service down.
 */
export function heuristicPrediction(features: ModelFeatures): MLPrediction {
  const terms: { feature: string; contribution: number }[] = [
    { feature: "days_since_active", contribution: features.days_since_active * 0.08 },
    { feature: "health_score", contribution: -features.health_score * 0.04 },
    { feature: "login_frequency", contribution: -features.login_frequency * 0.1 },
    { feature: "support_tickets", contribution: features.support_tickets * 0.15 },
    { feature: "nps_score", contribution: -features.nps_score * 0.2 },
    { feature: "mrr", contribution: -features.mrr * 0.001 },
    { feature: "feature_usage_pct", contribution: -features.feature_usage_pct * 0.02 },
  ];

  const logit = terms.reduce((sum, t) => sum + t.contribution, -3);
  const probability = 1 / (1 + Math.exp(-logit));

  const topFactors = terms
    .filter((t) => t.contribution > 0)
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 5)
    .map((t) => ({
      feature: t.feature,
      impact: Math.round((t.contribution / Math.max(Math.abs(logit), 0.01)) * 1000) / 1000,
    }));

  return {
    probability: Math.round(probability * 10000) / 10000,
    risk_level: riskLevelFor(probability),
    top_factors: topFactors.length > 0 ? topFactors : [{ feature: "health_score", impact: 0.3 }],
    model_version: "heuristic-v1",
  };
}

async function callMl(path: string, body: unknown, timeoutMs = 15000): Promise<unknown | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${config.mlServiceUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function predictOne(customer: ScorableCustomer): Promise<MLPrediction> {
  const features = buildFeatures(customer);
  const result = (await callMl("/api/predict", {
    customer_id: customer.id,
    features,
  })) as MLPrediction | null;

  return result ?? heuristicPrediction(features);
}

/**
 * Scores many customers in one ML round-trip, chunked so a large import does not
 * produce a single oversized request.
 */
export async function predictMany(
  customers: ScorableCustomer[],
  chunkSize = 200
): Promise<Map<string, MLPrediction>> {
  const results = new Map<string, MLPrediction>();

  for (let i = 0; i < customers.length; i += chunkSize) {
    const chunk = customers.slice(i, i + chunkSize);
    const payload = chunk.map((customer) => ({
      customer_id: customer.id,
      features: buildFeatures(customer),
    }));

    const response = (await callMl(
      "/api/predict/batch",
      { customers: payload },
      60000
    )) as { predictions?: MLPrediction[] } | null;

    if (response?.predictions?.length) {
      for (const prediction of response.predictions) {
        if (prediction.customer_id) results.set(prediction.customer_id, prediction);
      }
    }

    // Anything the service did not return (down, partial response) still gets a score.
    for (const customer of chunk) {
      if (!results.has(customer.id)) {
        results.set(customer.id, heuristicPrediction(buildFeatures(customer)));
      }
    }
  }

  return results;
}

/** Engagement direction shown in the tables, derived from recency vs. tenure. */
export function engagementTrendFor(customer: ScorableCustomer): string {
  const daysSinceActive = daysSince(customer.lastActiveAt);
  if (daysSinceActive <= 3) return "up";
  if (daysSinceActive >= 21) return "down";
  return "stable";
}
