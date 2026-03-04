'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { ABOUT_EASE } from '@/components/about/motion';

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const STEPS = [
  {
    num: '01',
    title: 'Discovery',
    desc: "We start by listening. Brand audit, stakeholder conversations, audience mapping — finding the story hiding in plain sight.",
    align: 'left' as const,
  },
  {
    num: '02',
    title: 'Architecture',
    desc: "Strategy meets screenplay. We build the narrative framework: protagonist, conflict, stakes, and arc.",
    align: 'right' as const,
  },
  {
    num: '03',
    title: 'Integration',
    desc: "Story without execution is just daydreaming. We carry the narrative into identity, messaging, campaigns, and culture.",
    align: 'left' as const,
  },
  {
    num: '04',
    title: 'The Result',
    desc: "Invisibility becomes recognition. Confusion becomes conviction. Same organization. New story. Different future.",
    align: 'right' as const,
  },
];

/* ─────────────────────────────────────────────
   STEP ROW
   ───────────────────────────────────────────── */

function StepRow({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const show = prefersReduced || inView;
  const isRight = step.align === 'right';

  return (
    <motion.div
      ref={ref}
      className={`relative py-16 md:py-20 border-b border-ink/8 ${isRight ? 'text-right' : 'text-left'}`}
      initial={{ opacity: 0, x: isRight ? 60 : -60 }}
      animate={show ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.88, delay: index * 0.05, ease: ABOUT_EASE }}
    >
      <div className={`flex items-baseline gap-6 md:gap-10 ${isRight ? 'flex-row-reverse' : ''}`}>
        <span
          className="about-step-number flex-shrink-0"
          style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}
          aria-hidden
        >
          {step.num}
        </span>

        <motion.div
          className="min-w-0"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 0.68, delay: 0.1 + index * 0.05, ease: ABOUT_EASE }}
        >
          <h3
            className="font-display font-light text-ink"
            style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
              lineHeight: 1.1,
            }}
          >
            {step.title}
          </h3>
          <p
            className="font-sans text-ink/60 mt-3 max-w-md"
            style={{ fontSize: '0.95rem', lineHeight: 1.6 }}
          >
            {step.desc}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PATRICK SCENE (ported from CastAndCrew)
   ───────────────────────────────────────────── */

function PatrickScene() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const show = prefersReduced || inView;
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <div ref={scrollRef} className="relative">
      <section
        ref={ref}
        className="relative min-h-[100svh] lg:min-h-[108vh] overflow-hidden bg-trueblack flex items-end"
      >
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <Image
            src="/images/about/patrick.jpg"
            alt="Patrick Kirkland speaking at a conference"
            fill
            className="object-cover object-[55%_25%] grayscale contrast-[1.3] brightness-[0.7]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-trueblack via-trueblack/80 via-30% to-trueblack/40" />
          <div className="absolute inset-0 bg-gradient-to-l from-trueblack/60 via-transparent to-transparent" />
          <div className="absolute inset-0 texture-grain opacity-50 mix-blend-overlay" />
          <div className="absolute inset-0 bg-amber-900/[0.08] mix-blend-color" />
        </motion.div>

        <div className="absolute top-[12vh] lg:top-[14vh] -left-[2vw] pointer-events-none select-none z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: ABOUT_EASE }}
          >
            <span
              className="font-display font-light text-white/[0.06] uppercase tracking-[-0.05em] leading-[0.78] block"
              style={{ fontSize: 'clamp(6rem, 18vw, 22rem)' }}
            >
              Patrick
            </span>
            <span
              className="font-display font-light text-white/[0.04] uppercase tracking-[-0.04em] leading-[0.78] block"
              style={{ fontSize: 'clamp(5rem, 14vw, 18rem)' }}
            >
              Kirkland
            </span>
          </motion.div>
        </div>

        <motion.p
          className="absolute top-8 lg:top-12 right-6 lg:right-12 about-scene-label text-white/45 pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease: ABOUT_EASE }}
        >
          EXT. THE ARCHITECT — CONTINUOUS
        </motion.p>

        <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 pb-16 lg:pb-24 pt-[45vh] lg:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-end">
            <motion.div
              className="lg:col-span-7 xl:col-span-8"
              initial={{ opacity: 0, y: 40 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.25, ease: ABOUT_EASE }}
            >
              <p className="about-scene-label text-rust mb-6 lg:mb-8">
                Founding Partner / Narrative Architect
              </p>
              <blockquote className="relative">
                <p
                  className="font-display font-light italic text-white leading-[1.05] tracking-[-0.02em]"
                  style={{
                    fontSize: 'clamp(1.8rem, 4.5vw, 4.2rem)',
                    textShadow: '0 2px 40px rgba(0,0,0,0.6)',
                  }}
                >
                  &ldquo;We don&apos;t write for the audience.
                  <br />
                  <span className="text-rust">We write for the room.</span>&rdquo;
                </p>
              </blockquote>
            </motion.div>

            <motion.div
              className="lg:col-span-5 xl:col-span-4 lg:pl-12 xl:pl-16"
              initial={{ opacity: 0, y: 30 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.86, delay: 0.45, ease: ABOUT_EASE }}
            >
              <p className="font-display text-white/80 text-lg lg:text-xl tracking-wide mb-4">
                Patrick Kirkland
              </p>
              <div className="about-rule mb-5" />
              <p
                className="font-sans text-white/42 leading-relaxed"
                style={{ fontSize: 'clamp(0.8rem, 1vw, 0.9rem)' }}
              >
                Twenty years turning Fortune 500 complexity into stories people actually remember.
                Patrick has directed brand narratives for organizations from early-stage startups to
                the Global 2000 — always searching for the single truth a company is afraid to say
                out loud, then building everything from that.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-rust origin-left z-30"
          initial={{ scaleX: 0 }}
          animate={show ? { scaleX: 1 } : {}}
          transition={{ duration: 1.45, delay: 0.35, ease: ABOUT_EASE }}
        />
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */

export default function ActFour() {
  const headerRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const headerInView = useInView(headerRef, { once: true, margin: '-10%' });
  const headerShow = prefersReduced || headerInView;

  return (
    <div>
      {/* Methodology Steps */}
      <section className="relative bg-paper texture-paper py-28 md:py-40 overflow-hidden">
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 16 }}
            animate={headerShow ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.78, ease: ABOUT_EASE }}
          >
            <p className="about-scene-label mb-3">Methodology &amp; Process</p>
            <h2
              className="font-display font-light text-ink"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05 }}
            >
              How we <em className="italic text-rust">work.</em>
            </h2>
          </motion.div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          {STEPS.map((step, i) => (
            <StepRow key={step.num} step={step} index={i} />
          ))}
        </div>
      </section>

      {/* Patrick Scene */}
      <PatrickScene />
    </div>
  );
}
