import { create } from "zustand";
import { useAuthStore } from "./auth";
import { API_BASE } from "@/lib/api";
import type {
  DashboardStats,
  Customer,
  ActivityEvent,
  ChurnTrendPoint,
  RiskDistribution,
  RevenueData,
  ChurnReason,
  FeatureImportance,
  PlanUsage,
} from "@/types";
import {
  dashboardStats,
  recentActivity,
  topChurnRiskCustomers,
  allCustomers,
  churnTrendData,
  riskDistribution,
  revenueData,
} from "@/lib/mock-data";

interface DashboardState {
  stats: DashboardStats;
  customers: Customer[];
  atRiskCustomers: Customer[];
  activity: ActivityEvent[];
  churnTrend: ChurnTrendPoint[];
  riskDistribution: RiskDistribution[];
  revenue: RevenueData[];
  churnReasons: ChurnReason[];
  featureImportance: FeatureImportance[];
  usage: PlanUsage | null;
  sidebarOpen: boolean;
  selectedTimeRange: string;
  setSidebarOpen: (open: boolean) => void;
  setSelectedTimeRange: (range: string) => void;
  fetchDashboard: () => Promise<void>;
  fetchCustomers: () => Promise<void>;
  fetchFeatureImportance: () => Promise<void>;
  fetchUsage: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: dashboardStats,
  customers: allCustomers,
  atRiskCustomers: topChurnRiskCustomers,
  activity: recentActivity,
  churnTrend: churnTrendData,
  riskDistribution: riskDistribution,
  revenue: revenueData,
  churnReasons: [],
  featureImportance: [],
  usage: null,
  sidebarOpen: true,
  selectedTimeRange: "30d",
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSelectedTimeRange: (range) => set({ selectedTimeRange: range }),
  fetchDashboard: async () => {
    try {
      const token = useAuthStore.getState().token;
      const headers = { Authorization: `Bearer ${token}` };

      // Each dashboard panel is backed by its own endpoint.
      const [
        statsRes,
        atRiskRes,
        riskRes,
        activityRes,
        trendRes,
        revenueRes,
        reasonsRes,
      ] = await Promise.all([
        fetch(`${API_BASE}/api/dashboard/stats`, { headers }),
        fetch(`${API_BASE}/api/dashboard/at-risk`, { headers }),
        fetch(`${API_BASE}/api/dashboard/risk-distribution`, { headers }),
        fetch(`${API_BASE}/api/dashboard/activity`, { headers }),
        fetch(`${API_BASE}/api/dashboard/churn-trend`, { headers }),
        fetch(`${API_BASE}/api/dashboard/revenue`, { headers }),
        fetch(`${API_BASE}/api/dashboard/churn-reasons`, { headers }),
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
      if (revenueRes.ok) {
        const data = await revenueRes.json();
        if (data.data?.length) {
          set({ revenue: data.data });
        }
      }
      if (reasonsRes.ok) {
        const data = await reasonsRes.json();
        set({ churnReasons: data.reasons ?? [] });
      }
    } catch {
      // Use mock data as fallback
    }
  },
  fetchFeatureImportance: async () => {
    try {
      const token = useAuthStore.getState().token;
      const res = await fetch(`${API_BASE}/api/predictions/feature-importance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        set({ featureImportance: data.features ?? [] });
      }
    } catch {
      console.error("Failed to fetch feature importance");
    }
  },
  fetchUsage: async () => {
    try {
      const token = useAuthStore.getState().token;
      const res = await fetch(`${API_BASE}/api/dashboard/usage`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        set({ usage: data.usage ?? null });
      }
    } catch {
      console.error("Failed to fetch plan usage");
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
