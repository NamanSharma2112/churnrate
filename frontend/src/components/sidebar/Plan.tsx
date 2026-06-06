"use client";

import { ZapIcon } from "hugeicons-react";

export function Plan() {
  return (
    <div className="mt-4 rounded-lg border border-neutral-200 bg-[#FCFCFC] p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <ZapIcon className="text-yellow-500" size={16} />
        <span className="text-sm font-semibold text-neutral-800">Pro Plan</span>
      </div>
      <p className="mb-3 text-xs text-neutral-500">
        10,847 / 15,000 customers tracked
      </p>
      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-indigo-600"
          style={{ width: "72%" }}
        />
      </div>
      <button className="w-full rounded-lg bg-neutral-900 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800">
        Upgrade Plan
      </button>
    </div>
  );
}
