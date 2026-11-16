/**
 * Motion tokens shared by the app shell, dashboard and landing page.
 *
 * Product UI stays under ~300ms with a strong ease-out: entering elements start
 * fast and settle, which reads as responsive. The drawer uses the iOS sheet
 * curve, whose steep start lets it run longer without feeling slow.
 */
export const EASE = [0.23, 1, 0.32, 1] as const;
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;
export const EASE_IN_OUT = [0.645, 0.045, 0.355, 1] as const;

/** UI state swaps: no overshoot, so the dashboard stays calm. */
export const SPRING = { type: "spring", duration: 0.38, bounce: 0.1 } as const;
export const SPRING_PILL = { type: "spring", duration: 0.32, bounce: 0.12 } as const;

/**
 * Popovers and menus scale from their trigger, never from scale(0). Reduced
 * motion keeps the fade (it aids comprehension) and drops the scale.
 */
export function popMotion(reduce: boolean | null) {
  return {
    initial: { opacity: 0, transform: reduce ? "none" : "scale(0.96)" },
    animate: { opacity: 1, transform: "scale(1)" },
    exit: {
      opacity: 0,
      transform: reduce ? "none" : "scale(0.98)",
      transition: { duration: 0.12, ease: EASE },
    },
    transition: { duration: 0.18, ease: EASE },
  };
}
