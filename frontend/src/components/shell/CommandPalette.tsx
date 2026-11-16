"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  CornerDownLeft,
  LogOut,
  Moon,
  PanelLeft,
  RefreshCw,
  Search,
  Sun,
  Upload,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useDashboardStore } from "@/store/dashboard";
import { useShell, toast } from "@/store/shell";
import { useTheme } from "@/lib/theme";
import { API_BASE } from "@/lib/api";
import { FLOAT, KBD } from "@/lib/ui";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { cn } from "@/lib/utils";
import type { Customer } from "@/types";
import { ALL_ROUTES } from "./nav";

type Group = "Actions" | "Pages" | "Customers";
interface Item {
  key: string;
  group: Group;
  label: string;
  hint?: string;
  icon: LucideIcon;
  run: () => void;
}

/** Customer search hits the API directly, debounced, without touching shared store state. */
function useCustomerSearch(query: string) {
  const token = useAuthStore((s) => s.token);
  const [results, setResults] = useState<Customer[]>([]);
  useEffect(() => {
    const q = query.trim();
    if (!token || q.length < 2) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      fetch(`${API_BASE}/api/customers?limit=6&search=${encodeURIComponent(q)}`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      })
        .then((res) => (res.ok ? res.json() : { customers: [] }))
        .then((data) => setResults(data.customers ?? []))
        .catch(() => {});
    }, 160);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, token]);
  return results;
}

