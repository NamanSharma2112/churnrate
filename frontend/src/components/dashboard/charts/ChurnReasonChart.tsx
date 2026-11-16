"use client";

import { useMemo } from "react";
import { TriangleAlert } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard";
import { EmptyState } from "@/components/ui/empty-state";
import { RankedBars } from "@/components/charts/RankedBars";
import { reasonLabel } from "@/lib/factors";
import { ChartPanel } from "./ChartPanel";

interface Factor {
  feature: string;
  label?: string;
  impact: number;
  direction?: string;
}

/**
 * Aggregates the per-customer risk factors the model returned for at-risk
 * accounts, so this reflects why *these* customers are leaving rather than a
 * hard-coded survey.
 */
export function ChurnReasonChart() {
  const { atRiskCustomers, loaded } = useDashboardStore();

  const rows = useMemo(() => {
    const totals = new Map<string, number>();
    for (const customer of atRiskCustomers) {
      const factors = (customer as { topFactors?: Factor[] }).topFactors ?? [];
      for (const factor of factors) {
        // Only signals pushing the customer toward churn belong here.
        if (factor.direction === "reduces_risk") continue;
        totals.set(factor.feature, (totals.get(factor.feature) ?? 0) + Math.abs(factor.impact));
      }
    }
    const sum = Array.from(totals.values()).reduce((a, b) => a + b, 0) || 1;
    return Array.from(totals.entries())
      .map(([feature, weight]) => ({
        key: feature,
        label: reasonLabel(feature),
        value: weight,
        display: `${Math.round((weight / sum) * 100)}%`,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [atRiskCustomers]);

  return (
    <ChartPanel title="Why customers are at risk" description="Share of model weight across high-risk accounts">
      {rows.length === 0 ? (
        loaded ? (
          <EmptyState
            icon={TriangleAlert}
            title="No risk drivers yet"
            description="Once accounts cross the high-risk threshold, the signals behind them appear here."
            compact
          />
        ) : (
          <div className="h-[160px]" />
        )
      ) : (
        <RankedBars rows={rows} color="var(--series-2)" ariaLabel="Risk drivers by share of model weight" />
      )}
    </ChartPanel>
  );
}
