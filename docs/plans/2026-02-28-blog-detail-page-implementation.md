# Blog Detail Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a magazine-style blog detail page at `/blog/[slug]` with a type-forward dark hero, paper body with narrow/breakout column system, modular content blocks, and a "More Ink" related posts section.

**Architecture:** Server component page with client sub-components for motion. Dark hero → paper body overlap pattern (matching `app/work/[slug]/page.tsx`). Content blocks are standalone components that each manage their own column width. Mock body content as JSX now, Sanity Portable Text later.

**Tech Stack:** Next.js App Router, Tailwind CSS v4, Framer Motion (`motion/react`), existing design tokens (ink, warmwhite, rust, trueblack), Cormorant + Satoshi typography.

**Design doc:** `docs/plans/2026-02-28-blog-detail-page-design.md`

---

## Task 1: Extend BlogPost Type

**Files:**
- Modify: `types/blog.ts`

**Step 1: Add `readTime` and optional `body` to BlogPost interface**

```typescript
// types/blog.ts
import type { ReactNode } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  category: string;
  mainImage: string | null;
  readTime: string;
  body?: ReactNode;
}
```

**Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: Errors in `data/blog-posts.ts` — each post object is now missing `readTime`. That's expected; we fix it in the next step.

**Step 3: Add `readTime` to every post in data**

```typescript
// data/blog-posts.ts — add readTime to each post object
// Post 1:
readTime: '7 min read',
// Post 2:
readTime: '5 min read',
// Post 3:
readTime: '6 min read',
// Post 4:
readTime: '4 min read',
// Post 5:
readTime: '5 min read',
// Post 6:
readTime: '3 min read',
```

**Step 4: Verify types compile clean**

Run: `npx tsc --noEmit`
Expected: PASS (no errors)

**Step 5: Commit**

```bash
git add types/blog.ts data/blog-posts.ts
git commit -m "feat(blog): extend BlogPost type with readTime and optional body"
```

---

## Task 2: Update Navbar for Blog Detail Dark Hero

**Files:**
- Modify: `components/Navbar.tsx`

**Step 1: Add blog detail path detection**

In `components/Navbar.tsx`, find the line:

```typescript
const isBlog = pathname === '/blog';
```

Add below it:

```typescript
const isBlogDetail = pathname?.startsWith('/blog/') && pathname !== '/blog';
```

Then update the `useDarkHero` line to include `isBlogDetail`:

```typescript
const useDarkHero = isWorkDetail || isStoryHealthCheck || isBlog || isBlogDetail;
```

**Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: PASS

**Step 3: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat(blog): navbar detects blog detail pages for dark hero mode"
```

---

## Task 3: Create Prose Wrapper Component

**Files:**
- Create: `components/blog/detail/Prose.tsx`

**Step 1: Create the component**

```tsx
// components/blog/detail/Prose.tsx
export default function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[680px] mx-auto px-6 md:px-10 space-y-6 md:space-y-8 text-base md:text-lg leading-relaxed md:leading-[1.8] text-ink/80">
      {children}
    </div>
  );
}
```

This is the narrow reading column (680px). Body paragraphs live inside `<Prose>` blocks. Breakout components (PullQuote, FullBleedImage) sit *between* Prose blocks and handle their own width.

**Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: PASS

**Step 3: Commit**

```bash
git add components/blog/detail/Prose.tsx
git commit -m "feat(blog): add Prose wrapper for narrow reading column"
```

---

## Task 4: Create Drop Cap CSS Utility

**Files:**
- Modify: `app/globals.css`

**Step 1: Add `.drop-cap` class**

Add after the existing `.text-narrative` block in `globals.css`:

```css
/* Drop cap — first letter of opening paragraph */
.drop-cap::first-letter {
  float: left;
  font-family: var(--font-display);
  font-size: 3.5em;
  line-height: 0.8;
  padding-right: 0.08em;
  padding-top: 0.05em;
  color: var(--color-ink);
}
```

Per design doc: "Opening letter scales to ~3 lines tall, Cormorant display, float-left, ink color, slight right margin. CSS utility on the first `<p>` — no extra markup."

**Step 2: Verify dev server renders**

Start dev server if not running. Navigate to any page to confirm CSS loads without errors.

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat(blog): add drop-cap CSS utility class"
```

---

## Task 5: Create PullQuote Component

**Files:**
- Create: `components/blog/detail/PullQuote.tsx`

