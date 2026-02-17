"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";

// Contact Form Schema - using Zod for validation
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      // Simulate API call (in real app, this would be a real API endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Contact Form Submitted:", data);
      setSubmitStatus("success");
      setStatusMessage("Thank you for your message! We will get back to you soon.");

      // Reset form
      reset();
    } catch {
      setSubmitStatus("error");
      setStatusMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setSubmitStatus("idle");
    setStatusMessage("");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-600 mt-2">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-700">{statusMessage}</p>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p className="text-red-600">{statusMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Your Name"
                type="text"
                name="name"
                placeholder="Enter your name"
                register={register("name")}
                error={errors.name?.message}
                required
              />

              <FormInput
                label="Email Address"
                type="email"
                name="email"
                placeholder="Enter your email"
                register={register("email")}
                error={errors.email?.message}
                required
              />
            </div>

            <FormInput
              label="Subject"
              type="text"
              name="subject"
              placeholder="What is this about?"
              register={register("subject")}
              error={errors.subject?.message}
              required
            />

            <FormTextarea
              label="Message"
              name="message"
              placeholder="Write your message here..."
              register={register("message")}
              error={errors.message?.message}
              required
              rows={5}
            />

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                disabled={isSubmitting}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Address</h3>
            <p className="text-gray-600 text-sm mt-1">
              123 Blood Bank Street<br />
              Mumbai, Maharashtra 400001
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Email</h3>
            <p className="text-gray-600 text-sm mt-1">
              contact@redconnect.in<br />
              support@redconnect.in
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Phone</h3>
            <p className="text-gray-600 text-sm mt-1">
              +91 98765 43210<br />
              +91 22 2345 6789
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

