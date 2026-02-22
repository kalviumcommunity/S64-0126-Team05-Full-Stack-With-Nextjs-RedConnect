"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";

// Signup Schema - using Zod for validation
const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
  role: z.enum(["DONOR", "HOSPITAL"]),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "DONOR",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setServerError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/login");
      } else {
        setServerError(result.message || "Signup failed. Please try again.");
      }
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    { value: "DONOR", label: "Donor" },
    { value: "HOSPITAL", label: "Hospital" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">RedConnect</h1>
          <p className="text-gray-600 mt-2">Create Your Account</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sign Up</h2>

          {/* Server Error Message */}
          {serverError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Full Name"
              type="text"
              name="name"
              placeholder="Enter your full name"
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

            <FormInput
              label="Password"
              type="password"
              name="password"
              placeholder="Create a password"
              register={register("password")}
              error={errors.password?.message}
              required
            />

            <FormSelect
              label="Account Type"
              name="role"
              options={roleOptions}
              register={register("role")}
              error={errors.role?.message}
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