**Step 1: Create the component**

```tsx
// components/blog/detail/PullQuote.tsx
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

interface PullQuoteProps {
  text: string;
}

export default function PullQuote({ text }: PullQuoteProps) {
  return (
    <ScrollRevealWrapper>
      <blockquote className="max-w-[960px] mx-auto px-6 md:px-10 py-12 md:py-16 text-center">
        <div className="w-10 h-px bg-rust mx-auto mb-8" />
        <p className="font-display italic text-2xl md:text-3xl text-ink/50 leading-snug max-w-3xl mx-auto">
          {text}
        </p>
      </blockquote>
    </ScrollRevealWrapper>
  );
}
```

Per design doc: breakout width (~960px), centered, thin rust rule above (40px), large Cormorant italic, `text-2xl md:text-3xl`, `text-ink/50`, no quotation marks, generous vertical padding `py-12 md:py-16`.

**Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: PASS

**Step 3: Commit**

```bash
git add components/blog/detail/PullQuote.tsx
git commit -m "feat(blog): add PullQuote content block component"
```

---

## Task 6: Create FullBleedImage Component

**Files:**
- Create: `components/blog/detail/FullBleedImage.tsx`

**Step 1: Create the component**

```tsx
// components/blog/detail/FullBleedImage.tsx
import Image from 'next/image';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

interface FullBleedImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function FullBleedImage({ src, alt, caption }: FullBleedImageProps) {
  return (
    <ScrollRevealWrapper>
      <figure className="max-w-[960px] mx-auto px-6 md:px-10 py-4">
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-ink/[0.06]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 960px"
          />
        </div>
        {caption && (
          <figcaption className="text-technical text-[11px] tracking-[0.15em] text-ink/30 text-right mt-3">
            {caption}
          </figcaption>
        )}
      </figure>
    </ScrollRevealWrapper>
  );
}
```

Per design doc: breakout width, `aspect-[16/9]`, `rounded-lg`, subtle border `border-ink/[0.06]`, optional caption in technical text, right-aligned, low opacity.

**Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: PASS

**Step 3: Commit**

```bash
git add components/blog/detail/FullBleedImage.tsx
git commit -m "feat(blog): add FullBleedImage content block component"
```

---

## Task 7: Create InlineFigure Component

**Files:**
- Create: `components/blog/detail/InlineFigure.tsx`

**Step 1: Create the component**

