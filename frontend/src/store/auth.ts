import { create } from "zustand";
import { API_BASE } from "@/lib/api";
import type { User, Tenant } from "@/types";

interface AuthState {
  token: string | null;
  user: User | null;
  tenant: Tenant | null;
  isAuthenticated: boolean;
  login: (token: string, user: User, tenant?: Tenant | null) => void;
  logout: () => void;
  init: () => void;
  /** Refreshes the user + workspace from the API so the shell shows real names. */
  fetchProfile: () => Promise<void>;
}

const TOKEN_KEY = "token";
const USER_KEY = "user";
const TENANT_KEY = "tenant";

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  tenant: null,
  isAuthenticated: false,

  login: (token, user, tenant = null) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    if (tenant) localStorage.setItem(TENANT_KEY, JSON.stringify(tenant));
    set({ token, user, tenant, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TENANT_KEY);
    set({ token: null, user: null, tenant: null, isAuthenticated: false });
  },

  init: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = readJson<User>(USER_KEY);

    if (token && user) {
      set({ token, user, tenant: readJson<Tenant>(TENANT_KEY), isAuthenticated: true });
      return;
    }

    // A half-written session is worse than none.
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TENANT_KEY);
  },

  fetchProfile: async () => {
    const token = get().token;
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // An expired or revoked token should end the session rather than leave
      // the app in a broken half-signed-in state.
      if (res.status === 401) {
        get().logout();
        return;
      }
      if (!res.ok) return;

      const data = (await res.json()) as { user: User; tenant: Tenant };
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      localStorage.setItem(TENANT_KEY, JSON.stringify(data.tenant));
      set({ user: data.user, tenant: data.tenant });
    } catch {
      // Offline or backend down — keep the cached session.
    }
  },
}));
