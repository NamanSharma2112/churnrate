"use client";

import { useEffect, useState } from "react";
import { useCountUp } from "@/hooks/useInView";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const TILES = [
  { label: "Customers", value: 2847, prefix: "", suffix: "", delta: "+3.2%", up: true },
  { label: "MRR", value: 284, prefix: "$", suffix: "k", delta: "+5.4%", up: true },
  { label: "At risk", value: 126, prefix: "", suffix: "", delta: "−12%", up: false },
  { label: "Health", value: 74, prefix: "", suffix: "/100", delta: "+2.1%", up: true },
];

// Line chart geometry, drawn in a 320×110 box. Churn declines left to right,
// so the line falls — y grows downward in SVG.
const TREND_LINE =
  "M 4 20 C 34 26, 52 32, 78 36 C 104 40, 122 48, 148 54 C 174 60, 190 56, 216 66 C 242 76, 262 80, 288 88 C 300 92, 310 94, 316 96";
const TREND_FILL = `${TREND_LINE} L 316 104 L 4 104 Z`;

const PREDICTED =
  "M 4 28 C 34 33, 52 39, 78 43 C 104 47, 122 54, 148 59 C 174 64, 190 62, 216 70 C 242 78, 262 82, 288 88 C 300 91, 310 93, 316 94";

const DONUT = [
  { label: "Low", value: 64, color: "#10b981" },
  { label: "Medium", value: 19, color: "#f59e0b" },
  { label: "High", value: 11, color: "#f97316" },
  { label: "Critical", value: 6, color: "#ef4444" },
];
const R = 30;
const C = 2 * Math.PI * R;

// The feed cycles so the frame keeps a live pulse after it has settled.
const FEED = [
  { name: "Northwind Labs", note: "Health dropped to 31", score: 91, tone: "#ef4444" },
  { name: "Ferrite Systems", note: "No login in 21 days", score: 84, tone: "#ef4444" },
  { name: "Lumen Group", note: "Downgraded to Starter", score: 72, tone: "#f97316" },
  { name: "Apex Digital", note: "Invoice 14 days overdue", score: 68, tone: "#f97316" },
  { name: "Vertex Cloud", note: "Support tickets up 3×", score: 63, tone: "#f59e0b" },
];

function Tile({ tile, active, i }: { tile: (typeof TILES)[number]; active: boolean; i: number }) {
  const value = useCountUp(tile.value, active, 1500 + i * 120);

  return (
    <div
      className="rounded-xl border border-neutral-200/80 bg-white px-3 py-2.5"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(10px)",
        transition: `all 0.6s ${EASE} ${i * 90}ms`,
      }}
    >
      <div className="text-[9px] font-medium tracking-wide text-neutral-400 uppercase">
        {tile.label}
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-lg font-semibold tracking-tight text-neutral-900 tabular-nums">
          {tile.prefix}
          {Math.round(value).toLocaleString()}
          <span className="text-[10px] font-normal text-neutral-400">
            {tile.suffix}
          </span>
        </span>
        <span
          className={`text-[9px] font-medium ${tile.up ? "text-emerald-600" : "text-red-500"}`}
        >
          {tile.delta}
        </span>
      </div>
    </div>
  );
}

