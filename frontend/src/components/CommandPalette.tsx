"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Home01Icon,
  UserGroupIcon,
  ChartLineData01Icon,
  DocumentValidationIcon,
  Alert01Icon,
  CpuSettingsIcon,
  CloudUploadIcon,
  Settings01Icon,
} from "hugeicons-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    []
  );

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <Home01Icon className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/customers"))}>
              <UserGroupIcon className="mr-2 h-4 w-4" />
              <span>Customers</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/analysis"))}>
              <ChartLineData01Icon className="mr-2 h-4 w-4" />
              <span>Churn Analysis</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/reports"))}>
              <DocumentValidationIcon className="mr-2 h-4 w-4" />
              <span>Reports</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/at-risk"))}>
              <Alert01Icon className="mr-2 h-4 w-4" />
              <span>At-Risk</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/models"))}>
              <CpuSettingsIcon className="mr-2 h-4 w-4" />
              <span>ML Models</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
              <Settings01Icon className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/import"))}>
              <CloudUploadIcon className="mr-2 h-4 w-4" />
              <span>Data Import</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
