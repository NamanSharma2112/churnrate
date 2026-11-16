"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useWidth } from "./core";

export interface Segment {
  key: string;
  label: string;
  value: number;
  /** CSS color for the fill. */
  color: string;
  /** Ink for a label printed inside the fill: white or near-black by the fill's luminance. */
  ink: "light" | "dark";
  icon: LucideIcon;
}

/**
 * One whole split into parts - the tall segmented bar. 28px, 2px surface gaps,
 * 4px corners, each part's share printed inside only when it fits. The bar
 * wipes open left to right once; hovering or focusing a part names it.
 *
 * Risk levels are states, so they wear the reserved status colors and always
 * ship with an icon and a label in the legend - never color alone.
 */
export function SegmentedBar({ segments, ariaLabel }: { segments: Segment[]; ariaLabel: string }) {
  const reduce = useReducedMotion();
  const [ref, width] = useWidth<HTMLDivElement>();
  const [active, setActive] = useState<string | null>(null);
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const visible = segments.filter((s) => s.value > 0);
  const gaps = Math.max(0, visible.length - 1) * 2;

  return (
    <div>
      <div ref={ref} className="relative">
        <motion.div
          role="img"
          aria-label={`${ariaLabel}: ${segments.map((s) => `${s.label} ${s.value}`).join(", ")}`}
          className="flex h-7 w-full gap-[2px]"
          initial={{ clipPath: reduce ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: reduce ? 0 : 0.7, ease: EASE, delay: 0.1 }}
        >
          {total === 0 ? (
            <div className="h-full w-full rounded bg-accent" />
          ) : (
            visible.map((s) => {
              const share = s.value / total;
              const px = (width - gaps) * share;
              const pct = Math.round(share * 100);
              const fits = px >= 40;
              return (
                <div
                  key={s.key}
                  tabIndex={0}
                  aria-label={`${s.label}: ${s.value} customers, ${pct}%`}
                  onPointerEnter={() => setActive(s.key)}
                  onPointerLeave={() => setActive((cur) => (cur === s.key ? null : cur))}
                  onFocus={() => setActive(s.key)}
                  onBlur={() => setActive(null)}
                  className={cn(
                    "relative flex h-full min-w-[3px] items-center rounded px-2 outline-none transition-[opacity,filter] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    active && active !== s.key && "opacity-45",
                    active === s.key && "brightness-110"
                  )}
                  style={{ flexGrow: share, flexBasis: 0, background: s.color }}
                >
                  {fits && (
                    <span
                      className={cn(
                        "text-[11px] font-semibold tabular-nums",
                        s.ink === "light" ? "text-white" : "text-[#18181b]"
                      )}
                    >
                      {pct}%
                    </span>
                  )}
                </div>
              );
            })
          )}
        </motion.div>
      </div>

      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
        {segments.map((s) => {
          const pct = total ? Math.round((s.value / total) * 100) : 0;
          return (
            <li
              key={s.key}
              className={cn(
                "flex items-center gap-2 rounded-md text-[12px] transition-opacity duration-150",
                active && active !== s.key && "opacity-50"
              )}
            >
              <s.icon aria-hidden className="size-3.5 shrink-0" style={{ color: s.color }} strokeWidth={2} />
              <span className="text-subtle">{s.label}</span>
              <span className="ml-auto font-medium tabular-nums text-foreground">{s.value}</span>
              <span className="w-8 text-right tabular-nums text-muted-foreground">{pct}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
