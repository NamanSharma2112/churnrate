"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail01Icon, LockKeyIcon, UserIcon, Building04Icon } from "hugeicons-react";
import { useAuthStore } from "@/store/auth";
import { API_BASE } from "@/lib/api";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField, FormError, SubmitButton } from "@/components/auth/FormField";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    // Matches the API's rule, caught here so the user is not round-tripped.
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

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

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const detail = Array.isArray(data.errors) && data.errors.length > 0
          ? data.errors.map((e: { message: string }) => e.message).join(". ")
          : null;
        throw new Error(detail || data.message || "Could not create your account");
      }

      login(data.token, data.user, data.tenant);
      router.replace("/dashboard");
    } catch (err) {
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
      currentType="register"
      title="Create your workspace"
      subtitle="Start scoring your customers in a couple of minutes."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <FormError message={error} />}

        <FormField
          label="Full name"
          icon={UserIcon}
          value={name}
          onChange={setName}
          placeholder="Jane Doe"
          autoComplete="name"
          minLength={2}
        />

        <FormField
          label="Work email"
          type="email"
          icon={Mail01Icon}
          value={email}
          onChange={setEmail}
          placeholder="jane@company.com"
          autoComplete="email"
        />

        <FormField
          label="Workspace name"
          icon={Building04Icon}
          value={tenantName}
          onChange={setTenantName}
          placeholder="Acme Corp"
          autoComplete="organization"
          optional
          hint="Defaults to your name if left blank."
        />

        <FormField
          label="Password"
          type="password"
          icon={LockKeyIcon}
          value={password}
          onChange={setPassword}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          minLength={8}
        />

        <SubmitButton loading={loading} loadingLabel="Creating account…">
          Create account
        </SubmitButton>

        <p className="text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
