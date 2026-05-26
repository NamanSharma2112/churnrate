"use client";

import { FiZap } from "react-icons/fi";

export function Plan() {
  return (
    <div className="mt-4 rounded-lg border border-stone-800 bg-stone-800/50 p-3">
      <div className="mb-2 flex items-center gap-2">
        <FiZap className="text-yellow-400" />
        <span className="text-sm font-semibold text-stone-200">Pro Plan</span>
      </div>
      <p className="mb-3 text-xs text-stone-500">
        10,847 / 15,000 customers tracked
      </p>
      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-stone-700">
        <div
          className="h-full rounded-full bg-indigo-500"
          style={{ width: "72%" }}
        />
      </div>
      <button className="w-full rounded-lg bg-indigo-600 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-700">
        Upgrade Plan
      </button>
    </div>
  );
}
