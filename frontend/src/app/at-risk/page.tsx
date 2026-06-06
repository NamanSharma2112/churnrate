"use client";

import { AtRiskTable } from "@/components/dashboard/AtRiskTable";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { StatCard } from "@/components/dashboard/StatCard";
import { Alert01Icon, DollarCircleIcon } from "hugeicons-react";

export default function AtRiskPage() {
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
          value="$12,450"
          change={8.4}
          icon={DollarCircleIcon}
          iconColor="#ef4444"
        />
        <StatCard
          title="Accounts Requiring Action"
          value="18"
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