```tsx
// components/blog/detail/InlineFigure.tsx
import Image from 'next/image';

interface InlineFigureProps {
  src: string;
  alt: string;
  caption?: string;
  aspect?: 'natural' | '4/3';
}

export default function InlineFigure({ src, alt, caption, aspect = '4/3' }: InlineFigureProps) {
  return (
    <figure className="max-w-[680px] mx-auto px-6 md:px-10 py-4">
      <div
        className={`relative rounded-lg overflow-hidden border border-ink/[0.06] ${
          aspect === '4/3' ? 'aspect-[4/3]' : ''
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 680px"
        />
      </div>
      {caption && (
        <figcaption className="text-technical text-[11px] tracking-[0.15em] text-ink/30 text-right mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
```

Per design doc: stays within narrow column (680px), same caption treatment, `aspect-[4/3]` or natural.

**Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: PASS

**Step 3: Commit**

```bash
git add components/blog/detail/InlineFigure.tsx
git commit -m "feat(blog): add InlineFigure content block component"
```

---

## Task 8: Create SectionDivider Component

**Files:**
- Create: `components/blog/detail/SectionDivider.tsx`

**Step 1: Create the component**

```tsx
// components/blog/detail/SectionDivider.tsx
interface SectionDividerProps {
  variant?: 'rule' | 'marker' | 'space';
  marker?: string;
}

export default function SectionDivider({ variant = 'rule', marker = '§' }: SectionDividerProps) {
  if (variant === 'space') {
    return <div className="py-6 md:py-10" />;
  }

  if (variant === 'marker') {
    return (
      <div className="max-w-[680px] mx-auto px-6 md:px-10 py-8 md:py-12 text-center">
        <span className="text-technical text-[11px] tracking-[0.2em] text-ink/15">
          {marker}
        </span>
      </div>
    );
  }

  // Default: rule
  return (
    <div className="max-w-[680px] mx-auto px-6 md:px-10 py-8 md:py-12">
      <div className="h-px bg-ink/10" />
    </div>
  );
}
```

Per design doc: three variants — rule (`h-px bg-ink/10`), marker (centered `§` in technical text), space (extra vertical padding only).

**Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: PASS

**Step 3: Commit**

```bash
git add components/blog/detail/SectionDivider.tsx
git commit -m "feat(blog): add SectionDivider content block component"
```

---

## Task 9: Create MoreInk Related Posts Component

**Files:**
- Create: `components/blog/detail/MoreInk.tsx`

**Step 1: Create the component**

```tsx
// components/blog/detail/MoreInk.tsx
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

interface MoreInkProps {
  posts: BlogPost[];
}

export default function MoreInk({ posts }: MoreInkProps) {
  if (posts.length === 0) return null;

  return (
    <div className="max-w-[960px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-8">
      <ScrollRevealWrapper>
        <h3 className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-10 md:mb-14">
          MORE INK
        </h3>
      </ScrollRevealWrapper>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {posts.map((post, i) => (
          <ScrollRevealWrapper key={post.id} delay={i * 0.1}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <span className="text-technical text-[10px] tracking-[0.2em] text-ink/25 block mb-3">
                {post.category}
              </span>
              <h4 className="font-display text-xl md:text-2xl text-ink leading-tight mb-3 group-hover:text-rust transition-colors duration-300">
                {post.title}
              </h4>
              <p className="font-serif italic text-sm md:text-base text-ink/40 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          </ScrollRevealWrapper>
        ))}
      </div>
    </div>
  );
}
```

Per design doc: headed by `MORE INK` in technical text. Each card: category in technical text, title in Cormorant display with rust hover, excerpt truncated to two lines in serif italic. No images, no dates. 3 columns on desktop, stack on mobile.

**Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: PASS

**Step 3: Commit**

```bash
git add components/blog/detail/MoreInk.tsx
git commit -m "feat(blog): add MoreInk related posts component"
```

---

## Task 10: Create Blog Detail Page — Hero + Body + Footer

This is the main page component. It pulls everything together.

**Files:**
- Create: `app/blog/[slug]/page.tsx`

**Step 1: Create the page with generateStaticParams, generateMetadata, and full layout**

Reference `app/work/[slug]/page.tsx` for the params pattern.

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/data/blog-posts';
import MoreInk from '@/components/blog/detail/MoreInk';
import Prose from '@/components/blog/detail/Prose';

// --- Static generation ---

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} — Protagonist Ink`,
    description: post.excerpt,
  };
}

// --- Related posts logic ---

function getRelatedPosts(currentSlug: string, category: string) {
  const others = BLOG_POSTS.filter((p) => p.slug !== currentSlug);
  const sameCategory = others.filter((p) => p.category === category);
  const different = others.filter((p) => p.category !== category);
  return [...sameCategory, ...different].slice(0, 3);
}

// --- Page ---

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug, post.category);

  return (
    <main className="min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[50vh] md:min-h-[55vh] bg-trueblack texture-grain flex flex-col justify-end pb-16 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 w-full">
          {/* Breadcrumb */}
          <nav className="mb-8 md:mb-10">
            <span className="text-technical text-[10px] tracking-[0.2em]">
              <Link
                href="/blog"
                className="text-warmwhite/40 hover:text-rust transition-colors duration-300"
              >
                Journal
              </Link>
              <span className="text-warmwhite/20 mx-2">/</span>
              <span className="text-warmwhite/40">{post.category}</span>
            </span>
          </nav>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6 md:mb-8">
            <span className="text-technical text-[10px] tracking-[0.2em] text-warmwhite/50 border border-warmwhite/20 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-technical text-[10px] tracking-[0.2em] text-warmwhite/30">
              {post.publishedAt}
            </span>
            <span className="text-warmwhite/20">·</span>
            <span className="text-technical text-[10px] tracking-[0.2em] text-warmwhite/30">
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-warmwhite leading-[0.95] tracking-tight mb-6 md:mb-8 max-w-5xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="font-serif italic text-xl md:text-2xl text-warmwhite/60 max-w-3xl leading-relaxed">
            {post.excerpt}
          </p>

          {/* Rust accent rule */}
          <div className="mt-10 md:mt-12 w-10 md:w-14 h-px bg-rust" />
        </div>
      </section>

      {/* ═══ BODY ═══ */}
      <section className="relative z-20 -mt-8 md:-mt-12 bg-[#FAFAFA] texture-paper rounded-t-[2rem] md:rounded-t-[2.5rem] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] pb-20 md:pb-32">
        {/* Post image (breakout width) */}
        {post.mainImage && (
          <div className="max-w-[960px] mx-auto px-6 md:px-10 pt-12 md:pt-16">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-ink/[0.06]">
              <Image
                src={post.mainImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 960px"
              />
            </div>
          </div>
        )}

        {/* Body content */}
        <div className="pt-12 md:pt-16">
          {post.body || (
            <Prose>
              <p className="text-ink/40 italic">
                Full article content coming soon.
              </p>
            </Prose>
          )}
        </div>

        {/* ═══ POST FOOTER ═══ */}

        {/* Sign-off */}
        <div className="max-w-[680px] mx-auto px-6 md:px-10 pt-16 md:pt-24">
          <div className="w-10 h-px bg-rust mb-6" />
          <p className="text-technical text-[11px] tracking-[0.15em] text-ink/30">
            Written by Protagonist Ink
          </p>
          <p className="text-technical text-[11px] tracking-[0.15em] text-ink/20 mt-1">
            {post.publishedAt}
          </p>
        </div>

        {/* More Ink */}
        <MoreInk posts={relatedPosts} />

        {/* Back link */}
        <div className="text-center pt-10 md:pt-14 pb-4">
          <Link
            href="/blog"
            className="text-technical text-[11px] tracking-[0.2em] text-rust hover:text-ink transition-colors duration-300"
          >
            Back to The Ink →
          </Link>
        </div>
      </section>
    </main>
  );
}
```

**Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: PASS

**Step 3: Verify page renders in dev server**

Start dev server. Navigate to `http://localhost:3000/blog/architecture-of-narrative`. Should see:
- Dark hero with breadcrumb, meta, title, excerpt, rust rule
- Paper body overlap with post image (picsum) and placeholder body text
- Sign-off, "More Ink" with 3 related posts, "Back to The Ink" link
- Navbar starts transparent with light text, transitions on scroll

