'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { ABOUT_EASE } from '@/components/about/motion';

interface BreathProps {
  variant: 'void' | 'rule' | 'timecode' | 'deep';
  timecode?: string;
}

export default function Breath({ variant, timecode }: BreathProps) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const show = prefersReduced || inView;

  if (variant === 'rule') {
    return (
      <div
        ref={ref}
        className="relative min-h-[30vh] bg-paper texture-paper flex items-center justify-center"
        aria-hidden="true"
      >
        <motion.div
          className="w-full max-w-xs h-px bg-rust/50"
          initial={{ scaleX: 0 }}
          animate={show ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, ease: ABOUT_EASE }}
        />
      </div>
    );
  }

  const isDeep = variant === 'deep';
  const minHeight =
    variant === 'deep'
      ? 'min-h-[55vh]'
      : variant === 'timecode'
        ? 'min-h-[40vh]'
        : 'min-h-[45vh]';
  const grainOpacity = isDeep ? 'opacity-[0.08]' : 'opacity-[0.06]';

  return (
    <div
      ref={ref}
      className={`relative ${minHeight} bg-[#050505] flex items-center justify-center overflow-hidden`}
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 ${grainOpacity} pointer-events-none mix-blend-overlay`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {variant === 'timecode' && timecode && (
        <motion.p
          className="about-timecode text-paper/30 relative z-10"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: ABOUT_EASE }}
        >
          {timecode}
        </motion.p>
      )}
    </div>
  );
}
