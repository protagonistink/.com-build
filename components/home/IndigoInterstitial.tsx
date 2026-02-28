export default function IndigoInterstitial() {
  return (
    <section className="relative bg-[var(--color-indigo)] py-28 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">

      {/* Cinematic available-light texture */}
      <div
        className="absolute inset-0 z-0 mix-blend-multiply opacity-50"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />

      {/* Gradient veil — preserves legibility at top and bottom */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(46,43,95,0.6) 0%, rgba(46,43,95,0.1) 40%, rgba(46,43,95,0.1) 60%, rgba(46,43,95,0.85) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.055] pointer-events-none z-[2]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="reveal font-[family-name:var(--font-cormorant)] font-light leading-[0.95]">
          <span className="block text-[clamp(2.5rem,5vw,4.5rem)] text-white/90 mb-3">
            The right question
          </span>
          <em className="block italic text-[clamp(3rem,6vw,5.5rem)] text-[var(--color-rust)]">
            hasn&rsquo;t been asked yet.
          </em>
        </h2>
      </div>

    </section>
  );
}
