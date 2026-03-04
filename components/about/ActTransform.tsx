'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ABOUT_EASE } from '@/components/about/motion';

const PAIRS = [
  { old: 'Invisibility', new: 'Recognition' },
  { old: 'Confusion', new: 'Conviction' },
  { old: 'Vendor', new: 'Ally' },
  { old: 'Noise', new: 'Narrative' },
] as const;

function Arrow({ delay, show }: { delay: number; show: boolean }) {
  return (
    <div className="relative h-28 md:h-36 flex items-center justify-start group/arrow">
      {/* The shaft */}
      <motion.div
        className="absolute left-0 top-0 w-px origin-top bg-ink/35 group-hover/arrow:bg-rust transition-colors duration-500"
        initial={{ scaleY: 0 }}
        animate={show ? { scaleY: 1 } : {}}
        transition={{ duration: 1.2, delay, ease: ABOUT_EASE }}
        style={{ height: '100%' }}
      />
      {/* Arrowhead — a small V at the bottom */}
      <motion.svg
        viewBox="0 0 12 8"
        className="absolute left-[-5.5px] bottom-0 w-3 h-2 text-ink/35 group-hover/arrow:text-rust transition-colors duration-500"
        initial={{ opacity: 0, y: -4 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{
          opacity: { duration: 0.4, delay: delay + 0.8 },
          y: { duration: 0.6, delay: delay + 0.8, ease: "easeOut" }
        }}
      >
        <path d="M0 0 L6 8 L12 0" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </motion.svg>

      {/* Hover pulse — subtle glow on the shaft */}
      <motion.div
        className="absolute left-[-2px] w-[5px] bg-rust/0 group-hover/arrow:bg-rust/10 blur-sm transition-all duration-700"
        style={{ height: '100%', top: 0 }}
      />
    </div>
  );
}

function TransformColumn({
  pair,
  index,
  show,
}: {
  pair: (typeof PAIRS)[number];
  index: number;
  show: boolean;
}) {
  const stagger = index * 0.12;

  return (
    <div className="group/col">
      {/* Old World */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: stagger, ease: ABOUT_EASE }}
      >
        <p className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-gray mb-3">
          Old World
        </p>
        <h3
          className="font-display font-light text-ink leading-none group-hover/col:text-ink/50 transition-colors duration-500"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
        >
          {pair.old}
        </h3>
      </motion.div>

      {/* Arrow */}
      <div className="my-4 md:my-6">
        <Arrow delay={stagger + 0.3} show={show} />
      </div>

      {/* New World */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: stagger + 0.5, ease: ABOUT_EASE }}
      >
        <p className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-rust mb-3">
          New World
        </p>
        <h3
          className="font-display font-light text-ink leading-none group-hover/col:text-rust transition-colors duration-500"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
        >
          {pair.new}
        </h3>
      </motion.div>
    </div>
  );
}

export default function ActTransform() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-12%' });
  const show = prefersReduced || inView;

  return (
    <section
      ref={ref}
      className="relative bg-paper texture-paper py-10 md:py-14 overflow-hidden"
    >
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 md:gap-x-16 gap-y-16">
          {PAIRS.map((pair, i) => (
            <TransformColumn key={pair.old} pair={pair} index={i} show={show} />
          ))}
        </div>
      </div>
    </section>
  );
}
