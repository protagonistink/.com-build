'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { ABOUT_EASE } from '@/components/about/motion';

export default function ActFive() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const show = prefersReduced || inView;

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] bg-trueblack flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-paper/14 to-transparent pointer-events-none" />
      {/* Film grain */}
      <div className="absolute inset-0 texture-grain opacity-[0.06] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.p
          className="about-scene-label text-paper/40 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: ABOUT_EASE }}
        >
          Final Beat
        </motion.p>

        <motion.h2
          className="font-display font-light text-paper"
          style={{
            fontSize: 'var(--step-4)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: ABOUT_EASE }}
        >
          YOUR STORY ISN&apos;T MISSING.
          <br />
          <span className="italic text-rust">It&apos;s just waiting to be discovered.</span>
        </motion.h2>

        <div className="mt-8 w-12 h-px bg-rust/35 mx-auto" />

        <div className="mt-16 relative">
          <motion.p
            className="font-sans text-paper/58 mb-10 max-w-md mx-auto"
            style={{ fontSize: 'var(--step-0)', lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 12 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: ABOUT_EASE }}
          >
            Let&apos;s find it together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: ABOUT_EASE }}
          >
            <Link
              href="/story-teardown"
              className="inline-flex items-center gap-5 text-white pl-10 pr-8 py-5 font-sans font-bold text-xs uppercase tracking-[0.22em] transition-all duration-700 group shadow-2xl bg-rust shadow-rust/20 rounded-none border border-rust/70 hover:bg-[#c2462d] hover:shadow-rust/30"
            >
              <span>Start your story teardown</span>
              <motion.span
                className="text-lg"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
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
