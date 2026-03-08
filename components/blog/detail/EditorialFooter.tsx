// components/blog/detail/EditorialFooter.tsx
import Image from 'next/image';
import Link from 'next/link';
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

export default function EditorialFooter() {
  return (
    <footer className="bg-gradient-to-b from-[#0a0a0a] to-[#111] relative overflow-hidden">

      {/* Top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-rust/40 to-transparent" />

      <div className="px-6 md:px-10 lg:px-12 max-w-[1400px] mx-auto">

        {/* ── Three-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 py-16 md:py-20 relative">

          {/* ── Left: Newsletter ── */}
          <div className="md:col-span-4">
            <p className="font-display italic text-[24px] md:text-[28px] text-warmwhite/80 leading-tight">
              The Ink, delivered.
            </p>
            <p className="font-sans text-[15px] text-white/50 mt-4 mb-8 leading-relaxed max-w-[320px]">
              Get biweekly insights on all things copy, story, and voice sent straight to your inbox.
            </p>
            {/* TODO: wire to newsletter provider */}
            <form action="#">
              <div className="flex items-end gap-0 border-b border-warmwhite/20 pb-2 max-w-[320px]">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent text-warmwhite text-[15px] placeholder-warmwhite/40 focus:outline-none font-sans min-w-0"
                />
                <button
                  type="submit"
                  className="font-sans text-[15px] text-rust hover:text-warmwhite transition-colors duration-300 ml-4 flex-shrink-0"
                >
                  Join now →
                </button>
              </div>
            </form>
          </div>

          {/* ── Center: Navigate ── */}
          <div className="md:col-span-3 md:col-start-6">
            <span className="font-sans text-[13px] uppercase tracking-wide text-white/45 block mb-5">
              Navigate
            </span>
            <ul className="space-y-3">
              {navLinks.map(link => {
                const isStoryTeardown = link.label === 'The Story Teardown';
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={
                        isStoryTeardown
                          ? 'font-sans text-[15px] text-rust/70 hover:text-rust transition-colors duration-300'
                          : 'font-sans text-[15px] text-white/65 hover:text-white/90 transition-colors duration-300'
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Right: Connect ── */}
          <div className="md:col-span-3 md:col-start-10">
            <span className="font-sans text-[13px] uppercase tracking-wide text-white/45 block mb-5">
              Connect
            </span>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@protagonist.ink"
                  className="font-sans text-[15px] text-white/65 hover:text-white/90 transition-colors duration-300"
                >
                  hello@protagonist.ink
                </a>
              </li>
              {socialLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[15px] text-white/65 hover:text-white/90 transition-colors duration-300 inline-flex items-center gap-1.5"
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
        <div className="py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-t border-white/[0.04]">
          <p className="font-sans text-[13px] text-white/35 tracking-wide">
            &copy; {new Date().getFullYear()} Protagonist Ink LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-3 select-none">
            <p className="font-sans text-[13px] text-white/35 tracking-wide">
              Architected in NYC &amp; ATL
            </p>
            <Image
              src="/images/brand/symbol_trans_white3k.png"
              alt=""
              width={40}
              height={40}
              aria-hidden
              className="opacity-[0.3]"
            />
          </div>
        </div>

      </div>

      {/* Background grain texture */}
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
