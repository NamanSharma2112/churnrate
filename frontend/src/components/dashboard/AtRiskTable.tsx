"use client";

import { ArrowDown01Icon, ArrowUp01Icon, MinusSignIcon } from "hugeicons-react";
import { useDashboardStore } from "@/store/dashboard";

function getRiskBadge(risk: number) {
  if (risk >= 0.8)
    return { label: "Critical", color: "bg-red-50 text-red-600" };
  if (risk >= 0.6)
    return { label: "High", color: "bg-orange-50 text-orange-600" };
  if (risk >= 0.4)
    return { label: "Medium", color: "bg-yellow-50 text-yellow-600" };
  return { label: "Low", color: "bg-emerald-50 text-emerald-600" };
}

function getHealthColor(score: number) {
  if (score >= 70) return "text-emerald-500";
  if (score >= 40) return "text-yellow-500";
  return "text-red-500";
}

const trendIcon = {
  up: <ArrowUp01Icon className="text-emerald-500" size={14} />,
  down: <ArrowDown01Icon className="text-red-500" size={14} />,
  stable: <MinusSignIcon className="text-neutral-400" size={14} />,
};

export function AtRiskTable() {
  const { atRiskCustomers } = useDashboardStore();

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-800">
            Top At-Risk Customers
          </h3>
          <p className="text-xs text-neutral-500">
            Customers with highest predicted churn probability
          </p>
        </div>
        <button className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-800">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200 text-left text-xs uppercase tracking-wider text-neutral-500">
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
                  className="border-b border-neutral-100 transition-colors hover:bg-neutral-50"
                >
                  <td className="py-3 pr-4">
                    <div>
                      <p className="text-sm font-medium text-neutral-800">
                        {customer.company}
                      </p>
                      <p className="text-xs text-neutral-500">{customer.name}</p>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs capitalize text-neutral-500">
                      {customer.plan}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-sm text-neutral-600">
                    ${customer.mrr}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-neutral-200">
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
                  <td className="py-3 pr-4 text-xs text-neutral-500">
                    {customer.lastActive}
                  </td>
                  <td className="py-3">
                    <button className="rounded-md bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-100">
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
