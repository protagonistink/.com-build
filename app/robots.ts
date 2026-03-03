import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/brand-guide"],
    },
    sitemap: "https://protagonist.ink/sitemap.xml",
  };
}
