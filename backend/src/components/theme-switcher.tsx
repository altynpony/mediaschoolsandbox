"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { PiDevices, PiMoon, PiSun } from "react-icons/pi";

export default function ThemeSwitcher({
  onIcon = "text-primary",
  offIcon = "cursor-pointer",
  defaultIcon = "",
  ...props
}: {
  onIcon?: string;
  offIcon?: string;
  defaultIcon?: string;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <PiSun
        className={cn(theme == "light" ? onIcon : offIcon, defaultIcon)}
        onClick={() => setTheme("light")}
        {...props}
      />
      <PiDevices
        className={cn(theme == "system" ? onIcon : offIcon, defaultIcon)}
        onClick={() => setTheme("system")}
        {...props}
      />
      <PiMoon
        className={cn(theme == "dark" ? onIcon : offIcon, defaultIcon)}
        onClick={() => setTheme("dark")}
        {...props}
      />
    </>
  );
}
