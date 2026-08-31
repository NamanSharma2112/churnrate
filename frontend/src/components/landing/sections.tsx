"use client";

import Link from "next/link";
import {
  CloudUploadIcon,
  CpuSettingsIcon,
  Target01Icon,
  ArrowRight01Icon,
  ChartLineData01Icon,
} from "hugeicons-react";
import { useInView } from "@/hooks/useInView";

const STEPS = [
  {
    icon: CloudUploadIcon,
    title: "Connect your data",
    body: "Upload a CSV or point ChurnRate at your Postgres. Customers, plans and activity are all it needs.",
  },
  {
    icon: CpuSettingsIcon,
    title: "Models score the base",
    body: "Usage, billing and support signals become a churn probability for every account — refreshed hourly.",
  },
  {
    icon: Target01Icon,
    title: "Work the ranked list",
    body: "Your team opens a prioritised queue of at-risk accounts, each with the reasons behind the score.",
  },
];

export function HowItWorks() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section
      id="how"
      className="scroll-mt-24 border-y border-neutral-200/70 bg-neutral-50/60"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <div
          className="landing-reveal mx-auto max-w-2xl text-center"
          data-visible={inView}
        >
          <span className="text-[11px] font-semibold tracking-[0.16em] text-teal-600 uppercase">
            How it works
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Three steps to a retention program
          </h2>
        </div>

        <div className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Connector rail behind the steps on wide screens. */}
          <div
            aria-hidden="true"
            className="absolute top-9 right-[16%] left-[16%] hidden h-px origin-left bg-gradient-to-r from-transparent via-neutral-300 to-transparent md:block"
            style={{
              transform: inView ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1) 200ms",
            }}
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                data-visible={inView}
                style={{ "--reveal-delay": `${i * 130}ms` } as React.CSSProperties}
                className="landing-reveal group relative text-center"
              >
                <div className="relative z-10 mx-auto flex h-18 w-18 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:border-teal-200 group-hover:shadow-lg group-hover:shadow-teal-600/10">
                  <Icon
                    size={26}
                    className="text-teal-600 transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-semibold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-neutral-500">
                  {step.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ClosingCTA() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <div
        ref={ref}
        data-visible={inView}
        className="landing-reveal relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-950 px-8 py-16 text-center sm:px-16"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:48px_48px]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[90px]"
        />

        <div className="relative z-10">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
            See who&apos;s about to leave
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-teal-50/80">
            Connect your data and get a scored customer base in under an hour.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="landing-shine group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-medium text-teal-800 shadow-lg transition-all duration-300 hover:bg-teal-50 active:translate-y-px sm:w-auto"
            >
              Create your workspace
              <ArrowRight01Icon
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/login"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/25 px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 active:translate-y-px sm:w-auto"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-neutral-200/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <ChartLineData01Icon size={20} className="text-teal-600" />
          <span className="text-sm font-semibold text-neutral-900">
            ChurnRate
          </span>
        </div>
        <p className="text-xs text-neutral-400">
          © {new Date().getFullYear()} ChurnRate. All rights reserved.
        </p>
        <div className="flex items-center gap-5 text-xs text-neutral-500">
          <a href="#" className="transition-colors hover:text-neutral-900">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-neutral-900">
            Terms
          </a>
          <Link
            href="/login"
            className="transition-colors hover:text-neutral-900"
          >
            Sign in
          </Link>
        </div>
      </div>
    </footer>
  );
}
