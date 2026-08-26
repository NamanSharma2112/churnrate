export interface MLPrediction {
  customer_id?: string;
  probability: number;
  risk_level: string;
  top_factors: { feature: string; impact: number }[];
  model_version?: string;
}
