"use client";

import { useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { labelIndices, niceMax, useWidth } from "./core";

export interface DivergingRow {
  label: string;
  pos: number;
  neg: number;
}

const M = { top: 8, right: 8, bottom: 24, left: 46 };

/** A column with a 4px rounded data-end and a square foot on the baseline. */
function bar(x: number, w: number, base: number, end: number) {
  const r = Math.min(4, Math.abs(end - base), w / 2);
  if (Math.abs(end - base) < 0.5) return "";
  if (end < base) {
    return `M${x},${base}V${end + r}Q${x},${end} ${x + r},${end}H${x + w - r}Q${x + w},${end} ${x + w},${end + r}V${base}Z`;
  }
  return `M${x},${base}V${end - r}Q${x},${end} ${x + r},${end}H${x + w - r}Q${x + w},${end} ${x + w},${end - r}V${base}Z`;
}

/**
 * Gains above zero, losses below, one shared scale. This replaces plotting new
 * and churned revenue on the MRR axis, where a few hundred dollars against
 * fifteen thousand flattened both into the floor.
 *
 * Columns grow from the zero line in a quick left-to-right sweep. Hovering a
 * month lifts it and dims the rest; the tooltip carries both values and the net.
 */
export function DivergingBars({
  data,
  posLabel,
  negLabel,
  format,
  height = 200,
  ariaLabel,
}: {
  data: DivergingRow[];
  posLabel: string;
  negLabel: string;
  format: (value: number) => string;
  height?: number;
  ariaLabel: string;
}) {
  const reduce = useReducedMotion();
  const [wrapRef, width] = useWidth<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);

  const n = data.length;
  const plotW = Math.max(0, width - M.left - M.right);
  const plotH = height - M.top - M.bottom;
  const max = niceMax(Math.max(1, ...data.map((d) => Math.max(d.pos, d.neg))));
  const zero = M.top + plotH / 2;
  const y = (v: number) => zero - (v / max) * (plotH / 2);
  const slot = n ? plotW / n : 0;
  const barW = Math.max(2, Math.min(24, slot * 0.56));
  const cx = (i: number) => M.left + slot * i + slot / 2;
  const shown = labelIndices(n, Math.max(2, Math.floor(plotW / 56)));
  const key = data.map((d) => `${d.label}:${d.pos}:${d.neg}`).join("|");

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!n) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const start = active ?? n - 1;
      setActive(Math.min(n - 1, Math.max(0, start + (event.key === "ArrowRight" ? 1 : -1))));
    } else if (event.key === "Escape") setActive(null);
  };

  const tipX = active !== null ? cx(active) : 0;
  const flip = tipX > width - 180;

  return (
    <div
      ref={wrapRef}
      className="relative w-full rounded-md outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      style={{ height }}
      tabIndex={n ? 0 : -1}
      role="group"
      aria-label={`${ariaLabel}. Use the left and right arrow keys to read values.`}
      onKeyDown={onKeyDown}
      onFocus={(e) => {
        if (e.currentTarget.matches(":focus-visible") && active === null && n) setActive(n - 1);
      }}
      onBlur={() => setActive(null)}
    >
      {width > 0 && (
        <svg width={width} height={height} className="block overflow-visible" aria-hidden>
          {[max, max / 2, 0, -max / 2, -max].map((t) => (
            <g key={t}>
              <line
                x1={M.left}
                x2={M.left + plotW}
                y1={y(t)}
                y2={y(t)}
                stroke={t === 0 ? "var(--chart-axis)" : "var(--chart-grid)"}
                strokeOpacity={t === 0 ? 0.45 : 1}
                strokeWidth={1}
              />
              <text x={M.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-[var(--chart-axis)] text-[11px] tabular-nums">
                {t > 0 ? `+${format(t)}` : t < 0 ? `-${format(-t)}` : format(0)}
              </text>
            </g>
          ))}
          {shown.map((i) => (
            <text key={i} x={cx(i)} y={height - 6} textAnchor="middle" className="fill-[var(--chart-axis)] text-[11px]">
              {data[i].label}
            </text>
          ))}

          {data.map((d, i) => {
            const x = cx(i) - barW / 2;
            const dim = active !== null && active !== i;
            return (
              <motion.g
                key={`${key}-${i}`}
                initial={{ scaleY: reduce ? 1 : 0, opacity: reduce ? 0 : 1, transformOrigin: `${cx(i)}px ${zero}px` }}
                animate={{ scaleY: 1, opacity: dim ? 0.38 : 1 }}
                transition={{
                  scaleY: { duration: 0.55, ease: EASE, delay: reduce ? 0 : 0.05 + i * 0.022 },
                  opacity: { duration: 0.15 },
                }}
                style={{ transformBox: "view-box" }}
              >
                <path d={bar(x, barW, zero, y(d.pos))} fill="var(--div-pos)" />
                <path d={bar(x, barW, zero, y(-d.neg))} fill="var(--div-neg)" />
              </motion.g>
            );
          })}

          {/* Each column is its own hit target, wider than the painted bar. */}
          {data.map((d, i) => (
            <rect
              key={`hit-${i}`}
              x={M.left + slot * i}
              y={M.top}
              width={slot}
              height={plotH}
              fill="transparent"
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive((cur) => (cur === i ? null : cur))}
            />
          ))}
        </svg>
      )}

      {active !== null && width > 0 && (
        <div
          className="pointer-events-none absolute top-0 z-10 min-w-[150px] rounded-lg border border-border bg-popover px-2.5 py-2 text-[12px] shadow-float"
          style={flip ? { right: width - tipX + 14 } : { left: tipX + 14 }}
        >
          <p className="mb-1 text-[11px] text-muted-foreground">{data[active].label}</p>
          <Row color="var(--div-pos)" value={`+${format(data[active].pos)}`} label={posLabel} />
          <Row color="var(--div-neg)" value={`-${format(data[active].neg)}`} label={negLabel} />
          <div className="mt-1 border-t border-border pt-1 text-muted-foreground">
            Net{" "}
            <span className="font-semibold tabular-nums text-foreground">
              {data[active].pos - data[active].neg >= 0 ? "+" : "-"}
              {format(Math.abs(data[active].pos - data[active].neg))}
            </span>
          </div>
        </div>
      )}

      <table className="sr-only">
        <caption>{ariaLabel}</caption>
        <thead>
          <tr>
            <th scope="col">Period</th>
            <th scope="col">{posLabel}</th>
            <th scope="col">{negLabel}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.label}>
              <th scope="row">{d.label}</th>
              <td>{format(d.pos)}</td>
              <td>{format(d.neg)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Row({ color, value, label }: { color: string; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 py-0.5">
      <span aria-hidden className="size-2 shrink-0 rounded-[2px]" style={{ background: color }} />
      <span className="font-semibold tabular-nums text-foreground">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
