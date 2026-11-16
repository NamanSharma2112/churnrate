"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { MotionConfig, motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Command,
  CreditCard,
  FileSpreadsheet,
  Menu,
  Search,
  TriangleAlert,
  X,
  Zap,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────────────────────
   Linear-inspired marketing page. Always dark (it sets `.dark` on its own root,
   independent of the app theme). Motion budget, on purpose:
   - a one-time hero intro (never waits for scroll),
   - three scroll moments that play once: the bento grid, the steps, the CTA,
   - bento visuals that run once when they enter view,
   - one decorative loop (the data-source marquee), which stops under reduced motion.
   ──────────────────────────────────────────────────────────────────────────── */

const NAV = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
];

const SOURCES = ["Stripe", "CSV exports", "Excel", "Salesforce export", "HubSpot export", "Product analytics", "Support desk", "Data warehouse"];

const INK = "text-[#f7f8f8]";
const DIM = "text-[#8a8f98]";
const LINE = "border-white/[0.08]";
const PANEL = "rounded-2xl border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))]";

/** Reveal once, ~15% into the viewport. Content is never re-hidden on scroll-up. */
function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, transform: reduce ? "none" : "translateY(14px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Hero product frame: a static replica of the dashboard ─────────────────── */

const TREND = [31, 30.4, 29.2, 29.8, 27.9, 27.1, 25.6, 24.9, 23.8, 22.4, 21.9, 20.6];

function FrameChart() {
  const reduce = useReducedMotion();
  const w = 560;
  const h = 150;
  const pts = TREND.map((v, i) => [12 + (i * (w - 24)) / (TREND.length - 1), 12 + ((32 - v) / 14) * (h - 30)]);
  const d = pts.reduce((acc, [x, y], i) => (i ? `${acc} L${x},${y}` : `M${x},${y}`), "");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="hero-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3987e5" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#3987e5" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="12" x2={w - 12} y1={12 + i * 36} y2={12 + i * 36} stroke="rgba(255,255,255,0.05)" />
      ))}
      <motion.path
        d={`${d} L${pts[pts.length - 1][0]},${h} L${pts[0][0]},${h} Z`}
        fill="url(#hero-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: reduce ? 0 : 1.3 }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="#3987e5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.7 }}
      />
      <motion.circle
        cx={pts[pts.length - 1][0]}
        cy={pts[pts.length - 1][1]}
        r="4"
        fill="#3987e5"
        stroke="#101012"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 2 }}
      />
    </svg>
  );
}

