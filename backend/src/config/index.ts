import dotenv from "dotenv";
dotenv.config();

const DEFAULT_CORS_ORIGINS = ["http://localhost:3000"];

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
  mlServiceUrl: process.env.ML_SERVICE_URL || "http://localhost:8001",
  // Customers each plan may track; null means unlimited.
  planLimits: {
    free: 1000,
    starter: 5000,
    pro: 15000,
    enterprise: null,
  } as Record<string, number | null>,
} as const;
