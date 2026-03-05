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
  const isStoryTeardown = pathname === '/story-teardown';
  const isBlogIndex = pathname === '/blog';
  const isBlogDetail = pathname?.startsWith('/blog/') && pathname !== '/blog';
  const isBrandGuide = pathname?.startsWith('/brand-guide');
  const isAbout = pathname === '/about';

  // All pages with a dark hero: work index/detail, blog index/detail, story health check, about
  // Navbar starts transparent with light text, switches to light bg/dark text on scroll.
  const useDarkHero = isWorkIndex || isWorkDetail || isStoryTeardown || isBlogIndex || isBlogDetail || isAbout;

  const heroThreshold = useDarkHero
    ? (isStoryTeardown ? 550 : 400)
    : 20;

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

  // Detail page & health check & about: dark hero (transparent → light on scroll)
  // Everything else: dark bg (homepage, etc.)
  const useLightTheme = useDarkHero && isScrolled;

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

  const showDarkText = useLightTheme;

  const linkTone = showDarkText
    ? 'text-ink/70 hover:text-ink'
    : 'text-white/60 hover:text-white';

  const logoInvert = showDarkText;

  const handleStoryTeardownClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);

    if (pathname !== '/story-teardown') return;

    event.preventDefault();
    if (window.location.hash) {
      window.history.replaceState(null, '', '/story-teardown');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isBrandGuide) {
    return null;
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${baseShell}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center h-[4.25rem] md:h-20 lg:h-[5.5rem]">
        <Link href="/" scroll={true} className="flex items-center">
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
          <Link href="/about" className={`text-[11px] lg:text-[13px] uppercase tracking-[0.22em] lg:tracking-[0.25em] transition-colors duration-300 ${linkTone}`}>
            About
          </Link>
          <Link href="/work" className={`text-[11px] lg:text-[13px] uppercase tracking-[0.22em] lg:tracking-[0.25em] transition-colors duration-300 ${linkTone}`}>
            Work
          </Link>
          <Link href="/blog" className={`text-[11px] lg:text-[13px] uppercase tracking-[0.22em] lg:tracking-[0.25em] transition-colors duration-300 ${linkTone}`}>
            The Ink
          </Link>
          <Link
            href="/story-teardown"
            onClick={handleStoryTeardownClick}
            className={`text-[11px] lg:text-[13px] uppercase tracking-[0.22em] lg:tracking-[0.25em] font-bold border border-[var(--color-rust)] px-3 py-[7px] transition-colors duration-300 hover:bg-[var(--color-rust)]/15 ${showDarkText ? 'text-ink' : 'text-white'}`}
          >
            The Story Teardown
          </Link>
        </div>

        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`w-5 h-px transition-all duration-300 origin-center ${showDarkText ? 'bg-ink/70' : 'bg-white/70'} ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
          <span className={`w-5 h-px transition-all duration-300 ${showDarkText ? 'bg-ink/70' : 'bg-white/70'} ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`w-5 h-px transition-all duration-300 origin-center ${showDarkText ? 'bg-ink/70' : 'bg-white/70'} ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className={`border-t px-6 py-10 flex flex-col gap-7 ${showDarkText ? 'bg-[#FAFAFA] border-ink/10' : 'bg-[var(--color-ink)] border-white/[0.04]'}`}>
          <Link href="/about" className={`text-[11px] uppercase tracking-[0.25em] ${showDarkText ? 'text-ink/70' : 'text-white/60'}`} onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/work" className={`text-[11px] uppercase tracking-[0.25em] ${showDarkText ? 'text-ink/70' : 'text-white/60'}`} onClick={() => setMenuOpen(false)}>Work</Link>
          <Link href="/blog" className={`text-[11px] uppercase tracking-[0.25em] ${showDarkText ? 'text-ink/70' : 'text-white/60'}`} onClick={() => setMenuOpen(false)}>The Ink</Link>
          <div className={`w-8 h-px my-1 ${showDarkText ? 'bg-ink/20' : 'bg-white/10'}`} />
          <Link
            href="/story-teardown"
            onClick={handleStoryTeardownClick}
            className={`text-[11px] uppercase tracking-[0.25em] font-bold border border-[var(--color-rust)] px-3 py-[7px] transition-colors duration-300 hover:bg-[var(--color-rust)]/15 self-start ${showDarkText ? 'text-ink' : 'text-white'}`}
          >
            The Story Teardown
          </Link>
        </div>
      </div>
    </nav>
  );
}
