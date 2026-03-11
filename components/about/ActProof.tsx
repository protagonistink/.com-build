'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ABOUT_EASE } from '@/components/about/motion';

const QUOTES = [
  {
    text: "Patrick's a brilliant writer and an insightful collaborator. The work we did together is something I'm still proud of.",
    author: 'Partner',
    company: 'Product Design Leader, UX Director',
    isAnonymized: true,
  },
  {
    text: 'Amy combines vision with execution, bringing programs, partnerships, and artists together in ways that actually work.',
    author: 'Former colleague',
    company: 'Carnegie Hall',
    isAnonymized: true,
  },
  {
    text: 'Protagonist Ink sets the creative bar high, then manages to propel over top of it.',
    author: 'Client',
    company: 'Creative Director',
    isAnonymized: true,
  },
] as const;

export default function ActProof() {
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(containerRef, { once: true, margin: '-20%' });
  const show = prefersReduced || inView;

  return (
    <section ref={containerRef} className="relative bg-warmwhite py-24 md:py-32 flex items-center overflow-hidden border-y border-ink/8">
      <div className="absolute inset-0 texture-paper opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-y-0 left-[max(1.5rem,calc(50%-42rem))] hidden xl:block w-px bg-rust/10 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,15rem)_1fr] gap-10 md:gap-16 items-start mb-14 md:mb-18">
          <div>
            <p className="about-scene-label text-rust mb-4">The Proof</p>
            <div className="about-rule mb-6 !bg-rust/35" />
            <p className="font-sans text-[0.8rem] uppercase tracking-[0.22em] text-ink/42">
              Selected lines from people who&apos;ve actually been in the room.
            </p>
          </div>

          <div className="max-w-3xl">
            <h2
              className="font-display font-light text-ink"
              style={{ fontSize: 'clamp(2.2rem, 4.4vw, 4rem)', lineHeight: 1.02 }}
            >
              Evidence, not posture.
            </h2>
            <p className="font-sans text-ink/62 mt-5 max-w-2xl" style={{ fontSize: '1rem', lineHeight: 1.72 }}>
              The page can be cinematic. The work still has to land with actual people. These are the people who have seen that happen up close.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-14 md:gap-16">
          {QUOTES.map((quote, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: idx * 0.18, ease: ABOUT_EASE }}
              className="relative max-w-3xl border-t border-rust/14 pt-8 md:pt-10"
              style={{
                marginLeft: idx % 2 === 1 ? 'auto' : '0',
                textAlign: idx % 2 === 1 ? ('right' as const) : ('left' as const),
              }}
            >
              <span
                className={`absolute -top-3 ${idx % 2 === 1 ? 'right-0' : 'left-0'} font-sans text-[10px] tracking-[0.28em] uppercase text-rust/50`}
              >
                0{idx + 1}
              </span>
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
        </div>
      </div>
    </section>
  );
}
