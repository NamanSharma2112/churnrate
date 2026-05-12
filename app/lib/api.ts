/**
 * API Client for the Churn Rate Backend.
 * 
 * All requests are proxied through Next.js rewrites to http://localhost:8000.
 * When Clerk auth is integrated on the frontend, pass the token via getToken().
 */

const API_BASE = "/api";

interface RequestOptions {
  token?: string;
  params?: Record<string, string | number>;
}

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit & RequestOptions = {}
): Promise<T> {
  const { token, params, ...fetchOptions } = options;

  // Build URL with query params
  let url = `${API_BASE}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }

  // Set headers
  const headers: Record<string, string> = {
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Don't set Content-Type for FormData (browser sets it with boundary)
  if (!(fetchOptions.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      detail: response.statusText,
    }));
    throw new Error(error.detail || `API Error: ${response.status}`);
  }

  return response.json();
}

// ─── Prediction Endpoints ──────────────────────────────────────────────

export async function uploadFileForPrediction(
  file: File,
  token: string
) {
  const formData = new FormData();
  formData.append("file", file);

  return apiFetch<{
    upload_id: number;
    filename: string;
    file_type: string;
    total_customers: number;
    summary: {
      churned: number;
      not_churned: number;
      churn_rate: number;
      high_risk: number;
      medium_risk: number;
      low_risk: number;
    };
    predictions: Array<{
      index: number;
      customer_data: Record<string, unknown>;
      churn_prediction: string;
      churn_probability: number;
      risk_level: string;
    }>;
  }>("/predict/upload", {
    method: "POST",
    body: formData,
    token,
  });
}

export async function getPredictionHistory(token: string, limit = 10) {
  return apiFetch<{
    uploads: Array<{
      id: number;
      filename: string;
      file_type: string;
      row_count: number;
      uploaded_at: string;
      summary: {
        total: number;
        churned: number;
        churn_rate: number;
        high_risk: number;
      };
    }>;
  }>("/predict/history", { token, params: { limit } });
}

export async function getUploadDetails(uploadId: number, token: string) {
  return apiFetch<{
    upload: {
      id: number;
      filename: string;
      file_type: string;
      row_count: number;
      uploaded_at: string;
    };
    summary: {
      total: number;
      churned: number;
      not_churned: number;
      churn_rate: number;
      high_risk: number;
      medium_risk: number;
      low_risk: number;
    };
    predictions: Array<{
      index: number;
      customer_data: Record<string, unknown>;
      churn_prediction: string;
      churn_probability: number;
      risk_level: string;
    }>;
  }>(`/predict/history/${uploadId}`, { token });
}

export async function getModelFeatures() {
  return apiFetch<{
    model_name: string;
    model_ready: boolean;
    features: string[];
    feature_importance: Array<{ feature: string; importance: number }>;
  }>("/predict/features");
}

// ─── Dashboard Endpoints ───────────────────────────────────────────────

export async function getDashboardStats(token: string) {
  return apiFetch<{
    total_customers: number;
    churned: number;
    not_churned: number;
    churn_rate: number;
    avg_churn_probability: number;
    risk_distribution: { high: number; medium: number; low: number };
    active_customers: number;
    recent_uploads: number;
    model_name: string;
  }>("/dashboard/stats", { token });
}

export async function getActivityData(token: string, days = 30) {
  return apiFetch<{
    activity: Array<{
      date: string;
      filename: string;
      total_customers: number;
      churned: number;
      not_churned: number;
      churn_rate: number;
    }>;
  }>("/dashboard/activity", { token, params: { days } });
}

export async function getRiskDistribution(
  token: string,
  uploadId?: number
) {
  const params: Record<string, string | number> = {};
  if (uploadId) params.upload_id = uploadId;

  return apiFetch<{
    risk: Array<{ level: string; customers: number }>;
    total: number;
  }>("/dashboard/risk", { token, params });
}

export async function getCustomerList(
  token: string,
  options: {
    uploadId?: number;
    riskLevel?: string;
    page?: number;
    pageSize?: number;
  } = {}
) {
  const params: Record<string, string | number> = {};
  if (options.uploadId) params.upload_id = options.uploadId;
  if (options.riskLevel) params.risk_level = options.riskLevel;
  if (options.page) params.page = options.page;
  if (options.pageSize) params.page_size = options.pageSize;

  return apiFetch<{
    customers: Array<{
      id: number;
      upload_id: number;
      index: number;
      customer_data: Record<string, unknown>;
      churn_prediction: string;
      churn_probability: number;
      risk_level: string;
    }>;
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
  }>("/dashboard/customers", { token, params });
}

export async function getFeatureImportance(token: string) {
  return apiFetch<{
    feature_importance: Array<{ feature: string; importance: number }>;
  }>("/dashboard/feature-importance", { token });
}

// ─── User Endpoints ────────────────────────────────────────────────────

export async function getCurrentUser(token: string) {
  return apiFetch<{
    id: number;
    clerk_id: string;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    created_at: string | null;
  }>("/users/me", { token });
}

export async function updateUserProfile(
  token: string,
  data: {
    email?: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  }
) {
  return apiFetch("/users/me", {
    method: "PUT",
    body: JSON.stringify(data),
    token,
  });
}

// ─── Health Check ──────────────────────────────────────────────────────

export async function checkBackendHealth() {
  try {
    const response = await fetch("http://localhost:8000/health");
    return response.ok;
  } catch {
    return false;
  }
}
