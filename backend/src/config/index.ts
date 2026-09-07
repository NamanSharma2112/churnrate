import dotenv from "dotenv";
dotenv.config();

const DEFAULT_CORS_ORIGINS = ["http://localhost:3000"];

/** Prefixes http:// when a URL arrives without a scheme. */
function withScheme(url: string | undefined): string | undefined {
  const trimmed = url?.trim();
  if (!trimmed) return undefined;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`;
}

export const config = {
  port: parseInt(process.env.PORT || "3001", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  // Comma-separated list, so deployed frontends can be allowed without a code change.
  corsOrigins: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
    : DEFAULT_CORS_ORIGINS,
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://churnrate:churnrate@localhost:5432/churnrate",
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  jwt: {
    secret: process.env.JWT_SECRET || "dev-secret-change-me",
    expiry: process.env.JWT_EXPIRY || "7d",
  },
  // Some hosts hand this over as a bare "host:port" (Render's `fromService`
  // hostport property, for one). `fetch` rejects a URL with no scheme, so every
  // ML call would throw and silently fall back to the heuristic scorer forever.
  mlServiceUrl: withScheme(process.env.ML_SERVICE_URL) || "http://localhost:8001",
  // Customers each plan may track; null means unlimited.
  planLimits: {
    free: 1000,
    starter: 5000,
    pro: 15000,
    enterprise: null,
  } as Record<string, number | null>,
} as const;
