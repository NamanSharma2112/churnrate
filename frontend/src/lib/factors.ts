/**
 * Human names for the model's feature keys. Two registers: `reason` phrases a
 * signal as why a customer is at risk; `feature` names the input neutrally for
 * the model page.
 */
const NAMES: Record<string, { reason: string; feature: string }> = {
  days_since_active: { reason: "Gone quiet", feature: "Days since active" },
  health_score: { reason: "Low health score", feature: "Health score" },
  support_tickets: { reason: "Support load", feature: "Support tickets" },
  nps_score: { reason: "Poor NPS", feature: "NPS score" },
  login_frequency: { reason: "Rare logins", feature: "Login frequency" },
  feature_usage_pct: { reason: "Low feature usage", feature: "Feature usage" },
  mrr: { reason: "Low spend", feature: "Monthly revenue" },
  plan_encoded: { reason: "Plan tier", feature: "Plan tier" },
  activity_ratio: { reason: "Inactivity vs tenure", feature: "Inactivity vs tenure" },
  engagement_score: { reason: "Weak engagement", feature: "Engagement score" },
  days_since_signup: { reason: "Account age", feature: "Account age" },
};

/** The API already sends human labels for some keys (e.g. "Days Since Active"). */
export function reasonLabel(key: string) {
  return NAMES[key]?.reason ?? key;
}

export function featureLabel(key: string) {
  return NAMES[key]?.feature ?? key;
}
