import { routing } from "@/i18n/routing";
import { Layout } from "@/components/layout";
import { SignUpClient } from "./client";

export const revalidate = 0;
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function SignUp({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  const content = {
    ru: {
      title: 'Создать аккаунт',
      subtitle: 'Присоединяйтесь к MediaSchool.ai',
      googleButton: 'Регистрация через Google',
      nameLabel: 'Полное имя',
      emailLabel: 'Email',
      passwordLabel: 'Пароль',
      confirmPasswordLabel: 'Подтвердите пароль',
      signUpButton: 'Создать аккаунт',
      haveAccount: 'Уже есть аккаунт?',
      signInLink: 'Войти',
      orDivider: 'или',
      terms: 'Создавая аккаунт, вы соглашаетесь с нашими',
      termsLink: 'Условиями использования',
      andPrivacy: 'и',
      privacyLink: 'Политикой конфиденциальности'
    },
    en: {
      title: 'Create Account',
      subtitle: 'Join MediaSchool.ai today',
      googleButton: 'Sign up with Google',
      nameLabel: 'Full Name',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      confirmPasswordLabel: 'Confirm Password',
      signUpButton: 'Create Account',
      haveAccount: 'Already have an account?',
      signInLink: 'Sign in',
      orDivider: 'or',
      terms: 'By creating an account, you agree to our',
      termsLink: 'Terms of Service',
      andPrivacy: 'and',
      privacyLink: 'Privacy Policy'
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

          {/* Sign Up Form */}
          <SignUpClient content={t} locale={locale} />
        </div>
      </div>
    </Layout>
  );
}