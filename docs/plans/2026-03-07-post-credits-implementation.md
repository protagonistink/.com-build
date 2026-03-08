# POST-CREDITS FAQ Component Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the `FaqAccordion` component with a cinematic horizontal-scroll `PostCredits` component where FAQ items are presented as ghost-text panels — oversized question as atmospheric texture, readable answer in the foreground.

**Architecture:** New `PostCredits` client component renders a horizontal scroll-snap strip. Each panel has an `aria-hidden` ghost question layer (decorative) and a foreground question + answer. A `useEffect` scroll listener drives a thin progress bar. FAQ schema is applied via `<meta>` tags so it's DOM-present without doubling visible text. The old `FaqAccordion` file is left in place but no longer imported.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4. No new dependencies.

---

### Task 1: Create the PostCredits component

**Files:**
- Create: `components/blog/detail/PostCredits.tsx`

**Step 1: Create the file with this exact code**

```tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import type { FaqItem } from '@/types/blog';

interface PostCreditsProps {
  items: FaqItem[];
}

export default function PostCredits({ items }: PostCreditsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      requestAnimationFrame(() => {
        setProgress(el.scrollLeft / maxScroll);
      });
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="max-w-[1180px] mx-auto px-6 md:px-10 pt-16"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {/* Section header */}
      <p className="text-technical text-[11px] tracking-[0.24em] text-rust/70 mb-3">
        POST-CREDITS
      </p>
      <div className="w-10 h-px bg-rust/60 mb-8" />

      {/* Scroll strip */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-scroll overflow-y-hidden h-[320px] [scroll-snap-type:x_mandatory] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <article
            key={i}
            className="relative flex-shrink-0 w-[82vw] md:w-[80%] md:max-w-[900px] overflow-hidden [scroll-snap-align:start]"
            itemScope
            itemType="https://schema.org/Question"
          >
            {/* Ghost layer — decorative only */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center p-6 pointer-events-none select-none overflow-hidden"
            >
              <span className="font-display italic text-ink opacity-[0.04] leading-[0.9] tracking-tight text-[clamp(72px,10vw,116px)]">
                {item.question}
              </span>
            </div>

            {/* Foreground */}
            <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-10">
              <meta itemProp="name" content={item.question} />

              <p className="font-serif italic text-[1rem] md:text-[1.05rem] text-ink/55 mb-4 max-w-[42ch]">
                {item.question}
              </p>

              <div itemScope itemType="https://schema.org/Answer">
                <meta itemProp="text" content={item.answer} />
                <p className="font-serif text-[1.05rem] md:text-[1.15rem] text-ink/80 leading-relaxed md:leading-[1.8] max-w-[48ch]">
                  {item.answer}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-5 h-px w-full bg-rust/15">
        <div
          className="h-full bg-rust/50"
          style={{ width: `${progress * 100}%`, transition: 'none' }}
        />
      </div>
    </section>
  );
}
```

**Step 2: Verify the file was saved**

Check that `components/blog/detail/PostCredits.tsx` exists and has no TypeScript errors:
```bash
npx tsc --noEmit
```
Expected: no errors relating to PostCredits.

---

### Task 2: Wire PostCredits into the blog post page

**Files:**
- Modify: `app/blog/[slug]/page.tsx` (lines 5 and 143–145)

**Step 1: Swap the import**

In `app/blog/[slug]/page.tsx`, change:
```tsx
import FaqAccordion from '@/components/blog/detail/FaqAccordion';
```
to:
```tsx
import PostCredits from '@/components/blog/detail/PostCredits';
```

**Step 2: Swap the usage**

Find this block (around line 143):
```tsx
{post.faqItems && post.faqItems.length > 0 && (
  <FaqAccordion items={post.faqItems} />
)}
```

Replace with:
```tsx
{post.faqItems && post.faqItems.length > 0 && (
  <PostCredits items={post.faqItems} />
)}
```

**Step 3: Verify TypeScript still passes**

```bash
npx tsc --noEmit
```
Expected: no errors.

---

### Task 3: Visual verification

**Step 1: Start the dev server**

```bash
npm run dev
```

Navigate to a blog post that has FAQ items. The brand-messaging-narrative-debt post has them:
`http://localhost:3000/blog/brand-messaging-narrative-debt`

**Step 2: Scroll to the bottom of the post and verify**

Checklist:
- [ ] `POST-CREDITS` label appears in small tracked rust caps
- [ ] 40px rust rule appears beneath the label
- [ ] Scroll strip is visible at ~320px height
- [ ] First panel shows ghost question text at very low opacity (barely visible)
- [ ] Foreground shows the question in small italic Cormorant
- [ ] Foreground shows the answer in regular Cormorant beneath
- [ ] A peek of the next panel is visible on the right edge
- [ ] Scrolling horizontally advances to the next panel (snap behavior)
- [ ] Progress bar beneath fills as you scroll right
- [ ] No scrollbar visible

**Step 3: Check mobile**

Resize browser to 375px wide (or use DevTools mobile emulation).

Checklist:
- [ ] Panels are full-width (no peek needed)
- [ ] Ghost text is smaller but still atmospheric
- [ ] Answer text is readable
- [ ] Horizontal swipe advances panels

**Step 4: Check schema in DOM**

Open DevTools → Elements. Search for `schema.org/FAQPage`.
- [ ] `<section itemscope itemtype="https://schema.org/FAQPage">` is present
- [ ] Each panel has `itemtype="https://schema.org/Question"`
- [ ] `<meta itemprop="name">` with question text is present inside each panel
- [ ] `<meta itemprop="text">` with answer text is present inside each panel

**Step 5: Verify ghost layer is aria-hidden**

In DevTools, confirm the ghost `<div>` has `aria-hidden="true"`. Screen readers should only encounter the foreground question + answer.

---

### Task 4: Adjust ghost opacity and sizing if needed

During visual review, the ghost text opacity or size may need tweaking. Reference values to try:

| Property | Conservative | Design target | Bold |
|---|---|---|---|
| Ghost opacity | `opacity-[0.03]` | `opacity-[0.04]` | `opacity-[0.055]` |
| Ghost size (clamp min) | `60px` | `72px` | `80px` |
| Ghost size (clamp max) | `100px` | `116px` | `130px` |

The ghost text should be felt, not read. If you can clearly read it at a glance, reduce opacity. If you can barely detect it at all, increase slightly.

---

### Task 5: Commit

```bash
git add components/blog/detail/PostCredits.tsx app/blog/[slug]/page.tsx
git commit -m "Replace FAQ accordion with POST-CREDITS horizontal ghost panel component"
```

---

## Notes

**FaqAccordion.tsx** is not deleted — just no longer imported. Leave it in place until the new component is confirmed on staging.

**FAQ copy:** Questions in Sanity should be rewritten in conversational reader voice. Examples:
- ❌ "What is narrative debt in branding?"
- ✅ "So wait — the copy isn't actually the problem?"

This is a content task separate from the component build. The component renders whatever strings are in `item.question` / `item.answer`.

**Tailwind v4 note:** The arbitrary variants `[scroll-snap-type:x_mandatory]`, `[scroll-snap-align:start]`, and `[&::-webkit-scrollbar]:hidden` are all valid Tailwind v4 syntax. If any generate warnings, the equivalent CSS can be moved to a `@utility` block in `globals.css`.
