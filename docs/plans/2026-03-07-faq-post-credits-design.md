# FAQ Redesign: POST-CREDITS Component

**Date:** 2026-03-07
**Status:** Approved for implementation
**Replaces:** `FaqAccordion` component (dual-pane accordion)

---

## Problem

Both previous FAQ iterations were FAQ-shaped — they announced themselves as widgets (accordion, dual-pane, "FURTHER QUESTIONS" label) and pulled the reader out of the essay. The section needs to serve SEO/AEO without interrupting the reading experience or feeling like a tech-site help center.

## Solution: POST-CREDITS (B+C Hybrid)

A horizontal scroll-snap component where each FAQ item is a cinematic panel. The question appears as oversized ghost typography (texture/atmosphere); the answer is the foreground content you read. Named after the post-credits scene convention — bonus content for those who keep reading.

No accordion. No expand/collapse. No per-item labels. Fully rendered in DOM.

---

## Component: `PostCredits`

Replaces `FaqAccordion` in `app/blog/[slug]/page.tsx`. Accepts the same `FaqItem[]` prop.

---

## Design Specification

### Section Header

```
POST-CREDITS
────────────  (40px rust rule)
```

- Label: `text-technical`, 11px Satoshi, `tracking-[0.24em]`, `text-rust/70`
- Rule: `w-10 h-px bg-rust/60`
- Outer padding: `pt-16 pb-0`, `max-w-[1180px] mx-auto px-6 md:px-10`

### Scroll Container

- `overflow-x: scroll`, `overflow-y: hidden`
- `scroll-snap-type: x mandatory`
- `scrollbar-width: none` + `::-webkit-scrollbar { display: none }`
- Height: `h-[320px]`
- Inner track: `flex gap-4` or `gap-6`

### Each Panel

- Width: `w-[82vw] md:w-[min(900px,82%)]` — peek of next panel signals scrollability
- `scroll-snap-align: start`
- `flex-shrink-0`
- `relative overflow-hidden`
- Background: inherits paper (#FAFAFA) — no change

**Ghost layer (decorative):**
- `aria-hidden="true"`
- Absolute fill: `absolute inset-0`
- Cormorant italic, `~100-120px` (fluid: `text-[clamp(80px,10vw,120px)]`)
- `font-display italic`
- `text-ink opacity-[0.04]`
- `leading-none tracking-tight`
- Centered or slightly bottom-offset for visual balance
- Contains the same question text as the foreground — purely decorative

**Foreground content:**
- Positioned relative, `z-10`, padding `p-8 md:p-10`
- Layout: `flex flex-col justify-end h-full` (anchors content to bottom of panel)

Question:
- Italic Cormorant, `text-[1rem] md:text-[1.1rem]`
- `text-ink/55 italic font-serif`
- `mb-4 max-w-[42ch]`

Answer:
- Regular Cormorant, `text-[1.05rem] md:text-[1.15rem]`
- `text-ink/80 font-serif leading-relaxed`
- `max-w-[48ch]`

### Progress Indicator

A thin bar beneath the scroll container that fills left-to-right as the user scrolls through panels.

- Container: `mt-4 h-px w-full bg-rust/15`
- Fill: `h-full bg-rust/50`, width driven by JS scroll listener
- Updates on `scroll` event with `requestAnimationFrame`

### FAQ Schema (invisible)

Applied to the outer `<section>`:

```html
<section itemscope itemtype="https://schema.org/FAQPage">
  <div itemscope itemtype="https://schema.org/Question">
    <meta itemprop="name" content="[question text]" />
    <div itemscope itemtype="https://schema.org/Answer">
      <meta itemprop="text" content="[answer text]" />
    </div>
  </div>
</section>
```

Using `<meta>` tags means schema data is present in DOM without doubling visible text. The ghost layer is `aria-hidden`. Screen readers encounter only the foreground question + answer.

---

## Mobile Behavior

- Panels: `w-[100vw]` (full width, no peek needed — swipe affordance is natural)
- Ghost text: `text-[clamp(60px,15vw,80px)]`
- Padding reduced: `p-5`
- Progress bar stays

---

## Voice / Copy Guidance

Questions must be rewritten in conversational reader voice when entered in Sanity. They should sound like a real person asking mid-thought, not a search query.

| Avoid | Use instead |
|---|---|
| "What is narrative debt in branding?" | "So wait — the copy isn't actually the problem?" |
| "Can better copy fix brand messaging?" | "Can't I just rewrite the website and fix this?" |
| "How do I identify narrative debt?" | "How would I even know if I had this?" |

---

## Files to Change

| File | Change |
|---|---|
| `components/blog/detail/FaqAccordion.tsx` | Replace entirely with `PostCredits.tsx` |
| `app/blog/[slug]/page.tsx` | Import `PostCredits` instead of `FaqAccordion` |
| New: `components/blog/detail/PostCredits.tsx` | New component |

No Sanity schema changes. No type changes. `FaqItem[]` interface is unchanged.

---

## What Was Ruled Out

- **Standard animated editorial accordion** — already tried, still FAQ-shaped
- **Dual-pane sticky sidebar + accordion** — current iteration, still FAQ-shaped
- **Static coda (Option A)** — good fallback, but doesn't match brand energy
- **Ghost-only without correspondence framing (Option C full)** — scroll length concern
- **"A reader asks:" label** — newsletter voice, clashes with POST-CREDITS cinema framing
- **Any per-panel label** — redundant, over-explains the conceit
