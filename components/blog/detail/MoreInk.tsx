// components/blog/detail/MoreInk.tsx
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import InkDisplay from '@/components/InkDisplay';

interface MoreInkProps {
  posts: BlogPost[];
}

export default function MoreInk({ posts }: MoreInkProps) {
  if (posts.length === 0) return null;

  return (
    <div className="max-w-[960px] mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-8">
      <ScrollRevealWrapper>
        <h2 className="font-hand text-[3rem] md:text-[4.5rem] lg:text-[6rem] text-ink mb-6 md:mb-8 leading-none rotate-[1deg]">
          More Ink...
        </h2>
      </ScrollRevealWrapper>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {posts.map((post, i) => (
          <ScrollRevealWrapper key={post.id} delay={i * 0.1}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <span className="text-technical text-[10px] tracking-[0.2em] text-rust/90 block mb-3">
                {post.category}
              </span>
              <span className="block w-6 max-w-full h-px bg-rust/70 mb-4 md:group-hover:w-[80%] transition-all duration-500 ease-out" />
              <h4 className="font-display text-xl md:text-2xl text-ink leading-tight mb-3 md:group-hover:text-rust transition-colors duration-300">
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
