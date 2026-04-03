import Link from 'next/link';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import type { DeliverablesSection } from '@/types/work';

export default function Deliverables({ section }: { section: DeliverablesSection }) {
  return (
    <section className="bg-warmwhite py-24 md:py-36 px-6 texture-paper">
      <div className="max-w-6xl mx-auto">
        <ScrollRevealWrapper direction="up">
          {(section.headline || section.subheadline) && (
            <div className="text-center mb-16 md:mb-24">
              {section.headline && (
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-ink tracking-tight uppercase italic mb-5">
                  {section.headline}
                </h2>
              )}
              {section.subheadline && (
                <p className="text-ink/35 text-base md:text-lg font-serif italic max-w-xl mx-auto">
                  {section.subheadline}
                </p>
              )}
            </div>
          )}

          {section.items && section.items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-ink/[0.08] border border-ink/[0.08] mb-16 md:mb-24">
              {section.items.map((item) => (
                <div
                  key={item._key}
                  className="bg-warmwhite p-8 md:p-10 group hover:bg-ink transition-colors duration-500"
                >
                  {item.number && (
                    <span className="text-rust text-[9px] font-bold tracking-widest uppercase block mb-5">
                      {item.number}
                    </span>
                  )}
                  {item.title && (
                    <h4 className="text-base md:text-lg font-bold text-ink group-hover:text-white uppercase tracking-tight mb-3 transition-colors duration-500">
                      {item.title}
                    </h4>
                  )}
                  {item.description && (
                    <p className="text-ink/35 group-hover:text-white/35 text-sm leading-relaxed transition-colors duration-500">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {section.ctaLabel && section.ctaLink && (
            <div className="text-center">
              <Link
                href={section.ctaLink}
                className="inline-flex items-center gap-4 bg-rust text-white px-10 md:px-14 py-4 md:py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-ink transition-colors duration-500"
              >
                {section.ctaLabel}
                <span className="text-xs">→</span>
              </Link>
            </div>
          )}
        </ScrollRevealWrapper>
      </div>
    </section>
  );
}
