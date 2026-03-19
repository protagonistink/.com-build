'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import TypewriterHeadline from '@/components/TypewriterHeadline';

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[#0A0A0A]">

      {/* ── Background: Technical typewriter blueprint ── */}
      <div className="absolute inset-0 z-0">
        {/* The image — right-anchored, fills height */}
        <Image
          src="/hero-typewriter.png"
          alt=""
          fill
          priority
          className="object-cover object-right"
          style={{ opacity: 0.85 }}
          sizes="100vw"
        />

        {/* Left shadow — pulls left into ink, anchors text legibility */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to right, #2C2C2C 0%, rgba(44,44,44,0.75) 35%, rgba(44,44,44,0.30) 58%, transparent 80%)',
          }}
        />

        {/* Bottom grounding shadow */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to top, rgba(44,44,44,0.88) 0%, rgba(44,44,44,0.20) 18%, transparent 40%)',
          }}
        />

        {/* Top fade — keeps nav area clean */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(44,44,44,0.50) 0%, transparent 14%)',
          }}
        />

        {/* Left edge radial bloom — breaks the hard painted-wall feel */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 38% 55% at 0% 52%, rgba(255,255,255,0.018) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Film grain — softens the digital sharpness of the blueprint */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            opacity: 0.09,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-20 pl-8 md:pl-12 lg:pl-32 pr-8 pt-[96px] pb-20 max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col items-start">

          {/* ── Headline block — typewriter word-by-word ── */}
          <div
            className="flex flex-col items-start"
            style={{ lineHeight: 0.88 }}
          >
            <span
              className="font-[family-name:var(--font-cormorant)] font-normal text-[#FAFAFA] tracking-[-0.03em] block"
              style={{ fontSize: 'clamp(2.8rem, 12vw, 9.5rem)' }}
            >
              <TypewriterHeadline
                text="The noise"
                wordDelay={100}
                initialDelay={300}
              />
            </span>
            <span
              className="font-[family-name:var(--font-cormorant)] italic font-light text-[#9B9EA4] tracking-[-0.03em] flex items-baseline"
              style={{ fontSize: 'clamp(2.8rem, 12vw, 9.5rem)' }}
            >
              <TypewriterHeadline
                text="is winning."
                wordDelay={100}
                initialDelay={520}
                showCursor
              />
            </span>
          </div>

          {/* ── Subcopy + CTA ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.0 }}
            className="mt-10 md:mt-12 max-w-[480px]"
          >
            <p
              className="font-[family-name:var(--font-satoshi)] text-[#9B9EA4] leading-[1.75] mb-9"
              style={{ fontSize: 'clamp(14px, 1.4vw, 19px)' }}
            >
              Today&apos;s market demands clarity, authenticity, and entertainment. And every week without a clear story means your competitors don&apos;t have to be better — just louder.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7 }}
              className="flex flex-col items-start gap-3"
            >
              <span
                className="font-[family-name:var(--font-satoshi)] text-[#9B9EA4] leading-[1.75]"
                style={{ fontSize: 'clamp(14px, 1.4vw, 19px)' }}
              >
                Want to know if your story lands?
              </span>
              <Link
                href="/story-teardown"
                className="inline-flex items-center gap-4 bg-[var(--color-rust)] hover:bg-[#a83020] text-white pl-8 pr-6 py-[15px] font-[family-name:var(--font-satoshi)] font-bold text-[13px] uppercase tracking-[0.18em] transition-all duration-300 group shadow-lg shadow-black/20"
              >
                We&apos;ll tear down your story
                <span className="group-hover:translate-x-2 transition-transform duration-300 text-[17px]">→</span>
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.05] z-20" />
    </section>
  );
}
