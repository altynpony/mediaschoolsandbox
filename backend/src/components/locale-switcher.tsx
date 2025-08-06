"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

export default function LocaleSwitcher({
  onIcon = "text-primary font-bold",
  offIcon = "cursor-pointer",
  defaultIcon = "",
  ...props
}: {
  onIcon?: string;
  offIcon?: string;
  defaultIcon?: string;
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const locales = routing.locales;
  const searchParams = useSearchParams();


  return locales.map((l) => (
    <Link
      key={l}
      href={{pathname: pathname, query: searchParams.toString()}}
      locale={l}
      className={cn(l === locale ? onIcon : offIcon, defaultIcon)}
      {...props}
    >
      {l.toUpperCase()}
    </Link>
  ));
}
