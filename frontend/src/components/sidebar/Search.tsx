"use client";

import { FiSearch } from "react-icons/fi";

export function Search() {
  return (
    <div className="relative mb-4">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
      <input
        type="text"
        placeholder="Search customers..."
        className="w-full rounded-lg border border-stone-700 bg-stone-800 py-2 pl-9 pr-3 text-sm text-stone-200 placeholder-stone-500 outline-none transition-colors focus:border-indigo-500"
      />
    </div>
  );
}
