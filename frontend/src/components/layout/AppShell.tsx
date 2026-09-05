"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu01Icon, Cancel01Icon } from "hugeicons-react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { CommandPalette } from "@/components/CommandPalette";
import { Logo } from "@/components/brand/Logo";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";

/**
 * Application chrome for signed-in routes.
 *
 * The sidebar is a fixed 260px column on desktop and an overlay drawer below
 * `lg`. Previously it was always rendered inline, which left roughly 130px of
 * usable width on a phone and clipped every page.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { fetchProfile } = useAuthStore();

  // Navigating should always dismiss the drawer.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Prevent the page behind the drawer from scrolling while it is open.
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop rail */}
      <div className="hidden shrink-0 lg:block">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          drawerOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!drawerOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-neutral-900/40 transition-opacity duration-200",
            drawerOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setDrawerOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-[280px] max-w-[85vw] transition-transform duration-200 ease-out",
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
        >
          <Sidebar onNavigate={() => setDrawerOpen(false)} />
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation"
            className="absolute right-3 top-3 rounded-lg p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            <Cancel01Icon size={18} />
          </button>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header — the only way to reach navigation below `lg`. */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-neutral-200 bg-white/90 px-4 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
            className="rounded-lg p-1.5 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            <Menu01Icon size={20} />
          </button>
          <Logo href="/dashboard" />
        </header>

        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <CommandPalette />
    </div>
  );
}
