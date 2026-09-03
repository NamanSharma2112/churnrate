"use client";

import { useEffect } from "react";
import { AtRiskTable } from "@/components/dashboard/AtRiskTable";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { StatCard } from "@/components/dashboard/StatCard";
import { Alert01Icon, DollarCircleIcon } from "hugeicons-react";
import { useDashboardStore } from "@/store/dashboard";

export default function AtRiskPage() {
  // The table and feed are store-backed; fetch so they show real accounts
  // rather than the mock fallback.
  const { fetchDashboard, atRiskCustomers } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const atRiskMrr = atRiskCustomers.reduce((sum, c) => sum + (c.mrr ?? 0), 0);

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">At-Risk Customers</h1>
          <p className="text-sm text-neutral-500">High priority customers needing intervention</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <StatCard
          title="Total At-Risk MRR"
          value={`$${atRiskMrr.toLocaleString()}`}
          change={8.4}
          icon={DollarCircleIcon}
          iconColor="#ef4444"
        />
        <StatCard
          title="Accounts Requiring Action"
          value={atRiskCustomers.length.toLocaleString()}
          change={-2.1}
          icon={Alert01Icon}
          iconColor="#f59e0b"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AtRiskTable />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
