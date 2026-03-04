'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import TypewriterHeadline from '@/components/TypewriterHeadline';

export default function ActOne() {
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 0.15, 0.35]);
  const headlineOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const punchlineOpacity = useTransform(scrollYProgress, [0.3, 0.38], [0, 1]);
  const bodyOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const timecodeOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] bg-trueblack overflow-hidden">
      {/* Background image — scroll-linked opacity */}
      <motion.div className="absolute inset-0" style={{ opacity: prefersReduced ? 0.3 : imageOpacity }}>
        <Image
          src="/hero-typewriter.png"
          alt=""
          fill
          className="object-cover object-right grayscale contrast-[1.25] brightness-[0.5]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/68 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/15" />
      </motion.div>

      {/* Film grain */}
      <div className="absolute inset-0 texture-grain opacity-[0.06] pointer-events-none" />

      {/* Crop marks */}
      <div className="crop-marks crop-marks-lg absolute inset-8 pointer-events-none" />

      {/* Timecode */}
      <motion.p
        className="fixed top-8 right-6 about-timecode text-paper/35 z-20 pointer-events-none"
        style={{ opacity: prefersReduced ? 1 : timecodeOpacity }}
      >
        CUT 00:00:01:24
      </motion.p>

      {/* Sticky content wrapper */}
      <div className="sticky top-[50vh] -translate-y-1/2 z-10 flex flex-col items-center text-center px-6">
        {/* Main headline */}
        <motion.div style={{ opacity: prefersReduced ? 1 : headlineOpacity }}>
          <h1
            className="font-display font-light text-paper"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            <TypewriterHeadline
              text="Every brand is living a story."
              wordDelay={80}
              initialDelay={200}
            />
          </h1>
        </motion.div>

        {/* Gut punch */}
        <motion.p
          className="font-sans uppercase tracking-[0.2em] text-paper/55 mt-12"
          style={{
            opacity: prefersReduced ? 1 : punchlineOpacity,
            fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
          }}
        >
          Most are losing theirs.
        </motion.p>

        {/* Villain body text */}
        <motion.p
          className="font-sans text-paper/45 max-w-xl mt-10 leading-[1.72]"
          style={{
            opacity: prefersReduced ? 1 : bodyOpacity,
            fontSize: 'clamp(0.92rem, 1.36vw, 1.08rem)',
          }}
        >
          Vision gets buried by noise, drift, and generic language. Without a clear narrative,
          worthy work is treated like optional work. You don&apos;t lose because you were wrong;
          you lose because no one could place the stakes fast enough.
        </motion.p>
      </div>
    </section>
  );
}
