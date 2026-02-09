import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { ZodError } from "zod";

import { safeJson } from "@/lib/api";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";
import { sendValidationError } from "@/lib/validationUtils";
import { emailRequestSchema } from "@/lib/schemas/emailSchema";
import { welcomeTemplate } from "@/lib/emailTemplates";
import { logger } from "@/lib/logger";

const REGION = process.env.AWS_REGION;
const SENDER = process.env.SES_EMAIL_SENDER;

const ses = new SESClient({
  region: REGION,
  credentials: process.env.AWS_ACCESS_KEY_ID
    ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      }
    : undefined,
});

function buildHtmlMessage(input: {
  message?: string;
  template?: "welcome";
  userName?: string;
}) {
  if (input.template === "welcome") {
    return welcomeTemplate(input.userName || "there");
  }
  return input.message || "";
}

export async function POST(req: Request) {
  if (!REGION || !SENDER) {
    return sendError(
      "Email configuration missing",
      ERROR_CODES.INTERNAL_ERROR,
      500
    );
  }

  const parsed = await safeJson(req);
  if (!parsed.ok) {
    return sendError("Invalid JSON body", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  try {
    const validated = emailRequestSchema.parse(parsed.data);
    const htmlMessage = buildHtmlMessage(validated);

    const command = new SendEmailCommand({
      Destination: { ToAddresses: [validated.to] },
      Message: {
        Body: {
          Html: { Charset: "UTF-8", Data: htmlMessage },
        },
        Subject: { Charset: "UTF-8", Data: validated.subject },
      },
      Source: SENDER,
    });

    const response = await ses.send(command);

    logger.info("Email sent", {
      messageId: response.MessageId,
      to: validated.to,
      subject: validated.subject,
    });

    return sendSuccess(
      { messageId: response.MessageId },
      "Email sent successfully"
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return sendValidationError(err);
    }

    logger.error("Email send failed", { message: (err as Error).message });
    return sendError(
      "Email send failed",
      ERROR_CODES.INTERNAL_ERROR,
      500,
      err
    );
  }
}
