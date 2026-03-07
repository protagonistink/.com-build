'use client';

import { useState } from 'react';
import type { FaqItem } from '@/types/blog';

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-[960px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-8">
      {/* Section label */}
      <p className="text-technical text-[11px] tracking-[0.2em] text-rust/80 mb-2">
        FREQUENTLY ASKED
      </p>
      <div className="w-8 h-px bg-rust/60 mb-8" />

      <div className="divide-y divide-ink/[0.08]">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-start justify-between gap-6 py-5 text-left group"
                aria-expanded={isOpen}
              >
                <span className="font-display text-xl md:text-2xl text-ink leading-snug group-hover:text-rust transition-colors duration-300">
                  {item.question}
                </span>
                <span
                  className="flex-shrink-0 mt-1 w-5 h-5 flex items-center justify-center text-rust transition-transform duration-300"
                  style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  aria-hidden
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: isOpen ? '600px' : '0px' }}
              >
                <p className="font-serif text-base md:text-lg text-ink/70 leading-relaxed pb-6 pr-8">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
