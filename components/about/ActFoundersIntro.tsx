'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ABOUT_EASE } from '@/components/about/motion';

export default function ActFoundersIntro() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-12%' });
  const show = prefersReduced || inView;

  return (
    <section ref={ref} className="relative bg-paper py-16 md:py-20 overflow-hidden border-y border-ink/10">
      <div className="absolute inset-0 texture-paper opacity-[0.03] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.78, ease: ABOUT_EASE }}
        >
          <p className="about-scene-label text-rust mb-4">The Founders</p>

          <h2
            className="font-display text-ink leading-[0.86] tracking-[-0.035em] uppercase"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 10.8rem)',
              fontWeight: 500,
            }}
          >
            The Storytellers
          </h2>

          <div className="mt-5 h-px w-full max-w-[980px] bg-rust/30" />
        </motion.div>
      </div>
    </section>
  );
}
