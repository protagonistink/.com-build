import Link from 'next/link';
import Image from 'next/image';

export default function AboutSignal() {
  return (
    <section className="texture-paper bg-[var(--color-warmwhite)] text-[var(--color-ink)] px-6 md:px-12 lg:px-24 py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* Left — copy */}
        <div className="reveal">
          <div className="w-12 h-[3px] bg-[var(--color-indigo)] mb-6" aria-hidden="true" />
          <span className="font-[family-name:var(--font-satoshi)] uppercase tracking-[0.2em] text-[var(--color-indigo)] text-[11px] block mb-8">
            Narrative Architecture
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] font-light leading-[0.95] mb-8">
            <span className="block text-[clamp(2.5rem,5vw,4.5rem)] text-[var(--color-ink)]">Not the hero.</span>
            <em className="block italic text-[clamp(2.75rem,5.5vw,5rem)] text-[var(--color-rust)]">The guide.</em>
          </h2>
          <p className="font-[family-name:var(--font-satoshi)] text-[var(--color-ink)]/65 text-[17px] max-w-md leading-[1.75] mb-12">
            There is a difference between copy that sounds good and narrative that holds up under interrogation. We are not poets. We are strategists who use language as a lever.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-4 bg-[var(--color-ink)] hover:bg-[var(--color-charcoal)] text-white px-8 py-4 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 group"
          >
            Letter from the Directors
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>

        {/* Right — staggered cinematic portrait grid */}
        <div className="reveal reveal-delay-2 grid grid-cols-2 gap-4 relative">

          {/* Patrick — offset down */}
          <div className="mt-4 md:mt-12 aspect-[3/4] bg-[var(--color-ink)] overflow-hidden group">
            <Image
              src="/photos/patrick-kirkland-color.jpg"
              alt="Patrick Kirkland"
              width={800}
              height={1067}
              className="w-full h-full object-cover object-top grayscale opacity-90 mix-blend-luminosity contrast-125 transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 45vw, 25vw"
            />
          </div>

          {/* Amy — offset up, creating stagger */}
          <div className="mb-4 md:mb-12 aspect-[3/4] bg-[var(--color-ink)] overflow-hidden group">
            <Image
              src="/photos/amy-kirkland.jpg"
              alt="Amy Kirkland"
              width={800}
              height={1067}
              className="w-full h-full object-cover object-[center_20%] grayscale opacity-90 mix-blend-luminosity contrast-125 transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 45vw, 25vw"
            />
          </div>

          {/* Name labels below each portrait */}
          <p className="font-[family-name:var(--font-satoshi)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink)]/35 mt-2">
            Patrick Kirkland<br />
            <span className="text-[var(--color-coolgray)]">Founder</span>
          </p>
          <p className="font-[family-name:var(--font-satoshi)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink)]/35 mt-2">
            Amy Kirkland<br />
            <span className="text-[var(--color-coolgray)]">Partner</span>
          </p>

        </div>

      </div>
    </section>
  );
}
