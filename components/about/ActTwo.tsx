'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { ABOUT_EASE } from '@/components/about/motion';

export default function ActTwo() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const show = prefersReduced || inView;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const creditsY = useTransform(scrollYProgress, [0, 0.45, 1], ['26vh', '4vh', '-10vh']);
  const creditsOpacity = useTransform(scrollYProgress, [0.08, 0.3, 0.85], [0, 1, 0.92]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-[120svh] bg-paper overflow-hidden"
    >
      {/* Martini sketch background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          style={prefersReduced ? undefined : { scale: imgScale }}
        >
          <Image
            src="/images/pages/martini_bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Fade the sketch to keep text legible — heavier on left where text sits */}
          <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/85 to-paper/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-paper/60 via-transparent to-paper/70" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 relative z-10 px-6 md:px-12 h-[120svh]">
        <motion.div
          className="flex flex-col justify-end pb-14 md:pb-24"
          initial={{ opacity: 0, x: -30 }}
          animate={show ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.88, delay: 0.15, ease: ABOUT_EASE }}
          style={prefersReduced ? undefined : { y: creditsY, opacity: creditsOpacity }}
        >
          <p className="about-scene-label text-rust mb-7">The Origin</p>

          <h2
            className="font-display font-light text-ink"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            It started with<br />
            <em className="italic text-rust">a realization.</em>
          </h2>

          <div className="about-rule mt-8 mb-8 !bg-ink/15" />

          <p
            className="font-sans text-ink/65 leading-relaxed mb-6 max-w-lg"
            style={{ fontSize: '1.05rem' }}
          >
            Two careers — one in editorial strategy, one in agency creative.
            A late conversation that kept circling the same frustration:
            exceptional organizations were being overlooked not because they lacked merit,
            but because their narrative couldn&apos;t carry the weight of their work.
          </p>

          <p
            className="font-sans text-ink/65 leading-relaxed max-w-lg"
            style={{ fontSize: '1.05rem' }}
          >
            So we did what any two people on the edge of something do: we built a raft.
          </p>

          <Link
            href="/story-teardown"
            className="inline-flex items-center font-sans text-sm tracking-wide text-ink/30 hover:text-ink/60 transition-colors mt-10"
          >
            Ready to talk? Start a story teardown <span className="ml-2 text-rust/60">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
