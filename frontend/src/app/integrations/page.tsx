"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CreditCardIcon,
  Loading01Icon,
  CheckmarkCircle01Icon,
  Alert01Icon,
  RefreshIcon,
  LockKeyIcon,
  LinkSquare02Icon,
} from "hugeicons-react";
import { useAuthStore } from "@/store/auth";
import { useDashboardStore } from "@/store/dashboard";
import { API_BASE } from "@/lib/api";
import { PageContainer, PageHeader } from "@/components/layout/PageHeader";
import { cn } from "@/lib/utils";

interface Integration {
  provider: string;
  status: string;
  accountName: string | null;
  keyHint: string | null;
  lastSyncedAt: string | null;
  lastSyncStats: {
    imported?: number;
    updated?: number;
    churned?: number;
    scored?: number;
    atRisk?: number;
  } | null;
}

export default function IntegrationsPage() {
  const { token } = useAuthStore();
  const { fetchDashboard, fetchCustomers } = useDashboardStore();

  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [apiKey, setApiKey] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const stripe = integrations.find((row) => row.provider === "stripe");

  const load = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/integrations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setIntegrations(data.integrations ?? []);
      }
    } catch {
      setError("Could not load integrations.");
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const connect = async (event: React.FormEvent) => {
    event.preventDefault();
    setConnecting(true);
    setError("");
    setNotice("");

    try {
      const res = await fetch(`${API_BASE}/api/integrations/stripe/connect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          apiKey: apiKey.trim(),
          ...(webhookSecret.trim() ? { webhookSecret: webhookSecret.trim() } : {}),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not connect");

      setNotice(data.message);
      setApiKey("");
      setWebhookSecret("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not connect to Stripe");
    } finally {
      setConnecting(false);
    }
  };

  const sync = async () => {
    setSyncing(true);
    setError("");
    setNotice("");

    try {
      const res = await fetch(`${API_BASE}/api/integrations/stripe/sync`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Sync failed");

      setNotice(data.message);
      await Promise.all([load(), fetchDashboard(), fetchCustomers()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  const disconnect = async () => {
    setError("");
    setNotice("");
    try {
      const res = await fetch(`${API_BASE}/api/integrations/stripe`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Could not disconnect");
      setNotice("Stripe disconnected. Imported customers were kept.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not disconnect");
    }
  };

  const webhookUrl = `${API_BASE}/api/integrations/stripe/webhook`;

  return (
    <PageContainer>
      <PageHeader
        title="Integrations"
        description="Connect a billing provider to sync customers and score them automatically"
      />

      {error && (
        <div className="mb-6 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <Alert01Icon size={18} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {notice && (
        <div className="mb-6 flex items-start gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          <CheckmarkCircle01Icon size={18} className="mt-0.5 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="panel">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 p-4 sm:p-5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#635BFF]/10 text-[#635BFF]">
                  <CreditCardIcon size={22} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-neutral-900">Stripe</h3>
                  <p className="text-sm text-neutral-500">
                    Subscriptions, MRR, failed payments and cancellations
                  </p>
                </div>
              </div>

              <span
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                  stripe
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-neutral-100 text-neutral-500"
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    stripe ? "bg-emerald-500" : "bg-neutral-400"
                  )}
                />
                {stripe ? "Connected" : "Not connected"}
              </span>
            </div>

            {stripe ? (
              <div className="p-4 sm:p-5">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Account
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900">
                      {stripe.accountName ?? "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      API key
                    </dt>
                    <dd className="mt-1 font-mono text-sm text-neutral-900">
                      {stripe.keyHint ?? "••••"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Last sync
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900">
                      {stripe.lastSyncedAt
                        ? new Date(stripe.lastSyncedAt).toLocaleString()
                        : "Never"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Last result
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900">
                      {stripe.lastSyncStats
                        ? `${stripe.lastSyncStats.imported ?? 0} added, ${
                            stripe.lastSyncStats.updated ?? 0
                          } updated, ${stripe.lastSyncStats.atRisk ?? 0} at risk`
                        : "—"}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={sync}
                    disabled={syncing}
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {syncing ? (
                      <Loading01Icon size={16} className="animate-spin" />
                    ) : (
                      <RefreshIcon size={16} />
                    )}
                    {syncing ? "Syncing…" : "Sync now"}
                  </button>
                  <button
                    type="button"
                    onClick={disconnect}
                    className="rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    Disconnect
                  </button>
                </div>

                <div className="mt-6 rounded-lg border border-neutral-200 bg-[#FCFCFC] p-4">
                  <p className="text-xs font-medium text-neutral-700">
                    Keep scores live with a webhook
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                    Add this endpoint in Stripe → Developers → Webhooks. Subscription and
                    invoice events will re-score the affected customer immediately.
                  </p>
                  <code className="mt-2 block overflow-x-auto rounded border border-neutral-200 bg-white px-3 py-2 font-mono text-xs text-neutral-700">
                    {webhookUrl}
                  </code>
                </div>
              </div>
            ) : (
              <form onSubmit={connect} className="p-4 sm:p-5">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="stripe-key"
                      className="mb-1.5 block text-sm font-medium text-neutral-700"
                    >
                      Stripe secret key
                    </label>
                    <div className="relative">
                      <LockKeyIcon
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                      />
                      <input
                        id="stripe-key"
                        type="password"
                        required
                        value={apiKey}
                        onChange={(event) => setApiKey(event.target.value)}
                        placeholder="sk_live_… or rk_live_…"
                        autoComplete="off"
                        className="h-11 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-3 font-mono text-sm text-neutral-900 shadow-sm outline-none transition-colors placeholder:font-sans placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-neutral-500">
                      A restricted key with read access to Customers and Subscriptions is
                      enough. Keys are encrypted before storage and never shown again.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="stripe-webhook"
                      className="mb-1.5 block text-sm font-medium text-neutral-700"
                    >
                      Webhook signing secret
                      <span className="ml-1 font-normal text-neutral-400">(optional)</span>
                    </label>
                    <input
                      id="stripe-webhook"
                      type="password"
                      value={webhookSecret}
                      onChange={(event) => setWebhookSecret(event.target.value)}
                      placeholder="whsec_…"
                      autoComplete="off"
                      className="h-11 w-full rounded-lg border border-neutral-200 bg-white px-3 font-mono text-sm text-neutral-900 shadow-sm outline-none transition-colors placeholder:font-sans placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <p className="mt-1.5 text-xs text-neutral-500">
                      Add this to verify incoming webhooks and re-score customers in real
                      time.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={connecting || apiKey.trim().length < 20}
                  className="mt-5 flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {connecting && <Loading01Icon size={16} className="animate-spin" />}
                  {connecting ? "Verifying…" : "Connect Stripe"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="panel p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-neutral-900">
              What syncing brings in
            </h3>
            <ul className="mt-3 space-y-2.5">
              {[
                "Customer email, name and signup date",
                "Active subscriptions normalised to monthly revenue",
                "Cancellations and scheduled cancellations",
                "Failed payments, treated as a risk signal",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-neutral-600">
                  <CheckmarkCircle01Icon
                    size={14}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-neutral-900">Where to find your key</h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-500">
              In the Stripe Dashboard, open Developers → API keys. Create a restricted key
              with read permission on Customers and Subscriptions rather than using your
              live secret key.
            </p>
            <a
              href="https://dashboard.stripe.com/apikeys"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700"
            >
              Open Stripe API keys
              <LinkSquare02Icon size={13} />
            </a>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
