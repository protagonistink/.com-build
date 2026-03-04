'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useReducedMotion, useScroll, useTransform } from 'motion/react';
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
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const contentRollY = useTransform(scrollYProgress, [0, 0.28, 0.62], ['28vh', '10vh', '0vh']);

  const fadeInCtrl = useAnimation();
  const lineCtrl = useAnimation();

  useEffect(() => {
    if (prefersReduced) return;
    fadeInCtrl.start({ opacity: 1, transition: { duration: 0.85, delay: 0.2, ease: 'easeOut' } });
    lineCtrl.start({ scaleY: 1, transition: { duration: 1.05, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] } });
  }, [fadeInCtrl, lineCtrl, prefersReduced]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-trueblack overflow-hidden flex flex-col justify-center">
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

      {/* Crop marks — contained within inset-8 to avoid overflow */}
      <div className="crop-marks crop-marks-lg absolute inset-8 pointer-events-none" />

      {/* Faux film-strip perforation */}
      <div className="absolute inset-y-0 left-4 w-2 hidden md:block pointer-events-none reel-sprocket-run bg-[radial-gradient(circle_at_center,rgba(236,230,221,0.34)_22%,transparent_23%)] bg-[length:100%_22px]" />
      <div className="absolute inset-y-0 right-4 w-2 hidden md:block pointer-events-none reel-sprocket-run bg-[radial-gradient(circle_at_center,rgba(236,230,221,0.34)_22%,transparent_23%)] bg-[length:100%_22px]" />

      {/* Timecode */}
      <motion.p
        className="fixed top-8 right-6 about-timecode text-paper/35 z-20 pointer-events-none"
        style={{ opacity: prefersReduced ? 1 : timecodeOpacity }}
      >
        CUT 00:00:01:24
      </motion.p>

      {/* Scroll indicator — reel leader / vertical line */}
      <motion.div
        className="fixed inset-0 z-20 flex flex-col items-center pointer-events-none"
        style={{ opacity: prefersReduced ? 0 : scrollIndicatorOpacity }}
      >
        <motion.span
          className="about-scene-label text-paper/25 text-[11px] md:text-[12px] mt-[42vh]"
          initial={{ opacity: 0 }}
          animate={fadeInCtrl}
        >
          THE HOOK
        </motion.span>
        <div className="relative mt-3 h-[22vh] w-8 flex items-center justify-center reel-gate-jitter">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-5 border-x border-paper/10 reel-scanline-run" />
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[8px] h-[8px] rounded-full border border-paper/35 bg-trueblack/60"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={fadeInCtrl}
          />
          <motion.div
            className="w-px h-[20vh] bg-gradient-to-b from-paper/15 via-paper/55 to-rust/70 origin-top reel-flicker"
            initial={{ scaleY: 0 }}
            animate={lineCtrl}
          />
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-rust"
            animate={{ y: [0, 12, 36, 78, 120, 154], opacity: [0, 1, 1, 1, 0.8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.35 }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[8px] h-[8px] rounded-full border border-paper/35 bg-trueblack/60"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={fadeInCtrl}
          />
        </div>
      </motion.div>

      {/* Sticky content wrapper */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 py-20"
        style={{ y: prefersReduced ? 0 : contentRollY }}
      >
        {/* Main headline */}
        <motion.div style={{ opacity: prefersReduced ? 1 : headlineOpacity }}>
          <h1
            className="font-display font-light text-paper tracking-tight"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 8rem)',
              lineHeight: 0.9,
            }}
          >
            <TypewriterHeadline
              text="Every brand is living a story."
              wordDelay={80}
              initialDelay={200}
              showCursor
              cursorColor="bg-[var(--color-rust)]"
            />
          </h1>
        </motion.div>

        {/* Gut punch */}
        <motion.p
          className="font-sans uppercase tracking-[0.2em] text-paper/55 mt-8 md:mt-12"
          style={{
            opacity: prefersReduced ? 1 : punchlineOpacity,
            fontSize: 'var(--step-0)',
          }}
        >
          Most are losing theirs.
        </motion.p>

        {/* Villain body text */}
        <motion.p
          className="font-sans text-paper/45 max-w-xl mt-8 md:mt-10 leading-[1.72]"
          style={{
            opacity: prefersReduced ? 1 : bodyOpacity,
            fontSize: 'var(--step--1)',
          }}
        >
          You&apos;ve felt it — the pitch that should have landed, the positioning that reads
          like everyone else&apos;s, the brand story that gets a polite nod but never a callback.
          Vision gets buried by noise, drift, and generic language. You don&apos;t lose because
          you&apos;re wrong. You lose because no one could place the stakes fast enough.
        </motion.p>
      </motion.div>
    </section>
  );
}
