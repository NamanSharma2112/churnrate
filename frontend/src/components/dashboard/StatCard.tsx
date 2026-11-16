import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CARD } from "@/lib/ui";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  /** Kept for callers; the calm palette draws every stat icon in muted ink. */
  iconColor?: string;
  suffix?: string;
  /** True when a rise is bad news (churn, at-risk counts). */
  inverse?: boolean;
}

export function StatCard({ title, value, change, icon: Icon, suffix, inverse }: StatCardProps) {
  const flat = change === 0;
  const up = change > 0;
  const good = inverse ? !up : up;
  return (
    <div className={cn(CARD, "flex min-w-0 flex-col px-4 py-3.5")}>
      <p className="flex items-center gap-1.5 text-[12px] text-subtle">
        <Icon aria-hidden size={14} className="text-muted-foreground" />
        {title}
      </p>
      <p className="mt-1.5 text-[22px] font-medium leading-7 text-foreground">
        {value}
        {suffix && <span className="ml-0.5 text-[13px] font-normal text-muted-foreground">{suffix}</span>}
      </p>
      <p
        className={cn(
          "mt-0.5 flex items-center gap-0.5 text-[12px] tabular-nums",
          flat ? "text-muted-foreground" : good ? "text-success" : "text-destructive"
        )}
      >
        {!flat && (up ? <ArrowUpRight aria-hidden className="size-3.5" /> : <ArrowDownRight aria-hidden className="size-3.5" />)}
        {flat ? "No change" : `${Math.abs(change)}%`}
      </p>
    </div>
  );
}
