"use client";

import { useState } from "react";
import { authClient } from "@/auth-client";
import { CustomButton } from "@/components/ui/custom-button";

interface ForgotPasswordClientProps {
  content: {
    title: string;
    subtitle: string;
    emailLabel: string;
    sendResetButton: string;
    backToSignIn: string;
    successMessage: string;
    checkEmail: string;
  };
  locale: string;
}

export function ForgotPasswordClient({ content, locale }: ForgotPasswordClientProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await authClient.forgetPassword({
        email,
        redirectTo: `/${locale}/reset-password`,
      });

      if (result.error) {
        setError(result.error.message || "An error occurred while sending reset email");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-brand-green to-brand-green-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {content.checkEmail}
        </h2>
        <p className="text-gray-600 mb-6">
          {content.successMessage}
        </p>
        <CustomButton
          variant="outline"
          href={`/${locale}/signin`}
          className="w-full"
        >
          {content.backToSignIn}
        </CustomButton>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
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
            required
          />
        </div>

        {/* Send Reset Button */}
        <CustomButton
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Sending..." : content.sendResetButton}
        </CustomButton>
      </form>

      {/* Back to Sign In Link */}
      <div className="mt-6 text-center">
        <a
          href={`/${locale}/signin`}
          className="text-sm text-brand-purple hover:text-purple-700 transition-colors"
        >
          {content.backToSignIn}
        </a>
      </div>
    </div>
  );
}