/**
 * Centralized Error Handler
 * Catches, categorizes, and logs errors while keeping production responses safe
 */

import { NextResponse } from "next/server";
import { logger } from "./logger";

export interface AppError {
  message: string;
  code?: string;
  status?: number;
  context?: string;
  originalError?: Error;
}

/**
 * Centralized error handler for API routes
 * - Shows detailed errors in development
 * - Shows safe messages in production
 * - Always logs full details for debugging
 *
 * @param error - The error object or string
 * @param context - Where the error occurred (e.g., "GET /api/users")
 * @param status - HTTP status code (default: 500)
 * @returns NextResponse with appropriate error message
 */
export function handleError(
  error: unknown,
  context: string,
  status: number = 500
): NextResponse {
  const isDev = process.env.NODE_ENV === "development";
  let errorMessage = "An unexpected error occurred";
  let errorStack = "";

  // Extract error details from various error types
  if (error instanceof Error) {
    errorMessage = error.message;
    errorStack = error.stack || "";
  } else if (typeof error === "string") {
    errorMessage = error;
  } else if (error && typeof error === "object") {
    const objError = error as Record<string, unknown>;
    errorMessage = (objError.message as string) || JSON.stringify(error);
  }

  // Create safe response for user
  const userMessage = isDev
    ? errorMessage
    : "Something went wrong. Please try again later.";

  const errorResponse = {
    success: false,
    message: userMessage,
    error: {
      code: "E500",
      ...(isDev && { details: errorMessage }),
    },
    timestamp: new Date().toISOString(),
  };

  // Log full error details for debugging (always captured, never shown to user in prod)
  logger.error(`Error in ${context}`, {
    status,
    message: errorMessage,
    context,
  }, isDev ? errorStack : "REDACTED");

  return NextResponse.json(errorResponse, { status });
}

/**
 * Type-safe error handler for specific error types
 * Useful for handling validation, authentication, and custom errors
 */
export function handleTypedError(appError: AppError): NextResponse {
  const isDev = process.env.NODE_ENV === "development";
  const status = appError.status || 500;
  const context = appError.context || "Unknown";

  const userMessage = isDev
    ? appError.message
    : "Something went wrong. Please try again later.";

  const errorResponse = {
    success: false,
    message: userMessage,
    error: {
      code: appError.code || "E500",
      ...(isDev && { details: appError.message }),
    },
    timestamp: new Date().toISOString(),
  };

  // Log with error code for better tracking
  logger.error(`Error in ${context}`, {
    status,
    code: appError.code,
    message: appError.message,
    context,
  }, isDev && appError.originalError ? appError.originalError.stack : "REDACTED");

  return NextResponse.json(errorResponse, { status });
}

/**
 * Async wrapper to catch errors in route handlers
 * Eliminates repetitive try-catch blocks
 *
 * Usage:
 * export async function GET(req: Request) {
 *   return asyncHandler(async () => {
 *     const data = await fetchData();
 *     return sendSuccess(data);
 *   }, "GET /api/users");
 * }
 */
export async function asyncHandler(
  handler: () => Promise<NextResponse>,
  context: string
): Promise<NextResponse> {
  try {
    return await handler();
  } catch (error) {
    return handleError(error, context);
  }
}
