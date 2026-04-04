import { cache } from 'react';
import { createClient } from 'next-sanity';
import type { BlogPost, FaqItem } from '@/types/blog';
import type { PortableTextBlock } from '@/types/portableText';
import { normalizeEnvValue } from '@/lib/env';

const DEFAULT_SANITY_PROJECT_ID = 'dkok2iir';
const DEFAULT_SANITY_DATASET = 'production';

interface CmsPost {
  _id: string;
  title: string;
  slug?: { current?: string };
  publishedAt?: string;
  featured?: boolean;
  excerpt?: string;
  mainImageUrl?: string;
  mainImageAlt?: string;
  openGraphImageUrl?: string;
  openGraphImageAlt?: string;
  categories?: Array<{ title?: string }>;
  readingTime?: number;
  body?: PortableTextBlock[];
  faqItems?: FaqItem[];
}

type CmsPostSummary = Omit<CmsPost, 'body' | 'faqItems'>;

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
    featured: Boolean(post.featured),
    excerpt: post.excerpt || '',
    category: post.categories?.[0]?.title || 'Field Notes',
    mainImage: post.mainImageUrl || null,
    mainImageAlt: post.mainImageAlt || undefined,
    openGraphImage: post.openGraphImageUrl || post.mainImageUrl || null,
    openGraphImageAlt: post.openGraphImageAlt || post.mainImageAlt || undefined,
    readTime: `${Math.max(1, Number(post.readingTime || 5))} min read`,
    sanityBody: Array.isArray(post.body) ? post.body : [],
    faqItems: post.faqItems?.length ? post.faqItems : undefined,
  };
}

const listPostsQuery = `*[_type == "post"] | order(featured desc, publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  featured,
  excerpt,
  "mainImageUrl": coalesce(mainImage.asset->url, mainImageUrl),
  "mainImageAlt": mainImage.alt,
  "openGraphImageUrl": seo.ogImage.asset->url,
  "openGraphImageAlt": seo.ogImage.alt,
  "readingTime": round(length(pt::text(body)) / 1000),
  categories[]->{
    title
  }
}`;

const singlePostQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  featured,
  excerpt,
  "mainImageUrl": coalesce(mainImage.asset->url, mainImageUrl),
  "mainImageAlt": mainImage.alt,
  "openGraphImageUrl": seo.ogImage.asset->url,
  "openGraphImageAlt": seo.ogImage.alt,
  readingTime,
  body,
  "faqItems": schema.faqItems[]{question, answer},
  categories[]->{
    title
  }
}`;

const slugListQuery = `*[_type == "post" && defined(slug.current)] | order(featured desc, publishedAt desc) {
  "slug": slug.current
}`;

const getCmsPosts = cache(async (): Promise<BlogPost[]> => {
  const client = getSanityClient();

  try {
    const posts = await client.fetch<CmsPostSummary[]>(listPostsQuery);

    return posts
      .map((post) => mapCmsPost(post as CmsPost))
      .filter((item): item is BlogPost => Boolean(item));
  } catch {
    return [];
  }
});

const getCmsPostBySlug = cache(async (slug: string): Promise<BlogPost | undefined> => {
  const client = getSanityClient();

  try {
    const post = await client.fetch<CmsPost | null>(singlePostQuery, { slug });
    if (!post) return undefined;
    return mapCmsPost(post) ?? undefined;
  } catch {
    return undefined;
  }
});

const getCmsPostSlugs = cache(async (): Promise<string[]> => {
  const client = getSanityClient();

  try {
    const slugs = await client.fetch<Array<{ slug?: string }>>(slugListQuery);
    return slugs
      .map((item) => item.slug?.trim())
      .filter((item): item is string => Boolean(item));
  } catch {
    return [];
  }
});

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
  return dedupeBySlug(cmsPosts);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return getCmsPostBySlug(slug);
}

export async function getBlogPostSlugs(): Promise<string[]> {
  return getCmsPostSlugs();
}
