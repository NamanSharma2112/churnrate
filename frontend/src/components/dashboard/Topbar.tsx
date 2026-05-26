"use client";

import { FiBell, FiCalendar } from "react-icons/fi";
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
        <h1 className="text-2xl font-bold text-stone-100">
          Churn Analytics Dashboard
        </h1>
        <p className="text-sm text-stone-500">
          Monitor customer health and predict churn in real-time
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-stone-700 bg-stone-800 p-1">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setSelectedTimeRange(range.value)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                selectedTimeRange === range.value
                  ? "bg-indigo-600 text-white"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-stone-700 bg-stone-800 px-3 py-2 text-sm text-stone-400 transition-colors hover:text-stone-200">
          <FiCalendar size={14} />
          Custom Range
        </button>
        <button className="relative rounded-lg border border-stone-700 bg-stone-800 p-2 text-stone-400 transition-colors hover:text-stone-200">
          <FiBell size={16} />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            3
          </span>
        </button>
      </div>
    </div>
  );
}
