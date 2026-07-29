import type { MetadataRoute } from "next";
import { policyLinks } from "@/config/policies";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: "/", lastModified },
    ...policyLinks.map(({ slug }) => ({ url: `/chinh-sach/${slug}`, lastModified })),
  ];
}
