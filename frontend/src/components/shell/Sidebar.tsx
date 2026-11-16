"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent, type PointerEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Check,
  ChevronsUpDown,
  LogOut,
  Monitor,
  Moon,
  PanelLeft,
  Search,
  Sun,
  X,
  type LucideIcon,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useDashboardStore } from "@/store/dashboard";
import { useShell } from "@/store/shell";
import { useTheme, type ThemePreference } from "@/lib/theme";
import { API_BASE } from "@/lib/api";
import { EASE, popMotion } from "@/lib/motion";
import { FLOAT, FOCUS, FOCUS_IN, HOVER, ICON_BTN, KBD, PRESS } from "@/lib/ui";
import { onMenuKeys, useFocusTrap } from "@/hooks/useFocusTrap";
import { cn } from "@/lib/utils";
import type { PlanUsage } from "@/types";
import { NAV, SETTINGS_ROUTE, type NavRoute } from "./nav";

const NAV_IDLE = "text-subtle pointer-fine:hover:bg-black/[0.04] dark:pointer-fine:hover:bg-white/[0.05] pointer-fine:hover:text-foreground";
const NAV_ACTIVE = "bg-sidebar-accent text-foreground font-medium";

type Tip = { show: (el: HTMLElement, label: string) => void; hide: () => void };

function tipProps(tip: Tip | undefined, label: string) {
  if (!tip) return {};
  return {
    onPointerEnter: (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType === "mouse") tip.show(e.currentTarget, label);
    },
    onPointerLeave: () => tip.hide(),
    onFocus: (e: FocusEvent<HTMLElement>) => {
      if (e.currentTarget.matches(":focus-visible")) tip.show(e.currentTarget, label);
    },
    onBlur: () => tip.hide(),
  };
}

/**
 * Rail tooltips. The first one waits a beat (so sweeping the cursor across the
 * rail doesn't spray labels); once one is showing, neighbours appear instantly.
 */
function useRailTip() {
  const [tip, setTip] = useState<{ label: string; top: number; left: number } | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const warmAt = useRef(0);
  const shown = useRef(false);

  const handlers: Tip = {
    show: (el, label) => {
      const r = el.getBoundingClientRect();
      const next = { label, top: r.top + r.height / 2, left: r.right + 8 };
      window.clearTimeout(timer.current);
      if (shown.current || Date.now() - warmAt.current < 500) {
        shown.current = true;
        setTip(next);
      } else {
        timer.current = window.setTimeout(() => {
          shown.current = true;
          setTip(next);
        }, 450);
      }
    },
    hide: () => {
      window.clearTimeout(timer.current);
      if (shown.current) warmAt.current = Date.now();
      shown.current = false;
      setTip(null);
    },
  };

  const node = tip ? (
    <div
      role="tooltip"
      className="pointer-events-none fixed z-[70] -translate-y-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[12px] font-medium text-background shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
      style={{ top: tip.top, left: tip.left }}
    >
      {tip.label}
    </div>
  ) : null;

  return { handlers, node };
}

function NavLink({
  route,
  active,
  rail,
  tip,
  trailing,
  railBadge,
  onNavigate,
}: {
  route: NavRoute;
  active: boolean;
  rail: boolean;
  tip?: Tip;
  trailing?: ReactNode;
  railBadge?: boolean;
  onNavigate?: () => void;
}) {
  const Icon = route.icon;
  return (
    <Link
      href={route.path}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      aria-label={rail ? route.label : undefined}
      {...tipProps(rail ? tip : undefined, route.label)}
      className={cn(
        "relative flex h-8 shrink-0 select-none items-center gap-2.5 rounded-md text-[13px]",
        PRESS,
        "active:scale-[0.98]",
        FOCUS_IN,
        rail ? "w-9 justify-center" : "w-full px-2",
        active ? NAV_ACTIVE : NAV_IDLE
      )}
    >
      <Icon
        aria-hidden
        strokeWidth={1.75}
        className={cn("size-4 shrink-0", active ? "text-foreground" : "text-muted-foreground")}
      />
      {!rail && <span className="min-w-0 flex-1 truncate">{route.label}</span>}
      {!rail && trailing}
      {rail && railBadge && (
        <span aria-hidden className="absolute right-1 top-1 size-1.5 rounded-full bg-status-critical ring-2 ring-sidebar" />
      )}
    </Link>
  );
}

function SectionLabel({ children, rail }: { children: ReactNode; rail: boolean }) {
  if (rail) return <div aria-hidden className="mx-2 my-3 h-px bg-black/[0.07] dark:bg-white/[0.07]" />;
  return (
    <h2 className="px-2 pb-1.5 pt-5 text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
      {children}
    </h2>
  );
}

const THEMES: { key: ThemePreference; label: string; icon: LucideIcon }[] = [
  { key: "light", label: "Light", icon: Sun },
  { key: "dark", label: "Dark", icon: Moon },
  { key: "system", label: "System", icon: Monitor },
];

