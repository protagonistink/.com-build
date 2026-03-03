import Link from 'next/link';

export default function CtaBlock() {
  return (
    <section className="relative bg-[var(--color-ink)] py-28 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 overflow-hidden flex flex-col items-center justify-center text-center">

      {/* Ghost type — enormous, centered */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0 leading-none"
        aria-hidden="true"
        style={{ fontSize: 'clamp(7rem, 25vw, 28rem)' }}
      >
        <span className="font-[family-name:var(--font-cormorant)] italic font-light text-[var(--color-coolgray)]/[0.05] whitespace-nowrap">
          BEGIN
        </span>
      </div>

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-[1]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      <div className="reveal relative z-10 max-w-3xl">
        <h2 className="font-[family-name:var(--font-cormorant)] font-light leading-[0.95] mb-12">
          <span className="block text-[clamp(2.5rem,5vw,4.5rem)] text-white/90">Your story is in there.</span>
          <em className="block italic text-[clamp(3rem,6vw,5.5rem)] text-[var(--color-rust)] mt-2">Let&rsquo;s find it.</em>
        </h2>

        <p className="font-[family-name:var(--font-satoshi)] text-white/55 text-[15px] leading-[1.75] max-w-md mx-auto mb-3">
          Send us your site or deck. In 7 days, you get a recorded video breakdown of where your narrative is failing — no Zoom, no retainer, no commitment.
        </p>
        <p className="font-[family-name:var(--font-satoshi)] text-white/30 text-[13px] mb-12">
          $750. One week. Yours to keep.
        </p>

        <a
          href="mailto:hello@protagonist.ink?subject=Story Teardown"
          className="inline-flex items-center gap-4 bg-[var(--color-rust)] hover:bg-[#a83020] text-white px-10 py-5 font-[family-name:var(--font-satoshi)] font-bold text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 group mb-16"
        >
          Book Assessment
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </a>

        {/* Off-ramp */}
        <div className="border-t border-white/[0.06] pt-10">
          <p className="font-[family-name:var(--font-cormorant)] italic text-white/25 text-lg mb-4">
            Not ready?
          </p>
          <Link
            href="/blog"
            className="font-[family-name:var(--font-satoshi)] text-[11px] uppercase tracking-[0.2em] text-white/25 hover:text-white/50 transition-colors duration-300 group"
          >
            Read the journal
            <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block ml-2">→</span>
          </Link>
        </div>
      </div>

    </section>
  );
}
