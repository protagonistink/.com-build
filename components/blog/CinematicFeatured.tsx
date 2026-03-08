'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { BlogPost } from '@/types/blog';

export default function CinematicFeatured({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block relative">
      <div
        className="relative w-full overflow-hidden bg-trueblack"
        style={{ height: 'clamp(500px, 80vh, 920px)' }}
      >
        {/* Full-bleed background image */}
        {post.mainImage && (
          <Image
            src={post.mainImage}
            alt=""
            fill
            className="object-cover object-center opacity-[0.45] contrast-125 md:group-hover:opacity-[0.55] md:group-hover:scale-[1.02] transition-all duration-[1.2s] ease-out"
            sizes="100vw"
            priority
            referrerPolicy="no-referrer"
          />
        )}

        {/* Gradient overlay — cinematic bottom-heavy */}
        <div className="absolute inset-0 bg-gradient-to-t from-trueblack via-trueblack/65 via-35% to-trueblack/20" />

        {/* Film grain texture */}
        <div className="absolute inset-0 texture-grain opacity-40 pointer-events-none" />

        {/* Faint editorial grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--color-coolgray) 1px, transparent 1px)',
            backgroundSize: '6rem 6rem',
          }}
        />

        {/* Ghost number — massive, top-right */}
        <div className="absolute top-12 right-8 md:right-16 lg:right-24 font-serif text-[10rem] md:text-[16rem] lg:text-[20rem] text-warmwhite/[0.03] italic leading-none pointer-events-none select-none">
          01
        </div>

        {/* Content — pinned to bottom */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-12 pb-12 md:pb-16 lg:pb-20 relative z-10">
            {/* Frosted eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 md:mb-8"
            >
              <span className="inline-flex items-center gap-3 backdrop-blur-md bg-trueblack/30 border border-warmwhite/[0.08] rounded-full px-4 py-1.5">
                <span className="text-technical text-[9px] tracking-[0.25em] text-warmwhite/50 italic">
                  {post.publishedAt}
                </span>
                <span className="w-3 h-px bg-rust/60" />
                <span className="text-technical text-[9px] tracking-[0.25em] text-warmwhite/50 italic">
                  {post.category}
                </span>
              </span>
            </motion.div>

            {/* Massive title */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-display uppercase leading-[0.85] tracking-tighter text-warmwhite max-w-4xl mb-6 md:mb-8 md:group-hover:text-warmwhite/90 transition-colors duration-500"
              style={{
                fontSize: 'clamp(2.2rem, 6.5vw, 5.5rem)',
                textShadow:
                  '0 2px 30px rgba(0,0,0,0.8), 0 1px 6px rgba(0,0,0,0.6)',
              }}
            >
              {post.title}
            </motion.h2>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-serif text-lg md:text-xl text-warmwhite/50 leading-relaxed max-w-xl mb-6 md:mb-7"
            >
              {post.excerpt}
            </motion.p>

            {/* Read CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <span className="text-technical text-[13px] tracking-[0.18em] uppercase text-warmwhite/55 border-b border-warmwhite/20 pb-1 group-hover:text-rust group-hover:border-rust/40 transition-colors duration-500">
                Read the latest ink
              </span>
            </motion.div>
          </div>

          {/* Rust accent line — bottom edge, scales on hover */}
          <div className="h-[3px] bg-rust origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
        </div>
      </div>
    </Link>
  );
}
