"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CloudUploadIcon,
  CpuSettingsIcon,
  Alert01Icon,
  ArrowLeft01Icon,
} from "hugeicons-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: CloudUploadIcon,
    title: "Import anything",
    body: "Any CSV or a Stripe account — columns are mapped for you.",
  },
  {
    icon: CpuSettingsIcon,
    title: "Scored automatically",
    body: "Every account gets a churn probability the moment it lands.",
  },
  {
    icon: Alert01Icon,
    title: "Ranked by revenue",
    body: "Work the at-risk list in order of MRR on the line.",
  },
];

/**
 * Two-pane auth shell.
 *
 * The page scrolls on its own (`min-h-screen`, not a fixed-height flex child):
 * the previous version was clipped by the app shell whenever the form was taller
 * than the viewport, which hid the sign-up fields entirely on a laptop.
 */
export function AuthLayout({
  children,
  currentType,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  currentType: "login" | "register";
  title: string;
  subtitle: string;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-white">
      {/* Form pane */}
      <div className="flex w-full flex-col px-5 py-8 sm:px-10 lg:w-[52%] lg:px-16">
        <div className="flex items-center justify-between">
          <Logo href="/" />
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft01Icon size={16} />
            Back to site
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center py-12">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>
          </div>

          {/* Segmented control, styled like the dashboard's time-range switch. */}
          <div
            role="tablist"
            aria-label="Authentication mode"
            className="mt-7 flex gap-1 rounded-lg border border-neutral-200 bg-[#FCFCFC] p-1"
          >
            {(
              [
                { type: "login", label: "Sign in", href: "/login" },
                { type: "register", label: "Create account", href: "/register" },
              ] as const
            ).map((tab) => {
              const active = currentType === tab.type;
              return (
                <Link
                  key={tab.type}
                  href={tab.href}
                  role="tab"
                  aria-selected={active}
                  aria-current={pathname === tab.href ? "page" : undefined}
                  className={cn(
                    "flex-1 rounded-md py-2 text-center text-sm font-medium transition-colors",
                    active
                      ? "border border-neutral-200 bg-white text-neutral-900 shadow-sm"
                      : "text-neutral-500 hover:text-neutral-900"
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-7">{children}</div>
        </div>

        <p className="text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} ChurnRate ·{" "}
          <Link href="/" className="transition-colors hover:text-neutral-600">
            Terms
          </Link>{" "}
          ·{" "}
          <Link href="/" className="transition-colors hover:text-neutral-600">
            Privacy
          </Link>
        </p>
      </div>

      {/* Context pane — same tokens as the product, no separate visual language. */}
      <div className="relative hidden border-l border-neutral-200 bg-[#FCFCFC] lg:flex lg:w-[48%] lg:flex-col lg:justify-center lg:px-14">
        <div className="grid-backdrop absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-indigo-50 to-transparent"
          aria-hidden="true"
        />

        <div className="relative max-w-md">
          <h2 className="text-2xl font-bold leading-snug tracking-tight text-neutral-900">
            Predict churn from the data you already have.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            No schema to conform to and no integration project. Bring an export, get scored
            accounts.
          </p>

          <div className="mt-9 space-y-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="panel flex items-start gap-3.5 p-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-neutral-900">{item.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