**Step 4: Commit**

```bash
git add app/blog/[slug]/page.tsx
git commit -m "feat(blog): add blog detail page with hero, body, and footer"
```

---

## Task 11: Add Full Mock Body Content for Post 1

Create rich editorial body content for "The Architecture of a Narrative" that exercises the full component library: drop cap, pull quote, section dividers, full-bleed image.

**Files:**
- Rename: `data/blog-posts.ts` → `data/blog-posts.tsx` (to support JSX)
- Modify: `data/blog-posts.tsx` — add body content for post 1
- Update: Any files that import from `data/blog-posts` (check for `.ts` extension references)

**Step 1: Rename the data file to `.tsx`**

```bash
git mv data/blog-posts.ts data/blog-posts.tsx
```

**Step 2: Add imports and body content for post 1**

At the top of `data/blog-posts.tsx`, add imports:

```tsx
import Prose from '@/components/blog/detail/Prose';
import PullQuote from '@/components/blog/detail/PullQuote';
import FullBleedImage from '@/components/blog/detail/FullBleedImage';
import SectionDivider from '@/components/blog/detail/SectionDivider';
```

Then add a `body` field to post 1 (`architecture-of-narrative`). Write ~1000 words of editorial content about narrative architecture. The body should be a JSX fragment using the component library:

