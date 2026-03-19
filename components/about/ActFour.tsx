'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'motion/react';
import { ABOUT_EASE } from '@/components/about/motion';

const STATEMENT_LINES = [
  {
    color: 'paper' as const,
    words: ['We', 'build', 'the', 'blueprint.'],
  },
  {
    color: 'paper' as const,
    words: ['The', 'narrative.', 'The', 'creative.'],
  },
  {
    color: 'rust' as const,
    words: ['So', 'you', 'can', 'build', 'the', 'transformation.'],
  },
] as const;

const STATEMENT_WORDS = STATEMENT_LINES.flatMap((line) =>
  line.words.map((text) => ({ text, color: line.color })),
);

const METHODOLOGY_BEATS = [
  {
    num: '01',
    meta: 'PHASE 01 // THE AUDIT',
    head1: 'WE START',
    head2: 'by listening.',
    body: 'We start by listening. We audit your current brand and marketing materials, speak to stakeholders, map your audiences. We want to discover the story hiding in plain sight.',
    img: 'https://images.unsplash.com/photo-1513470270416-d3ff6f16b22f?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=2400',
    alt: 'Two women in conversation across a table by a window',
    imagePosition: 'center bottom',
    reverse: false,
  },
  {
    num: '02',
    meta: 'PHASE 02 // ARCHITECTURE',
    head1: 'WE BUILD',
    head2: 'the foundation.',
    body: 'We\'re not going by vibes. We treat your brand like an Oscar-winning screenplay. We build the framework, flesh out the characters, and pull forward the scenes that get you noticed.',
    img: '/images/about/phase-architecture.jpg',
    alt: 'Hands writing in notebook, the making process',
    imagePosition: 'center center',
    reverse: true,
  },
] as const;

/* -----------------------------------------------------------------------
   Methodology Beat — 12-column alternating image + text grid
   "Heavy Humanity" editorial brutalist layout from Figma design
   ----------------------------------------------------------------------- */

function MethodologyBeat({ beat }: { beat: (typeof METHODOLOGY_BEATS)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.9, ease: ABOUT_EASE }}
      className="grid grid-cols-1 lg:grid-cols-12 min-h-[60vh] md:min-h-[75vh] mb-12 lg:mb-24 relative group"
    >
      {/* Image side — analog film feel with ink offset block */}
      <div
        className={`col-span-1 lg:col-span-6 relative flex items-center justify-center p-4 lg:p-0 ${beat.reverse ? 'lg:order-2' : 'lg:order-1'}`}
      >
        {/* Asymmetric offset block behind image */}
        <div
          className={`absolute w-[80%] h-[90%] bg-ink -z-10 transition-transform duration-700 ease-out group-hover:translate-x-2 group-hover:translate-y-2 ${beat.reverse ? 'right-0 lg:-right-4' : 'left-0 lg:-left-4'}`}
        />

        <div className="relative w-[90%] h-[400px] lg:h-[80%] overflow-hidden border border-paper/10 bg-trueblack">
          <Image
            src={beat.img}
            alt={beat.alt}
            fill
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-[1.05] transition-all duration-1000"
            style={{ objectPosition: beat.imagePosition }}
          />

          {/* Phase number stamped directly on image — human mark */}
          <div
            className={`absolute bottom-6 font-display text-6xl text-rust italic opacity-80 mix-blend-screen ${beat.reverse ? 'left-6' : 'right-6'}`}
          >
            {beat.num}
          </div>
        </div>
      </div>

      {/* Text side — brutalist typography juxtaposition */}
      <div
        className={`col-span-1 lg:col-span-6 flex flex-col justify-center pt-8 lg:pt-0 relative z-10 ${beat.reverse ? 'lg:order-1 lg:pr-16' : 'lg:order-2 lg:pl-16'}`}
      >
        {/* Phase metadata label */}
        <div className="flex items-center gap-4 mb-8 opacity-60">
          <div className="w-8 h-px bg-rust" />
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-paper">
            {beat.meta}
          </span>
        </div>

        <div className="relative z-10 w-full max-w-xl">
          {/* Heavy strict sans-serif — the brutalist voice */}
          <h3 className="font-sans text-4xl lg:text-[4.5rem] font-black text-paper leading-[0.9] tracking-tighter uppercase mb-2">
            {beat.head1}
          </h3>
          {/* Human flowing serif — the narrative warmth */}
          <h4 className="font-display text-5xl lg:text-[5.5rem] text-rust italic font-light leading-[0.8] tracking-normal lowercase -ml-1">
            {beat.head2}
          </h4>

          {/* Expanding rule — editorial punctuation */}
          <div className="w-12 h-[2px] bg-rust my-8 group-hover:w-24 transition-all duration-700 ease-out" />

          <p className="font-sans text-paper/80 text-[15px] lg:text-[17px] leading-[1.8] max-w-md">
            {beat.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* -----------------------------------------------------------------------
   Showstopper Finale — Beat 03, cinematic full-width moment
   ----------------------------------------------------------------------- */

function Showstopper() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1.2, ease: ABOUT_EASE }}
      className="w-full relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden border border-paper/10 mt-12 mb-32 group"
    >
      {/* Dark cinematic background */}
      <div className="absolute inset-0 bg-trueblack z-0">
        <Image
          src="/images/about/phase-execution.jpg"
          alt="The Stage"
          fill
          sizes="100vw"
          className="object-cover grayscale opacity-20 mix-blend-screen group-hover:opacity-40 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-trueblack)] via-transparent to-[var(--color-trueblack)] opacity-90" />
      </div>

      <div className="relative z-10 w-full px-4 lg:px-24 flex flex-col items-center text-center">
        {/* Phase label */}
        <span className="font-sans text-rust text-[10px] uppercase tracking-[0.3em] mb-8 block">
          PHASE 03 // EXECUTION
        </span>

        {/* Dual-headline: massive Satoshi black + Cormorant italic rust */}
        <h3 className="font-sans font-black text-4xl md:text-6xl lg:text-[6.5rem] leading-[0.9] text-paper uppercase tracking-tighter mix-blend-difference relative">
          WE BRING
          {/* Abstract rust glow behind text */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-lg h-12 bg-rust opacity-20 -z-10 blur-xl group-hover:opacity-40 transition-opacity duration-1000" />
        </h3>
        <h4 className="font-display text-5xl md:text-7xl lg:text-[8rem] text-rust italic font-light leading-[0.82] tracking-normal lowercase mt-2 lg:mt-0">
          your story to life.
        </h4>

        {/* Editorial pull quote */}
        <div className="mt-16 lg:mt-24 max-w-2xl relative">
          <div className="absolute -top-6 -left-8 lg:-left-12 text-6xl text-paper/15 font-display leading-none">
            &ldquo;
          </div>
          <p className="font-sans text-paper text-[16px] lg:text-[20px] leading-[1.8] font-light">
            Once it&apos;s built, we put it out into the world just how you need it told. Identity, messaging, campaigns, content, and culture. Because story without execution is just daydreaming.
          </p>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-rust/50 to-transparent mt-12" />
        </div>
      </div>

      {/* Corner structural L-bracket markers — blueprint roots */}
      <div className="absolute top-4 left-4 w-4 h-px bg-paper/20" />
      <div className="absolute top-4 left-4 w-px h-4 bg-paper/20" />
      <div className="absolute bottom-4 right-4 w-4 h-px bg-paper/20" />
      <div className="absolute bottom-4 right-4 w-px h-4 bg-paper/20" />
    </motion.div>
  );
}

