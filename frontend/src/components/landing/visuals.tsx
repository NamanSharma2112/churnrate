"use client";

import { useCountUp } from "@/hooks/useInView";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/* -------------------------------------------------------------------------
   1. Churn risk gauge — a 270° arc that sweeps to the score, with the
   contributing factors weighing in behind it.
------------------------------------------------------------------------- */

const RISK_FACTORS = [
  { label: "Logins down 62%", weight: 0.86 },
  { label: "Support tickets up", weight: 0.61 },
  { label: "Seats unused", weight: 0.44 },
  { label: "Invoice overdue", weight: 0.28 },
];

// 270° arc: 2πr × 0.75 with r = 62.
const GAUGE_LENGTH = 292.17;
const GAUGE_SCORE = 0.87;

// Relative bar heights for the risk trend micro-chart.
const TREND = [
  22, 26, 24, 30, 28, 34, 32, 38, 36, 43, 41, 48, 46, 53, 57, 55, 62, 66, 64,
  72, 76, 81, 86, 92,
];

export function RiskGaugeVisual({ inView }: { inView: boolean }) {
  const score = useCountUp(87, inView, 1600);

  return (
    <div className="flex h-full flex-col justify-between gap-8 pt-2">
      <div className="flex flex-col items-center gap-7 sm:flex-row sm:items-center sm:gap-9">
      <div className="relative shrink-0">
        <svg viewBox="0 0 160 160" className="h-44 w-44 sm:h-48 sm:w-48">
          <defs>
            <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="55%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>

          <path
            d="M 36.16 123.84 A 62 62 0 1 1 123.84 123.84"
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="13"
            strokeLinecap="round"
          />
          <path
            d="M 36.16 123.84 A 62 62 0 1 1 123.84 123.84"
            fill="none"
            stroke="url(#gauge-grad)"
            strokeWidth="13"
            strokeLinecap="round"
            style={{
              strokeDasharray: GAUGE_LENGTH,
              strokeDashoffset: inView
                ? GAUGE_LENGTH * (1 - GAUGE_SCORE)
                : GAUGE_LENGTH,
              transition: `stroke-dashoffset 1.7s ${EASE} 120ms`,
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-semibold tracking-tight text-neutral-900 tabular-nums">
            {Math.round(score)}
            <span className="text-xl text-neutral-400">%</span>
          </span>
          <span className="mt-0.5 text-[11px] font-medium tracking-wide text-red-500 uppercase">
            Critical
          </span>
        </div>
      </div>

      <div className="w-full flex-1 space-y-4">
        {RISK_FACTORS.map((factor, i) => (
          <div key={factor.label}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-xs font-medium text-neutral-600">
                {factor.label}
              </span>
              <span className="text-[11px] tabular-nums text-neutral-400">
                {Math.round(factor.weight * 100)}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"
                style={{
                  width: inView ? `${factor.weight * 100}%` : "0%",
                  transition: `width 1.1s ${EASE} ${320 + i * 110}ms`,
                }}
              />
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Risk climbing week over week is the story the score is telling. */}
      <div>
        <div className="mb-2.5 flex items-baseline justify-between">
          <span className="text-[11px] font-medium text-neutral-500">
            Risk trend · last 24 weeks
          </span>
          <span className="text-[11px] font-medium text-red-500">+41 pts</span>
        </div>
        <div className="flex h-14 items-end gap-[3px]">
          {TREND.map((height, i) => (
            <span
              key={i}
              className="flex-1 origin-bottom rounded-[2px]"
              style={{
                height: `${height}%`,
                backgroundColor:
                  i > 17
                    ? "#ef4444"
                    : i > 12
                      ? "#f97316"
                      : i > 8
                        ? "#f59e0b"
                        : "#5eead4",
                transform: inView ? "scaleY(1)" : "scaleY(0)",
                transition: `transform 0.55s ${EASE} ${520 + i * 32}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* The score is only useful if it ends in an action. */}
      <div
        className="flex items-center gap-3 rounded-xl border border-teal-100 bg-teal-50/60 px-4 py-3"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(10px)",
          transition: `all 0.7s ${EASE} 820ms`,
        }}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-[11px] font-semibold text-white">
          1
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-neutral-800">
            Next best action — book a check-in
          </p>
          <p className="truncate text-[11px] text-neutral-500">
            Accounts contacted within 7 days retain 2.3× more often
          </p>
        </div>
        <span className="hidden shrink-0 rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-medium text-teal-700 shadow-sm sm:block">
          Assign
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   2. Risk distribution donut — segments draw in one after another.
------------------------------------------------------------------------- */

const SEGMENTS = [
  { label: "Low", value: 64, color: "#10b981" },
  { label: "Medium", value: 19, color: "#f59e0b" },
  { label: "High", value: 11, color: "#f97316" },
  { label: "Critical", value: 6, color: "#ef4444" },
];

const DONUT_R = 54;
const DONUT_C = 2 * Math.PI * DONUT_R;

export function RiskDonutVisual({ inView }: { inView: boolean }) {
  let rotation = -90;

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 140 140" className="h-32 w-32 shrink-0">
        <circle
          cx="70"
          cy="70"
          r={DONUT_R}
          fill="none"
          stroke="#f5f5f5"
          strokeWidth="16"
        />
        {SEGMENTS.map((segment, i) => {
          const length = (segment.value / 100) * DONUT_C;
          const thisRotation = rotation;
          rotation += (segment.value / 100) * 360;

          return (
            <circle
              key={segment.label}
              cx="70"
              cy="70"
              r={DONUT_R}
              fill="none"
              stroke={segment.color}
              strokeWidth="16"
              strokeLinecap="butt"
              transform={`rotate(${thisRotation} 70 70)`}
              style={{
                // Gap of 3 keeps the segments visually separated.
                strokeDasharray: `${Math.max(length - 3, 0)} ${DONUT_C}`,
                strokeDashoffset: inView ? 0 : length,
                opacity: inView ? 1 : 0,
                transition: `stroke-dashoffset 0.9s ${EASE} ${i * 150}ms, opacity 0.4s ease ${i * 150}ms`,
              }}
            />
          );
        })}
      </svg>

      <div className="flex-1 space-y-2.5">
        {SEGMENTS.map((segment, i) => (
          <div
            key={segment.label}
            className="flex items-center justify-between"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(8px)",
              transition: `all 0.5s ${EASE} ${300 + i * 90}ms`,
            }}
          >
            <span className="flex items-center gap-2 text-xs text-neutral-500">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              {segment.label}
            </span>
            <span className="text-xs font-medium tabular-nums text-neutral-800">
              {segment.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   3. Revenue saved — area chart draws in under a counting figure.
------------------------------------------------------------------------- */

const AREA_LINE =
  "M 0 74 C 26 70, 38 62, 60 56 C 82 50, 96 54, 120 42 C 144 30, 160 26, 184 16 C 200 10, 212 8, 224 5";
const AREA_FILL = `${AREA_LINE} L 224 96 L 0 96 Z`;

export function RevenueVisual({ inView }: { inView: boolean }) {
  const saved = useCountUp(412, inView, 1700);

  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-semibold tracking-tight text-neutral-900 tabular-nums">
          ${Math.round(saved)}k
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M5 1 L9 8 L1 8 Z" fill="currentColor" />
          </svg>
          18.4%
        </span>
      </div>

      <svg viewBox="0 0 224 96" className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d={AREA_FILL}
          fill="url(#rev-fill)"
          style={{
            opacity: inView ? 1 : 0,
            transition: `opacity 0.9s ease 700ms`,
          }}
        />
        <path
          d={AREA_LINE}
          fill="none"
          stroke="#0d9488"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: 340,
            strokeDashoffset: inView ? 0 : 340,
            transition: `stroke-dashoffset 1.6s ${EASE} 200ms`,
          }}
        />
        <circle
          cx="224"
          cy="5"
          r="4"
          fill="#0d9488"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.4s ease 1500ms",
          }}
        />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------
   4. Live alert feed — rows slide in under a pulsing "live" dot.
------------------------------------------------------------------------- */

const ALERTS = [
  { company: "Northwind", note: "Health dropped to 31", tone: "#ef4444" },
  { company: "Lumen Labs", note: "No login in 21 days", tone: "#f97316" },
  { company: "Ferrite", note: "Downgraded to Starter", tone: "#f59e0b" },
];

export function AlertFeedVisual({ inView }: { inView: boolean }) {
  return (
    <div className="space-y-2.5">
      {ALERTS.map((alert, i) => (
        <div
          key={alert.company}
          className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50/70 px-3 py-2.5 transition-colors duration-300 hover:border-neutral-200 hover:bg-white"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(10px)",
            transition: `all 0.6s ${EASE} ${180 + i * 130}ms`,
          }}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span
              className="absolute inline-flex h-full w-full rounded-full"
              style={{
                backgroundColor: alert.tone,
                animation: `landing-pulse-ring 2.4s ease-out ${i * 0.4}s infinite`,
              }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ backgroundColor: alert.tone }}
            />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-neutral-800">
              {alert.company}
            </p>
            <p className="truncate text-[11px] text-neutral-500">{alert.note}</p>
          </div>
          <span className="shrink-0 text-[10px] tabular-nums text-neutral-400">
            {i === 0 ? "now" : `${i * 4}m`}
          </span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------
   5. Health score meter — segmented bar fills to the average.
------------------------------------------------------------------------- */

const METER_STEPS = 28;

export function HealthMeterVisual({ inView }: { inView: boolean }) {
  const health = useCountUp(74, inView, 1500);
  const filled = Math.round((health / 100) * METER_STEPS);

  return (
    <div className="flex h-full flex-col justify-between gap-5">
      <div className="flex items-end gap-1">
        {Array.from({ length: METER_STEPS }).map((_, i) => {
          const active = i < filled;
          return (
            <span
              key={i}
              className="flex-1 rounded-full"
              style={{
                height: active ? `${28 + (i % 5) * 9}px` : "14px",
                backgroundColor: active
                  ? i > METER_STEPS * 0.7
                    ? "#10b981"
                    : i > METER_STEPS * 0.4
                      ? "#2dd4bf"
                      : "#5eead4"
                  : "#f1f5f9",
                transition: `height 0.5s ${EASE} ${i * 22}ms, background-color 0.5s ease ${i * 22}ms`,
              }}
            />
          );
        })}
      </div>

      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold tracking-tight text-neutral-900 tabular-nums">
            {Math.round(health)}
          </span>
          <span className="text-sm text-neutral-400">/ 100</span>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600">
          Healthy
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   6. Ingest pipeline — data travels from source to scored customer.
------------------------------------------------------------------------- */

const PIPELINE = ["CSV", "Postgres", "Model", "Score"];

export function PipelineVisual({ inView }: { inView: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="flex items-center justify-between">
        {PIPELINE.map((step, i) => (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <div
              className="flex h-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white px-2.5 text-[10px] font-semibold whitespace-nowrap text-neutral-600 shadow-sm"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "scale(1)" : "scale(0.8)",
                transition: `all 0.5s ${EASE} ${i * 140}ms`,
              }}
            >
              {step}
            </div>
            {i < PIPELINE.length - 1 && (
              <div className="relative mx-1.5 h-px flex-1 bg-neutral-200">
                <span
                  className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-teal-500"
                  style={{
                    opacity: inView ? 1 : 0,
                    animation: inView
                      ? `landing-float 2.6s ease-in-out ${i * 0.35}s infinite`
                      : "none",
                    left: "40%",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-3"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(8px)",
          transition: `all 0.6s ${EASE} 620ms`,
        }}
      >
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-medium text-neutral-700">12,480 rows</span>
          <span className="text-emerald-600">scored in 1.8s</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"
            style={{
              width: inView ? "100%" : "0%",
              transition: `width 1.4s ${EASE} 760ms`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
