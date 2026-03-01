// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/data/blog-posts';
import MoreInk from '@/components/blog/detail/MoreInk';
import Prose from '@/components/blog/detail/Prose';

// --- Static generation ---

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} — Protagonist Ink`,
    description: post.excerpt,
  };
}

// --- Related posts logic ---

function getRelatedPosts(currentSlug: string, category: string) {
  const others = BLOG_POSTS.filter((p) => p.slug !== currentSlug);
  const sameCategory = others.filter((p) => p.category === category);
  const different = others.filter((p) => p.category !== category);
  return [...sameCategory, ...different].slice(0, 3);
}

// --- Page ---

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug, post.category);

  return (
    <main className="min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[50vh] md:min-h-[55vh] bg-trueblack texture-grain flex flex-col justify-end pb-16 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 w-full">
          {/* Breadcrumb */}
          <nav className="mb-8 md:mb-10">
            <span className="text-technical text-[10px] tracking-[0.2em]">
              <Link
                href="/blog"
                className="text-warmwhite/40 hover:text-rust transition-colors duration-300"
              >
                Journal
              </Link>
              <span className="text-warmwhite/20 mx-2">/</span>
              <span className="text-warmwhite/40">{post.category}</span>
            </span>
          </nav>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6 md:mb-8">
            <span className="text-technical text-[10px] tracking-[0.2em] text-warmwhite/50 border border-warmwhite/20 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-technical text-[10px] tracking-[0.2em] text-warmwhite/30">
              {post.publishedAt}
            </span>
            <span className="text-warmwhite/20">·</span>
            <span className="text-technical text-[10px] tracking-[0.2em] text-warmwhite/30">
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-warmwhite leading-[0.95] tracking-tight mb-6 md:mb-8 max-w-5xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="font-serif italic text-xl md:text-2xl text-warmwhite/60 max-w-3xl leading-relaxed">
            {post.excerpt}
          </p>

          {/* Rust accent rule */}
          <div className="mt-10 md:mt-12 w-10 md:w-14 h-px bg-rust" />
        </div>
      </section>

      {/* ═══ BODY ═══ */}
      <section className="relative z-20 -mt-8 md:-mt-12 bg-[#FAFAFA] texture-paper rounded-t-[2rem] md:rounded-t-[2.5rem] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] pb-20 md:pb-32">
        {/* Post image (breakout width) */}
        {post.mainImage && (
          <div className="max-w-[960px] mx-auto px-6 md:px-10 pt-12 md:pt-16">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-ink/[0.06]">
              <Image
                src={post.mainImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 960px"
              />
            </div>
          </div>
        )}

        {/* Body content */}
        <div className="pt-12 md:pt-16">
          {post.body || (
            <Prose>
              <p className="text-ink/40 italic">
                Full article content coming soon.
              </p>
            </Prose>
          )}
        </div>

        {/* ═══ POST FOOTER ═══ */}

        {/* Sign-off */}
        <div className="max-w-[680px] mx-auto px-6 md:px-10 pt-16 md:pt-24">
          <div className="w-10 h-px bg-rust mb-6" />
          <p className="text-technical text-[11px] tracking-[0.15em] text-ink/30">
            Written by Protagonist Ink
          </p>
          <p className="text-technical text-[11px] tracking-[0.15em] text-ink/20 mt-1">
            {post.publishedAt}
          </p>
        </div>

        {/* More Ink */}
        <MoreInk posts={relatedPosts} />

        {/* Back link */}
        <div className="text-center pt-10 md:pt-14 pb-4">
          <Link
            href="/blog"
            className="text-technical text-[11px] tracking-[0.2em] text-rust hover:text-ink transition-colors duration-300"
          >
            Back to The Ink →
          </Link>
        </div>
      </section>
    </main>
  );
}