```tsx
body: (
  <>
    <Prose>
      <p className="drop-cap">
        There is a moment in every building's life when it stops being a
        collection of materials and starts being a structure. Steel becomes
        skeleton. Glass becomes skin. Concrete becomes the quiet confidence
        that holds everything aloft. The same phase transition happens in
        storytelling — and most brands miss it entirely.
      </p>
      <p>
        We talk about brand narratives as though they are decorative. A coat
        of paint. A tagline bolted on at the last minute. But narrative is
        load-bearing. It is the invisible framework that determines whether a
        brand can support a single product or an entire portfolio, whether it
        can survive a market correction or collapse at the first sign of
        pressure.
      </p>
    </Prose>

    <PullQuote text="Narrative is load-bearing. It determines whether a brand can survive a market correction or collapse at the first sign of pressure." />

    <Prose>
      <p>
        Consider the difference between a house and a cathedral. Both provide
        shelter. Both have walls and roofs. But a cathedral tells you
        something the moment you step inside: you are small, and the thing
        you have entered is vast. That feeling is not an accident. It is
        engineered through proportion, light, and the deliberate arrangement
        of negative space.
      </p>
      <p>
        The brands that endure — the ones we study decades later — have
        cathedral architecture. They do not merely shelter a product. They
        create an experience of scale that makes the customer feel they have
        entered something larger than a transaction.
      </p>
    </Prose>

    <SectionDivider variant="marker" marker="§" />

    <Prose>
      <p>
        Structural engineering has a concept called the moment of inertia: a
        measure of an object's resistance to bending. The higher the moment,
        the more force required to deform the structure. Brand narratives
        have their own moment of inertia. A well-constructed story resists
        distortion. It holds its shape under competitive pressure, under
        changing consumer sentiment, under the relentless entropy of a
        market that forgets everything within eighteen months.
      </p>
      <p>
        The secret is redundancy — not in the pejorative sense, but in the
        engineering sense. A good structure has multiple load paths. If one
        element fails, the forces redistribute through the remaining
        framework. Similarly, a resilient brand narrative does not depend on
        a single message. It has layers: a founding myth, a set of
        principles, a visual language, a tone that persists even when
        specific campaigns expire.
      </p>
    </Prose>

    <FullBleedImage
      src="https://picsum.photos/seed/blueprint/1920/1080"
      alt="Architectural blueprint detail"
      caption="The blueprint phase: where story meets structure"
    />

    <Prose>
      <p>
        We begin every engagement at Protagonist Ink with what we call the
        structural audit. Before we write a single headline, before we
        choose a typeface or a color palette, we map the load paths. Where
        does meaning enter the system? Where does it accumulate? Where are
        the stress concentrations — the points where a single failure could
        bring the whole narrative down?
      </p>
      <p>
        Most of the time, the answer is uncomfortable. The load paths run
        through the founder's personal story, and the founder has never
        articulated it. Or the brand has accumulated contradictory messages
        over the years, and the structure is riddled with micro-fractures
        that no one has bothered to inspect.
      </p>
    </Prose>

    <SectionDivider variant="rule" />

    <Prose>
      <p>
        There is nothing romantic about structural work. It is painstaking.
        It requires patience with ambiguity and a willingness to sit with
        incomplete information. But the reward is a narrative that does not
        merely communicate — it supports. It carries weight. It lets the
        brand build upward with confidence, knowing the foundation can hold
        whatever comes next.
      </p>
      <p>
        Architecture is not what a building looks like. Architecture is what
        a building does. The same is true of narrative. The question is never
        "does this story sound good?" The question is: "can this story bear
        the load?"
      </p>
    </Prose>
  </>
),
```

**Step 3: Verify types compile and page renders**

Run: `npx tsc --noEmit`
Expected: PASS

Navigate to `http://localhost:3000/blog/architecture-of-narrative`. Should see:
- Drop cap on opening paragraph
- Body text in narrow column (680px)
- Pull quote at breakout width (960px) with rust rule above
- Section dividers (marker and rule variants)
- Full-bleed image at breakout width with caption
- Proper typography: Satoshi body, Cormorant display quotes

**Step 4: Commit**

```bash
git add data/blog-posts.tsx
git commit -m "feat(blog): add full mock body content for 'Architecture of a Narrative'"
```

Note: If `git mv` doesn't work cleanly because the file was previously untracked, just rename manually and `git add` the new file. Also verify that imports in other files (`app/blog/page.tsx`, `components/blog/CinematicFeatured.tsx`, `components/blog/PostRow.tsx`, `components/blog/BlogFeed.tsx`) resolve correctly — Next.js/TypeScript path aliases (`@/data/blog-posts`) resolve without extension, so the rename from `.ts` to `.tsx` should be transparent.

---

## Task 12: Add Placeholder Bodies for Remaining Posts

**Files:**
- Modify: `data/blog-posts.tsx`

**Step 1: Add short placeholder bodies to posts 2–6**

For each remaining post, add a `body` field with a brief placeholder using the Prose wrapper and one or two paragraphs of thematically appropriate text. Example for post 2 ("Shadows in the System"):

```tsx
body: (
  <>
    <Prose>
      <p className="drop-cap">
        Every system has shadows — the unexamined assumptions, the inherited
        biases, the invisible forces that shape outcomes without anyone
        noticing. In brand work, these shadows are the gap between what a
        company says and what a customer feels.
      </p>
      <p>
        Identifying them requires a different kind of attention. Not the
        sharp focus of a strategist hunting for competitive advantage, but
        the peripheral vision of someone willing to notice what everyone
        else has learned to ignore.
      </p>
    </Prose>
  </>
),
```

