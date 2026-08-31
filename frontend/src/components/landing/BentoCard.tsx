"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

interface BentoCardProps {
  eyebrow: string;
  title: string;
  description: string;
  /** Animated visual for the cell; receives whether the card is on screen. */
  visual: (inView: boolean) => React.ReactNode;
  /** Accent colour used by the hover spotlight and the eyebrow label. */
  accent?: string;
  /** Stagger, in ms, applied to the reveal animation. */
  delay?: number;
  className?: string;
}

export function BentoCard({
  eyebrow,
  title,
  description,
  visual,
  accent = "#0d9488",
  delay = 0,
  className,
}: BentoCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  // Feed the pointer position to the CSS spotlight as percentages.
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty("--mx", `${x}%`);
    event.currentTarget.style.setProperty("--my", `${y}%`);
  }, []);

  return (
    <div
      ref={ref}
      data-visible={inView}
      onMouseMove={handleMouseMove}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--spot": accent,
        } as React.CSSProperties
      }
      className={cn(
        "landing-reveal landing-spotlight group relative flex flex-col overflow-hidden",
        "rounded-2xl border border-neutral-200 bg-white p-6",
        "shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
        "transition-[transform,box-shadow,border-color] duration-500 ease-out",
        "hover:-translate-y-1 hover:border-neutral-300",
        "hover:shadow-[0_18px_40px_-18px_rgba(15,23,42,0.22)]",
        className
      )}
    >
      <div className="relative z-10 flex flex-col">
        <span
          className="text-[11px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: accent }}
        >
          {eyebrow}
        </span>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-neutral-900">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
          {description}
        </p>
      </div>

      <div className="relative z-10 mt-6 flex-1">{visual(inView)}</div>
    </div>
  );
}
