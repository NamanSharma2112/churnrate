import { create } from "zustand";
import type { DashboardStats, Customer, ActivityEvent } from "@/types";
import {
  dashboardStats,
  recentActivity,
  topChurnRiskCustomers,
} from "@/lib/mock-data";

interface DashboardState {
  stats: DashboardStats;
  atRiskCustomers: Customer[];
  activity: ActivityEvent[];
  sidebarOpen: boolean;
  selectedTimeRange: string;
  setSidebarOpen: (open: boolean) => void;
  setSelectedTimeRange: (range: string) => void;
  fetchDashboard: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: dashboardStats,
  atRiskCustomers: topChurnRiskCustomers,
  activity: recentActivity,
  sidebarOpen: true,
  selectedTimeRange: "30d",
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSelectedTimeRange: (range) => set({ selectedTimeRange: range }),
  fetchDashboard: async () => {
    try {
      const res = await fetch("/api/dashboard/stats");
      if (res.ok) {
        const data = await res.json();
        set({ stats: data.stats });
      }
    } catch {
      // Use mock data as fallback
    }
  },
}));
