import { routing } from "@/i18n/routing";
import { Layout } from "@/components/layout";
import { SubscriptionClient } from "./client";
import { Suspense } from "react";

export const revalidate = 86400; // 1 day
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Subscription({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  const content = {
    ru: {
      hero: {
        title: 'Гибкие тарифы с мгновенным доступом',
        subtitle: 'Выберите план, который подходит именно вам. Отменить можно в любой момент.'
      },
      plans: {
        basic: {
          name: 'Базовый',
          price: '29',
          description: 'Идеально для начинающих',
          features: [
            'Доступ к записанным курсам',
            'Сообщество учеников',
            'Базовая поддержка',
            'Сертификаты о прохождении'
          ]
        },
        pro: {
          name: 'Профессиональный',
          price: '79',
          description: 'Лучший выбор для профессионалов',
          features: [
            'Все возможности Базового',
            'Живые занятия с экспертами',
            'Приоритетная поддержка',
            'Практические воркшопы',
            'Индивидуальные консультации'
          ]
        },
        enterprise: {
          name: 'Корпоративный',
          price: '199',
          description: 'Для команд и организаций',
          features: [
            'Все возможности Профессионального',
            'Корпоративная панель управления',
            'Кастомизированное обучение',
            'Выделенный менеджер аккаунта',
            'Корпоративные сертификаты'
          ]
        }
      }
    },
    en: {
      hero: {
        title: 'Flexible plans with instant access',
        subtitle: 'Choose the plan that fits your needs. Cancel anytime.'
      },
      plans: {
        basic: {
          name: 'Basic',
          price: '29',
          description: 'Perfect for getting started',
          features: [
            'Access to recorded courses',
            'Student community',
            'Basic support',
            'Course certificates'
          ]
        },
        pro: {
          name: 'Professional',
          price: '79',
          description: 'Best choice for professionals',
          features: [
            'Everything in Basic',
            'Live sessions with experts',
            'Priority support',
            'Hands-on workshops',
            'Personal consultations'
          ]
        },
        enterprise: {
          name: 'Enterprise',
          price: '199',
          description: 'For teams and organizations',
          features: [
            'Everything in Professional',
            'Corporate dashboard',
            'Custom training programs',
            'Dedicated account manager',
            'Corporate certificates'
          ]
        }
      }
    }
  }
  
  const t = content[locale as 'ru'|'en']

  return (
    <Layout>
      <div className="bg-white">
        {/* Header */}
        <section className="py-20 bg-gradient-to-br from-brand-light-purple via-white to-brand-light-green">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t.hero.title}
            </h1>
            <p className="text-xl text-gray-700">
              {t.hero.subtitle}
            </p>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <Suspense fallback={
              <div className="grid md:grid-cols-3 gap-8">
                {[1,2,3].map(i => (
                  <div key={i} className="animate-pulse border rounded-2xl p-8">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-6"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            }>
              <SubscriptionClient plans={t.plans} locale={locale} />
            </Suspense>
          </div>
        </section>
      </div>
    </Layout>
  );
}