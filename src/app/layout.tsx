import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { RuntimeConfigProvider } from "@/components/RuntimeConfigProvider";
import { getRuntimeConfig } from "@/config/runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getRuntimeConfig();
  return { metadataBase: new URL(site.url), title: site.title, description: site.description, openGraph: { title: site.title, description: site.description, type: "website", locale: "vi_VN", siteName: site.name, images: [{ url: "/assets/image/logo.png?v=3", alt: `${site.name} logo` }] }, twitter: { card: "summary", title: site.title, description: site.description, images: ["/assets/image/logo.png?v=3"] }, icons: { icon: "/assets/image/logo.png?v=2", apple: "/assets/image/logo.png?v=2" }, robots: { index: true, follow: true } };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const config = await getRuntimeConfig();
  return <html lang="vi" suppressHydrationWarning><body><Script id="theme-preference" strategy="beforeInteractive">{`try { const savedTheme = localStorage.getItem("bruhhh-theme"); const theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"); document.documentElement.dataset.theme = theme; } catch {}`}</Script><RuntimeConfigProvider config={config}>{children}</RuntimeConfigProvider></body></html>;
}
