import { create } from "zustand";
import type { LucideIcon } from "lucide-react";

export interface ToastData {
  id: number;
  message: string;
  detail?: string;
  icon?: LucideIcon;
  tone?: "success" | "neutral" | "error";
  action?: { label: string; run: () => void };
}

interface ShellState {
  collapsed: boolean;
  paletteOpen: boolean;
  toasts: ToastData[];
  initShell: () => void;
  setCollapsed: (collapsed: boolean) => void;
  setPaletteOpen: (open: boolean | ((open: boolean) => boolean)) => void;
  toast: (toast: Omit<ToastData, "id">) => void;
  dismissToast: (id: number) => void;
}

const COLLAPSED_KEY = "sidebar-collapsed";
let toastSeq = 0;

export const useShell = create<ShellState>((set) => ({
  collapsed: false,
  paletteOpen: false,
  toasts: [],

  initShell: () => {
    try {
      set({ collapsed: localStorage.getItem(COLLAPSED_KEY) === "1" });
    } catch {
      // Storage blocked: start expanded.
    }
  },

  setCollapsed: (collapsed) => {
    try {
      localStorage.setItem(COLLAPSED_KEY, collapsed ? "1" : "0");
    } catch {
      // Not persisted; still applied.
    }
    set({ collapsed });
  },

  setPaletteOpen: (open) =>
    set((state) => ({ paletteOpen: typeof open === "function" ? open(state.paletteOpen) : open })),

  // At most three on screen: the oldest makes room rather than the stack growing.
  toast: (toast) => {
    toastSeq += 1;
    const id = toastSeq;
    set((state) => ({ toasts: [...state.toasts.slice(-2), { ...toast, id }] }));
  },

  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

/** Shorthand for components that only raise toasts. */
export const toast = (t: Omit<ToastData, "id">) => useShell.getState().toast(t);
