"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Activity, ArrowDownRight, ArrowUpRight, TriangleAlert, UserMinus, UserPlus } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard";
import { EmptyState } from "@/components/ui/empty-state";
import { EASE } from "@/lib/motion";
import { ago } from "@/lib/format";
import { BTN_GHOST, CARD } from "@/lib/ui";
import { cn } from "@/lib/utils";

const TYPES: Record<string, { icon: typeof Activity; tone: string }> = {
  churn: { icon: UserMinus, tone: "text-destructive bg-[var(--status-critical)]/12" },
  signup: { icon: UserPlus, tone: "text-success bg-[var(--status-good)]/12" },
  upgrade: { icon: ArrowUpRight, tone: "text-brand bg-brand/12" },
  downgrade: { icon: ArrowDownRight, tone: "text-warning bg-[var(--status-warning)]/15" },
  warning: { icon: TriangleAlert, tone: "text-warning bg-[var(--status-warning)]/15" },
};
const FALLBACK = { icon: Activity, tone: "text-muted-foreground bg-accent" };
const PREVIEW = 6;

export function ActivityFeed() {
  const reduce = useReducedMotion();
  const { activity, loaded } = useDashboardStore();
  const [open, setOpen] = useState(false);
  const shown = open ? activity : activity.slice(0, PREVIEW);

  return (
    <section className={cn(CARD, "flex flex-col")}>
      <div className="flex items-center px-4 pb-1 pt-3.5">
        <h2 className="text-[14px] font-semibold text-foreground">Recent activity</h2>
        {activity.length > PREVIEW && (
          <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className={cn(BTN_GHOST, "ml-auto h-7 px-2 text-[12px]")}>
            {open ? "Show less" : "View all"}
          </button>
        )}
      </div>
      {activity.length === 0 ? (
        loaded ? (
          <EmptyState compact icon={Activity} title="Nothing yet" description="Imports, upgrades and churn events show up here." />
        ) : (
          <div className="h-40" />
        )
      ) : (
        <ul className="px-1.5 pb-2">
          <AnimatePresence initial={false}>
            {shown.map((event) => {
              const { icon: Icon, tone } = TYPES[event.type] ?? FALLBACK;
              return (
                <motion.li
                  key={event.id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-2.5 px-2.5 py-2">
                    <span className={cn("mt-px flex size-5 shrink-0 items-center justify-center rounded-full", tone)}>
                      <Icon aria-hidden className="size-3" strokeWidth={2} />
                    </span>
                    <div className="min-w-0 flex-1 text-[13px] leading-[18px]">
                      <p className="truncate font-medium text-foreground">{event.customer}</p>
                      <p className="text-subtle">{event.message}</p>
                    </div>
                    <time dateTime={event.timestamp} className="shrink-0 text-[12px] tabular-nums text-muted-foreground">
                      {ago(event.timestamp)}
                    </time>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </section>
  );
}
