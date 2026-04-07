import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import WorkPortableText from '@/components/work/sections/WorkPortableText';
import type { CloserSection } from '@/types/work';

export default function Closer({ section }: { section: CloserSection }) {
  return (
    <section className="bg-[#f5f2ec] py-24 md:py-36 lg:py-44">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <ScrollRevealWrapper direction="up">
          <div className="w-12 h-px bg-rust mx-auto mb-12 md:mb-16" />
          <WorkPortableText
            value={section.text}
            variant="pull-quote"
            align="center"
            className="max-w-none"
            isDark={false}
          />
        </ScrollRevealWrapper>
      </div>
    </section>
  );
}
