'use client';

import Image from 'next/image';

const logos = [
  { src: '/logos/687ef05091e347109683f512_Home-Depot-logo.png', alt: 'Home Depot', invert: false },
  { src: '/logos/687ef047b5fb4845a7b6c58c_beats.png', alt: 'Beats', invert: false },
  { src: '/logos/6925c666f16163f30f6e8696_Decoda_logo.png', alt: 'Decoda', invert: true },
  { src: '/logos/6925c666a98aef1f8de83e81_LOGO-YOLA_National_Color.png', alt: 'YOLA National', invert: false },
  { src: '/logos/6925c6670e2e2003c0f8bda5_Chevron_logo.png', alt: 'Chevron', invert: false },
  { src: '/logos/687ef41eeabdd8ad32f5bf2d_fitureai_cover.png', alt: 'Fiture AI', invert: true },
];

// Triple for seamless infinite scroll illusion
const logoSet = [...logos, ...logos, ...logos];

export default function LogoWall() {
  return (
    <div className="w-full py-16 md:py-20 bg-trueblack relative overflow-hidden border-t border-white/[0.04]">

      {/* Label */}
      <div className="flex justify-center mb-10 md:mb-14">
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/20">
          Featuring
        </span>
      </div>

      {/* Scroll strip */}
      <div className="relative overflow-hidden">

        {/* Edge fade mask */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.9) 12%, #000 30%, #000 70%, rgba(0,0,0,0.9) 88%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.9) 12%, #000 30%, #000 70%, rgba(0,0,0,0.9) 88%, transparent 100%)',
          }}
        />

        <div className="[animation:logo-scroll_40s_linear_infinite] hover:[animation-play-state:paused] flex items-center gap-16 md:gap-24 lg:gap-32 whitespace-nowrap w-max">
          {logoSet.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center group cursor-default"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={64}
                className="h-10 md:h-12 w-auto object-contain transition-all duration-300 ease-out group-hover:-translate-y-px"
                style={{
                  filter: logo.invert
                    ? 'invert(1) grayscale(100%) brightness(0.75)'
                    : 'grayscale(100%) contrast(1.1) brightness(0.55)',
                  opacity: 0.7,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLImageElement).style.filter = logo.invert
                    ? 'invert(1) brightness(1.2)'
                    : 'none';
                  (e.currentTarget as HTMLImageElement).style.opacity = '1';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLImageElement).style.filter = logo.invert
                    ? 'invert(1) grayscale(100%) brightness(0.75)'
                    : 'grayscale(100%) contrast(1.1) brightness(0.55)';
                  (e.currentTarget as HTMLImageElement).style.opacity = '0.7';
                }}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
