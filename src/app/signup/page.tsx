"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useAuthContext } from "@/context/AuthContext";

/* ── Icons ── */

function HeartLogoIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    );
}

function EyeIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function EyeOffIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );
}

function ShieldCheckIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}

function LockIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    );
}

/* ── Signup Page ── */

export default function SignupPage() {
    const router = useRouter();
    const { login } = useAuthContext();

    const [role, setRole] = useState<"Donor" | "Hospital" | "NGO">("Donor");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!fullName || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (!agreeTerms) {
            setError("Please agree to the Terms of Service and Privacy Policy.");
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            Cookies.set("token", "mock.jwt.token", { expires: 1 });
            login(email);
            setIsLoading(false);
            router.push("/dashboard");
        }, 800);
    };

    const roles: ("Donor" | "Hospital" | "NGO")[] = ["Donor", "Hospital", "NGO"];

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-background">
            {/* ── Left Panel: Image ── */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1200&q=80"
                    alt="Blood donation"
                    fill
                    className="object-cover"
                    sizes="50vw"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-14 text-white z-10">
                    <div className="flex items-center gap-2 mb-6">
                        <HeartLogoIcon className="w-8 h-8 text-red-500" />
                        <span className="text-xl font-bold">RedConnect</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
                        Every drop counts.
                    </h2>
                    <p className="text-white/80 text-base lg:text-lg max-w-md">
                        Join thousands of donors and healthcare providers making a difference every day.
                    </p>
                </div>
            </div>

            {/* ── Right Panel: Form ── */}
            <div className="flex-1 flex items-center justify-center px-6 py-10 lg:px-16">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="flex items-center gap-2 mb-8 lg:hidden">
                        <HeartLogoIcon className="w-7 h-7 text-red-600" />
                        <span className="text-lg font-bold text-foreground">RedConnect</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                        Create your account
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        Sign up to start saving lives.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Role Selector */}
                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-3">
                                Select your role
                            </label>
                            <div className="flex rounded-lg border border-card-border overflow-hidden">
                                {roles.map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => setRole(r)}
                                        className={`flex-1 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer ${role === r
                                                ? "bg-red-600 text-white shadow-sm"
                                                : "bg-card-bg text-muted-foreground hover:bg-muted"
                                            }`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-semibold text-foreground mb-2">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 rounded-lg border border-card-border bg-card-bg text-foreground
                  placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500
                  focus:border-transparent transition"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full px-4 py-3 rounded-lg border border-card-border bg-card-bg text-foreground
                  placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500
                  focus:border-transparent transition"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Minimum 6 characters"
                                    className="w-full px-4 py-3 pr-12 rounded-lg border border-card-border bg-card-bg text-foreground
                    placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500
                    focus:border-transparent transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition cursor-pointer"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-foreground mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter your password"
                                    className="w-full px-4 py-3 pr-12 rounded-lg border border-card-border bg-card-bg text-foreground
                    placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500
                    focus:border-transparent transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition cursor-pointer"
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-2">
                            <input
                                id="agree-terms"
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                className="w-4 h-4 mt-0.5 rounded border-card-border text-red-600 focus:ring-red-500 accent-red-600"
                            />
                            <label htmlFor="agree-terms" className="text-sm text-muted-foreground">
                                I agree to the{" "}
                                <Link href="#" className="text-red-600 hover:underline">Terms of Service</Link>
                                {" "}and{" "}
                                <Link href="#" className="text-red-600 hover:underline">Privacy Policy</Link>
                            </label>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
                                {error}
                            </p>
                        )}

                        {/* Sign Up Button */}
                        <button
                            id="sign-up-button"
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 rounded-xl bg-red-600 text-white font-semibold text-base
                hover:bg-red-700 focus:ring-4 focus:ring-red-500/30 transition-all duration-200
                disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-red-600/20 cursor-pointer"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Creating account...
                                </span>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-card-border" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-card-border" />
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-sm text-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-red-600 hover:text-red-700 font-semibold transition">
                            Sign In
                        </Link>
                    </p>

                    {/* Security Badges */}
                    <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-card-border">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Secure Access</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <LockIcon className="w-5 h-5 text-blue-600" />
                            <span className="text-xs font-semibold uppercase tracking-wider">HIPAA Compliant</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
