import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";

// Bump when the content changes, so crawlers get a real last-modified date.
const LAST_UPDATED = new Date("2026-09-25");

// Single page site, so the sitemap only lists the home page.
const sitemap = (): MetadataRoute.Sitemap => [{ url: siteUrl, lastModified: LAST_UPDATED }];

export default sitemap;
