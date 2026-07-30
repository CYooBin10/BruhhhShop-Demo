import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: { title: siteConfig.title, description: siteConfig.description, type: "website", locale: "vi_VN", siteName: siteConfig.name },
  icons: { icon: "/assets/image/logo.png?v=2", apple: "/assets/image/logo.png?v=2" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" suppressHydrationWarning><body><Script id="theme-preference" strategy="beforeInteractive">{`try { const savedTheme = localStorage.getItem("bruhhh-theme"); const theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"); document.documentElement.dataset.theme = theme; } catch {}`}</Script>{children}</body></html>;
}
