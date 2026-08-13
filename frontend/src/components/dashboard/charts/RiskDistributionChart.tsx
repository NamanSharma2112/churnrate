"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDashboardStore } from "@/store/dashboard";

export function RiskDistributionChart() {
  const { riskDistribution } = useDashboardStore();

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-neutral-800">
          Risk Distribution
        </h3>
        <p className="text-xs text-neutral-500">
          Customer segmentation by churn risk level
        </p>
      </div>
      <div className="flex items-center gap-6">
        <ResponsiveContainer width="50%" height={240}>
          <PieChart>
            <Pie
              data={riskDistribution}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={3}
              dataKey="count"
            >
              {riskDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#262626"
              }}
              formatter={(value: number) => [value.toLocaleString(), "Customers"]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-3">
          {riskDistribution.map((item) => (
            <div key={item.level} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-neutral-500">{item.level}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-neutral-800">
                  {item.count.toLocaleString()}
                </span>
                <span className="ml-2 text-xs text-neutral-500">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
