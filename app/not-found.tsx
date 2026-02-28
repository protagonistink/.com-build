import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden selection:bg-rust selection:text-paper">

      {/* Background — typewriter illustration */}
      <Image
        src="/404-bg.png"
        alt=""
        fill
        className="object-cover object-center pointer-events-none select-none opacity-100"
        priority
        aria-hidden="true"
      />

      {/* Dark vignette so left-side text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/30 z-[1] pointer-events-none" />

      {/* Ghost 404 typography — top right */}
      <div
        className="absolute top-[-10vh] right-[-10vw] md:top-[-15vh] md:right-[-5vw] text-white/[0.03] pointer-events-none select-none z-[2] flex items-center"
        aria-hidden="true"
      >
        <span className="font-display text-[50vw] md:text-[35vw] leading-none tracking-[0.2em] whitespace-nowrap">
          4 0 4
        </span>
      </div>

      {/* Cursor blink animation */}
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-cursor { animation: cursor-blink 1s step-end infinite; }
      `}</style>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-12 py-24">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/25 mb-8">
            Error 404
          </p>

          {/* Headline */}
          <h1 className="font-display leading-[0.85] tracking-tight mb-0">
            <span className="block text-[clamp(3.5rem,9vw,8rem)] text-white/90 font-normal">
              You found a
            </span>
            <span className="block text-[clamp(3.5rem,9vw,8rem)] text-white/40 italic font-light">
              plot hole.
              <span className="inline-block w-[3px] h-[0.85em] bg-rust animate-cursor align-text-bottom ml-1 -translate-y-[0.08em]" />
            </span>
          </h1>

          {/* Body copy */}
          <div className="mt-10 space-y-3 max-w-md">
            <p className="font-sans text-[15px] text-white/50 leading-relaxed">
              This page is missing from the manuscript — we&apos;re still writing it.
            </p>
            <p className="font-sans text-[15px] text-white/35 leading-relaxed">
              The site is under construction. If you need something now,{' '}
              <a
                href="mailto:hello@protagonist.ink"
                className="text-rust/80 hover:text-rust border-b border-rust/20 hover:border-rust/50 transition-colors duration-200 pb-px"
              >
                email us directly
              </a>{' '}
              and we&apos;ll get back to you.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-12 flex flex-row flex-wrap items-center gap-8">
            <Link
              href="/"
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40 hover:text-white/70 transition-colors duration-200 flex items-center gap-2"
            >
              <span className="text-rust">←</span>
              <span>Back to home</span>
            </Link>
            <a
              href="mailto:hello@protagonist.ink"
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40 hover:text-rust transition-colors duration-200 flex items-center gap-2"
            >
              <span>hello@protagonist.ink</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Recovery links */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25 mb-5">Try one of these</p>
            <div className="flex flex-wrap gap-x-7 gap-y-4">
              <Link href="/work" className="font-sans text-sm text-white/45 hover:text-white/75 transition-colors">
                Work
              </Link>
              <Link href="/about" className="font-sans text-sm text-white/45 hover:text-white/75 transition-colors">
                About
              </Link>
              <Link href="/blog" className="font-sans text-sm text-white/45 hover:text-white/75 transition-colors">
                Journal
              </Link>
              <Link href="/story-health-check" className="font-sans text-sm text-rust/80 hover:text-rust transition-colors">
                Story Health Check
              </Link>
            </div>
          </div>

          {/* Bottom brand whisper */}
          <p className="mt-16 md:mt-24 font-mono text-[9px] uppercase tracking-[0.4em] text-white/10 select-none">
            Protagonist Ink — Atlanta, GA
          </p>

        </div>
        </div>
      </div>

    </div>
  );
}
