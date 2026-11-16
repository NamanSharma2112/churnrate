"use client";

import { useEffect, useState } from "react";
import { BrainCircuit } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { API_BASE } from "@/lib/api";
import { featureLabel } from "@/lib/factors";
import { EmptyState } from "@/components/ui/empty-state";
import { RankedBars } from "@/components/charts/RankedBars";
import { ChartPanel } from "./ChartPanel";

interface FeatureRow {
  feature: string;
  importance: number;
}

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

  return (
    <ChartPanel title="Feature importance" description="Average weight of each signal across your scored customers">
      {features.length === 0 ? (
        loaded ? (
          <EmptyState icon={BrainCircuit} title="No predictions yet" description="Re-score your customers to see which signals matter." compact />
        ) : (
          <div className="h-[160px]" />
        )
      ) : (
        <RankedBars
          rows={features.map((f) => ({
            key: f.feature,
            label: featureLabel(f.feature),
            value: f.importance,
            display: f.importance.toFixed(2),
          }))}
          ariaLabel="Feature importance"
        />
      )}
    </ChartPanel>
  );
}
