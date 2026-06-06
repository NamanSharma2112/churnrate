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
import { revenueData } from "@/lib/mock-data";

export function RevenueChart() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-800">
            Revenue Impact
          </h3>
          <p className="text-xs text-neutral-500">
            MRR, churned revenue, and new revenue over time
          </p>
        </div>
      </div>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
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
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis
            dataKey="month"
            stroke="#a3a3a3"
            fontSize={11}
            tickLine={false}
          />
          <YAxis
            stroke="#a3a3a3"
            fontSize={11}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
              fontSize: "12px",
              color: "#262626",
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`]}
          />
          <Area
            type="monotone"
            dataKey="mrr"
            stroke="#6366f1"
            fill="url(#mrrGradient)"
            strokeWidth={2}
            name="MRR"
          />
          <Area
            type="monotone"
            dataKey="newRevenue"
            stroke="#10b981"
            fill="url(#newRevGradient)"
            strokeWidth={2}
            name="New Revenue"
          />
          <Area
            type="monotone"
            dataKey="churnedRevenue"
            stroke="#ef4444"
            fill="none"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Churned Revenue"
          />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
