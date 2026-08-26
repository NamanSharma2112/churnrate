"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown01Icon, ArrowUp01Icon, Logout01Icon, Settings01Icon } from "hugeicons-react";
import { useAuthStore } from "@/store/auth";
import { LogoMark } from "@/components/brand/Logo";

function initials(value: string): string {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function AccountToggle() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, tenant, logout } = useAuthStore();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  // Falls back to the workspace name only until /auth/me resolves.
  const workspaceName = tenant?.name ?? "Workspace";
  const displayName = user?.name ?? workspaceName;
  const planLabel = tenant?.plan
    ? `${tenant.plan.charAt(0).toUpperCase()}${tenant.plan.slice(1)} plan`
    : "Free plan";

  const handleSignOut = () => {
    logout();
    router.replace("/login");
  };

  return (
    <div ref={containerRef} className="relative border-b border-neutral-200 pb-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-neutral-100"
      >
        <LogoMark />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-neutral-900">{workspaceName}</p>
          <p className="truncate text-xs text-neutral-500">{planLabel}</p>
        </div>
        {open ? (
          <ArrowUp01Icon className="shrink-0 text-neutral-400" size={16} />
        ) : (
          <ArrowDown01Icon className="shrink-0 text-neutral-400" size={16} />
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg"
        >
          <div className="flex items-center gap-3 border-b border-neutral-100 px-3 py-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-600">
              {initials(displayName)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-neutral-900">{displayName}</p>
              <p className="truncate text-xs text-neutral-500">{user?.email}</p>
            </div>
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              router.push("/settings");
            }}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
          >
            <Settings01Icon size={16} className="text-neutral-400" />
            Account settings
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            <Logout01Icon size={16} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
