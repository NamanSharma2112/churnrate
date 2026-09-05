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
} from "@/types";

const EMPTY_STATS: DashboardStats = {
  totalCustomers: 0,
  totalCustomersChange: 0,
  activeCustomers: 0,
  activeCustomersChange: 0,
  churnRate: 0,
  churnRateChange: 0,
  mrr: 0,
  mrrChange: 0,
  atRiskCustomers: 0,
  atRiskChange: 0,
  avgHealthScore: 0,
  avgHealthScoreChange: 0,
};

interface DashboardState {
  stats: DashboardStats;
  customers: Customer[];
  atRiskCustomers: Customer[];
  atRiskMrr: number;
  activity: ActivityEvent[];
  churnTrend: ChurnTrendPoint[];
  riskDistribution: RiskDistribution[];
  revenue: RevenueData[];
  /** False until the tenant has at least one customer, so pages can onboard. */
  hasData: boolean;
  loading: boolean;
  loaded: boolean;
  error: string | null;
  selectedTimeRange: string;
  setSelectedTimeRange: (range: string) => void;
  fetchDashboard: () => Promise<void>;
  fetchCustomers: (search?: string) => Promise<void>;
}

async function getJson<T>(path: string, token: string | null): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/**
 * All dashboard data comes from the API.
 *
 * An earlier version seeded the store with mock records and only replaced some
 * of them on fetch, so a real workspace showed its own customer count next to a
 * fabricated $300k revenue chart and a stranger's activity feed.
 */
export const useDashboardStore = create<DashboardState>((set) => ({
  stats: EMPTY_STATS,
  customers: [],
  atRiskCustomers: [],
  atRiskMrr: 0,
  activity: [],
  churnTrend: [],
  riskDistribution: [],
  revenue: [],
  hasData: false,
  loading: false,
  loaded: false,
  error: null,
  selectedTimeRange: "30d",

  setSelectedTimeRange: (range) => set({ selectedTimeRange: range }),

  fetchDashboard: async () => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ loading: true, error: null });

    const [stats, atRisk, risk, activity, trend, revenue] = await Promise.all([
      getJson<{ stats: DashboardStats; hasData: boolean }>("/api/dashboard/stats", token),
      getJson<{ customers: Customer[]; atRiskMrr: number }>("/api/dashboard/at-risk", token),
      getJson<{ distribution: RiskDistribution[] }>("/api/dashboard/risk-distribution", token),
      getJson<{ activity: ActivityEvent[] }>("/api/dashboard/activity", token),
      getJson<{ data: ChurnTrendPoint[] }>("/api/dashboard/churn-trend", token),
      getJson<{ data: RevenueData[] }>("/api/dashboard/revenue", token),
    ]);

    if (!stats) {
      set({
        loading: false,
        loaded: true,
        error: "Could not load dashboard data. Is the API running?",
      });
      return;
    }

    set({
      stats: stats.stats,
      hasData: stats.hasData,
      atRiskCustomers: atRisk?.customers ?? [],
      atRiskMrr: atRisk?.atRiskMrr ?? 0,
      riskDistribution: risk?.distribution ?? [],
      activity: activity?.activity ?? [],
      churnTrend: trend?.data ?? [],
      revenue: revenue?.data ?? [],
      loading: false,
      loaded: true,
      error: null,
    });
  },

  fetchCustomers: async (search?: string) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ loading: true });
    const query = new URLSearchParams({ limit: "1000" });
    if (search?.trim()) query.set("search", search.trim());

    const data = await getJson<{ customers: Customer[] }>(
      `/api/customers?${query.toString()}`,
      token
    );

    set({
      customers: data?.customers ?? [],
      loading: false,
      loaded: true,
      error: data ? null : "Could not load customers.",
    });
  },
}));
