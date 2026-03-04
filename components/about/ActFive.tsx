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
  const [phase, setPhase] = useState(prefersReduced ? 5 : 0);
  // phase 0 = waiting, 2 = typewriter done, 3 = second line, 4 = CTA text, 5 = cursor drop & button glow

  useEffect(() => {
    if (prefersReduced || !inView) return;
    const t1 = setTimeout(() => setPhase(2), 1600);
    const t2 = setTimeout(() => setPhase(3), 2200);
    const t3 = setTimeout(() => setPhase(4), 3200);
    const t4 = setTimeout(() => setPhase(5), 3800); // Cursor drop starts
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
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
          animate={prefersReduced || inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: ABOUT_EASE }}
        >
          The Resolution
        </motion.p>

        {/* Typewriter headline */}
        <h2
          className="font-display font-light text-paper"
          style={{
            fontSize: 'var(--step-4)',
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
          className="font-display font-light italic text-paper mt-6"
          style={{
            fontSize: 'var(--step-4)',
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
        <div className="mt-20 relative">
          <motion.p
            className="font-sans text-paper/58 mb-10 max-w-md mx-auto"
            style={{ fontSize: 'var(--step-0)', lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 12 }}
            animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: ABOUT_EASE }}
          >
            Let&apos;s find it together.
          </motion.p>

          <div className="relative inline-block">
            {/* The dropping cursor line */}
            <motion.div
              className="absolute top-0 left-1/2 w-[2.5px] h-[50px] bg-rust -translate-x-1/2 z-20 origin-bottom"
              initial={{ opacity: 0, y: -160, scaleY: 1 }}
              animate={
                phase >= 5
                  ? { opacity: [0, 1, 1, 0], y: [-160, -10, 0, 0], scaleY: [1, 1, 0.5, 0] }
                  : {}
              }
              transition={{ duration: 0.9, ease: 'easeIn', times: [0, 0.2, 0.8, 1] }}
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: ABOUT_EASE }}
            >
              <Link
                href="/story-teardown"
                className={`inline-flex items-center gap-5 text-white pl-10 pr-8 py-5 font-sans font-bold text-xs uppercase tracking-[0.22em] transition-all duration-700 group shadow-2xl ${phase >= 5 ? 'bg-rust shadow-rust/20' : 'bg-transparent border border-white/10'}`}
              >
                <span>Start your story teardown</span>
                <motion.span
                  className="text-lg"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </div>

          <motion.p
            className="about-timecode text-paper/35 mt-10"
            initial={{ opacity: 0 }}
            animate={phase >= 4 ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: ABOUT_EASE }}
          >
            INT. YOUR BRAND — NOW
          </motion.p>
        </div>
      </div>
    </section>
  );
}
