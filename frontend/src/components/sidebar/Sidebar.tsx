"use client";

import { AccountToggle } from "./AccountToggle";
import { RouteSelect } from "./RouteSelect";
import { Search } from "./Search";
import { Plan } from "./Plan";

export function Sidebar() {
  return (
    <div className="sticky top-0 h-screen w-[260px] shrink-0 border-r border-neutral-200 bg-[#FCFCFC] p-4">
      <div className="flex h-full flex-col">
        <AccountToggle />
        <Search />
        <RouteSelect />
        <Plan />
      </div>
    </div>
  );
}
