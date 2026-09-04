"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ZapIcon } from "hugeicons-react";
import { useDashboardStore } from "@/store/dashboard";

export function Plan() {
  const { usage, fetchUsage } = useDashboardStore();

  useEffect(() => {
    fetchUsage();
  }, [fetchUsage]);

  const planLabel = usage?.planLabel ?? "Free Plan";
  const tracked = usage?.customersTracked ?? 0;
  const limit = usage?.limit ?? null;
  const percent = usage?.percentUsed ?? 0;

  return (
    <div className="mt-4 rounded-lg border border-neutral-200 bg-[#FCFCFC] p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <ZapIcon className="text-yellow-500" size={16} />
        <span className="text-sm font-semibold text-neutral-800">
          {planLabel}
        </span>
      </div>
      <p className="mb-3 text-xs text-neutral-500">
        {limit === null
          ? `${tracked.toLocaleString()} customers tracked`
          : `${tracked.toLocaleString()} / ${limit.toLocaleString()} customers tracked`}
      </p>
      {limit !== null && (
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-indigo-600 transition-[width] duration-700 ease-out"
            // A tenant just under the cap should still show a visible sliver.
            style={{ width: `${percent > 0 ? Math.max(percent, 2) : 0}%` }}
          />
        </div>
      )}
      <Link
        href="/settings"
        className="block w-full rounded-lg bg-neutral-900 py-1.5 text-center text-xs font-medium text-white transition-colors hover:bg-neutral-800"
      >
        Upgrade Plan
      </Link>
    </div>
  );
}
