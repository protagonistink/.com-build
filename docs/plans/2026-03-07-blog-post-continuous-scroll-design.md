# Blog Post — Continuous Scroll into The Ink
**Date:** 2026-03-07
**Status:** Approved

---

## Problem

The blog post detail page currently ends with `MoreInk` — a small card grid of 3 related posts — followed by a "Back to The Ink →" link. This treatment is undersized for the editorial ambition of the site, creates a dead-end feeling, and wastes the momentum a reader has built finishing an article. The footer renders on every blog post even though it has no relevant CTA at the post level.

---

## Solution: Continuous Scroll

Replace `MoreInk` and the back link with a full continuation of The Ink publication. The article is a chapter. Scrolling past it drops the reader into the broader catalogue — same PostRow format as the blog index, ending with a purpose-built editorial footer strip. No dead end. No back button.

---

## Page Flow (after change)

```
[Dark hero — existing]
[Paper article card — existing]
  ├── Article body
  ├── PI symbol transition marker
  └── POST-CREDITS horizontal FAQ scroll
[THE INK transition band — NEW]
[PostRow cascade — NEW]
[Editorial footer strip — NEW]
```

The paper `<section>` closes after POST-CREDITS. Everything below it is outside the card.

---

## Component Designs

### 1. THE INK Transition Band

- **Background:** `bg-trueblack` (same register as blog hero)
- **Height:** ~80px, `py-6 md:py-8`
- **Content:** `THE INK` in `text-technical text-[11px] tracking-[0.24em] text-warmwhite/50`, followed by a short `4px` rust rule beneath — same position as PostRow metadata column (`max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12`)
- **Purpose:** Scene cut. Names where the reader has arrived. No description, no navigation — purely editorial.

### 2. PostRow Cascade

- **Reuse:** `PostRow` component directly — zero new styling
- **Data:** All published posts except the current slug, sorted by `publishedAt` descending
- **Background:** `bg-[#FAFAFA]` (same as blog index PostRow section)
- **Wrapper:** `<section className="bg-[#FAFAFA]">` — mirrors blog index exactly

### 3. Editorial Footer Strip

- **Background:** `bg-trueblack texture-grain`
- **Layout:** Two columns on desktop (`grid-cols-2 gap-16`), stacked on mobile
- **Left column — Newsletter:**
  - Label: `DISPATCH` in `text-technical text-[11px] tracking-[0.24em] text-warmwhite/40`
  - Short line: `"The Ink, delivered."` in `font-serif italic text-warmwhite/60`
  - Email input: minimal, borderless bottom-border only, `bg-transparent text-warmwhite placeholder-warmwhite/30`
  - Submit: rust text button `"Subscribe →"`
- **Right column — Story Teardown CTA:**
  - Label: `STORY TEARDOWN` in `text-technical text-[11px] tracking-[0.24em] text-warmwhite/40`
  - Short line: `"Find out exactly where your story breaks."` in `font-serif italic text-warmwhite/60`
  - Link: `"protagonist.ink/story-teardown"` in rust, `text-technical text-[13px]`
- **Bottom:** PI symbol mark centered below both columns — `transparent_black_symbol.png` at ~64px, `opacity-[0.15]`, inverted to warmwhite via CSS `filter: invert(1)` — plus `© Protagonist Ink` year in `text-technical text-[10px] text-warmwhite/20`
- **Padding:** `pt-16 md:pt-20 pb-12 md:pb-16`

---

## File Changes

| File | Change |
|------|--------|
| `app/blog/[slug]/page.tsx` | Close paper section after PostCredits; add transition band, PostRow cascade, and footer strip below |
| `components/blog/detail/BlogContinuation.tsx` | New component — wraps transition band + PostRow cascade |
| `components/blog/detail/EditorialFooter.tsx` | New component — newsletter + Story Teardown + PI mark |
| `components/blog/detail/MoreInk.tsx` | Remove from page (component file left in place) |

---

## Data

`PostRow` already accepts a `BlogPost`. The page already fetches all posts via `getBlogPosts()` and computes `relatedPosts`. For the cascade, we replace the 3-post related logic with: all posts sorted by date, current slug excluded. No new data fetching needed.

---

## Newsletter Form

The newsletter input is UI-only in this implementation. No backend wired yet — `action` and `onSubmit` left as `TODO`. Form submits to `#` until a newsletter provider is connected. This is acceptable for launch.

---

## What's Removed

- `MoreInk` component usage in `page.tsx` (component file kept)
- "Back to The Ink →" back link
- Site-wide `<Footer />` on blog posts (if currently rendered via layout — verify)

---

## Not In Scope

- Newsletter backend integration
- Animation/scroll-triggered reveals on footer strip (can add later)
- Mobile-specific PostRow variations (existing component handles this)
