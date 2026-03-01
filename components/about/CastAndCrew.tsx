'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

// Team data — illustrationSrc: path to commissioned illustration
const TEAM = [
  {
    name: 'Patrick Kirkland',
    role: 'Narrative Strategy',
    note: 'Twenty years turning Fortune 500 complexity into stories people actually remember.',
    initial: 'P',
  },
  {
    name: 'Amy Kirkland',
    role: 'Creative Direction',
    note: 'Twenty years building world-class arts institutions. Knows what moves an audience.',
    initial: 'A',
  },
];

// Polaroid-style portrait placeholder — SWAP inner div for <Image> when illustrations arrive
function PortraitCard({ initial, index }: { initial: string; index: number }) {
  const rotations = [-1, 1.5, -0.5, 2, -1.5];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.div
      className="bg-white p-3 pb-8 shadow-lg cursor-pointer"
      style={{ rotate: rotation }}
      whileHover={{ rotate: 0, scale: 1.03, transition: { duration: 0.25 } }}
    >
      <div className="aspect-[4/5] overflow-hidden bg-ink/5 relative">
        {/* Giant initial — polaroid placeholder feel */}
        <span
          className="font-display font-light absolute inset-0 flex items-center justify-center text-ink/10 select-none"
          style={{ fontSize: '10rem', lineHeight: 1 }}
          aria-hidden
        >
          {initial}
        </span>
        {/* SWAP: Replace span above with:
            <Image
              src={member.illustrationSrc}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              alt=""
            />
        */}
      </div>
    </motion.div>
  );
}

export default function CastAndCrew() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section ref={ref} className="bg-paper texture-paper py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">

        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-technical text-rust text-xs tracking-[0.2em] uppercase mb-3">
            The Cast
          </p>
          {/* COPY: Section headline */}
          <h2
            className="font-display font-light text-ink"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05 }}
          >
            Protagonists{' '}
            <em className="italic text-rust">at Play</em>
          </h2>
          {/* COPY: Tagline beneath headline */}
          <p className="font-sans text-coolgray text-sm mt-2 max-w-xl">
            Twenty years in Fortune 500 campaigns. Twenty years in world-class arts institutions.
            Together, we architect the stories that turn invisible into undeniable.
          </p>
        </motion.div>

        {/* Team grid — 1 col mobile, 2-4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Portrait placeholder — swap for illustrated portrait */}
              <PortraitCard initial={member.initial} index={i} />

              {/* Info beneath portrait */}
              <div className="mt-4">
                {/* COPY: Team member name */}
                <p className="font-display font-light text-ink" style={{ fontSize: '1.2rem' }}>
                  {member.name}
                </p>
                {/* COPY: Team member role/title */}
                <p className="text-technical text-rust text-[10px] tracking-[0.15em] uppercase mt-1">
                  {member.role}
                </p>
                {/* COPY: Team member note — one-liner character description */}
                <p className="font-sans text-ink/50 text-sm mt-2 leading-relaxed italic">
                  {member.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
