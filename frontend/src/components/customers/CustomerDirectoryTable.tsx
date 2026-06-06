"use client";

import { useDashboardStore } from "@/store/dashboard";
import { Search01Icon, FilterIcon, MoreVerticalCircle01Icon } from "hugeicons-react";

function getHealthColor(score: number) {
  if (score >= 70) return "text-emerald-500 bg-emerald-50";
  if (score >= 40) return "text-yellow-500 bg-yellow-50";
  return "text-red-500 bg-red-50";
}

export function CustomerDirectoryTable() {
  const { customers } = useDashboardStore();

  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-neutral-200 p-5">
        <div>
          <h3 className="text-lg font-semibold text-neutral-800">All Customers</h3>
          <p className="text-sm text-neutral-500">
            A complete list of your customer accounts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search01Icon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-64 rounded-lg border border-neutral-200 bg-white py-2 pl-9 pr-4 text-sm text-neutral-800 placeholder-neutral-400 outline-none transition-colors focus:border-indigo-500 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-50 shadow-sm">
            <FilterIcon size={16} />
            Filter
          </button>
        </div>
      </div>
      <div className="overflow-x-auto p-5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200 text-left text-xs uppercase tracking-wider text-neutral-500">
              <th className="pb-3 pr-4 font-medium">Customer</th>
              <th className="pb-3 pr-4 font-medium">Plan</th>
              <th className="pb-3 pr-4 font-medium">MRR</th>
              <th className="pb-3 pr-4 font-medium">Health Score</th>
              <th className="pb-3 pr-4 font-medium">Status</th>
              <th className="pb-3 pr-4 font-medium">Join Date</th>
              <th className="pb-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-neutral-100 transition-colors hover:bg-neutral-50"
              >
                <td className="py-4 pr-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-800">
                      {customer.company}
                    </p>
                    <p className="text-xs text-neutral-500">{customer.name}</p>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium capitalize text-neutral-600">
                    {customer.plan}
                  </span>
                </td>
                <td className="py-4 pr-4 text-sm font-medium text-neutral-800">
                  ${customer.mrr.toLocaleString()}
                </td>
                <td className="py-4 pr-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getHealthColor(
                      customer.healthScore
                    )}`}
                  >
                    {customer.healthScore}/100
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </td>
                <td className="py-4 pr-4 text-sm text-neutral-500">
                  Oct 24, 2023
                </td>
                <td className="py-4 text-right">
                  <button className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-800">
                    <MoreVerticalCircle01Icon size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
