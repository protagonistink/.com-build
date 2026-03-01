# Blog "Darkroom" Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the blog index page with scroll-triggered color image takeovers, brutalist typography, a category filter bar, and a cleaner page assembly that eliminates dark interstitial clutter.

**Architecture:** The page keeps BlogHero and CinematicFeatured unchanged, adds a new sticky CategoryFilterBar for client-side filtering, rewrites PostRow as a `'use client'` component with IntersectionObserver-driven image backgrounds, and removes PullQuoteInterstitial, FilmStrip, and the dark BlogCTA. A light FooterCTA replaces the dark mid-feed CTA.

**Tech Stack:** Next.js App Router, Tailwind CSS v4 (`@theme inline`), `next/image`, React hooks (`useState`, `useRef`, `useEffect`), IntersectionObserver API. No new dependencies.

**Design Doc:** `docs/plans/2026-02-28-blog-darkroom-redesign-design.md`

---

### Task 1: Update Mock Data Categories

**Files:**
- Modify: `data/blog-posts.ts` (lines 1–63)

**Step 1: Replace placeholder categories with real ones**

Replace the entire content of `data/blog-posts.ts` with:

```ts
import type { BlogPost } from '@/types/blog';

export const BLOG_CATEGORIES = [
  'Narrative Architecture',
  'Founder Psychology',
  'AI & Human Craft',
  'Field Notes',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Architecture of a Narrative',
    slug: 'architecture-of-narrative',
    publishedAt: '2026-02-28',
    excerpt:
      'How structural engineering principles apply to storytelling in the modern digital age.',
    category: 'Narrative Architecture',
    mainImage: 'https://picsum.photos/seed/architecture/1920/1080',
  },
  {
    id: '2',
    title: 'Shadows in the System',
    slug: 'shadows-in-the-system',
    publishedAt: '2026-02-15',
    excerpt:
      'Identifying the unseen forces that shape user behavior and brand perception.',
    category: 'Founder Psychology',
    mainImage: null,
  },
  {
    id: '3',
    title: 'Precision Over Persuasion',
    slug: 'precision-over-persuasion',
    publishedAt: '2026-01-30',
    excerpt:
      'Why the era of marketing fluff is dead, and exactitude is the new currency.',
    category: 'AI & Human Craft',
    mainImage: 'https://picsum.photos/seed/noir2/1600/900',
  },
  {
    id: '4',
    title: 'The Geometry of Trust',
    slug: 'geometry-of-trust',
    publishedAt: '2026-01-12',
    excerpt:
      'Mapping the coordinates where brand promises meet consumer reality.',
    category: 'Narrative Architecture',
    mainImage: null,
  },
  {
    id: '5',
    title: 'Echoes in the Void',
    slug: 'echoes-in-the-void',
    publishedAt: '2025-12-05',
    excerpt:
      'When a brand speaks but no one listens: diagnosing the silent disconnect.',
    category: 'Founder Psychology',
    mainImage: 'https://picsum.photos/seed/noir5/1400/900',
  },
  {
    id: '6',
    title: 'Calculated Risks',
    slug: 'calculated-risks',
    publishedAt: '2025-11-20',
    excerpt: 'A mathematical approach to creative leaps and brand evolution.',
    category: 'Field Notes',
    mainImage: 'https://picsum.photos/seed/noir3/1200/800',
  },
];
```

Key changes:
- Categories updated from placeholders (Frameworks, Analysis, etc.) to 4 real ones
- Exported `BLOG_CATEGORIES` array and `BlogCategory` type for the filter bar
- Removed `?grayscale` from picsum URLs — images are now full color

