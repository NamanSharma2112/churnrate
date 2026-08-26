"use client";

import { Search01Icon } from "hugeicons-react";

/**
 * Opens the command palette rather than pretending to be a second search input —
 * the palette is where search actually happens.
 */
export function Search() {
  const openPalette = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })
    );
  };

  return (
    <button
      type="button"
      onClick={openPalette}
      className="flex w-full shrink-0 items-center gap-2 rounded-lg border border-neutral-200 bg-white py-2 pl-3 pr-2 text-left text-sm text-neutral-400 shadow-sm transition-colors hover:border-neutral-300 hover:text-neutral-600"
    >
      <Search01Icon size={16} />
      <span className="flex-1">Search…</span>
      <kbd className="rounded border border-neutral-200 bg-neutral-100 px-1.5 text-[10px] font-medium text-neutral-500">
        ⌘K
      </kbd>
    </button>
  );
}
