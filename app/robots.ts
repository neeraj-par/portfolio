import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";

// Search and AI answer-engine crawlers that are explicitly welcome, so the site can be cited in AI answers.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

// Allow all crawlers and point them at the sitemap.
const robots = (): MetadataRoute.Robots => ({
  rules: [{ userAgent: "*", allow: "/" }, ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" }))],
  sitemap: `${siteUrl}/sitemap.xml`,
  host: siteUrl,
});

export default robots;
