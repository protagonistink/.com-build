import PostRow from '@/components/blog/PostRow';
import type { BlogPost } from '@/types/blog';

interface BlogContinuationProps {
  posts: BlogPost[];
}

export default function BlogContinuation({ posts }: BlogContinuationProps) {
  if (posts.length === 0) return null;

  return (
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
  );
}
