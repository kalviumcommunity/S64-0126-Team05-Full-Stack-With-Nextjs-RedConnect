import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";
import { logger } from "@/lib/logger";

const rawSecret =
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === "development" ? "dev-jwt-secret-change-me" : "");

if (!rawSecret) {
  throw new Error("JWT_SECRET environment variable must be set");
}

const JWT_SECRET = new TextEncoder().encode(rawSecret);

/**
 * Role-based route configuration
 * Defines which roles can access which routes
 */
const ROLE_BASED_ROUTES: Record<string, string[]> = {
  "/api/admin": ["ADMIN"],
  "/api/admin/users": ["ADMIN"],
  "/api/admin/reports": ["ADMIN"],
  "/api/users": ["DONOR", "ADMIN", "HOSPITAL"],
  "/api/donors": ["DONOR", "ADMIN", "HOSPITAL"],
  "/api/blood-banks": ["DONOR", "ADMIN", "HOSPITAL"],
  "/api/blood-donation": ["DONOR", "ADMIN"],
};

/**
 * Authorization Middleware
 * Validates JWT tokens and enforces role-based access control
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes - no authentication required
  const publicRoutes = [
    "/",
    "/login",
    "/api/auth/signup",
    "/api/auth/login",
    "/api/test",
  ];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return handleApiAuthorization(req, pathname);
  }

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/users")) {
    return handlePageProtection(req);
  }

  return NextResponse.next();
}

async function handleApiAuthorization(req: NextRequest, pathname: string) {
  const requiredRole = findMatchingRoute(pathname);
  if (!requiredRole) {
    return NextResponse.next(); // Route doesn't require authorization
  }

  const authHeader = req.headers.get("authorization");
  const hasBearer = authHeader && authHeader.startsWith("Bearer ");

  const tokenFromHeader = hasBearer ? authHeader.slice(7) : null;

  const tokenFromCookie = req.cookies.get("accessToken")?.value;

  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Authorization token required",
        error: { code: "E103" },
      },
      { status: 401 }
    );
  }

  try {
    const verified = await jose.jwtVerify(token, JWT_SECRET);
    const userRole = verified.payload.role as string;

    if (!requiredRole.includes(userRole)) {
      return NextResponse.json(
        {
          success: false,
          message: `Access denied. Required role: ${requiredRole.join(" or ")}`,
          error: { code: "E105" },
        },
        { status: 403 }
      );
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", verified.payload.id as string);
    requestHeaders.set("x-user-email", verified.payload.email as string);
    requestHeaders.set("x-user-role", userRole);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (err) {
    logger.error("JWT verification failed", {
      pathname,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      {
        success: false,
        message: "Invalid or expired token",
        error: { code: "E104" },
      },
      { status: 401 }
    );
  }
}

async function handlePageProtection(req: NextRequest) {
  const token =
    req.cookies.get("accessToken")?.value || req.cookies.get("token")?.value;

  // Development-only bypass for mock tokens used in frontend demos
  if (process.env.NODE_ENV === "development" && token === "mock.jwt.token") {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await jose.jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
}

/**
 * Find matching route configuration
 * Returns required roles for a given pathname
 */
function findMatchingRoute(pathname: string): string[] | null {
  // Exact match
  if (ROLE_BASED_ROUTES[pathname]) {
    return ROLE_BASED_ROUTES[pathname];
  }

  // Pattern match (e.g., /api/admin/* routes)
  for (const [route, roles] of Object.entries(ROLE_BASED_ROUTES)) {
    if (pathname.startsWith(route)) {
      return roles;
    }
  }

  return null;
}

export const config = {
  matcher: [
    // Protect all API routes
    "/api/:path*",
    // Protect dashboard and user pages
    "/dashboard/:path*",
    "/users/:path*",
  ],
};
