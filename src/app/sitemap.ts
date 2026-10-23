import type { MetadataRoute } from "next";

const SITE_URL = "https://www.chicagofirewatch.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/partners`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/sponsor`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
