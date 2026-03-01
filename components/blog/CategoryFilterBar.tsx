'use client';

import { BLOG_CATEGORIES } from '@/data/blog-posts';

interface CategoryFilterBarProps {
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategoryFilterBar({
  selected,
  onSelect,
}: CategoryFilterBarProps) {
  return (
    <div className="sticky top-[4.25rem] md:top-20 lg:top-[5.5rem] z-40 bg-[#FAFAFA]/90 backdrop-blur-sm border-b border-ink/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="flex gap-2 py-4 overflow-x-auto no-scrollbar">
          {/* "All" pill */}
          <button
            onClick={() => onSelect(null)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-technical text-[11px] tracking-[0.2em] uppercase transition-all duration-300 border ${
              selected === null
                ? 'text-warmwhite bg-ink border-ink'
                : 'text-ink/40 bg-transparent border-ink/10 hover:text-rust hover:border-rust/40'
            }`}
          >
            All
          </button>

          {/* Category pills */}
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-technical text-[11px] tracking-[0.2em] uppercase transition-all duration-300 border ${
                selected === cat
                  ? 'text-warmwhite bg-ink border-ink'
                  : 'text-ink/40 bg-transparent border-ink/10 hover:text-rust hover:border-rust/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
