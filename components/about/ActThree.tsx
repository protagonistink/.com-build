'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import Image from 'next/image';

const BELIEFS = [
  {
    word: 'TRUTH',
    body: "Strategy without conviction is just noise. We start with what you actually believe, then build outward.",
    dark: false,
    color: 'text-ink',
    bgImage: null,
  },
  {
    word: 'TENSION',
    body: "The line that lands changes the room. We find the sentence that carries your case without extra scaffolding.",
    dark: true,
    color: 'text-paper',
    bgImage: null,
  },
  {
    word: 'STORY',
    body: "Authenticity, passion, drama, thrill — these aren\u2019t soft assets. They\u2019re the only things audiences remember.",
    dark: true,
    color: 'text-rust',
    bgImage: '/images/pages/boyinboots.jpg',
  },
] as const;

function BeliefPanel({
  word,
  body,
  dark,
  color,
  bgImage,
}: (typeof BELIEFS)[number]) {
  if (bgImage) {
    return (
      <div className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center flex-col px-6 bg-trueblack overflow-hidden">
        {/* Background image */}
        <Image
          src={bgImage}
          alt=""
          fill
          className="object-cover object-center grayscale contrast-[1.1] brightness-[0.55]"
          sizes="100vw"
        />
        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-trueblack/50" />
        {/* Grain */}
        <div className="absolute inset-0 texture-grain opacity-[0.06] pointer-events-none" />

        <h2
          className={`about-belief-word ${color} relative z-10 transition-transform duration-700 hover:scale-[1.02] font-sans font-light`}
          style={{ fontSize: 'clamp(4.6rem, 18vw, 14rem)', letterSpacing: '-0.04em' }}
        >
          {word}
        </h2>

        <p
          className="font-sans max-w-lg text-center mt-8 relative z-10 text-paper/60"
          style={{ fontSize: 'var(--step-0)', lineHeight: 1.6 }}
        >
          {body}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative w-screen h-screen flex-shrink-0 flex items-center justify-center flex-col px-6 ${dark ? 'bg-trueblack' : 'bg-warmwhite'}`}>
      {dark && (
        <div className="absolute inset-0 texture-grain opacity-[0.06] pointer-events-none" />
      )}

      <h2
        className={`about-belief-word ${color} relative z-10 transition-transform duration-700 hover:scale-[1.02] font-sans font-light`}
        style={{ fontSize: 'clamp(4.6rem, 18vw, 14rem)', letterSpacing: '-0.04em' }}
      >
        {word}
      </h2>

      <p
        className={`font-sans max-w-lg text-center mt-8 relative z-10 ${dark ? 'text-paper/60' : 'text-ink/60'}`}
        style={{ fontSize: 'var(--step-0)', lineHeight: 1.6 }}
      >
        {body}
      </p>
    </div>
  );
}

/* Mobile vertical belief card */
function MobileBeliefCard({
  word,
  body,
  dark,
  color,
  bgImage,
}: (typeof BELIEFS)[number]) {
  if (bgImage) {
    return (
      <div className="relative min-h-[80vh] flex items-center justify-center flex-col px-6 py-20 bg-trueblack overflow-hidden border-b border-rust/10">
        <Image
          src={bgImage}
          alt=""
          fill
          className="object-cover object-center grayscale contrast-[1.1] brightness-[0.55]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-trueblack/50" />
        <div className="absolute inset-0 texture-grain opacity-[0.06] pointer-events-none" />

        <h2
          className={`about-belief-word ${color} relative z-10 font-sans font-light`}
          style={{ fontSize: 'clamp(4rem, 14vw, 8rem)', letterSpacing: '-0.04em' }}
        >
          {word}
        </h2>

        <p
          className="font-sans max-w-md text-center mt-6 relative z-10 text-paper/60 text-sm px-4"
          style={{ lineHeight: 1.65 }}
        >
          {body}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative min-h-[80vh] flex items-center justify-center flex-col px-6 py-20 border-b border-rust/5 ${dark ? 'bg-trueblack' : 'bg-warmwhite'}`}>
      {dark && (
        <div className="absolute inset-0 texture-grain opacity-[0.06] pointer-events-none" />
      )}

      <h2
        className={`about-belief-word ${color} relative z-10 font-sans font-light`}
        style={{ fontSize: 'clamp(4rem, 14vw, 8rem)', letterSpacing: '-0.04em' }}
      >
        {word}
      </h2>

      <p
        className={`font-sans max-w-md text-center mt-6 relative z-10 text-sm px-4 ${dark ? 'text-paper/60' : 'text-ink/60'}`}
        style={{ lineHeight: 1.65 }}
      >
        {body}
      </p>
    </div>
  );
}

