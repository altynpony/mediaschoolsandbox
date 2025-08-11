"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/auth-client";
import { CustomButton } from "@/components/ui/custom-button";
import { useRouter } from "next/navigation";

interface ProfileClientProps {
  content: {
    title: string;
    personalInfo: string;
    nameLabel: string;
    emailLabel: string;
    passwordSection: string;
    currentPasswordLabel: string;
    newPasswordLabel: string;
    confirmPasswordLabel: string;
    updateProfileButton: string;
    updatePasswordButton: string;
    subscriptionSection: string;
    currentPlan: string;
    managePlan: string;
    enrolledCourses: string;
    noCourses: string;
    browseCourses: string;
    signOut: string;
  };
  locale: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export function ProfileClient({ content, locale, user }: ProfileClientProps) {
  const [profileData, setProfileData] = useState({
    name: user.name || "",
    email: user.email || ""
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState({
    profile: false,
    password: false,
    signOut: false
  });
  const [errors, setErrors] = useState({
    profile: "",
    password: ""
  });
  const [success, setSuccess] = useState({
    profile: "",
    password: ""
  });
  const router = useRouter();

  // Fetch user data on component mount
  useEffect(() => {
    fetchEnrolledCourses();
    fetchSubscription();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await fetch('/api/enroll', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.enrollments) {
        setEnrolledCourses(data.enrollments);
      }
    } catch (error) {
      console.error('Failed to fetch enrolled courses:', error);
    }
  };

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscription', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.subscription) {
        setSubscription(data.subscription);
      }
    } catch (error) {
      console.error('Failed to fetch subscription:', error);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading({ ...loading, profile: true });
    setErrors({ ...errors, profile: "" });
    setSuccess({ ...success, profile: "" });

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        setSuccess({ ...success, profile: "Profile updated successfully!" });
      } else {
        const data = await response.json();
        setErrors({ ...errors, profile: data.error || "Failed to update profile" });
      }
    } catch (error) {
      setErrors({ ...errors, profile: "Failed to update profile" });
    } finally {
      setLoading({ ...loading, profile: false });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrors({ ...errors, password: "Passwords do not match" });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setErrors({ ...errors, password: "Password must be at least 8 characters long" });
      return;
    }

    setLoading({ ...loading, password: true });
    setErrors({ ...errors, password: "" });
    setSuccess({ ...success, password: "" });

    try {
      const response = await fetch('/api/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(passwordData),
      });

      if (response.ok) {
        setSuccess({ ...success, password: "Password changed successfully!" });
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } else {
        const data = await response.json();
        setErrors({ ...errors, password: data.error || "Failed to change password" });
      }
    } catch (error) {
      setErrors({ ...errors, password: "Failed to change password" });
    } finally {
      setLoading({ ...loading, password: false });
    }
  };

  const handleSignOut = async () => {
    setLoading({ ...loading, signOut: true });
    try {
      await authClient.signOut();
      router.push(`/${locale}`);
    } catch (error) {
      console.error('Failed to sign out:', error);
    } finally {
      setLoading({ ...loading, signOut: false });
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Personal Information Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {content.personalInfo}
        </h2>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          {errors.profile && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">{errors.profile}</p>
            </div>
          )}
          {success.profile && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-700 text-sm">{success.profile}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {content.nameLabel}
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                disabled={loading.profile}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {content.emailLabel}
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                disabled={loading.profile}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <CustomButton
              type="submit"
              variant="primary"
              disabled={loading.profile}
            >
              {loading.profile ? "Updating..." : content.updateProfileButton}
            </CustomButton>
          </div>
        </form>
      </section>

      {/* Password Change Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {content.passwordSection}
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          {errors.password && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">{errors.password}</p>
            </div>
          )}
          {success.password && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-700 text-sm">{success.password}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {content.currentPasswordLabel}
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                disabled={loading.password}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {content.newPasswordLabel}
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                disabled={loading.password}
                minLength={8}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {content.confirmPasswordLabel}
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                disabled={loading.password}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <CustomButton
              type="submit"
              variant="secondary"
              disabled={loading.password}
            >
              {loading.password ? "Changing..." : content.updatePasswordButton}
            </CustomButton>
          </div>
        </form>
      </section>

      {/* Subscription Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {content.subscriptionSection}
        </h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{content.currentPlan}</p>
              <p className="font-semibold text-gray-900">
                {subscription?.planType || 'Free'} Plan
              </p>
            </div>
            <CustomButton
              variant="outline"
              href={`/${locale}/subscription`}
            >
              {content.managePlan}
            </CustomButton>
          </div>
        </div>
      </section>

      {/* Enrolled Courses Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {content.enrolledCourses}
        </h2>
        {enrolledCourses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">{content.noCourses}</p>
            <CustomButton
              variant="primary"
              href={`/${locale}/courses`}
            >
              {content.browseCourses}
            </CustomButton>
          </div>
        ) : (
          <div className="space-y-3">
            {enrolledCourses.map((enrollment: any) => (
              <div key={enrollment.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900">{enrollment.courseTitle || 'Course'}</h3>
                <p className="text-sm text-gray-600">Enrolled on {new Date(enrollment.enrolledAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sign Out Section */}
      <section className="border-t border-gray-200 pt-8">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Account Actions</h3>
            <p className="text-sm text-gray-600">Sign out of your account</p>
          </div>
          <CustomButton
            onClick={handleSignOut}
            variant="ghost"
            disabled={loading.signOut}
            className="text-red-600 hover:text-red-700"
          >
            {loading.signOut ? "Signing out..." : content.signOut}
          </CustomButton>
        </div>
      </section>
    </div>
  );
}