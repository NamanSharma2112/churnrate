"use client";

import { CircleCheck, CircleDashed, OctagonAlert, ShieldAlert, TriangleAlert } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard";
import { EmptyState } from "@/components/ui/empty-state";
import { SegmentedBar, type Segment } from "@/components/charts/SegmentedBar";
import { money } from "@/lib/format";
import { ChartPanel } from "./ChartPanel";

/** Risk levels are states, so they take the reserved status palette. */
const LEVELS: Record<string, Omit<Segment, "key" | "value" | "label">> = {
  low: { color: "var(--status-good)", ink: "light", icon: CircleCheck },
  medium: { color: "var(--status-warning)", ink: "dark", icon: CircleDashed },
  high: { color: "var(--status-serious)", ink: "dark", icon: TriangleAlert },
  critical: { color: "var(--status-critical)", ink: "light", icon: OctagonAlert },
};

export function RiskDistributionChart() {
  const { riskDistribution, atRiskMrr, stats, loading, loaded } = useDashboardStore();

  const segments: Segment[] = riskDistribution.map((d) => {
    const key = d.level.toLowerCase();
    return { key, label: d.level, value: d.count, ...(LEVELS[key] ?? LEVELS.low) };
  });

  return (
    <ChartPanel title="Risk distribution" description="Customers by churn risk level" dimmed={loading && loaded}>
      {segments.length === 0 ? (
        loaded ? (
          <EmptyState icon={ShieldAlert} title="Nothing scored yet" description="Scores appear after your first import." compact />
        ) : (
          <div className="h-[92px]" />
        )
      ) : (
        <>
          <SegmentedBar segments={segments} ariaLabel="Customers by risk level" />
          {stats.atRiskCustomers > 0 && (
            <p className="mt-3 border-t border-border pt-3 text-[12px] text-muted-foreground">
              <span className="font-medium text-foreground">{stats.atRiskCustomers}</span> high or critical,{" "}
              <span className="font-medium tabular-nums text-foreground">{money(atRiskMrr)}</span> MRR exposed
            </p>
          )}
        </>
      )}
    </ChartPanel>
  );
}
