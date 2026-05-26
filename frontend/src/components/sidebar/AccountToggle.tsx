"use client";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState } from "react";

export function AccountToggle() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 border-b border-stone-800 pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 rounded-lg p-2 transition-colors hover:bg-stone-800"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-sm font-bold text-white">
          CR
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold text-stone-200">ChurnRate</p>
          <p className="text-xs text-stone-500">Pro Plan</p>
        </div>
        {open ? (
          <FiChevronUp className="text-stone-500" />
        ) : (
          <FiChevronDown className="text-stone-500" />
        )}
      </button>
      {open && (
        <div className="mt-2 space-y-1">
          <button className="w-full rounded px-3 py-1.5 text-left text-sm text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-200">
            Account Settings
          </button>
          <button className="w-full rounded px-3 py-1.5 text-left text-sm text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-200">
            Switch Workspace
          </button>
        </div>
      )}
    </div>
  );
}
