import { routing } from "@/i18n/routing";
import { Layout } from "@/components/layout";
import { ProfileClient } from "./client";
import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";
import { headers } from "next/headers";

export const revalidate = 0;
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Profile({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect({href: '/signin', locale: locale});
  }

  const content = {
    ru: {
      title: 'Профиль',
      personalInfo: 'Личная информация',
      nameLabel: 'Полное имя',
      emailLabel: 'Email адрес',
      passwordSection: 'Изменить пароль',
      currentPasswordLabel: 'Текущий пароль',
      newPasswordLabel: 'Новый пароль',
      confirmPasswordLabel: 'Подтвердите пароль',
      updateProfileButton: 'Обновить профиль',
      updatePasswordButton: 'Изменить пароль',
      subscriptionSection: 'Подписка',
      currentPlan: 'Текущий план',
      managePlan: 'Управление планом',
      enrolledCourses: 'Записанные курсы',
      noCourses: 'У вас нет записей на курсы',
      browseCourses: 'Обзор курсов',
      signOut: 'Выйти'
    },
    en: {
      title: 'Profile',
      personalInfo: 'Personal Information',
      nameLabel: 'Full Name',
      emailLabel: 'Email Address',
      passwordSection: 'Change Password',
      currentPasswordLabel: 'Current Password',
      newPasswordLabel: 'New Password',
      confirmPasswordLabel: 'Confirm Password',
      updateProfileButton: 'Update Profile',
      updatePasswordButton: 'Change Password',
      subscriptionSection: 'Subscription',
      currentPlan: 'Current Plan',
      managePlan: 'Manage Plan',
      enrolledCourses: 'Enrolled Courses',
      noCourses: 'You are not enrolled in any courses',
      browseCourses: 'Browse Courses',
      signOut: 'Sign Out'
    }
  };

  const t = content[locale as 'ru' | 'en'];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg">
            {/* Header */}
            <div className="border-b border-gray-200 px-8 py-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {t.title}
              </h1>
            </div>

            {/* Profile Content */}
            {session?.user && <ProfileClient content={t} locale={locale} user={session.user} />}
          </div>
        </div>
      </div>
    </Layout>
  );
}
