import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";
import { getWorkProjects } from "@/lib/work";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts();
  const workProjects = await getWorkProjects();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: "https://www.protagonist.ink",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: "https://www.protagonist.ink/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.protagonist.ink/work",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.protagonist.ink/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.protagonist.ink/story-teardown",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.protagonist.ink/privacy",
      lastModified: new Date("2026-03-27"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.protagonist.ink/data-deletion",
      lastModified: new Date("2026-03-27"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.protagonist.ink/terms",
      lastModified: new Date("2026-03-28"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `https://www.protagonist.ink/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt || Date.now()),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const workRoutes: MetadataRoute.Sitemap = workProjects.map((project) => ({
    url: `https://www.protagonist.ink/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticRoutes, ...blogRoutes, ...workRoutes];
}
