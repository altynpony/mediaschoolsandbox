"use client";

import { authClient } from "@/auth-client";
import { Button } from "@/components/ui/button";

export default function Google({ text }: { text: string }) {
  return <Button onClick={async () => await authClient.signIn.social({provider: 'google', callbackURL: "/profile"})}>{text}</Button>;
}
