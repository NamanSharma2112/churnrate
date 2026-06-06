"use client";

import { Notification01Icon, Calendar01Icon } from "hugeicons-react";
import { useDashboardStore } from "@/store/dashboard";

const timeRanges = [
  { label: "7d", value: "7d" },
  { label: "30d", value: "30d" },
  { label: "90d", value: "90d" },
  { label: "1y", value: "1y" },
];

export function Topbar() {
  const { selectedTimeRange, setSelectedTimeRange } = useDashboardStore();

  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800">
          Churn Analytics Dashboard
        </h1>
        <p className="text-sm text-neutral-500">
          Monitor customer health and predict churn in real-time
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-[#FCFCFC] p-1 shadow-sm">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setSelectedTimeRange(range.value)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                selectedTimeRange === range.value
                  ? "bg-white text-neutral-800 shadow-sm border border-neutral-200"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-500 transition-colors hover:text-neutral-800 shadow-sm">
          <Calendar01Icon size={14} />
          Custom Range
        </button>
        <button className="relative rounded-lg border border-neutral-200 bg-white p-2 text-neutral-500 transition-colors hover:text-neutral-800 shadow-sm">
          <Notification01Icon size={16} />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            3
          </span>
        </button>
      </div>
    </div>
  );
}
