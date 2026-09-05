"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight01Icon,
  CloudUploadIcon,
  CpuSettingsIcon,
  Alert01Icon,
  CreditCardIcon,
  ChartLineData01Icon,
  Menu01Icon,
  Cancel01Icon,
  TickDouble02Icon,
} from "hugeicons-react";
import { Logo } from "@/components/brand/Logo";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Data sources", href: "#data-sources" },
];

const steps = [
  {
    icon: CloudUploadIcon,
    title: "Bring your data",
    body: "Upload any CSV or connect Stripe. Columns like “Account Name”, “Monthly Recurring Revenue” or “Last Login” are recognised automatically — no template to fill in.",
  },
  {
    icon: CpuSettingsIcon,
    title: "The model scores every account",
    body: "A gradient-boosted model reads usage, billing and support signals, then returns a churn probability with the factors that drove it for that specific customer.",
  },
  {
    icon: Alert01Icon,
    title: "Act before they leave",
    body: "At-risk accounts are ranked by revenue at stake, so your team works the list that matters instead of reading a dashboard.",
  },
];

const features = [
  {
    icon: ChartLineData01Icon,
    title: "Per-customer explanations",
    body: "Every score comes with the signals that produced it — not one global chart repeated for all accounts.",
  },
  {
    icon: CreditCardIcon,
    title: "Stripe as a data source",
    body: "Subscriptions, MRR, failed payments and cancellations sync straight in, and webhooks re-score an account the moment its billing changes.",
  },
  {
    icon: CloudUploadIcon,
    title: "Any schema, mapped for you",
    body: "Detection scores each column against known field names and its actual values. Review the mapping before anything is written.",
  },
  {
    icon: Alert01Icon,
    title: "Revenue-weighted triage",
    body: "The at-risk view leads with MRR on the line, so retention effort follows the money.",
  },
];

const dataSources = [
  { name: "Stripe", detail: "Subscriptions, invoices, dunning" },
  { name: "CSV / Excel", detail: "Any export, any column names" },
  { name: "Salesforce export", detail: "Account, contact and health fields" },
  { name: "HubSpot export", detail: "Lifecycle and deal data" },
  { name: "Product analytics", detail: "Logins, sessions, feature usage" },
  { name: "Support desk", detail: "Ticket counts and escalations" },
];

