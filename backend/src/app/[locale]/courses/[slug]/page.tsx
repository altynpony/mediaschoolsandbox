import { coursesSlugs } from "@/db/courses";
import { routing } from "@/i18n/routing";

export const revalidate = 86400; // 1 day = 86400 seconds
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await coursesSlugs()).flatMap((c) => routing.locales.flatMap((l) => { return { slug: c.slug, locale: l }}))

}

export default async function CoursePage({
  params
}: {
  params: Promise<{locale: string, slug: string}>
}) {

  const { locale, slug } = await params;

  return <h1 lang={locale}>{ slug }</h1>
}