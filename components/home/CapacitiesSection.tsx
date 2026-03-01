'use client';
const capacities = [
  {
    number: '01',
    name: 'Sense-Making',
    diagnosis: 'You have too much information and not enough story.',
    description:
      'We read the room — board decks, customer calls, founding lore, competitive positioning — and surface the pattern nobody inside can see. Complexity is not the enemy. Unexplained complexity is.',
    signal: 'Pattern recognition. Strategic clarity. A north star that holds under pressure.',
  },
  {
    number: '02',
    name: 'Provocation',
    diagnosis: 'The right question hasn\'t been asked yet.',
    description:
      'Most organizations are too close to their own story to tell it clearly. We ask the questions that force real decisions — about voice, about differentiation, about what you\'re actually willing to claim out loud.',
    signal: 'No consultant-speak. No false consensus. Just the hard question and the space to answer it honestly.',
  },
  {
    number: '03',
    name: 'Translation',
    diagnosis: 'You know what you do. You can\'t explain why it matters.',
    description:
      'We give organizations their authentic voice — not a polished version of someone else\'s, not AI-averaged generic copy, but the language that makes your audience feel seen and your competitors irrelevant.',
    signal: 'Website copy, pitch decks, brand voice systems, internal narrative — all of it coherent, all of it yours.',
  },
];

import { useState, useRef, useEffect } from 'react';

export default function CapacitiesSection() {
  const [isInView, setIsInView] = useState(false);
  const provocationRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to trigger the background color snap
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of the Provocation block is visible
    );
    const provocationNode = provocationRef.current;

    if (provocationNode) {
      observer.observe(provocationNode);
    }

    return () => {
      if (provocationNode) {
        observer.unobserve(provocationNode);
      }
    };
  }, []);

  // Handle the background color based on scroll position (isInView)
  useEffect(() => {
    if (isInView) {
      document.body.style.backgroundColor = '#b74c3d'; // Warm terracotta snap
    } else {
      document.body.style.backgroundColor = 'var(--color-ink)'; // Snap back to Ink
    }
  }, [isInView]);

  return (
    <section
      className="texture-paper bg-transparent text-[var(--color-ink)] px-6 md:px-12 py-28 md:py-40 transition-colors duration-500 will-change-[background-color]"
    >
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="reveal mb-20 md:mb-28 grid grid-cols-1 md:grid-cols-12 gap-6">
          <h2 className="md:col-span-7 font-[family-name:var(--font-cormorant)] font-light leading-[1.1]">
            <span className="text-[clamp(1.5rem,3vw,2.25rem)] tracking-[0.02em] block mb-2 text-[var(--color-charcoal)]/50">Three things</span>
            <em className="italic text-[clamp(3rem,6vw,5.5rem)] text-[var(--color-ink)] leading-[0.95] block">we actually do.</em>
          </h2>
          <p className="md:col-span-4 md:col-start-9 text-sm text-[var(--color-charcoal)]/65 max-w-xs leading-[1.7] self-end">
            Not features. Not a process. These are the capabilities you&apos;re hiring when you hire us.
          </p>
        </div>

        {/* Capacity rows */}
        <div>
          {capacities.map((capacity, i) => {
            const isProvocation = i === 1;

            return (
              <div
                key={capacity.number}
                ref={isProvocation ? provocationRef : null}
                className={`reveal border-t ${!isProvocation ? 'border-[var(--color-charcoal)]/10' : ''} grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 overflow-hidden transition-all duration-500 ${isProvocation
                  ? 'py-32 md:py-48 relative text-white bg-black group cursor-crosshair'
                  : 'py-16 md:py-24'
                  }`}
              >
                {/* Background Texture for Provocation */}
                {isProvocation && (
                  <>
                    <div
                      className="absolute inset-0 bg-black/60 z-0 transition-opacity duration-1000 group-hover:bg-black/40"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 z-[-2] opacity-80 mix-blend-luminosity grayscale contrast-150 transition-transform duration-[20s] group-hover:scale-105"
                      style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2698&auto=format&fit=crop")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      aria-hidden="true"
                    />

                    {/* Film grain on the dark panel */}
                    <div
                      className="absolute inset-0 opacity-[0.06] pointer-events-none z-[2]"
                      aria-hidden="true"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        mixBlendMode: 'overlay',
                      }}
                    />

                    {/* Committed editorial crop marks — real graphical weight */}
                    <div className="absolute left-0 top-[20%] bottom-[20%] w-px bg-[var(--color-red)]/30 hidden md:block z-10" aria-hidden="true" />
                    <div className="absolute top-8 left-8 md:top-12 md:left-12 w-14 h-14 md:w-20 md:h-20 border-t-2 border-l-2 border-[var(--color-red)]/25 pointer-events-none hidden md:block z-10" aria-hidden="true" />
                    <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 w-14 h-14 md:w-20 md:h-20 border-b-2 border-r-2 border-[var(--color-red)]/25 pointer-events-none hidden md:block z-10" aria-hidden="true" />
                  </>
                )}

                {/* Left — number + name */}
                <div className={`md:col-span-4 flex flex-col gap-3 relative z-10 ${isProvocation ? 'justify-end' : ''}`}>
                  <span className={`text-[11px] tracking-[0.25em] uppercase ${isProvocation ? 'text-white/40' : 'text-[var(--color-charcoal)]/30'}`}>
                    {capacity.number}
                  </span>

                  {isProvocation ? (
                    // True display scale — uncomfortably large, that's the point
                    <h3 className="font-[family-name:var(--font-cormorant)] text-[clamp(6rem,16vw,12rem)] italic font-light leading-[0.82] tracking-[-0.03em] whitespace-nowrap drop-shadow-2xl">
                      {capacity.name}
                    </h3>
                  ) : (
                    <h3 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-[2.5rem] font-light leading-[1.15]">
                      {capacity.name}
                    </h3>
                  )}
                </div>

                {/* Right — diagnosis + description + signal */}
                <div className="md:col-span-7 md:col-start-6 flex flex-col gap-6 relative z-10">
                  {isProvocation ? (
                    // KINETIC: Blurred text that reveals on hover 
                    <p className="font-[family-name:var(--font-cormorant)] text-[clamp(1.5rem,3vw,2rem)] italic leading-[1.2] text-white transition-all duration-700 blur-sm opacity-40 group-hover:blur-none group-hover:opacity-100">
                      {capacity.diagnosis}
                    </p>
                  ) : (
                    <p className="font-[family-name:var(--font-cormorant)] text-xl md:text-2xl italic leading-[1.35] opacity-80 text-[var(--color-red)]">
                      {capacity.diagnosis}
                    </p>
                  )}
                  <p className={`text-[15px] leading-[1.75] max-w-lg ${isProvocation ? 'text-white/80' : 'text-[var(--color-charcoal)]/75'}`}>
                    {capacity.description}
                  </p>
                  <p className={`font-[family-name:var(--font-cormorant)] text-[15px] leading-[1.65] italic max-w-md ${isProvocation ? 'text-white/50' : 'text-[var(--color-charcoal)]/50'}`}>
                    {capacity.signal}
                  </p>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  );
}
