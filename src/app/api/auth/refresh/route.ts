import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from "@/lib/jwtUtils";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    const responseBody = {
      success: false,
      message: "Refresh token missing",
      error: {
        code: "E103",
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(responseBody, { status: 401 });
  }

  const decoded = await verifyRefreshToken(refreshToken);

  if (!decoded || !decoded.id || !decoded.email || !decoded.role) {
    const responseBody = {
      success: false,
      message: "Invalid or expired refresh token",
      error: {
        code: "E104",
      },
      timestamp: new Date().toISOString(),
    };

    const response = NextResponse.json(responseBody, { status: 401 });
    response.cookies.set("accessToken", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
    });
    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
    });
    return response;
  }

  const basePayload = {
    id: decoded.id as string,
    email: decoded.email as string,
    role: decoded.role as string,
  };

  const accessToken = await generateAccessToken(basePayload);
  const newRefreshToken = await generateRefreshToken(basePayload);

  const responseBody = {
    success: true,
    message: "Token refreshed",
    data: {},
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

  response.cookies.set("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return response;
}
