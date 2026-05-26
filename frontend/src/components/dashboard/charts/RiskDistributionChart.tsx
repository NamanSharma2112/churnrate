"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { riskDistribution } from "@/lib/mock-data";

export function RiskDistributionChart() {
  return (
    <div className="rounded-xl border border-stone-800 bg-stone-900 p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-stone-200">
          Risk Distribution
        </h3>
        <p className="text-xs text-stone-500">
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
                backgroundColor: "#1c1917",
                border: "1px solid #292524",
                borderRadius: "8px",
                fontSize: "12px",
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
                <span className="text-sm text-stone-400">{item.level}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-stone-200">
                  {item.count.toLocaleString()}
                </span>
                <span className="ml-2 text-xs text-stone-500">
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