function ScrollProgress({ progress }: { progress: MotionValue<number> }) {
  // 4 panels total (Intro + 3 Beliefs). 
  // progress 0-1 mapped to 0, 1, 2, 3
  const activeIndex = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3]);

  return (
    <div className="absolute bottom-12 right-12 z-20 flex flex-col items-end gap-3">
      {['INTRO', ...BELIEFS.map(b => b.word)].map((label, i) => {
        // Use a function to calculate opacity based on distance to activeIndex
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(activeIndex, (v: number) => {
          const distance = Math.abs(v - i);
          if (distance < 0.5) return 1;
          if (distance < 1) return 0.3 + (1 - distance) * 0.7;
          return 0.3;
        });

        return (
          <motion.div
            key={label}
            className="flex items-center gap-4 group cursor-pointer"
            style={{ opacity }}
          >
            <span className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-ink/80 group-hover:text-rust transition-colors">
              {label}
            </span>
            <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-ink' : 'bg-rust'} transition-transform group-hover:scale-125`} />
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ActThree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Calculate x movement for 4 panels (100vw each)
  const x = useTransform(scrollYProgress, [0, 0.82, 1], ['0%', '-75%', '-75%']);

  if (prefersReduced) {
    return (
      <div className="bg-warmwhite">
        <div className="min-h-screen flex items-center justify-center text-center px-6">
          <div className="max-w-3xl">
            <p className="about-scene-label text-rust mb-6">The Beliefs</p>
            <h2 className="font-display font-light text-ink text-4xl md:text-6xl mb-8 leading-[1.1]">
              What we <em className="italic text-rust font-serif">believe</em>.
            </h2>
          </div>
        </div>
        {BELIEFS.map((belief) => (
          <BeliefPanel key={belief.word} {...belief} />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Mobile: vertical stack (hidden on md+) */}
      <div className="md:hidden">
        <div className="min-h-[70vh] bg-warmwhite flex items-center justify-center text-center px-6 border-b border-rust/10">
          <div className="max-w-3xl">
            <p className="about-scene-label text-rust mb-6">Our Philosophy</p>
            <h2 className="font-display font-light text-ink text-4xl mb-4 leading-[1.1]">
              What we <em className="italic text-rust font-serif">believe</em>.
            </h2>
          </div>
        </div>
        {BELIEFS.map((belief) => (
          <MobileBeliefCard key={belief.word} {...belief} />
        ))}
      </div>

      {/* Desktop: horizontal scroll (hidden below md) */}
      <section ref={containerRef} className="relative h-[500vh] hidden md:block">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex h-full w-[400vw]">

            {/* Intro Panel — paper bg */}
            <div className="relative w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center px-6 bg-warmwhite">
              <div className="absolute inset-0 texture-paper opacity-[0.03] pointer-events-none" />
              <div className="max-w-3xl text-center relative z-10 transition-transform duration-700">
                <p className="about-scene-label text-rust mb-6">Our Philosophy</p>
                <h2 className="font-display font-light text-ink text-5xl md:text-7xl mb-8 leading-[1.1] tracking-tight">
                  What we <br /><em className="italic text-rust font-serif">believe</em>.
                </h2>
                <div className="w-12 h-px bg-rust/30 mx-auto mt-12" />
              </div>
            </div>

            {/* Belief Panels */}
            {BELIEFS.map((belief) => (
              <BeliefPanel key={belief.word} {...belief} />
            ))}

          </motion.div>

          {/* Progress indicator */}
          <ScrollProgress progress={scrollYProgress} />
        </div>
      </section>
    </>
  );
}
