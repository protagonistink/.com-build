'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { ABOUT_EASE } from '@/components/about/motion';

export default function ActTwo() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const show = prefersReduced || inView;

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] bg-paper overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-5 min-h-[100svh]">
        {/* Amy's photo — 3 cols on desktop */}
        <motion.div
          className="relative min-h-[50vh] md:min-h-full md:col-span-3 group overflow-hidden"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={show ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, ease: ABOUT_EASE }}
        >
          <Image
            src="/images/about/amy.jpg"
            alt="Amy Kirkland speaking at a podium"
            fill
            className="object-cover object-[42%_24%] grayscale sepia-[0.08] contrast-[1.15] brightness-[0.82] transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          <div className="absolute inset-0 texture-grain opacity-50 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-amber-900/10 mix-blend-color" />

          <p className="absolute bottom-4 left-4 about-caption text-white/55">
            Fig 1. Atlanta, GA — Home Base
          </p>
        </motion.div>

        {/* Text — 2 cols on desktop */}
        <motion.div
          className="md:col-span-2 flex flex-col justify-center px-8 md:px-12 lg:px-16 py-20"
          initial={{ opacity: 0, x: 24 }}
          animate={show ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.88, delay: 0.15, ease: ABOUT_EASE }}
        >
          <p className="about-scene-label text-rust mb-7">The Origin</p>

          <h2
            className="font-display font-light text-ink"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.35rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            It started with<br />
            <em className="italic">a realization.</em>
          </h2>

          <div className="about-rule mt-8 mb-8" />

          <p
            className="font-sans text-ink/70 leading-relaxed mb-6"
            style={{ fontSize: '1rem' }}
          >
            Two careers. One late conversation. A quiet realization that kept repeating:
            exceptional organizations were being overlooked not because they lacked merit,
            but because their narrative couldn&apos;t carry the weight of their work.
          </p>

          <p
            className="font-sans text-ink/70 leading-relaxed mb-6"
            style={{ fontSize: '1rem' }}
          >
            So we did what any two people on the edge of something do: we built a raft.
          </p>

          <div className="border-t border-ink/12 pt-6 grid grid-cols-[auto,1fr] gap-x-4 gap-y-3 max-w-lg">
            <p className="about-caption text-rust">Credits</p>
            <p className="about-caption text-ink/50">
              Twenty years in Fortune 500 campaigns
            </p>
            <p className="about-caption text-rust">Credits</p>
            <p className="about-caption text-ink/50">
              Twenty years in world-class arts institutions
            </p>
            <p className="about-caption text-rust">Throughline</p>
            <p className="about-caption text-ink/50">
              One shared belief: story changes everything
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
