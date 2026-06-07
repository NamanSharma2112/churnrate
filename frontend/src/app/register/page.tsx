"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth";
import { ChartLineData01Icon, AnalyticsUpIcon } from "hugeicons-react";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3002/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, tenantName }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to register");
      }

      login(data.token, data.user);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Pane - Feature Highlight */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-indigo-900 p-12 relative overflow-hidden">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-400 via-indigo-900 to-indigo-950"></div>
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"></div>

        <div className="relative z-10 flex flex-1 flex-col justify-center max-w-xl">
          <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
            <AnalyticsUpIcon size={24} className="text-indigo-300" />
          </div>
          <h3 className="text-4xl font-bold tracking-tight text-white mb-6">
            Turn customer data into retention strategy.
          </h3>
          <p className="text-lg leading-relaxed text-indigo-200">
            Create an account to start analyzing churn metrics, predicting at-risk users, and uncovering growth opportunities for your SaaS business.
          </p>
          
          <div className="mt-12 space-y-4 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3 text-indigo-100">
              <div className="h-6 w-6 rounded-full bg-indigo-500/40 flex items-center justify-center text-xs">✓</div>
              <span>Connect multiple data sources</span>
            </div>
            <div className="flex items-center gap-3 text-indigo-100">
              <div className="h-6 w-6 rounded-full bg-indigo-500/40 flex items-center justify-center text-xs">✓</div>
              <span>Real-time ML risk predictions</span>
            </div>
            <div className="flex items-center gap-3 text-indigo-100">
              <div className="h-6 w-6 rounded-full bg-indigo-500/40 flex items-center justify-center text-xs">✓</div>
              <span>Automated retention reporting</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-16 lg:w-1/2 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 flex items-center gap-2 text-indigo-600">
            <ChartLineData01Icon size={32} />
            <span className="text-2xl font-bold tracking-tight text-neutral-900">ChurnRate</span>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
            Create an account
          </h2>
          <p className="mt-2 text-base text-neutral-500">
            Start analyzing your churn risk today.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 shadow-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">Full Name</label>
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 rounded-lg border-neutral-300 bg-neutral-50 focus:border-indigo-500 focus:bg-white focus:ring-indigo-500"
                  placeholder="Jane Doe"
                />
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">Work Email</label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-lg border-neutral-300 bg-neutral-50 focus:border-indigo-500 focus:bg-white focus:ring-indigo-500"
                  placeholder="jane@company.com"
                />
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">Workspace Name <span className="text-neutral-400 font-normal">(Optional)</span></label>
                <Input
                  type="text"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  className="h-11 rounded-lg border-neutral-300 bg-neutral-50 focus:border-indigo-500 focus:bg-white focus:ring-indigo-500"
                  placeholder="Acme Corp"
                />
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">Password</label>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-lg border-neutral-300 bg-neutral-50 focus:border-indigo-500 focus:bg-white focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" className="h-11 w-full rounded-lg bg-indigo-600 font-medium text-white shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all" disabled={loading}>
              {loading ? "Creating account..." : "Sign up"}
            </Button>

            <p className="text-center text-sm text-neutral-600 mt-6">
              Already have an account?{" "}
              <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
