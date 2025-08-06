import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Locale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import ThemeSwitcher from "@/components/theme-switcher";
import NavMenu from "@/components/nav-menu";
import User from "@/components/user";
import { Montserrat } from 'next/font/google'

const font = Montserrat({
  weight: "200",
  subsets: ['cyrillic', 'latin']
})

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  
  
  setRequestLocale(locale as Locale);

  /// const t = await getTranslations("HEAD");

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`p-4 ${font.className}`}>
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header className="flex gap-2 items-center">
              { /*
              <Link href="/">
                <h1>{t("title")}</h1>
              </Link>
              <Link href="/courses">
                Courses
              </Link>
              <div className="flex-1"></div>
                <LocaleSwitcher />
                <User />
                */ }
              <NavMenu />
            </header>
            <main className="my-4">{children}</main>
            <footer>
              <div className="flex gap-1">
                <ThemeSwitcher />
              </div>
              <User />
            </footer>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
