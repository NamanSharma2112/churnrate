"use client";

import { useState } from "react";
import { DollarSign } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard";
import { EmptyState } from "@/components/ui/empty-state";
import { LineChart, type LineSeries } from "@/components/charts/LineChart";
import { DivergingBars } from "@/components/charts/DivergingBars";
import { Num } from "@/components/ui/num";
import { money, moneyCompact } from "@/lib/format";
import { ChartPanel } from "./ChartPanel";

const MRR: LineSeries[] = [{ key: "mrr", label: "MRR", color: "var(--series-1)", area: true }];

/**
 * MRR over the selected range. The figure under the title follows the
 * crosshair - scrub the chart and the number slides to that period - and
 * returns to the latest value when the pointer leaves.
 */
export function RevenueChart() {
  const { revenue, loading, loaded } = useDashboardStore();
  const [active, setActive] = useState<number | null>(null);
  const point = revenue.length ? revenue[active ?? revenue.length - 1] : null;

  return (
    <ChartPanel
      title="Monthly recurring revenue"
      description="Revenue on the books in each period"
      dimmed={loading && loaded}
      headline={
        point ? (
          <div className="flex items-baseline gap-2">
            <Num value={point.mrr} format={money} className="text-[22px] font-semibold leading-7 tracking-[-0.015em] text-foreground" />
            <span className="text-[12px] text-muted-foreground">{active === null ? `latest · ${point.month}` : point.month}</span>
          </div>
        ) : undefined
      }
    >
      {revenue.length === 0 ? (
        loaded ? (
          <EmptyState icon={DollarSign} title="No revenue data" description="Add MRR to your import or connect Stripe." compact />
        ) : (
          <div className="h-[220px]" />
        )
      ) : (
        <LineChart
          data={revenue as unknown as Record<string, number | string>[]}
          xKey="month"
          series={MRR}
          height={220}
          format={money}
          tickFormat={moneyCompact}
          ariaLabel="Monthly recurring revenue"
          onActiveChange={setActive}
        />
      )}
    </ChartPanel>
  );
}

/** New revenue above the line, churned revenue below - on their own scale. */
export function NetRevenueChart() {
  const { revenue, loading, loaded } = useDashboardStore();

  return (
    <ChartPanel
      title="Revenue movement"
      description="Gained from new customers vs lost to churn"
      dimmed={loading && loaded}
      legend={
        revenue.length > 0 ? (
          <ul className="flex items-center gap-3 text-[12px] text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <span aria-hidden className="size-2 rounded-[2px] bg-[var(--div-pos)]" />
              New
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden className="size-2 rounded-[2px] bg-[var(--div-neg)]" />
              Churned
            </li>
          </ul>
        ) : undefined
      }
    >
      {revenue.length === 0 ? (
        loaded ? (
          <EmptyState icon={DollarSign} title="No movement yet" description="Signups and churn will show here." compact />
        ) : (
          <div className="h-[200px]" />
        )
      ) : (
        <DivergingBars
          data={revenue.map((r) => ({ label: r.month, pos: r.newRevenue, neg: r.churnedRevenue }))}
          posLabel="new"
          negLabel="churned"
          format={moneyCompact}
          ariaLabel="New and churned revenue by period"
        />
      )}
    </ChartPanel>
  );
}
