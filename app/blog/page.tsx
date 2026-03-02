import { BLOG_POSTS } from '@/data/blog-posts';
import BlogHero from '@/components/blog/BlogHero';
import CinematicFeatured from '@/components/blog/CinematicFeatured';
import PostRow from '@/components/blog/PostRow';

export const metadata = {
  title: 'The Ink — Protagonist Ink',
  description:
    'Frameworks, analyses, and architectural blueprints for brands that refuse to be ignored. Strictly signal. Zero noise.',
};

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <main>
      <BlogHero />
      <CinematicFeatured post={featured} />
      <section className="bg-[#FAFAFA]">
        {rest.map((post, i) => (
          <PostRow key={post.id} post={post} displayNumber={i + 2} index={i} />
        ))}
      </section>
    </main>
  );
}
