import type { MetadataRoute } from "next";
import { policyLinks } from "@/config/policies";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteConfig.url, lastModified },
    { url: `${siteConfig.url}/chinh-sach`, lastModified },
    ...policyLinks.map(({ slug }) => ({ url: `${siteConfig.url}/chinh-sach/${slug}`, lastModified })),
  ];
}
