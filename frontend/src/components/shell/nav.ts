import {
  BrainCircuit,
  ChartLine,
  FileText,
  House,
  Plug,
  Settings,
  TriangleAlert,
  Upload,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavRoute {
  path: string;
  label: string;
  icon: LucideIcon;
  /** Extra words the command palette should match on. */
  keywords?: string;
}

export interface NavSection {
  title?: string;
  routes: NavRoute[];
}

/** The single source for the sidebar, the palette and the breadcrumb. */
export const NAV: NavSection[] = [
  {
    routes: [
      { path: "/dashboard", label: "Dashboard", icon: House, keywords: "home overview" },
      { path: "/at-risk", label: "At-risk", icon: TriangleAlert, keywords: "churn danger accounts" },
      { path: "/customers", label: "Customers", icon: Users, keywords: "accounts directory" },
    ],
  },
  {
    title: "Insights",
    routes: [
      { path: "/analysis", label: "Churn analysis", icon: ChartLine, keywords: "trend reasons" },
      { path: "/reports", label: "Reports", icon: FileText, keywords: "revenue export" },
      { path: "/models", label: "ML model", icon: BrainCircuit, keywords: "scoring prediction features" },
    ],
  },
  {
    title: "Data",
    routes: [
      { path: "/import", label: "Data import", icon: Upload, keywords: "csv upload" },
      { path: "/integrations", label: "Integrations", icon: Plug, keywords: "stripe connect" },
    ],
  },
];

export const SETTINGS_ROUTE: NavRoute = {
  path: "/settings",
  label: "Settings",
  icon: Settings,
  keywords: "profile workspace account",
};

export const ALL_ROUTES: NavRoute[] = [...NAV.flatMap((section) => section.routes), SETTINGS_ROUTE];

export function routeFor(pathname: string | null): NavRoute | undefined {
  if (!pathname) return undefined;
  return ALL_ROUTES.find((r) => pathname === r.path || pathname.startsWith(`${r.path}/`));
}
