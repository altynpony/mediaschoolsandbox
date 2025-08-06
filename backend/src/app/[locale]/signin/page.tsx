import { routing } from "@/i18n/routing";
import Google from "./google";
import { getTranslations } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function Signin() {
  const t = await getTranslations("auth");

  return (
    <div>
      <Google text={t("signinGoogle")} />
    </div>
  );
}
