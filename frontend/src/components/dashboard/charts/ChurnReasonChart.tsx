"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Alert01Icon } from "hugeicons-react";
import { useDashboardStore } from "@/store/dashboard";
import { EmptyState } from "@/components/ui/empty-state";
import { ChartPanel, tooltipStyle } from "./ChartPanel";

interface Factor {
  feature: string;
  label?: string;
  impact: number;
  direction?: string;
}

const LABELS: Record<string, string> = {
  days_since_active: "Gone quiet",
  health_score: "Low health score",
  support_tickets: "Support load",
  nps_score: "Poor NPS",
  login_frequency: "Rare logins",
  feature_usage_pct: "Low feature usage",
  mrr: "Low spend",
  plan_encoded: "Plan tier",
  activity_ratio: "Inactivity vs tenure",
  engagement_score: "Weak engagement",
  days_since_signup: "Account age",
};

/**
 * Aggregates the per-customer risk factors the model returned for at-risk
 * accounts, so this reflects why *these* customers are leaving rather than a
 * hard-coded survey.
 */
export function ChurnReasonChart() {
  const { atRiskCustomers } = useDashboardStore();

  const data = useMemo(() => {
    const totals = new Map<string, number>();

    for (const customer of atRiskCustomers) {
      const factors = (customer as { topFactors?: Factor[] }).topFactors ?? [];
      for (const factor of factors) {
        // Only signals pushing the customer toward churn belong here.
        if (factor.direction === "reduces_risk") continue;
        totals.set(factor.feature, (totals.get(factor.feature) ?? 0) + Math.abs(factor.impact));
      }
    }

    return Array.from(totals.entries())
      .map(([feature, weight]) => ({
        reason: LABELS[feature] ?? feature,
        weight: Math.round(weight * 100) / 100,
      }))
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 6);
  }, [atRiskCustomers]);

  return (
    <ChartPanel
      title="Top Churn Drivers"
      description="Signals pushing your at-risk accounts toward churn"
    >
      {data.length === 0 ? (
        <EmptyState
          compact
          icon={Alert01Icon}
          title="No at-risk accounts"
          description="Churn drivers appear once the model flags customers as high risk."
        />
      ) : (
        <div className="h-full min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 16, left: 8, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={false} />
              <XAxis type="number" stroke="#a3a3a3" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="reason"
                stroke="#525252"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={120}
              />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f5f5f5" }} />
              <Bar dataKey="weight" fill="#f97316" radius={[0, 4, 4, 0]} barSize={20} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartPanel>
  );
}