function ProductFrame() {
  const rows = [
    { name: "Northwind Labs", risk: 92, mrr: "$899" },
    { name: "Cobalt Systems", risk: 84, mrr: "$299" },
    { name: "Harbor Logistics", risk: 71, mrr: "$899" },
    { name: "Quartz Software", risk: 63, mrr: "$49" },
  ];
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/[0.09] bg-[#0f0f10] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_40px_120px_-30px_rgba(57,135,229,0.25)]">
      <div className="flex h-9 items-center gap-1.5 border-b border-white/[0.06] px-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2.5 rounded-full bg-white/[0.08]" />
        ))}
        <div className="mx-auto flex h-5 w-56 items-center justify-center gap-1.5 rounded bg-white/[0.04] text-[10px] text-[#8a8f98]">
          <Search className="size-3" /> Search or jump to… <span className="rounded border border-white/10 px-1">⌘K</span>
        </div>
      </div>
      <div className="flex">
        <div className="hidden w-[168px] shrink-0 border-r border-white/[0.06] bg-[#0b0b0c] p-2.5 md:block">
          <div className="mb-3 flex items-center gap-2 px-1.5 text-[11px] font-semibold text-[#ededef]">
            <span className="flex size-4 items-center justify-center rounded bg-[#ededef] text-[9px] text-[#18181b]">A</span>
            Acme Inc
          </div>
          {["Dashboard", "At-risk", "Customers", "Churn analysis", "Reports", "ML model", "Data import"].map((l, i) => (
            <div
              key={l}
              className={cn("mb-0.5 flex h-6 items-center rounded px-1.5 text-[11px]", i === 0 ? "bg-white/[0.08] text-white" : "text-[#a9a9b0]")}
            >
              {l}
              {i === 1 && <span className="ml-auto rounded-full bg-[#d03b3b]/20 px-1.5 text-[9px] text-[#f87171]">12</span>}
            </div>
          ))}
        </div>
        <div className="min-w-0 flex-1 p-4">
          <p className="text-[13px] font-semibold text-[#ededef]">Good morning, Sam</p>
          <p className="text-[10px] text-[#8e8e96]">How your customers moved over the last 12 months.</p>
          <div className="mt-3 grid grid-cols-3 rounded-lg border border-white/[0.07] sm:grid-cols-6">
            {[
              ["Customers", "4,182"],
              ["Active", "3,610"],
              ["Churn rate", "20.6%"],
              ["MRR", "$412k"],
              ["At risk", "12"],
              ["Avg health", "71"],
            ].map(([k, v], i) => (
              <div key={k} className={cn("px-2.5 py-2", i % 3 !== 0 && "border-l border-white/[0.07]", i >= 3 && "border-t border-white/[0.07] sm:border-t-0", i === 3 && "sm:border-l")}>
                <p className="text-[9px] text-[#a9a9b0]">{k}</p>
                <p className={cn("text-[14px] font-medium", k === "At risk" ? "text-[#f87171]" : "text-[#ededef]")}>{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-lg border border-white/[0.07] p-3">
              <p className="text-[11px] font-semibold text-[#ededef]">Churn rate</p>
              <div className="h-[120px]">
                <FrameChart />
              </div>
            </div>
            <div className="rounded-lg border border-white/[0.07] p-3">
              <p className="mb-2 text-[11px] font-semibold text-[#ededef]">Top at-risk customers</p>
              {rows.map((r, i) => (
                <div key={r.name} className="flex items-center gap-2 border-t border-white/[0.05] py-1.5 text-[10px]">
                  <span className="w-[92px] truncate text-[#ededef]">{r.name}</span>
                  <span className="h-1 flex-1 rounded-full bg-white/[0.06]">
                    <motion.span
                      className="block h-full rounded-full"
                      style={{ background: r.risk >= 80 ? "#d03b3b" : "#ec835a", width: `${r.risk}%` }}
                      initial={{ clipPath: "inset(0 100% 0 0)" }}
                      animate={{ clipPath: "inset(0 0% 0 0)" }}
                      transition={{ duration: 0.7, ease: EASE, delay: 1 + i * 0.08 }}
                    />
                  </span>
                  <span className="w-6 text-right tabular-nums text-[#a9a9b0]">{r.risk}%</span>
                  <span className="w-8 text-right tabular-nums text-[#8e8e96]">{r.mrr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Bento visuals: each runs once when its card enters view ───────────────── */

function useOnce<T extends Element>() {
  const ref = useRef<T>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  return [ref, seen] as const;
}

function ScoredList() {
  const [ref, seen] = useOnce<HTMLDivElement>();
  const rows = [
    ["Northwind Labs", 0.92, "Gone quiet"],
    ["Cobalt Systems", 0.84, "Support load"],
    ["Harbor Logistics", 0.71, "Rare logins"],
    ["Lumen Health", 0.38, "—"],
    ["Pinecrest", 0.12, "—"],
  ] as const;
  return (
    <div ref={ref} className="space-y-1.5">
      {rows.map(([name, risk, why], i) => {
        const color = risk >= 0.8 ? "#d03b3b" : risk >= 0.6 ? "#ec835a" : risk >= 0.3 ? "#fab219" : "#0ca30c";
        return (
          <div key={name} className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[12px]">
            <span className="w-28 truncate text-[#ededef] sm:w-36">{name}</span>
            <span className="h-1.5 flex-1 rounded-full" style={{ background: `${color}2e` }}>
              <motion.span
                className="block h-full rounded-full"
                style={{ background: color, width: `${risk * 100}%` }}
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={seen ? { clipPath: "inset(0 0% 0 0)" } : undefined}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.07 }}
              />
            </span>
            <span className="w-9 text-right tabular-nums text-[#a9a9b0]">{Math.round(risk * 100)}%</span>
            <span className="hidden w-24 text-[11px] text-[#8a8f98] sm:block">{why}</span>
          </div>
        );
      })}
    </div>
  );
}

function Reasons() {
  const [ref, seen] = useOnce<HTMLDivElement>();
  const reasons = [
    ["No login in 46 days", 0.42],
    ["9 support tickets", 0.27],
    ["Feature usage 8%", 0.18],
    ["NPS 2", 0.13],
  ] as const;
  return (
    <div ref={ref} className="space-y-2">
      {reasons.map(([label, w], i) => (
        <motion.div
          key={label}
          className="flex items-center gap-2 text-[12px]"
          initial={{ opacity: 0, transform: "translateX(-8px)" }}
          animate={seen ? { opacity: 1, transform: "translateX(0px)" } : undefined}
          transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.09 }}
        >
          <span className="w-36 truncate text-[#d0d6e0]">{label}</span>
          <span className="h-1.5 rounded-full bg-[#d95926]" style={{ width: `${w * 160}px` }} />
          <span className="tabular-nums text-[#8a8f98]">+{Math.round(w * 100)}%</span>
        </motion.div>
      ))}
    </div>
  );
}

function Mapping() {
  const [ref, seen] = useOnce<HTMLDivElement>();
  const pairs = [
    ["Account Name", "Company"],
    ["Monthly Revenue", "MRR"],
    ["Last Seen", "Last active"],
    ["Open Tickets", "Support tickets"],
  ];
  return (
    <div ref={ref} className="space-y-1.5 text-[11px]">
      {pairs.map(([from, to], i) => (
        <div key={from} className="flex items-center gap-2">
          <span className="w-[112px] truncate rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-mono text-[#a9a9b0]">{from}</span>
          <motion.span
            className="h-px flex-1 origin-left bg-white/20"
            initial={{ transform: "scaleX(0)" }}
            animate={seen ? { transform: "scaleX(1)" } : undefined}
            transition={{ duration: 0.4, ease: EASE, delay: 0.15 + i * 0.12 }}
          />
          <motion.span
            className="w-[104px] truncate rounded-md border border-[#3987e5]/30 bg-[#3987e5]/10 px-2 py-1 text-[#9ec5f4]"
            initial={{ opacity: 0 }}
            animate={seen ? { opacity: 1 } : undefined}
            transition={{ duration: 0.3, delay: 0.45 + i * 0.12 }}
          >
            {to}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

function StripePulse() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex h-[120px] items-center justify-between px-2">
      <span className="z-10 flex size-11 items-center justify-center rounded-xl border border-white/[0.1] bg-[#635bff]/15 text-[#a5a0ff]">
        <CreditCard className="size-5" />
      </span>
      <span className="absolute left-14 right-14 top-1/2 h-px bg-white/[0.08]" />
      {!reduce &&
        [0, 1, 2].map((i) => (
          <span
            key={i}
            className="motion-loop absolute left-14 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-[#a5a0ff]"
            style={{ animation: `stripe-dot 2.4s ${i * 0.8}s linear infinite` }}
          />
        ))}
      <span className="z-10 flex size-11 items-center justify-center rounded-xl border border-white/[0.1] bg-[#3987e5]/15 text-[#9ec5f4]">
        <Zap className="size-5" />
      </span>
      <style>{`@keyframes stripe-dot{from{transform:translate(0,-50%);opacity:0}15%{opacity:1}85%{opacity:1}to{transform:translate(calc(100cqw - 128px),-50%);opacity:0}}`}</style>
    </div>
  );
}

function TriageBars() {
  const [ref, seen] = useOnce<HTMLDivElement>();
  const bars = [
    ["Enterprise", 2697, 1],
    ["Pro", 1196, 0.44],
    ["Starter", 343, 0.13],
    ["Free", 0, 0.01],
  ] as const;
  return (
    <div ref={ref} className="flex h-[120px] items-end gap-3 px-1">
      {bars.map(([label, mrr, h], i) => (
        <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
          <span className="text-[10px] tabular-nums text-[#a9a9b0]">${mrr.toLocaleString()}</span>
          <motion.span
            className="w-full max-w-[24px] origin-bottom rounded-t-[4px] bg-[#3987e5]"
            style={{ height: `${Math.max(h * 72, 2)}px` }}
            initial={{ transform: "scaleY(0)" }}
            animate={seen ? { transform: "scaleY(1)" } : undefined}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.07 }}
          />
          <span className="text-[10px] text-[#8a8f98]">{label}</span>
        </div>
      ))}
    </div>
  );
}

function PaletteMock() {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-[#121214] text-[11px]">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2 text-[#8a8f98]">
        <Search className="size-3.5" /> north
      </div>
      {[
        ["Northwind Labs", "92% risk · $899/mo", true],
        ["Re-score every customer", "", false],
        ["Churn analysis", "", false],
      ].map(([l, h, on]) => (
        <div key={String(l)} className={cn("mx-1 my-1 flex items-center rounded px-2 py-1.5", on ? "bg-white/[0.07] text-white" : "text-[#a9a9b0]")}>
          {l}
          <span className="ml-auto text-[#8a8f98]">{h}</span>
        </div>
      ))}
    </div>
  );
}

function Bento({
  title,
  body,
  icon: Icon,
  children,
  className,
}: {
  title: string;
  body: string;
  icon: typeof Zap;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(PANEL, "group flex flex-col overflow-hidden p-5 transition-colors duration-200 pointer-fine:hover:border-white/[0.14]", className)}>
      <div className="mb-5 min-h-[120px] flex-1">{children}</div>
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-[#8a8f98]" strokeWidth={1.75} />
        <h3 className={cn("text-[15px] font-medium", INK)}>{title}</h3>
      </div>
      <p className={cn("mt-1.5 text-[13px] leading-relaxed", DIM)}>{body}</p>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export function LandingPage() {
  const reduce = useReducedMotion();
  const { isAuthenticated, init } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    init();
    setMounted(true);
  }, [init]);

  // Signed-in visitors get "Open dashboard"; everyone else the sign-up path.
  const primaryHref = mounted && isAuthenticated ? "/dashboard" : "/register";
  const primaryLabel = mounted && isAuthenticated ? "Open dashboard" : "Start for free";

  // Hero intro: heading leads, the rest follows with uneven gaps - a wave, not a metronome.
  const intro = (delay: number) => ({
    initial: { opacity: 0, transform: reduce ? "none" : "translateY(12px)", filter: reduce ? "none" : "blur(6px)" },
    animate: { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  return (
    <MotionConfig reducedMotion="user">
      <div className="dark min-h-screen overflow-x-clip bg-[#08090a] font-sans text-[#f7f8f8] antialiased">
        {/* Nav */}
        <header className={cn("sticky top-0 z-40 border-b bg-[#08090a]/75 backdrop-blur-xl", LINE)}>
          <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-6 px-5">
            <Link href="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
              <span className="flex size-6 items-center justify-center rounded-md bg-[#f7f8f8] text-[#08090a]">
                <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
                  <path d="M4 16.5 9 11l3.5 3.5L20 6M20 11V6h-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              ChurnRate
            </Link>
            <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className={cn("text-[13px] transition-colors duration-150 hover:text-white", DIM)}>
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="ml-auto hidden items-center gap-2 md:flex">
              {!(mounted && isAuthenticated) && (
                <Link href="/login" className={cn("rounded-md px-3 py-1.5 text-[13px] transition-colors hover:text-white", DIM)}>
                  Log in
                </Link>
              )}
              <Link href={primaryHref} className="press rounded-md bg-[#f7f8f8] px-3 py-1.5 text-[13px] font-medium text-[#08090a] hover:bg-white">
                {mounted && isAuthenticated ? "Open dashboard" : "Sign up"}
              </Link>
            </div>
            <button
              type="button"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}
              className="ml-auto rounded-md p-1.5 text-[#d0d6e0] md:hidden"
            >
              {menu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
          {menu && (
            <div className={cn("border-t px-5 py-3 md:hidden", LINE)}>
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenu(false)} className="block py-2 text-[14px] text-[#d0d6e0]">
                  {n.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2">
                <Link href="/login" className="flex-1 rounded-md border border-white/10 py-2 text-center text-[13px]">
                  Log in
                </Link>
                <Link href={primaryHref} className="flex-1 rounded-md bg-[#f7f8f8] py-2 text-center text-[13px] font-medium text-[#08090a]">
                  {primaryLabel}
                </Link>
              </div>
            </div>
          )}
        </header>

        <main>
          {/* Hero */}
          <section id="product" className="relative px-5 pb-20 pt-20 sm:pt-28">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(57,135,229,0.16),transparent_70%)]"
            />
            <div className="relative mx-auto max-w-[1200px]">
              <motion.a
                href="#features"
                {...intro(0)}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] py-1 pl-1 pr-3 text-[12px] text-[#d0d6e0] transition-colors hover:border-white/20"
              >
                <span className="rounded-full bg-[#3987e5]/20 px-2 py-0.5 text-[11px] font-medium text-[#9ec5f4]">New</span>
                Per-customer churn explanations
                <ArrowRight className="size-3" />
              </motion.a>
              <motion.h1
                {...intro(0.08)}
                className="mt-6 max-w-[860px] bg-[linear-gradient(180deg,#f7f8f8_30%,rgba(247,248,248,0.55))] bg-clip-text text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] text-transparent sm:text-[64px] lg:text-[76px]"
              >
                Know who&apos;s leaving before they do.
              </motion.h1>
              <motion.p {...intro(0.2)} className={cn("mt-6 max-w-[560px] text-[17px] leading-relaxed", DIM)}>
                ChurnRate scores every customer from the data you already have - Stripe or any CSV - and tells your team who is at
                risk, why, and how much revenue is on the line.
              </motion.p>
              <motion.div {...intro(0.3)} className="mt-9 flex flex-wrap items-center gap-3">
                <Link href={primaryHref} className="press inline-flex h-10 items-center gap-2 rounded-lg bg-[#f7f8f8] px-4 text-[14px] font-medium text-[#08090a] hover:bg-white">
                  {primaryLabel}
                  <ArrowRight className="size-4" />
                </Link>
                <a href="#how-it-works" className="press inline-flex h-10 items-center gap-2 rounded-lg border border-white/[0.1] px-4 text-[14px] text-[#d0d6e0] hover:border-white/20 hover:text-white">
                  How it works
                </a>
              </motion.div>

              <motion.div
                className="mt-16 [perspective:2000px] sm:mt-20"
                initial={{ opacity: 0, transform: reduce ? "none" : "translateY(28px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.42 }}
              >
                <div className="relative [mask-image:linear-gradient(to_bottom,black_65%,transparent)] [transform:rotateX(9deg)] [transform-origin:top]">
                  <ProductFrame />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Sources marquee: the one decorative loop. Stops under reduced motion. */}
          <section aria-label="Data sources" className={cn("border-y py-6", LINE)}>
            <p className={cn("mb-4 text-center text-[12px] uppercase tracking-[0.14em]", DIM)}>Works with the data you already have</p>
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              <div className="motion-loop flex w-max gap-3 [animation:marquee_40s_linear_infinite]">
                {[...SOURCES, ...SOURCES].map((s, i) => (
                  <span key={i} aria-hidden={i >= SOURCES.length} className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 text-[13px] text-[#d0d6e0]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Bento */}
          <section id="features" className="px-5 py-24 sm:py-32">
            <div className="mx-auto max-w-[1200px]">
              <Reveal>
                <p className="text-[13px] font-medium text-[#9ec5f4]">Built for retention teams</p>
                <h2 className="mt-3 max-w-[620px] text-[36px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[48px]">
                  From raw export to a ranked call list.
                </h2>
              </Reveal>
              <div className="mt-12 grid gap-4 md:grid-cols-6">
                <Reveal className="md:col-span-4" delay={0}>
                  <Bento icon={TriangleAlert} title="Every account, scored" body="A gradient-boosted model reads usage, billing and support signals and returns a churn probability for every customer.">
                    <ScoredList />
                  </Bento>
                </Reveal>
                <Reveal className="md:col-span-2" delay={0.12}>
                  <Bento icon={BrainCircuit} title="Reasons, not just scores" body="Each prediction carries the signals that moved that specific customer.">
                    <Reasons />
                  </Bento>
                </Reveal>
                <Reveal className="md:col-span-2" delay={0.05}>
                  <Bento icon={FileSpreadsheet} title="Any CSV, mapped for you" body="Columns are matched by name and by their values. Review before anything is written.">
                    <Mapping />
                  </Bento>
                </Reveal>
                <Reveal className="md:col-span-2" delay={0.17}>
                  <Bento icon={CreditCard} title="Stripe as a source" body="Subscriptions and failed payments sync in; webhooks re-score an account the moment billing changes.">
                    <div className="[container-type:inline-size]">
                      <StripePulse />
                    </div>
                  </Bento>
                </Reveal>
                <Reveal className="md:col-span-2" delay={0.26}>
                  <Bento icon={Zap} title="Revenue-weighted triage" body="The at-risk view leads with MRR exposed, so effort follows the money.">
                    <TriageBars />
                  </Bento>
                </Reveal>
                <Reveal className="md:col-span-6" delay={0.08}>
                  <div className={cn(PANEL, "grid items-center gap-8 p-6 md:grid-cols-2")}>
                    <div>
                      <div className="flex items-center gap-2">
                        <Command className="size-4 text-[#8a8f98]" strokeWidth={1.75} />
                        <h3 className="text-[15px] font-medium">Fast by default</h3>
                      </div>
                      <p className={cn("mt-1.5 max-w-[420px] text-[13px] leading-relaxed", DIM)}>
                        Jump to any customer, page or action with <kbd className="rounded border border-white/15 px-1 text-[11px]">⌘K</kbd>. Light and dark
                        themes, a collapsible sidebar, and a dashboard that stays calm when there&apos;s a lot going on.
                      </p>
                    </div>
                    <PaletteMock />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* How it works */}
          <section id="how-it-works" className={cn("border-t px-5 py-24 sm:py-32", LINE)}>
            <div className="mx-auto max-w-[1200px]">
              <Reveal>
                <h2 className="max-w-[560px] text-[36px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[48px]">Three steps. No data team required.</h2>
              </Reveal>
              <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
                {[
                  ["01", "Bring your data", "Upload any CSV or connect Stripe. “Account Name”, “Monthly Revenue” or “Last Login” are recognised automatically."],
                  ["02", "Every account is scored", "The model returns a churn probability and the factors that drove it, for each customer."],
                  ["03", "Act before they leave", "Work the ranked list by revenue at stake, and re-score whenever the data changes."],
                ].map(([n, t, b], i) => (
                  <Reveal key={n} delay={[0, 0.12, 0.2][i]} className="bg-[#08090a]">
                    <div className="h-full p-6">
                      <span className="font-mono text-[12px] text-[#9ec5f4]">{n}</span>
                      <h3 className="mt-6 text-[17px] font-medium">{t}</h3>
                      <p className={cn("mt-2 text-[14px] leading-relaxed", DIM)}>{b}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-5 pb-28">
            <Reveal className="mx-auto max-w-[1200px]">
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] px-6 py-16 text-center sm:py-20">
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_100%,rgba(57,135,229,0.18),transparent_70%)]" />
                <h2 className="relative mx-auto max-w-[620px] text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[44px]">
                  Stop finding out about churn from the cancellation email.
                </h2>
                <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                  <Link href={primaryHref} className="press inline-flex h-10 items-center gap-2 rounded-lg bg-[#f7f8f8] px-4 text-[14px] font-medium text-[#08090a] hover:bg-white">
                    {primaryLabel}
                    <ArrowRight className="size-4" />
                  </Link>
                  {!(mounted && isAuthenticated) && (
                    <Link href="/login" className="press inline-flex h-10 items-center gap-1.5 rounded-lg border border-white/[0.1] px-4 text-[14px] text-[#d0d6e0] hover:border-white/20 hover:text-white">
                      Log in
                      <ArrowUpRight className="size-4" />
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          </section>
        </main>

        <footer className={cn("border-t px-5 py-8", LINE)}>
          <div className={cn("mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-6 gap-y-3 text-[13px]", DIM)}>
            <span className="text-[#d0d6e0]">© {new Date().getFullYear()} ChurnRate</span>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/login" className="ml-auto hover:text-white">
              Log in
            </Link>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