export function HeroDashboard({ active }: { active: boolean }) {
  const [offset, setOffset] = useState(0);

  // Rotate the at-risk feed so the product looks live, not frozen.
  useEffect(() => {
    if (!active) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = setInterval(() => setOffset((o) => (o + 1) % FEED.length), 3200);
    return () => clearInterval(id);
  }, [active]);

  const visibleFeed = [0, 1, 2].map((n) => FEED[(offset + n) % FEED.length]);
  let rotation = -90;

  return (
    <div
      className="relative"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0) scale(1)" : "translateY(28px) scale(0.98)",
        transition: `all 1s ${EASE} 380ms`,
      }}
    >
      {/* Glow bed so the frame lifts off the page. */}
      <div
        aria-hidden="true"
        // Insets stay inside the section's horizontal padding on small screens
        // so the blur never widens the page.
        className="absolute -inset-x-2 -top-6 -bottom-10 -z-10 rounded-[2.5rem] bg-gradient-to-b from-teal-200/40 via-emerald-100/30 to-transparent blur-3xl sm:-inset-x-10"
      />

      <div className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_40px_80px_-32px_rgba(15,23,42,0.30),0_0_0_1px_rgba(15,23,42,0.02)]">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-neutral-200/80 bg-neutral-50/80 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="mx-auto rounded-md bg-white px-3 py-1 text-[10px] text-neutral-400 ring-1 ring-neutral-200/80">
            app.churnrate.fun/dashboard
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-600">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-emerald-500"
                style={{ animation: "landing-pulse-ring 2.4s ease-out infinite" }}
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Live
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="hidden w-11 shrink-0 flex-col items-center gap-4 border-r border-neutral-200/80 bg-neutral-50/50 py-4 sm:flex">
            <div className="h-5 w-5 rounded-md bg-teal-600" />
            <div className="flex flex-col gap-3">
              {[0, 1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className={`h-1.5 w-5 rounded-full ${n === 0 ? "bg-teal-600" : "bg-neutral-200"}`}
                />
              ))}
            </div>
          </div>

          {/* Main panel */}
          <div className="min-w-0 flex-1 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-[13px] font-semibold tracking-tight text-neutral-900">
                  Churn Analytics
                </div>
                <div className="text-[10px] text-neutral-400">
                  Updated moments ago
                </div>
              </div>
              <div className="hidden items-center gap-0.5 rounded-lg bg-neutral-100 p-0.5 sm:flex">
                {["7d", "30d", "90d"].map((r) => (
                  <span
                    key={r}
                    className={`rounded-md px-2 py-1 text-[10px] font-medium ${
                      r === "30d"
                        ? "bg-white text-neutral-900 shadow-sm"
                        : "text-neutral-400"
                    }`}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TILES.map((tile, i) => (
                <Tile key={tile.label} tile={tile} active={active} i={i} />
              ))}
            </div>

            <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-5">
              {/* Trend */}
              <div className="rounded-xl border border-neutral-200/80 bg-white p-3 sm:col-span-3">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-neutral-700">
                    Churn rate trend
                  </span>
                  <span className="flex items-center gap-2 text-[9px] text-neutral-400">
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      Actual
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Predicted
                    </span>
                  </span>
                </div>
                <svg viewBox="0 0 320 110" className="w-full">
                  <defs>
                    <linearGradient id="hero-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[26, 52, 78].map((y) => (
                    <line
                      key={y}
                      x1="4"
                      x2="316"
                      y1={y}
                      y2={y}
                      stroke="#f1f5f9"
                      strokeWidth="1"
                    />
                  ))}
                  <path
                    d={TREND_FILL}
                    fill="url(#hero-fill)"
                    style={{
                      opacity: active ? 1 : 0,
                      transition: "opacity 0.9s ease 1200ms",
                    }}
                  />
                  <path
                    d={PREDICTED}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="5 4"
                    strokeLinecap="round"
                    style={{
                      opacity: active ? 1 : 0,
                      transition: "opacity 0.8s ease 1400ms",
                    }}
                  />
                  <path
                    d={TREND_LINE}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 420,
                      strokeDashoffset: active ? 0 : 420,
                      transition: `stroke-dashoffset 1.8s ${EASE} 700ms`,
                    }}
                  />
                </svg>
              </div>

              {/* Donut */}
              <div className="flex flex-col rounded-xl border border-neutral-200/80 bg-white p-3 sm:col-span-2">
                <span className="mb-1 text-[10px] font-semibold text-neutral-700">
                  Risk distribution
                </span>
                <div className="flex flex-1 items-center gap-3">
                <div className="relative shrink-0">
                <svg viewBox="0 0 76 76" className="h-[92px] w-[92px]">
                  <circle cx="38" cy="38" r={R} fill="none" stroke="#f5f5f5" strokeWidth="10" />
                  {DONUT.map((seg, i) => {
                    const len = (seg.value / 100) * C;
                    const rot = rotation;
                    rotation += (seg.value / 100) * 360;
                    return (
                      <circle
                        key={seg.label}
                        cx="38"
                        cy="38"
                        r={R}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="10"
                        transform={`rotate(${rot} 38 38)`}
                        style={{
                          strokeDasharray: `${Math.max(len - 2, 0)} ${C}`,
                          strokeDashoffset: active ? 0 : len,
                          opacity: active ? 1 : 0,
                          transition: `stroke-dashoffset 0.8s ${EASE} ${900 + i * 130}ms, opacity 0.4s ease ${900 + i * 130}ms`,
                        }}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-semibold tracking-tight text-neutral-900 tabular-nums">
                    2,847
                  </span>
                  <span className="text-[8px] text-neutral-400">accounts</span>
                </div>
                </div>
                <div className="min-w-0 flex-1 space-y-1.5">
                  {DONUT.map((seg, i) => (
                    <div
                      key={seg.label}
                      className="flex items-center justify-between text-[9px]"
                      style={{
                        opacity: active ? 1 : 0,
                        transition: `opacity 0.5s ease ${1100 + i * 100}ms`,
                      }}
                    >
                      <span className="flex items-center gap-1.5 text-neutral-500">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: seg.color }}
                        />
                        {seg.label}
                      </span>
                      <span className="font-medium tabular-nums text-neutral-700">
                        {seg.value}%
                      </span>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            </div>

            {/* Live at-risk feed */}
            <div className="mt-2.5 rounded-xl border border-neutral-200/80 bg-white p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-neutral-700">
                  Top at-risk accounts
                </span>
                <span className="text-[9px] text-neutral-400">126 flagged</span>
              </div>
              <div className="space-y-1.5">
                {visibleFeed.map((row, i) => (
                  <div
                    key={`${row.name}-${offset}`}
                    className="flex items-center gap-2.5 rounded-lg bg-neutral-50/80 px-2.5 py-1.5"
                    style={{
                      animation: active
                        ? `landing-ticker 0.5s ${EASE} ${i * 70}ms both`
                        : "none",
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: row.tone }}
                    />
                    <span className="min-w-0 flex-1 truncate text-[10px] font-medium text-neutral-800">
                      {row.name}
                    </span>
                    <span className="hidden truncate text-[9px] text-neutral-400 sm:block">
                      {row.note}
                    </span>
                    <span
                      className="shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-semibold tabular-nums"
                      style={{ backgroundColor: `${row.tone}14`, color: row.tone }}
                    >
                      {row.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
