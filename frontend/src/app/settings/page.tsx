"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User02Icon, Building04Icon, CreditCardIcon } from "hugeicons-react";

export default function SettingsPage() {
  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Settings</h1>
          <p className="text-sm text-neutral-500">Manage your workspace and account preferences</p>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm p-6 max-w-4xl">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-3 bg-neutral-100/50 p-1">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User02Icon size={16} /> Profile
            </TabsTrigger>
            <TabsTrigger value="workspace" className="flex items-center gap-2">
              <Building04Icon size={16} /> Workspace
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCardIcon size={16} /> Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-neutral-800">Personal Information</h3>
              <p className="text-sm text-neutral-500">Update your personal details here.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Full Name</label>
                <input type="text" defaultValue="John Doe" className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-800 focus:border-indigo-500 focus:outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Email Address</label>
                <input type="email" defaultValue="john@example.com" className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-800 focus:border-indigo-500 focus:outline-none" />
              </div>
            </div>
            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 shadow-sm">
              Save Changes
            </button>
          </TabsContent>

          <TabsContent value="workspace" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-neutral-800">Workspace Settings</h3>
              <p className="text-sm text-neutral-500">Manage team members and company details.</p>
            </div>
            <div className="space-y-2 max-w-md">
              <label className="text-sm font-medium text-neutral-700">Company Name</label>
              <input type="text" defaultValue="Acme Corp" className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-800 focus:border-indigo-500 focus:outline-none" />
            </div>
            <div className="space-y-2 max-w-md">
              <label className="text-sm font-medium text-neutral-700">Timezone</label>
              <select className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-800 focus:border-indigo-500 focus:outline-none">
                <option>UTC (Coordinated Universal Time)</option>
                <option>EST (Eastern Standard Time)</option>
                <option>PST (Pacific Standard Time)</option>
              </select>
            </div>
            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 shadow-sm">
              Save Workspace
            </button>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-neutral-800">Plan & Billing</h3>
              <p className="text-sm text-neutral-500">Manage your subscription and payment methods.</p>
            </div>
            <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-indigo-900">Pro Plan</p>
                <p className="text-sm text-indigo-700">$99/month, billed annually</p>
              </div>
              <button className="rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-50 shadow-sm">
                Manage Plan
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-neutral-700">Payment Method</p>
              <div className="flex items-center gap-3 rounded-lg border border-neutral-200 p-3 max-w-md">
                <div className="h-6 w-10 rounded bg-neutral-200 flex items-center justify-center text-[10px] font-bold text-neutral-500">VISA</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-800">•••• •••• •••• 4242</p>
                  <p className="text-xs text-neutral-500">Expires 12/24</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
