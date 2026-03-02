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
        <div
          className="w-full mb-8 md:mb-10"
          style={{ height: '0.5px', backgroundColor: 'rgba(40, 40, 40, 0.5)' }}
        />
        <h2 className="font-display text-4xl md:text-5xl text-ink mb-5 md:mb-6">
          MORE INK
        </h2>
      </ScrollRevealWrapper>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {posts.map((post, i) => (
          <ScrollRevealWrapper key={post.id} delay={i * 0.1}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <span className="text-technical text-[10px] tracking-[0.2em] text-rust/90 block mb-3">
                {post.category}
              </span>
              <span className="block w-6 h-px bg-rust/70 mb-4 group-hover:w-10 transition-all duration-300" />
              <h4 className="font-display text-xl md:text-2xl text-ink leading-tight mb-3 group-hover:text-rust transition-colors duration-300">
                {post.title}
              </h4>
              <p className="font-serif text-sm md:text-base text-ink/40 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          </ScrollRevealWrapper>
        ))}
      </div>
    </div>
  );
}
