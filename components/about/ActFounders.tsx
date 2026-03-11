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
      aria-hidden="true"
    >
      <span
        className={`font-display font-light leading-[0.9] tracking-tighter whitespace-nowrap ${stroke}`}
        style={{ fontSize: 'clamp(4rem, 12vw, 12.8rem)' }}
      >
        {lines[0]}<br />{lines[1]}
      </span>
      <span
        className={`absolute inset-0 font-display font-light leading-[0.9] tracking-tighter whitespace-nowrap ${fill}`}
        style={{
          fontSize: 'clamp(4rem, 12vw, 12.8rem)',
          transform: 'translate(2px, 2px)',
        }}
      >
        {lines[0]}<br />{lines[1]}
      </span>
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
            <p className="text-rust text-[10px] tracking-[0.32em] uppercase mb-7 font-sans font-medium">Co-Founder &amp; Executive Producer</p>

            <p className="font-display font-light italic text-ink mb-8" style={{ fontSize: 'var(--step-3)', lineHeight: 1.24 }}>
              {'\u201C'}Amy shapes partnerships, guides programs and live events, and makes sure the story lands in the real world.{"\u201D"}
            </p>

            <div className="font-sans text-ink/70 leading-relaxed space-y-4 text-[0.92rem] md:text-[length:var(--step-0)]">
              <p>With more than two decades working across arts, education, and cultural institutions, Amy has led national partnerships, built education programs, and produced performances and initiatives with organizations including Carnegie Hall, the Los Angeles Philharmonic, Cirque du Soleil, Disney, Lincoln Center, and The Getty.</p>
              <p>Amy&apos;s passion lies at the intersection of artists, institutions, and communities. From early story conversations through real-world execution, Amy shapes partnerships, guides programs and live events, and ensures a foundation&apos;s story hits with impact.</p>
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
            <p className="text-rust text-[10px] tracking-[0.32em] uppercase mb-7 font-sans font-medium">Co-Founder &amp; Chief Storyteller</p>

            <p className="font-display font-light italic text-ink mb-8" style={{ fontSize: 'var(--step-3)', lineHeight: 1.24 }}>
              {'\u201C'}Patrick approaches brand storytelling the way screenwriters approach story: protagonist, tension, transformation.{"\u201D"}
            </p>

            <div className="font-sans text-ink/70 leading-relaxed space-y-4 text-[0.92rem] md:text-[length:var(--step-0)]">
              <p>Patrick spent more than two decades in agencies and brand teams shaping campaigns, platforms, and product narratives for companies including Verizon, AT&amp;T, Intel, Airtable, Beats by Dre, and Warner Brothers. His work spans brand storytelling, UX writing, campaign development, and narrative strategy across digital, product, and cultural initiatives.</p>
              <p>Patrick approaches brand and organizational storytelling the way screenwriters approach story: every narrative needs a protagonist, a tension worth resolving, and a transformation that matters. Because when the story is clear, the work moves.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
