import { ZodError } from "zod";

import prisma from "@/lib/prisma";
import { safeJson } from "@/lib/api";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";
import { sendValidationError } from "@/lib/validationUtils";
import { fileRecordSchema } from "@/lib/schemas/fileUploadSchema";

/**
 * POST /api/files
 * Store uploaded file metadata in the database
 */
export async function POST(req: Request) {
  const parsed = await safeJson(req);
  if (!parsed.ok) {
    return sendError("Invalid JSON body", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  try {
    const validated = fileRecordSchema.parse(parsed.data);

    const record = await prisma.fileUpload.create({
      data: {
        name: validated.fileName,
        url: validated.fileURL,
        size: validated.fileSize,
        contentType: validated.fileType,
        uploaderId: validated.uploaderId,
      },
    });

    return sendSuccess(record, "File record saved", 201);
  } catch (err) {
    if (err instanceof ZodError) {
      return sendValidationError(err);
    }

    return sendError(
      "DB insertion failed",
      ERROR_CODES.DATABASE_ERROR,
      500,
      err
    );
  }
}
