'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'The Ink', href: '/blog' },
  { label: 'The Story Teardown', href: '/story-teardown' },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/protagonist-ink' },
  { label: 'Instagram', href: 'https://instagram.com/protagonistink' },
];

export default function Footer() {
  const pathname = usePathname();
  const isBrandGuide = pathname?.startsWith('/brand-guide');
  const isBlog = pathname === '/blog' || /^\/blog\/.+/.test(pathname ?? '');

  if (isBrandGuide || isBlog) {
    return null;
  }

  return (
    <footer className="bg-trueblack text-white relative overflow-hidden">

      {/* Top border accent — thin rust line */}
      <div className="h-px bg-gradient-to-r from-transparent via-rust/40 to-transparent" />

      {/* ── Main footer content ── */}
      <div className="px-6 md:px-10 lg:px-12 max-w-[1400px] mx-auto">

        {/* ── Navigation grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 py-10 md:py-16 border-b border-white/[0.04]">

          {/* Brand mark — logo */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block group -ml-[7px]">
              <Image
                src="/logo.png"
                alt="Protagonist Ink"
                width={280}
                height={56}
                className="h-[32px] md:h-[34px] w-auto opacity-50 group-hover:opacity-70 transition-opacity duration-300"
              />
            </Link>
            <p className="font-sans text-sm text-white/30 mt-3 leading-relaxed max-w-[280px]">
              Narrative architecture &amp;<br />
              brand strategy studio.
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3 md:col-start-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/35 block mb-5">
              Navigate
            </span>
            <ul className="space-y-3.5">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-[15px] text-white/50 hover:text-white/80 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-3 md:col-start-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/35 block mb-5">
              Connect
            </span>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="mailto:hello@protagonist.ink"
                  className="font-sans text-[15px] text-white/50 hover:text-white/80 transition-colors duration-300"
                >
                  hello@protagonist.ink
                </a>
              </li>
              <li className="font-sans text-[15px] text-white/35">
                Atlanta, GA
              </li>
              {socialLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[15px] text-white/50 hover:text-white/80 transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Legal bar ── */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="font-sans text-xs text-white/25 tracking-[0.05em]">
            &copy; {new Date().getFullYear()} Protagonist Ink LLC. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-white/15 tracking-[0.3em] uppercase select-none">
            Built with conviction.
          </p>
        </div>

      </div>

      {/* Background texture — subtle grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

    </footer>
  );
}
