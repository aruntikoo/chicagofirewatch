import type { MetadataRoute } from "next";
import { PARTNERS_ENABLED, SPONSORSHIPS_ENABLED } from "@/lib/features";

const SITE_URL = "https://www.chicagofirewatch.com";

// /partners and /sponsor redirect home while their feature flags are off,
// so only list them when the corresponding flag is enabled.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
  ];
  if (PARTNERS_ENABLED) {
    entries.push({ url: `${SITE_URL}/partners`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });
  }
  if (SPONSORSHIPS_ENABLED) {
    entries.push({ url: `${SITE_URL}/sponsor`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });
  }
  return entries;
}
