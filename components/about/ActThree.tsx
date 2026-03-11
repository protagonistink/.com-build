'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import Image from 'next/image';

const BELIEFS = [
  {
    word: 'HERO',
    body: 'The suited man in a cape. The founder on a mission. The leader of community programs. The one everyone is rooting for. This is about your why.',
    dark: false,
    color: 'text-ink',
    bgImage: null,
  },
  {
    word: 'GOAL',
    body: "Not product features. The transformation. The world you're trying to create. The future only you can build. That's what people connect to.",
    dark: true,
    color: 'text-paper',
    bgImage: null,
  },
  {
    word: 'VILLAIN',
    body: "Not your competitor. The real problem. The status quo that needs to break. The frustration everyone feels but can't articulate. That's what people are rooting against.",
    dark: false,
    color: 'text-ink',
    bgImage: null,
  },
  {
    word: 'STORY',
    body: 'Where framework meets passion. Where authenticity meets structure. Where audiences meet brand.',
    dark: true,
    color: 'text-rust',
    bgImage: '/images/pages/boyinboots.jpg',
  },
] as const;

const INTRO_LABEL = 'The Framework';
const INTRO_HEADLINE = 'Narrative Architecture 101:';
const INTRO_EMPHASIS = 'story meets system.';
const INTRO_BODY =
  "Not our system. The universe's. And not our story. Yours. We're not inventing any of it. We just know how to put you in the center of it.";
const PROGRESS_LABELS = ['INTRO', ...BELIEFS.map((belief) => belief.word)] as const;

function getConnector(index: number) {
  if (index >= BELIEFS.length - 1) return null;
  return index === BELIEFS.length - 2 ? '=' : '+';
}

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
      {dark && <div className="absolute inset-0 texture-grain opacity-[0.06] pointer-events-none" />}

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
      {dark && <div className="absolute inset-0 texture-grain opacity-[0.06] pointer-events-none" />}

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

function FrameworkIntro({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`max-w-3xl text-center relative z-10 ${compact ? '' : 'transition-transform duration-700'}`}>
      <p className="about-scene-label text-rust mb-6">{INTRO_LABEL}</p>
      <h2
        className={`font-display font-light text-ink ${compact ? 'text-4xl mb-4' : 'text-5xl md:text-7xl mb-8'} leading-[1.1] tracking-tight`}
      >
        {INTRO_HEADLINE}
        <br />
        <em className="italic text-rust font-serif">{INTRO_EMPHASIS}</em>
      </h2>
      <p className={`font-sans text-ink/60 ${compact ? 'text-base' : 'text-lg'} ${compact ? '' : 'max-w-2xl mx-auto'} leading-relaxed`}>
        {INTRO_BODY}
      </p>
      {!compact && <div className="w-12 h-px bg-rust/30 mx-auto mt-12" />}
    </div>
  );
}

function BlockConnector({ symbol }: { symbol: '+' | '=' }) {
  return (
    <div className="flex items-center justify-center py-8 bg-trueblack" aria-hidden>
      <span
        className="font-display font-light text-rust"
        style={{ fontSize: 'clamp(5rem, 16vw, 10rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
      >
        {symbol}
      </span>
    </div>
  );
}

function OverlayConnector({
  belief,
  nextBelief,
  symbol,
}: {
  belief: (typeof BELIEFS)[number];
  nextBelief: (typeof BELIEFS)[number];
  symbol: '+' | '=';
}) {
  const leftColor = belief.dark ? 'var(--color-paper)' : 'var(--color-ink)';
  const rightColor = nextBelief.dark ? 'var(--color-paper)' : 'var(--color-ink)';

  return (
    <div
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 pointer-events-none"
      aria-hidden
    >
      <span
        className="font-display font-light select-none"
        style={{
          fontSize: 'clamp(8rem, 26vw, 18rem)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          background: `linear-gradient(to right, ${leftColor} 50%, ${rightColor} 50%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {symbol}
      </span>
    </div>
  );
}

function BeliefProgressItem({
  activeIndex,
  label,
  index,
}: {
  activeIndex: MotionValue<number>;
  label: string;
  index: number;
}) {
  const opacity = useTransform(activeIndex, (value: number) => {
    const distance = Math.abs(value - index);
    if (distance < 0.5) return 1;
    if (distance < 1) return 0.3 + (1 - distance) * 0.7;
    return 0.3;
  });

  return (
    <motion.div
      className="flex items-center gap-4 group cursor-pointer"
      style={{ opacity }}
    >
      <span className="font-sans text-[10px] tracking-[0.3em] font-medium uppercase text-paper/82 group-hover:text-paper transition-colors">
        {label}
      </span>
      <div className={`w-1.5 h-1.5 rounded-full border border-paper/50 ${index === 0 ? 'bg-paper' : 'bg-rust'} transition-transform group-hover:scale-125`} />
    </motion.div>
  );
}

function ScrollProgress({ progress }: { progress: MotionValue<number> }) {
  const activeIndex = useTransform(progress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 1, 2, 3, 4, 4]);

  return (
    <div className="absolute bottom-12 right-10 z-20 flex flex-col items-end gap-3 mix-blend-difference">
      {PROGRESS_LABELS.map((label, index) => (
        <BeliefProgressItem
          key={label}
          activeIndex={activeIndex}
          label={label}
          index={index}
        />
      ))}
    </div>
  );
}

function renderBlockSequence(
  renderPanel: (belief: (typeof BELIEFS)[number]) => JSX.Element,
) {
  return BELIEFS.map((belief, index) => {
    const connector = getConnector(index);

    return (
      <div key={belief.word}>
        {renderPanel(belief)}
        {connector && <BlockConnector symbol={connector} />}
      </div>
    );
  });
}

function DesktopBeliefSequence() {
  return (
    <>
      {BELIEFS.map((belief, index) => {
        const connector = getConnector(index);
        const nextBelief = BELIEFS[index + 1];

        return (
          <div key={belief.word} className="relative flex-shrink-0 flex">
            <BeliefPanel {...belief} />
            {connector && nextBelief && (
              <OverlayConnector
                belief={belief}
                nextBelief={nextBelief}
                symbol={connector}
              />
            )}
          </div>
        );
      })}
    </>
  );
}

export default function ActThree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 0.84, 1], ['0%', '-80%', '-80%']);

  if (prefersReduced) {
    return (
      <div className="bg-warmwhite">
        <div className="min-h-screen flex items-center justify-center text-center px-6">
          <FrameworkIntro />
        </div>
        {renderBlockSequence((belief) => <BeliefPanel {...belief} />)}
      </div>
    );
  }

  return (
    <>
      <div className="md:hidden">
        <div className="min-h-[70vh] bg-warmwhite flex items-center justify-center text-center px-6 border-b border-rust/10">
          <FrameworkIntro compact />
        </div>
        {renderBlockSequence((belief) => <MobileBeliefCard {...belief} />)}
      </div>

      <section ref={containerRef} className="relative h-[500vh] hidden md:block">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex h-full w-[500vw]">
            <div className="relative w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center px-6 bg-warmwhite">
              <div className="absolute inset-0 texture-paper opacity-[0.03] pointer-events-none" />
              <FrameworkIntro />
            </div>
            <DesktopBeliefSequence />
          </motion.div>

          <ScrollProgress progress={scrollYProgress} />
        </div>
      </section>
    </>
  );
}
