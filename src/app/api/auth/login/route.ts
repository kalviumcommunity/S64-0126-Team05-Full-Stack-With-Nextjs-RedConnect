import bcrypt from "bcrypt";
import { ZodError } from "zod";

import prisma from "@/lib/prisma";
import { loginSchema } from "@/lib/schemas/authSchema";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { sendValidationError } from "@/lib/validationUtils";
import { ERROR_CODES } from "@/lib/errorCodes";
import { safeJson } from "@/lib/api";
import { generateToken } from "@/lib/jwtUtils";

/**
 * POST /api/auth/login
 * User authentication and JWT token generation
 *
 * Request body:
 * {
 *   "email": "john@example.com",
 *   "password": "securepassword123"
 * }
 *
 * Response: 200 OK
 * {
 *   "success": true,
 *   "message": "Login successful",
 *   "data": {
 *     "token": "eyJhbGciOiJIUzI1NiIs...",
 *     "user": { "id", "name", "email", "role" }
 *   },
 *   "timestamp": "ISO 8601"
 * }
 *
 * Response: 401 Unauthorized
 * {
 *   "success": false,
 *   "message": "Invalid credentials",
 *   "error": { "code": "E102" }
 * }
 */
export async function POST(req: Request) {
  const parsed = await safeJson(req);
  if (!parsed.ok) {
    return sendError("Invalid JSON body", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  try {
    // Validate input with Zod schema
    const validatedData = loginSchema.parse(parsed.data);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
      },
    });

    if (!user) {
      return sendError(
        "Invalid credentials",
        "E102",
        401
      );
    }

    // Verify password with bcrypt
    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password
    );

    if (!isPasswordValid) {
      return sendError(
        "Invalid credentials",
        "E102",
        401
      );
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Return token and user info (without password)
    return sendSuccess(
      {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      "Login successful",
      200
    );
  } catch (err) {
    // Handle Zod validation errors
    if (err instanceof ZodError) {
      return sendValidationError(err);
    }

    return sendError(
      "Login failed",
      ERROR_CODES.DATABASE_ERROR,
      500,
      err
    );
  }
}
