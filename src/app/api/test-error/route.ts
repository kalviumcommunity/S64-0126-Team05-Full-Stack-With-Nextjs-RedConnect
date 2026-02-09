/**
 * Test Error Handling Endpoint
 * Demonstrates centralized error handling in development vs production
 * 
 * Usage:
 * curl http://localhost:3000/api/test-error?type=database
 * curl http://localhost:3000/api/test-error?type=validation
 * curl http://localhost:3000/api/test-error?type=timeout
 */

import { handleError, handleTypedError } from "@/lib/errorHandler";
import { logger } from "@/lib/logger";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const errorType = searchParams.get("type") || "generic";

  try {
    logger.info("Test error endpoint called", { errorType });

    // Simulate different error scenarios
    switch (errorType) {
      case "database":
        throw new Error("Database connection timeout after 30 seconds");

      case "validation":
        return handleTypedError({
          message: "Invalid email format provided",
          code: "E001",
          status: 400,
          context: "GET /api/test-error?type=validation",
        });

      case "authentication":
        return handleTypedError({
          message: "Invalid or expired JWT token",
          code: "E104",
          status: 401,
          context: "GET /api/test-error?type=authentication",
        });

      case "authorization":
        return handleTypedError({
          message: "User does not have permission to access this resource",
          code: "E105",
          status: 403,
          context: "GET /api/test-error?type=authorization",
        });

      case "timeout":
        throw new Error("Request timeout: External API did not respond within 10 seconds");

      case "notfound":
        return handleTypedError({
          message: "Donor with ID 'xyz123' not found in database",
          code: "E005",
          status: 404,
          context: "GET /api/test-error?type=notfound",
        });

      default:
        throw new Error("Generic error for testing error handler");
    }
  } catch (error) {
    return handleError(error, "GET /api/test-error");
  }
}
