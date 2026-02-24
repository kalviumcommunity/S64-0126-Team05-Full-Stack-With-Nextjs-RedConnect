import prisma from "@/lib/prisma";
import { getCache, setCache } from "@/lib/redis";
import { TEST_USERS_CACHE_KEY } from "@/lib/cacheKeys";
import { logger } from "@/lib/logger";
import { handleError } from "@/lib/errorHandler";

export async function GET() {
  try {
    const cachedData = await getCache(TEST_USERS_CACHE_KEY);
    if (cachedData) {
      logger.info("Test users cache hit", { cacheKey: TEST_USERS_CACHE_KEY });
      try {
        return Response.json(JSON.parse(cachedData));
      } catch (parseError) {
        logger.error("JSON parse error for cached test users", { error: parseError });
        // Fall through to re-fetch if cache is corrupted
      }
    }

    logger.info("Test users cache miss", { cacheKey: TEST_USERS_CACHE_KEY });

    const users = await prisma.user.findMany();
    const payload = { users };
    await setCache(TEST_USERS_CACHE_KEY, JSON.stringify(payload), 30);
    return Response.json(payload);
  } catch (error) {
    return handleError(error, "GET /api/test");
  }
}
