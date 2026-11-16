"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

const SWEEP = 270;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function arc(cx: number, cy: number, r: number, start: number, end: number) {
  const [sx, sy] = polar(cx, cy, r, start);
  const [ex, ey] = polar(cx, cy, r, end);
  return `M${sx},${sy}A${r},${r} 0 ${end - start > 180 ? 1 : 0} 1 ${ex},${ey}`;
}

/**
 * A meter, shaped as a 270° ring. The fill carries severity (healthy -> warning
 * -> critical) and the track is a light wash of that same color, so the state
 * reads across the whole ring, not just the filled part.
 */
export function ArcRing({
  value,
  max = 100,
  size = 132,
  stroke = 10,
  color,
  label,
  caption,
}: {
  value: number;
  max?: number;
  size?: number;
  stroke?: number;
  color: string;
  label: string;
  caption?: string;
}) {
  const reduce = useReducedMotion();
  const r = (size - stroke) / 2;
  const c = size / 2;
  const start = -SWEEP / 2;
  const path = arc(c, c, r, start, start + SWEEP);
  const share = Math.min(1, Math.max(0, value / max));

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.round(value)}
    >
      <svg width={size} height={size} aria-hidden className="block">
        <path d={path} fill="none" stroke={color} strokeOpacity={0.16} strokeWidth={stroke} strokeLinecap="round" />
        <motion.path
          key={Math.round(value)}
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          initial={{ pathLength: reduce ? share : 0 }}
          animate={{ pathLength: share }}
          transition={{ duration: reduce ? 0 : 0.9, ease: EASE, delay: 0.1 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[28px] font-semibold leading-none tracking-[-0.02em] text-foreground">{Math.round(value)}</span>
        {caption && <span className="mt-1 text-[11px] text-muted-foreground">{caption}</span>}
      </div>
    </div>
  );
}
