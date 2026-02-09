import { z } from "zod";

/**
 * Blood Donation Record Schema
 * Validates all required fields for recording a blood donation
 */
export const bloodDonationCreateSchema = z.object({
  donorId: z
    .string()
    .uuid("Donor ID must be a valid UUID"),
  bloodBankId: z
    .string()
    .uuid("Blood Bank ID must be a valid UUID"),
  units: z
    .number()
    .positive("Units must be greater than 0")
    .max(5, "Units cannot exceed 5 per donation"),
  bloodType: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .transform((val) => {
      if (!["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(val)) {
        throw new Error("Invalid blood type. Valid types are: A+, A-, B+, B-, AB+, AB-, O+, O-");
      }
      return val;
    }),
  notes: z
    .string()
    .max(500, "Notes must be less than 500 characters")
    .optional(),
});

/**
 * Extract TypeScript type from schema for type-safe usage
 */
export type BloodDonationCreateInput = z.infer<typeof bloodDonationCreateSchema>;
