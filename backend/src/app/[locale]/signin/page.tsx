import { routing } from "@/i18n/routing";
import { Layout } from "@/components/layout";
import { SignInClient } from "./client";

export const revalidate = 0;
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function SignIn({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  const content = {
    ru: {
      title: 'Войти в аккаунт',
      subtitle: 'Добро пожаловать в MediaSchool.ai',
      googleButton: 'Войти через Google',
      emailLabel: 'Email',
      passwordLabel: 'Пароль',
      signInButton: 'Войти',
      forgotPassword: 'Забыли пароль?',
      noAccount: 'Нет аккаунта?',
      signUpLink: 'Зарегистрироваться',
      orDivider: 'или'
    },
    en: {
      title: 'Sign In',
      subtitle: 'Welcome back to MediaSchool.ai',
      googleButton: 'Sign in with Google',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      signInButton: 'Sign In',
      forgotPassword: 'Forgot password?',
      noAccount: 'Don\'t have an account?',
      signUpLink: 'Sign up',
      orDivider: 'or'
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

          {/* Sign In Form */}
          <SignInClient content={t} locale={locale} />
        </div>
      </div>
    </Layout>
  );
}
