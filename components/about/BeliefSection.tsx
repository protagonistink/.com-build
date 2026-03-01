'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export default function BeliefSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <section ref={ref} className="bg-paper texture-paper py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">

        {/* Pull-quote treatment */}
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Rust quotation mark */}
          <span
            className="font-display text-rust block mb-4"
            style={{ fontSize: '5rem', lineHeight: 1, opacity: 0.6 }}
            aria-hidden
          >
            &ldquo;
          </span>

          {/* COPY: PI thesis — stated quietly, like Red narrating in Shawshank */}
          <blockquote
            className="font-display font-light italic text-ink"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            What turns a pawn into a protagonist?{' '}
            <em className="not-italic text-rust">Story.</em>
          </blockquote>

          <div className="w-12 h-px bg-rust mx-auto mt-10 mb-10" />

          <p className="text-technical text-coolgray text-xs tracking-[0.2em] uppercase">
            Protagonist Ink — Est. 2024
          </p>
        </motion.div>

        {/* Three-principle expansion */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-24 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="text-technical text-rust text-xs tracking-[0.2em] uppercase mb-4">
              01 — Truth over tactics
            </p>
            <p className="font-sans text-ink/70 leading-relaxed" style={{ fontSize: '0.9rem' }}>
              Strategy without conviction is just noise. We start with what you actually believe, then build outward.
            </p>
          </div>
          <div>
            <p className="text-technical text-rust text-xs tracking-[0.2em] uppercase mb-4">
              02 — Clarity is currency
            </p>
            <p className="font-sans text-ink/70 leading-relaxed" style={{ fontSize: '0.9rem' }}>
              The most powerful statements are the ones that cut through. We help you find the sentence that says everything.
            </p>
          </div>
          <div>
            <p className="text-technical text-rust text-xs tracking-[0.2em] uppercase mb-4">
              03 — Humanity above all
            </p>
            <p className="font-sans text-ink/70 leading-relaxed" style={{ fontSize: '0.9rem' }}>
              Authenticity, passion, drama, thrill — these aren&apos;t soft assets. They&apos;re the only things audiences remember.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
