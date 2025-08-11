"use client";

import { useState } from "react";
import { authClient } from "@/auth-client";
import { CustomButton } from "@/components/ui/custom-button";
import { useRouter } from "next/navigation";
import Google from "./google";

interface SignInClientProps {
  content: {
    title: string;
    subtitle: string;
    googleButton: string;
    emailLabel: string;
    passwordLabel: string;
    signInButton: string;
    forgotPassword: string;
    noAccount: string;
    signUpLink: string;
    orDivider: string;
  };
  locale: string;
}

export function SignInClient({ content, locale }: SignInClientProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        // Redirect to home page or previous page
        router.push(`/${locale}`);
      }
    } catch {
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Google Sign In */}
      <div className="mb-6">
        <Google text={content.googleButton} />
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">{content.orDivider}</span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleEmailSignIn} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {content.emailLabel}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
            placeholder="your@email.com"
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            {content.passwordLabel}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
            placeholder="••••••••"
            disabled={loading}
          />
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <a
            href={`/${locale}/forgot-password`}
            className="text-sm text-brand-purple hover:text-purple-700 transition-colors"
          >
            {content.forgotPassword}
          </a>
        </div>

        {/* Sign In Button */}
        <CustomButton
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Signing in..." : content.signInButton}
        </CustomButton>
      </form>

      {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {content.noAccount}{" "}
          <a
            href={`/${locale}/signup`}
            className="text-brand-purple hover:text-purple-700 font-medium transition-colors"
          >
            {content.signUpLink}
          </a>
        </p>
      </div>
    </div>
  );
}