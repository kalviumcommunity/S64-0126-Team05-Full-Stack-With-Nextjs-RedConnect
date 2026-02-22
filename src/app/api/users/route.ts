import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import bcrypt from "bcrypt";

import { parsePagination, safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { userSafeSelect } from "@/lib/prismaSelect";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { sendValidationError } from "@/lib/validationUtils";
import { ERROR_CODES } from "@/lib/errorCodes";
import { signupSchema } from "@/lib/schemas/authSchema";

/**
 * GET /api/users
 * List all users (requires JWT authentication)
 * Query params: page, limit
 */
export async function GET(req: Request) {
  try {
    const { page, limit, skip, take } = parsePagination(req);

    const [total, users] = await prisma.$transaction([
      prisma.user.count(),
      prisma.user.findMany({
        select: userSafeSelect,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
    ]);

    return sendSuccess(
      {
        data: users,
        meta: {
          page,
          limit,
          total,
          totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
        },
      },
      "Users fetched successfully"
    );
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

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create new user with hashed password
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email.toLowerCase(),
        password: hashedPassword,
        role: "DONOR", // Prevent ADMIN self-assignment
      },
      select: userSafeSelect,
    });

    return sendSuccess(user, "User created successfully", 201);
  } catch (err) {
    // Handle Zod validation errors
    if (err instanceof ZodError) {
      return sendValidationError(err);
    }

    // Handle Prisma unique constraint errors
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
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
