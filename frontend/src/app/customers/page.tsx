"use client";

import { useEffect, useMemo } from "react";
import { useDashboardStore } from "@/store/dashboard";
import { StatCard } from "@/components/dashboard/StatCard";
import { CustomerDirectoryTable } from "@/components/customers/CustomerDirectoryTable";
import { PageContainer, PageHeader } from "@/components/layout/PageHeader";
import { UserGroupIcon, DollarCircleIcon, ChartLineData01Icon } from "hugeicons-react";

export default function CustomersPage() {
  const { customers, fetchCustomers } = useDashboardStore();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Derived from the tenant's own records rather than placeholder figures.
  const metrics = useMemo(() => {
    const totalMrr = customers.reduce((sum, c) => sum + c.mrr, 0);
    const paying = customers.filter((c) => c.mrr > 0);
    return {
      total: customers.length,
      totalMrr,
      avgMrr: paying.length > 0 ? totalMrr / paying.length : 0,
    };
  }, [customers]);

  return (
    <PageContainer>
      <PageHeader
        title="Customers"
        description="Manage and monitor every account in your workspace"
      />

      <div className="mb-4 grid grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-3 sm:gap-4">
        <StatCard
          title="Total Customers"
          value={metrics.total.toLocaleString()}
          change={0}
          icon={UserGroupIcon}
          iconColor="#6366f1"
        />
        <StatCard
          title="Total MRR"
          value={`$${Math.round(metrics.totalMrr).toLocaleString()}`}
          change={0}
          icon={DollarCircleIcon}
          iconColor="#f59e0b"
        />
        <StatCard
          title="Average MRR"
          value={`$${Math.round(metrics.avgMrr).toLocaleString()}`}
          change={0}
          icon={ChartLineData01Icon}
          iconColor="#10b981"
        />
      </div>

      <CustomerDirectoryTable />
    </PageContainer>
  );
}
