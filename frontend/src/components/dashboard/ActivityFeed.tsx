"use client";

import {
  UserMinus01Icon,
  UserAdd01Icon,
  Alert01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  Activity01Icon,
} from "hugeicons-react";
import { formatDistanceToNow } from "date-fns";
import { useDashboardStore } from "@/store/dashboard";
import { EmptyState } from "@/components/ui/empty-state";

const iconMap: Record<string, { icon: typeof UserMinus01Icon; color: string }> = {
  churn: { icon: UserMinus01Icon, color: "#ef4444" },
  signup: { icon: UserAdd01Icon, color: "#10b981" },
  upgrade: { icon: ArrowUp01Icon, color: "#6366f1" },
  downgrade: { icon: ArrowDown01Icon, color: "#f59e0b" },
  warning: { icon: Alert01Icon, color: "#f97316" },
};

const fallbackIcon = { icon: Activity01Icon, color: "#a3a3a3" };

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return timestamp;
  return formatDistanceToNow(date, { addSuffix: true });
}

export function ActivityFeed() {
  const { activity } = useDashboardStore();

  return (
    <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-neutral-900">Recent Activity</h3>
        <p className="mt-0.5 text-xs text-neutral-500">Latest customer events</p>
      </div>

      {activity.length === 0 ? (
        <EmptyState
          compact
          icon={Activity01Icon}
          title="Nothing yet"
          description="Imports, upgrades and churn events will show up here."
          className="flex-1"
        />
      ) : (
        <div className="-mr-1 max-h-[420px] flex-1 space-y-1 overflow-y-auto pr-1">
          {activity.map((event) => {
            const { icon: Icon, color } = iconMap[event.type] ?? fallbackIcon;
            return (
              <div
                key={event.id}
                className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-neutral-50"
              >
                <span
                  className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon size={14} style={{ color }} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-neutral-900">
                    {event.customer}
                  </p>
                  <p className="text-xs leading-relaxed text-neutral-500">{event.message}</p>
                </div>
                <span className="shrink-0 whitespace-nowrap text-[10px] text-neutral-400">
                  {formatTimestamp(event.timestamp)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
