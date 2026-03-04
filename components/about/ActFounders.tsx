'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { ABOUT_EASE } from '@/components/about/motion';

function NameOverlay({
  lines,
  align,
  tone,
}: {
  lines: [string, string];
  align: 'left' | 'right';
  tone: 'light' | 'dark';
}) {
  const isRight = align === 'right';
  const stroke = tone === 'light'
    ? '[-webkit-text-stroke:1.4px_rgba(216,80,56,0.55)] text-transparent'
    : '[-webkit-text-stroke:1.4px_rgba(26,26,26,0.55)] text-transparent';
  const fill = tone === 'light' ? 'text-paper/85' : 'text-ink/75';

  return (
    <div
      className={`absolute z-20 pointer-events-none ${isRight ? 'bottom-8 right-6 md:bottom-[11%] md:-right-[18%]' : 'bottom-8 left-6 md:top-[30%] md:-left-[18%]'}`}
    >
      <h2
        className={`font-display font-light leading-[0.9] tracking-tighter whitespace-nowrap ${stroke}`}
        style={{ fontSize: 'clamp(4rem, 12vw, 12.8rem)' }}
        aria-hidden
      >
        {lines[0]}<br />{lines[1]}
      </h2>
      <h2
        className={`absolute inset-0 font-display font-light leading-[0.9] tracking-tighter whitespace-nowrap ${fill}`}
        style={{
          fontSize: 'clamp(4rem, 12vw, 12.8rem)',
          transform: 'translate(2px, 2px)',
        }}
      >
        {lines[0]}<br />{lines[1]}
      </h2>
    </div>
  );
}

export default function ActFounders() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const show = prefersReduced || inView;

  return (
    <section ref={ref} className="relative bg-paper text-ink overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[84svh] relative border-b border-rust/12">
        <div className="relative w-full md:w-[58%] h-[58vh] md:h-auto z-10 border-r border-rust/10">
          <Image
            src="/images/about/amy.jpg"
            alt="Amy Kirkland"
            fill
            className="object-cover object-[42%_24%] grayscale sepia-[0.08] contrast-[1.15] brightness-[0.82]"
            sizes="(max-width: 768px) 100vw, 58vw"
          />
          <div className="absolute inset-0 bg-white/10 mix-blend-saturation pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.05, ease: ABOUT_EASE }}
          >
            <NameOverlay lines={['AMY', 'KIRKLAND']} align="right" tone="light" />
          </motion.div>
        </div>

        <div className="relative w-full md:w-[42%] bg-paper z-0 flex flex-col justify-end px-8 md:px-16 py-14 md:py-20">
          <div className="absolute inset-0 texture-paper opacity-[0.03] pointer-events-none" />
          <motion.div
            className="max-w-md relative z-10"
            initial={{ opacity: 0, y: 26 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.25, ease: ABOUT_EASE }}
          >
            <div className="w-12 h-px bg-rust mb-7" />
            <p className="text-rust text-[10px] tracking-[0.32em] uppercase mb-7 font-sans font-medium">Co-Founder, Executive Producer</p>

            <p className="font-display font-light italic text-ink mb-8" style={{ fontSize: 'var(--step-3)', lineHeight: 1.24 }}>
              {'\u201C'}The architect of narrative structure at Protagonist Ink. Amy redefined digital storytelling by blending classical prose with disruptive cinematic techniques.{"\u201D"}
            </p>

            <div className="font-sans text-ink/70 leading-relaxed space-y-4 text-[0.92rem] md:text-[step-0]">
              <p>After fifteen years shaping editorial strategy for brands across healthcare, education, and nonprofit, Amy recognized that most organizations didn&apos;t have a story problem. They had a structure problem.</p>
              <p>Her leadership turns manuscripts into movements. By viewing the written word through a 35mm lens, she bridges the gap between the page and the screen.</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse min-h-[84svh] relative">
        <div className="relative w-full md:w-[58%] h-[58vh] md:h-auto z-10 border-l border-rust/10">
          <Image
            src="/images/about/patrick.jpg"
            alt="Patrick Kirkland"
            fill
            className="object-cover object-[55%_25%] grayscale sepia-[0.08] contrast-[1.15] brightness-[0.82]"
            sizes="(max-width: 768px) 100vw, 58vw"
          />
          <div className="absolute inset-0 bg-white/10 mix-blend-saturation pointer-events-none" />
          <div className="absolute inset-0 bg-trueblack/14 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.05, delay: 0.16, ease: ABOUT_EASE }}
          >
            <NameOverlay lines={['PATRICK', 'KIRKLAND']} align="left" tone="dark" />
          </motion.div>
        </div>

        <div className="relative w-full md:w-[42%] bg-paper z-0 flex flex-col justify-end px-8 md:px-16 py-14 md:py-20">
          <div className="absolute inset-0 texture-paper opacity-[0.03] pointer-events-none" />
          <motion.div
            className="max-w-md relative z-10"
            initial={{ opacity: 0, y: 26 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.38, ease: ABOUT_EASE }}
          >
            <div className="w-12 h-px bg-rust mb-7" />
            <p className="text-rust text-[10px] tracking-[0.32em] uppercase mb-7 font-sans font-medium">Co-Founder, Narrative Architect</p>

            <p className="font-display font-light italic text-ink mb-8" style={{ fontSize: 'var(--step-3)', lineHeight: 1.24 }}>
              {'\u201C'}Master of the atmospheric. Patrick operates where the light hits the smoke, turning operations into an art form.{"\u201D"}
            </p>

            <div className="font-sans text-ink/70 leading-relaxed space-y-4 text-[0.92rem] md:text-[step-0]">
              <p>A decade in agency creative, from Chevron&apos;s global redesign at Elephant to conceptual campaigns for enterprise brands, taught Patrick that great writing without great execution is just a mood board.</p>
              <p>His philosophy of {'\u2018'}crushed blacks and high stakes{"\u2019"} has become the signature visual DNA of the collective.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
