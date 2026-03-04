'use client';

import { useState, useRef, type KeyboardEvent } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const METHODOLOGY_STEPS = [
  {
    num: '01',
    scene: 'EXT. THE BEGINNING — DAY',
    title: 'Discovery',
    body: 'We start by listening. Brand audit, stakeholder conversations, audience mapping. We find the story hiding in plain sight — the one you\'ve been living but haven\'t named yet.',
  },
  {
    num: '02',
    scene: 'INT. THE WRITING ROOM',
    title: 'Architecture',
    body: 'Strategy meets screenplay. We build the narrative framework: your brand\'s protagonist, conflict, stakes, and arc. The structure that every touchpoint can live inside.',
  },
  {
    num: '03',
    scene: 'EXT. INTO THE WORLD — DAY',
    title: 'Integration',
    body: 'Story without execution is just daydreaming. We help you carry the narrative into identity, messaging, campaigns, and culture — so the story actually lands.',
  },
  {
    num: '04',
    scene: 'INT. THE SHIFT',
    title: 'The Result',
    body: 'Invisibility becomes recognition. Confusion becomes conviction. Vendor becomes ally. Noise becomes narrative. Same organization. New story. Different future.',
  },
];

/* ─────────────────────────────────────────────
   METHODOLOGY ROW
   ───────────────────────────────────────────── */

function MethodologyRow({
  step,
  index,
  isOpen,
  onToggle,
  inView,
}: {
  step: (typeof METHODOLOGY_STEPS)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  inView: boolean;
}) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <motion.div
      className="relative border-t border-ink/10 group"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Main row — always visible */}
      <div
        className="relative flex items-center gap-4 md:gap-8 lg:gap-12 px-6 md:px-12 py-8 md:py-10 cursor-pointer select-none"
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
      >
        {/* Large overlapping number */}
        <span
          className="font-display font-bold text-ink/[0.05] leading-none flex-shrink-0 transition-colors duration-500 group-hover:text-ink/[0.10]"
          style={{ fontSize: 'clamp(4rem, 10vw, 8rem)' }}
          aria-hidden
        >
          {step.num}
        </span>

        {/* Title block */}
        <div className="flex-1 min-w-0">
          {/* Scene heading — screenplay courier feel */}
          <p
            className="text-coolgray/50 uppercase tracking-wide mb-2"
            style={{ fontSize: '0.6rem', fontFamily: 'Courier New, monospace' }}
          >
            {step.scene}
          </p>

          {/* Step title */}
          <h3
            className="font-display font-light text-ink transition-colors duration-300 group-hover:text-rust"
            style={{ fontSize: 'clamp(1.35rem, 2.5vw, 2.25rem)', lineHeight: 1.1 }}
          >
            {step.title}
          </h3>
        </div>

        {/* Expand indicator — + rotates to × */}
        <motion.div
          className="relative flex-shrink-0 w-8 h-8 flex items-center justify-center"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="absolute w-4 h-px bg-rust" />
          <span className="absolute w-px h-4 bg-rust" />
        </motion.div>
      </div>

      {/* Expandable content area */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 md:px-12 pb-10 md:pb-14 md:pl-[calc(clamp(4rem,10vw,8rem)+5rem)]">
              {/* Rust accent line */}
              <div className="w-12 h-px bg-rust mb-6" />

              {/* Body text */}
              <p
                className="font-sans text-ink/55 leading-relaxed max-w-xl"
                style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.05rem)' }}
              >
                {step.body}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */

export default function ProductionNotes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={ref}
      className="relative bg-paper texture-paper py-32 md:py-48 overflow-hidden"
    >
      {/* Watermark label — bleeds off left edge, very faint */}
      <div
        className="absolute pointer-events-none select-none -left-12 top-1/3"
        aria-hidden
      >
        <span
          className="font-display font-bold text-ink/[0.04] uppercase tracking-[0.3em] block"
          style={{ fontSize: 'clamp(5rem, 15vw, 14rem)', whiteSpace: 'nowrap' }}
        >
          METHOD
        </span>
        <span
          className="font-mono text-ink/10 text-xs tracking-[0.4em] uppercase block mt-1 ml-2"
        >
          Criterion Collection Vol. 42
        </span>
      </div>

      {/* Section header */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-technical text-coolgray text-xs tracking-[0.2em] uppercase mb-3">
            Methodology &amp; Process
          </p>
          <h2
            className="font-display font-light text-ink"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05 }}
          >
            Production{' '}
            <em className="italic text-rust">Notes</em>
          </h2>
          <p className="font-sans text-coolgray mt-3 text-sm">
            Three acts. One through-line. A brand story built to last.
          </p>
        </motion.div>
      </div>

      {/* Methodology accordion */}
      <div className="relative max-w-[1400px] mx-auto">
        {METHODOLOGY_STEPS.map((step, i) => (
          <MethodologyRow
            key={step.num}
            step={step}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => handleToggle(i)}
            inView={inView}
          />
        ))}
        {/* Final bottom border */}
        <div className="border-t border-ink/10" />
      </div>
    </section>
  );
}
