import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import { parsePagination, safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { userSafeSelect } from "@/lib/prismaSelect";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { sendValidationError } from "@/lib/validationUtils";
import { ERROR_CODES } from "@/lib/errorCodes";
import { extractTokenFromHeader, verifyToken } from "@/lib/jwtUtils";
import { signupSchema } from "@/lib/schemas/authSchema";
import { getCache, setCache, deleteByPattern, deleteCache } from "@/lib/redis";
import {
  usersListCacheKey,
  USERS_LIST_CACHE_PATTERN,
  userDetailCacheKey,
  TEST_USERS_CACHE_KEY,
} from "@/lib/cacheKeys";
import { logger } from "@/lib/logger";

/**
 * GET /api/users
 * List all users (requires JWT authentication)
 * Query params: page, limit
 */
export async function GET(req: Request) {
  try {
    // Extract and verify JWT token
    const authHeader = req.headers.get("authorization");
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return sendError(
        "Authorization token required",
        "E103",
        401
      );
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return sendError(
        "Invalid or expired token",
        "E104",
        403
      );
    }

    const { page, limit, skip, take } = parsePagination(req);
    const cacheKey = usersListCacheKey(page, limit);
    const cachedData = await getCache(cacheKey);

    if (cachedData) {
      logger.info("Users cache hit", { cacheKey });
      return sendSuccess(JSON.parse(cachedData), "Users fetched successfully (cache)");
    }

    logger.info("Users cache miss", { cacheKey });

    const [total, users] = await prisma.$transaction([
      prisma.user.count(),
      prisma.user.findMany({
        select: userSafeSelect,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
    ]);

    const payload = {
      data: users,
      meta: {
        page,
        limit,
        total,
        totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
      },
    };

    await setCache(cacheKey, JSON.stringify(payload), 60);

    return sendSuccess(payload, "Users fetched successfully");
  } catch (err) {
    return sendError(
      "Failed to fetch users",
      ERROR_CODES.DATABASE_ERROR,
      500,
      err
    );
  }
}

/**
 * POST /api/users
 * Create new user (typically via signup, kept for admin creation)
 */
export async function POST(req: Request) {
  const parsed = await safeJson(req);
  if (!parsed.ok) {
    return sendError("Invalid JSON body", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  try {
    // Validate input with Zod schema (same as signup)
    const validatedData = signupSchema.parse(parsed.data);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return sendError(
        "A user with this email already exists",
        ERROR_CODES.DUPLICATE_EMAIL,
        409
      );
    }

    // Create new user with password (should be hashed with bcrypt in signup endpoint)
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email.toLowerCase(),
        password: validatedData.password,
        role: validatedData.role,
      },
      select: userSafeSelect,
    });

    await deleteByPattern(USERS_LIST_CACHE_PATTERN);
    await deleteCache(userDetailCacheKey(user.id));
    await deleteCache(TEST_USERS_CACHE_KEY);
    return sendSuccess(user, "User created successfully", 201);
  } catch (err) {
    // Handle Zod validation errors
    if (err instanceof ZodError) {
      return sendValidationError(err);
    }

    // Handle Prisma unique constraint errors
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return sendError(
        "A user with this email already exists",
        ERROR_CODES.DUPLICATE_EMAIL,
        409
      );
    }

    return sendError(
      "Failed to create user",
      ERROR_CODES.DATABASE_ERROR,
      500,
      err
    );
  }
}
