# Blog Detail Page Design

**Date:** 2026-02-28
**Status:** Approved

## Summary

A magazine-style blog detail page for ~1000-word long-form editorial posts. Type-forward dark hero (no background image), paper body with a narrow reading column and breakout elements, and a component library for rich editorial content. Mock content now, Sanity Portable Text later.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Hero style | Type-forward, image-optional | Works consistently with or without a post image; lets the writing lead |
| Page architecture | Dark hero → paper body with rounded overlap | Matches work detail pages; cinematic presence throughout the site |
| Reading column | Narrow (680px) with breakouts (960px) | Classic editorial width for prose; breakouts add visual rhythm |
| Content blocks | Modular component library | Mix and match per post; maps cleanly to Sanity Portable Text custom types |
| Post navigation | "More Ink" — 3 related cards | Bounded, typographic, gives reader enough context (excerpt) to choose |
| Margin notes | Deferred to later pass | Fanciest component; can add once core layout is proven |

## Section 1: Hero

Dark section. `min-h-[50vh] md:min-h-[55vh]`. Background `trueblack` with `texture-grain`.

**Layout (top to bottom):**

1. **Breadcrumb** — `Journal / Category Name` in technical text (`text-[10px] tracking-[0.2em]`), rust hover on each segment
2. **Meta row** — category pill + publish date + estimated read time (e.g. "5 min read"), same style as CinematicFeatured metadata
3. **Title** — Cormorant display, `text-4xl md:text-6xl lg:text-7xl`, font-light, `text-warmwhite`. No text-shadow (no image behind it)
4. **Excerpt** — one to two sentences, serif italic, `text-xl md:text-2xl`, `text-warmwhite/60`
5. **Rust accent rule** — thin horizontal line at bottom edge, 40–60px wide

Navbar: starts transparent with light text, transitions to light background on scroll (existing behavior for dark hero pages).

**No image in the hero.** When a post has a `mainImage`, it appears as the first breakout figure in the body.

## Section 2: Body Container

Paper body rises over the dark hero.

- `-mt-8 md:-mt-12` negative margin overlap
- `bg-[#FAFAFA]` with `texture-paper`
- `rounded-t-[2rem] md:rounded-t-[2.5rem]`
- Subtle shadow beneath for depth

**Column system:**

| Column | Width | Use |
|--------|-------|-----|
| Narrow (prose) | `max-w-[680px] mx-auto` | Body text, inline figures |
| Breakout | `max-w-[960px] mx-auto` | Pull quotes, large images, "More Ink" grid |
| Full container | `max-w-[1400px]` with standard padding | Full-bleed photography (rare) |

**Body text:** Satoshi, `text-base md:text-lg`, `leading-relaxed md:leading-[1.8]`, `text-ink/80`. Paragraphs spaced `space-y-6 md:space-y-8`.

**Post image (when present):** First element in the body, breakout width, `aspect-[16/9] rounded-lg`, with optional caption. Creates a "chapter opens with a photograph" feel before prose begins.

## Section 3: Content Block Components

Modular blocks that can be mixed per post. Each maps to a Sanity Portable Text custom block type in the future.

### Drop Cap

First paragraph only. Opening letter scales to ~3 lines tall, Cormorant display, `float-left`, ink color, slight right margin. CSS utility on the first `<p>` — no extra markup.

### Pull Quote

Breakout width (~960px). Centered.

- Thin rust rule above (40px wide)
- Large Cormorant italic, `text-2xl md:text-3xl`, `text-ink/50`
- No quotation marks — scale and style do the work
- Generous vertical padding: `py-12 md:py-16`

### Full-Bleed Image

Breakout width or full container width.

- `aspect-[16/9]` with `rounded-lg`
- Subtle border: `border border-ink/[0.06]`
- Optional caption: technical text, right-aligned, low opacity

### Inline Figure

Stays within the narrow column (680px).

- Smaller images, diagrams, screenshots
- Same caption treatment as full-bleed
- `aspect-[4/3]` or natural aspect ratio

### Section Divider

Three variants:

- **Rule** — `h-px bg-ink/10` with generous vertical margin
- **Marker** — centered section number or `§` in technical text, very low opacity
- **Space** — extra vertical padding only, no visible element

