import bcrypt from "bcrypt";
import { ZodError } from "zod";

import { safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { sendValidationError } from "@/lib/validationUtils";
import { ERROR_CODES } from "@/lib/errorCodes";
import { signupSchema } from "@/lib/schemas/authSchema";
import { deleteByPattern, deleteCache } from "@/lib/redis";
import { USERS_LIST_CACHE_PATTERN, userDetailCacheKey, TEST_USERS_CACHE_KEY } from "@/lib/cacheKeys";

/**
 * POST /api/auth/signup
 * Register new user with secure password hashing
 */
export async function POST(req: Request) {
  const parsed = await safeJson(req);
  if (!parsed.ok) {
    return sendError("Invalid JSON body", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  try {
    // Validate input with Zod schema
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

    // Hash password with bcrypt (10 salt rounds)
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create user in database
    const newUser = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email.toLowerCase(),
        password: hashedPassword,
        role: validatedData.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    await deleteByPattern(USERS_LIST_CACHE_PATTERN);
    await deleteCache(userDetailCacheKey(newUser.id));
    await deleteCache(TEST_USERS_CACHE_KEY);
    return sendSuccess(newUser, "Registration successful", 201);
  } catch (err) {
    // Handle Zod validation errors
    if (err instanceof ZodError) {
      return sendValidationError(err);
    }

    // Handle other errors
    if (err instanceof Error && err.message.includes("Unique constraint")) {
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
