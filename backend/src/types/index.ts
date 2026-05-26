export interface MLPrediction {
  probability: number;
  risk_level: string;
  top_factors: { feature: string; impact: number }[];
}
