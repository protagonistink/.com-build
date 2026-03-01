'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';
import CategoryFilterBar from './CategoryFilterBar';
import PostRow from './PostRow';

export default function BlogFeed({ posts }: { posts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = selectedCategory
    ? posts.filter((p) => p.category === selectedCategory)
    : posts;

  return (
    <>
      <CategoryFilterBar
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="bg-[#FAFAFA] text-ink texture-paper">
        {filtered.map((post, i) => (
          <div
            key={post.id}
            className="transition-all duration-300 ease-out"
          >
            <PostRow
              post={post}
              displayNumber={i + 2}
              index={i}
            />
          </div>
        ))}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="px-6 md:px-10 lg:px-12 py-24 md:py-32 text-center">
            <p className="font-serif italic text-xl text-ink/30">
              Nothing filed under this category yet.
            </p>
          </div>
        )}

        {/* ─── Footer CTA (light paper treatment) ─── */}
        <section className="px-6 md:px-10 lg:px-12 pt-12 pb-24 md:pb-32">
          <div className="max-w-[1400px] mx-auto">
            <div className="h-px bg-ink/10 mb-16" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div>
                <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-4">
                  End of File
                </p>
                <p className="font-serif text-2xl md:text-3xl italic text-ink/45 leading-relaxed max-w-md">
                  That&rsquo;s the current archive. More frameworks are being
                  engineered.
                </p>
              </div>
              <Link
                href="/story-health-check"
                className="text-[12px] uppercase tracking-[0.25em] text-rust hover:text-ink transition-colors duration-500 border-b border-rust/40 hover:border-ink/40 pb-1 shrink-0"
              >
                Story Health Check &rarr;
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
