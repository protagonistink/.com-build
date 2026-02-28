import Link from 'next/link';
import Image from 'next/image';

const cases = [
  {
    slug: 'decoda',
    client: 'Decoda',
    subtitle: 'Music',
    tagline: 'A legacy ensemble forgets how to speak. We gave them back their voice.',
    disciplines: 'Strategy — Narrative — Copy',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&q=75',
    ghostWord: 'VOICE',
    href: '/work/decoda',
  },
];

export default function ScreeningRoom() {
  return (
    <section className="bg-[var(--color-trueblack)] py-32 overflow-hidden border-y border-white/5 relative">

      {/* Section label */}
      <div className="px-6 md:px-12 lg:px-24 mb-16 relative z-10">
        <div className="flex items-baseline justify-between max-w-[1400px] mx-auto">
          <h2 className="font-[family-name:var(--font-cormorant)] font-light leading-[0.95]">
            <span className="block text-[clamp(2rem,4vw,3.5rem)] text-white/90">Every hero needs a crisis.</span>
            <em className="block italic text-[clamp(2.25rem,4.5vw,4rem)] text-[var(--color-coolgray)]/60 mt-1">Here are ours.</em>
          </h2>
          <Link
            href="/work"
            className="hidden md:inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/25 hover:text-white/55 transition-colors duration-300 group"
          >
            All work
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>

      {/* Horizontal scroll rail */}
      <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-12 lg:px-24 gap-6 md:gap-8 pb-12 cursor-ew-resize">

        {cases.map((c) => (
          <Link
            key={c.slug}
            href={c.href}
            className="reveal relative flex-shrink-0 w-[85vw] md:w-[480px] aspect-[2/3] group overflow-hidden snap-center bg-[var(--color-ink)] block"
          >
            {/* Cinematic background */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={c.image}
                alt=""
                fill
                className="object-cover object-center transition-all duration-[2s] ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
                style={{ opacity: 0.55, filter: 'grayscale(100%) brightness(0.5) contrast(1.1)' }}
                sizes="(max-width: 768px) 85vw, 480px"
                unoptimized
              />
              {/* Warm multiply wash */}
              <div
                className="absolute inset-0"
                style={{ background: 'rgba(22,14,8,0.5)', mixBlendMode: 'multiply' }}
              />
            </div>

            {/* Bottom gradient — text protection */}
            <div
              className="absolute inset-x-0 bottom-0 h-[70%] pointer-events-none z-[1]"
              style={{ background: 'linear-gradient(to top, #0a0a0a 0%, #0a0a0a 15%, rgba(10,10,10,0.75) 50%, transparent 100%)' }}
              aria-hidden="true"
            />

            {/* Film grain */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none z-[2]"
              aria-hidden="true"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                mixBlendMode: 'overlay',
              }}
            />

            {/* Crop marks */}
            <div className="absolute top-5 left-5 w-8 h-8 border-t border-l border-[var(--color-rust)]/20 pointer-events-none z-[3]" aria-hidden="true" />
            <div className="absolute bottom-5 right-5 w-8 h-8 border-b border-r border-[var(--color-rust)]/20 pointer-events-none z-[3]" aria-hidden="true" />

            {/* Ghost word — centered, enormous */}
            <div
              className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none z-[2]"
              aria-hidden="true"
            >
              <span
                className="font-[family-name:var(--font-cormorant)] italic font-light text-white/[0.04] leading-none whitespace-nowrap group-hover:text-white/[0.08] transition-all duration-1000"
                style={{ fontSize: 'clamp(8rem,20vw,18rem)' }}
              >
                {c.ghostWord}
              </span>
            </div>

            {/* Content block — slides up on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9 z-[4] transform group-hover:-translate-y-3 transition-transform duration-700 ease-out">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-rust)]/70 mb-4">Case Study</p>

              <h3 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,6vw,4rem)] font-light leading-[0.9] tracking-[-0.02em] text-white mb-2">
                {c.client}<br />
                <span className="italic text-white/40">{c.subtitle}</span>
              </h3>

              {/* Tagline — revealed on hover */}
              <p className="font-[family-name:var(--font-satoshi)] text-[var(--color-coolgray)] text-sm leading-[1.6] mt-4 max-w-[85%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                {c.tagline}
              </p>

              {/* Footer row — revealed on hover */}
              <div className="flex justify-between items-end border-t border-white/10 mt-5 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150">
                <span className="font-[family-name:var(--font-satoshi)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-coolgray)]/60">
                  {c.disciplines}
                </span>
                <span className="font-[family-name:var(--font-satoshi)] text-[11px] uppercase tracking-[0.18em] text-[var(--color-rust)] font-bold">
                  Read Story →
                </span>
              </div>
            </div>

          </Link>
        ))}

        {/* Placeholder card */}
        <div className="relative flex-shrink-0 w-[85vw] md:w-[480px] aspect-[2/3] snap-center bg-[var(--color-ink)] border border-white/[0.06] flex items-center justify-center">
          <span className="font-[family-name:var(--font-cormorant)] italic text-[var(--color-coolgray)]/30 text-2xl">
            Coming Soon
          </span>
        </div>

        {/* Trailing spacer */}
        <div className="flex-shrink-0 w-6 md:w-12" aria-hidden="true" />

      </div>

      {/* Mobile all-work link */}
      <div className="md:hidden px-6 mt-4">
        <Link
          href="/work"
          className="text-[11px] uppercase tracking-[0.2em] text-white/25 hover:text-white/55 transition-colors duration-300"
        >
          All work →
        </Link>
      </div>

    </section>
  );
}
