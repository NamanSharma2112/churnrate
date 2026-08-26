"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Analytics01Icon } from "hugeicons-react";
import { useAuthStore } from "@/store/auth";
import { API_BASE } from "@/lib/api";
import { EmptyState } from "@/components/ui/empty-state";
import { ChartPanel, tooltipStyle } from "./ChartPanel";

interface FeatureRow {
  feature: string;
  importance: number;
}

/** Human labels for the model's raw feature names. */
const LABELS: Record<string, string> = {
  mrr: "Monthly revenue",
  health_score: "Health score",
  plan_encoded: "Plan tier",
  days_since_signup: "Account age",
  days_since_active: "Days since active",
  support_tickets: "Support tickets",
  feature_usage_pct: "Feature usage",
  login_frequency: "Login frequency",
  nps_score: "NPS score",
  activity_ratio: "Inactivity vs tenure",
  engagement_score: "Engagement score",
};

export function FeatureImportanceChart() {
  const { token } = useAuthStore();
  const [features, setFeatures] = useState<FeatureRow[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Averaged from this workspace's own predictions rather than a static list.
  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/api/predictions/feature-importance`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : { features: [] }))
      .then((data) => setFeatures(data.features ?? []))
      .catch(() => setFeatures([]))
      .finally(() => setLoaded(true));
  }, [token]);

  const data = features.map((row) => ({
    ...row,
    label: LABELS[row.feature] ?? row.feature,
  }));

  return (
    <ChartPanel
      title="Feature Importance"
      description="Average weight of each signal across your scored customers"
    >
      {loaded && data.length === 0 ? (
        <EmptyState
          compact
          icon={Analytics01Icon}
          title="No predictions yet"
          description="Run predictions on your customers to see which signals drive churn."
        />
      ) : (
        <div className="h-full min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 16, left: 8, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={false} />
              <XAxis type="number" stroke="#a3a3a3" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="label"
                stroke="#525252"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={130}
              />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f5f5f5" }} />
              <Bar dataKey="importance" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartPanel>
  );
}
