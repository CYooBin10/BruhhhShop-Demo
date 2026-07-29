import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin", "vietnamese"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: { title: siteConfig.title, description: siteConfig.description, type: "website", locale: "vi_VN", siteName: siteConfig.name },
  icons: { icon: "/assets/image/logo.png", apple: "/assets/image/logo.png" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body className={inter.variable}>{children}</body></html>;
}
