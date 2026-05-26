import Redis from "ioredis";
import { config } from "./index.js";

let redis: Redis | null = null;

export function getRedis(): Redis {
  if (!redis) {
    redis = new Redis(config.redisUrl, {
      maxRetriesPerRequest: null,
      lazyConnect: true,
    });

    redis.on("error", (err) => {
      console.error("Redis connection error:", err.message);
    });

    redis.on("connect", () => {
      console.log("Connected to Redis");
    });
  }
  return redis;
}

export async function connectRedis(): Promise<void> {
  try {
    const r = getRedis();
    await r.connect();
  } catch (err) {
    console.warn("Redis not available, running without cache:", (err as Error).message);
  }
}