function RevealWord({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: (typeof STATEMENT_WORDS)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const revealWindow = 0.62;
  const start = (index / total) * revealWindow;
  const end = Math.min(start + revealWindow / total, revealWindow);
  const opacity = useTransform(scrollYProgress, [start, end], [0.18, 1]);
  const color =
    word.color === 'rust' ? 'var(--color-rust)' : 'var(--color-paper)';

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.3em] last:mr-0"
    >
      {word.text}
    </motion.span>
  );
}

function TextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end 0.4'],
  });

  if (prefersReduced) {
    return (
      <div className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <div
            className="font-display font-light flex flex-col items-center gap-3"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3.4rem)',
              lineHeight: 1.12,
            }}
          >
            <p className="text-paper">We build the blueprint.</p>
            <p className="text-paper">The narrative.</p>
            <p className="text-paper">The creative.</p>
            <p className="text-rust">So you can build the transformation.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: '140vh' }}>
      <div className="sticky top-0 h-[88vh] flex items-center justify-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <div
            className="font-display font-light flex flex-col items-center gap-3"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3.4rem)',
              lineHeight: 1.12,
            }}
          >
            {STATEMENT_LINES.map((line, lineIndex) => {
              const wordOffset = STATEMENT_LINES
                .slice(0, lineIndex)
                .reduce((count, currentLine) => count + currentLine.words.length, 0);

              return (
                <div key={`${line.color}-${lineIndex}`} className="flex flex-wrap justify-center">
                  {line.words.map((text, wordIndex) => (
                    <RevealWord
                      key={`${line.color}-${text}-${wordIndex}`}
                      word={{ text, color: line.color }}
                      index={wordOffset + wordIndex}
                      total={STATEMENT_WORDS.length}
                      scrollYProgress={scrollYProgress}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ActFour() {
  return (
    <section className="relative bg-trueblack overflow-hidden">
      {/* Top gradient: paper → trueblack fade */}
      <div
        className="absolute top-0 inset-x-0 h-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, var(--color-paper), var(--color-trueblack))',
        }}
      />

      {/* Film grain texture */}
      <div className="absolute inset-0 texture-grain opacity-[0.06] pointer-events-none" />

      {/* Eyebrow — fades in before scroll reveal */}
      <div className="relative pt-16 md:pt-20 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <motion.p
          className="font-sans text-rust text-[0.64rem] tracking-[0.24em] uppercase"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: ABOUT_EASE }}
        >
          How We Work
        </motion.p>
      </div>

      {/* Scroll-linked text reveal */}
      <TextReveal />

      {/* Ruled line: transition from manifesto to method */}
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="border-t border-paper/10" aria-hidden />
      </div>

      {/* Methodology — "Heavy Humanity" editorial beats */}
      <div className="w-full flex flex-col max-w-[1600px] mx-auto relative z-20 px-4 md:px-12 pt-16 md:pt-24">
        {METHODOLOGY_BEATS.map((beat, i) => (
          <MethodologyBeat key={i} beat={beat} />
        ))}

        {/* Showstopper Finale — Beat 03, full cinematic width */}
        <Showstopper />
      </div>

      {/* Bottom gradient: trueblack → paper fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, var(--color-paper), var(--color-trueblack))',
        }}
      />
    </section>
  );
}
