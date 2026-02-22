import bcrypt from "bcrypt";
import { ZodError } from "zod";
import { NextResponse } from "next/server";

import { safeJson } from "@/lib/api";
import prisma from "@/lib/prisma";
import { sendError } from "@/lib/responseHandler";
import { sendValidationError } from "@/lib/validationUtils";
import { ERROR_CODES } from "@/lib/errorCodes";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwtUtils";
import { loginSchema } from "@/lib/schemas/authSchema";

export async function POST(req: Request) {
  const parsed = await safeJson(req);
  if (!parsed.ok) {
    return sendError("Invalid JSON body", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  try {
    const validatedData = loginSchema.parse(parsed.data);

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

    if (!user) {
      return sendError("Invalid credentials", "E102", 401);
    }

    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password
    );

    if (!isPasswordValid) {
      return sendError("Invalid credentials", "E102", 401);
    }

    const accessToken = await generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = await generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const responseBody = {
      success: true,
      message: "Login successful",
      data: {
        user: userWithoutPassword,
      },
      timestamp: new Date().toISOString(),
    };

    const response = NextResponse.json(responseBody, { status: 200 });

    const isProduction = process.env.NODE_ENV === "production";

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (err) {
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
