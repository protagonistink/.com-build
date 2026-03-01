'use client';

import { useRef, useEffect, useState } from 'react';
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
  const rowRef = useRef<HTMLAnchorElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!hasImage || !rowRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, [hasImage]);

  return (
    <Link
      ref={rowRef}
      href={`/blog/${post.slug}`}
      className="group block border-b border-ink/[0.06] relative overflow-hidden"
      style={{
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      {/* ── Scroll-triggered color image background ── */}
      {hasImage && (
        <>
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              isActive ? 'opacity-80' : 'opacity-0'
            }`}
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
            className={`absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 transition-opacity duration-700 ease-out ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      )}

      {/* Ghost number — massive, drifts on hover */}
      <div
        className={`absolute -right-4 top-1/2 -translate-y-1/2 font-serif text-[10rem] md:text-[12rem] italic pointer-events-none select-none group-hover:-translate-x-6 transition-all duration-700 ease-out ${
          isActive ? 'text-warmwhite/[0.06]' : 'text-ink/[0.03]'
        }`}
      >
        {num}
      </div>

      {/* Rust accent line — editorial mark */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-rust origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out z-10" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-12 md:py-16 lg:py-20 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start relative z-10">
        {/* Metadata column */}
        <div className="md:col-span-3 flex md:flex-col gap-4 md:gap-3 pt-1">
          <span
            className={`text-technical text-[11px] tracking-[0.2em] italic transition-colors duration-500 ${
              isActive ? 'text-warmwhite/50' : 'text-ink/25'
            }`}
          >
            {post.publishedAt}
          </span>
          {/* Rust rule — expands on hover */}
          <span className="hidden md:block w-0 h-px bg-rust group-hover:w-10 transition-all duration-500 ease-out" />
          <span className="md:hidden w-4 h-px bg-rust/40 self-center" />
          <span
            className={`text-technical text-[11px] tracking-[0.2em] italic transition-colors duration-500 ${
              isActive ? 'text-warmwhite/50' : 'text-ink/25'
            }`}
          >
            {post.category}
          </span>
        </div>

        {/* Content column */}
        <div className="md:col-span-8 md:col-start-5 group-hover:translate-x-2 transition-transform duration-500 ease-out">
          <h2
            className={`font-display text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight mb-5 md:mb-6 transition-colors duration-500 ${
              isActive
                ? 'text-warmwhite group-hover:text-warmwhite/90'
                : 'text-ink/80 group-hover:text-rust'
            }`}
          >
            {post.title}
          </h2>

          <p
            className={`font-serif italic text-base md:text-lg leading-relaxed max-w-2xl transition-colors duration-500 ${
              isActive ? 'text-warmwhite/60' : 'text-ink/45'
            }`}
          >
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
