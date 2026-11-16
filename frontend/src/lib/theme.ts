import { create } from "zustand";

export type ThemePreference = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

/**
 * Runs inline in <head>, before first paint, so a dark-mode user never sees a
 * white flash while React boots. Kept tiny and dependency-free on purpose.
 */
export const themeBootScript = `(function(){try{var p=localStorage.getItem("${STORAGE_KEY}")||"system";var d=p==="dark"||(p==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

function systemPrefersDark() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function apply(preference: ThemePreference) {
  const dark = preference === "dark" || (preference === "system" && systemPrefersDark());
  document.documentElement.classList.toggle("dark", dark);
  return dark;
}

interface ThemeState {
  preference: ThemePreference;
  resolved: "light" | "dark";
  /** Reads the stored preference and starts following the OS when on "system". */
  init: () => () => void;
  setPreference: (preference: ThemePreference) => void;
}

export const useTheme = create<ThemeState>((set, get) => ({
  preference: "system",
  resolved: "light",

  init: () => {
    let stored: ThemePreference = "system";
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === "light" || raw === "dark" || raw === "system") stored = raw;
    } catch {
      // Storage blocked (private mode): fall back to the OS setting.
    }
    set({ preference: stored, resolved: apply(stored) ? "dark" : "light" });

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (get().preference === "system") set({ resolved: apply("system") ? "dark" : "light" });
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  },

  setPreference: (preference) => {
    try {
      localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      // Not persisted, but still applied for this visit.
    }
    set({ preference, resolved: apply(preference) ? "dark" : "light" });
  },
}));
