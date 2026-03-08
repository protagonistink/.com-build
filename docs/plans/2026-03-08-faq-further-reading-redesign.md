# FAQ & Further Reading Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the horizontal-scroll PostCredits and full-list BlogContinuation with a two-column FAQ grid and a curated 3-column article card grid, matching the Figma design while preserving the site's editorial design system.

**Architecture:** Rewrite `PostCredits.tsx` from a horizontal scroll strip to a static two-column Q/A grid. Create a new `SuggestedReading.tsx` component as a 3-column card grid (max 3 posts). Update the blog detail page to wire the new SuggestedReading in place of BlogContinuation. Existing components (PostRow, FaqAccordion, EditorialFooter) are untouched.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, next/image

---

## Design Analysis — Figma → Site Token Mapping

### Font Mapping
| Figma | Site Token | CSS |
|-------|-----------|-----|
| `font-playfair` | `font-display` | Cormorant Garamond |
| `font-source` | `font-sans` | Satoshi |
| `font-inter` (small labels) | `text-technical` class | Satoshi all-small-caps + 0.1em tracking |

### Color Mapping
| Figma | Site Token | Value |
|-------|-----------|-------|
| `#f9f7f2` | — | Keep as-is for these sections (warmer than #FAFAFA) |
| `#0a0a0a` | `trueblack` | #0a0a0a |
| `black/40` | `ink/40` | #2C2C2C at 40% |
| `black/70` | `ink/70` | #2C2C2C at 70% |
| `black/90` | `ink/90` | #2C2C2C at 90% |
| `black/10` | `ink/[0.10]` | dividers |
| `black/20` | `ink/[0.20]` | section header borders |

### Layout Constants
| Figma | Site |
|-------|------|
| `max-w-[1400px]` | Keep `max-w-[1400px]` (matches site's outer container in hero/footer) |
| Section padding: `px-6 md:px-12 lg:px-24` | Adapt to `px-6 md:px-10 lg:px-12` (site's standard) |

### Key Design Decisions
1. **Background**: Use `#f9f7f2` for both PostCredits and SuggestedReading sections to give them warmth distinct from the `#FAFAFA` article body — this is deliberate in the Figma.
2. **Keep Schema.org FAQPage markup** on PostCredits — the Figma doesn't show it but it's SEO-critical.
3. **Keep PI brand symbol** as the transition marker above PostCredits — more on-brand than the Figma's generic "End of Article" section.
4. **FaqItem data model stays as-is** (`{ question: string; answer: string }`). The Figma's split-line question styling and separate `answerTitle` are mockup-specific; we render the plain text fields with the new grid layout.
5. **SuggestedReading replaces BlogContinuation** — limited to 3 most recent posts rather than showing all posts.
6. **EditorialFooter stays untouched** — it's already well-designed and the Figma footer is conceptually similar.
7. **PostRow.tsx preserved** — it may be used elsewhere; we just stop importing it in the blog detail page flow.

---

## Task 1: Rewrite PostCredits Component (Two-Column FAQ Grid)

**Files:**
- Modify: `components/blog/detail/PostCredits.tsx`

**Step 1: Rewrite PostCredits.tsx**

Replace the entire file. The new component is a server-compatible component (remove `'use client'` — no scroll tracking needed anymore).

```tsx
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
```

**Step 2: Verify the component renders**

Run: Open `http://localhost:3000/blog/brand-messaging-narrative-debt` and scroll to the PostCredits section.
Expected: Two-column grid layout with numbered questions on the left, answers on the right, separated by a thin vertical divider on desktop.

**Step 3: Commit**

```bash
git add components/blog/detail/PostCredits.tsx
git commit -m "feat: rewrite PostCredits to two-column FAQ grid layout"
```

---

## Task 2: Create SuggestedReading Component (3-Column Card Grid)

**Files:**
- Create: `components/blog/detail/SuggestedReading.tsx`

**Step 1: Create SuggestedReading.tsx**

```tsx
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

interface SuggestedReadingProps {
  posts: BlogPost[];
}

export default function SuggestedReading({ posts }: SuggestedReadingProps) {
  const displayPosts = posts.slice(0, 3);
  if (displayPosts.length === 0) return null;

  return (
    <section className="bg-[#f9f7f2] pb-24 md:pb-32 px-6 md:px-10 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="border-t border-ink/[0.20] pt-6 mb-16 md:mb-24 flex justify-between items-start">
          <h2 className="text-technical text-[11px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-ink/90 font-semibold">
            MORE INK...
          </h2>
          <span className="text-technical text-[10px] tracking-widest text-ink/40 hidden md:block">
            INDEX 01–{String(displayPosts.length).padStart(2, '0')}
          </span>
        </div>

        {/* Article Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 md:gap-x-16 lg:gap-x-24">
          {displayPosts.map((post, i) => {
            const num = String(i + 1).padStart(2, '0');
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-8"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-ink/[0.06] overflow-hidden w-full">
                  {post.mainImage ? (
                    <>
                      <Image
                        src={post.mainImage}
                        alt={post.mainImageAlt || post.title}
                        fill
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        referrerPolicy="no-referrer"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10 mix-blend-multiply" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display italic text-ink/[0.08] text-[6rem] leading-none">
                        {num}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4">
                  <span className="text-technical text-[11px] tracking-widest text-ink/40">
                    {num}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl leading-snug text-ink group-hover:text-ink/70 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-ink/60 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify the file compiles**

Run: Check that the dev server doesn't show compilation errors.
Expected: Clean compilation.

**Step 3: Commit**

```bash
git add components/blog/detail/SuggestedReading.tsx
git commit -m "feat: add SuggestedReading 3-column card grid component"
```

---

## Task 3: Update Blog Detail Page Wiring

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

**Step 1: Update imports and replace BlogContinuation with SuggestedReading**

In `app/blog/[slug]/page.tsx`:

1. Replace import:
   ```
   // OLD
   import BlogContinuation from '@/components/blog/detail/BlogContinuation';
   // NEW
   import SuggestedReading from '@/components/blog/detail/SuggestedReading';
   ```

2. Move PostCredits OUTSIDE the body `<section>` so it gets its own background color (`#f9f7f2` instead of inheriting `#FAFAFA`). Currently PostCredits is inside the body section.

3. Replace the BlogContinuation usage with SuggestedReading.

The updated JSX return for the page component should be:

```tsx
return (
    <main className="min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[62vh] md:min-h-[70vh] bg-trueblack texture-grain flex flex-col justify-start pt-40 md:pt-48 lg:pt-52 pb-16 md:pb-20 overflow-hidden">
        {/* ... hero content unchanged ... */}
      </section>

      {/* ═══ BODY ═══ */}
      <section className="relative z-20 -mt-8 md:-mt-12 bg-[#FAFAFA] texture-paper rounded-t-[2rem] md:rounded-t-[2.5rem] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] pb-20 md:pb-32">
        {/* Body content */}
        <div className="pt-12 md:pt-16">
          {post.body ? (
            post.body
          ) : post.sanityBody && post.sanityBody.length > 0 ? (
            <SanityPortableText blocks={post.sanityBody} />
          ) : (
            <Prose>
              <p className="text-ink/40 italic">
                Full article content coming soon.
              </p>
            </Prose>
          )}
        </div>

        {/* Transition marker */}
        <div className="max-w-[960px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-8 md:pb-10">
          <div className="mx-auto w-fit flex items-center justify-center">
            <Image
              src="/images/brand/transparent_black_symbol.png"
              alt=""
              width={132}
              height={132}
              aria-hidden
              className="opacity-[0.18]"
            />
          </div>
        </div>
      </section>

      {/* ═══ POST CREDITS — FAQ ═══ */}
      {post.faqItems && post.faqItems.length > 0 && (
        <PostCredits items={post.faqItems} />
      )}

      {/* ═══ FURTHER READING ═══ */}
      <SuggestedReading posts={cataloguePosts} />

      {/* Editorial footer — newsletter, Story Teardown, PI mark */}
      <EditorialFooter />
    </main>
  );
```

Key changes:
- PostCredits moved outside the body `<section>` so it gets its own `bg-[#f9f7f2]` background
- `BlogContinuation` replaced with `SuggestedReading`
- Body section no longer contains PostCredits — it ends with the transition marker

**Step 2: Remove unused import**

Ensure `BlogContinuation` import is removed. The file still exists but is no longer used on this page.

**Step 3: Verify the page renders correctly**

Run: Open `http://localhost:3000/blog/brand-messaging-narrative-debt` and verify:
- Article body ends with the PI brand symbol
- PostCredits shows (if faqItems exist) with the new two-column grid on warm paper background
- SuggestedReading shows 3 article cards in a grid on warm paper background
- EditorialFooter renders normally below

Expected: Clean visual flow from article → PI symbol → FAQ grid → 3-column cards → dark footer.

**Step 4: Commit**

```bash
git add app/blog/[slug]/page.tsx
git commit -m "feat: wire SuggestedReading and restructure PostCredits placement"
```

---

## Task 4: Visual Polish & Responsive Verification

**Files:**
- Possibly tweak: `components/blog/detail/PostCredits.tsx`
- Possibly tweak: `components/blog/detail/SuggestedReading.tsx`

**Step 1: Desktop verification**

Open `http://localhost:3000/blog/brand-messaging-narrative-debt` at full desktop width (1280px+).

Check:
- [ ] Section headers align: left label + right subtitle
- [ ] FAQ grid: question left, divider visible, answer right
- [ ] Article cards: 3 columns with tall portrait images
- [ ] Hover on cards: image scales subtly, text color fades
- [ ] Spacing between sections feels balanced
- [ ] Warm paper background (#f9f7f2) is visible and distinct from article body (#FAFAFA)

**Step 2: Tablet verification (768px)**

Resize to 768px and check:
- [ ] FAQ grid collapses gracefully (still two-column with tighter gaps, or stacks on small tablets)
- [ ] Article cards: 2 columns on sm breakpoint
- [ ] Section headers still readable

**Step 3: Mobile verification (375px)**

Resize to 375px and check:
- [ ] FAQ items stack vertically (question above, answer below)
- [ ] Vertical divider hidden on mobile
- [ ] Article cards: single column
- [ ] Images maintain 4:5 aspect ratio
- [ ] All text readable, no overflow

**Step 4: Fix any issues found**

Make targeted adjustments to spacing, typography, or responsive breakpoints as needed.

**Step 5: Commit**

```bash
git add -A
git commit -m "fix: polish responsive layout for FAQ and Further Reading sections"
```

---

## Task 5: Handle Edge Case — No FAQ Items

**Files:**
- Verify: `app/blog/[slug]/page.tsx`

**Step 1: Verify posts without FAQ items**

Navigate to a blog post that does NOT have `faqItems` (most posts won't).

Check:
- [ ] No PostCredits section renders
- [ ] Article body → PI symbol → SuggestedReading → EditorialFooter flows cleanly
- [ ] No visual gap or orphaned background color where PostCredits would be

If the warm paper background (#f9f7f2) creates a visual discontinuity when PostCredits is absent (article body is #FAFAFA, then SuggestedReading jumps to #f9f7f2), consider wrapping both PostCredits and SuggestedReading in a shared container that provides the warm background. This avoids an abrupt color shift.

**Potential fix if needed:**

In `page.tsx`, wrap both in a container div:

```tsx
{/* ═══ POST-ARTICLE SECTIONS ═══ */}
<div className="bg-[#f9f7f2]">
  {post.faqItems && post.faqItems.length > 0 && (
    <PostCredits items={post.faqItems} />
  )}
  <SuggestedReading posts={cataloguePosts} />
</div>
```

And remove the `bg-[#f9f7f2]` from PostCredits and SuggestedReading components (they inherit from parent). Add top padding to SuggestedReading when PostCredits is absent.

**Step 2: Commit if changes were needed**

```bash
git add app/blog/[slug]/page.tsx components/blog/detail/PostCredits.tsx components/blog/detail/SuggestedReading.tsx
git commit -m "fix: handle missing FAQ items edge case gracefully"
```

---

## Summary of Changes

| File | Action | Description |
|------|--------|-------------|
| `components/blog/detail/PostCredits.tsx` | **Rewrite** | Horizontal scroll → two-column FAQ grid |
| `components/blog/detail/SuggestedReading.tsx` | **Create** | New 3-column article card grid |
| `app/blog/[slug]/page.tsx` | **Modify** | Wire SuggestedReading, move PostCredits outside body section |

### Untouched Files
| File | Reason |
|------|--------|
| `components/blog/PostRow.tsx` | Preserved — may be used elsewhere |
| `components/blog/detail/BlogContinuation.tsx` | Preserved — no longer imported on this page but kept |
| `components/blog/detail/FaqAccordion.tsx` | Not relevant to this redesign |
| `components/blog/detail/EditorialFooter.tsx` | Already well-designed, no changes needed |
| `types/blog.ts` | FaqItem type unchanged |
| `sanity/schemaTypes/post.ts` | Schema unchanged |
