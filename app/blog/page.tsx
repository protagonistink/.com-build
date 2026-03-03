import BlogHero from '@/components/blog/BlogHero';
import CinematicFeatured from '@/components/blog/CinematicFeatured';
import PostRow from '@/components/blog/PostRow';
import { getBlogPosts } from '@/lib/blog';

export const metadata = {
  title: 'The Ink',
  description:
    'Frameworks, analyses, and architectural blueprints for brands that refuse to be ignored. Strictly signal. Zero noise.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const rest = featured ? posts.filter((post) => post.id !== featured.id) : [];

  return (
    <main>
      <BlogHero />
      {featured ? (
        <CinematicFeatured post={featured} />
      ) : (
        <section className="bg-trueblack text-warmwhite px-6 md:px-10 lg:px-12 py-20">
          <div className="max-w-[900px] mx-auto">
            <p className="text-technical text-[11px] tracking-[0.2em] text-warmwhite/60">No posts yet.</p>
          </div>
        </section>
      )}
      <section className="bg-[#FAFAFA]">
        {rest.map((post, i) => (
          <PostRow key={post.id} post={post} displayNumber={i + 2} index={i} />
        ))}
      </section>
    </main>
  );
}
