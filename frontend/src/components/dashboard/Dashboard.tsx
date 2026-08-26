"use client";

import { useEffect } from "react";
import { useDashboardStore } from "@/store/dashboard";
import { CloudUploadIcon } from "hugeicons-react";

import { Topbar } from "./Topbar";
import { StatsGrid } from "./StatsGrid";
import { ChurnTrendChart } from "./charts/ChurnTrendChart";
import { RiskDistributionChart } from "./charts/RiskDistributionChart";
import { RevenueChart } from "./charts/RevenueChart";
import { ActivityFeed } from "./ActivityFeed";
import { AtRiskTable } from "./AtRiskTable";
import { PageContainer } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/empty-state";

export function Dashboard() {
  const { fetchDashboard, hasData, loaded, error } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <PageContainer>
      <Topbar />

      {error && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {error}
        </div>
      )}

      {/* A fresh workspace gets an onboarding prompt, not six zeroed cards. */}
      {loaded && !hasData && !error ? (
        <div className="panel">
          <EmptyState
            icon={CloudUploadIcon}
            title="No customer data yet"
            description="Import a CSV or connect Stripe, and every account will be scored automatically."
            actionLabel="Import your data"
            actionHref="/import"
          />
        </div>
      ) : (
        <>
          <StatsGrid />
          <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 xl:grid-cols-2">
            <ChurnTrendChart />
            <RiskDistributionChart />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <RevenueChart />
            </div>
            <ActivityFeed />
          </div>
          <div className="mt-4 sm:mt-6">
            <AtRiskTable />
          </div>
        </>
      )}
    </PageContainer>
  );
}
