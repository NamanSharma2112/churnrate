"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail01Icon, LockKeyIcon } from "hugeicons-react";
import { useAuthStore } from "@/store/auth";
import { API_BASE } from "@/lib/api";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField, FormError, SubmitButton } from "@/components/auth/FormField";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Could not sign you in");
      }

      login(data.token, data.user, data.tenant);
      router.replace("/dashboard");
    } catch (err) {
      // A failed fetch means the API is unreachable, which is worth saying
      // plainly rather than showing a bare "Failed to fetch".
      setError(
        err instanceof TypeError
          ? "Cannot reach the server. Check that the API is running."
          : err instanceof Error
            ? err.message
            : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      currentType="login"
      title="Welcome back"
      subtitle="Sign in to your ChurnRate workspace."
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
        {error && <FormError message={error} />}

        <FormField
          label="Email address"
          type="email"
          icon={Mail01Icon}
          value={email}
          onChange={setEmail}
          placeholder="you@company.com"
          autoComplete="email"
        />

        <div>
          <FormField
            label="Password"
            type="password"
            icon={LockKeyIcon}
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          <div className="mt-2 text-right">
            <Link
              href="/register"
              className="text-xs font-medium text-neutral-500 transition-colors hover:text-indigo-600"
            >
              Don&apos;t have an account?
            </Link>
          </div>
        </div>

        <SubmitButton loading={loading} loadingLabel="Signing in…">
          Sign in
        </SubmitButton>

        <p className="text-center text-sm text-neutral-500">
          New to ChurnRate?{" "}
          <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
