import { routing } from "@/i18n/routing";
import { Layout } from "@/components/layout";
import { AuthTestClient } from "./client";

export const revalidate = 0;
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AuthTest({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Authentication Manager Test
            </h1>
            <AuthTestClient locale={locale} />
          </div>
        </div>
      </div>
    </Layout>
  );
}