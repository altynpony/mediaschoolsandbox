"use client";

import { CustomButton } from "@/components/ui/custom-button";
import { useState, useEffect } from "react";
import { authClient } from "@/auth-client";

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface Plans {
  basic: Plan;
  pro: Plan;
  enterprise: Plan;
}

interface SubscriptionClientProps {
  plans: Plans;
  locale: string;
}

export function SubscriptionClient({ plans, locale }: SubscriptionClientProps) {
  const { data: session } = authClient.useSession();
  const [currentSubscription, setCurrentSubscription] = useState<{planType: string, status: string, endDate?: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState<string | null>(null);

  // Fetch current subscription status
  useEffect(() => {
    if (session?.user) {
      fetch('/api/subscribe', {
        credentials: 'include'
      })
      .then(res => res.json())
      .then(data => {
        if (data.hasSubscription) {
          setCurrentSubscription(data.subscription);
        }
      })
      .catch(err => console.error('Failed to fetch subscription:', err))
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [session]);

  const handleSubscribe = async (planType: string) => {
    if (!session?.user) {
      // Redirect to sign in
      window.location.href = `/${locale}/signin`;
      return;
    }

    setSubscribing(planType);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          planType,
          // In a real app, you'd integrate with Stripe here
          // stripeSubscriptionId: 'sub_xxxxxxxxx'
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Success! Refresh subscription status
        setCurrentSubscription(data.subscription);
        alert(`Successfully subscribed to ${planType} plan!`);
        // In a real app, redirect to course dashboard
        window.location.href = `/${locale}/courses`;
      } else {
        alert(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to process subscription');
    } finally {
      setSubscribing(null);
    }
  };

  const isCurrentPlan = (planType: string) => {
    return currentSubscription?.planType === planType && currentSubscription?.status === 'active';
  };

  const renderPlan = (planKey: keyof Plans, isPopular = false) => {
    const plan = plans[planKey];
    const planType = planKey;
    const isCurrent = isCurrentPlan(planType);
    const isSubscribing = subscribing === planType;

    return (
      <div 
        key={planKey}
        className={`relative rounded-2xl border-2 p-8 transition-all hover:shadow-xl ${
          isPopular 
            ? 'border-brand-purple bg-gradient-to-b from-brand-light-purple/20 to-white scale-105' 
            : 'border-gray-200 bg-white'
        }`}
      >
        {isPopular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-brand-purple text-white px-4 py-2 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
        )}
        
        {isCurrent && (
          <div className="absolute -top-4 right-4">
            <span className="bg-brand-green text-white px-4 py-2 rounded-full text-sm font-medium">
              Current Plan
            </span>
          </div>
        )}

        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          <div className="mb-4">
            <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
            <span className="text-gray-600 ml-2">/month</span>
          </div>
          <p className="text-gray-600">{plan.description}</p>
        </div>

        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 text-brand-green mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="text-center">
          {isCurrent ? (
            <CustomButton variant="secondary" size="lg" className="w-full" disabled>
              Active Plan
            </CustomButton>
          ) : (
            <CustomButton 
              variant={isPopular ? "primary" : "outline"} 
              size="lg" 
              className="w-full"
              onClick={() => handleSubscribe(planType)}
              disabled={isSubscribing || loading}
            >
              {isSubscribing ? 'Processing...' : `Choose ${plan.name}`}
            </CustomButton>
          )}
        </div>
      </div>
    );
  };

  if (!session?.user) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-brand-light-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Sign In to Subscribe</h3>
          <p className="text-gray-600 mb-8">
            Create an account or sign in to choose your learning plan.
          </p>
          <CustomButton variant="primary" size="lg" href={`/${locale}/signin`}>
            Sign In to Continue
          </CustomButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Current Subscription Status */}
      {currentSubscription && (
        <div className="mb-12 p-6 bg-brand-light-green/20 rounded-2xl border border-brand-green/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Current Subscription: {currentSubscription.planType.charAt(0).toUpperCase() + currentSubscription.planType.slice(1)}
              </h3>
              <p className="text-gray-600">
                Status: <span className="font-medium text-brand-green">{currentSubscription.status}</span>
                {currentSubscription.endDate && (
                  <span className="ml-4">
                    Renews: {new Date(currentSubscription.endDate).toLocaleDateString()}
                  </span>
                )}
              </p>
            </div>
            <div className="text-right">
              <CustomButton variant="outline" size="sm" href={`/${locale}/courses`}>
                Go to Courses
              </CustomButton>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {renderPlan('basic')}
        {renderPlan('pro', true)}
        {renderPlan('enterprise')}
      </div>

      {/* FAQ Section */}
      <div className="mt-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can I change plans anytime?
            </h3>
            <p className="text-gray-600">
              Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we&apos;ll prorate any differences.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-600">
              We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Do you offer refunds?
            </h3>
            <p className="text-gray-600">
              We offer a 30-day money-back guarantee for all plans. If you&apos;re not satisfied, we&apos;ll refund your subscription.
            </p>
          </div>
        </div>
      </div>

      {/* Support Contact */}
      <div className="mt-16 text-center p-8 bg-gray-50 rounded-2xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Need help choosing a plan?
        </h3>
        <p className="text-gray-600 mb-6">
          Our team is here to help you find the perfect learning solution.
        </p>
        <CustomButton variant="outline" href={`/${locale}/chat`}>
          Chat with Support
        </CustomButton>
      </div>
    </div>
  );
}