import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-super-secret-key-change-in-production"
);

/**
 * Role-based route configuration
 * Defines which roles can access which routes
 */
const ROLE_BASED_ROUTES: Record<string, string[]> = {
  "/api/admin": ["ADMIN"],
  "/api/admin/users": ["ADMIN"],
  "/api/admin/reports": ["ADMIN"],
  "/api/users": ["DONOR", "ADMIN", "HOSPITAL"], // All authenticated users can list users
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

  // API routes - require JWT token and role-based access
  if (pathname.startsWith("/api/")) {
    return handleApiAuthorization(req, pathname);
  }

  // Page routes - check cookie-based token
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/users")) {
    return handlePageProtection(req);
  }

  return NextResponse.next();
}

/**
 * Handle API route authorization
 * Checks JWT token from Authorization header and validates role
 */
async function handleApiAuthorization(
  req: NextRequest,
  pathname: string
) {
  // Check if route requires role-based access
  const requiredRole = findMatchingRoute(pathname);
  if (!requiredRole) {
    return NextResponse.next(); // Route doesn't require authorization
  }

  // Extract token from Authorization header
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      {
        success: false,
        message: "Authorization token required",
        error: { code: "E103" },
      },
      { status: 401 }
    );
  }

  const token = authHeader.slice(7); // Remove "Bearer " prefix

  try {
    // Verify JWT token
    const verified = await jose.jwtVerify(token, JWT_SECRET);
    const userRole = verified.payload.role as string;

    // Check if user has required role
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

    // Attach user info to headers for downstream handlers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", verified.payload.id as string);
    requestHeaders.set("x-user-email", verified.payload.email as string);
    requestHeaders.set("x-user-role", userRole);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Invalid or expired token",
        error: { code: "E104" },
      },
      { status: 403 }
    );
  }
}

/**
 * Handle page route protection
 * Checks token stored in cookies
 */
async function handlePageProtection(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow mock token for demo
  if (token === "mock.jwt.token") {
    return NextResponse.next();
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

