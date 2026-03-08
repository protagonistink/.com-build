import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

interface SuggestedReadingProps {
  posts: BlogPost[];
}

export default function SuggestedReading({ posts }: SuggestedReadingProps) {
  const displayPosts = posts.slice(0, 3);
  if (displayPosts.length === 0) return null;

  return (
    <section className="bg-[#f9f7f2] pb-24 md:pb-32 px-6 md:px-10 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="border-t border-ink/[0.20] pt-6 mb-16 md:mb-24 flex justify-between items-start">
          <h2 className="text-technical text-[11px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-ink/90 font-semibold">
            MORE INK...
          </h2>
          <span className="text-technical text-[10px] tracking-widest text-ink/40 hidden md:block">
            INDEX 01–{String(displayPosts.length).padStart(2, '0')}
          </span>
        </div>

        {/* Article Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 md:gap-x-16 lg:gap-x-24">
          {displayPosts.map((post, i) => {
            const num = String(i + 1).padStart(2, '0');
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-8"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-ink/[0.06] overflow-hidden w-full">
                  {post.mainImage ? (
                    <>
                      <Image
                        src={post.mainImage}
                        alt={post.mainImageAlt || post.title}
                        fill
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        referrerPolicy="no-referrer"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10 mix-blend-multiply" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display italic text-ink/[0.08] text-[6rem] leading-none">
                        {num}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4">
                  <span className="text-technical text-[11px] tracking-widest text-ink/40">
                    {num}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl leading-snug text-ink group-hover:text-ink/70 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-ink/60 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
