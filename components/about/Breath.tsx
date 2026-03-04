'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
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

  if (variant === 'deep') {
    return (
      <section ref={ref} className="relative min-h-[45vh] md:min-h-[52vh] overflow-hidden" aria-hidden="true">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          className="object-cover object-center grayscale contrast-[1.08] brightness-[0.36]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/80 via-trueblack/68 to-trueblack" />
        <div className="absolute inset-0 texture-grain opacity-[0.08] mix-blend-overlay" />

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 8 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: ABOUT_EASE }}
        >
          <p className="about-timecode text-paper/45">FADE IN</p>
        </motion.div>
      </section>
    );
  }

  const minHeight = variant === 'timecode' ? 'min-h-[40vh]' : 'min-h-[28vh]';

  return (
    <div
      ref={ref}
      className={`relative ${minHeight} bg-[#050505] flex items-center justify-center overflow-hidden`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
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
