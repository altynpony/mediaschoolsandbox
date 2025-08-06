"use client";

import { authClient } from "@/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";

export default function Signout({ text } : { text: string }) {
  const router = useRouter();
  return <Button onClick={async () => await authClient.signOut({ fetchOptions: { onSuccess: () => { router.push('/') }}})}>{text}</Button>
}