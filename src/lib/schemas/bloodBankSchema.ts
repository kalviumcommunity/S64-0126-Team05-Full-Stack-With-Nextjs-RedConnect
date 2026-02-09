import { z } from "zod";

/**
 * Blood Bank Creation Schema
 * Validates all required fields for creating a blood bank
 */
export const bloodBankCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Blood bank name must be at least 2 characters long")
    .max(100, "Blood bank name must be less than 100 characters"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters long")
    .max(200, "Address must be less than 200 characters"),
  city: z
    .string()
    .min(2, "City must be at least 2 characters long")
    .max(100, "City must be less than 100 characters"),
  contactNo: z
    .string()
    .regex(/^[0-9\s\-\+\(\)]{7,15}$/, "Invalid phone number format"),
  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters"),
});

/**
 * Blood Bank Update Schema
 * Same as create schema for now, but can be extended with partial fields
 */
export const bloodBankUpdateSchema = bloodBankCreateSchema.partial();

/**
 * Extract TypeScript type from schema for type-safe usage
 * Usage: type BloodBankInput = z.infer<typeof bloodBankCreateSchema>
 */
export type BloodBankCreateInput = z.infer<typeof bloodBankCreateSchema>;
export type BloodBankUpdateInput = z.infer<typeof bloodBankUpdateSchema>;
