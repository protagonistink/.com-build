'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { ABOUT_EASE } from '@/components/about/motion';

const QUOTES = [
  {
    text: 'They found the story hiding in our own data.',
    author: 'VP Product',
    company: 'Series C FinTech',
    isAnonymized: true,
  },
  {
    text: "Patrick's a brilliant writer and an insightful collaborator. The work we did together is something I'm still proud of.",
    author: 'Jade Nakabayashi',
    company: 'Product Design Leader, UX Director',
    isAnonymized: false,
  },
  {
    text: 'Protagonist Ink sets the creative bar high, then manages to propel over top of it.',
    author: 'Maureen Tsuchida',
    company: 'Award-Winning Copywriter, Creative Director',
    isAnonymized: false,
  },
] as const;

export default function ActProof() {
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(containerRef, { once: true, margin: '-20%' });
  const show = prefersReduced || inView;

  return (
    <section ref={containerRef} className="relative bg-warmwhite py-20 md:py-24 flex items-center overflow-hidden">
      <div className="absolute inset-0 texture-paper opacity-[0.03] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col gap-14 md:gap-16">
          {QUOTES.map((quote, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: idx * 0.18, ease: ABOUT_EASE }}
              className="max-w-3xl"
              style={{
                marginLeft: idx % 2 === 1 ? 'auto' : '0',
                textAlign: idx % 2 === 1 ? ('right' as const) : ('left' as const),
              }}
            >
              <blockquote className="relative font-display font-light text-ink leading-[1.14] mb-6" style={{ fontSize: 'var(--step-3)' }}>
                <span
                  className={`absolute -top-5 ${idx % 2 === 1 ? '-right-4 md:-right-7' : '-left-4 md:-left-7'} text-rust/20 font-display font-light leading-none select-none`}
                  style={{ fontSize: 'var(--step-5)' }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                {quote.text}
              </blockquote>

              <div
                className="font-sans text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-rust flex items-center justify-start gap-2"
                style={{ justifyContent: idx % 2 === 1 ? 'flex-end' : 'flex-start' }}
              >
                <span>{quote.author}</span>
                <span className="w-1.5 h-px bg-rust/30" />
                <span className="text-ink/60 tracking-[0.14em]">{quote.company}</span>
                {quote.isAnonymized && (
                  <span className="text-[9px] lowercase opacity-40 italic tracking-normal ml-1">(identity protected)</span>
                )}
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: QUOTES.length * 0.18 + 0.25, ease: ABOUT_EASE }}
            className="text-center mt-3 pt-10 border-t border-rust/10"
          >
            <Link href="/work" className="group inline-flex items-center text-ink/74 hover:text-rust transition-colors font-sans text-sm tracking-[0.2em] uppercase">
              Read our Case Studies
              <motion.span
                className="ml-3"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.45, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
