"use client";

import { Search01Icon } from "hugeicons-react";

export function Search() {
  return (
    <div className="relative mb-4">
      <Search01Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
      <input
        type="text"
        placeholder="Search customers..."
        className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-9 pr-3 text-sm text-neutral-800 placeholder-neutral-400 outline-none transition-colors focus:border-indigo-500 shadow-sm"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] font-medium text-neutral-400 bg-neutral-100 px-1.5 rounded border border-neutral-200">
        Ctrl+K
      </div>
    </div>
  );
}
