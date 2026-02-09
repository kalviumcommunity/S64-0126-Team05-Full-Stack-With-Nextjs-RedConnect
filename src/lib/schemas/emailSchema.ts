import { z } from "zod";

export const emailRequestSchema = z
  .object({
    to: z.string().email("Recipient email is invalid"),
    subject: z
      .string()
      .min(1, "Subject is required")
      .max(200, "Subject too long"),
    message: z.string().min(1, "Message is required").optional(),
    template: z.enum(["welcome"]).optional(),
    userName: z.string().min(1, "User name is required").optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.message && !value.template) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide either message or template",
        path: ["message"],
      });
    }

    if (value.template === "welcome" && !value.userName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "userName is required for welcome template",
        path: ["userName"],
      });
    }
  });

export type EmailRequestInput = z.infer<typeof emailRequestSchema>;
