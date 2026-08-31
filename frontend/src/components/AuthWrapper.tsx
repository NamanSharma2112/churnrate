"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { CommandPalette } from "@/components/CommandPalette";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, init } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isAuthRoute = pathname === "/login" || pathname === "/register";
  // "/" is public: visitors get the landing page, members get the dashboard.
  const isHome = pathname === "/";

  useEffect(() => {
    init();
    setMounted(true);
  }, [init]);

  useEffect(() => {
    if (mounted) {
      if (!isAuthenticated && !isAuthRoute && !isHome) {
        router.push("/login");
      } else if (isAuthenticated && isAuthRoute) {
        router.push("/");
      }
    }
  }, [mounted, isAuthenticated, isAuthRoute, isHome, router]);

  if (!mounted) {
    return <div className="h-screen w-full bg-background" />;
  }

  if (isAuthRoute) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    // Render the landing page full-bleed; every other route is redirecting.
    return isHome ? <>{children}</> : <div className="h-screen w-full bg-background" />;
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
