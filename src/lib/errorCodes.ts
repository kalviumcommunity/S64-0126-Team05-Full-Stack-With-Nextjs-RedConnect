/**
 * Global Error Codes
 * Used across all API endpoints for consistent error tracking and debugging
 */

export const ERROR_CODES = {
  // Authentication and Authorization errors
  INVALID_CREDENTIALS: "E102",
  TOKEN_REQUIRED: "E103",
  TOKEN_INVALID: "E104",
  ACCESS_DENIED: "E105",
  
  // Validation errors
  VALIDATION_ERROR: "E001",
  MISSING_FIELD: "E002",
  INVALID_FORMAT: "E003",
  
  // Not found errors
  NOT_FOUND: "E004",
  DONOR_NOT_FOUND: "E005",
  BLOOD_BANK_NOT_FOUND: "E006",
  
  // Conflict errors
  DUPLICATE_EMAIL: "E007",
  DUPLICATE_RECORD: "E008",
  BLOOD_TYPE_MISMATCH: "E009",
  
  // Database errors
  DATABASE_ERROR: "E010",
  DATABASE_FAILURE: "E011",
  TRANSACTION_FAILED: "E012",
  
  // Internal server errors
  INTERNAL_ERROR: "E500",
  UNKNOWN_ERROR: "E501",
} as const;

/**
 * Error code descriptions for logging and debugging
 */
export const ERROR_DESCRIPTIONS: Record<string, string> = {
  E102: "Invalid credentials - authentication failed",
  E103: "Authorization token required",
  E104: "Invalid or expired token",
  E105: "Access denied - insufficient permissions",
  E001: "Validation error - invalid input",
  E002: "Missing required field",
  E003: "Invalid format or data type",
  E004: "Resource not found",
  E005: "Donor not found in database",
  E006: "Blood bank not found in database",
  E007: "Email already exists",
  E008: "Duplicate record",
  E009: "Blood type mismatch",
  E010: "Database operation failed",
  E011: "Database connection failure",
  E012: "Transaction execution failed",
  E500: "Internal server error",
  E501: "Unknown error occurred",
};
