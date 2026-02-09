import { NextResponse } from "next/server";

/**
 * Global API Response Handler
 * Ensures consistent response format across all API endpoints
 */

type SuccessResponse<T = Record<string, unknown>> = {
  success: true;
  message: string;
  data?: T;
  timestamp: string;
};

type ErrorResponse = {
  success: false;
  message: string;
  error: {
    code: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;
};

/**
 * Send success response
 * @param data - Response data
 * @param message - Success message
 * @param status - HTTP status code (default: 200)
 */
export const sendSuccess = <T = Record<string, unknown>>(
  data: T,
  message: string = "Success",
  status: number = 200
): NextResponse<SuccessResponse<T>> => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
};

/**
 * Send error response
 * @param message - Error message
 * @param code - Error code (e.g., "VALIDATION_ERROR")
 * @param status - HTTP status code (default: 500)
 * @param details - Additional error details (only in development)
 */
export const sendError = (
  message: string = "Something went wrong",
  code: string = "INTERNAL_ERROR",
  status: number = 500,
  details?: unknown
): NextResponse => {
  type ErrorResponseWithDetails = ErrorResponse & {
    error: {
      code: string;
      details?: Record<string, unknown>;
    };
  };

  const errorResponse: ErrorResponseWithDetails = {
    success: false,
    message,
    error: {
      code,
    },
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === "development" && details) {
    errorResponse.error.details = details instanceof Error ? { message: details.message } : (details as Record<string, unknown>);
  }

  return NextResponse.json(errorResponse, { status });
};
