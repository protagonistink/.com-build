import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import WorkPortableText from '@/components/work/sections/WorkPortableText';
import type { PrologueSection } from '@/types/work';

type PrologueMetaItem = {
  label: string;
  value: string;
};

export default function Prologue({
  section,
  metaItems = [],
}: {
  section: PrologueSection;
  metaItems?: PrologueMetaItem[];
}) {
  if (!section.body) return null;

  const details = [...(section.details || []), ...metaItems.map((item, index) => ({
    _key: `meta-${index}-${item.label}`,
    label: item.label,
    value: item.value,
  }))];

  return (
    <section className="bg-trueblack border-y border-white/[0.04]">
      <div className="max-w-screen-2xl mx-auto py-16 md:py-20 lg:py-24 px-6 md:px-10 lg:px-12">
        <ScrollRevealWrapper direction="up">
          <div className="mb-8 md:mb-10">
            <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-rust inline-flex items-center gap-4">
              <span className="w-8 h-px bg-rust" /> Prologue
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.65fr)_minmax(220px,0.6fr)] gap-10 md:gap-12 lg:gap-16 items-start">
            <div className="max-w-[52rem]">
              <WorkPortableText value={section.body} variant="prologue" isDark />
            </div>

            {details.length > 0 && (
              <div className="border-t lg:border-t-0 lg:border-l border-white/[0.06] pt-6 lg:pt-0 lg:pl-8 xl:pl-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5 md:gap-6">
                  {details.map((detail) => (
                    <div key={detail._key}>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-white/20 mb-1.5">
                        {detail.label}
                      </span>
                      <span className="text-base md:text-[1.1rem] leading-snug font-serif text-white/58">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
}