function Palette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const onKeyDown = useFocusTrap(ref, onClose, { initial: inputRef });
  const id = useId();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);
  const { collapsed, setCollapsed } = useShell();
  const { resolved, setPreference } = useTheme();
  const atRisk = useDashboardStore((s) => s.atRiskCustomers);
  const fetchDashboard = useDashboardStore((s) => s.fetchDashboard);
  const found = useCustomerSearch(q);

  const go = (path: string) => {
    onClose();
    router.push(path);
  };

  const results = useMemo<Item[]>(() => {
    const query = q.trim().toLowerCase();
    const match = (s: string) => !query || s.toLowerCase().includes(query);

    const actions: Item[] = [
      {
        key: "rescore",
        group: "Actions" as const,
        label: "Re-score every customer",
        icon: RefreshCw,
        run: () => {
          onClose();
          if (!token) return;
          toast({ message: "Scoring customers…", tone: "neutral", icon: RefreshCw });
          fetch(`${API_BASE}/api/predictions/batch`, { method: "POST", headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
              if (!res.ok) throw new Error();
              toast({ message: "Scores refreshed", detail: "Every account was re-scored against the model." });
              void fetchDashboard();
            })
            .catch(() => toast({ message: "Could not re-score", detail: "Is the API reachable?", tone: "error" }));
        },
      },
      { key: "import", group: "Actions" as const, label: "Import a CSV", icon: Upload, run: () => go("/import") },
      {
        key: "theme",
        group: "Actions" as const,
        label: resolved === "dark" ? "Switch to light theme" : "Switch to dark theme",
        icon: resolved === "dark" ? Sun : Moon,
        run: () => {
          onClose();
          setPreference(resolved === "dark" ? "light" : "dark");
        },
      },
      {
        key: "sidebar",
        group: "Actions" as const,
        label: collapsed ? "Expand sidebar" : "Collapse sidebar",
        icon: PanelLeft,
        run: () => {
          onClose();
          setCollapsed(!collapsed);
        },
      },
      {
        key: "logout",
        group: "Actions" as const,
        label: "Sign out",
        icon: LogOut,
        run: () => {
          onClose();
          logout();
          router.replace("/login");
        },
      },
    ].filter((a) => match(a.label));

    const pages: Item[] = ALL_ROUTES.filter((r) => match(`${r.label} ${r.keywords ?? ""}`)).map((r) => ({
      key: `page-${r.path}`,
      group: "Pages" as const,
      label: r.label,
      icon: r.icon,
      run: () => go(r.path),
    }));

    // With no query, suggest the accounts most worth opening; with one, search everyone.
    const pool = query ? found : atRisk.slice(0, 5);
    const customers: Item[] = pool.map((c) => ({
      key: `cust-${c.id}`,
      group: "Customers" as const,
      label: c.company || c.name,
      hint: `${Math.round(c.churnRisk * 100)}% risk · $${Math.round(c.mrr).toLocaleString()}/mo`,
      icon: UserRound,
      run: () => go(`/customers?focus=${c.id}`),
    }));

    return query ? [...customers, ...pages, ...actions] : [...actions.slice(0, 2), ...pages, ...customers];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, found, atRisk, collapsed, resolved, token]);

  const current = Math.min(active, Math.max(0, results.length - 1));

  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-index="${current}"]`);
    if (!list || !el) return;
    if (el.offsetTop < list.scrollTop) list.scrollTop = el.offsetTop - 28;
    else if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight)
      list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight + 4;
  }, [current]);

  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!results.length) return;
      setActive((current + (e.key === "ArrowDown" ? 1 : -1) + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[current]?.run();
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-3 pt-[14vh]">
      <div aria-hidden className="absolute inset-0 bg-black/25 dark:bg-black/55" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Search or jump to"
        onKeyDown={onKeyDown}
        className={cn(FLOAT, "relative flex max-h-[min(460px,calc(100vh-120px))] w-full max-w-[560px] flex-col overflow-hidden")}
      >
        <div className="flex h-12 shrink-0 items-center gap-2.5 border-b border-border px-3.5">
          <Search aria-hidden className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls={`${id}-list`}
            aria-activedescendant={results.length ? `${id}-opt-${current}` : undefined}
            aria-autocomplete="list"
            aria-label="Search pages, customers and actions"
            placeholder="Search pages, customers and actions…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className={KBD}>esc</kbd>
        </div>
        <div ref={listRef} id={`${id}-list`} role="listbox" aria-label="Results" className="relative min-h-0 flex-1 overflow-y-auto p-1.5">
          {results.length === 0 && (
            <p className="px-3 py-8 text-center text-[13px] text-muted-foreground">
              No results for &ldquo;{q}&rdquo;. Try a page, a company name or an email.
            </p>
          )}
          {results.map((r, i) => {
            const header = i === 0 || results[i - 1].group !== r.group;
            const on = i === current;
            return (
              <div key={r.key} role="presentation">
                {header && (
                  <div role="presentation" className="px-2.5 pb-1 pt-2 text-[12px] text-muted-foreground">
                    {r.group}
                  </div>
                )}
                {/* The highlight tracks the pointer and keys instantly: it is a
                    high-frequency selection, so a fade would trail behind. */}
                <div
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={on}
                  data-index={i}
                  onPointerMove={() => {
                    if (!on) setActive(i);
                  }}
                  onClick={() => r.run()}
                  className={cn(
                    "flex h-9 cursor-pointer select-none items-center gap-2.5 rounded-md px-2.5 text-[13px]",
                    on && "bg-black/[0.055] dark:bg-white/[0.08]"
                  )}
                >
                  <r.icon aria-hidden className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                  <span className="min-w-0 flex-1 truncate text-foreground">{r.label}</span>
                  {r.hint && <span className="shrink-0 truncate text-[12px] tabular-nums text-muted-foreground">{r.hint}</span>}
                  {on && <CornerDownLeft aria-hidden className="size-3.5 shrink-0 text-muted-foreground" />}
                </div>
              </div>
            );
          })}
        </div>
        <div className="hidden h-9 shrink-0 items-center gap-4 border-t border-border px-3.5 text-[12px] text-muted-foreground sm:flex">
          <span className="flex items-center gap-1.5">
            <kbd className={KBD}>
              <ArrowUp aria-hidden className="size-3" />
            </kbd>
            <kbd className={KBD}>
              <ArrowDown aria-hidden className="size-3" />
            </kbd>
            to move
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className={KBD}>
              <CornerDownLeft aria-hidden className="size-3" />
            </kbd>
            to open
          </span>
          <span className="ml-auto tabular-nums">
            {results.length} {results.length === 1 ? "result" : "results"}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * ⌘K / Ctrl+K toggles, "/" opens when you are not typing. No open or close
 * animation on purpose: a palette is summoned many times a day from the
 * keyboard, and any motion there reads as latency.
 */
export function CommandPalette() {
  const { paletteOpen, setPaletteOpen } = useShell();

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = !!target?.closest?.("input, textarea, select, [contenteditable='true']");
      const isK = e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey) && !e.altKey;
      const isSlash = e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey;
      if (!isK && !isSlash) return;
      e.preventDefault();
      setPaletteOpen((open) => (isK ? !open : true));
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [setPaletteOpen]);

  if (!paletteOpen) return null;
  return <Palette onClose={() => setPaletteOpen(false)} />;
}
