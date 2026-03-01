'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

// Service cards — the methodology made visible
const SERVICE_CARDS = [
  {
    num: '01',
    type: 'note' as const,
    scene: 'EXT. THE BEGINNING — DAY',
    title: 'Discovery',
    body: 'We start by listening. Brand audit, stakeholder conversations, audience mapping. We find the story hiding in plain sight — the one you\'ve been living but haven\'t named yet.',
    rotation: -2,
    accent: true,
  },
  {
    num: '02',
    type: 'standard' as const,
    scene: 'INT. THE WRITING ROOM',
    title: 'Architecture',
    body: 'Strategy meets screenplay. We build the narrative framework: your brand\'s protagonist, conflict, stakes, and arc. The structure that every touchpoint can live inside.',
    rotation: 1.5,
    accent: false,
  },
  {
    num: '03',
    type: 'polaroid' as const,
    scene: 'EXT. INTO THE WORLD — DAY',
    title: 'Integration',
    body: 'Story without execution is just daydreaming. We help you carry the narrative into identity, messaging, campaigns, and culture — so the story actually lands.',
    rotation: -1,
    accent: false,
  },
  {
    num: '→',
    type: 'wide' as const,
    scene: 'INT. THE SHIFT',
    title: 'The Result',
    body: 'Invisibility → Recognition. Confusion → Conviction. Vendor → Ally. Noise → Narrative. Same organization. New story. Different future.',
    rotation: 1,
    accent: false,
  },
];

type CardType = 'polaroid' | 'note' | 'standard' | 'crisis' | 'wide';

interface Stage {
  num: string;
  type: CardType;
  scene: string;
  title: string;
  body: string;
  rotation: number;
  accent: boolean;
}

function ArtifactCard({
  stage,
  index,
  inView,
}: {
  stage: Stage;
  index: number;
  inView: boolean;
}) {
  const isPolaroid = stage.type === 'polaroid';
  const isNote = stage.type === 'note';
  const isCrisis = stage.type === 'crisis';
  const isWide = stage.type === 'wide';

  const baseClasses = `relative p-6 cursor-pointer${isWide ? ' sm:col-span-2' : ''}`;
  const cardClasses = isPolaroid
    ? `${baseClasses} bg-white pb-12 shadow-lg`
    : isNote
    ? `${baseClasses} bg-amber-50 border-l-4 border-amber-400`
    : isCrisis
    ? `${baseClasses} bg-ink text-paper border border-white/10`
    : `${baseClasses} bg-warmwhite border border-ink/10`;

  return (
    <motion.div
      className={cardClasses}
      style={{
        boxShadow: isPolaroid
          ? '3px 4px 16px rgba(0,0,0,0.12)'
          : '2px 3px 12px rgba(0,0,0,0.06)',
      }}
      initial={{ opacity: 0, y: 20, rotate: stage.rotation - 3 }}
      animate={inView ? { opacity: 1, y: 0, rotate: stage.rotation } : {}}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, scale: 1.02, zIndex: 10, transition: { duration: 0.2 } }}
    >
      {/* Polaroid tape strip — .tape-strip CSS utility added in globals.css */}
      {isPolaroid && (
        <div className="tape-strip absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6" />
      )}

      {/* Scene heading — screenplay courier feel */}
      <p
        className={`mb-3 uppercase tracking-wide ${isCrisis ? 'text-paper/40' : 'text-coolgray'}`}
        style={{ fontSize: '0.6rem', fontFamily: 'Courier New, monospace' }}
      >
        {stage.scene}
      </p>

      {/* Stage number */}
      <span
        className={`font-display font-light text-rust${isCrisis ? ' animate-pulse' : ''}`}
        style={{ fontSize: '1.75rem', lineHeight: 1 }}
      >
        {stage.num}.
      </span>

      {/* Title */}
      <h3
        className={`font-display font-light mt-1 mb-3 ${isCrisis ? 'text-paper' : 'text-ink'}`}
        style={{ fontSize: '1.15rem', lineHeight: 1.1 }}
      >
        {stage.title}
      </h3>

      {/* Body */}
      <p
        className={`font-sans leading-relaxed ${isCrisis ? 'text-paper/60' : 'text-ink/60'}`}
        style={{ fontSize: '0.8rem' }}
      >
        {stage.body}
      </p>

      {/* Handwritten annotation on note cards — font-hand = Permanent Marker (added in globals.css) */}
      {isNote && (
        <p className="font-hand text-amber-600/70 mt-3 text-xs" style={{ transform: 'rotate(-1deg)' }}>
          ← start here
        </p>
      )}
    </motion.div>
  );
}

export default function ProductionNotes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      ref={ref}
      className="relative bg-paper texture-paper bg-texture py-32 md:py-48 px-6 md:px-12 overflow-hidden"
    >
      {/* Watermark label — bleeds off left edge, very faint */}
      <div
        className="absolute pointer-events-none select-none -left-12 top-1/3"
        aria-hidden
      >
        <span
          className="font-display font-bold text-ink/[0.06] uppercase tracking-[0.3em] block"
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

      <div className="relative max-w-[1400px] mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-technical text-coolgray text-xs tracking-[0.2em] uppercase mb-3">
            Methodology &amp; Process
          </p>
          {/* COPY: Section headline */}
          <h2
            className="font-display font-light text-ink"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05 }}
          >
            Production{' '}
            <em className="italic text-rust">Notes</em>
          </h2>
          {/* COPY: Section sub-label */}
          <p className="font-sans text-coolgray mt-3 text-sm">
            Three acts. One through-line. A brand story built to last.
          </p>
        </motion.div>

        {/* Service artifact cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {SERVICE_CARDS.map((stage, i) => (
            <ArtifactCard key={stage.num} stage={stage} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
