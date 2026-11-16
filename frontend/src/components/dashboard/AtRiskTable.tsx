"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ChevronRight, TriangleAlert } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard";
import { EmptyState } from "@/components/ui/empty-state";
import { EASE } from "@/lib/motion";
import { reasonLabel } from "@/lib/factors";
import { ago, money } from "@/lib/format";
import { BTN_GHOST, CARD } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** Meter fill carries severity; the track is a wash of the same color. */
function riskColor(risk: number) {
  if (risk >= 0.8) return "var(--status-critical)";
  if (risk >= 0.6) return "var(--status-serious)";
  return "var(--status-warning)";
}

function healthTone(score: number) {
  if (score >= 70) return "text-success";
  if (score >= 40) return "text-warning";
  return "text-destructive";
}

export function AtRiskTable({ showViewAll = true }: { showViewAll?: boolean }) {
  const reduce = useReducedMotion();
  const { atRiskCustomers, loaded } = useDashboardStore();

  return (
    <section className={CARD}>
      <div className="flex items-center gap-3 px-4 pb-1 pt-3.5">
        <div className="min-w-0">
          <h2 className="text-[14px] font-semibold text-foreground">Top at-risk customers</h2>
          <p className="mt-0.5 text-[12px] text-muted-foreground">Ranked by predicted churn probability</p>
        </div>
        {showViewAll && atRiskCustomers.length > 0 && (
          <Link href="/at-risk" className={cn(BTN_GHOST, "ml-auto h-7 px-2 text-[12px]")}>
            View all
            <ChevronRight aria-hidden className="size-3.5" />
          </Link>
        )}
      </div>

      {atRiskCustomers.length === 0 ? (
        loaded ? (
          <EmptyState
            icon={TriangleAlert}
            title="No customers at risk"
            description="Nothing has crossed the high-risk threshold. Import more data or re-score to refresh."
            compact
          />
        ) : (
          <div className="h-48" />
        )
      ) : (
        <div className="@container/table px-1.5 pb-1.5">
          <table className="w-full table-fixed border-separate border-spacing-0 text-left">
            <thead>
              <tr className="text-[12px] text-muted-foreground">
                <th scope="col" className="h-9 px-2.5 font-normal">Customer</th>
                <th scope="col" className="w-[38%] px-2 font-normal @min-[560px]/table:w-[26%]">Churn risk</th>
                <th scope="col" className="hidden w-[84px] px-2 text-right font-normal @min-[440px]/table:table-cell">MRR</th>
                <th scope="col" className="hidden w-[64px] px-2 text-right font-normal @min-[640px]/table:table-cell">Health</th>
                <th scope="col" className="hidden w-[150px] px-2 font-normal @min-[760px]/table:table-cell">Top reason</th>
                <th scope="col" className="hidden w-[84px] px-2.5 text-right font-normal @min-[520px]/table:table-cell">Active</th>
              </tr>
            </thead>
            <tbody>
              {atRiskCustomers.map((c) => {
                const pct = Math.round(c.churnRisk * 100);
                const reason = c.topFactors?.find((f) => f.direction !== "reduces_risk") ?? c.topFactors?.[0];
                const cell =
                  "h-12 border-t border-border px-2 pointer-fine:group-hover/row:bg-black/[0.025] dark:pointer-fine:group-hover/row:bg-white/[0.035] transition-colors duration-150";
                return (
                  <tr key={c.id} className="group/row relative has-[.row-link:focus-visible]:outline-2 has-[.row-link:focus-visible]:-outline-offset-2 has-[.row-link:focus-visible]:outline-ring">
                    <td className={cn(cell, "rounded-l-md pl-2.5")}>
                      {/* The link's ::before covers the whole row, so the row is the click target. */}
                      <Link
                        href={`/customers?focus=${c.id}`}
                        className="row-link flex min-w-0 flex-col outline-none before:absolute before:inset-0 before:rounded-md before:content-['']"
                      >
                        <span className="truncate text-[13px] font-medium text-foreground">{c.company || c.name}</span>
                        <span className="truncate text-[12px] text-muted-foreground">{c.company ? c.name : c.email}</span>
                      </Link>
                    </td>
                    <td className={cell}>
                      <div className="flex items-center gap-2.5">
                        <div
                          role="meter"
                          aria-label={`${c.company || c.name} churn risk`}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={pct}
                          className="relative h-1.5 min-w-0 flex-1 rounded-full"
                          style={{ background: `color-mix(in srgb, ${riskColor(c.churnRisk)} 18%, transparent)` }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: riskColor(c.churnRisk) }}
                            initial={{ clipPath: reduce ? `inset(0 ${100 - pct}% 0 0 round 999px)` : "inset(0 100% 0 0 round 999px)" }}
                            animate={{ clipPath: `inset(0 ${100 - pct}% 0 0 round 999px)` }}
                            transition={{ duration: reduce ? 0 : 0.6, ease: EASE, delay: 0.1 }}
                          />
                        </div>
                        <span className="w-9 shrink-0 text-right text-[12px] tabular-nums text-subtle">{pct}%</span>
                      </div>
                    </td>
                    <td className={cn(cell, "hidden text-right text-[13px] tabular-nums text-subtle @min-[440px]/table:table-cell")}>
                      {money(c.mrr)}
                    </td>
                    <td className={cn(cell, "hidden text-right text-[13px] font-medium tabular-nums @min-[640px]/table:table-cell", healthTone(c.healthScore))}>
                      {Math.round(c.healthScore)}
                    </td>
                    <td className={cn(cell, "hidden @min-[760px]/table:table-cell")}>
                      {reason ? (
                        <span className="inline-flex max-w-full items-center truncate rounded-md border border-border px-1.5 py-0.5 text-[12px] text-subtle">
                          {reason.label && reason.label !== reason.feature ? reason.label : reasonLabel(reason.feature)}
                        </span>
                      ) : (
                        <span className="text-[12px] text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className={cn(cell, "hidden rounded-r-md pr-2.5 text-right text-[12px] tabular-nums text-muted-foreground @min-[520px]/table:table-cell")}>
                      {ago(c.lastActiveAt ?? c.lastActive)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

