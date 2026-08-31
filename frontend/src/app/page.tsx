"use client";

import { Dashboard } from "@/components/dashboard/Dashboard";
import { LandingPage } from "@/components/landing/LandingPage";
import { useAuthStore } from "@/store/auth";

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  // AuthWrapper has already resolved the stored session by the time this
  // renders, so "/" is the marketing page for visitors and the app for members.
  return isAuthenticated ? <Dashboard /> : <LandingPage />;
}
