import { create } from "zustand";
import { useAuthStore } from "./auth";
import type { DashboardStats, Customer, ActivityEvent } from "@/types";
import {
  dashboardStats,
  recentActivity,
  topChurnRiskCustomers,
  allCustomers,
} from "@/lib/mock-data";

interface DashboardState {
  stats: DashboardStats;
  customers: Customer[];
  atRiskCustomers: Customer[];
  activity: ActivityEvent[];
  sidebarOpen: boolean;
  selectedTimeRange: string;
  setSidebarOpen: (open: boolean) => void;
  setSelectedTimeRange: (range: string) => void;
  fetchDashboard: () => Promise<void>;
  fetchCustomers: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: dashboardStats,
  customers: allCustomers,
  atRiskCustomers: topChurnRiskCustomers,
  activity: recentActivity,
  sidebarOpen: true,
  selectedTimeRange: "30d",
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSelectedTimeRange: (range) => set({ selectedTimeRange: range }),
  fetchDashboard: async () => {
    try {
      const token = useAuthStore.getState().token;
      const res = await fetch("http://localhost:3002/api/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        set({ stats: data.stats, atRiskCustomers: data.atRiskCustomers || [] });
      }
    } catch {
      // Use mock data as fallback
    }
  },
  fetchCustomers: async () => {
    try {
      const token = useAuthStore.getState().token;
      const res = await fetch("http://localhost:3002/api/customers?limit=1000", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        set({ customers: data.customers });
      }
    } catch {
      console.error("Failed to fetch customers");
    }
  },
}));
