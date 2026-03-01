'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';

export default function MentorSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section ref={ref} className="bg-paper overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">

        {/* Left — cinematic image */}
        <motion.div
          className="relative min-h-[50vh] md:min-h-full group overflow-hidden"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* IMAGE: Two people in conversation — warm light, candid, not posed. No faces needed.
              Unsplash search: "mentor student coffee", "candid conversation warm light", "two people talking window light"
              REPLACE: Commission or source final image, add to /public/images/about/mentor.jpg */}
          <Image
            src="https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=1200&q=80"
            alt="Two people in conversation — warm light"
            fill
            className="object-cover sepia-[0.2] contrast-125 transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Film grain + warm tint overlay */}
          <div className="absolute inset-0 texture-grain opacity-60 mix-blend-overlay" />
          <div className="absolute inset-0 bg-amber-900/10" />

          {/* Figure caption */}
          <p className="absolute bottom-4 left-4 text-technical text-white/40 text-[10px] tracking-[0.15em] uppercase">
            Fig 1. The Rough Draft
          </p>
        </motion.div>

        {/* Right — text */}
        <motion.div
          className="flex flex-col justify-center px-8 md:px-16 py-20"
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* COPY: Section label */}
          <p className="text-technical text-rust text-xs tracking-[0.2em] uppercase mb-8">
            The Origin
          </p>

          {/* COPY: Origin story headline */}
          <h2
            className="font-display font-light text-ink"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            It started with<br />
            <em className="italic">a realization.</em>
          </h2>

          <div className="w-8 h-px bg-rust mt-8 mb-8" />

          {/* COPY: Origin story body — the bev-nap founding story */}
          <p className="font-sans text-ink/70 leading-relaxed mb-6" style={{ fontSize: '1rem' }}>
            Two careers. A conversation over drinks. The world breaking open.
            We were both watching organizations we loved — incredible missions, brilliant people —
            struggle to be seen and understood. Not because they weren&apos;t worthy.
            Because they didn&apos;t have the story to carry them.
          </p>

          <p className="font-sans text-ink/70 leading-relaxed mb-6" style={{ fontSize: '1rem' }}>
            So we did what any two people on the edge of something do: we built a raft.
          </p>

          <ul className="font-sans text-ink/50 space-y-2" style={{ fontSize: '0.875rem' }}>
            <li className="flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-rust inline-block flex-shrink-0" />
              Twenty years in Fortune 500 campaigns
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-rust inline-block flex-shrink-0" />
              Twenty years in world-class arts institutions
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-rust inline-block flex-shrink-0" />
              One shared belief: story changes everything
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
