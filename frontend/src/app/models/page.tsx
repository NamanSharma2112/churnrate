"use client";

import { useEffect } from "react";
import { FeatureImportanceChart } from "@/components/dashboard/charts/FeatureImportanceChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { TickDouble02Icon, Target01Icon, Analytics01Icon } from "hugeicons-react";
import { useDashboardStore } from "@/store/dashboard";

export default function ModelsPage() {
  // Feature importance is averaged from stored predictions.
  const { fetchFeatureImportance } = useDashboardStore();

  useEffect(() => {
    fetchFeatureImportance();
  }, [fetchFeatureImportance]);

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">ML Models</h1>
          <p className="text-sm text-neutral-500">Configure and train churn prediction models</p>
        </div>
        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 shadow-sm">
          Retrain Model
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          title="Model Accuracy"
          value="94.2%"
          change={1.2}
          icon={Target01Icon}
          iconColor="#10b981"
        />
        <StatCard
          title="Precision"
          value="91.8%"
          change={0.5}
          icon={TickDouble02Icon}
          iconColor="#6366f1"
        />
        <StatCard
          title="Recall"
          value="89.4%"
          change={-0.2}
          icon={Analytics01Icon}
          iconColor="#f59e0b"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FeatureImportanceChart />
        
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm flex flex-col justify-center items-center text-center">
           <div className="h-16 w-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
             <Analytics01Icon size={32} />
           </div>
           <h3 className="text-lg font-semibold text-neutral-800 mb-2">Model Configuration</h3>
           <p className="text-sm text-neutral-500 max-w-sm mb-6">
             Adjust hyperparameters, select features, and deploy new versions of the churn prediction model.
           </p>
           <button className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 shadow-sm">
             Open Configuration
           </button>
        </div>
      </div>
    </div>
  );
}
