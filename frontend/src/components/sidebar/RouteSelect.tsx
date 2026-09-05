"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home01Icon,
  UserGroupIcon,
  ChartLineData01Icon,
  DocumentValidationIcon,
  Settings01Icon,
  CloudUploadIcon,
  CpuSettingsIcon,
  Alert01Icon,
  PlugSocketIcon,
} from "hugeicons-react";
import { cn } from "@/lib/utils";

const routes = [
  { icon: Home01Icon, label: "Dashboard", path: "/dashboard" },
  { icon: UserGroupIcon, label: "Customers", path: "/customers" },
  { icon: ChartLineData01Icon, label: "Churn Analysis", path: "/analysis" },
  { icon: DocumentValidationIcon, label: "Reports", path: "/reports" },
  { icon: Alert01Icon, label: "At-Risk", path: "/at-risk" },
  { icon: CpuSettingsIcon, label: "ML Models", path: "/models" },
  { icon: CloudUploadIcon, label: "Data Import", path: "/import" },
  { icon: PlugSocketIcon, label: "Integrations", path: "/integrations" },
  { icon: Settings01Icon, label: "Settings", path: "/settings" },
];

export function RouteSelect({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-0.5 overflow-y-auto">
      {routes.map((route) => {
        const Icon = route.icon;
        const isActive =
          pathname === route.path ||
          (route.path !== "/dashboard" && pathname?.startsWith(`${route.path}/`));

        return (
          <Link
            key={route.path}
            href={route.path}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-indigo-50 font-medium text-indigo-700"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            )}
          >
            <Icon size={18} className={isActive ? "text-indigo-600" : "text-neutral-400"} />
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
}
