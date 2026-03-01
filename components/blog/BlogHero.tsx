export default function BlogHero() {
  return (
    <section className="w-full bg-trueblack text-warmwhite min-h-[60vh] md:min-h-[65vh] flex flex-col justify-end relative overflow-hidden texture-grain">
      {/* Faint editorial grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-coolgray) 1px, transparent 1px), linear-gradient(to bottom, var(--color-coolgray) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
        }}
      />

      {/* Decorative section mark — editorial anchor */}
      <div className="absolute top-32 right-8 md:right-16 lg:right-24 font-serif text-[8rem] md:text-[12rem] lg:text-[16rem] text-warmwhite/[0.02] italic leading-none pointer-events-none select-none">
        &sect;
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-12 pt-40 pb-16 md:pb-20 lg:pb-24 relative z-10">
        {/* Eyebrow */}
        <div
          className="flex items-center gap-4 mb-10 md:mb-14"
          style={{
            opacity: 0,
            animation: 'pi-fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both',
          }}
        >
          <div className="w-8 h-px bg-rust" />
          <p className="text-technical text-[10px] tracking-[0.25em] text-coolgray/70">
            Protagonist Ink
          </p>
        </div>

        {/* Masthead */}
        <h1
          className="font-display text-6xl md:text-8xl lg:text-[120px] leading-[0.82] tracking-tighter max-w-5xl"
          style={{
            opacity: 0,
            animation: 'pi-fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both',
          }}
        >
          The{' '}
          <span className="italic text-warmwhite/60 font-light">Ink</span>
        </h1>

        {/* Description — pushed right */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="hidden md:block md:col-span-2">
            <div
              className="w-px h-20 bg-rust/40"
              style={{
                opacity: 0,
                animation: 'pi-fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.55s both',
              }}
            />
          </div>
          <div
            className="md:col-span-5 md:col-start-8"
            style={{
              opacity: 0,
              animation: 'pi-fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both',
            }}
          >
            <p className="font-serif italic text-lg md:text-xl text-coolgray/80 leading-relaxed">
              Frameworks, analyses, and architectural blueprints for brands
              that refuse to be ignored. Strictly signal. Zero noise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
