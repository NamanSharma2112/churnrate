import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-stone-950 text-stone-100 antialiased">
        {children}
      </body>
    </html>
  );
}
