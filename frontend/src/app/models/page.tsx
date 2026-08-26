"use client";

import { useCallback, useEffect, useState } from "react";
import {
  TickDouble02Icon,
  Target01Icon,
  Analytics01Icon,
  Loading01Icon,
  CpuSettingsIcon,
} from "hugeicons-react";
import { FeatureImportanceChart } from "@/components/dashboard/charts/FeatureImportanceChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { PageContainer, PageHeader } from "@/components/layout/PageHeader";
import { useAuthStore } from "@/store/auth";
import { useDashboardStore } from "@/store/dashboard";
import { API_BASE } from "@/lib/api";
import { cn } from "@/lib/utils";

interface ModelInfo {
  online: boolean;
  version: string | null;
  metrics: Record<string, number> | null;
  coverage: {
    totalCustomers: number;
    scoredCustomers: number;
    lastRunAt: string | null;
  };
}

export default function ModelsPage() {
  const { token } = useAuthStore();
  const { fetchDashboard, fetchCustomers } = useDashboardStore();
  const [info, setInfo] = useState<ModelInfo | null>(null);
  const [scoring, setScoring] = useState(false);
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/predictions/model/info`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setInfo(await res.json());
    } catch {
      setInfo(null);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  // Re-scores the whole workspace; the button used to be decorative.
  const rescoreAll = async () => {
    setScoring(true);
    setNotice("");
    try {
      const res = await fetch(`${API_BASE}/api/predictions/batch`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNotice(data.message ?? "Scoring complete");
      await Promise.all([load(), fetchDashboard(), fetchCustomers()]);
    } catch {
      setNotice("Could not reach the scoring service.");
    } finally {
      setScoring(false);
    }
  };

  const metrics = info?.metrics;
  const pct = (value?: number) =>
    value === undefined ? "—" : `${(value * 100).toFixed(1)}%`;

  return (
    <PageContainer>
      <PageHeader
        title="ML Models"
        description="The churn model behind your predictions"
      >
        <button
          type="button"
          onClick={rescoreAll}
          disabled={scoring}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:opacity-60"
        >
          {scoring && <Loading01Icon size={15} className="animate-spin" />}
          {scoring ? "Scoring…" : "Re-score all customers"}
        </button>
      </PageHeader>

      {notice && (
        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          {notice}
        </div>
      )}

      {/* Real service state instead of hard-coded accuracy figures. */}
      <div className="panel mb-4 flex flex-wrap items-center justify-between gap-4 p-4 sm:mb-6 sm:p-5">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-lg",
              info?.online ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
            )}
          >
            <CpuSettingsIcon size={20} />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-900">
              {info?.online ? "Model service online" : "Model service unreachable"}
            </p>
            <p className="truncate text-xs text-neutral-500">
              {info?.version ? `Version ${info.version}` : "No version reported"}
              {!info?.online &&
                " · predictions fall back to a deterministic rule-based score"}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-neutral-500">Coverage</p>
          <p className="text-sm font-medium text-neutral-900">
            {(info?.coverage.scoredCustomers ?? 0).toLocaleString()} /{" "}
            {(info?.coverage.totalCustomers ?? 0).toLocaleString()} scored
          </p>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-3 sm:gap-4">
        <StatCard
          title="AUC-ROC"
          value={pct(metrics?.auc_roc)}
          change={0}
          icon={Target01Icon}
          iconColor="#10b981"
        />
        <StatCard
          title="Precision"
          value={pct(metrics?.precision)}
          change={0}
          icon={TickDouble02Icon}
          iconColor="#6366f1"
        />
        <StatCard
          title="Recall"
          value={pct(metrics?.recall)}
          change={0}
          icon={Analytics01Icon}
          iconColor="#f59e0b"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
        <FeatureImportanceChart />

        <div className="panel p-5 sm:p-6">
          <h3 className="text-base font-semibold text-neutral-900">How scoring works</h3>
          <p className="mt-1 text-sm text-neutral-500">
            What the model reads, and what happens when a signal is missing.
          </p>

          <dl className="mt-5 space-y-4">
            {[
              {
                term: "Signals used",
                detail:
                  "Revenue, plan tier, account age, days since last activity, support tickets, feature usage, login frequency and NPS — plus two derived ratios.",
              },
              {
                term: "Missing columns",
                detail:
                  "Anything your export omits is estimated from the signals you did provide, so a partial file still produces a meaningful score rather than a default.",
              },
              {
                term: "Explanations",
                detail:
                  "Each prediction returns the factors that moved that specific customer's score, not a single global importance chart.",
              },
              {
                term: "When the service is down",
                detail:
                  "A deterministic rule-based score takes over, so rankings stay stable instead of changing on every refresh.",
              },
            ].map((row) => (
              <div key={row.term}>
                <dt className="text-sm font-medium text-neutral-900">{row.term}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-neutral-600">
                  {row.detail}
                </dd>
              </div>
            ))}
          </dl>

          {info?.coverage.lastRunAt && (
            <p className="mt-6 border-t border-neutral-100 pt-4 text-xs text-neutral-500">
              Last scored {new Date(info.coverage.lastRunAt).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
