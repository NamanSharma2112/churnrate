"use client";

import { ArrowUp01Icon, ArrowDown01Icon, MinusSignIcon } from "hugeicons-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  iconColor: string;
  suffix?: string;
  /** True when a rise is bad (churn rate, at-risk count). */
  inverse?: boolean;
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
  suffix,
  inverse = false,
}: StatCardProps) {
  const isFlat = Math.abs(change) < 0.05;
  const isPositive = change > 0;
  const isGood = inverse ? !isPositive : isPositive;

  return (
    <div className="flex flex-col rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-colors hover:border-neutral-300">
      {/*
        Fixed header height so the value baseline lines up across the row —
        "Total Customers" wraps to two lines where "MRR" does not.
      */}
      <div className="mb-3 flex min-h-[34px] items-start justify-between gap-2">
        <span className="text-[11px] font-medium uppercase leading-tight tracking-wider text-neutral-500">
          {title}
        </span>
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon size={16} style={{ color: iconColor }} />
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-end justify-between gap-x-2 gap-y-1">
        <p className="text-2xl font-bold leading-none text-neutral-900">
          {value}
          {suffix && (
            <span className="ml-1 text-sm font-normal text-neutral-500">{suffix}</span>
          )}
        </p>
        <div
          className={cn(
            "flex items-center gap-0.5 text-xs font-medium",
            isFlat ? "text-neutral-400" : isGood ? "text-emerald-600" : "text-red-500"
          )}
        >
          {isFlat ? (
            <MinusSignIcon size={13} />
          ) : isPositive ? (
            <ArrowUp01Icon size={13} />
          ) : (
            <ArrowDown01Icon size={13} />
          )}
          {isFlat ? "0%" : `${Math.abs(change)}%`}
        </div>
      </div>
    </div>
  );
}
