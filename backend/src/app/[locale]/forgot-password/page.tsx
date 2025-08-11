import { routing } from "@/i18n/routing";
import { Layout } from "@/components/layout";
import { ForgotPasswordClient } from "./client";

export const revalidate = 0;
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ForgotPassword({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  const content = {
    ru: {
      title: 'Восстановление пароля',
      subtitle: 'Введите ваш email адрес и мы отправим вам ссылку для восстановления пароля',
      emailLabel: 'Email адрес',
      sendResetButton: 'Отправить ссылку',
      backToSignIn: 'Вернуться к входу',
      successMessage: 'Ссылка для восстановления отправлена на ваш email',
      checkEmail: 'Проверьте вашу почту'
    },
    en: {
      title: 'Forgot Password',
      subtitle: 'Enter your email address and we\'ll send you a link to reset your password',
      emailLabel: 'Email Address',
      sendResetButton: 'Send Reset Link',
      backToSignIn: 'Back to Sign In',
      successMessage: 'Password reset link sent to your email',
      checkEmail: 'Check your email'
    }
  };

  const t = content[locale as 'ru' | 'en'];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-brand-light-purple via-white to-brand-light-green flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t.title}
            </h1>
            <p className="text-gray-600">
              {t.subtitle}
            </p>
          </div>

          {/* Forgot Password Form */}
          <ForgotPasswordClient content={t} locale={locale} />
        </div>
      </div>
    </Layout>
  );
}