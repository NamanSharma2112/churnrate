"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { PieChartIcon } from "hugeicons-react";
import { useDashboardStore } from "@/store/dashboard";
import { EmptyState } from "@/components/ui/empty-state";
import { ChartPanel, tooltipStyle } from "./ChartPanel";

export function RiskDistributionChart() {
  const { riskDistribution } = useDashboardStore();
  const total = riskDistribution.reduce((sum, item) => sum + item.count, 0);

  return (
    <ChartPanel
      title="Risk Distribution"
      description="Customer segmentation by churn risk level"
    >
      {total === 0 ? (
        <EmptyState
          compact
          icon={PieChartIcon}
          title="Nothing to segment yet"
          description="Once customers are scored, their risk mix appears here."
        />
      ) : (
        /* Stacks below `sm` so the donut and legend never squeeze each other. */
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <div className="h-[200px] w-full sm:h-[240px] sm:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="85%"
                  paddingAngle={3}
                  dataKey="count"
                  isAnimationActive={false}
                >
                  {riskDistribution.map((entry) => (
                    <Cell key={entry.level} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value: number) => [value.toLocaleString(), "Customers"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full flex-1 space-y-2.5">
            {riskDistribution.map((item) => (
              <div key={item.level} className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate text-sm text-neutral-600">{item.level}</span>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-sm font-medium text-neutral-900">
                    {item.count.toLocaleString()}
                  </span>
                  <span className="ml-2 text-xs text-neutral-500">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ChartPanel>
  );
}
