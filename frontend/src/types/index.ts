export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: "free" | "starter" | "pro" | "enterprise";
  mrr: number;
  churnRisk: number;
  lastActive: string;
  signupDate: string;
  healthScore: number;
  engagementTrend: "up" | "down" | "stable";
  // Returned by the API (mock records only carry the display-only `lastActive`).
  lastActiveAt?: string;
  riskLevel?: "low" | "medium" | "high" | "critical";
}

export interface ChurnPrediction {
  customerId: string;
  probability: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  topFactors: { feature: string; impact: number }[];
  predictedDate: string;
}

export interface DashboardStats {
  totalCustomers: number;
  totalCustomersChange: number;
  activeCustomers: number;
  activeCustomersChange: number;
  churnRate: number;
  churnRateChange: number;
  mrr: number;
  mrrChange: number;
  atRiskCustomers: number;
  atRiskChange: number;
  avgHealthScore: number;
  avgHealthScoreChange: number;
}

export interface ChurnTrendPoint {
  month: string;
  churnRate: number;
  predicted: number;
}

export interface RiskDistribution {
  level: string;
  count: number;
  percentage: number;
  color: string;
}

export interface RevenueData {
  month: string;
  mrr: number;
  churnedRevenue: number;
  newRevenue: number;
}

export interface ChurnReason {
  reason: string;
  count: number;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
}

export interface PlanUsage {
  plan: string;
  planLabel: string;
  customersTracked: number;
  /** null means the plan has no cap. */
  limit: number | null;
  percentUsed: number | null;
}

export interface ActivityEvent {
  id: string;
  type: "churn" | "signup" | "upgrade" | "downgrade" | "warning";
  message: string;
  customer: string;
  timestamp: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "analyst" | "viewer";
  tenantId: string;
}
