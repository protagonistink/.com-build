'use client';

import { motion } from 'motion/react';

export default function AboutHero() {
  return (
    <section className="relative min-h-screen bg-paper texture-paper flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden">

      {/* Crop marks — editorial detail */}
      <div className="crop-marks absolute inset-8 pointer-events-none" />

      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* COPY: Scene label — sets cinematic tone immediately */}
        <p className="font-mono text-coolgray/60 mb-8 text-xs tracking-[0.3em] uppercase text-center">
          Scene 1 — The Setup
        </p>

        {/* COPY: Hero headline — the recognition line. Visitor should feel seen, not pitched */}
        <h1
          className="font-display font-light text-ink mb-6"
          style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
          }}
        >
          Every brand<br />
          is living{' '}
          <em className="text-rust not-italic">a story.</em>
        </h1>

        {/* COPY: Subhead — first-line energy. Diagnosis before prescription */}
        <p
          className="font-sans text-ink/60 mt-8 max-w-lg mx-auto"
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', lineHeight: 1.6 }}
        >
          Most organizations don&apos;t have a strategy problem.<br />
          They have a story problem.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-technical text-coolgray text-[10px] tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-coolgray/40" />
      </motion.div>

      {/* Timecode — cinematic detail */}
      <p className="absolute bottom-12 left-6 font-mono text-ink/20 text-xs">
        00:00:01:24
      </p>
    </section>
  );
}
