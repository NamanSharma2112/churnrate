"use client";

import { RevenueChart } from "@/components/dashboard/charts/RevenueChart";
import { DocumentValidationIcon, Download01Icon } from "hugeicons-react";

const reports = [
  { id: 1, name: "Q3 Churn Analysis", date: "Oct 1, 2023", size: "2.4 MB" },
  { id: 2, name: "Monthly Revenue Impact", date: "Sep 30, 2023", size: "1.1 MB" },
  { id: 3, name: "At-Risk Customer Cohort", date: "Sep 28, 2023", size: "3.5 MB" },
  { id: 4, name: "Annual Retention Summary", date: "Jan 5, 2023", size: "5.2 MB" },
];

export default function ReportsPage() {
  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Reports</h1>
          <p className="text-sm text-neutral-500">Generate and view automated churn reports</p>
        </div>
        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 shadow-sm">
          Generate New Report
        </button>
      </div>

      <div className="mb-6">
        <RevenueChart />
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 p-5">
          <h3 className="text-lg font-semibold text-neutral-800">Recent Reports</h3>
          <p className="text-sm text-neutral-500">Download previously generated reports</p>
        </div>
        <div className="divide-y divide-neutral-100">
          {reports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-5 transition-colors hover:bg-neutral-50">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <DocumentValidationIcon size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-800">{report.name}</p>
                  <p className="text-xs text-neutral-500">{report.date} • {report.size}</p>
                </div>
              </div>
              <button className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-50 shadow-sm">
                <Download01Icon size={16} />
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
