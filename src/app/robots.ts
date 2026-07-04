import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { ROBOTS_DISALLOW_PREFIXES } from "@/config/crawler-policy";
import { getRobotsConfig } from "@/server/services/seo.service";

export default async function robots(): Promise<MetadataRoute.Robots> {
  try {
    const config = await getRobotsConfig();
    return {
      rules: [
        {
          userAgent: "*",
          allow: config.allow,
          disallow: config.disallow,
        },
      ],
      sitemap: config.sitemap,
    };
  } catch {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: [...ROBOTS_DISALLOW_PREFIXES],
        },
      ],
      sitemap: `${SITE_URL}/sitemap.xml`,
    };
  }
}
