"use client";

import {
  FiUserMinus,
  FiUserPlus,
  FiAlertTriangle,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import { useDashboardStore } from "@/store/dashboard";
import type { ActivityEvent } from "@/types";

const iconMap: Record<ActivityEvent["type"], { icon: typeof FiUserMinus; color: string }> = {
  churn: { icon: FiUserMinus, color: "#ef4444" },
  signup: { icon: FiUserPlus, color: "#10b981" },
  upgrade: { icon: FiArrowUp, color: "#6366f1" },
  downgrade: { icon: FiArrowDown, color: "#f59e0b" },
  warning: { icon: FiAlertTriangle, color: "#f97316" },
};

export function ActivityFeed() {
  const { activity } = useDashboardStore();

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-900 p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-stone-200">
          Recent Activity
        </h3>
        <p className="text-xs text-stone-500">Latest customer events</p>
      </div>
      <div className="space-y-3">
        {activity.map((event) => {
          const { icon: Icon, color } = iconMap[event.type];
          return (
            <div
              key={event.id}
              className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-stone-800/50"
            >
              <div
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${color}15` }}
              >
                <Icon size={13} style={{ color }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-stone-300">
                  {event.customer}
                </p>
                <p className="truncate text-xs text-stone-500">
                  {event.message}
                </p>
              </div>
              <span className="shrink-0 text-[10px] text-stone-600">
                {event.timestamp}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
