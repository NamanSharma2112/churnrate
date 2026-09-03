"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { CommandPalette } from "@/components/CommandPalette";

const PUBLIC_ROUTES = new Set(["/", "/privacy", "/terms"]);

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, init } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isAuthRoute = pathname === "/login" || pathname === "/register";
  // Reachable without an account. "/" serves the landing page to visitors and
  // the dashboard to members; the rest render full-bleed for everyone.
  const isPublicRoute = PUBLIC_ROUTES.has(pathname ?? "");

  useEffect(() => {
    init();
    setMounted(true);
  }, [init]);

  useEffect(() => {
    if (mounted) {
      if (!isAuthenticated && !isAuthRoute && !isPublicRoute) {
        router.push("/login");
      } else if (isAuthenticated && isAuthRoute) {
        router.push("/");
      }
    }
  }, [mounted, isAuthenticated, isAuthRoute, isPublicRoute, router]);

  if (!mounted) {
    return <div className="h-screen w-full bg-background" />;
  }

  if (isAuthRoute) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    // Public pages render bare; every other route is mid-redirect.
    return isPublicRoute ? (
      <>{children}</>
    ) : (
      <div className="h-screen w-full bg-background" />
    );
  }

  return (
    <>
      <Sidebar />
      <CommandPalette />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </>
  );
}
