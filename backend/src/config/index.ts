import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "3001", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://churnrate:churnrate@localhost:5432/churnrate",
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  jwt: {
    secret: process.env.JWT_SECRET || "dev-secret-change-me",
    expiry: process.env.JWT_EXPIRY || "7d",
  },
  mlServiceUrl: process.env.ML_SERVICE_URL || "http://localhost:8001",
} as const;
