'use client';

import { useState, useEffect, type MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isWorkIndex = pathname === '/work';
  const isWorkDetail = pathname?.startsWith('/work/') && pathname !== '/work';
  const isStoryHealthCheck = pathname === '/story-health-check';
  // On work detail + story-health-check pages, the hero is dark and ~90vh tall.
  // We want the navbar to start transparent/light-text, then
  // switch to light bg/dark text once we scroll past the hero.
  const useDarkHero = isWorkDetail || isStoryHealthCheck;
  const heroThreshold = useDarkHero ? (isWorkDetail ? 400 : 550) : 20;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > heroThreshold);
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroThreshold]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  // Detail page & health check: dark hero (transparent → light on scroll)
  // Work index: always light bg
  // Everything else: dark bg (homepage, about, etc.)
  const useLightTheme = isWorkIndex || (useDarkHero && isScrolled);

  let baseShell: string;
  if (useLightTheme) {
    baseShell = isScrolled
      ? 'bg-[#FAFAFA]/92 backdrop-blur-md'
      : 'bg-[#FAFAFA]/88 backdrop-blur-md';
  } else if (useDarkHero) {
    baseShell = 'bg-transparent';
  } else {
    baseShell = isScrolled
      ? 'bg-ink/80 backdrop-blur-md'
      : 'bg-transparent';
  }

  const linkTone = useLightTheme
    ? 'text-ink/70 hover:text-ink'
    : 'text-white/60 hover:text-white';

  const logoInvert = useLightTheme;

  const handleStoryHealthCheckClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);

    if (pathname !== '/story-health-check') return;

    event.preventDefault();
    if (window.location.hash) {
      window.history.replaceState(null, '', '/story-health-check');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${baseShell}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center h-[4.25rem] md:h-20 lg:h-[5.5rem]">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Protagonist Ink"
            width={280}
            height={56}
            className={`h-[28px] md:h-[34px] lg:h-[40px] w-auto transition-all duration-700 ${logoInvert ? 'invert opacity-80' : 'opacity-95'}`}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          <Link href="/work" className={`text-[11px] lg:text-[13px] uppercase tracking-[0.22em] lg:tracking-[0.25em] transition-colors duration-300 ${linkTone}`}>
            Work
          </Link>
          <Link href="/about" className={`text-[11px] lg:text-[13px] uppercase tracking-[0.22em] lg:tracking-[0.25em] transition-colors duration-300 ${linkTone}`}>
            About
          </Link>
          <Link href="/blog" className={`text-[11px] lg:text-[13px] uppercase tracking-[0.22em] lg:tracking-[0.25em] transition-colors duration-300 ${linkTone}`}>
            Journal
          </Link>
          <Link
            href="/story-health-check"
            onClick={handleStoryHealthCheckClick}
            className={`text-[11px] lg:text-[13px] uppercase tracking-[0.22em] lg:tracking-[0.25em] transition-colors duration-300 font-bold border-b pb-px ${useLightTheme ? 'text-ink border-rust/70 hover:text-ink/80 hover:border-rust' : 'text-white/80 border-[var(--color-rust)]/60 hover:text-white hover:border-[var(--color-rust)]'}`}
          >
            Story Health Check
          </Link>
        </div>

        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`w-5 h-px transition-all duration-300 origin-center ${useLightTheme ? 'bg-ink/70' : 'bg-white/70'} ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
          <span className={`w-5 h-px transition-all duration-300 ${useLightTheme ? 'bg-ink/70' : 'bg-white/70'} ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`w-5 h-px transition-all duration-300 origin-center ${useLightTheme ? 'bg-ink/70' : 'bg-white/70'} ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className={`border-t px-6 py-10 flex flex-col gap-7 ${useLightTheme ? 'bg-[#FAFAFA] border-ink/10' : 'bg-[var(--color-ink)] border-white/[0.04]'}`}>
          <Link href="/work" className={`text-[11px] uppercase tracking-[0.25em] ${useLightTheme ? 'text-ink/70' : 'text-white/60'}`} onClick={() => setMenuOpen(false)}>Work</Link>
          <Link href="/about" className={`text-[11px] uppercase tracking-[0.25em] ${useLightTheme ? 'text-ink/70' : 'text-white/60'}`} onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/blog" className={`text-[11px] uppercase tracking-[0.25em] ${useLightTheme ? 'text-ink/70' : 'text-white/60'}`} onClick={() => setMenuOpen(false)}>Journal</Link>
          <div className={`w-8 h-px my-1 ${useLightTheme ? 'bg-ink/20' : 'bg-white/10'}`} />
          <Link
            href="/story-health-check"
            onClick={handleStoryHealthCheckClick}
            className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-red)]"
          >
            Story Health Check
          </Link>
        </div>
      </div>
    </nav>
  );
}