function WorkspaceMenu({ onClose, onSignOut }: { onClose: () => void; onSignOut: () => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const onKeyDown = useFocusTrap(ref, onClose, { trigger: "workspace" });
  const { tenant, user } = useAuthStore();
  const { preference, setPreference } = useTheme();
  const router = useRouter();
  const item = cn(
    "flex h-8 w-full items-center gap-2.5 rounded-md px-2 text-left text-[13px] text-foreground",
    HOVER,
    "outline-none focus-visible:bg-black/[0.05] dark:focus-visible:bg-white/[0.07]"
  );

  return (
    <motion.div
      ref={ref}
      role="menu"
      aria-label="Workspace"
      onKeyDown={(e) => {
        onKeyDown(e);
        onMenuKeys(e);
      }}
      {...popMotion(reduce)}
      className={cn(FLOAT, "absolute left-2 top-[46px] z-[60] w-[236px] origin-top-left p-1")}
    >
      <div className="px-2 pb-1.5 pt-1.5">
        <p className="truncate text-[13px] font-medium text-foreground">{tenant?.name ?? "Workspace"}</p>
        <p className="truncate text-[12px] text-muted-foreground">{user?.email}</p>
      </div>
      <div role="separator" className="mx-1 my-1 h-px bg-border" />
      <button
        type="button"
        role="menuitem"
        onClick={() => {
          onClose();
          router.push(SETTINGS_ROUTE.path);
        }}
        className={item}
      >
        <SETTINGS_ROUTE.icon aria-hidden className="size-4 text-muted-foreground" strokeWidth={1.75} />
        Settings
      </button>
      <p className="px-2 pb-1 pt-2 text-[12px] text-muted-foreground">Theme</p>
      {THEMES.map((t) => (
        <button
          key={t.key}
          type="button"
          role="menuitemradio"
          aria-checked={preference === t.key}
          onClick={() => setPreference(t.key)}
          className={item}
        >
          <t.icon aria-hidden className="size-4 text-muted-foreground" strokeWidth={1.75} />
          <span className="flex-1">{t.label}</span>
          {preference === t.key && <Check aria-hidden className="size-3.5 text-brand" />}
        </button>
      ))}
      <div role="separator" className="mx-1 my-1 h-px bg-border" />
      <button type="button" role="menuitem" onClick={onSignOut} className={item}>
        <LogOut aria-hidden className="size-4 text-muted-foreground" strokeWidth={1.75} />
        Sign out
      </button>
    </motion.div>
  );
}

/** Real plan usage from the API - the limits live server-side, not here. */
function usePlanUsage() {
  const token = useAuthStore((s) => s.token);
  const [usage, setUsage] = useState<PlanUsage | null>(null);
  useEffect(() => {
    if (!token) return;
    let live = true;
    fetch(`${API_BASE}/api/dashboard/usage`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (live && data?.usage) setUsage(data.usage);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [token]);
  return usage;
}

function PlanMeter({ usage }: { usage: PlanUsage }) {
  const reduce = useReducedMotion();
  const pct = usage.percentUsed ?? 0;
  return (
    <Link
      href={SETTINGS_ROUTE.path}
      className={cn("block rounded-lg border border-border bg-card px-3 py-2.5", PRESS, "active:scale-[0.99]", FOCUS, "pointer-fine:hover:border-input")}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[12px] font-medium text-foreground">{usage.planLabel}</span>
        <span className="text-[11px] tabular-nums text-muted-foreground">
          {usage.customersTracked.toLocaleString()}
          {usage.limit !== null && ` / ${usage.limit.toLocaleString()}`}
        </span>
      </div>
      {usage.limit !== null && (
        <div
          role="progressbar"
          aria-label="Customers tracked against plan limit"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          className="mt-2 h-1 rounded-full bg-black/[0.07] dark:bg-white/[0.09]"
        >
          <motion.div
            className={cn("h-full rounded-full", pct >= 90 ? "bg-status-critical" : "bg-brand")}
            initial={{ clipPath: "inset(0 100% 0 0 round 999px)" }}
            animate={{ clipPath: `inset(0 ${100 - Math.max(pct, 2)}% 0 0 round 999px)` }}
            transition={{ duration: reduce ? 0 : 0.6, ease: EASE, delay: 0.15 }}
          />
        </div>
      )}
    </Link>
  );
}

export function Sidebar({
  variant,
  rail,
  onClose,
  onNavigate,
}: {
  variant: "inline" | "drawer";
  rail: boolean;
  onClose?: () => void;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { tenant, logout } = useAuthStore();
  const { collapsed, setCollapsed, setPaletteOpen } = useShell();
  const atRisk = useDashboardStore((s) => (s.loaded ? s.stats.atRiskCustomers : 0));
  const usage = usePlanUsage();
  const [menuOpen, setMenuOpen] = useState(false);
  const { handlers: railTip, node: tipNode } = useRailTip();
  const tip = rail ? railTip : undefined;

  const isActive = (path: string) => pathname === path || (path !== "/dashboard" && !!pathname?.startsWith(`${path}/`));
  const letter = (tenant?.name ?? "W").trim().charAt(0).toUpperCase();

  const signOut = () => {
    setMenuOpen(false);
    logout();
    router.replace("/login");
  };

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      {/* Workspace switcher */}
      <div className={cn("flex h-12 shrink-0 items-center gap-1", rail ? "justify-center px-2" : "pl-2 pr-2.5")}>
        <button
          type="button"
          data-trigger="workspace"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label={rail ? `${tenant?.name ?? "Workspace"} menu` : undefined}
          onClick={() => setMenuOpen((o) => !o)}
          {...tipProps(tip, tenant?.name ?? "Workspace")}
          className={cn(
            "flex h-8 min-w-0 items-center gap-2 rounded-md",
            rail ? "w-9 justify-center" : "flex-1 px-1.5",
            HOVER,
            PRESS,
            "active:scale-[0.98]",
            FOCUS_IN
          )}
        >
          <span className="flex size-[22px] shrink-0 items-center justify-center rounded-md bg-foreground text-[11px] font-semibold text-background">
            {letter}
          </span>
          {!rail && (
            <>
              <span className="truncate text-[13px] font-semibold text-foreground">{tenant?.name ?? "Workspace"}</span>
              <ChevronsUpDown aria-hidden className="ml-auto size-3.5 shrink-0 text-muted-foreground" />
            </>
          )}
        </button>
        {!rail &&
          (variant === "drawer" ? (
            <button type="button" aria-label="Close navigation" onClick={onClose} className={ICON_BTN}>
              <X aria-hidden className="size-4" />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Collapse sidebar"
              onClick={() => {
                railTip.hide();
                setCollapsed(!collapsed);
              }}
              className={ICON_BTN}
            >
              <PanelLeft aria-hidden className="size-4" strokeWidth={1.75} />
            </button>
          ))}
      </div>

      <AnimatePresence>
        {menuOpen && <WorkspaceMenu key="ws" onClose={() => setMenuOpen(false)} onSignOut={signOut} />}
      </AnimatePresence>

      <nav
        aria-label="Main navigation"
        className={cn("min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-4", rail ? "flex flex-col items-center px-2" : "px-2")}
      >
        {rail && (
          <button
            type="button"
            aria-label="Expand sidebar"
            onClick={() => {
              railTip.hide();
              setCollapsed(false);
            }}
            {...tipProps(tip, "Expand sidebar")}
            className={cn("flex size-9 items-center justify-center rounded-md", NAV_IDLE, PRESS, FOCUS_IN)}
          >
            <PanelLeft aria-hidden className="size-4 text-muted-foreground" strokeWidth={1.75} />
          </button>
        )}

        {NAV.map((section, i) => (
          <div key={section.title ?? i} className={cn(rail && "flex flex-col items-center")}>
            {section.title && <SectionLabel rail={rail}>{section.title}</SectionLabel>}
            {section.routes.map((route) => (
              <NavLink
                key={route.path}
                route={route}
                rail={rail}
                tip={tip}
                active={isActive(route.path)}
                onNavigate={onNavigate}
                railBadge={route.path === "/at-risk" && atRisk > 0}
                trailing={
                  route.path === "/at-risk" && atRisk > 0 ? (
                    <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-status-critical/15 px-1.5 text-[11px] font-medium tabular-nums text-destructive">
                      {atRisk}
                    </span>
                  ) : null
                }
              />
            ))}
            {i === 0 && (
              <button
                type="button"
                onClick={() => {
                  onNavigate?.();
                  setPaletteOpen(true);
                }}
                aria-label={rail ? "Search" : undefined}
                {...tipProps(tip, "Search")}
                className={cn(
                  "flex h-8 shrink-0 select-none items-center gap-2.5 rounded-md text-[13px]",
                  PRESS,
                  "active:scale-[0.98]",
                  FOCUS_IN,
                  rail ? "w-9 justify-center" : "w-full px-2",
                  NAV_IDLE
                )}
              >
                <Search aria-hidden strokeWidth={1.75} className="size-4 shrink-0 text-muted-foreground" />
                {!rail && (
                  <>
                    <span className="flex-1 text-left">Search</span>
                    <kbd className={KBD}>/</kbd>
                  </>
                )}
              </button>
            )}
          </div>
        ))}
      </nav>

      <div className={cn("shrink-0 space-y-2 pb-3", rail ? "flex flex-col items-center px-2" : "px-2")}>
        {!rail && usage && <PlanMeter usage={usage} />}
        <NavLink
          route={SETTINGS_ROUTE}
          rail={rail}
          tip={tip}
          active={isActive(SETTINGS_ROUTE.path)}
          onNavigate={onNavigate}
        />
      </div>

      {tipNode}
    </div>
  );
}

export function ThemeToggleButton() {
  const { resolved, setPreference } = useTheme();
  const dark = resolved === "dark";
  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setPreference(dark ? "light" : "dark")}
      className={cn(ICON_BTN, "size-8")}
    >
      {dark ? <Sun aria-hidden className="size-4" strokeWidth={1.75} /> : <Moon aria-hidden className="size-4" strokeWidth={1.75} />}
    </button>
  );
}
