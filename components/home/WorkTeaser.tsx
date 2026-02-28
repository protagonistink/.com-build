'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function WorkTeaser() {
  return (
    <section className="texture-grain bg-[var(--color-ink)] border-t border-white/[0.04] overflow-hidden">

      {/* Eyebrow — outside the cover card, anchoring the section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-12 md:pb-16">
        <p className="text-[11px] uppercase tracking-[0.25em] text-white/25">Featured Work</p>
      </div>

      {/* Full-bleed cover card — the visual event */}
      <div className="reveal relative mx-4 md:mx-8 lg:mx-12 mb-20 md:mb-28">
        <Link href="/work/decoda" className="group block">
          <div className="relative bg-[#0f0f0e] border border-white/[0.06] overflow-hidden min-h-[70vh] md:min-h-[75vh] flex flex-col justify-end p-8 md:p-14 lg:p-20">

            {/* Cinematic background image — atmosphere, not illustration */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              <Image
                src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1600&q=75"
                alt=""
                fill
                className="object-cover object-center transition-transform duration-[2s] ease-out group-hover:scale-105"
                style={{
                  filter: 'grayscale(100%) brightness(0.5) contrast(1.15)',
                  opacity: 0.35,
                }}
                sizes="100vw"
                priority={false}
                unoptimized
              />
              {/* Warm color wash — shifts the grayscale toward amber */}
              <div
                className="absolute inset-0"
                style={{ background: 'rgba(30, 20, 12, 0.45)', mixBlendMode: 'multiply' }}
              />
            </div>

            {/* Bottom gradient — heavier, protects the credit block text */}
            <div
              className="absolute inset-x-0 bottom-0 h-[65%] pointer-events-none"
              style={{ background: 'linear-gradient(to top, #0f0f0e 0%, #0f0f0e 20%, rgba(15,15,14,0.85) 45%, transparent 100%)' }}
              aria-hidden="true"
            />

            {/* Film grain overlay — heavier on the card for tactility */}
            <div
              className="absolute inset-0 opacity-[0.065] pointer-events-none z-[3]"
              aria-hidden="true"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                mixBlendMode: 'overlay',
              }}
            />

            {/* Editorial crop marks — top-left and bottom-right of the card */}
            <div className="absolute top-6 md:top-10 left-6 md:left-10 w-6 h-6 md:w-8 md:h-8 border-t border-l border-[var(--color-red)]/12 pointer-events-none z-[4]" aria-hidden="true" />
            <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10 w-6 h-6 md:w-8 md:h-8 border-b border-r border-[var(--color-red)]/12 pointer-events-none z-[4]" aria-hidden="true" />

            {/* Large ghosted title treatment — the cover art, on top of photo */}
            <div
              className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none z-[2]"
              aria-hidden="true"
            >
              <span
                className="font-[family-name:var(--font-cormorant)] italic font-light text-white/[0.055] leading-none whitespace-nowrap group-hover:text-white/[0.09] transition-all duration-1000 group-hover:scale-[1.02]"
                style={{ fontSize: 'clamp(12rem, 28vw, 36rem)' }}
              >
                VOICE
              </span>
            </div>

            {/* Content — bottom-left, like a movie poster credit block */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end">

              {/* Title block */}
              <div className="md:col-span-6">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-red)]/60 mb-6">
                  Case Study
                </p>
                <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(3.5rem,9vw,8rem)] font-light leading-[0.88] tracking-[-0.02em] mb-4">
                  Decoda<br />Music
                </h2>
                <p className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl italic text-white/35 leading-[1.2]">
                  found its voice.
                </p>
              </div>

              {/* Supporting details — right side, quiet */}
              <div className="md:col-span-4 md:col-start-9 flex flex-col gap-8">
                <div>
                  <p className="text-white/60 text-[15px] leading-[1.7] mb-6">
                    A narrative system that positioned Decoda as the antidote to passive music consumption — and gave their team language they actually wanted to use.
                  </p>
                  <p className="font-[family-name:var(--font-cormorant)] text-lg italic text-white/30 leading-[1.4]">
                    &ldquo;We finally had something we could hand to investors and feel proud of.&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-white/25">
                  <span>Narrative + Copy System</span>
                  <span className="text-white/10">&middot;</span>
                  <span>2024</span>
                </div>
              </div>

            </div>

            {/* Read prompt — bottom right corner, appears on hover */}
            <div className="absolute bottom-8 right-8 md:bottom-14 md:right-14 text-[11px] uppercase tracking-[0.2em] text-white/0 group-hover:text-white/40 transition-colors duration-500 z-10">
              Read case study &rarr;
            </div>

          </div>
        </Link>
      </div>

    </section>
  );
}
