import { create } from "zustand";
import { useAuthStore } from "./auth";
import { API_BASE } from "@/lib/api";
import type {
  DashboardStats,
  Customer,
  ActivityEvent,
  ChurnTrendPoint,
  RiskDistribution,
} from "@/types";
import {
  dashboardStats,
  recentActivity,
  topChurnRiskCustomers,
  allCustomers,
  churnTrendData,
  riskDistribution,
} from "@/lib/mock-data";

interface DashboardState {
  stats: DashboardStats;
  customers: Customer[];
  atRiskCustomers: Customer[];
  activity: ActivityEvent[];
  churnTrend: ChurnTrendPoint[];
  riskDistribution: RiskDistribution[];
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
  churnTrend: churnTrendData,
  riskDistribution: riskDistribution,
  sidebarOpen: true,
  selectedTimeRange: "30d",
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSelectedTimeRange: (range) => set({ selectedTimeRange: range }),
  fetchDashboard: async () => {
    try {
      const token = useAuthStore.getState().token;
      const headers = { Authorization: `Bearer ${token}` };

      // Each dashboard panel is backed by its own endpoint.
      const [statsRes, atRiskRes, riskRes, activityRes, trendRes] =
        await Promise.all([
          fetch(`${API_BASE}/api/dashboard/stats`, { headers }),
          fetch(`${API_BASE}/api/dashboard/at-risk`, { headers }),
          fetch(`${API_BASE}/api/dashboard/risk-distribution`, { headers }),
          fetch(`${API_BASE}/api/dashboard/activity`, { headers }),
          fetch(`${API_BASE}/api/dashboard/churn-trend`, { headers }),
        ]);

      if (statsRes.ok) {
        const data = await statsRes.json();
        set({ stats: data.stats });
      }
      if (atRiskRes.ok) {
        const data = await atRiskRes.json();
        set({ atRiskCustomers: data.customers ?? [] });
      }
      if (riskRes.ok) {
        const data = await riskRes.json();
        if (data.distribution?.length) {
          set({ riskDistribution: data.distribution });
        }
      }
      if (activityRes.ok) {
        const data = await activityRes.json();
        if (data.activity?.length) {
          set({ activity: data.activity });
        }
      }
      if (trendRes.ok) {
        const data = await trendRes.json();
        // Keep the illustrative mock series when the tenant has no metrics yet.
        if (data.data?.length) {
          set({ churnTrend: data.data });
        }
      }
    } catch {
      // Use mock data as fallback
    }
  },
  fetchCustomers: async () => {
    try {
      const token = useAuthStore.getState().token;
      const res = await fetch(`${API_BASE}/api/customers?limit=1000`, {
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
