"use client";

import { ChartLine } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard";
import { EmptyState } from "@/components/ui/empty-state";
import { LineChart, LineLegend, type LineSeries } from "@/components/charts/LineChart";
import { percent } from "@/lib/format";
import { ChartPanel } from "./ChartPanel";

const SERIES: LineSeries[] = [
  { key: "churnRate", label: "Actual", color: "var(--series-1)", area: true },
  { key: "predicted", label: "Predicted", color: "var(--series-2)", dashed: true },
];

export function ChurnTrendChart() {
  const { churnTrend, loading, loaded } = useDashboardStore();

  return (
    <ChartPanel
      title="Churn rate"
      description="Actual churn against the model's predicted rate"
      legend={churnTrend.length > 0 ? <LineLegend series={SERIES} /> : undefined}
      dimmed={loading && loaded}
    >
      {churnTrend.length === 0 ? (
        loaded ? (
          <EmptyState icon={ChartLine} title="No trend yet" description="Import customers to see churn over time." compact />
        ) : (
          <div className="h-[240px]" />
        )
      ) : (
        <LineChart
          data={churnTrend as unknown as Record<string, number | string>[]}
          xKey="month"
          series={SERIES}
          format={(v) => percent(v)}
          tickFormat={(v) => `${Math.round(v)}%`}
          ariaLabel="Churn rate, actual and predicted"
        />
      )}
    </ChartPanel>
  );
}
