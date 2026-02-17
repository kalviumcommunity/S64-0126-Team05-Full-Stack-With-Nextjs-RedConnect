"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import FormInput from "@/components/FormInput";
import { signupSchema, SignupInput } from "@/lib/schemas/authSchema";

/**
 * Signup Page Component
 *
 * Demonstrates React Hook Form + Zod validation:
 * 1. Schema-based validation (Zod)
 * 2. Reusable FormInput component
 * 3. Accessible form design
 * 4. Real API integration
 * 5. Error handling and loading states
 */
export default function SignupPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "DONOR",
    },
    mode: "onChange", // Validate on change for better UX
  });

  /**
   * Form submit handler
   * Sends validated data to API with toast feedback
   */
  const onSubmit = async (data: SignupInput) => {
    const toastId = toast.loading("Creating your account...");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Signup failed", {
          id: toastId,
          description: result.message || "Please try again with valid information.",
        });
        console.error("Signup error:", result);
        return;
      }

      toast.success("Account created successfully!", {
        id: toastId,
        description: "Redirecting to login...",
      });
      reset();

      // Redirect to login after 1.5 seconds
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error("Signup error", {
        id: toastId,
        description: errorMsg,
      });
      console.error("Signup request error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to RedConnect
          </h1>
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
            {/* Name Field */}
            <FormInput
              label="Full Name"
              type="text"
              placeholder="John Doe"
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
              placeholder="john@example.com"
              register={register("email")}
              error={errors.email}
              disabled={isSubmitting}
              required
              autoComplete="email"
            />

            {/* Password Field */}
            <FormInput
              label="Password"
              type="password"
              placeholder="••••••••"
              register={register("password")}
              error={errors.password}
              disabled={isSubmitting}
              required
              autoComplete="new-password"
            />

            {/* Role Select */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Type <span className="text-red-600">*</span>
              </label>
              <select
                {...register("role")}
                disabled={isSubmitting}
                className={`
                  w-full px-3 py-2 border rounded-md
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition-colors
                  border-gray-300 bg-white
                  ${isSubmitting ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""}
                `}
              >
                <option value="DONOR">Donor</option>
                <option value="HOSPITAL">Hospital</option>
                <option value="NGO">NGO</option>
                <option value="ADMIN">Admin</option>
              </select>
              {errors.role && (
                <p className="text-red-600 text-sm mt-1 font-medium">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full py-2 px-4 rounded-md font-medium text-white
                transition-colors duration-200
                ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                }
              `}
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Login here
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Form Tips */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-2">
            ℹ️ Validation Tips:
          </p>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Name must be at least 2 characters</li>
            <li>• Email must be a valid email format</li>
            <li>• Password must be at least 6 characters</li>
            <li>• Select your account type (Donor, Hospital, or Admin)</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
