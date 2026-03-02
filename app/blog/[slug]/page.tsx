// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MoreInk from '@/components/blog/detail/MoreInk';
import Prose from '@/components/blog/detail/Prose';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog';
import type { BlogPost } from '@/types/blog';

// --- Static generation ---

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

// --- Related posts logic ---

function getRelatedPosts(posts: BlogPost[], currentSlug: string, category: string) {
  const others = posts.filter((p) => p.slug !== currentSlug);
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
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(posts, post.slug, post.category);

  return (
    <main className="min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[62vh] md:min-h-[70vh] bg-trueblack texture-grain flex flex-col justify-start pt-40 md:pt-48 lg:pt-52 pb-16 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 w-full">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6 md:mb-8">
            <span className="text-technical text-[12px] tracking-[0.2em] text-rust border border-rust/50 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-technical text-[12px] tracking-[0.2em] text-rust/90">
              {post.publishedAt}
            </span>
            <span className="text-rust/70">·</span>
            <span className="text-technical text-[12px] tracking-[0.2em] text-rust/90">
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-warmwhite leading-[0.95] tracking-tight mb-6 md:mb-8 max-w-5xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="font-serif text-xl md:text-2xl text-warmwhite/60 max-w-3xl leading-relaxed">
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
                alt={post.mainImageAlt || post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 960px"
              />
            </div>
          </div>
        )}

        {/* Body content */}
        <div className="pt-12 md:pt-16">
          {post.body ? (
            post.body
          ) : post.sanityBody && post.sanityBody.length > 0 ? (
            <Prose>
              {post.sanityBody
                .filter((block) => block._type === 'block')
                .map((block, index) => {
                  const text = block.children?.map((child) => child.text).join('') || '';
                  if (!text.trim()) return null;
                  return <p key={`${block._type}-${index}`}>{text}</p>;
                })}
            </Prose>
          ) : (
            <Prose>
              <p className="text-ink/40 italic">
                Full article content coming soon.
              </p>
            </Prose>
          )}
        </div>

        {/* Transition marker */}
        <div className="max-w-[960px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-8 md:pb-10">
          <div className="mx-auto w-fit flex items-center justify-center">
            <Image
              src="/images/brand/transparent_black_symbol.png"
              alt=""
              width={132}
              height={132}
              aria-hidden
              className="opacity-[0.18]"
            />
          </div>
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
