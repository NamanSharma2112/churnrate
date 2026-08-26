"use client";

import { AccountToggle } from "./AccountToggle";
import { RouteSelect } from "./RouteSelect";
import { Search } from "./Search";
import { Plan } from "./Plan";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full min-h-screen w-[260px] shrink-0 flex-col gap-4 border-r border-neutral-200 bg-[#FCFCFC] p-4 lg:sticky lg:top-0 lg:h-screen">
      <AccountToggle />
      <Search />
      <RouteSelect onNavigate={onNavigate} />
      <Plan />
    </div>
  );
}
