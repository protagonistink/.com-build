# Blog Index Redesign: "The Darkroom"

**Date:** 2026-02-28
**Status:** Approved

## Problem

The current blog index page has too many dark interstitial breaks (PullQuoteInterstitial + BlogCTA back-to-back), post titles feel undersized relative to the brand's editorial voice, images are treated as B&W/grayscale accents rather than cinematic moments, and there's no category navigation despite the blog being the primary content hub.

## Direction

**Approach A: "The Darkroom"** — Clean paper rows that transform on scroll. When a post with an image enters the viewport, its full-color image fades in as the row's background, text inverts from ink to white. The effect is cinematic without requiring persistent dark sections.

## Post Row Redesign

### Typography
- Title: `font-display text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight`
- Brutalist weight, tighter leading than current
- Category/date metadata stays small: `text-technical text-[11px] tracking-[0.2em] uppercase`

### Scroll-Triggered Image Takeover
- PostRow becomes `'use client'` with `useRef` + `useEffect` + `IntersectionObserver`
- Trigger: ~40% of the row visible in viewport (`threshold: 0.4`)
- Image renders as `position: absolute; inset: 0` background via `next/image` with `fill` + `object-cover`
- Color image (not grayscale) at ~80% opacity
- Gradient overlay: `bg-gradient-to-r from-black/60 via-black/40 to-transparent`
- Text transitions: `text-ink → text-warmwhite` via CSS transition (~500ms ease)
- Rows without images remain clean paper — no transformation

### Removed Effects
- Kill ambient image wash (blur ghost-in)
- Kill image peek (w-0 → w-[110px] on hover)
- Keep rust accent line on hover

## Category Filter Bar

### Position
Between CinematicFeatured and the post feed. Sticky under the navbar on scroll.

### Categories (4 + All)
1. All (default)
2. Narrative Architecture
3. Founder Psychology
4. AI & Human Craft
5. Field Notes

*Note: Case Studies excluded — they have their own dedicated page.*

### Styling
- `text-technical text-[11px] tracking-[0.2em] uppercase`
- Unselected: `text-ink/40 border border-ink/10 bg-transparent`
- Selected: `text-warmwhite bg-ink`
- Hover: `text-rust border-rust/40`
- Mobile: horizontally scrollable row, no wrapping

### Behavior
- Client-side filtering via React state
- Posts animate out with opacity + height collapse (~300ms)
- No URL routing — purely visual filter

## Page Assembly

```
BlogHero
  → CinematicFeatured (first post)
  → CategoryFilterBar (sticky)
  → PostFeed (remaining posts, filtered by category)
  → FooterCTA (light paper treatment)
```

### Removed Components
- **PullQuoteInterstitial** — eliminated (too many dark breaks)
- **FilmStrip** — eliminated (decorative clutter)
- **BlogCTA (dark mid-feed)** — replaced with light FooterCTA at bottom

### Kept Unchanged
- **BlogHero** — dark masthead, working well
- **CinematicFeatured** — full-bleed featured post, no negative feedback

## Data Updates

Update `blog-posts.ts` categories from placeholder names to the 4 real categories. Ensure at least 2-3 posts have `mainImage` set to trigger the darkroom effect.

## Technical Notes

- `PostRow` and `CategoryFilterBar` are `'use client'` components
- IntersectionObserver cleanup in useEffect return
- `next/image` remotePatterns already includes picsum.photos
- Sanity CMS has 8 categories — will need trimming to match these 4 when CMS integration happens
