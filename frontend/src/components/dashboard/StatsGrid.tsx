"use client";

import {
  FiUsers,
  FiActivity,
  FiTrendingDown,
  FiDollarSign,
  FiAlertTriangle,
  FiHeart,
} from "react-icons/fi";
import { StatCard } from "./StatCard";
import { useDashboardStore } from "@/store/dashboard";

export function StatsGrid() {
  const { stats } = useDashboardStore();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <StatCard
        title="Total Customers"
        value={stats.totalCustomers.toLocaleString()}
        change={stats.totalCustomersChange}
        icon={FiUsers}
        iconColor="#6366f1"
      />
      <StatCard
        title="Active Customers"
        value={stats.activeCustomers.toLocaleString()}
        change={stats.activeCustomersChange}
        icon={FiActivity}
        iconColor="#10b981"
      />
      <StatCard
        title="Churn Rate"
        value={`${stats.churnRate}%`}
        change={stats.churnRateChange}
        icon={FiTrendingDown}
        iconColor="#ef4444"
      />
      <StatCard
        title="MRR"
        value={`$${(stats.mrr / 1000).toFixed(1)}k`}
        change={stats.mrrChange}
        icon={FiDollarSign}
        iconColor="#f59e0b"
      />
      <StatCard
        title="At-Risk"
        value={stats.atRiskCustomers.toString()}
        change={stats.atRiskChange}
        icon={FiAlertTriangle}
        iconColor="#f97316"
      />
      <StatCard
        title="Health Score"
        value={stats.avgHealthScore.toString()}
        change={stats.avgHealthScoreChange}
        icon={FiHeart}
        iconColor="#ec4899"
        suffix="/100"
      />
    </div>
  );
}
