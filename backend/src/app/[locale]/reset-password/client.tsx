"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/auth-client";
import { CustomButton } from "@/components/ui/custom-button";

interface ResetPasswordClientProps {
  content: {
    title: string;
    subtitle: string;
    passwordLabel: string;
    confirmPasswordLabel: string;
    resetButton: string;
    backToSignIn: string;
    successMessage: string;
    passwordMismatch: string;
    passwordTooShort: string;
    invalidToken: string;
    missingToken: string;
  };
  locale: string;
}

export function ResetPasswordClient({ content, locale }: ResetPasswordClientProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      setError(content.missingToken);
    } else {
      setToken(tokenParam);
    }
  }, [searchParams, content.missingToken]);

  const validateForm = () => {
    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return false;
    }

    if (password.length < 8) {
      setError(content.passwordTooShort);
      return false;
    }

    if (password !== confirmPassword) {
      setError(content.passwordMismatch);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setError(content.missingToken);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await authClient.resetPassword({
        newPassword: password,
        token: token,
      });

      if (result.error) {
        if (result.error.message?.includes('invalid') || result.error.message?.includes('expired')) {
          setError(content.invalidToken);
        } else {
          setError(result.error.message || "An error occurred while resetting password");
        }
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Failed to reset password. Please try again.");
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
          {content.successMessage}
        </h2>
        <p className="text-gray-600 mb-6">
          You can now sign in with your new password.
        </p>
        <CustomButton
          variant="primary"
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

        {/* New Password */}
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
            placeholder="Enter new password"
            disabled={loading || !token}
            required
            minLength={8}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            {content.confirmPasswordLabel}
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
            placeholder="Confirm new password"
            disabled={loading || !token}
            required
            minLength={8}
          />
        </div>

        {/* Reset Button */}
        <CustomButton
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={loading || !token}
        >
          {loading ? "Resetting..." : content.resetButton}
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