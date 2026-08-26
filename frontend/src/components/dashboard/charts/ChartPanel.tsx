import type { CSSProperties } from "react";

/** Shared Recharts tooltip chrome, matching the app's card styling. */
export const tooltipStyle: CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e5e5",
  borderRadius: "8px",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  fontSize: "12px",
  color: "#262626",
};

/**
 * One panel wrapper for every chart, so headings, padding and legends stay
 * consistent instead of each chart inventing its own.
 */
export function ChartPanel({
  title,
  description,
  legend,
  action,
  children,
}: {
  title: string;
  description: string;
  legend?: { label: string; color: string }[];
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
          <p className="mt-0.5 text-xs text-neutral-500">{description}</p>
        </div>
        {legend && (
          <div className="flex flex-wrap items-center gap-3">
            {legend.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-neutral-500">{item.label}</span>
              </div>
            ))}
          </div>
        )}
        {action}
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