### Margin Note (deferred)

Desktop only: small annotation floats outside narrow column into the right gutter. Technical text, `text-[11px]`, `text-ink/30`. On mobile: collapses inline as a subtle callout box. **Deferred to a later pass.**

## Section 4: Post Footer

After body content ends, still within the paper body.

### Sign-off

- Thin rust rule (40px)
- "Written by Protagonist Ink" in technical text
- Publish date repeated

No author bio card — single-author studio.

### "More Ink" — Related Posts

Three cards at breakout width (~960px), horizontal row.

Headed by: `MORE INK` in technical text (`text-[10px] tracking-[0.25em] text-ink/25`).

Each card:

- Category in technical text (low opacity)
- Title in Cormorant display, `text-xl md:text-2xl`, ink color, rust on hover
- Excerpt truncated to two lines, serif italic, `text-ink/40`
- No images, no dates

**Selection logic:** Same category first (exclude current post), pad with most recent posts from other categories if needed. Always 3 cards.

**Responsive:** 3 columns on desktop, stack to 1 column on mobile.

### Back Link

Centered below "More Ink": `Back to The Ink →` in technical text, rust color. Links to `/blog`.

## Section 5: Data & Routing

**Route:** `app/blog/[slug]/page.tsx` — server component.

**BlogPost type extension:**

```typescript
// Add to existing BlogPost interface
body: React.ReactNode;   // Hardcoded JSX for now, Portable Text later
readTime: string;        // e.g. "5 min read"
```

**Mock content:** One or two posts get fully fleshed-out bodies exercising the full component library (drop cap, pull quote, full-bleed image, section dividers). Remaining posts get shorter placeholder bodies.

**Related posts:** Computed at render time from the full posts array. Same category first, exclude current, pad with recent, cap at 3.

**Metadata:** `generateMetadata` from the post's title and excerpt.

## Visual Reference

```
┌─────────────────────────────────────────────┐
│  NAVBAR (transparent, light text)            │
│                                              │
│  Journal / Narrative Architecture            │
│                                              │
│  NARRATIVE ARCHITECTURE · Feb 28 · 5 min     │
│                                              │
│  The Architecture                            │
│  of a Narrative                              │
│                                              │
│  How structural engineering principles       │
│  apply to storytelling in the modern age.    │
│                                              │
│  ────  (rust rule)                           │
│                                              │
├──────────── trueblack + grain ───────────────┤
│  ╭─────────────────────────────────────╮     │
│  │                                     │     │
│  │  [BREAKOUT: post image if present]  │     │
│  │                                     │     │
│  │  ┌─── 680px prose column ───┐       │     │
│  │  │                          │       │     │
│  │  │  T he opening paragraph  │       │     │
│  │  │  with drop cap and the   │       │     │
│  │  │  body text flowing...    │       │     │
│  │  │                          │       │     │
│  │  └──────────────────────────┘       │     │
│  │                                     │     │
│  │  ┌──── 960px breakout ─────┐        │     │
│  │  │   ──── (rust rule)      │        │     │
│  │  │   "Pull quote text in   │        │     │
│  │  │    large Cormorant"     │        │     │
│  │  └─────────────────────────┘        │     │
│  │                                     │     │
│  │  ┌─── 680px prose column ───┐       │     │
│  │  │  More body text...       │       │     │
│  │  └──────────────────────────┘       │     │
│  │                                     │     │
│  │  ──────────────────── (sign-off)    │     │
│  │  Written by Protagonist Ink         │     │
│  │                                     │     │
│  │  MORE INK                           │     │
│  │  ┌────────┐┌────────┐┌────────┐    │     │
│  │  │Category ││Category ││Category │   │     │
│  │  │Title    ││Title    ││Title    │   │     │
│  │  │Excerpt  ││Excerpt  ││Excerpt  │   │     │
│  │  └────────┘└────────┘└────────┘    │     │
│  │                                     │     │
│  │      Back to The Ink →              │     │
│  │                                     │     │
│  ╰─── warmwhite + paper texture ───────╯     │
├──────────────────────────────────────────────┤
│  SITE FOOTER                                 │
└──────────────────────────────────────────────┘
```
