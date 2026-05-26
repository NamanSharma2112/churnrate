"use client";

import { useState } from "react";
import {
  FiHome,
  FiUsers,
  FiTrendingUp,
  FiBarChart2,
  FiSettings,
  FiUpload,
  FiCpu,
  FiAlertTriangle,
} from "react-icons/fi";

const routes = [
  { icon: FiHome, label: "Dashboard", path: "/" },
  { icon: FiUsers, label: "Customers", path: "/customers" },
  { icon: FiTrendingUp, label: "Churn Analysis", path: "/analysis" },
  { icon: FiBarChart2, label: "Reports", path: "/reports" },
  { icon: FiAlertTriangle, label: "At-Risk", path: "/at-risk" },
  { icon: FiCpu, label: "ML Models", path: "/models" },
  { icon: FiUpload, label: "Data Import", path: "/import" },
  { icon: FiSettings, label: "Settings", path: "/settings" },
];

export function RouteSelect() {
  const [selected, setSelected] = useState("/");

  return (
    <nav className="flex-1 space-y-1">
      {routes.map((route) => {
        const Icon = route.icon;
        const isActive = selected === route.path;
        return (
          <button
            key={route.path}
            onClick={() => setSelected(route.path)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
              isActive
                ? "bg-indigo-600/10 text-indigo-400"
                : "text-stone-400 hover:bg-stone-800 hover:text-stone-200"
            }`}
          >
            <Icon className={isActive ? "text-indigo-400" : ""} />
            {route.label}
          </button>
        );
      })}
    </nav>
  );
}
