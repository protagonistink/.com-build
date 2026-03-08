import type { FaqItem } from '@/types/blog';

interface PostCreditsProps {
  items: FaqItem[];
}

export default function PostCredits({ items }: PostCreditsProps) {
  return (
    <section
      className="bg-[#f9f7f2] py-24 md:py-32 px-6 md:px-10 lg:px-12"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="border-b border-ink/[0.20] pb-6 mb-12 md:mb-16 flex justify-between items-end">
          <h2 className="text-technical text-[11px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-ink/90 font-semibold">
            POST CREDITS
          </h2>
          <span className="text-technical text-[10px] tracking-widest text-ink/40 hidden md:block">
            FREQUENTLY ASKED QUESTIONS
          </span>
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col">
          {items.map((item, i) => {
            const num = String(i + 1).padStart(2, '0');
            return (
              <article
                key={i}
                className="grid grid-cols-1 md:grid-cols-[1fr_1px_1.5fr] gap-8 md:gap-16 lg:gap-24 items-start py-12 md:py-16 border-b border-ink/[0.10] last:border-0"
                itemScope
                itemType="https://schema.org/Question"
              >
                {/* Question Column */}
                <div className="flex flex-col gap-6 md:gap-8">
                  <span className="text-technical text-[11px] tracking-widest text-ink/40">
                    {num}
                  </span>
                  <h3
                    className="font-display text-4xl md:text-5xl lg:text-[56px] tracking-[-0.02em] leading-[1.05] text-ink"
                    itemProp="name"
                  >
                    {item.question}
                  </h3>
                </div>

                {/* Desktop Divider */}
                <div className="hidden md:block w-px bg-ink/[0.10] h-full self-stretch" />

                {/* Answer Column */}
                <div
                  className="flex flex-col gap-6 md:pt-8"
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <p
                    className="font-sans text-base md:text-lg text-ink/70 leading-relaxed max-w-2xl"
                    itemProp="text"
                  >
                    {item.answer}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