export function LandingPage() {
  const { isAuthenticated, init } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    init();
    setMounted(true);
  }, [init]);

  // Signed-in visitors get "Open dashboard"; everyone else gets the sign-up path.
  const primaryHref = mounted && isAuthenticated ? "/dashboard" : "/register";
  const primaryLabel = mounted && isAuthenticated ? "Open dashboard" : "Get started free";

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Logo href="/" />

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {mounted && isAuthenticated ? (
              <Link
                href="/dashboard"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              >
                Open dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="rounded-lg p-1.5 text-neutral-600 transition-colors hover:bg-neutral-100 md:hidden"
          >
            {menuOpen ? <Cancel01Icon size={20} /> : <Menu01Icon size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-neutral-200 bg-white px-5 py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2 border-t border-neutral-100 pt-3">
              <Link
                href="/login"
                className="rounded-lg border border-neutral-200 px-4 py-2 text-center text-sm font-medium text-neutral-700"
              >
                Sign in
              </Link>
              <Link
                href={primaryHref}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white"
              >
                {primaryLabel}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-200">
        <div className="grid-backdrop absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-indigo-50/80 to-transparent"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              <span className="size-1.5 rounded-full bg-indigo-600" />
              Churn prediction for SaaS teams
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Know which customers
              <br className="hidden sm:block" /> are about to leave
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              Connect Stripe or drop in any customer export. ChurnRate maps your columns
              automatically, scores every account, and shows you exactly why each one is at
              risk — with the revenue on the line.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={primaryHref}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 sm:w-auto"
              >
                {primaryLabel}
                <ArrowRight01Icon size={16} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex w-full items-center justify-center rounded-lg border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 sm:w-auto"
              >
                See how it works
              </a>
            </div>

            <p className="mt-4 text-xs text-neutral-500">
              No credit card required · Import a CSV and see scores in under a minute
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <ProductPreview />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-b border-neutral-200 bg-[#FCFCFC]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              From raw export to ranked at-risk list
            </h2>
            <p className="mt-3 text-neutral-600">
              Three steps, and none of them involve reformatting a spreadsheet to match our
              schema.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="panel p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Icon size={18} />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Built around the work, not the chart
            </h2>
            <p className="mt-3 text-neutral-600">
              Everything here exists to answer one question: who do we call today, and what do
              we say?
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="panel p-6 transition-colors hover:border-neutral-300"
                >
                  <span className="mb-4 flex size-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Icon size={18} />
                  </span>
                  <h3 className="text-base font-semibold text-neutral-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{feature.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data sources */}
      <section id="data-sources" className="border-b border-neutral-200 bg-[#FCFCFC]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
                Whatever your data looks like
              </h2>
              <p className="mt-3 text-neutral-600">
                Column detection scores each header against known field names <em>and</em> the
                values underneath it. “Gold”, “Tier 3” and “Premium” all resolve to a plan;
                <span className="whitespace-nowrap"> “$1,299.00”</span>, “€0” and an annual
                figure all resolve to monthly revenue.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Nothing is discarded — unmapped columns are kept on the record",
                  "Review and correct the mapping before the first write",
                  "Rows without an email are reported, never silently dropped",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-700">
                    <TickDouble02Icon
                      size={16}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {dataSources.map((source) => (
                <div key={source.name} className="panel p-4">
                  <p className="text-sm font-medium text-neutral-900">{source.name}</p>
                  <p className="mt-0.5 text-xs text-neutral-500">{source.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="panel relative overflow-hidden px-6 py-14 text-center sm:px-12">
            <div className="grid-backdrop absolute inset-0 opacity-50" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
                Start with the export you already have
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-neutral-600">
                Create a workspace, upload a CSV, and see churn scores for every account in
                under a minute.
              </p>
              <Link
                href={primaryHref}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              >
                {primaryLabel}
                <ArrowRight01Icon size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Logo href="/" />
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} ChurnRate. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-neutral-500">
            <Link href="/login" className="transition-colors hover:text-neutral-900">
              Sign in
            </Link>
            <Link href="/register" className="transition-colors hover:text-neutral-900">
              Create account
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * A static rendering of the product's own components — same tokens, same card
 * treatment — so the hero previews the real thing rather than a stock mockup.
 */
function ProductPreview() {
  const stats = [
    { label: "Customers", value: "1,284", tone: "text-neutral-900" },
    { label: "At risk", value: "37", tone: "text-red-600" },
    { label: "MRR at risk", value: "$18.4k", tone: "text-amber-600" },
    { label: "Avg health", value: "72", tone: "text-emerald-600" },
  ];

  const accounts = [
    { name: "Initech", risk: 0.85, mrr: "$299", reason: "Inactive 61 days" },
    { name: "Umbrella Ltd", risk: 0.71, mrr: "$4,800", reason: "NPS dropped to 3" },
    { name: "Globex", risk: 0.64, mrr: "$1,299", reason: "9 support tickets" },
  ];

  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-neutral-200 bg-neutral-50 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-neutral-300" />
        <span className="size-2.5 rounded-full bg-neutral-300" />
        <span className="size-2.5 rounded-full bg-neutral-300" />
        <span className="ml-3 text-xs text-neutral-500">Churn Analytics Dashboard</span>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-neutral-200 p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                {stat.label}
              </p>
              <p className={cn("mt-1.5 text-xl font-bold", stat.tone)}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-neutral-200">
          <div className="border-b border-neutral-200 px-4 py-2.5">
            <p className="text-xs font-semibold text-neutral-900">Top at-risk customers</p>
          </div>
          <div className="divide-y divide-neutral-100">
            {accounts.map((account) => (
              <div key={account.name} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-neutral-900">
                    {account.name}
                  </p>
                  <p className="truncate text-xs text-neutral-500">{account.reason}</p>
                </div>
                <span className="hidden text-sm text-neutral-600 sm:block">{account.mrr}</span>
                <div className="h-1.5 w-14 shrink-0 overflow-hidden rounded-full bg-neutral-200">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{ width: `${account.risk * 100}%` }}
                  />
                </div>
                <span className="w-9 shrink-0 text-right text-xs font-medium text-red-600">
                  {Math.round(account.risk * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
