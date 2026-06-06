"use client";

import {
  UserMinus01Icon,
  UserAdd01Icon,
  Alert01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
} from "hugeicons-react";
import { useDashboardStore } from "@/store/dashboard";
import type { ActivityEvent } from "@/types";

const iconMap: Record<ActivityEvent["type"], { icon: typeof UserMinus01Icon; color: string }> = {
  churn: { icon: UserMinus01Icon, color: "#ef4444" },
  signup: { icon: UserAdd01Icon, color: "#10b981" },
  upgrade: { icon: ArrowUp01Icon, color: "#6366f1" },
  downgrade: { icon: ArrowDown01Icon, color: "#f59e0b" },
  warning: { icon: Alert01Icon, color: "#f97316" },
};

export function ActivityFeed() {
  const { activity } = useDashboardStore();

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-neutral-800">
          Recent Activity
        </h3>
        <p className="text-xs text-neutral-500">Latest customer events</p>
      </div>
      <div className="space-y-3 flex-1 flex flex-col justify-between">
        {activity.map((event) => {
          const { icon: Icon, color } = iconMap[event.type];
          return (
            <div
              key={event.id}
              className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-neutral-50"
            >
              <div
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${color}15` }}
              >
                <Icon size={14} style={{ color }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-neutral-800">
                  {event.customer}
                </p>
                <p className="truncate text-xs text-neutral-500">
                  {event.message}
                </p>
              </div>
              <span className="shrink-0 text-[10px] text-neutral-400">
                {event.timestamp}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
