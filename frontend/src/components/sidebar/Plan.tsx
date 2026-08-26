"use client";

import Link from "next/link";
import { ZapIcon } from "hugeicons-react";
import { useAuthStore } from "@/store/auth";

/** Seat limits per tier — the free tier is what a new workspace starts on. */
const PLAN_LIMITS: Record<string, number> = {
  free: 100,
  starter: 1000,
  pro: 15000,
  enterprise: 100000,
};

export function Plan() {
  const { tenant } = useAuthStore();

  const plan = tenant?.plan ?? "free";
  // Real usage from the API rather than a hard-coded "10,847 / 15,000".
  const used = tenant?.customerCount ?? 0;
  const limit = PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;
  const pct = Math.min(Math.round((used / limit) * 100), 100);

  return (
    <div className="shrink-0 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <ZapIcon className="text-amber-500" size={16} />
        <span className="text-sm font-semibold capitalize text-neutral-900">{plan} plan</span>
      </div>
      <p className="mb-2 text-xs text-neutral-500">
        {used.toLocaleString()} / {limit.toLocaleString()} customers tracked
      </p>
      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-neutral-200">
        <div
          className={pct >= 90 ? "h-full rounded-full bg-red-500" : "h-full rounded-full bg-indigo-600"}
          style={{ width: `${Math.max(pct, 2)}%` }}
        />
      </div>
      <Link
        href="/settings"
        className="block w-full rounded-lg bg-neutral-900 py-1.5 text-center text-xs font-medium text-white transition-colors hover:bg-neutral-800"
      >
        {plan === "enterprise" ? "Manage plan" : "Upgrade plan"}
      </Link>
    </div>
  );
}
