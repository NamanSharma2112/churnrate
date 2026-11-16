"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search01Icon,
  Brain01Icon,
  Loading01Icon,
  UserGroupIcon,
  FilterIcon,
} from "hugeicons-react";
import { useDashboardStore } from "@/store/dashboard";
import { useAuthStore } from "@/store/auth";
import { API_BASE } from "@/lib/api";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

const RISK_FILTERS = ["all", "critical", "high", "medium", "low"] as const;
type RiskFilter = (typeof RISK_FILTERS)[number];

function healthClasses(score: number) {
  if (score >= 70) return "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10";
  if (score >= 40) return "text-amber-600 dark:text-amber-400 bg-amber-500/10";
  return "text-red-600 dark:text-red-400 bg-red-500/10";
}

function riskClasses(level?: string) {
  switch (level) {
    case "critical":
      return "bg-red-500/10 text-red-600 dark:text-red-400";
    case "high":
      return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
    case "medium":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
    default:
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  }
}

function formatJoinDate(signupDate?: string) {
  if (!signupDate) return "—";
  const date = new Date(signupDate);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Matches how the API counts active customers: seen within the last 30 days. */
function isActive(customer: { lastActiveAt?: string }) {
  if (!customer.lastActiveAt) return true;
  const lastActive = new Date(customer.lastActiveAt);
  if (Number.isNaN(lastActive.getTime())) return true;
  return Date.now() - lastActive.getTime() < 30 * 86_400_000;
}

export function CustomerDirectoryTable() {
  const { customers, fetchCustomers, loading } = useDashboardStore();
  const { token } = useAuthStore();
  const [predictingId, setPredictingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Debounced so typing does not fire a request per keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomers(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, fetchCustomers]);

  const visible = useMemo(
    () =>
      riskFilter === "all"
        ? customers
        : customers.filter((c) => c.riskLevel === riskFilter),
    [customers, riskFilter]
  );

  const handlePredict = async (customerId: string) => {
    if (!token) return;
    setPredictingId(customerId);
    try {
      const res = await fetch(`${API_BASE}/api/predictions/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ customerId }),
      });
      if (res.ok) await fetchCustomers(search);
    } catch {
      // Non-fatal: the row keeps its previous score.
    } finally {
      setPredictingId(null);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-foreground">All Customers</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {visible.length.toLocaleString()} account{visible.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-0 flex-1 sm:flex-initial">
            <Search01Icon
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email or company…"
              className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 sm:w-72"
            />
          </div>
          <button
            type="button"
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-expanded={filtersOpen}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors",
              riskFilter !== "all"
                ? "border-brand-border bg-brand-muted text-brand"
                : "border-border bg-card text-subtle hover:bg-muted"
            )}
          >
            <FilterIcon size={16} />
            {riskFilter === "all" ? "Filter" : `Risk: ${riskFilter}`}
          </button>
        </div>
      </div>

      {filtersOpen && (
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-[#FCFCFC] px-4 py-3 sm:px-5">
          <span className="text-xs font-medium text-muted-foreground">Risk level:</span>
          {RISK_FILTERS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setRiskFilter(level)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors",
                riskFilter === level
                  ? "bg-brand text-white"
                  : "border border-border bg-card text-subtle hover:bg-muted"
              )}
            >
              {level}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <EmptyState
          icon={UserGroupIcon}
          title={search || riskFilter !== "all" ? "No matches" : "No customers yet"}
          description={
            search || riskFilter !== "all"
              ? "Try a different search term or clear the risk filter."
              : "Import a CSV or connect Stripe to populate your customer directory."
          }
          actionLabel={search || riskFilter !== "all" ? undefined : "Import data"}
          actionHref={search || riskFilter !== "all" ? undefined : "/import"}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px]">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="whitespace-nowrap px-4 py-3 font-medium sm:px-5">Customer</th>
                <th className="whitespace-nowrap px-3 py-3 font-medium">Plan</th>
                <th className="whitespace-nowrap px-3 py-3 font-medium">MRR</th>
                <th className="whitespace-nowrap px-3 py-3 font-medium">Health</th>
                <th className="whitespace-nowrap px-3 py-3 font-medium">Churn risk</th>
                <th className="whitespace-nowrap px-3 py-3 font-medium">Status</th>
                <th className="whitespace-nowrap px-3 py-3 font-medium">Joined</th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-medium sm:px-5">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={cn(loading && "opacity-60")}>
              {visible.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-border last:border-0 transition-colors hover:bg-muted"
                >
                  <td className="px-4 py-3.5 sm:px-5">
                    {/* Falls back to the contact name when a record has no
                        company, so the primary label is never blank. */}
                    <p className="text-sm font-medium text-foreground">
                      {customer.company || customer.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{customer.email}</p>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium capitalize text-subtle">
                      {customer.plan}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-sm font-medium text-foreground">
                    ${customer.mrr.toLocaleString()}
                  </td>
                  <td className="px-3 py-3.5">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                        healthClasses(customer.healthScore)
                      )}
                    >
                      {Math.round(customer.healthScore)}/100
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                        riskClasses(customer.riskLevel)
                      )}
                    >
                      {(customer.churnRisk * 100).toFixed(0)}% {customer.riskLevel}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    {isActive(customer) ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        <span className="size-1.5 rounded-full bg-muted-foreground" />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-sm text-muted-foreground">
                    {formatJoinDate(customer.signupDate)}
                  </td>
                  <td className="px-4 py-3.5 text-right sm:px-5">
                    <button
                      type="button"
                      onClick={() => handlePredict(customer.id)}
                      disabled={predictingId === customer.id}
                      title="Re-score churn risk"
                      aria-label={`Re-score ${customer.company || customer.name}`}
                      className="rounded-lg p-1.5 text-brand transition-colors hover:bg-brand-muted hover:text-brand disabled:opacity-50"
                    >
                      {predictingId === customer.id ? (
                        <Loading01Icon size={18} className="animate-spin" />
                      ) : (
                        <Brain01Icon size={18} />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
