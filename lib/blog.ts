import { createClient } from 'next-sanity';
import { BLOG_POSTS } from '@/data/blog-posts';
import type { BlogPost, PortableTextBlock } from '@/types/blog';
import { normalizeEnvValue } from '@/lib/env';

const DEFAULT_SANITY_PROJECT_ID = 'dkok2iir';
const DEFAULT_SANITY_DATASET = 'production';

interface CmsPost {
  _id: string;
  title: string;
  slug?: { current?: string };
  publishedAt?: string;
  excerpt?: string;
  mainImageUrl?: string;
  seoOgImageAlt?: string;
  categories?: Array<{ title?: string }>;
  readingTime?: number;
  body?: PortableTextBlock[];
}

function getSanityClient() {
  const projectId =
    normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) || DEFAULT_SANITY_PROJECT_ID;
  const dataset =
    normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_DATASET) || DEFAULT_SANITY_DATASET;

  return createClient({
    projectId,
    dataset,
    apiVersion: '2026-03-02',
    useCdn: false,
  });
}

function toIsoDate(value?: string) {
  if (!value) return new Date().toISOString().slice(0, 10);
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function mapCmsPost(post: CmsPost): BlogPost | null {
  const slug = post.slug?.current?.trim();
  if (!post.title || !slug) return null;

  return {
    id: post._id,
    title: post.title,
    slug,
    publishedAt: toIsoDate(post.publishedAt),
    excerpt: post.excerpt || '',
    category: post.categories?.[0]?.title || 'Field Notes',
    mainImage: post.mainImageUrl || null,
    mainImageAlt: post.seoOgImageAlt || undefined,
    readTime: `${Math.max(1, Number(post.readingTime || 5))} min read`,
    sanityBody: Array.isArray(post.body) ? post.body : [],
  };
}

async function getCmsPosts(): Promise<BlogPost[]> {
  const client = getSanityClient();
  if (!client) return [];

  try {
    const posts = await client.fetch<CmsPost[]>(
      `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        "mainImageUrl": coalesce(mainImage.asset->url, mainImageUrl, seo.ogImage.asset->url),
        "seoOgImageAlt": coalesce(mainImage.alt, seo.ogImage.alt),
        readingTime,
        body,
        categories[]->{
          title
        }
      }`
    );

    return posts
      .map(mapCmsPost)
      .filter((item): item is BlogPost => Boolean(item));
  } catch {
    return [];
  }
}

function dedupeBySlug(posts: BlogPost[]) {
  const seen = new Set<string>();
  const output: BlogPost[] = [];
  for (const post of posts) {
    if (seen.has(post.slug)) continue;
    seen.add(post.slug);
    output.push(post);
  }
  return output;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const cmsPosts = await getCmsPosts();
  return dedupeBySlug([...cmsPosts, ...BLOG_POSTS]);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}
