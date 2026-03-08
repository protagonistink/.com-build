import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

interface PostRowProps {
  post: BlogPost;
  displayNumber: number;
  index: number;
}

export default function PostRow({ post, displayNumber, index }: PostRowProps) {
  const num = String(displayNumber).padStart(2, '0');
  const hasImage = !!post.mainImage;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block border-b border-ink/[0.06] relative overflow-hidden ${
        !hasImage ? 'group-hover:bg-ink/[0.03] group-active:bg-ink/[0.03]' : ''
      }`}
      style={{
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      {/* ── Hover-triggered color image background ── */}
      {hasImage && (
        <>
          <div
            className="absolute inset-0 opacity-0 md:group-hover:opacity-80 transition-opacity duration-700 ease-out"
          >
            <Image
              src={post.mainImage!}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Gradient overlay for text legibility */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 ease-out"
          />
        </>
      )}

      {/* Ghost number — massive, drifts on hover */}
      <div
        className={`absolute -right-4 top-1/2 -translate-y-1/2 font-serif text-[10rem] md:text-[12rem] italic pointer-events-none select-none text-ink/[0.03] md:group-hover:-translate-x-6 transition-all duration-700 ease-out ${
          hasImage
            ? 'md:group-hover:text-warmwhite/[0.06]'
            : 'md:group-hover:text-ink/[0.07]'
        }`}
      >
        {num}
      </div>

      {/* Rust accent line — editorial mark */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-rust origin-top scale-y-0 group-hover:scale-y-100 group-active:scale-y-100 transition-transform duration-500 ease-out z-10" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-12 md:py-16 lg:py-20 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start relative z-10">
        {/* Metadata column */}
        <div className="md:col-span-3 flex md:flex-col gap-4 md:gap-3 pt-1">
          <span
            className={`text-technical text-[11px] tracking-[0.2em] italic text-ink/25 transition-colors duration-500 ${
              hasImage
                ? 'md:group-hover:text-warmwhite/50'
                : 'group-hover:text-rust/70 group-active:text-rust/70'
            }`}
          >
            {post.publishedAt}
          </span>
          {/* Rust rule — expands on hover */}
          <span className="hidden md:block w-0 h-px bg-rust md:group-hover:w-10 transition-all duration-500 ease-out" />
          <span className="md:hidden w-4 h-px bg-rust/40 group-hover:w-8 group-hover:bg-rust/70 group-active:w-8 group-active:bg-rust/70 transition-all duration-500 ease-out self-center" />
          <span
            className={`text-technical text-[11px] tracking-[0.2em] italic text-ink/25 transition-colors duration-500 ${
              hasImage
                ? 'md:group-hover:text-warmwhite/50'
                : 'group-hover:text-rust/70 group-active:text-rust/70'
            }`}
          >
            {post.category}
          </span>
        </div>

        {/* Content column */}
        <div className="md:col-span-8 md:col-start-5 md:group-hover:translate-x-2 transition-transform duration-500 ease-out">
          <h2
            className={`font-display text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight mb-5 md:mb-6 text-ink/80 transition-colors duration-500 ${
              hasImage
                ? 'md:group-hover:text-warmwhite'
                : 'group-hover:text-ink group-active:text-ink'
            }`}
          >
            {post.title}
          </h2>

          <p
            className={`font-serif italic text-base md:text-lg leading-relaxed max-w-2xl text-ink/45 transition-colors duration-500 ${
              hasImage
                ? 'md:group-hover:text-warmwhite/60'
                : 'group-hover:text-ink/65 group-active:text-ink/65'
            }`}
          >
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
