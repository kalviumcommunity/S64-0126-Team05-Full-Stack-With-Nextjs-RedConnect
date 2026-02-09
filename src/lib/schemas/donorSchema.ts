import { z } from "zod";

/**
 * Donor Creation Schema
 * Validates all required fields for registering a new blood donor
 */
export const donorCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Donor name must be at least 2 characters long")
    .max(100, "Donor name must be less than 100 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters"),
  phone: z
    .string()
    .regex(/^[0-9\s\-\+\(\)]{7,15}$/, "Invalid phone number format"),
  bloodType: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  dateOfBirth: z
    .string()
    .refine(
      (date) => {
        const parsed = new Date(date);
        const age = new Date().getFullYear() - parsed.getFullYear();
        return age >= 18;
      },
      "Donor must be at least 18 years old (YYYY-MM-DD format)"
    ),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters long")
    .max(200, "Address must be less than 200 characters"),
  city: z
    .string()
    .min(2, "City must be at least 2 characters long")
    .max(100, "City must be less than 100 characters"),
});

/**
 * Donor Update Schema
 * All fields are optional for updates
 */
export const donorUpdateSchema = donorCreateSchema.partial();

/**
 * Extract TypeScript types from schemas for type-safe usage
 */
export type DonorCreateInput = z.infer<typeof donorCreateSchema>;
export type DonorUpdateInput = z.infer<typeof donorUpdateSchema>;
