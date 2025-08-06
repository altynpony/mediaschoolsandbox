import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: 'Mediaschool.ai', template: '%s | Mediaschool.ai' },
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
