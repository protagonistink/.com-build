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

    document.body.style.overflow = 'hidden';
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${menuOpen ? 'bg-transparent' : baseShell}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center h-[4.25rem] md:h-20 lg:h-[5.5rem]">
        <Link href="/" scroll={true} className="flex items-center">
          <Image
            src="/logo.png"
            alt="Protagonist Ink"
            width={280}
            height={56}
            className={`h-[28px] md:h-[34px] lg:h-[40px] w-auto transition-all duration-700 ${logoInvert && !menuOpen ? 'invert opacity-80' : 'opacity-95'}`}
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
          <span className={`w-5 h-px transition-all duration-300 origin-center ${menuOpen ? 'bg-white/70' : showDarkText ? 'bg-ink/70' : 'bg-white/70'} ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
          <span className={`w-5 h-px transition-all duration-300 ${menuOpen ? 'bg-white/70' : showDarkText ? 'bg-ink/70' : 'bg-white/70'} ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`w-5 h-px transition-all duration-300 origin-center ${menuOpen ? 'bg-white/70' : showDarkText ? 'bg-ink/70' : 'bg-white/70'} ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
        </button>
      </div>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 top-0 z-40 transition-all duration-500 ease-out ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } bg-trueblack`}
      >
        {/* Grain texture overlay */}
        <div className="absolute inset-0 texture-grain opacity-40 pointer-events-none" />

        {/* Ghost number — brutalist background element */}
        <div className="absolute -right-6 top-1/2 -translate-y-1/2 font-serif text-[18rem] italic text-warmwhite/[0.02] leading-none pointer-events-none select-none">
          PI
        </div>

        {/* Vertical rust accent — left edge */}
        <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-rust origin-top transition-transform duration-700 ease-out ${menuOpen ? 'scale-y-100' : 'scale-y-0'}`} />

        <div className="relative z-10 flex flex-col justify-end h-full px-8 pb-24">
          <nav className="flex flex-col gap-1">
            {[
              { href: '/about', label: 'About', num: '01', delay: 'delay-100' },
              { href: '/work', label: 'Work', num: '02', delay: 'delay-150' },
              { href: '/blog', label: 'The Ink', num: '03', delay: 'delay-200' },
            ].map(({ href, label, num, delay }) => (
              <Link
                key={href}
                href={href}
                className={`group/link relative block py-3 ${
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } transition-all duration-500 ${delay}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-technical text-[10px] tracking-[0.3em] text-rust/50 block mb-1">
                  {num}
                </span>
                <span className="font-display text-6xl uppercase leading-[0.85] tracking-tight text-warmwhite/80 group-hover/link:text-warmwhite transition-colors duration-300">
                  {label}
                </span>
              </Link>
            ))}
          </nav>

          <div className={`w-12 h-px bg-rust/60 mt-8 mb-6 ${menuOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 delay-250`} />

          <Link
            href="/story-teardown"
            onClick={handleStoryTeardownClick}
            className={`text-technical text-[13px] uppercase tracking-[0.25em] font-bold border border-rust/60 text-warmwhite/80 px-6 py-3 hover:bg-rust/15 hover:text-warmwhite transition-all duration-300 self-start ${
              menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            } transition-all duration-500 delay-300`}
          >
            The Story Teardown
          </Link>

          {/* Bottom technical caption */}
          <span className={`text-technical text-[9px] tracking-[0.3em] uppercase text-warmwhite/15 mt-auto pt-8 ${menuOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 delay-500`}>
            Protagonist Ink — Story-Led Brand Studio
          </span>
        </div>
      </div>
    </nav>
  );
}
