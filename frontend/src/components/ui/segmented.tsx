"use client";

import { useRef, type KeyboardEvent } from "react";
import { motion } from "motion/react";
import { SPRING_PILL } from "@/lib/motion";
import { FOCUS } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { Num } from "./num";

/**
 * Segmented tabs with a sliding active pill (a shared `layoutId`, so the pill
 * travels between options instead of blinking). Arrow keys, Home and End move
 * selection, per the WAI-ARIA tabs pattern.
 */
export function Segmented<K extends string>({
  options,
  value,
  onChange,
  label,
  idBase,
  panelId,
  className,
}: {
  options: { key: K; label: string; count?: number }[];
  value: K;
  onChange: (key: K) => void;
  label: string;
  idBase: string;
  /** When the tabs control a panel, its id; omit for a plain filter. */
  panelId?: string;
  className?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (event: KeyboardEvent, index: number) => {
    let next = -1;
    if (event.key === "ArrowRight") next = (index + 1) % options.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + options.length) % options.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = options.length - 1;
    if (next < 0) return;
    event.preventDefault();
    onChange(options[next].key);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "flex shrink-0 items-center gap-0.5 rounded-lg bg-black/[0.045] p-0.5 dark:bg-white/[0.06]",
        className
      )}
    >
      {options.map((option, index) => {
        const on = option.key === value;
        return (
          <button
            key={option.key}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`${idBase}-${option.key}`}
            aria-selected={on}
            aria-controls={panelId}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(option.key)}
            onKeyDown={(event) => onKey(event, index)}
            className={cn(
              "relative h-7 select-none rounded-md px-2.5 text-[12px] font-medium transition-colors duration-150",
              FOCUS,
              on ? "text-foreground" : "text-muted-foreground pointer-fine:hover:text-foreground"
            )}
          >
            {on && (
              <motion.span
                layoutId={`${idBase}-pill`}
                aria-hidden
                className="absolute inset-0 rounded-md bg-card ring-1 ring-black/[0.07] dark:bg-[#2a2a2d] dark:ring-white/[0.06]"
                transition={SPRING_PILL}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {option.label}
              {option.count !== undefined && (
                <span className="tabular-nums text-muted-foreground">
                  <Num value={option.count} />
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
