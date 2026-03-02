// components/blog/detail/MoreInk.tsx
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

interface MoreInkProps {
  posts: BlogPost[];
}

export default function MoreInk({ posts }: MoreInkProps) {
  if (posts.length === 0) return null;

  return (
    <div className="max-w-[960px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-8">
      <ScrollRevealWrapper>
        <div className="h-px w-full mb-8 md:mb-10" style={{ backgroundColor: '#282828' }} />
        <h3 className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-10 md:mb-14">
          MORE INK
        </h3>
        <p className="font-serif italic text-base md:text-lg text-ink/45 leading-relaxed mb-8 md:mb-10">
          A few more essays you might want next.
        </p>
      </ScrollRevealWrapper>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {posts.map((post, i) => (
          <ScrollRevealWrapper key={post.id} delay={i * 0.1}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <span className="text-technical text-[10px] tracking-[0.2em] text-ink/25 block mb-3">
                {post.category}
              </span>
              <h4 className="font-display text-xl md:text-2xl text-ink leading-tight mb-3 group-hover:text-rust transition-colors duration-300">
                {post.title}
              </h4>
              <p className="font-serif italic text-sm md:text-base text-ink/40 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          </ScrollRevealWrapper>
        ))}
      </div>
    </div>
  );
}
