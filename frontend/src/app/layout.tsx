import type { Metadata } from "next";
import { AuthWrapper } from "@/components/AuthWrapper";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ChurnRate — Predict customer churn before it happens",
  description:
    "Import customer data from any source, get ML-powered churn predictions, and act on at-risk accounts before they leave.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      {/*
        The shell used to be `flex h-screen overflow-hidden`, which clipped any
        page taller than the viewport with no way to scroll to the rest.
      */}
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AuthWrapper>{children}</AuthWrapper>
      </body>
    </html>
  );
}
