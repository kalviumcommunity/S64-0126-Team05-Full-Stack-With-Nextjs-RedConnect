import { z } from "zod";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const uploadRequestSchema = z.object({
  filename: z.string().min(1, "Filename is required").max(255, "Filename too long"),
  fileType: z
    .string()
    .min(1, "File type is required")
    .refine(
      (value) =>
        value.startsWith("image/") ||
        value === "application/pdf",
      "Only images or PDFs are allowed"
    ),
  fileSize: z
    .number()
    .int("File size must be an integer")
    .positive("File size must be positive")
    .max(MAX_FILE_SIZE_BYTES, `File must be <= ${MAX_FILE_SIZE_MB}MB`),
});

export const fileRecordSchema = z.object({
  fileName: z.string().min(1, "File name is required").max(255),
  fileURL: z.string().url("File URL must be valid"),
  fileSize: z.number().int().positive(),
  fileType: z.string().min(1),
  uploaderId: z.string().uuid().optional(),
});

export type UploadRequestInput = z.infer<typeof uploadRequestSchema>;
export type FileRecordInput = z.infer<typeof fileRecordSchema>;
