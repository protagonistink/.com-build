import PostRow from '@/components/blog/PostRow';
import type { BlogPost } from '@/types/blog';

interface BlogContinuationProps {
  posts: BlogPost[];
}

export default function BlogContinuation({ posts }: BlogContinuationProps) {
  if (posts.length === 0) return null;

  return (
    <>
      {/* THE INK transition band */}
      <div className="bg-trueblack texture-grain py-6 md:py-8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <p className="text-technical text-[11px] tracking-[0.24em] text-warmwhite/50 mb-2">
            THE INK
          </p>
          <div className="w-4 h-px bg-rust/60" />
        </div>
      </div>

      {/* PostRow cascade */}
      <section className="bg-[#FAFAFA]">
        {posts.map((post, i) => (
          <PostRow
            key={post.id}
            post={post}
            displayNumber={i + 1}
            index={i}
          />
        ))}
      </section>
    </>
  );
}
