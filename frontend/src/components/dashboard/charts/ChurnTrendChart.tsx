"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartLineData01Icon } from "hugeicons-react";
import { useDashboardStore } from "@/store/dashboard";
import { EmptyState } from "@/components/ui/empty-state";
import { ChartPanel, tooltipStyle } from "./ChartPanel";

export function ChurnTrendChart() {
  const { churnTrend } = useDashboardStore();

  return (
    <ChartPanel
      title="Churn Rate Trend"
      description="Actual churn against the model's predicted rate"
      legend={[
        { label: "Actual", color: "#6366f1" },
        { label: "Predicted", color: "#10b981" },
      ]}
    >
      {churnTrend.length === 0 ? (
        <EmptyState
          compact
          icon={ChartLineData01Icon}
          title="No trend yet"
          description="Import customers to build a 12-month churn history."
        />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={churnTrend} margin={{ top: 5, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
            <XAxis dataKey="month" stroke="#a3a3a3" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#a3a3a3"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
              width={44}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number, name) => [`${value}%`, name]}
            />
            <Line
              type="monotone"
              dataKey="churnRate"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ fill: "#6366f1", r: 3 }}
              name="Actual"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "#10b981", r: 3 }}
              name="Predicted"
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartPanel>
  );
}
