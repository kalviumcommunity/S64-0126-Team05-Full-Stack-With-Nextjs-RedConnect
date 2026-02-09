import bcrypt from "bcrypt";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";
import { signupSchema } from "@/lib/schemas/authSchema";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { sendValidationError } from "@/lib/validationUtils";
import { ERROR_CODES } from "@/lib/errorCodes";
import { safeJson } from "@/lib/api";

/**
 * POST /api/auth/signup
 * User registration with secure password hashing
 *
 * Request body:
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "password": "securepassword123",
 *   "role": "DONOR" (optional, defaults to DONOR)
 * }
 *
 * Response: 201 Created
 * {
 *   "success": true,
 *   "message": "Registration successful",
 *   "data": { "id", "name", "email", "role", "createdAt" },
 *   "timestamp": "ISO 8601"
 * }
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

    // Hash password with bcrypt (10 salt rounds = secure + reasonable speed)
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create new user
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

    return sendSuccess(newUser, "Registration successful", 201);
  } catch (err) {
    // Handle Zod validation errors
    if (err instanceof ZodError) {
      return sendValidationError(err);
    }

    // Handle database errors
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return sendError(
        "A user with this email already exists",
        ERROR_CODES.DUPLICATE_EMAIL,
        409,
        err
      );
    }

    return sendError(
      "Registration failed",
      ERROR_CODES.DATABASE_ERROR,
      500,
      err
    );
  }
}
