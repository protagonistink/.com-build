'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';

export default function VillainSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-trueblack texture-grain flex items-center overflow-hidden"
    >
      {/* IMAGE: Atmospheric background — dark, no faces. Systemic force energy.
          Unsplash search: "dark corridor", "storm clouds", "fog forest", "empty street night"
          REPLACE: Commission or source final image, add to /public/images/about/ */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&q=80"
          alt=""
          fill
          className="object-cover opacity-30 grayscale contrast-125 scale-110 blur-sm"
          priority={false}
        />
        {/* Gradient mask — vertical, heavier at bottom so text reads */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-32">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Section label — pill badge */}
          <span className="inline-block px-3 py-1 border border-white/20 text-white/60 font-mono text-xs mb-10 uppercase tracking-widest">
            The Antagonist
          </span>

          {/* COPY: Villain headline — the structural force every PI client faces */}
          <h2
            className="font-display font-light text-paper"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            Ideas are{' '}
            <span
              className="italic text-rust"
              style={{ borderBottom: '2px solid #C83C2F' }}
            >
              fragile.
            </span>
          </h2>

          {/* COPY: Villain body — the stakes of being misunderstood */}
          <p
            className="font-sans text-paper/50 mt-10"
            style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', lineHeight: 1.7 }}
          >
            Dreams are easily misunderstood. Passions are easily dismissed.
            Without the right story, even the most worthy idea disappears — not because it failed,
            but because no one knew how to see it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
