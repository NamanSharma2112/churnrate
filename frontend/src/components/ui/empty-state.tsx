import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Shared empty state. A new workspace has no data, and a wall of zeroed charts
 * reads as a broken product rather than one waiting for an import.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  className,
  compact,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        compact ? "px-4 py-8" : "px-6 py-14",
        className
      )}
    >
      <span
        className={cn(
          "mb-4 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-400",
          compact ? "size-10" : "size-14"
        )}
      >
        <Icon size={compact ? 20 : 26} />
      </span>
      <h3
        className={cn(
          "font-semibold text-neutral-900",
          compact ? "text-sm" : "text-base"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-1.5 max-w-sm text-neutral-500",
          compact ? "text-xs" : "text-sm"
        )}
      >
        {description}
      </p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-5 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
