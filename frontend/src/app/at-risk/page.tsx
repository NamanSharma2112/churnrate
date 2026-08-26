"use client";

import { useEffect } from "react";
import { useDashboardStore } from "@/store/dashboard";
import { AtRiskTable } from "@/components/dashboard/AtRiskTable";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { StatCard } from "@/components/dashboard/StatCard";
import { PageContainer, PageHeader } from "@/components/layout/PageHeader";
import { Alert01Icon, DollarCircleIcon } from "hugeicons-react";

export default function AtRiskPage() {
  const { fetchDashboard, atRiskCustomers, atRiskMrr, stats } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <PageContainer>
      <PageHeader
        title="At-Risk Customers"
        description="High-priority accounts that need intervention"
      />

      <div className="mb-4 grid grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-4">
        <StatCard
          title="MRR at risk"
          value={`$${Math.round(atRiskMrr).toLocaleString()}`}
          change={0}
          icon={DollarCircleIcon}
          iconColor="#ef4444"
          inverse
        />
        <StatCard
          title="Accounts requiring action"
          value={(stats.atRiskCustomers || atRiskCustomers.length).toLocaleString()}
          change={stats.atRiskChange}
          icon={Alert01Icon}
          iconColor="#f59e0b"
          inverse
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AtRiskTable showViewAll={false} />
        </div>
        <ActivityFeed />
      </div>
    </PageContainer>
  );
}
