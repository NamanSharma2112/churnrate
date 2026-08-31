"use client";

import { useState } from "react";
import { LandingNav } from "./LandingNav";
import { Hero } from "./Hero";
import { BentoGrid } from "./BentoGrid";
import { HowItWorks, ClosingCTA, LandingFooter } from "./sections";

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  return (
    // The app shell sets `overflow-hidden` on <body>, so the landing page owns
    // its own scroll container rather than scrolling the window.
    <div
      onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 8)}
      className="landing-root landing-scroll relative h-screen w-full overflow-x-hidden overflow-y-auto bg-white"
    >
      {/* Ambient backdrop for the top of the page: a soft teal wash over a
          grid that fades out well before the first section ends. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[760px] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a0a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a0a_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]" />
        <div className="absolute -top-56 left-1/2 h-[380px] w-[900px] -translate-x-1/2 rounded-full bg-teal-300/30 blur-[130px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className="relative z-10">
        <LandingNav scrolled={scrolled} />
        <main>
          <Hero />
          <BentoGrid />
          <HowItWorks />
          <ClosingCTA />
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}
