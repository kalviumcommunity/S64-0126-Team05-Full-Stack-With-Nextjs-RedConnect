"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";

/* -------------------- */
/* Validation Schema    */
/* -------------------- */

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .max(100, "Email must be less than 100 characters"),

  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be less than 200 characters"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [charCount, setCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  /* -------------------- */
  /* Submit Handler       */
  /* -------------------- */

  const onSubmit = async (data: ContactFormData) => {
    const toastId = toast.loading("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send");

      toast.success("Message sent successfully!", {
        id: toastId,
        description: "We’ll get back to you soon.",
      });

      reset();
      setCharCount(0);
    } catch (error) {
      console.error(error);

      toast.error("Failed to send message", {
        id: toastId,
        description: "Please try again later.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-600 mt-2">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput
                label="Your Name"
                type="text"
                register={register("name")}
                error={errors.name?.message}
                required
                disabled={isSubmitting}
              />

              <FormInput
                label="Email"
                type="email"
                register={register("email")}
                error={errors.email?.message}
                required
                disabled={isSubmitting}
              />
            </div>

            <FormInput
              label="Subject"
              type="text"
              register={register("subject")}
              error={errors.subject?.message}
              required
              disabled={isSubmitting}
            />

            <div className="relative">
              <FormTextarea
                label="Message"
                register={register("message")}
                error={errors.message?.message}
                required
                rows={5}
                disabled={isSubmitting}
                onChange={(e) =>
                  setCharCount(e.target.value.length)
                }
              />

              <div
                className={`text-xs text-right mt-1 ${
                  charCount > 900
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {charCount}/1000
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-6 py-3 rounded-md font-semibold text-white transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}