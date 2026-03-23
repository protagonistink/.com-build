import type { FaqItem } from '@/types/blog';

interface PostCreditsProps {
  items: FaqItem[];
}

export default function PostCredits({ items }: PostCreditsProps) {
  return (
    <section
      className="bg-[#f9f7f2] pt-0 pb-24 md:pb-32 px-6 md:px-10 lg:px-12"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24 md:mb-40 flex flex-col md:flex-row md:items-end justify-between gap-16">
          <div className="relative group">
            <h2 className="flex flex-col select-none">
              <span className="font-serif text-[7.5rem] md:text-[11rem] lg:text-[15rem] leading-[0.8] text-ink uppercase tracking-tight">
                Post
              </span>
              <span className="font-hand-bold text-[7rem] md:text-[10.5rem] lg:text-[14.5rem] text-rust rotate-[1.5deg] leading-[0.8] ml-12 md:ml-24 mt-[-0.15em] flex items-baseline group-hover:rotate-0 transition-transform duration-500">
                Credits<span className="inline-block transform translate-y-[0.02em] ml-1">.</span>
              </span>
            </h2>
          </div>
          <div className="pb-8 md:pb-12 flex flex-col md:items-end gap-5 text-left md:text-right">
            <span className="text-technical text-[11px] md:text-[12px] tracking-widest text-ink/40">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <div className="w-16 md:w-24 h-px bg-ink/20 hidden md:block" />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col">
          {items.map((item, i) => {
            const num = String(i + 1).padStart(2, '0');
            return (
              <article
                key={i}
                className="grid grid-cols-1 md:grid-cols-[1fr_1px_1.5fr] gap-8 md:gap-16 lg:gap-24 items-start py-12 md:py-16 border-b border-rust/20 last:border-0"
                itemScope
                itemType="https://schema.org/Question"
              >
                {/* Question Column */}
                <div className="flex flex-col gap-6 md:gap-8">
                  <span className="text-technical text-[11px] tracking-widest text-rust/65">
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
                <div className="hidden md:block w-px bg-rust/20 h-full self-stretch" />

                {/* Answer Column */}
                <div
                  className="flex flex-col gap-6 md:pt-12"
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
