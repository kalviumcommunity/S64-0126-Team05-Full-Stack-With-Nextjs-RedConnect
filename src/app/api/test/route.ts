import prisma from "@/lib/prisma";
import { getCache, setCache } from "@/lib/redis";
import { TEST_USERS_CACHE_KEY } from "@/lib/cacheKeys";
import { logger } from "@/lib/logger";

export async function GET() {
  const cachedData = await getCache(TEST_USERS_CACHE_KEY);
  if (cachedData) {
    logger.info("Test users cache hit", { cacheKey: TEST_USERS_CACHE_KEY });
    return Response.json(JSON.parse(cachedData));
  }

  logger.info("Test users cache miss", { cacheKey: TEST_USERS_CACHE_KEY });

  const users = await prisma.user.findMany();
  const payload = { users };
  await setCache(TEST_USERS_CACHE_KEY, JSON.stringify(payload), 30);
  return Response.json(payload);
}
