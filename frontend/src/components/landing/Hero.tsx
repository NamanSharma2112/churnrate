"use client";

import Link from "next/link";
import { ArrowRight01Icon, PlayCircleIcon } from "hugeicons-react";
import { useInView, useCountUp } from "@/hooks/useInView";
import { HeroDashboard } from "./HeroDashboard";

const STATS = [
  { value: 94, suffix: "%", label: "Prediction accuracy" },
  { value: 31, suffix: "%", label: "Less voluntary churn" },
  { value: 412, prefix: "$", suffix: "k", label: "Revenue retained" },
  { value: 40, prefix: "<", suffix: "min", label: "Time to first score" },
];

function Stat({
  stat,
  active,
  delay,
}: {
  stat: (typeof STATS)[number];
  active: boolean;
  delay: number;
}) {
  const value = useCountUp(stat.value, active, 1600);

  return (
    <div
      className="landing-reveal"
      data-visible={active}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <div className="text-3xl font-semibold tracking-tight text-neutral-900 tabular-nums sm:text-4xl">
        {stat.prefix}
        {Math.round(value)}
        {stat.suffix}
      </div>
      <div className="mt-1.5 text-sm text-neutral-500">{stat.label}</div>
    </div>
  );
}

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className="landing-reveal inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 py-1.5 pr-4 pl-1.5 text-xs text-neutral-600 shadow-sm backdrop-blur"
            data-visible={inView}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-emerald-500"
                style={{
                  animation: "landing-pulse-ring 2.4s ease-out infinite",
                }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium">Live scoring</span>
            <span className="text-neutral-300">|</span>
            <span>Predictions refresh every hour</span>
          </div>

          <h1
            className="landing-reveal mt-8 text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.03em] text-balance text-neutral-900 sm:text-6xl lg:text-7xl"
            data-visible={inView}
            style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
          >
            Stop churn{" "}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
              before it starts
            </span>
          </h1>

          <p
            className="landing-reveal mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-neutral-500 sm:text-xl"
            data-visible={inView}
            style={{ "--reveal-delay": "170ms" } as React.CSSProperties}
          >
            ChurnRate scores every customer daily, explains what&apos;s driving
            the risk, and hands your team a ranked list of who to save first.
          </p>

          <div
            className="landing-reveal mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            data-visible={inView}
            style={{ "--reveal-delay": "250ms" } as React.CSSProperties}
          >
            <Link
              href="/register"
              className="landing-shine group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-7 text-[15px] font-medium text-white shadow-lg shadow-neutral-900/10 transition-all duration-300 hover:bg-neutral-800 hover:shadow-xl hover:shadow-neutral-900/15 active:translate-y-px sm:w-auto"
            >
              Start free
              <ArrowRight01Icon
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <a
              href="#product"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-7 text-[15px] font-medium text-neutral-700 transition-all duration-300 hover:border-neutral-300 hover:bg-neutral-50 active:translate-y-px sm:w-auto"
            >
              <PlayCircleIcon
                size={18}
                className="text-teal-600 transition-transform duration-300 group-hover:scale-110"
              />
              See how it works
            </a>
          </div>

          <p
            className="landing-reveal mt-4 text-xs text-neutral-400"
            data-visible={inView}
            style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
          >
            No credit card required · 14-day trial
          </p>
        </div>

        {/* Animated product frame */}
        <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
          <HeroDashboard active={inView} />
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-8 border-t border-neutral-200/80 pt-12 text-center sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <Stat
              key={stat.label}
              stat={stat}
              active={inView}
              delay={520 + i * 90}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
