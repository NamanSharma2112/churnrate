import Link from "next/link";
import { cn } from "@/lib/utils";
import { BTN_PRIMARY } from "@/lib/ui";

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
    <div className={cn("flex flex-col items-center justify-center text-center", compact ? "px-4 py-8" : "px-6 py-14", className)}>
      <span
        className={cn(
          "mb-3 flex items-center justify-center rounded-full bg-accent text-muted-foreground",
          compact ? "size-9" : "size-12"
        )}
      >
        <Icon size={compact ? 18 : 22} strokeWidth={1.75} />
      </span>
      <h3 className={cn("font-medium text-foreground", compact ? "text-[13px]" : "text-[15px]")}>{title}</h3>
      <p className={cn("mt-1 max-w-sm text-muted-foreground", compact ? "text-[12px]" : "text-[13px]")}>{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className={cn(BTN_PRIMARY, "mt-4")}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
