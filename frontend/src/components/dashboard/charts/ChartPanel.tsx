import { cn } from "@/lib/utils";
import { CARD } from "@/lib/ui";

/**
 * One panel wrapper for every chart, so headings, padding and legends stay
 * consistent instead of each chart inventing its own.
 */
export function ChartPanel({
  title,
  description,
  legend,
  action,
  headline,
  children,
  className,
  dimmed,
}: {
  title: string;
  description?: string;
  legend?: React.ReactNode;
  action?: React.ReactNode;
  /** A figure under the title - e.g. the value under the crosshair. */
  headline?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** While a refetch runs, the chart holds its last frame at reduced opacity. */
  dimmed?: boolean;
}) {
  return (
    <section className={cn(CARD, "flex min-w-0 flex-col", className)}>
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2 px-4 pb-1 pt-3.5">
        <div className="min-w-0">
          <h2 className="text-[14px] font-semibold text-foreground">{title}</h2>
          {description && <p className="mt-0.5 text-[12px] text-muted-foreground">{description}</p>}
        </div>
        {(legend || action) && (
          <div className="flex flex-wrap items-center gap-3">
            {legend}
            {action}
          </div>
        )}
      </div>
      {headline && <div className="px-4 pt-1">{headline}</div>}
      <div className={cn("min-w-0 flex-1 px-4 pb-4 pt-3 transition-opacity duration-200", dimmed && "opacity-55")}>
        {children}
      </div>
    </section>
  );
}
