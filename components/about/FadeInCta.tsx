'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function FadeInCta() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-trueblack texture-grain flex items-center justify-center overflow-hidden"
    >
      {/* IMAGE: Horizon / threshold — the last frame before something begins.
          First light, mountain pass at dawn, open road, a window into new territory.
          REPLACE: Commission or source final image, add to /public/images/about/fade-in.jpg
          Unsplash search: "sunrise horizon cinematic", "mountain dawn", "open road first light" */}
      <div className="absolute inset-0 opacity-40">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80"
          alt=""
          fill
          className="object-cover"
        />
        {/* Double vignette — bottom and top so text center reads */}
        <div className="absolute inset-0 bg-gradient-to-t from-trueblack via-trueblack/60 to-trueblack/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-trueblack/50 to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Eyebrow — Gandalf framing */}
        <p
          className="font-display font-light italic text-paper/40 mb-6"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
        >
          Every Frodo needs a Gandalf.
        </p>

        {/* COPY: The big close — "Fade In." reframes the CTA as a beginning, not an ending */}
        <h2
          className="font-display font-light text-paper"
          style={{
            fontSize: 'clamp(4rem, 12vw, 10rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
          }}
        >
          Fade{' '}
          <em className="italic text-rust">In.</em>
        </h2>

        {/* COPY: Body — warm, conversational, forward-looking */}
        <p
          className="font-sans text-paper/50 mt-8 mb-12 max-w-md mx-auto"
          style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', lineHeight: 1.7 }}
        >
          Let&apos;s talk. We&apos;ll explore where you are, where you&apos;re trying to go,
          and if we&apos;re the right mentors to help you get there.
        </p>

        {/* CTA — text link with trailing rust rule (not a button) */}
        <Link
          href="/story-health-check"
          className="inline-flex items-center gap-4 text-rust hover:text-paper transition-colors duration-300 group"
        >
          <span className="font-mono text-sm uppercase tracking-[0.2em]">
            Start your journey
          </span>
          <span className="w-12 h-px bg-rust group-hover:bg-paper transition-colors duration-300 inline-block" />
        </Link>

        {/* Screenplay slug line — barely visible, cinematic detail */}
        <p
          className="font-sans text-paper/20 mt-10 uppercase tracking-[0.3em]"
          style={{ fontSize: '0.6rem', fontFamily: 'Courier New, monospace' }}
        >
          INT. YOUR BRAND — NOW
        </p>
      </motion.div>
    </section>
  );
}
