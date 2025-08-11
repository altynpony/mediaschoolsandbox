import { routing } from "@/i18n/routing";
import { ChatClient } from "./client";

export const revalidate = 86400; // 1 day
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ChatPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return <ChatClient locale={locale} />;
}