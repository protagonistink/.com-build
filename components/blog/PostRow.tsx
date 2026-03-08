'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
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
        !hasImage ? 'md:group-hover:bg-ink/[0.03]' : ''
      }`}
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
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, delay: index * 0.06 }}
        className={`absolute -right-4 top-1/2 -translate-y-1/2 font-serif text-[10rem] md:text-[12rem] italic pointer-events-none select-none text-ink/[0.03] md:group-hover:-translate-x-6 transition-all duration-700 ease-out ${
          hasImage
            ? 'md:group-hover:text-warmwhite/[0.06]'
            : 'md:group-hover:text-ink/[0.07]'
        }`}
      >
        {num}
      </motion.div>

      {/* Rust accent line — animates in on scroll */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: index * 0.06 + 0.2 }}
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-rust origin-top z-10"
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-12 md:py-16 lg:py-20 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start relative z-10">
        {/* Metadata column */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: index * 0.06 + 0.1 }}
          className="md:col-span-3 flex md:flex-col gap-4 md:gap-3 pt-1"
        >
          <span
            className={`text-technical text-[11px] tracking-[0.2em] italic text-ink/25 transition-colors duration-500 ${
              hasImage
                ? 'md:group-hover:text-warmwhite/50'
                : 'md:group-hover:text-rust/70'
            }`}
          >
            {post.publishedAt}
          </span>
          {/* Rust rule — expands on hover */}
          <span className="hidden md:block w-0 h-px bg-rust md:group-hover:w-10 transition-all duration-500 ease-out" />
          <span className="md:hidden w-4 h-px bg-rust/40 self-center" />
          <span
            className={`text-technical text-[11px] tracking-[0.2em] italic text-ink/25 transition-colors duration-500 ${
              hasImage
                ? 'md:group-hover:text-warmwhite/50'
                : 'md:group-hover:text-rust/70'
            }`}
          >
            {post.category}
          </span>
        </motion.div>

        {/* Content column */}
        <div className="md:col-span-8 md:col-start-5 md:group-hover:translate-x-2 transition-transform duration-500 ease-out">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: index * 0.06 + 0.15 }}
            className={`font-display text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight mb-5 md:mb-6 text-ink/80 transition-colors duration-500 ${
              hasImage
                ? 'md:group-hover:text-warmwhite'
                : 'md:group-hover:text-ink'
            }`}
          >
            {post.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.06 + 0.25 }}
            className={`font-serif italic text-base md:text-lg leading-relaxed max-w-2xl text-ink/45 transition-colors duration-500 ${
              hasImage
                ? 'md:group-hover:text-warmwhite/60'
                : 'md:group-hover:text-ink/65'
            }`}
          >
            {post.excerpt}
          </motion.p>
        </div>
      </div>
    </Link>
  );
}
