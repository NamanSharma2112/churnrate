"use client";

import { ArrowDown01Icon, ArrowUp01Icon } from "hugeicons-react";
import { useState } from "react";

export function AccountToggle() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 border-b border-neutral-200 pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 rounded-lg p-2 transition-colors hover:bg-neutral-100"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-neutral-100">
          <img src="https://api.dicebear.com/9.x/notionists/svg?seed=Darius&backgroundColor=fcfcfc" alt="User avatar" className="h-full w-full object-cover" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold text-neutral-800">ChurnRate</p>
          <p className="text-xs text-neutral-500">Pro Plan</p>
        </div>
        {open ? (
          <ArrowUp01Icon className="text-neutral-500" size={16} />
        ) : (
          <ArrowDown01Icon className="text-neutral-500" size={16} />
        )}
      </button>
      {open && (
        <div className="mt-2 space-y-1">
          <button className="w-full rounded px-3 py-1.5 text-left text-sm text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800">
            Account Settings
          </button>
          <button className="w-full rounded px-3 py-1.5 text-left text-sm text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800">
            Switch Workspace
          </button>
        </div>
      )}
    </div>
  );
}
