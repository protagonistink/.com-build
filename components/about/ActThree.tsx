'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

const BELIEFS = [
  {
    word: 'TRUTH',
    body: "Strategy without conviction is just noise. We start with what you actually believe, then build outward.",
    dark: true,
    color: 'text-paper',
  },
  {
    word: 'TENSION',
    body: "The line that lands changes the room. We find the sentence that carries your case without extra scaffolding.",
    dark: false,
    color: 'text-ink',
  },
  {
    word: 'STORY',
    body: "Authenticity, passion, drama, thrill — these aren\u2019t soft assets. They\u2019re the only things audiences remember.",
    dark: true,
    color: 'text-rust',
  },
] as const;

function BeliefPanel({
  word,
  body,
  dark,
  color,
}: (typeof BELIEFS)[number]) {
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const wordOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 1, 0.04]);
  const bodyOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.35, 0.55], [40, 0]);

  return (
    <div
      ref={containerRef}
      className={`relative min-h-[100vh] ${dark ? 'bg-trueblack' : 'bg-paper'}`}
    >
      {dark && (
        <div className="absolute inset-0 texture-grain opacity-[0.06] pointer-events-none" />
      )}

      <div className="sticky top-0 h-screen flex items-center justify-center flex-col px-6">
        <motion.h2
          className={`about-belief-word ${color}`}
          style={{
            opacity: prefersReduced ? 1 : wordOpacity,
            fontSize: 'clamp(5rem, 18vw, 14rem)',
          }}
        >
          {word}
        </motion.h2>

        <motion.p
          className={`font-sans max-w-lg text-center mt-8 ${dark ? 'text-paper/60' : 'text-ink/60'}`}
          style={{
            opacity: prefersReduced ? 1 : bodyOpacity,
            y: prefersReduced ? 0 : bodyY,
            fontSize: '1rem',
            lineHeight: 1.65,
          }}
        >
          {body}
        </motion.p>
      </div>
    </div>
  );
}

export default function ActThree() {
  return (
    <div>
      {BELIEFS.map((belief) => (
        <BeliefPanel key={belief.word} {...belief} />
      ))}
    </div>
  );
}
