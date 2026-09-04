"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useDashboardStore } from "@/store/dashboard";

// Shown until the tenant has churn events carrying a reason.
const PLACEHOLDER = [
  { reason: "Price Too High", count: 45 },
  { reason: "Missing Features", count: 32 },
  { reason: "Poor Support", count: 28 },
  { reason: "Switched to Competitor", count: 18 },
  { reason: "Company Closed", count: 12 },
];

export function ChurnReasonChart() {
  const { churnReasons } = useDashboardStore();
  const data = churnReasons.length ? churnReasons : PLACEHOLDER;

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-neutral-800">
          Top Churn Reasons
        </h3>
        <p className="text-sm text-neutral-500">
          Primary reasons given during cancellation surveys
        </p>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={false} />
            <XAxis type="number" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis 
              type="category" 
              dataKey="reason" 
              stroke="#525252" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              width={120}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                color: "#171717",
              }}
              cursor={{ fill: "#f5f5f5" }}
            />
            <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
