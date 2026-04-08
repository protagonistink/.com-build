// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import SuggestedReading from '@/components/blog/detail/SuggestedReading';
import EditorialFooter from '@/components/blog/detail/EditorialFooter';
import Prose from '@/components/blog/detail/Prose';
import SanityPortableText from '@/components/blog/detail/SanityPortableText';
import { getBlogPostBySlug, getBlogPosts, getBlogPostSlugs } from '@/lib/blog';
import type { BlogPost } from '@/types/blog';

// --- Static generation ---

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  const openGraphImage = post.openGraphImage || post.mainImage || '/images/og-default.jpg';
  const openGraphAlt = post.openGraphImageAlt || post.mainImageAlt || post.title;
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: openGraphImage, alt: openGraphAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [openGraphImage],
    },
  };
}

// --- Catalogue posts logic ---

function getCataloguePosts(posts: BlogPost[], currentSlug: string): BlogPost[] {
  return posts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

// --- Page ---

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return notFound();

  const posts = await getBlogPosts();
  const cataloguePosts = getCataloguePosts(posts, post.slug);

  return (
    <main className="min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[62vh] md:min-h-[70vh] bg-trueblack texture-grain flex flex-col justify-start pt-40 md:pt-48 lg:pt-52 pb-16 md:pb-20 overflow-hidden">
        {post.mainImage && (
          <>
            <div className="absolute inset-0">
              <Image
                src={post.mainImage}
                alt={post.mainImageAlt || post.title}
                fill
                className="object-cover opacity-[0.22]"
                sizes="100vw"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.62)_0%,rgba(10,10,10,0.74)_36%,rgba(10,10,10,0.9)_100%)]" />
          </>
        )}

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 w-full">
          {/* Meta row */}
          <div className="relative z-10 flex flex-wrap items-center gap-3 mb-6 md:mb-8">
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
          <h1 className="relative z-10 font-display text-4xl md:text-6xl lg:text-7xl font-light text-warmwhite leading-[0.95] tracking-tight mb-6 md:mb-8 max-w-5xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="relative z-10 font-serif text-xl md:text-2xl text-warmwhite/68 max-w-3xl leading-relaxed">
            {post.excerpt}
          </p>

          {/* Rust accent rule */}
          <div className="relative z-10 mt-10 md:mt-12 w-10 md:w-14 h-px bg-rust" />
        </div>
      </section>

      {/* ═══ BODY ═══ */}
      <section className="relative z-20 -mt-8 md:-mt-12 bg-[#FAFAFA] texture-paper rounded-t-[2rem] md:rounded-t-[2.5rem] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] pb-20 md:pb-32">
        {/* Body content */}
        <div className="pt-12 md:pt-16">
          {post.body ? (
            post.body
          ) : post.sanityBody && post.sanityBody.length > 0 ? (
            <SanityPortableText blocks={post.sanityBody} />
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

      </section>

      {/* ═══ FURTHER READING ═══ */}
      <SuggestedReading posts={cataloguePosts} />

      {/* Editorial footer — newsletter, Story Teardown, PI mark */}
      <EditorialFooter />
    </main>
  );
}
