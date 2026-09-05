"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { AppShell } from "@/components/layout/AppShell";

/** Routes that render their own full-page layout and need no session. */
const PUBLIC_ROUTES = new Set(["/", "/login", "/register"]);
/** Routes that a signed-in user should be redirected away from. */
const AUTH_ROUTES = new Set(["/login", "/register"]);

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, init } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isPublicRoute = PUBLIC_ROUTES.has(pathname ?? "");
  const isAuthRoute = AUTH_ROUTES.has(pathname ?? "");

  useEffect(() => {
    init();
    setMounted(true);
  }, [init]);

  useEffect(() => {
    if (!mounted) return;

    if (!isAuthenticated && !isPublicRoute) {
      router.replace("/login");
    } else if (isAuthenticated && isAuthRoute) {
      router.replace("/dashboard");
    }
  }, [mounted, isAuthenticated, isPublicRoute, isAuthRoute, router]);

  // Until the store has read localStorage we cannot tell signed-in from
  // signed-out, so render nothing rather than flashing the wrong shell.
  if (!mounted) {
    return <div className="min-h-screen w-full bg-background" />;
  }

  if (isPublicRoute) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen w-full bg-background" />;
  }

  return <AppShell>{children}</AppShell>;
}
