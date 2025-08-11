import { routing } from "@/i18n/routing";
import { Layout } from "@/components/layout";
import { ResetPasswordClient } from "./client";

export const revalidate = 0;
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ResetPassword({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  const content = {
    ru: {
      title: 'Сброс пароля',
      subtitle: 'Введите новый пароль для вашего аккаунта',
      passwordLabel: 'Новый пароль',
      confirmPasswordLabel: 'Подтвердите пароль',
      resetButton: 'Сбросить пароль',
      backToSignIn: 'Вернуться к входу',
      successMessage: 'Пароль успешно изменен',
      passwordMismatch: 'Пароли не совпадают',
      passwordTooShort: 'Пароль должен содержать минимум 8 символов',
      invalidToken: 'Недействительная или устаревшая ссылка',
      missingToken: 'Отсутствует токен сброса пароля'
    },
    en: {
      title: 'Reset Password',
      subtitle: 'Enter a new password for your account',
      passwordLabel: 'New Password',
      confirmPasswordLabel: 'Confirm Password',
      resetButton: 'Reset Password',
      backToSignIn: 'Back to Sign In',
      successMessage: 'Password successfully reset',
      passwordMismatch: 'Passwords do not match',
      passwordTooShort: 'Password must be at least 8 characters',
      invalidToken: 'Invalid or expired reset link',
      missingToken: 'Missing password reset token'
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

          {/* Reset Password Form */}
          <ResetPasswordClient content={t} locale={locale} />
        </div>
      </div>
    </Layout>
  );
}