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
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-trueblack/10 to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.78, ease: ABOUT_EASE }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-16 items-end">
            <div>
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
            </div>

            <div className="max-w-md lg:justify-self-end">
              <p className="font-sans text-ink/62" style={{ fontSize: '1rem', lineHeight: 1.72 }}>
                Two different histories. One shared standard: story should survive contact with the real world, not just look convincing in a deck.
              </p>
            </div>
          </div>

          <div className="mt-6 h-px w-full max-w-[1120px] bg-rust/30" />
        </motion.div>
      </div>
    </section>
  );
}
