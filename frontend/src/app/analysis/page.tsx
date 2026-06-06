"use client";

import { ChurnTrendChart } from "@/components/dashboard/charts/ChurnTrendChart";
import { RiskDistributionChart } from "@/components/dashboard/charts/RiskDistributionChart";
import { ChurnReasonChart } from "@/components/dashboard/charts/ChurnReasonChart";

export default function AnalysisPage() {
  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Churn Analysis</h1>
          <p className="text-sm text-neutral-500">In-depth analytics on churn factors</p>
        </div>
      </div>
      
      <div className="mb-6">
        <ChurnTrendChart />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RiskDistributionChart />
        <ChurnReasonChart />
      </div>
    </div>
  );
}
