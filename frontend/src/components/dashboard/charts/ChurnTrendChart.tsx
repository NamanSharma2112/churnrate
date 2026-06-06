"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { churnTrendData } from "@/lib/mock-data";

export function ChurnTrendChart() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-800">
            Churn Rate Trend
          </h3>
          <p className="text-xs text-neutral-500">
            Actual vs ML predicted churn rate
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-indigo-500" />
            <span className="text-xs text-neutral-500">Actual</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-neutral-500">Predicted</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={churnTrendData}>
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
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
              fontSize: "12px",
              color: "#262626",
            }}
            formatter={(value: number) => [`${value}%`]}
          />
          <Legend wrapperStyle={{ display: "none" }} />
          <Line
            type="monotone"
            dataKey="churnRate"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ fill: "#6366f1", r: 3 }}
            name="Actual"
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: "#10b981", r: 3 }}
            name="Predicted"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
