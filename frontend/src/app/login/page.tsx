"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { API_BASE } from "@/lib/api";
import { Mail01Icon, LockKeyIcon, ViewIcon } from "hugeicons-react";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
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
    <AuthLayout currentType="login">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 shadow-sm">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-teal-800">
              Email Address <span className="text-teal-600">*</span>
            </label>
            <div className="relative">
              <Mail01Icon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 text-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
                placeholder="Enter your email address"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-teal-800">
              Password <span className="text-teal-600">*</span>
            </label>
            <div className="relative">
              <LockKeyIcon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-10 text-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
                placeholder="Enter your password"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <ViewIcon size={18} />
              </button>
            </div>
            <div className="mt-2 text-right">
              <a href="#" className="text-xs font-medium text-neutral-500 hover:text-teal-600">
                Forgot password?
              </a>
            </div>
          </div>
        </div>

        <Button type="submit" className="h-11 w-full rounded-lg bg-teal-600 font-medium text-white shadow-sm hover:bg-teal-700 transition-all" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-neutral-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors">
            <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          </button>
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.6 11.2c-.1-3.3 2.7-5 2.8-5-1.6-2.3-4.1-2.6-5-2.7-2.1-.2-4.1 1.2-5.1 1.2-1.1 0-2.8-1.2-4.5-1.2-1.9 0-3.7 1.1-4.7 2.9-2 3.5-.5 8.7 1.4 11.5 1 1.4 2.1 3 3.6 2.9 1.4-.1 2-1 3.7-1 1.7 0 2.2 1 3.7 1 1.5.1 2.5-1.4 3.4-2.8 1.1-1.6 1.6-3.2 1.6-3.3-.1 0-3.1-1.2-3.2-4.6zm-2.8-8.2c.8-1 1.3-2.3 1.2-3.7-1.2.1-2.6.7-3.4 1.7-.7.9-1.2 2.2-1.1 3.5 1.3.1 2.5-.5 3.3-1.5z"/></svg>
          </button>
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors">
            <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