**Step 2: Verify build**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npx next build 2>&1 | tail -20`
Expected: Build succeeds (no type errors since category is still `string` in BlogPost)

**Step 3: Commit**

```bash
git add data/blog-posts.ts
git commit -m "feat(blog): update mock data with real categories and color images"
```

---

### Task 2: Create CategoryFilterBar Component

**Files:**
- Create: `components/blog/CategoryFilterBar.tsx`

**Step 1: Create the component**

```tsx
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
        <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
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
```

Key decisions:
- `sticky` positioning with `top` matching Navbar heights at each breakpoint (`top-[4.25rem] md:top-20 lg:top-[5.5rem]`)
- `z-40` (below Navbar's `z-50`)
- `bg-[#FAFAFA]/90 backdrop-blur-sm` for frosted glass on scroll
- Mobile: `overflow-x-auto` for horizontal scroll, `scrollbar-hide` utility
- `null` = "All" selected

**Step 2: Add scrollbar-hide utility if missing**

Check `app/globals.css` for a `.scrollbar-hide` utility. If not present, add it:

```css
/* Hide scrollbar for category filter */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

**Step 3: Verify build**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npx next build 2>&1 | tail -20`
Expected: Build succeeds. (Component isn't used yet, but should compile.)

**Step 4: Commit**

```bash
git add components/blog/CategoryFilterBar.tsx app/globals.css
git commit -m "feat(blog): add CategoryFilterBar component with sticky pills"
```

---

### Task 3: Rewrite PostRow with Scroll-Triggered Image Takeover

**Files:**
- Rewrite: `components/blog/PostRow.tsx` (entire file)

**Step 1: Replace the entire PostRow component**

```tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

interface PostRowProps {
  post: BlogPost;
  displayNumber: number;
  index: number;
}

export default function PostRow({ post, displayNumber, index }: PostRowProps) {
  const num = String(displayNumber).padStart(2, '0');
  const hasImage = !!post.mainImage;
  const rowRef = useRef<HTMLAnchorElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!hasImage || !rowRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, [hasImage]);

  return (
    <Link
      ref={rowRef}
      href={`/blog/${post.slug}`}
      className="group block border-b border-ink/[0.06] relative overflow-hidden"
      style={{
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      {/* ── Scroll-triggered color image background ── */}
      {hasImage && (
        <>
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              isActive ? 'opacity-80' : 'opacity-0'
            }`}
          >
            <Image
              src={post.mainImage!}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Gradient overlay for text legibility */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 transition-opacity duration-700 ease-out ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      )}

      {/* Ghost number — massive, drifts on hover */}
      <div
        className={`absolute -right-4 top-1/2 -translate-y-1/2 font-serif text-[10rem] md:text-[12rem] italic pointer-events-none select-none group-hover:-translate-x-6 transition-all duration-700 ease-out ${
          isActive ? 'text-warmwhite/[0.06]' : 'text-ink/[0.03]'
        }`}
      >
        {num}
      </div>

      {/* Rust accent line — editorial mark */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-rust origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out z-10" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-12 md:py-16 lg:py-20 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start relative z-10">
        {/* Metadata column */}
        <div className="md:col-span-3 flex md:flex-col gap-4 md:gap-3 pt-1">
          <span
            className={`text-technical text-[11px] tracking-[0.2em] italic transition-colors duration-500 ${
              isActive ? 'text-warmwhite/50' : 'text-ink/25'
            }`}
          >
            {post.publishedAt}
          </span>
          {/* Rust rule — expands on hover */}
          <span className="hidden md:block w-0 h-px bg-rust group-hover:w-10 transition-all duration-500 ease-out" />
          <span className="md:hidden w-4 h-px bg-rust/40 self-center" />
          <span
            className={`text-technical text-[11px] tracking-[0.2em] italic transition-colors duration-500 ${
              isActive ? 'text-warmwhite/50' : 'text-ink/25'
            }`}
          >
            {post.category}
          </span>
        </div>

        {/* Content column */}
        <div className="md:col-span-8 md:col-start-5 group-hover:translate-x-2 transition-transform duration-500 ease-out">
          <h2
            className={`font-display text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight mb-5 md:mb-6 transition-colors duration-500 ${
              isActive
                ? 'text-warmwhite group-hover:text-warmwhite/90'
                : 'text-ink/80 group-hover:text-rust'
            }`}
          >
            {post.title}
          </h2>

          <p
            className={`font-serif italic text-base md:text-lg leading-relaxed max-w-2xl transition-colors duration-500 ${
              isActive ? 'text-warmwhite/60' : 'text-ink/45'
            }`}
          >
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
```

Key changes from current PostRow:
- `'use client'` directive added
- `useRef` + `useEffect` + `IntersectionObserver` for scroll detection
- `isActive` state drives all color transitions
- Image renders as full `absolute inset-0` background in COLOR (no grayscale)
- Gradient overlay: `from-black/70 via-black/50 to-black/30`
- Text inverts: `text-ink/80 → text-warmwhite` when `isActive`
- Title scaled up: `text-4xl md:text-6xl lg:text-7xl` with `font-display`
- Removed: ambient image wash, image peek
- Kept: ghost number, rust accent line, metadata column, hover effects
- Increased vertical padding: `py-12 md:py-16 lg:py-20`

**Step 2: Verify build**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npx next build 2>&1 | tail -20`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add components/blog/PostRow.tsx
git commit -m "feat(blog): rewrite PostRow with scroll-triggered image takeover and brutalist type"
```

---

### Task 4: Rewrite blog/page.tsx Page Assembly

**Files:**
- Rewrite: `app/blog/page.tsx` (entire file)

This is the integration task. It connects CategoryFilterBar, the new PostRow, removes PullQuoteInterstitial/FilmStrip/BlogCTA, and adds a light FooterCTA.

**Step 1: Replace the entire blog page**

```tsx
import { BLOG_POSTS } from '@/data/blog-posts';
import BlogHero from '@/components/blog/BlogHero';
import CinematicFeatured from '@/components/blog/CinematicFeatured';
import BlogFeed from '@/components/blog/BlogFeed';

export const metadata = {
  title: 'The Ink — Protagonist Ink',
  description:
    'Frameworks, analyses, and architectural blueprints for brands that refuse to be ignored. Strictly signal. Zero noise.',
};

export default function BlogPage() {
  const [featured, ...remaining] = BLOG_POSTS;

  return (
    <main className="min-h-screen">
      {/* ─── The Entrance ─── */}
      <BlogHero />
      <CinematicFeatured post={featured} />

      {/* ─── The Archive ─── */}
      <BlogFeed posts={remaining} />
    </main>
  );
}
```

Note: The page itself stays a server component. The client-side filtering logic lives in a new `BlogFeed` wrapper component.

**Step 2: Create the BlogFeed wrapper component**

Create `components/blog/BlogFeed.tsx`:

```tsx
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
```

Key decisions:
- `BlogFeed` is a `'use client'` wrapper that owns the `selectedCategory` state
- CategoryFilterBar sits above the paper section
- Posts are filtered client-side — simple `.filter()` on category match
- `displayNumber` recalculates based on filtered index (starts at 2, since post 1 is featured)
- Empty state for when a category has no posts
- FooterCTA moved inline (extracted from old page.tsx, light paper treatment, identical to the existing one)

**Step 3: Verify build**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npx next build 2>&1 | tail -20`
Expected: Build succeeds. Unused imports for PullQuoteInterstitial, FilmStrip, BlogCTA are gone.

**Step 4: Commit**

```bash
git add app/blog/page.tsx components/blog/BlogFeed.tsx
git commit -m "feat(blog): rewrite page assembly with CategoryFilterBar and BlogFeed"
```

---

### Task 5: Delete Removed Components

**Files:**
- Delete: `components/blog/PullQuoteInterstitial.tsx`
- Delete: `components/blog/FilmStrip.tsx`

**Step 1: Verify no other imports**

Run: `grep -rn "PullQuoteInterstitial\|FilmStrip" "/Users/pat/Sites/Protagonist Ink/next" --include="*.tsx" --include="*.ts" | grep -v node_modules | grep -v ".next"`

Expected: No results (page.tsx no longer imports them after Task 4).

**Step 2: Delete the files**

```bash
rm components/blog/PullQuoteInterstitial.tsx components/blog/FilmStrip.tsx
```

**Step 3: Verify build**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npx next build 2>&1 | tail -20`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add -u components/blog/PullQuoteInterstitial.tsx components/blog/FilmStrip.tsx
git commit -m "chore(blog): remove PullQuoteInterstitial and FilmStrip components"
```

---

### Task 6: Visual QA and Fixes

**Files:** Varies based on findings

**Step 1: Start dev server and check in browser**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npx next dev -p 3001`

Open: `http://localhost:3001/blog`

**Step 2: Visual checklist**

Check each of these:
- [ ] BlogHero renders unchanged
- [ ] CinematicFeatured renders unchanged
- [ ] CategoryFilterBar is visible between CinematicFeatured and feed
- [ ] CategoryFilterBar sticks under navbar on scroll
- [ ] "All" pill is selected by default (white bg)
- [ ] Clicking a category filters posts, clicking "All" shows all
- [ ] PostRow titles are large and brutalist (`text-4xl` → `text-7xl`)
- [ ] PostRows with images: scrolling triggers color image background fade-in
- [ ] PostRows with images: text inverts to white when image is active
- [ ] PostRows without images: remain clean paper, no visual artifacts
- [ ] Ghost numbers visible and drift on hover
- [ ] Rust accent line appears on hover
- [ ] No PullQuoteInterstitial visible
- [ ] No FilmStrip visible
- [ ] No dark BlogCTA mid-feed
- [ ] Light FooterCTA at bottom with "End of File" + Story Health Check link
- [ ] Mobile: filter bar scrolls horizontally

**Step 3: Fix any issues found**

Address visual bugs. Common things to watch for:
- Image loading flash (consider `placeholder="blur"` if needed)
- Filter bar background not matching paper color exactly
- z-index stacking issues between sticky filter bar and image backgrounds
- Text color transitions not smooth enough

**Step 4: Final build check**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npx next build 2>&1 | tail -20`
Expected: Clean build, no warnings

**Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix(blog): visual QA fixes for Darkroom redesign"
```
