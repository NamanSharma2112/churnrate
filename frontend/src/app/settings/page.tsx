"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User02Icon, Building04Icon, PlugSocketIcon } from "hugeicons-react";
import { PageContainer, PageHeader } from "@/components/layout/PageHeader";
import { useAuthStore } from "@/store/auth";

/** Read-only field — editing a profile is not wired up on the API yet. */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-neutral-700">{label}</p>
      <p className="mt-1.5 rounded-lg border border-neutral-200 bg-[#FCFCFC] px-3 py-2 text-sm text-neutral-900">
        {value || "—"}
      </p>
    </div>
  );
}

export default function SettingsPage() {
  const { user, tenant, fetchProfile } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fetchProfile();
    setMounted(true);
  }, [fetchProfile]);

  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        description="Your account and workspace details"
      />

      <div className="panel max-w-4xl p-4 sm:p-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-3 bg-neutral-100/70 p-1">
            <TabsTrigger value="profile" className="flex items-center justify-center gap-2">
              <User02Icon size={16} />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="workspace" className="flex items-center justify-center gap-2">
              <Building04Icon size={16} />
              <span className="hidden sm:inline">Workspace</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center justify-center gap-2">
              <PlugSocketIcon size={16} />
              <span className="hidden sm:inline">Data</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div>
              <h3 className="text-base font-medium text-neutral-900">Personal information</h3>
              <p className="text-sm text-neutral-500">
                Signed in as the account below.
              </p>
            </div>
            {/* Values come from /auth/me rather than the previous "John Doe" placeholders. */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" value={mounted ? (user?.name ?? "") : ""} />
              <Field label="Email address" value={mounted ? (user?.email ?? "") : ""} />
              <Field label="Role" value={mounted ? (user?.role ?? "") : ""} />
            </div>
          </TabsContent>

          <TabsContent value="workspace" className="space-y-6">
            <div>
              <h3 className="text-base font-medium text-neutral-900">Workspace</h3>
              <p className="text-sm text-neutral-500">
                All customer data is scoped to this workspace.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Workspace name" value={mounted ? (tenant?.name ?? "") : ""} />
              <Field label="Workspace slug" value={mounted ? (tenant?.slug ?? "") : ""} />
              <Field label="Plan" value={mounted ? (tenant?.plan ?? "free") : ""} />
              <Field
                label="Customers tracked"
                value={mounted ? String(tenant?.customerCount ?? 0) : ""}
              />
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <div>
              <h3 className="text-base font-medium text-neutral-900">Data sources</h3>
              <p className="text-sm text-neutral-500">
                Where your customer records come from.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/import"
                className="rounded-lg border border-neutral-200 p-4 transition-colors hover:border-indigo-300 hover:bg-indigo-50/40"
              >
                <p className="text-sm font-medium text-neutral-900">CSV import</p>
                <p className="mt-1 text-xs text-neutral-500">
                  Upload any export — columns are mapped automatically.
                </p>
              </Link>
              <Link
                href="/integrations"
                className="rounded-lg border border-neutral-200 p-4 transition-colors hover:border-indigo-300 hover:bg-indigo-50/40"
              >
                <p className="text-sm font-medium text-neutral-900">Stripe</p>
                <p className="mt-1 text-xs text-neutral-500">
                  Sync subscriptions, MRR and billing events.
                </p>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
