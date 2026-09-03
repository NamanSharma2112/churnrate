"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { API_BASE } from "@/lib/api";
import { Mail01Icon, LockKeyIcon, ViewIcon, UserIcon, Building04Icon } from "hugeicons-react";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          // The field is optional, but the API rejects an empty string,
          // so omit it entirely when the user leaves it blank.
          ...(tenantName.trim() ? { tenantName: tenantName.trim() } : {}),
        }),
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
    <AuthLayout currentType="register">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 shadow-sm">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-teal-800">
              Full Name <span className="text-teal-600">*</span>
            </label>
            <div className="relative">
              <UserIcon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 text-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
                placeholder="Jane Doe"
              />
            </div>
          </div>
          
          <div>
            <label className="mb-1.5 block text-sm font-medium text-teal-800">
              Work Email <span className="text-teal-600">*</span>
            </label>
            <div className="relative">
              <Mail01Icon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 text-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
                placeholder="jane@company.com"
              />
            </div>
          </div>
          
          <div>
            <label className="mb-1.5 block text-sm font-medium text-teal-800">
              Workspace Name <span className="text-neutral-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <Building04Icon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                className="h-11 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 text-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
                placeholder="Acme Corp"
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
          </div>
        </div>

        <Button type="submit" className="h-11 w-full rounded-lg bg-teal-600 font-medium text-white shadow-sm hover:bg-teal-700 transition-all" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>

      </form>
    </AuthLayout>
  );
}
