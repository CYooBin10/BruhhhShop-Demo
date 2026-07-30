import type { MetadataRoute } from "next";
import { getRuntimeConfig } from "@/config/runtime";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { policyLinks, site } = await getRuntimeConfig();
  const lastModified = new Date();
  return [
    { url: site.url, lastModified },
    { url: `${site.url}/chinh-sach`, lastModified },
    ...policyLinks.map(({ slug }) => ({ url: `${site.url}/chinh-sach/${slug}`, lastModified })),
  ];
}
