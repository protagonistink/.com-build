import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import WorkPortableText from '@/components/work/sections/WorkPortableText';
import type { PrologueSection } from '@/types/work';

export default function Prologue({ section }: { section: PrologueSection }) {
  if (!section.body) return null;

  return (
    <section className="bg-trueblack border-y border-white/[0.04]">
      <div className="max-w-5xl mx-auto py-24 md:py-36 lg:py-44 px-6 md:px-12">
        <ScrollRevealWrapper direction="up">
          <div className="mb-10">
            <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-rust inline-flex items-center gap-4">
              <span className="w-8 h-px bg-rust" /> Prologue
            </span>
          </div>

          <WorkPortableText value={section.body} variant="prologue" isDark />

          {section.details && section.details.length > 0 && (
            <div className="grid grid-cols-2 gap-8 md:gap-16 border-t border-white/[0.06] pt-8 mt-14 md:mt-20">
              {section.details.map((detail) => (
                <div key={detail._key}>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-2">
                    {detail.label}
                  </span>
                  <span className="text-sm md:text-base font-serif italic text-white/50">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </ScrollRevealWrapper>
      </div>
    </section>
  );
}
