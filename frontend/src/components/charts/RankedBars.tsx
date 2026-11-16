"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

export interface RankedRow {
  key: string;
  label: string;
  value: number;
  /** Text shown at the bar's tip, e.g. "0.42" or "38%". */
  display: string;
}

/**
 * Ranked horizontal bars - one series, so no legend; the panel title names it.
 * Bars are revealed with clip-path (never width, never scaleX) so the rounded
 * data-end never distorts, staggered top-down by rank. Value sits at the tip in
 * text ink, never in the bar color.
 */
export function RankedBars({
  rows,
  color = "var(--series-1)",
  ariaLabel,
}: {
  rows: RankedRow[];
  color?: string;
  ariaLabel: string;
}) {
  const reduce = useReducedMotion();
  const max = Math.max(...rows.map((r) => r.value), 0) || 1;

  return (
    <div>
      <ul className="space-y-2.5" aria-label={ariaLabel}>
        {rows.map((row, i) => {
          const share = row.value / max;
          return (
            <li key={row.key} className="grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] items-center gap-3 text-[12px]">
              <span className="truncate text-subtle" title={row.label}>
                {row.label}
              </span>
              <span className="flex min-w-0 items-center gap-2">
                <span className="relative h-2.5 min-w-0 flex-1">
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-r-[4px]"
                    style={{ width: `${Math.max(share * 100, 1.5)}%`, background: color }}
                    initial={{ clipPath: reduce ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={{ duration: reduce ? 0 : 0.6, ease: EASE, delay: reduce ? 0 : 0.05 + i * 0.04 }}
                  />
                </span>
                <span className="w-11 shrink-0 text-right font-medium tabular-nums text-foreground">{row.display}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
