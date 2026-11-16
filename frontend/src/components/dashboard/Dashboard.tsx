"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Activity, ArrowDownRight, ArrowUpRight, CircleDashed, DollarSign, HeartPulse, RefreshCw, TriangleAlert, Upload, Users } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard";
import { useAuthStore } from "@/store/auth";
import { toast } from "@/store/shell";
import { API_BASE } from "@/lib/api";
import { count, moneyCompact, percent } from "@/lib/format";
import { BTN_PRIMARY, BTN_SECONDARY, CARD } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { Num } from "@/components/ui/num";
import { Segmented } from "@/components/ui/segmented";
import { EmptyState } from "@/components/ui/empty-state";
import { PageContainer } from "@/components/layout/PageHeader";
import { ArcRing } from "@/components/charts/ArcRing";
import { ChurnTrendChart } from "./charts/ChurnTrendChart";
import { NetRevenueChart, RevenueChart } from "./charts/RevenueChart";
import { RiskDistributionChart } from "./charts/RiskDistributionChart";
import { ActivityFeed } from "./ActivityFeed";
import { AtRiskTable } from "./AtRiskTable";

const RANGES = [
  { key: "7d", label: "7d", long: "the last 7 days" },
  { key: "30d", label: "30d", long: "the last 30 days" },
  { key: "90d", label: "90d", long: "the last 90 days" },
  { key: "1y", label: "1y", long: "the last 12 months" },
] as const;
type RangeKey = (typeof RANGES)[number]["key"];

function greeting(hour: number) {
  if (hour < 5) return "Good evening";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/** A delta chip: direction x whether up is good picks the color. */
function Delta({ value, inverse, unit = "%" }: { value: number; inverse?: boolean; unit?: string }) {
  if (!value) return <span className="text-muted-foreground">No change</span>;
  const up = value > 0;
  const good = inverse ? !up : up;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={cn("inline-flex items-center gap-0.5", good ? "text-success" : "text-destructive")}>
      <Icon aria-hidden className="size-3.5" />
      {Math.abs(value)}
      {unit}
    </span>
  );
}

