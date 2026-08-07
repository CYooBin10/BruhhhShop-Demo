import type { MetadataRoute } from "next";
import { getRuntimeConfig } from "@/config/runtime";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { policyLinks, site } = await getRuntimeConfig();
  const lastModified = new Date();
  return [
    { url: site.url, lastModified },
    { url: `${site.url}/server-game`, lastModified },
    ...["gioi-thieu", "tinh-nang", "xep-hang", "tin-tuc", "wiki", "gia-ban", "info", "discord", "choi-ngay"].map((section) => ({ url: `${site.url}/server-game/${section}`, lastModified })),
    { url: `${site.url}/chinh-sach`, lastModified },
    ...policyLinks.map(({ slug }) => ({ url: `${site.url}/chinh-sach/${slug}`, lastModified })),
  ];
}
