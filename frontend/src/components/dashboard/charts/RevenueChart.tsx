"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DollarCircleIcon } from "hugeicons-react";
import { useDashboardStore } from "@/store/dashboard";
import { EmptyState } from "@/components/ui/empty-state";
import { ChartPanel, tooltipStyle } from "./ChartPanel";

export function RevenueChart() {
  // Now sourced from /api/dashboard/revenue; this chart previously rendered a
  // fixed mock series regardless of the workspace's actual revenue.
  const { revenue } = useDashboardStore();

  return (
    <ChartPanel
      title="Revenue Impact"
      description="MRR, new revenue and churned revenue over time"
      legend={[
        { label: "MRR", color: "#6366f1" },
        { label: "New", color: "#10b981" },
        { label: "Churned", color: "#ef4444" },
      ]}
    >
      {revenue.length === 0 ? (
        <EmptyState
          compact
          icon={DollarCircleIcon}
          title="No revenue history"
          description="Import customers with MRR to see revenue movement."
        />
      ) : (
        <div className="h-full min-h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenue} margin={{ top: 5, right: 8, left: -4, bottom: 0 }}>
              <defs>
                <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="newRevGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
              <XAxis dataKey="month" stroke="#a3a3a3" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#a3a3a3"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={52}
                tickFormatter={(v) => (v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`)}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value: number, name) => [`$${value.toLocaleString()}`, name]}
              />
              <Area type="monotone" dataKey="mrr" stroke="#6366f1" fill="url(#mrrGradient)" strokeWidth={2} name="MRR" isAnimationActive={false} />
              <Area type="monotone" dataKey="newRevenue" stroke="#10b981" fill="url(#newRevGradient)" strokeWidth={2} name="New revenue" isAnimationActive={false} />
              <Area
                type="monotone"
                dataKey="churnedRevenue"
                stroke="#ef4444"
                fill="none"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Churned revenue"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartPanel>
  );
}
