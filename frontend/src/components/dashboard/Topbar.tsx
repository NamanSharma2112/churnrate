"use client";

import { useState } from "react";
import { RefreshIcon, Loading01Icon } from "hugeicons-react";
import { useDashboardStore } from "@/store/dashboard";
import { useAuthStore } from "@/store/auth";
import { API_BASE } from "@/lib/api";
import { PageHeader } from "@/components/layout/PageHeader";
import { cn } from "@/lib/utils";

const timeRanges = ["7d", "30d", "90d", "1y"];

export function Topbar() {
  const { selectedTimeRange, setSelectedTimeRange, fetchDashboard } = useDashboardStore();
  const { token } = useAuthStore();
  const [scoring, setScoring] = useState(false);

  // Re-scores every customer against the current model, then refreshes the view.
  const handleRescore = async () => {
    if (!token) return;
    setScoring(true);
    try {
      await fetch(`${API_BASE}/api/predictions/batch`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchDashboard();
    } catch {
      // The dashboard surfaces load failures already.
    } finally {
      setScoring(false);
    }
  };

  return (
    <PageHeader
      title="Churn Analytics Dashboard"
      description="Monitor customer health and predict churn in real time"
    >
      <div className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-[#FCFCFC] p-1 shadow-sm">
        {timeRanges.map((range) => (
          <button
            key={range}
            type="button"
            onClick={() => setSelectedTimeRange(range)}
            aria-pressed={selectedTimeRange === range}
            className={cn(
              "rounded-md px-3 py-1 text-xs font-medium transition-colors",
              selectedTimeRange === range
                ? "border border-neutral-200 bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500 hover:text-neutral-900"
            )}
          >
            {range}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleRescore}
        disabled={scoring}
        className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-600 shadow-sm transition-colors hover:bg-neutral-50 hover:text-neutral-900 disabled:opacity-60"
      >
        {scoring ? (
          <Loading01Icon size={15} className="animate-spin" />
        ) : (
          <RefreshIcon size={15} />
        )}
        {scoring ? "Scoring…" : "Re-score"}
      </button>
    </PageHeader>
  );
}
