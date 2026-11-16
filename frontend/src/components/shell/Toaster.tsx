"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CircleAlert, CircleCheck, X } from "lucide-react";
import { useShell, type ToastData } from "@/store/shell";
import { EASE, SPRING } from "@/lib/motion";
import { BTN_GHOST, FLOAT, ICON_BTN } from "@/lib/ui";
import { cn } from "@/lib/utils";

/**
 * Toasts ease in from just below (never from nothing), and the stack reflows
 * with a spring when one leaves. The timer pauses while the pointer or focus is
 * on a toast, so an Undo is never snatched away mid-reach.
 */
function ToastItem({ toast, onDismiss }: { toast: ToastData; onDismiss: (id: number) => void }) {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const remaining = useRef(5000);
  const dismiss = useRef(onDismiss);
  useEffect(() => {
    dismiss.current = onDismiss;
  });

  useEffect(() => {
    if (paused) return;
    const started = Date.now();
    const timer = window.setTimeout(() => dismiss.current(toast.id), remaining.current);
    return () => {
      window.clearTimeout(timer);
      remaining.current = Math.max(1200, remaining.current - (Date.now() - started));
    };
  }, [paused, toast.id]);

  const Icon = toast.icon ?? (toast.tone === "error" ? CircleAlert : CircleCheck);
  const iconTone =
    toast.tone === "error" ? "text-destructive" : toast.tone === "neutral" ? "text-muted-foreground" : "text-success";

  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, transform: reduce ? "none" : "translateY(10px) scale(0.98)" }}
      animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
      exit={{ opacity: 0, transform: reduce ? "none" : "scale(0.97)", transition: { duration: 0.14, ease: EASE } }}
      transition={{ duration: 0.24, ease: EASE, layout: SPRING }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className={cn(FLOAT, "pointer-events-auto flex items-center gap-2.5 py-2 pl-3 pr-1.5")}
    >
      <Icon aria-hidden className={cn("size-4 shrink-0", iconTone)} strokeWidth={1.9} />
      <p className="min-w-0 flex-1 text-[13px] leading-[18px]">
        <span className="font-medium text-foreground">{toast.message}</span>
        {toast.detail && <span className="block truncate text-[12px] text-muted-foreground">{toast.detail}</span>}
      </p>
      {toast.action && (
        <button
          type="button"
          onClick={() => {
            toast.action?.run();
            onDismiss(toast.id);
          }}
          className={cn(BTN_GHOST, "h-7 px-2 text-[12px] text-foreground")}
        >
          {toast.action.label}
        </button>
      )}
      <button type="button" aria-label="Dismiss notification" onClick={() => onDismiss(toast.id)} className={ICON_BTN}>
        <X aria-hidden className="size-3.5" />
      </button>
    </motion.li>
  );
}

export function Toaster() {
  const { toasts, dismissToast } = useShell();
  return (
    <ol
      aria-live="polite"
      aria-label="Notifications"
      className="pointer-events-none fixed bottom-4 right-4 z-[80] flex w-[min(340px,calc(100vw-32px))] flex-col gap-2"
    >
      <AnimatePresence initial={false} mode="popLayout">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismissToast} />
        ))}
      </AnimatePresence>
    </ol>
  );
}
