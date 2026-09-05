import type { NextConfig } from "next";
import path from "path";

/**
 * In local development the frontend can proxy `/api/*` to the backend so no CORS
 * setup is needed. In production the browser calls the deployed API directly via
 * NEXT_PUBLIC_API_URL, and the rewrite must not be registered — pointing it at
 * localhost:3001 on a hosted deployment sends every API call into a void.
 */
const backendUrl = process.env.BACKEND_PROXY_URL ?? "http://localhost:3001";
const enableProxy =
  process.env.NODE_ENV !== "production" || Boolean(process.env.BACKEND_PROXY_URL);

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(process.cwd(), "../"),
  async rewrites() {
    if (!enableProxy) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
