import Redis from "ioredis";
import { logger } from "@/lib/logger";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 2,
  lazyConnect: true,
});

redis.on("error", (error) => {
  logger.warn("Redis connection error", { message: error.message });
});

export async function getCache(key: string) {
  try {
    await ensureConnected();
    return await redis.get(key);
  } catch (error) {
    logger.warn("Redis get failed", { key, error: (error as Error).message });
    return null;
  }
}

export async function setCache(key: string, value: string, ttlSeconds: number) {
  try {
    await ensureConnected();
    await redis.set(key, value, "EX", ttlSeconds);
  } catch (error) {
    logger.warn("Redis set failed", { key, error: (error as Error).message });
  }
}

export async function deleteByPattern(pattern: string) {
  try {
    await ensureConnected();
    let cursor = "0";
    do {
      const [nextCursor, keys] = await redis.scan(
        cursor,
        "MATCH",
        pattern,
        "COUNT",
        100
      );
      cursor = nextCursor;
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } while (cursor !== "0");
  } catch (error) {
    logger.warn("Redis deleteByPattern failed", {
      pattern,
      error: (error as Error).message,
    });
  }
}

export async function deleteCache(key: string) {
  try {
    await ensureConnected();
    await redis.del(key);
  } catch (error) {
    logger.warn("Redis delete failed", { key, error: (error as Error).message });
  }
}

async function ensureConnected() {
  if (redis.status === "ready" || redis.status === "connecting") return;
  await redis.connect();
}

export default redis;
