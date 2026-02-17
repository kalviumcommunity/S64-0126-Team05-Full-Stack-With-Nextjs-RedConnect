"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type UserRole = "DONOR" | "HOSPITAL" | "NGO";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>("DONOR");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Signing in...");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: selectedRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Login failed", {
          id: toastId,
          description: data.message || "Invalid email or password",
        });
        return;
      }

      if (data.data?.token) {
        localStorage.setItem("token", data.data.token);
      }

      toast.success("Welcome back!", {
        id: toastId,
        description: `Logged in as ${selectedRole}`,
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch {
      toast.error("Connection error", {
        id: toastId,
        description: "Please check your connection and try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-brand-DEFAULT rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-8 -right-10 w-96 h-96 bg-brand-light rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-DEFAULT rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">●</span>
            </div>
            <span className="font-bold text-xl">RedConnect</span>
          </Link>

          <div className="space-y-4">
            <h2 className="text-5xl font-bold leading-tight">Your blood is a miracle.</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Be the reason for someone&apos;s heartbeat today. Join our network of life-savers and healthcare providers.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to RedConnect
            </h1>
            <p className="text-gray-600">
              Log in to manage your impact and inventory
            </p>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              Select your role
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["DONOR", "HOSPITAL", "NGO"].map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role as UserRole)}
                  className={`
                    py-2.5 px-4 rounded-lg font-medium text-sm transition
                    ${selectedRole === role
                      ? "bg-brand-DEFAULT text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }
                  `}
                >
                  {role === "NGO" ? "NGO" : role}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT transition"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <Link href="#" className="text-xs text-brand-DEFAULT hover:text-brand-dark">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-DEFAULT hover:bg-brand-dark text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-600">
                OR
              </span>
            </div>
          </div>

          <p className="text-center text-gray-700">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-brand-DEFAULT hover:text-brand-dark">
              Sign Up
            </Link>
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <span>🔒</span> SECURE ACCESS
            </div>
            <div className="flex items-center gap-1">
              <span>✓</span> HIPAA COMPLIANT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
