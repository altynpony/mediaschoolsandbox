"use client";

// import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { authClient } from "@/auth-client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CustomButton } from "./ui/custom-button";

export function User() {
  const { data: session } = authClient.useSession();
  const t = useTranslations("HEAD");

  return (
    <div className="flex items-center space-x-3">
      {session?.user ? (
        <>
          <Link href="/profile" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Avatar>
              <AvatarImage src={session?.user.image as string} />
              <AvatarFallback className="bg-brand-purple text-white">
                {session?.user.name
                  ?.split(" ")
                  .map((w) => w.slice(0, 1))
                  .join("") || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:block text-sm font-medium">
              {session.user.name}
            </span>
          </Link>
          <Link href="/courses">
            <CustomButton variant="primary" size="sm">
              My Courses
            </CustomButton>
          </Link>
        </>
      ) : (
        <div className="flex items-center space-x-2">
          <Link href="/signin">
            <CustomButton variant="outline" size="sm">
              {t("signin") || "Sign In"}
            </CustomButton>
          </Link>
          <Link href="/subscription">
            <CustomButton variant="primary" size="sm">
              Start Learning
            </CustomButton>
          </Link>
        </div>
      )}
    </div>
  );
}

// Keep default export for compatibility
export default User;