Write similar 2-paragraph bodies for posts 3–6, each ~100 words, thematically matched to the post title and excerpt. Only import `Prose` — no need for pull quotes or images in placeholder bodies.

**Step 2: Verify all pages render**

Navigate through each post URL in the dev server:
- `/blog/shadows-in-the-system`
- `/blog/precision-over-persuasion`
- `/blog/geometry-of-trust`
- `/blog/echoes-in-the-void`
- `/blog/calculated-risks`

Each should render with the dark hero, paper body, drop cap, and placeholder content.

**Step 3: Commit**

```bash
git add data/blog-posts.tsx
git commit -m "feat(blog): add placeholder body content for all posts"
```

---

## Task 13: Visual QA and Polish

**Files:**
- Possibly modify: `app/blog/[slug]/page.tsx`, content block components, `app/globals.css`

**Step 1: Desktop QA (≥1024px)**

Check `http://localhost:3000/blog/architecture-of-narrative`:
- [ ] Navbar transparent with light text on dark hero, transitions to light bg on scroll
- [ ] Breadcrumb shows "Journal / Narrative Architecture" with rust hover on "Journal"
- [ ] Meta row: category pill + date + read time
- [ ] Title in Cormorant display, large, warmwhite
- [ ] Excerpt in serif italic, warmwhite/60
- [ ] Rust accent rule at bottom of hero
- [ ] Paper body overlaps dark hero with rounded top corners
- [ ] Post image at breakout width (960px) with rounded corners
- [ ] Drop cap on first paragraph — Cormorant, ~3 lines tall, floats left
- [ ] Body text: Satoshi, comfortable reading width (680px), good line height
- [ ] Pull quote at breakout width, centered, rust rule above, Cormorant italic
- [ ] Full-bleed image at breakout width with caption
- [ ] Section dividers properly spaced
- [ ] Sign-off: rust rule + "Written by Protagonist Ink" + date
- [ ] "More Ink" shows 3 related posts in horizontal row
- [ ] "Back to The Ink →" centered below
- [ ] Links in PostRow and CinematicFeatured on `/blog` correctly navigate to detail pages

**Step 2: Mobile QA (≤768px)**

Resize viewport or use device emulation:
- [ ] Hero stacks well, title readable at `text-4xl`
- [ ] Body text comfortable on small screen
- [ ] "More Ink" cards stack to single column
- [ ] Pull quotes readable at `text-2xl`
- [ ] Images fill available width with proper padding
- [ ] No horizontal overflow

**Step 3: Fix any issues found**

Apply minimal CSS/layout fixes. Common things to watch for:
- Drop cap may need tweaking (font-size, line-height, padding)
- Hero min-height may feel too tall/short on certain viewports
- Pull quote text might need max-width adjustment
- "More Ink" card spacing on tablet breakpoints

**Step 4: Verify post-without-image renders correctly**

Navigate to `/blog/shadows-in-the-system` (no mainImage). Hero should work without image, body should start directly with text (no image block).

**Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix(blog): visual QA polish for blog detail page"
```

---

## Summary

| Task | What | Key Files |
|------|------|-----------|
| 1 | Extend BlogPost type with readTime | `types/blog.ts`, `data/blog-posts.ts` |
| 2 | Navbar dark hero for detail pages | `components/Navbar.tsx` |
| 3 | Prose wrapper component | `components/blog/detail/Prose.tsx` |
| 4 | Drop cap CSS utility | `app/globals.css` |
| 5 | PullQuote component | `components/blog/detail/PullQuote.tsx` |
| 6 | FullBleedImage component | `components/blog/detail/FullBleedImage.tsx` |
| 7 | InlineFigure component | `components/blog/detail/InlineFigure.tsx` |
| 8 | SectionDivider component | `components/blog/detail/SectionDivider.tsx` |
| 9 | MoreInk related posts component | `components/blog/detail/MoreInk.tsx` |
| 10 | Blog detail page (hero + body + footer) | `app/blog/[slug]/page.tsx` |
| 11 | Full mock body for post 1 | `data/blog-posts.tsx` |
| 12 | Placeholder bodies for posts 2–6 | `data/blog-posts.tsx` |
| 13 | Visual QA and polish | Various |
