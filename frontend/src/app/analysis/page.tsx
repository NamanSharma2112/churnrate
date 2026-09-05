"use client";

import { useEffect } from "react";
import { useDashboardStore } from "@/store/dashboard";
import { ChurnTrendChart } from "@/components/dashboard/charts/ChurnTrendChart";
import { RiskDistributionChart } from "@/components/dashboard/charts/RiskDistributionChart";
import { ChurnReasonChart } from "@/components/dashboard/charts/ChurnReasonChart";
import { PageContainer, PageHeader } from "@/components/layout/PageHeader";

export default function AnalysisPage() {
  // Every page that renders dashboard data now loads it; the analysis and
  // at-risk pages previously rendered whatever happened to be in the store.
  const { fetchDashboard } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <PageContainer>
      <PageHeader
        title="Churn Analysis"
        description="In-depth analytics on what drives churn in your customer base"
      />

      <div className="mb-4 sm:mb-6">
        <ChurnTrendChart />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
        <RiskDistributionChart />
        <ChurnReasonChart />
      </div>
    </PageContainer>
  );
}
