import { routing } from "@/i18n/routing";

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
      title: 'Создавайте. Исследуйте. Используйте AI как хочется',
      body: 'Курсы, воркшопы и инструменты для тех, кто хочет применять AI в любой сфере: журналистика, видео, дизайн и многое другое.',
      buttons: [
        {
          text: 'Попробовать',
          link: '/',
          props: {
            type: 'secondary'
          }
        }
      ]
    },
    en: {
      title: 'Create. Explore. Use AI on your terms',
      body: 'Courses, workshops and tools for those who want to use AI consciously - in journalism, video, design and beyond.',
      buttons: [
        {
          text: 'Try subscription',
          link: '/',
          props: {
            type: 'secondary'
          }
        }
      ]
    }
  }
  
  const t = content[locale as 'ru'|'en']

  return <>
    <h1 className="text-3xl text-center">{ t.title }</h1>
    <p className="text-center">{ t.body }</p>
  </>
}
