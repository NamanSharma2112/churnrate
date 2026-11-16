/**
 * Class recipes for the app chrome. Everything is written against theme tokens
 * (see globals.css), so light and dark come from one definition.
 *
 * `pointer-fine:` gates hover so a tap on a touch screen never leaves a
 * control stuck in its hover state.
 */
export const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
export const FOCUS_IN =
  "outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring";
export const HOVER = "pointer-fine:hover:bg-black/[0.04] dark:pointer-fine:hover:bg-white/[0.05]";
export const PRESS =
  "transition-[transform,background-color,border-color,color,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]";

export const CARD = "rounded-[10px] border border-border bg-card";
export const FLOAT = "rounded-[10px] border border-border bg-popover text-popover-foreground shadow-float";

const BTN = `inline-flex h-8 shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 text-[13px] font-medium ${PRESS} ${FOCUS} disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100`;
export const BTN_PRIMARY = `${BTN} bg-brand text-brand-foreground pointer-fine:hover:bg-brand-hover`;
export const BTN_SECONDARY = `${BTN} border border-input bg-card text-foreground pointer-fine:hover:bg-accent`;
export const BTN_GHOST = `${BTN} text-subtle ${HOVER} pointer-fine:hover:text-foreground`;
export const ICON_BTN = `inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground ${HOVER} ${PRESS} ${FOCUS} pointer-fine:hover:text-foreground`;

export const KBD =
  "inline-flex h-[18px] min-w-[18px] items-center justify-center rounded border border-input bg-card px-1 font-sans text-[11px] leading-none text-muted-foreground dark:bg-transparent";

export const FIELD =
  "h-9 w-full rounded-md border border-input bg-card px-2.5 text-[13px] text-foreground outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/20";
