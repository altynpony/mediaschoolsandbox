"use client";


import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { authClient } from "@/auth-client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function User() {
  const { data: session } = authClient.useSession();
  const t = useTranslations("HEAD");

  return (
    <div>
      {session?.user ? (
        <Link href="/profile">
          <Avatar>
            <AvatarImage src={session?.user.image as string} />
            <AvatarFallback>
              {session?.user.name
                .split(" ")
                .map((w) => w.slice(0, 1))
                .join("")}
            </AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        <Link href="/signin">
          <Button>{t("signin")}</Button>
        </Link>
      )}
    </div>
  );
}
