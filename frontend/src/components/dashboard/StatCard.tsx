"use client";

import { ArrowUp01Icon, ArrowDown01Icon } from "hugeicons-react";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  iconColor: string;
  prefix?: string;
  suffix?: string;
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
  suffix,
}: StatCardProps) {
  const isPositive = change >= 0;
  const isGood = title === "Churn Rate" ? !isPositive : isPositive;

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:border-neutral-300 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          {title}
        </span>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon size={16} style={{ color: iconColor }} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-neutral-800">
          {value}
          {suffix && (
            <span className="ml-1 text-sm font-normal text-neutral-500">
              {suffix}
            </span>
          )}
        </p>
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            isGood ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <ArrowUp01Icon size={14} />
          ) : (
            <ArrowDown01Icon size={14} />
          )}
          {Math.abs(change)}%
        </div>
      </div>
    </div>
  );
}
