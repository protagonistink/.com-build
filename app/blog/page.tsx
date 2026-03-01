import { BLOG_POSTS } from '@/data/blog-posts';
import BlogHero from '@/components/blog/BlogHero';
import CinematicFeatured from '@/components/blog/CinematicFeatured';
import BlogFeed from '@/components/blog/BlogFeed';

export const metadata = {
  title: 'The Ink — Protagonist Ink',
  description:
    'Frameworks, analyses, and architectural blueprints for brands that refuse to be ignored. Strictly signal. Zero noise.',
};

export default function BlogPage() {
  const [featured, ...remaining] = BLOG_POSTS;

  return (
    <main className="min-h-screen">
      {/* ─── The Entrance ─── */}
      <BlogHero />
      <CinematicFeatured post={featured} />

      {/* ─── The Archive ─── */}
      <BlogFeed posts={remaining} />
    </main>
  );
}
