import { coursesListLocale } from "@/db/courses";
import { routing } from "@/i18n/routing";
import Client from "./client";
import { Suspense } from "react";

export const revalidate = 86400; // 1 day
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Courses({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const courses = await coursesListLocale(locale);

  return (
    <Suspense>
      <Client courses={courses} />
    </Suspense>
  );
}
