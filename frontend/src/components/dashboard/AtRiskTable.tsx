"use client";

import { FiArrowDown, FiArrowUp, FiMinus } from "react-icons/fi";
import { useDashboardStore } from "@/store/dashboard";

function getRiskBadge(risk: number) {
  if (risk >= 0.8)
    return { label: "Critical", color: "bg-red-500/10 text-red-400" };
  if (risk >= 0.6)
    return { label: "High", color: "bg-orange-500/10 text-orange-400" };
  if (risk >= 0.4)
    return { label: "Medium", color: "bg-yellow-500/10 text-yellow-400" };
  return { label: "Low", color: "bg-emerald-500/10 text-emerald-400" };
}

function getHealthColor(score: number) {
  if (score >= 70) return "text-emerald-400";
  if (score >= 40) return "text-yellow-400";
  return "text-red-400";
}

const trendIcon = {
  up: <FiArrowUp className="text-emerald-400" size={12} />,
  down: <FiArrowDown className="text-red-400" size={12} />,
  stable: <FiMinus className="text-stone-500" size={12} />,
};

export function AtRiskTable() {
  const { atRiskCustomers } = useDashboardStore();

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-900 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-stone-200">
            Top At-Risk Customers
          </h3>
          <p className="text-xs text-stone-500">
            Customers with highest predicted churn probability
          </p>
        </div>
        <button className="rounded-lg border border-stone-700 px-3 py-1.5 text-xs text-stone-400 transition-colors hover:text-stone-200">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-800 text-left text-xs uppercase tracking-wider text-stone-500">
              <th className="pb-3 pr-4">Customer</th>
              <th className="pb-3 pr-4">Plan</th>
              <th className="pb-3 pr-4">MRR</th>
              <th className="pb-3 pr-4">Churn Risk</th>
              <th className="pb-3 pr-4">Health</th>
              <th className="pb-3 pr-4">Trend</th>
              <th className="pb-3 pr-4">Last Active</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {atRiskCustomers.map((customer) => {
              const badge = getRiskBadge(customer.churnRisk);
              return (
                <tr
                  key={customer.id}
                  className="border-b border-stone-800/50 transition-colors hover:bg-stone-800/30"
                >
                  <td className="py-3 pr-4">
                    <div>
                      <p className="text-sm font-medium text-stone-200">
                        {customer.company}
                      </p>
                      <p className="text-xs text-stone-500">{customer.name}</p>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full bg-stone-800 px-2 py-0.5 text-xs capitalize text-stone-400">
                      {customer.plan}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-sm text-stone-300">
                    ${customer.mrr}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-stone-800">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${customer.churnRisk * 100}%`,
                            backgroundColor:
                              customer.churnRisk >= 0.8
                                ? "#ef4444"
                                : customer.churnRisk >= 0.6
                                  ? "#f97316"
                                  : "#f59e0b",
                          }}
                        />
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${badge.color}`}
                      >
                        {(customer.churnRisk * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`text-sm font-medium ${getHealthColor(customer.healthScore)}`}
                    >
                      {customer.healthScore}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    {trendIcon[customer.engagementTrend]}
                  </td>
                  <td className="py-3 pr-4 text-xs text-stone-500">
                    {customer.lastActive}
                  </td>
                  <td className="py-3">
                    <button className="rounded-md bg-indigo-600/10 px-3 py-1 text-xs font-medium text-indigo-400 transition-colors hover:bg-indigo-600/20">
                      Intervene
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
