"use client";

import { useEffect, useState } from "react";
import { RevenueChart } from "@/components/dashboard/charts/RevenueChart";
import { PageContainer, PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/empty-state";
import { useDashboardStore } from "@/store/dashboard";
import { DocumentValidationIcon, Download01Icon } from "hugeicons-react";

/** Turns the in-memory customer list into a CSV the browser can save. */
function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (value: unknown) => {
    const text = value === null || value === undefined ? "" : String(value);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  return [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => escape(row[header])).join(",")),
  ].join("\n");
}

export default function ReportsPage() {
  const { customers, atRiskCustomers, fetchDashboard, fetchCustomers } =
    useDashboardStore();
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboard();
    fetchCustomers();
  }, [fetchDashboard, fetchCustomers]);

  // Reports are generated from live data and downloaded client-side, replacing
  // the previous list of fabricated PDF entries.
  const download = (name: string, rows: Record<string, unknown>[]) => {
    setDownloading(name);
    try {
      const blob = new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${name}-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(null);
    }
  };

  const reports = [
    {
      id: "all-customers",
      name: "Customer export",
      description: "Every account with plan, MRR, health score and churn risk",
      rows: customers.map((c) => ({
        company: c.company ?? "",
        name: c.name,
        email: c.email,
        plan: c.plan,
        mrr: c.mrr,
        healthScore: c.healthScore,
        churnRisk: c.churnRisk,
        riskLevel: c.riskLevel ?? "",
        signupDate: c.signupDate,
        lastActiveAt: c.lastActiveAt ?? "",
      })),
    },
    {
      id: "at-risk",
      name: "At-risk accounts",
      description: "High and critical risk accounts, ranked by churn probability",
      rows: atRiskCustomers.map((c) => ({
        company: c.company ?? "",
        name: c.name,
        email: c.email,
        mrr: c.mrr,
        churnRisk: c.churnRisk,
        riskLevel: c.riskLevel ?? "",
        healthScore: c.healthScore,
        lastActiveAt: c.lastActiveAt ?? "",
      })),
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Reports"
        description="Export your churn data for sharing or deeper analysis"
      />

      <div className="mb-4 sm:mb-6">
        <RevenueChart />
      </div>

      <div className="panel">
        <div className="border-b border-neutral-200 p-4 sm:p-5">
          <h3 className="text-base font-semibold text-neutral-900">Available reports</h3>
          <p className="mt-0.5 text-sm text-neutral-500">
            Generated from your current data, downloaded as CSV
          </p>
        </div>

        {customers.length === 0 ? (
          <EmptyState
            icon={DocumentValidationIcon}
            title="Nothing to report yet"
            description="Import customer data and your exports will appear here."
            actionLabel="Import data"
            actionHref="/import"
          />
        ) : (
          <div className="divide-y divide-neutral-100">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex flex-wrap items-center justify-between gap-3 p-4 transition-colors hover:bg-neutral-50 sm:px-5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <DocumentValidationIcon size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-900">{report.name}</p>
                    <p className="text-xs text-neutral-500">
                      {report.description} · {report.rows.length} row
                      {report.rows.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => download(report.id, report.rows)}
                  disabled={report.rows.length === 0 || downloading === report.id}
                  className="flex shrink-0 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 disabled:opacity-50"
                >
                  <Download01Icon size={16} />
                  Download CSV
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
