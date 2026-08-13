export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface RequestOptions extends RequestInit {
  token?: string;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Request failed: ${response.status}`);
  }

  return response.json();
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ token: string; user: unknown }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    register: (data: { email: string; password: string; name: string }) =>
      request<{ token: string; user: unknown }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
  dashboard: {
    getStats: (token: string) =>
      request<{ stats: unknown }>("/api/dashboard/stats", { token }),
    getChurnTrend: (token: string) =>
      request<{ data: unknown[] }>("/api/dashboard/churn-trend", { token }),
  },
  customers: {
    list: (token: string, params?: Record<string, string>) => {
      const query = params
        ? "?" + new URLSearchParams(params).toString()
        : "";
      return request<{ customers: unknown[]; total: number }>(
        `/api/customers${query}`,
        { token }
      );
    },
    getById: (token: string, id: string) =>
      request<{ customer: unknown }>(`/api/customers/${id}`, { token }),
  },
  predictions: {
    predict: (token: string, customerId: string) =>
      request<{ prediction: unknown }>("/api/predictions/predict", {
        method: "POST",
        body: JSON.stringify({ customerId }),
        token,
      }),
    batchPredict: (token: string) =>
      request<{ jobId: string }>("/api/predictions/batch", {
        method: "POST",
        token,
      }),
  },
};
