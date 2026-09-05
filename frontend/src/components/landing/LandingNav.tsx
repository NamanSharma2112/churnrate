"use client";

import Link from "next/link";
import { ChartLineData01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how" },
];

export function LandingNav({ scrolled }: { scrolled: boolean }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-neutral-200/80 bg-white/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300",
          scrolled ? "h-14" : "h-18"
        )}
      >
        <Link href="/" className="group flex items-center gap-2">
          <ChartLineData01Icon
            size={26}
            className="text-teal-600 transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-lg font-bold tracking-tight text-neutral-900">
            ChurnRate
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative px-3 py-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
            >
              <span className="relative">
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-teal-600 transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="landing-shine rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-neutral-800 active:translate-y-px"
          >
            Start free
          </Link>
        </div>
      </nav>
    </header>
  );
}
