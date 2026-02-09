import bcrypt from "bcrypt";
import { ZodError } from "zod";

import { safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { sendValidationError } from "@/lib/validationUtils";
import { ERROR_CODES } from "@/lib/errorCodes";
import { generateToken } from "@/lib/jwtUtils";
import { loginSchema } from "@/lib/schemas/authSchema";

/**
 * POST /api/auth/login
 * Authenticate user and return JWT token
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
        password: true,
        role: true,
      },
    });

    // Check if user exists
    if (!user) {
      return sendError(
        "Invalid credentials",
        "E102",
        401
      );
    }

    // Verify password
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
    const token = await generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Return token and user data (without password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return sendSuccess(
      {
        token,
        user: userWithoutPassword,
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
      "Failed to authenticate user",
      ERROR_CODES.DATABASE_ERROR,
      500,
      err
    );
  }
}
