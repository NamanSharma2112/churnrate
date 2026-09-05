"use client";

import Link from "next/link";
import { ChartLineData01Icon, ArrowLeft01Icon } from "hugeicons-react";

export interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    // Body is `overflow-hidden` for the app shell, so own the scroll here.
    <div className="landing-scroll h-screen w-full overflow-y-auto bg-white">
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-2">
            <ChartLineData01Icon
              size={24}
              className="text-teal-600 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-base font-bold tracking-tight text-neutral-900">
              ChurnRate
            </span>
          </Link>
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            <ArrowLeft01Icon
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Back home
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-neutral-400">Last updated {updated}</p>
        <p className="mt-6 text-base leading-relaxed text-neutral-600">
          {intro}
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-relaxed text-neutral-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6">
          <p className="text-sm text-neutral-600">
            Questions about this page? Email{" "}
            <a
              href="mailto:legal@churnrate.fun"
              className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-800"
            >
              legal@churnrate.fun
            </a>
            .
          </p>
        </div>
      </main>

      <footer className="border-t border-neutral-200/80">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 px-6 py-8 sm:flex-row">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} ChurnRate. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-neutral-500">
            <Link href="/privacy" className="transition-colors hover:text-neutral-900">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-neutral-900">
              Terms
            </Link>
            <Link href="/login" className="transition-colors hover:text-neutral-900">
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
