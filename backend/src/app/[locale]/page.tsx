import { routing } from "@/i18n/routing";
import { Layout } from "@/components/layout";
import { CustomButton } from "@/components/ui/custom-button";

export const revalidate = 86400; // 1 day
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  const content = {
    ru: {
      hero: {
        title: 'Создавайте. Исследуйте. Используйте AI как хочется',
        subtitle: 'Курсы, воркшопы и инструменты для тех, кто хочет применять AI в любой сфере: журналистика, видео, дизайн и многое другое.',
        cta: 'Начать обучение',
        learnMore: 'Узнать больше'
      }
    },
    en: {
      hero: {
        title: 'Create. Explore. Use AI on your terms',
        subtitle: 'Courses, workshops and tools for those who want to use AI consciously - in journalism, video, design and beyond.',
        cta: 'Start Learning',
        learnMore: 'Learn More'
      }
    }
  }
  
  const t = content[locale as 'ru'|'en']

  return (
    <Layout>
      {/* Hero Section with Decorative Elements */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-light-purple via-white to-brand-light-green relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="decorative-circle absolute top-20 left-10 w-20 h-20 bg-brand-purple/20 rounded-full blur-xl"></div>
          <div className="decorative-circle absolute top-40 right-20 w-32 h-32 bg-brand-green/20 rounded-full blur-xl" style={{animationDelay: '2s'}}></div>
          <div className="decorative-circle absolute bottom-40 left-20 w-24 h-24 bg-brand-light-purple/30 rounded-full blur-xl" style={{animationDelay: '4s'}}></div>
          <div className="decorative-circle absolute bottom-20 right-10 w-16 h-16 bg-brand-light-green/40 rounded-full blur-xl" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-brand-neutral-dark mb-8 leading-tight">
              {locale === 'en' ? 'AI Mastery in good company' : 'Мастерство ИИ в хорошей компании'}
            </h1>
            <p className="text-xl md:text-2xl text-brand-neutral mb-12 leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CustomButton variant="primary" size="lg" href="/subscription">
                {t.hero.cta}
              </CustomButton>
              <CustomButton variant="secondary" size="lg" href="/courses">
                {t.hero.learnMore}
              </CustomButton>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Formats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-neutral-dark mb-4">
              Choose Your Learning Format
            </h2>
            <p className="text-xl text-brand-neutral max-w-3xl mx-auto">
              Flexible options designed for busy professionals and curious learners
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Asynchronous */}
            <div className="bg-brand-light-purple/20 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-brand-purple rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Asynchronous</h3>
              <p className="text-gray-600 mb-6">
                Learn at your own pace with recorded content, interactive exercises, and community support.
              </p>
              <ul className="text-left space-y-2 text-gray-700">
                <li className="flex items-center"><span className="text-brand-green mr-2">✓</span> Self-paced learning</li>
                <li className="flex items-center"><span className="text-brand-green mr-2">✓</span> Lifetime access</li>
                <li className="flex items-center"><span className="text-brand-green mr-2">✓</span> Community forum</li>
              </ul>
            </div>

            {/* Live */}
            <div className="bg-brand-light-green/20 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Live</h3>
              <p className="text-gray-600 mb-6">
                Interactive sessions with expert instructors and real-time Q&A with fellow learners.
              </p>
              <ul className="text-left space-y-2 text-gray-700">
                <li className="flex items-center"><span className="text-brand-green mr-2">✓</span> Expert guidance</li>
                <li className="flex items-center"><span className="text-brand-green mr-2">✓</span> Live interaction</li>
                <li className="flex items-center"><span className="text-brand-green mr-2">✓</span> Immediate feedback</li>
              </ul>
            </div>

            {/* Workshops */}
            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Workshops</h3>
              <p className="text-gray-600 mb-6">
                Intensive hands-on sessions focused on specific tools and practical applications.
              </p>
              <ul className="text-left space-y-2 text-gray-700">
                <li className="flex items-center"><span className="text-brand-green mr-2">✓</span> Hands-on practice</li>
                <li className="flex items-center"><span className="text-brand-green mr-2">✓</span> Small groups</li>
                <li className="flex items-center"><span className="text-brand-green mr-2">✓</span> Project-based</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Community Principles */}
      <section className="py-20 bg-gradient-to-r from-brand-purple to-brand-green">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Human-Centered AI Learning
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Our approach to AI education is grounded in human values and practical application
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ethical</h3>
              <p className="text-white/80">Responsible AI use with consideration for impact and implications</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Practical</h3>
              <p className="text-white/80">Real-world applications and hands-on experience with current tools</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Community</h3>
              <p className="text-white/80">Collaborative learning with peers and expert mentorship</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Creative</h3>
              <p className="text-white/80">Encouraging innovation and creative problem-solving with AI</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your AI Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of learners who are mastering AI tools and techniques to enhance their work and creativity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CustomButton variant="primary" size="lg" href="/subscription">
              Get Started Today
            </CustomButton>
            <CustomButton variant="ghost" size="lg" href="/courses">
              Browse Courses
            </CustomButton>
          </div>
        </div>
      </section>
    </Layout>
  );
}