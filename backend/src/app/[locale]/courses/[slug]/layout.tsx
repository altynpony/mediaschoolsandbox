import { courseLessons, coursesSlugs } from "@/db/courses";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export const revalidate = 86400; // 1 day = 86400 seconds
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await coursesSlugs()).flatMap((c) => routing.locales.flatMap((l) => { return { slug: c.slug, locale: l }}))
}

export default async function CourseLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string; slug: string }>;
  children: React.ReactNode;
}) {
  const { locale, slug } = await params;
  /*const session = await auth.api.getSession({
    headers: await headers(),
  });*/

  const lessons = await courseLessons(slug, locale);

  return (
    <article className="flex gap-4">
      <aside>
        <h2>Lessons</h2>
        <ul>
          {lessons?.lessons.map((l, i) => (
            
            <li key={i}>
              <Link href={`/courses/${slug}/${l.slug}`}>
                {l.lessonDescriptions[0].title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main>{children}</main>
    </article>
  );
}
