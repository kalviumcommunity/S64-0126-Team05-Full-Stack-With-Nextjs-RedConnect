import { ZodError } from "zod";
import { sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";

/**
 * Validation Error Helper
 * Handles Zod validation errors and returns a standardized error response
 */
export interface ValidationErrorDetail {
  field: string | number;
  message: string;
}

/**
 * Parse Zod errors into a consistent format
 * @param error - Zod error instance
 * @returns Array of validation error details
 */
export const parseZodErrors = (error: ZodError): ValidationErrorDetail[] => {
  return error.issues.map((err) => ({
    field: String(err.path[0] || "unknown"),
    message: err.message,
  }));
};

/**
 * Send validation error response
 * Uses global response handler with consistent error format
 * @param error - Zod validation error
 * @returns NextResponse with 400 status and formatted errors
 */
export const sendValidationError = (error: ZodError | Error) => {
  if (error instanceof ZodError) {
    const validationErrors = parseZodErrors(error);
    return sendError(
      "Validation failed",
      ERROR_CODES.VALIDATION_ERROR,
      400,
      {
        errors: validationErrors,
        summary: `${validationErrors.length} validation error(s)`,
      }
    );
  }

  return sendError(
    "Invalid request",
    ERROR_CODES.VALIDATION_ERROR,
    400,
    { message: error.message }
  );
};
