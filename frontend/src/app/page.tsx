import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "ChurnRate — Predict customer churn before it happens",
  description:
    "Connect Stripe or upload any customer export. ChurnRate maps your columns automatically, scores every account, and tells you who is about to leave.",
};

export default function Home() {
  return <LandingPage />;
}
