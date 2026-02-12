"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/FormInput";

/**
 * Contact Form Schema
 * Validates contact information
 */
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Contact Form Component
 *
 * Demonstrates:
 * - Reusable FormInput component
 * - Textarea field with React Hook Form
 * - Schema validation with Zod
 * - Character counter for better UX
 * - Optimistic success handling
 */
export default function ContactPage() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitSuccess(true);
      reset();
      setCharCount(0);

      // Clear success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  // Simulate character input
  const handleMessageChange = (value: string) => {
    setCharCount(value.length);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Have questions about RedConnect? We&apos;d love to hear from you!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
                {/* Success Message */}
                {submitSuccess && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="text-green-800 font-bold mb-1">Message Sent! ✅</h3>
                    <p className="text-green-700 text-sm">
                      Thank you for contacting RedConnect. We&apos;ll get back to you soon.
                    </p>
                  </div>
                )}

                {/* Name Field */}
                <FormInput
                  label="Your Name"
                  type="text"
                  placeholder="Jane Smith"
                  register={register("name")}
                  error={errors.name}
                  disabled={isSubmitting}
                  required
                  autoComplete="name"
                />

                {/* Email Field */}
                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="jane@example.com"
                  register={register("email")}
                  error={errors.email}
                  disabled={isSubmitting}
                  required
                  autoComplete="email"
                />

                {/* Message Textarea */}
                <div className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Message <span className="text-red-600">*</span>
                    </label>
                    <span
                      className={`text-xs font-medium ${
                        charCount > 1000
                          ? "text-red-600"
                          : charCount > 800
                            ? "text-orange-600"
                            : "text-gray-500"
                      }`}
                    >
                      {charCount}/1000
                    </span>
                  </div>
                  <textarea
                    {...register("message")}
                    placeholder="Tell us how we can help..."
                    disabled={isSubmitting}
                    onChange={(e) => {
                      handleMessageChange(e.target.value);
                    }}
                    className={`
                      w-full px-3 py-2 border rounded-md
                      focus:outline-none focus:ring-2 focus:ring-green-500
                      transition-colors resize-none
                      h-32
                      ${errors.message ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"}
                      ${isSubmitting ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""}
                    `}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="text-red-600 text-sm mt-1 font-medium"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full py-3 px-4 rounded-md font-semibold text-white
                    transition-all duration-200
                    ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 active:bg-green-800 shadow-md hover:shadow-lg"
                    }
                  `}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <a
                    href="mailto:support@redconnect.io"
                    className="text-green-600 hover:text-green-700 break-all"
                  >
                    support@redconnect.io
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                  <a
                    href="tel:+1234567890"
                    className="text-green-600 hover:text-green-700"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Hours</h3>
                  <p className="text-gray-600 text-sm">
                    Monday - Friday: 9 AM - 6 PM IST
                  </p>
                </div>
              </div>
            </div>

            {/* Form Features */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-bold text-green-900 mb-3">
                ✨ Form Features
              </h3>
              <ul className="text-sm text-green-800 space-y-2">
                <li>✅ Real-time validation</li>
                <li>✅ Accessible form fields</li>
                <li>✅ Character counter</li>
                <li>✅ Error messages</li>
                <li>✅ Loading states</li>
                <li>✅ Success feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
