import { routing } from "@/i18n/routing";
import { Layout } from "@/components/layout";
import { CoursesClient } from "./client";
import { Suspense } from "react";

export const revalidate = 86400; // 1 day
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function fetchCourses(locale: string) {
  try {
    // Use our new API endpoint
    const response = await fetch(`${process.env.BETTER_AUTH_URL || 'http://localhost:3000'}/api/courses?lang=${locale}`, {
      cache: 'force-cache',
      next: { revalidate: 86400 } // 1 day
    });
    
    if (!response.ok) {
      console.error('Failed to fetch courses:', response.status);
      return [];
    }
    
    const data = await response.json();
    return data.courses || [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export default async function Courses({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const courses = await fetchCourses(locale);

  return (
    <Layout>
      <div className="bg-white">
        {/* Header */}
        <section className="py-20 bg-gradient-to-br from-brand-light-purple via-white to-brand-light-green">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              AI Learning Courses
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Master AI tools and techniques with our comprehensive courses designed for professionals, creators, and curious learners.
            </p>
          </div>
        </section>

        {/* Courses Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <Suspense fallback={
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-2xl h-64 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            }>
              <CoursesClient courses={courses} locale={locale} />
            </Suspense>
          </div>
        </section>
      </div>
    </Layout>
  );
}