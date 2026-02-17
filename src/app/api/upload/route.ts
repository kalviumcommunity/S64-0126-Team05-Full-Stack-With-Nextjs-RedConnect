import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { ZodError } from "zod";

import { safeJson } from "@/lib/api";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";
import { sendValidationError } from "@/lib/validationUtils";
import { uploadRequestSchema } from "@/lib/schemas/fileUploadSchema";

const REGION = process.env.AWS_REGION;
const BUCKET = process.env.AWS_BUCKET_NAME;

const s3 = new S3Client({
  region: REGION,
  credentials: process.env.AWS_ACCESS_KEY_ID
    ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      }
    : undefined,
});

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

export async function POST(req: Request) {
  if (!REGION || !BUCKET) {
    return sendError(
      "Storage configuration missing",
      ERROR_CODES.INTERNAL_ERROR,
      500
    );
  }

  const parsed = await safeJson(req);
  if (!parsed.ok) {
    return sendError("Invalid JSON body", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  try {
    const validated = uploadRequestSchema.parse(parsed.data);

    const safeName = sanitizeFilename(validated.filename);
    const key = `uploads/${Date.now()}-${randomUUID()}-${safeName}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: validated.fileType,
      ContentLength: validated.fileSize,
    });

    const uploadURL = await getSignedUrl(s3, command, { expiresIn: 60 });

    const fileURL = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

    return sendSuccess(
      {
        uploadURL,
        fileURL,
        key,
        expiresIn: 60,
      },
      "Pre-signed upload URL generated"
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return sendValidationError(err);
    }

    return sendError(
      "Failed to generate pre-signed URL",
      ERROR_CODES.INTERNAL_ERROR,
      500,
      err
    );
  }
}
