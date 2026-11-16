"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * A value that slides when it changes - the new figure rises in as the old one
 * leaves upward. It does not animate on first render (`initial={false}`): a
 * number simply being there is not news, a number changing is.
 */
export function Num({
  value,
  format,
  className,
}: {
  value: number;
  format?: (value: number) => string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const text = format ? format(value) : String(value);

  return (
    <span className={cn("relative inline-flex overflow-hidden", className)}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={text}
          initial={{ opacity: 0, transform: reduce ? "none" : "translateY(45%)" }}
          animate={{ opacity: 1, transform: "translateY(0%)" }}
          exit={{ opacity: 0, transform: reduce ? "none" : "translateY(-45%)" }}
          transition={{ duration: 0.22, ease: EASE }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
