"use client";
import { useEffect } from "react";
import { useDashboardStore } from "@/store/dashboard";
import { StatCard } from "@/components/dashboard/StatCard";
import { CustomerDirectoryTable } from "@/components/customers/CustomerDirectoryTable";
import { UserGroupIcon, Coins01Icon, ChartLineData01Icon } from "hugeicons-react";

export default function CustomersPage() {
  const { fetchCustomers } = useDashboardStore();
  
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Customers</h1>
          <p className="text-sm text-neutral-500">Manage and monitor customer accounts</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          title="Total Customers"
          value="2,420"
          change={12.5}
          icon={UserGroupIcon}
          iconColor="#6366f1"
        />
        <StatCard
          title="Customer Acquisition Cost (CAC)"
          value="$124.50"
          change={-2.4}
          icon={Coins01Icon}
          iconColor="#f59e0b"
        />
        <StatCard
          title="Lifetime Value (LTV)"
          value="$2,840"
          change={5.2}
          icon={ChartLineData01Icon}
          iconColor="#10b981"
        />
      </div>

      <CustomerDirectoryTable />
    </div>
  );
}
