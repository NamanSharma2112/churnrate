"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth";
import { Shield01Icon, ChartLineData01Icon } from "hugeicons-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to login");
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
      {/* Left Pane - Form */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-16 lg:w-1/2 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 flex items-center gap-2 text-indigo-600">
            <ChartLineData01Icon size={32} />
            <span className="text-2xl font-bold tracking-tight text-neutral-900">ChurnRate</span>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
            Welcome back
          </h2>
          <p className="mt-2 text-base text-neutral-500">
            Please enter your details to sign in.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 shadow-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                  Email
                </label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-lg border-neutral-300 bg-neutral-50 focus:border-indigo-500 focus:bg-white focus:ring-indigo-500"
                  placeholder="admin@churnrate.com"
                />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="block text-sm font-medium text-neutral-700">
                    Password
                  </label>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
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
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <p className="text-center text-sm text-neutral-600 mt-6">
              Don&apos;t have an account?{" "}
              <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                Sign up for free
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Pane - Feature Highlight */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-neutral-900 p-12 relative overflow-hidden">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-300 via-neutral-900 to-neutral-900"></div>
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-1 flex-col justify-center max-w-xl">
          <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
            <Shield01Icon size={24} className="text-indigo-400" />
          </div>
          <h3 className="text-4xl font-bold tracking-tight text-white mb-6">
            Predict churn before it happens.
          </h3>
          <p className="text-lg leading-relaxed text-neutral-400">
            Leverage advanced machine learning models to identify at-risk customers, understand churn drivers, and take proactive action to improve your retention rates.
          </p>
          
          <div className="mt-12 flex items-center gap-4 border-t border-white/10 pt-8">
            <div className="flex -space-x-3">
              <div className="h-10 w-10 rounded-full border-2 border-neutral-900 bg-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">JD</div>
              <div className="h-10 w-10 rounded-full border-2 border-neutral-900 bg-emerald-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">SM</div>
              <div className="h-10 w-10 rounded-full border-2 border-neutral-900 bg-rose-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">AW</div>
            </div>
            <div className="text-sm">
              <p className="font-medium text-white">Join 1,000+ teams</p>
              <p className="text-neutral-400">reducing churn daily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
