import { sendSuccess } from "@/lib/responseHandler";
import { getCache, setCache } from "@/lib/redis";
import { adminDashboardCacheKey } from "@/lib/cacheKeys";
import { logger } from "@/lib/logger";

/**
 * GET /api/admin
 * Admin-only dashboard endpoint
 * Requires ADMIN role
 */
export async function GET(req: Request) {
  // User info is attached by middleware via headers
  const userId = req.headers.get("x-user-id");
  const userEmail = req.headers.get("x-user-email");
  const userRole = req.headers.get("x-user-role");

  const cacheKey = adminDashboardCacheKey(userId);
  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    logger.info("Admin cache hit", { cacheKey });
    return sendSuccess(JSON.parse(cachedData), "Admin access granted (cache)");
  }
  logger.info("Admin cache miss", { cacheKey });

  const adminData = {
    message: "Welcome to Admin Dashboard",
    accessLevel: "Full administrative access",
    user: {
      id: userId,
      email: userEmail,
      role: userRole,
    },
    availableActions: [
      "View all users",
      "Delete users",
      "View reports",
      "Manage blood banks",
      "View system analytics",
    ],
  };

  await setCache(cacheKey, JSON.stringify(adminData), 60);
  return sendSuccess(adminData, "Admin access granted");
}
