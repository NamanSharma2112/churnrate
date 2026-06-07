"use client";
import { useEffect } from "react";
import { useDashboardStore } from "@/store/dashboard";

import { Topbar } from "./Topbar";
import { StatsGrid } from "./StatsGrid";
import { ChurnTrendChart } from "./charts/ChurnTrendChart";
import { RiskDistributionChart } from "./charts/RiskDistributionChart";
import { RevenueChart } from "./charts/RevenueChart";
import { ActivityFeed } from "./ActivityFeed";
import { AtRiskTable } from "./AtRiskTable";

export function Dashboard() {
  const { fetchDashboard } = useDashboardStore();
  
  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <div className="min-h-screen p-6">
      <Topbar />
      <StatsGrid />
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChurnTrendChart />
        <RiskDistributionChart />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <ActivityFeed />
      </div>
      <div className="mt-6">
        <AtRiskTable />
      </div>
    </div>
  );
}
