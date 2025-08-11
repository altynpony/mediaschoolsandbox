import { Layout } from "@/components/layout";
import { CustomButton } from "@/components/ui/custom-button";
import { routing } from "@/i18n/routing";

export const revalidate = 86400; // 1 day
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Mock library items - will be replaced with CMS/database content
const libraryItems = [
  {
    id: 1,
    type: 'article',
    title: 'Getting Started with GPT-4 Vision',
    summary: 'A comprehensive guide to using GPT-4\'s multimodal capabilities for image analysis and generation.',
    category: ['AI-Image', 'LLM'],
    author: 'Sarah Chen',
    readTime: 12,
    imageUrl: null,
    isPremium: false
  },
  {
    id: 2,
    type: 'video',
    title: 'Midjourney Mastery: Advanced Prompting',
    summary: 'Learn advanced techniques for creating stunning visuals with Midjourney V6.',
    category: ['AI-Image'],
    author: 'Alex Rivera',
    duration: '45 min',
    imageUrl: null,
    isPremium: true
  },
  {
    id: 3,
    type: 'tool',
    title: 'AI Prompt Builder',
    summary: 'Interactive tool for crafting perfect prompts for various AI models.',
    category: ['Tools', 'LLM'],
    author: 'MediaSchool Team',
    imageUrl: null,
    isPremium: false
  },
  {
    id: 4,
    type: 'publication',
    title: 'Ethics in AI Content Creation',
    summary: 'Research paper on ethical considerations when using AI for content generation.',
    category: ['Ethics', 'Research'],
    author: 'Dr. Maria Gonzalez',
    pages: 28,
    imageUrl: null,
    isPremium: false
  },
  {
    id: 5,
    type: 'case_study',
    title: 'AI-Powered Newsroom: BBC Case Study',
    summary: 'How BBC integrated AI tools into their daily journalism workflow.',
    category: ['Journalism', 'Case Study'],
    author: 'Tom Williams',
    readTime: 20,
    imageUrl: null,
    isPremium: true
  },
  {
    id: 6,
    type: 'video',
    title: 'Runway Gen-2: Video Generation Tutorial',
    summary: 'Step-by-step guide to creating AI-generated videos with Runway.',
    category: ['AI-Video'],
    author: 'Jamie Park',
    duration: '32 min',
    imageUrl: null,
    isPremium: true
  },
  {
    id: 7,
    type: 'article',
    title: 'Building No-Code AI Apps',
    summary: 'Create powerful AI applications without writing a single line of code.',
    category: ['No-Code', 'Development'],
    author: 'Chris Mueller',
    readTime: 15,
    imageUrl: null,
    isPremium: false
  },
  {
    id: 8,
    type: 'tool',
    title: 'AI Music Generator',
    summary: 'Create original music tracks using AI composition tools.',
    category: ['AI-Sound', 'Tools'],
    author: 'MediaSchool Team',
    imageUrl: null,
    isPremium: true
  }
];

export default async function LibraryPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  const content = {
    ru: {
      title: 'Библиотека',
      subtitle: 'Тщательно отобранные ресурсы для креативных профессионалов, изучающих искусственный интеллект.',
      filters: {
        all: 'Все темы',
        types: {
          all: 'Все типы',
          articles: 'Статьи',
          videos: 'Видео',
          tools: 'Инструменты',
          publications: 'Публикации'
        }
      },
      readTime: 'мин чтения',
      premium: 'Premium',
      free: 'Бесплатно',
      viewMore: 'Подробнее'
    },
    en: {
      title: 'Library',
      subtitle: 'Thoughtfully curated resources for creative professionals exploring artificial intelligence.',
      filters: {
        all: 'All Topics',
        types: {
          all: 'All Types',
          articles: 'Articles',
          videos: 'Videos',
          tools: 'Tools',
          publications: 'Publications'
        }
      },
      readTime: 'min read',
      premium: 'Premium',
      free: 'Free',
      viewMore: 'View More'
    }
  };

  const t = content[locale as 'ru'|'en'];

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'article':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'video':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'tool':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'publication':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'case_study':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <section className="pt-24 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              {t.subtitle}
            </p>

            {/* Topic Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button className="bg-brand-purple text-white px-4 py-2 rounded-full text-sm font-medium">
                {t.filters.all}
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm hover:border-brand-purple transition-colors">
                AI-Image
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm hover:border-brand-purple transition-colors">
                AI-Video
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm hover:border-brand-purple transition-colors">
                LLM / Text
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm hover:border-brand-purple transition-colors">
                No-Code
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm hover:border-brand-purple transition-colors">
                AI-Sound
              </button>
            </div>

            {/* Type Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button className="bg-brand-green text-black px-4 py-2 rounded-full text-sm font-medium">
                {t.filters.types.all}
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm hover:border-brand-green transition-colors">
                {t.filters.types.articles}
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm hover:border-brand-green transition-colors">
                {t.filters.types.videos}
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm hover:border-brand-green transition-colors">
                {t.filters.types.tools}
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm hover:border-brand-green transition-colors">
                {t.filters.types.publications}
              </button>
            </div>

            {/* Library Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {libraryItems.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all group">
                  {/* Type & Premium Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                        {getItemIcon(item.type)}
                      </div>
                      <span className="text-xs text-gray-500 uppercase font-medium">
                        {item.type.replace('_', ' ')}
                      </span>
                    </div>
                    {item.isPremium && (
                      <span className="bg-gradient-to-r from-brand-purple to-brand-green text-white px-3 py-1 rounded-full text-xs font-medium">
                        {t.premium}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-brand-purple transition-colors">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.summary}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{item.author}</span>
                    {'readTime' in item && (
                      <span>{item.readTime} {t.readTime}</span>
                    )}
                    {'duration' in item && (
                      <span>{item.duration}</span>
                    )}
                    {'pages' in item && (
                      <span>{item.pages} pages</span>
                    )}
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.category.map((cat) => (
                      <span key={cat} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <CustomButton variant="outline" size="sm" className="w-full">
                    {t.viewMore}
                  </CustomButton>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <CustomButton variant="primary" size="lg">
                Load More Resources
              </CustomButton>
            </div>
          </div>
        </section>

        {/* CMS Integration Notice */}
        <section className="bg-gray-50 py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                More Resources Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">
                We&apos;re currently integrating with our content management system to bring you a rich library of articles, videos, tools, and publications.
              </p>
              <CustomButton variant="primary" href={`/${locale}/subscription`}>
                Get Early Access
              </CustomButton>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}