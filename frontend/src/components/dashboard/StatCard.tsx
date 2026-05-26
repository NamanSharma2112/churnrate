"use client";

import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import type { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: IconType;
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
    <div className="rounded-xl border border-stone-800 bg-stone-900 p-4 transition-colors hover:border-stone-700">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
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
        <p className="text-2xl font-bold text-stone-100">
          {value}
          {suffix && (
            <span className="ml-1 text-sm font-normal text-stone-500">
              {suffix}
            </span>
          )}
        </p>
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            isGood ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {isPositive ? (
            <FiTrendingUp size={12} />
          ) : (
            <FiTrendingDown size={12} />
          )}
          {Math.abs(change)}%
        </div>
      </div>
    </div>
  );
}
