"use client";

import { useEffect, useRef, type KeyboardEvent, type RefObject } from "react";
import { useIsPresent } from "motion/react";

const FOCUSABLE =
  'button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Focus management for dialogs, menus and popovers: focuses the first field,
 * keeps Tab inside, closes on Escape or an outside press, and returns focus to
 * whatever opened it. Returns the keydown handler to put on the layer.
 *
 * `trigger` names the `data-trigger` of the opening button, so pressing it
 * again toggles the layer closed rather than closing-then-reopening.
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  onClose: () => void,
  opts: { initial?: RefObject<HTMLElement | null>; trigger?: string } = {}
) {
  const present = useIsPresent();
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  });
  const { initial, trigger } = opts;

  useEffect(() => {
    if (!present) return;
    const node = ref.current;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const first = initial?.current ?? node?.querySelector<HTMLElement>(FOCUSABLE) ?? node;
    first?.focus({ preventScroll: true });

    const onDown = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!node || !target || node.contains(target)) return;
      if (trigger && target.closest(`[data-trigger="${trigger}"]`)) return;
      close.current();
    };
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      const active = document.activeElement;
      if (previous?.isConnected && (!active || active === document.body || node?.contains(active))) {
        previous.focus({ preventScroll: true });
      }
    };
  }, [present, ref, initial, trigger]);

  return (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      close.current();
      return;
    }
    if (event.key !== "Tab" || !ref.current) return;
    const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => el.getClientRects().length > 0
    );
    if (items.length === 0) {
      event.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
}

/** Arrow-key movement between the items of a role="menu". */
export function onMenuKeys(event: KeyboardEvent<HTMLElement>) {
  if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role^="menuitem"]'));
  const index = items.indexOf(document.activeElement as HTMLElement);
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? items.length - 1
        : event.key === "ArrowDown"
          ? (index + 1) % items.length
          : (index - 1 + items.length) % items.length;
  items[next]?.focus();
}
