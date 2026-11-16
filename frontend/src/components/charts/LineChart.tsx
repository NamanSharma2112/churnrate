"use client";

import { useId, useMemo, useState, type KeyboardEvent, type PointerEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { labelIndices, monotonePath, niceMax, ticks, useWidth } from "./core";

export interface LineSeries {
  key: string;
  label: string;
  /** A CSS color, normally one of the `var(--series-n)` tokens. */
  color: string;
  area?: boolean;
  /** For forecast/predicted series - paired with a dashed key in the legend. */
  dashed?: boolean;
}

type Row = Record<string, string | number>;

const M = { top: 10, right: 12, bottom: 24, left: 46 };

/**
 * Line / area chart with a snapping crosshair.
 *
 * - Marks: 2px lines, a 10% area wash, end markers with a 2px surface ring.
 * - Reveal: one left-to-right wipe when the data arrives (a clip, so dashed
 *   series draw in too). Reduced motion gets a fade instead.
 * - Hover: the crosshair finds the X - readers aim at a month, not a 2px line -
 *   and one tooltip lists every series there. Arrow keys do the same.
 */
export function LineChart({
  data,
  xKey,
  series,
  height = 240,
  format,
  tickFormat,
  ariaLabel,
  onActiveChange,
}: {
  data: Row[];
  xKey: string;
  series: LineSeries[];
  height?: number;
  format: (value: number) => string;
  tickFormat?: (value: number) => string;
  ariaLabel: string;
  onActiveChange?: (index: number | null) => void;
}) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const [wrapRef, width] = useWidth<HTMLDivElement>();
  const [active, setActiveState] = useState<number | null>(null);

  const setActive = (index: number | null) => {
    setActiveState(index);
    onActiveChange?.(index);
  };

  const n = data.length;
  const plotW = Math.max(0, width - M.left - M.right);
  const plotH = height - M.top - M.bottom;

  const geometry = useMemo(() => {
    const values = data.flatMap((row) => series.map((s) => Number(row[s.key]) || 0));
    const yMax = niceMax(Math.max(...values, 0) * 1.08);
    const x = (i: number) => M.left + (n === 1 ? plotW / 2 : (i * plotW) / Math.max(1, n - 1));
    const y = (v: number) => M.top + plotH - (v / yMax) * plotH;
    const lines = series.map((s) => {
      const points = data.map((row, i) => [x(i), y(Number(row[s.key]) || 0)] as [number, number]);
      const line = monotonePath(points);
      const base = M.top + plotH;
      const area = points.length ? `${line}L${points[points.length - 1][0]},${base}L${points[0][0]},${base}Z` : "";
      return { series: s, points, line, area };
    });
    return { yMax, x, y, lines };
  }, [data, series, n, plotW, plotH]);

  // Redraw when the data itself changes (a new range), not on every resize.
  const drawKey = useMemo(
    () => data.map((row) => `${row[xKey]}:${series.map((s) => row[s.key]).join(",")}`).join("|"),
    [data, series, xKey]
  );

  const onPointerMove = (event: PointerEvent<SVGRectElement>) => {
    if (n === 0) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - bounds.left;
    const index = n === 1 ? 0 : Math.round((px / bounds.width) * (n - 1));
    const clamped = Math.min(n - 1, Math.max(0, index));
    if (clamped !== active) setActive(clamped);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (n === 0) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const start = active ?? n - 1;
      setActive(Math.min(n - 1, Math.max(0, start + (event.key === "ArrowRight" ? 1 : -1))));
    } else if (event.key === "Escape") {
      setActive(null);
    }
  };

  const shown = labelIndices(n, Math.max(2, Math.floor(plotW / 64)));
  const tipLeft = active !== null ? geometry.x(active) : 0;
  const flip = tipLeft > width - 190;

  return (
    <div
      ref={wrapRef}
      className="relative w-full rounded-md outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      style={{ height }}
      tabIndex={n ? 0 : -1}
      role="group"
      aria-label={`${ariaLabel}. Use the left and right arrow keys to read values.`}
      onKeyDown={onKeyDown}
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible") && active === null && n) setActive(n - 1);
      }}
      onBlur={() => setActive(null)}
    >
      {width > 0 && (
        <svg width={width} height={height} className="block overflow-visible" aria-hidden>
          <defs>
            <clipPath id={`${uid}-reveal`}>
              <motion.rect
                key={drawKey}
                x={M.left - 6}
                y={0}
                height={height}
                initial={{ width: reduce ? plotW + 12 : 0 }}
                animate={{ width: plotW + 12 }}
                transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
              />
            </clipPath>
            {geometry.lines.map(({ series: s }) => (
              <linearGradient key={s.key} id={`${uid}-fill-${s.key}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity={0.16} />
                <stop offset="100%" stopColor={s.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>

          {/* Recessive grid: hairline, solid, one step off the surface. */}
          {ticks(geometry.yMax).map((t) => (
            <g key={t}>
              <line x1={M.left} x2={M.left + plotW} y1={geometry.y(t)} y2={geometry.y(t)} stroke="var(--chart-grid)" strokeWidth={1} />
              <text
                x={M.left - 8}
                y={geometry.y(t)}
                dy="0.32em"
                textAnchor="end"
                className="fill-[var(--chart-axis)] text-[11px] tabular-nums"
              >
                {(tickFormat ?? format)(t)}
              </text>
            </g>
          ))}
          {shown.map((i) => (
            <text
              key={i}
              x={geometry.x(i)}
              y={height - 6}
              textAnchor={i === 0 && n > 1 ? "start" : i === n - 1 && n > 1 ? "end" : "middle"}
              className="fill-[var(--chart-axis)] text-[11px]"
            >
              {String(data[i][xKey])}
            </text>
          ))}

          <g clipPath={`url(#${uid}-reveal)`}>
            {geometry.lines.map(({ series: s, area }) =>
              s.area ? <path key={`a-${s.key}`} d={area} fill={`url(#${uid}-fill-${s.key})`} /> : null
            )}
            {geometry.lines.map(({ series: s, line }) => (
              <path
                key={`l-${s.key}`}
                d={line}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={s.dashed ? "4 5" : undefined}
              />
            ))}
          </g>

          {/* End markers settle in once the wipe reaches them. */}
          {active === null &&
            geometry.lines.map(({ series: s, points }) =>
              points.length ? (
                <motion.circle
                  key={`${drawKey}-end-${s.key}`}
                  cx={points[points.length - 1][0]}
                  cy={points[points.length - 1][1]}
                  r={4}
                  fill={s.color}
                  stroke="var(--card)"
                  strokeWidth={2}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: reduce ? 0 : 0.8 }}
                />
              ) : null
            )}

          {active !== null && (
            <g>
              <line
                x1={geometry.x(active)}
                x2={geometry.x(active)}
                y1={M.top}
                y2={M.top + plotH}
                stroke="var(--chart-axis)"
                strokeOpacity={0.5}
                strokeWidth={1}
              />
              {geometry.lines.map(({ series: s, points }) => (
                <circle
                  key={s.key}
                  cx={points[active][0]}
                  cy={points[active][1]}
                  r={4.5}
                  fill={s.color}
                  stroke="var(--card)"
                  strokeWidth={2}
                />
              ))}
            </g>
          )}

          {/* Hit layer: the whole plot, so the pointer never has to land on a line. */}
          <rect
            x={M.left}
            y={M.top}
            width={plotW}
            height={plotH}
            fill="transparent"
            onPointerMove={onPointerMove}
            onPointerLeave={() => setActive(null)}
          />
        </svg>
      )}

      {active !== null && width > 0 && (
        <div
          className={cn(
            "pointer-events-none absolute top-1 z-10 min-w-[140px] rounded-lg border border-border bg-popover px-2.5 py-2 text-[12px] shadow-float"
          )}
          style={flip ? { right: width - tipLeft + 12 } : { left: tipLeft + 12 }}
        >
          <p className="mb-1 text-[11px] text-muted-foreground">{String(data[active][xKey])}</p>
          {series.map((s) => (
            <div key={s.key} className="flex items-center gap-2 py-0.5">
              <span
                aria-hidden
                className="h-0.5 w-3 shrink-0 rounded-full"
                style={{
                  background: s.dashed
                    ? `repeating-linear-gradient(90deg, ${s.color} 0 3px, transparent 3px 5px)`
                    : s.color,
                }}
              />
              <span className="font-semibold tabular-nums text-foreground">{format(Number(data[active][s.key]) || 0)}</span>
              <span className="text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Table view: every value, reachable without hovering. */}
      <table className="sr-only">
        <caption>{ariaLabel}</caption>
        <thead>
          <tr>
            <th scope="col">{xKey}</th>
            {series.map((s) => (
              <th key={s.key} scope="col">
                {s.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <th scope="row">{String(row[xKey])}</th>
              {series.map((s) => (
                <td key={s.key}>{format(Number(row[s.key]) || 0)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Legend keys mirror the mark: a short stroke for lines (dashed for forecasts). */
export function LineLegend({ series }: { series: LineSeries[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {series.map((s) => (
        <li key={s.key} className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <span
            aria-hidden
            className="h-0.5 w-3.5 rounded-full"
            style={{
              background: s.dashed ? `repeating-linear-gradient(90deg, ${s.color} 0 3px, transparent 3px 5px)` : s.color,
            }}
          />
          {s.label}
        </li>
      ))}
    </ul>
  );
}
