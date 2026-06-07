import type { Metadata } from "next";
import { AuthWrapper } from "@/components/AuthWrapper";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "ChurnRate - Customer Churn Prediction",
  description:
    "AI-powered customer churn prediction and analytics dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className="bg-background text-foreground antialiased flex h-screen overflow-hidden">
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </body>
    </html>
  );
}
