"use client";

import Link from "next/link";
import { ArrowDown01Icon, ArrowUp01Icon, MinusSignIcon, Alert01Icon } from "hugeicons-react";
import { useDashboardStore } from "@/store/dashboard";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

function riskBadge(risk: number) {
  if (risk >= 0.8) return { label: "Critical", className: "bg-red-50 text-red-600" };
  if (risk >= 0.6) return { label: "High", className: "bg-orange-50 text-orange-600" };
  if (risk >= 0.4) return { label: "Medium", className: "bg-amber-50 text-amber-600" };
  return { label: "Low", className: "bg-emerald-50 text-emerald-600" };
}

function riskColor(risk: number) {
  if (risk >= 0.8) return "#ef4444";
  if (risk >= 0.6) return "#f97316";
  return "#f59e0b";
}

function healthColor(score: number) {
  if (score >= 70) return "text-emerald-600";
  if (score >= 40) return "text-amber-600";
  return "text-red-500";
}

const trendIcon: Record<string, React.ReactNode> = {
  up: <ArrowUp01Icon className="text-emerald-500" size={14} />,
  down: <ArrowDown01Icon className="text-red-500" size={14} />,
  stable: <MinusSignIcon className="text-neutral-400" size={14} />,
};

/** "2026-06-15T…" -> "72 days ago" */
function relativeDays(value?: string): string {
  if (!value) return "—";
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) return "—";
  const days = Math.floor((Date.now() - time) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

export function AtRiskTable({ showViewAll = true }: { showViewAll?: boolean }) {
  const { atRiskCustomers } = useDashboardStore();

  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-neutral-200 p-4 sm:p-5">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-neutral-900">Top At-Risk Customers</h3>
          <p className="mt-0.5 text-xs text-neutral-500">
            Ranked by predicted churn probability
          </p>
        </div>
        {showViewAll && atRiskCustomers.length > 0 && (
          <Link
            href="/at-risk"
            className="shrink-0 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
          >
            View all
          </Link>
        )}
      </div>

      {atRiskCustomers.length === 0 ? (
        <EmptyState
          icon={Alert01Icon}
          title="No customers at risk"
          description="Nothing has crossed the high-risk threshold. Import more data or re-run predictions to refresh."
          compact
        />
      ) : (
        /* Horizontal scroll is scoped to the table so the page itself never
           scrolls sideways on a phone. */
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-neutral-200 text-left text-[11px] uppercase tracking-wider text-neutral-500">
                <th className="whitespace-nowrap px-4 py-3 font-medium sm:px-5">Customer</th>
                <th className="whitespace-nowrap px-3 py-3 font-medium">Plan</th>
                <th className="whitespace-nowrap px-3 py-3 font-medium">MRR</th>
                <th className="whitespace-nowrap px-2 py-3 font-medium">Churn risk</th>
                <th className="whitespace-nowrap px-3 py-3 font-medium">Health</th>
                <th className="whitespace-nowrap px-2 py-3 font-medium">Trend</th>
                <th className="whitespace-nowrap px-3 py-3 font-medium">Last active</th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-medium sm:px-5">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {atRiskCustomers.map((customer) => {
                const badge = riskBadge(customer.churnRisk);
                return (
                  <tr
                    key={customer.id}
                    className="border-b border-neutral-100 last:border-0 transition-colors hover:bg-neutral-50"
                  >
                    <td className="px-4 py-3 sm:px-5">
                      <p className="text-sm font-medium text-neutral-900">
                        {customer.company || customer.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {customer.company ? customer.name : customer.email}
                      </p>
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs capitalize text-neutral-600">
                        {customer.plan}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-neutral-700">
                      ${customer.mrr.toLocaleString()}
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-neutral-200">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${customer.churnRisk * 100}%`,
                              backgroundColor: riskColor(customer.churnRisk),
                            }}
                          />
                        </div>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-medium",
                            badge.className
                          )}
                        >
                          {(customer.churnRisk * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          healthColor(customer.healthScore)
                        )}
                      >
                        {Math.round(customer.healthScore)}
                      </span>
                    </td>
                    <td className="px-2 py-3">
                      {trendIcon[customer.engagementTrend] ?? trendIcon.stable}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-xs text-neutral-500">
                      {relativeDays(customer.lastActiveAt ?? customer.lastActive)}
                    </td>
                    <td className="px-4 py-3 text-right sm:px-5">
                      <Link
                        href={`/customers?focus=${customer.id}`}
                        className="inline-block rounded-md bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-100"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
