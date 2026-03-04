import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/brand-guide"],
    },
    sitemap: "https://www.protagonist.ink/sitemap.xml",
  };
}