function HealthCard() {
  const { stats, loaded } = useDashboardStore();
  const score = stats.avgHealthScore;
  const color = score >= 70 ? "var(--series-1)" : score >= 40 ? "var(--status-warning)" : "var(--status-critical)";
  const activeShare = stats.totalCustomers ? Math.round((stats.activeCustomers / stats.totalCustomers) * 100) : 0;
  return (
    <section className={cn(CARD, "px-4 pb-4 pt-3.5")}>
      <h2 className="text-[14px] font-semibold text-foreground">Customer health</h2>
      <p className="mt-0.5 text-[12px] text-muted-foreground">Average score across every account</p>
      <div className="mt-3 flex items-center gap-4">
        {loaded ? (
          <ArcRing value={score} color={color} label="Average health score" caption="out of 100" />
        ) : (
          <div className="size-[132px]" />
        )}
        <dl className="min-w-0 space-y-2.5 text-[12px]">
          <div>
            <dt className="text-muted-foreground">Change</dt>
            <dd className="font-medium tabular-nums">
              <Delta value={stats.avgHealthScoreChange} unit=" pts" />
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Active in 30 days</dt>
            <dd className="font-medium tabular-nums text-foreground">{activeShare}%</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export function Dashboard() {
  const uid = useId();
  const { fetchDashboard, hasData, loaded, error, stats, selectedTimeRange, setSelectedTimeRange } = useDashboardStore();
  const { user, token } = useAuthStore();
  const [now] = useState(() => new Date());
  const [scoring, setScoring] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const range = RANGES.find((r) => r.key === selectedTimeRange) ?? RANGES[1];
  const firstName = user?.name?.split(" ")[0];

  const rescore = async () => {
    if (!token || scoring) return;
    setScoring(true);
    try {
      const res = await fetch(`${API_BASE}/api/predictions/batch`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error();
      await fetchDashboard();
      toast({ message: "Scores refreshed", detail: "Every account was re-scored against the model." });
    } catch {
      toast({ message: "Could not re-score", detail: "Is the API reachable?", tone: "error" });
    } finally {
      setScoring(false);
    }
  };

  const tiles = [
    { label: "Customers", icon: Users, value: stats.totalCustomers, fmt: count, delta: <Delta value={stats.totalCustomersChange} /> },
    { label: "Active", icon: Activity, value: stats.activeCustomers, fmt: count, delta: <Delta value={stats.activeCustomersChange} /> },
    { label: "Churn rate", icon: CircleDashed, value: stats.churnRate, fmt: (v: number) => percent(v), delta: <Delta value={stats.churnRateChange} inverse unit=" pts" /> },
    { label: "MRR", icon: DollarSign, value: stats.mrr, fmt: moneyCompact, delta: <Delta value={stats.mrrChange} /> },
    {
      label: "At risk",
      icon: TriangleAlert,
      value: stats.atRiskCustomers,
      fmt: count,
      delta: <Delta value={stats.atRiskChange} inverse />,
      alert: stats.atRiskCustomers > 0,
    },
    { label: "Avg health", icon: HeartPulse, value: stats.avgHealthScore, fmt: count, delta: <Delta value={stats.avgHealthScoreChange} unit=" pts" /> },
  ];

  return (
    <PageContainer className="@container/main">
      {/* Title row */}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div className="min-w-0">
          <h1 className="text-[22px] font-semibold leading-7 tracking-[-0.015em] text-foreground">
            {greeting(now.getHours())}
            {firstName ? `, ${firstName}` : ""}
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground">
            <time dateTime={now.toISOString().slice(0, 10)}>
              {now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </time>
            <span aria-hidden> · </span>
            How your customers moved over {range.long}.
          </p>
        </div>
        {/* Filters scope everything below them: one row, date range first. */}
        <div className="flex flex-wrap items-center gap-2">
          <Segmented
            label="Time range"
            idBase={`${uid}-range`}
            value={range.key as RangeKey}
            onChange={(k) => setSelectedTimeRange(k)}
            options={RANGES.map((r) => ({ key: r.key, label: r.label }))}
          />
          <button type="button" onClick={rescore} disabled={scoring} className={BTN_SECONDARY}>
            <RefreshCw aria-hidden className={cn("size-3.5", scoring && "animate-spin")} />
            {scoring ? "Scoring…" : "Re-score"}
          </button>
          <Link href="/import" className={BTN_PRIMARY}>
            <Upload aria-hidden className="size-3.5" />
            Import
          </Link>
        </div>
      </div>

      {error && (
        <div role="alert" className="mt-6 rounded-[10px] border border-[var(--status-warning)]/30 bg-[var(--status-warning)]/10 px-4 py-3 text-[13px] text-warning">
          {error}
        </div>
      )}

      {loaded && !hasData && !error ? (
        <div className={cn(CARD, "mt-6")}>
          <EmptyState
            icon={Upload}
            title="No customer data yet"
            description="Import a CSV or connect Stripe, and every account is scored automatically."
            actionLabel="Import your data"
            actionHref="/import"
          />
        </div>
      ) : (
        <>
          {/* Stat strip */}
          <dl className={cn(CARD, "mt-6 grid grid-cols-2 @min-[620px]/main:grid-cols-3 @min-[1020px]/main:grid-cols-6")}>
            {tiles.map((t, i) => (
              <div
                key={t.label}
                className={cn(
                  "flex min-w-0 flex-col border-border px-4 py-3.5",
                  // Hairlines between cells at every breakpoint, never on the outer edge.
                  i % 2 === 1 && "border-l",
                  i >= 2 && "border-t",
                  "@min-[620px]/main:border-l @min-[620px]/main:[&:nth-child(3n+1)]:border-l-0 @min-[620px]/main:[&:nth-child(-n+3)]:border-t-0 @min-[620px]/main:[&:nth-child(n+4)]:border-t",
                  "@min-[1020px]/main:border-t-0 @min-[1020px]/main:[&:nth-child(n+4)]:border-t-0 @min-[1020px]/main:[&:nth-child(3n+1)]:border-l @min-[1020px]/main:first:border-l-0"
                )}
              >
                <dt className="flex items-center gap-1.5 text-[12px] text-subtle">
                  <t.icon aria-hidden className={cn("size-3.5", t.alert ? "text-destructive" : "text-muted-foreground")} strokeWidth={1.75} />
                  {t.label}
                </dt>
                <dd className={cn("mt-1.5 text-[22px] font-medium leading-7", t.alert ? "text-destructive" : "text-foreground")}>
                  <Num value={t.value} format={t.fmt} />
                </dd>
                <dd className="mt-0.5 truncate text-[12px] tabular-nums">{t.delta}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 grid items-start gap-4 @min-[920px]/main:grid-cols-[minmax(0,1fr)_300px]">
            <div className="flex min-w-0 flex-col gap-4">
              <ChurnTrendChart />
              <div className="grid gap-4 @min-[760px]/main:grid-cols-2">
                <RevenueChart />
                <NetRevenueChart />
              </div>
              <AtRiskTable />
            </div>
            <div className="flex min-w-0 flex-col gap-4">
              <HealthCard />
              <RiskDistributionChart />
              <ActivityFeed />
            </div>
          </div>
        </>
      )}
    </PageContainer>
  );
}
