'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ABOUT_EASE } from '@/components/about/motion';

const STEPS = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We start by listening. Brand audit, stakeholder conversations, audience mapping, then a Narrative Audit that shows what is true and what is noise.',
    align: 'left' as const,
  },
  {
    num: '02',
    title: 'Architecture',
    desc: 'Strategy meets screenplay. We map protagonist, stakes, and conflict into a messaging architecture your team can actually use.',
    align: 'right' as const,
  },
  {
    num: '03',
    title: 'Integration',
    desc: 'Story without execution is daydreaming. We wire the narrative into positioning, identity, decks, campaign language, and sales conversation.',
    align: 'left' as const,
  },
  {
    num: '04',
    title: 'The Result',
    desc: 'Invisibility becomes recognition. Confusion becomes conviction. Same organization. Different gravity.',
    align: 'right' as const,
  },
] as const;

const BADGES = ['Narrative Audit', 'Messaging Architecture', 'Brand Playbook', 'Activation Rollout'] as const;

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
      className={`relative rounded-[2px] border border-ink/10 bg-paper/70 px-6 md:px-10 py-9 md:py-10 backdrop-blur-[1px] ${isRight ? 'md:ml-20' : 'md:mr-20'}`}
      initial={{ opacity: 0, x: isRight ? 42 : -42, y: 18 }}
      animate={show ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.82, delay: index * 0.08, ease: ABOUT_EASE }}
    >
      <div className={`absolute top-0 ${isRight ? 'right-0' : 'left-0'} h-full w-[3px] bg-rust/45`} aria-hidden />

      <div className={`flex items-start gap-5 md:gap-8 ${isRight ? 'md:flex-row-reverse md:text-right' : ''}`}>
        <span
          className="about-step-number flex-shrink-0"
          style={{
            fontSize: 'clamp(3.8rem, 9vw, 7rem)',
            color: 'color-mix(in srgb, var(--color-ink) 8%, transparent)',
            lineHeight: 0.8,
          }}
          aria-hidden
        >
          {step.num}
        </span>

        <div className={`min-w-0 ${isRight ? 'md:items-end' : ''}`}>
          <h3
            className="font-display font-light text-ink"
            style={{
              fontSize: 'clamp(1.5rem, 2.2vw, 2.05rem)',
              lineHeight: 1.05,
            }}
          >
            {step.title}
          </h3>

          <p
            className="font-sans text-ink/66 mt-3 max-w-xl"
            style={{ fontSize: '0.98rem', lineHeight: 1.62 }}
          >
            {step.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ActFour() {
  const headerRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const headerInView = useInView(headerRef, { once: true, margin: '-10%' });
  const headerShow = prefersReduced || headerInView;

  return (
    <section className="relative bg-paper py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 texture-paper opacity-[0.03] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 mb-12 md:mb-14">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 16 }}
          animate={headerShow ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.78, ease: ABOUT_EASE }}
          className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-14 items-end"
        >
          <div>
            <p className="about-scene-label text-rust mb-3">The Methodology</p>
            <h2
              className="font-display font-light text-ink"
              style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)', lineHeight: 1.02 }}
            >
              How we <em className="italic text-rust">work.</em>
            </h2>
          </div>

          <p
            className="font-sans text-ink/64 max-w-lg"
            style={{ fontSize: '0.98rem', lineHeight: 1.68 }}
          >
            Straight line, no performance theater: uncover what is true, shape it into a usable narrative system, and carry it into every place your brand shows up.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={headerShow ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.15, ease: ABOUT_EASE }}
          className="mt-8 flex flex-wrap gap-2.5"
        >
          {BADGES.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center border border-rust/30 bg-rust/5 text-rust px-3 py-1.5 font-sans text-[10px] md:text-[11px] tracking-[0.18em] uppercase"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 space-y-4 md:space-y-5">
        {STEPS.map((step, i) => (
          <StepRow key={step.num} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
