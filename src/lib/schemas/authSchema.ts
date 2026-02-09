import { z } from "zod";

/**
 * Signup Schema
 * Validates user registration data
 */
export const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be less than 100 characters"),
  role: z
    .enum(["ADMIN", "DONOR", "HOSPITAL"])
    .default("DONOR"),
});

/**
 * Login Schema
 * Validates user login credentials
 */
export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});

// Type exports for TypeScript
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
