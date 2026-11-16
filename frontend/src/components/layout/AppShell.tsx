"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { Menu, Search } from "lucide-react";
import { Sidebar, ThemeToggleButton } from "@/components/shell/Sidebar";
import { CommandPalette } from "@/components/shell/CommandPalette";
import { Toaster } from "@/components/shell/Toaster";
import { routeFor } from "@/components/shell/nav";
import { useAuthStore } from "@/store/auth";
import { useShell } from "@/store/shell";
import { useTheme } from "@/lib/theme";
import { EASE, EASE_DRAWER } from "@/lib/motion";
import { FOCUS, ICON_BTN, KBD, PRESS } from "@/lib/ui";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { cn } from "@/lib/utils";

const RAIL = 56;
const WIDE = 240;

function Drawer({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const onKeyDown = useFocusTrap(ref, onClose);
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-black/30 dark:bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        onKeyDown={onKeyDown}
        initial={{ opacity: reduce ? 0 : 1, transform: reduce ? "none" : "translateX(-100%)" }}
        animate={{ opacity: 1, transform: "translateX(0%)" }}
        exit={{
          opacity: reduce ? 0 : 1,
          transform: reduce ? "none" : "translateX(-100%)",
          transition: { duration: 0.2, ease: EASE_DRAWER },
        }}
        transition={{ duration: 0.28, ease: EASE_DRAWER }}
        className="absolute inset-y-0 left-0 w-[272px] max-w-[86%] border-r border-border bg-sidebar shadow-[8px_0_32px_-12px_rgba(0,0,0,0.25)]"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Application chrome for signed-in routes: a calm, dense workspace layout.
 * The sidebar collapses to an icon rail on desktop and becomes a drawer below
 * `lg`; the palette (⌘K or /) and toasts are mounted once here.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const fetchProfile = useAuthStore((s) => s.fetchProfile);
  const tenant = useAuthStore((s) => s.tenant);
  const { collapsed, initShell, setPaletteOpen } = useShell();
  const initTheme = useTheme((s) => s.init);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => initTheme(), [initTheme]);
  useEffect(() => initShell(), [initShell]);
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  // Navigating always dismisses the drawer.
  useEffect(() => setDrawer(false), [pathname]);

  const current = routeFor(pathname);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen w-full bg-background text-[13px] leading-5 text-foreground">
        {/* Inline sidebar */}
        <motion.aside
          aria-label="Sidebar"
          initial={false}
          animate={{ width: collapsed ? RAIL : WIDE }}
          transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
          className="sticky top-0 hidden h-screen shrink-0 overflow-hidden border-r border-sidebar-border bg-sidebar lg:block"
        >
          <div className="h-full" style={{ width: collapsed ? RAIL : WIDE }}>
            <Sidebar variant="inline" rail={collapsed} />
          </div>
        </motion.aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <header className="sticky top-0 z-30 flex h-12 shrink-0 items-center gap-2 border-b border-border bg-background/85 px-3 backdrop-blur-md sm:px-5">
            <button
              type="button"
              aria-label="Open navigation"
              aria-expanded={drawer}
              onClick={() => setDrawer(true)}
              className={cn(ICON_BTN, "lg:hidden")}
            >
              <Menu aria-hidden className="size-4" />
            </button>
            <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
              <ol className="flex min-w-0 items-center gap-1.5 text-[13px]">
                <li className="hidden shrink-0 items-center gap-2 text-subtle sm:flex">
                  <span className="flex size-[18px] items-center justify-center rounded bg-foreground text-[10px] font-semibold text-background">
                    {(tenant?.name ?? "W").trim().charAt(0).toUpperCase()}
                  </span>
                  <span className="max-w-[180px] truncate">{tenant?.name ?? "Workspace"}</span>
                </li>
                <li className="flex min-w-0 items-center gap-1.5">
                  <span aria-hidden className="hidden text-muted-foreground sm:inline">
                    /
                  </span>
                  <span aria-current="page" className="truncate font-medium text-foreground">
                    {current?.label ?? "ChurnRate"}
                  </span>
                </li>
              </ol>
            </nav>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-keyshortcuts="Meta+K Control+K /"
              onClick={() => setPaletteOpen(true)}
              className={cn(
                "flex h-8 shrink-0 items-center gap-2 rounded-md border border-border bg-card px-2 text-[13px] text-muted-foreground",
                PRESS,
                FOCUS,
                "pointer-fine:hover:border-input",
                "w-8 justify-center xl:w-[240px] xl:justify-start xl:px-2.5"
              )}
            >
              <Search aria-hidden className="size-4 shrink-0" />
              <span className="sr-only xl:not-sr-only xl:flex-1 xl:text-left">Search or jump to…</span>
              <span className="hidden xl:flex">
                <kbd className={KBD}>⌘K</kbd>
              </span>
            </button>
            <ThemeToggleButton />
          </header>

          <main className="min-w-0 flex-1">{children}</main>
        </div>

        <AnimatePresence>
          {drawer && (
            <Drawer key="drawer" onClose={() => setDrawer(false)}>
              <Sidebar variant="drawer" rail={false} onClose={() => setDrawer(false)} onNavigate={() => setDrawer(false)} />
            </Drawer>
          )}
        </AnimatePresence>

        <CommandPalette />
        <Toaster />
      </div>
    </MotionConfig>
  );
}

