import { auth } from "@/auth";
import Signout from "@/components/signout";
import { redirect } from "@/i18n/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";


export const metadata: Metadata = {
  title: "Profile",
  description: "",
};

export default async function Profile({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('auth')
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) redirect({href: '/signin', locale: locale});

  return (
    <div>
      <h1>Profile</h1>
      <ul>
        <li>Name: {session?.user.name}</li>
      </ul>
      <Signout text={t('signout')} />
    </div>
  );
}
