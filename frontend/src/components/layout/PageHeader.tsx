import { cn } from "@/lib/utils";

/**
 * Every page repeated the same title/subtitle/action markup with slightly
 * different spacing. One component keeps them aligned and makes the action row
 * wrap instead of overflowing on narrow screens.
 */
export function PageHeader({
  title,
  description,
  children,
  className,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-4", className)}>
      <div className="min-w-0">
        <h1 className="text-[22px] font-semibold leading-7 tracking-[-0.015em] text-foreground">{title}</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">{description}</p>
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

/** Consistent page width and padding, used by every route. */
export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-4 pb-12 pt-6 sm:px-6 sm:pt-8", className)}>{children}</div>
  );
}
