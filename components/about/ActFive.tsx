'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import TypewriterHeadline from '@/components/TypewriterHeadline';
import { ABOUT_EASE } from '@/components/about/motion';

export default function ActFive() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [phase, setPhase] = useState(prefersReduced ? 4 : 0);
  // phase 0 = nothing, 1 = label + typewriter, 2 = typewriter done, 3 = second line, 4 = CTA

  useEffect(() => {
    if (prefersReduced || !inView) return;
    setPhase(1);
    const t1 = setTimeout(() => setPhase(2), 1800);
    const t2 = setTimeout(() => setPhase(3), 2600);
    const t3 = setTimeout(() => setPhase(4), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [inView, prefersReduced]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] bg-trueblack flex items-center justify-center overflow-hidden"
    >
      {/* Film grain — slightly elevated */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        {/* Scene label */}
        <motion.p
          className="about-scene-label text-paper/45 mb-10"
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: ABOUT_EASE }}
        >
          SCENE 5 — FADE IN
        </motion.p>

        {/* Typewriter headline */}
        <h2
          className="font-display font-light text-paper"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
          }}
        >
          <TypewriterHeadline
            text="Your story isn't missing."
            wordDelay={120}
            initialDelay={400}
            showCursor
          />
        </h2>

        {/* Second line — fade, not typewriter */}
        <motion.p
          className="font-display font-light italic text-paper mt-4"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
          }}
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: ABOUT_EASE }}
        >
          It&apos;s <span className="not-italic text-rust">waiting.</span>
        </motion.p>

        {/* CTA block */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 12 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: ABOUT_EASE }}
        >
          <p
            className="font-sans text-paper/58 mb-8 max-w-md mx-auto"
            style={{ fontSize: '1rem', lineHeight: 1.6 }}
          >
            Let&apos;s find it together.
          </p>

          <Link
            href="/story-teardown"
            className="inline-flex items-center gap-4 bg-[var(--color-rust)] hover:bg-[#a83020] text-white pl-8 pr-6 py-[15px] font-[family-name:var(--font-satoshi)] font-bold text-[13px] uppercase tracking-[0.18em] transition-all duration-300 group shadow-lg shadow-black/20"
          >
            <span>Start your story teardown</span>
            <span className="group-hover:translate-x-2 transition-transform duration-300 text-[17px]">
              →
            </span>
          </Link>

          <p className="about-timecode text-paper/35 mt-10">
            INT. YOUR BRAND — NOW
          </p>
        </motion.div>
      </div>
    </section>
  );
}
