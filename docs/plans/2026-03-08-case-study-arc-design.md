# Case Study Design: The Fixed Arc

**Date:** 2026-03-08
**Status:** Approved

## Overview

Redesign case study template from a fixed visual layout to a **story-arc-driven template** with 8 narrative beats. Every case study follows the same arc — consistency is the brand. The modularity is in content, not structure. Empty beats are skipped.

Visual approach: **cinematic hero, editorial body.** The hero section retains full cinema (parallax, camera metadata, film grain). Everything below shifts to editorial restraint — strong typography, white space doing half the work.

## Architecture Decision

**Approach: Fixed Arc Template.** Sanity schema has dedicated fields for each beat (not freeform blocks). One template component renders the arc in order.

Rationale: The arc *is* the methodology. Consistent structure reinforces positioning. Dramatically easier to author — open Sanity, see fields, fill them in.

---

## The 8-Beat Story Arc

### Beat 1: The Hero (Cinematic)

The only section that goes full cinema.

- Full-bleed hero image with parallax (`ParallaxHeroBackground`), vignette, film grain
- Camera metadata overlay (SCENE, REC dot, ISO/f-stop) — top-right, desktop only
- **Title** in massive Cormorant display with `TypewriterHeadline` animation
- **Subtitle** below: transformation line in serif italic (e.g., *"From 'Carnegie's Ensemble' to 'Global Chamber Orchestra Network'"*)
- Meta pills: Client / Sector / Year / Engagement Type
- Scroll indicator at bottom

### Beat 2: Cold Open

Editorial body begins. Paper background, clean typography, air.

- **"THE COLD OPEN"** section eyebrow in `text-technical`
- Client / Sector / Engagement — inline metadata, separated by vertical bars, small sans
- **One paragraph** — serif body, 18-20px, `text-ink/70`. The "before you showed up" paragraph. Max 3-4 sentences.
- Paper-lifts-over-dark transition from hero (existing `-mt-12` rounded top + shadow)

### Beat 3: The Story Problem

Three-column diagnostic layout.

- **"THE STORY PROBLEM"** section eyebrow
- Three columns:
  - **Internal Story** — what the organization tells itself
  - **External Perception** — what the market actually hears
  - **Consequences** — what's at stake if nothing changes
- Column headers in small tracked sans. Body 14-15px sans, `text-ink/55`, line-height 1.8
- 1px vertical rules between columns
- Staggered scroll-reveal per column

### Beat 4: The World

Competitive landscape — mentors and villains.

- **"THE WORLD"** section eyebrow
- Two-column split:
  - **Left: "Who's Getting It Right"** (mentors) — 2-3 entries: name + observation
  - **Right: "What You're Up Against"** (villains) — 2-3 entries: forces/competitors + observation
- Right column has subtle rust accent line on left edge (tension marker)
- Tone: strategic observation, not trash-talking

### Beat 5: The Reframe

The insight moment. Short, sharp, strategic.

- **"THE REFRAME"** section eyebrow
- 1-2 sentences in oversized serif (Cormorant, 3xl-5xl), centered, `text-ink/80`
- Optional handwriting annotation in Reenie Beanie (`font-hand`), rust color — a margin note reacting to the reframe
- Massive padding above and below. This beat breathes more than any other.

### Beat 6: Narrative Architecture

Proof of strategy. Show the artifacts.

- **"NARRATIVE ARCHITECTURE"** section eyebrow
- Dark section: `bg-trueblack` with `texture-grain`
- 2-3 artifact cards in grid (not horizontal scroll)
- Each artifact: image + figure label (monospace "FIG. 01") + brief description
- No film-strip perforations — editorial-dark, clean, purposeful
- Responsive: 1 artifact = centered, 2-3 = grid

### Beat 7: Execution (Optional)

Surfaces where strategy landed. Intentionally understated.

- **"THE EXECUTION"** section eyebrow
- Light background (paper)
- Simple list or minimal grid: surface name + one sentence + optional thumbnail
- If empty in Sanity: section skipped entirely

### Beat 8: The Shift

The transformation. Cultural before numerical.

- **"THE SHIFT"** section eyebrow
- 2-4 shift dimensions, listed vertically:
  - Dimension label in small tracked sans (e.g., "BOARD ALIGNMENT", "DONOR MESSAGING")
  - One sentence describing the change
- Optional metrics at bottom — supporting evidence, not the headline
- Thin rust accent line on left edge

### Navigation Footer

- Next case study link (circular navigation)
- Bottom bar: "All Work" (left) / "Book a Call" (right, rust)

---

## Sanity Schema

```
caseStudy {
  // Hero
  title                — string, required (cinematic title)
  subtitle             — string (transformation line: "From X to Y")
  slug                 — slug, auto from title
  heroImage            — image with hotspot
  client               — string
  sector               — string
  year                 — string
  engagementType       — string
  status               — string (draft/published)
  publishedAt          — datetime

  // Cold Open
  coldOpen             — text (one paragraph)

  // Story Problem
  internalStory        — text
  externalPerception   — text
  consequences         — text

  // The World
  mentors              — array of { name: string, observation: text }
  villains             — array of { name: string, observation: text }

  // The Reframe
  reframe              — text (1-2 sentences)
  reframeAnnotation    — string (optional handwriting margin note)

  // Narrative Architecture
  artifacts            — array of { image, label: string, description: text }

  // Execution (optional)
  executionSurfaces    — array of { surface: string, description: text, image? }

  // The Shift
  shifts               — array of { dimension: string, change: text }
  metrics              — array of { label: string, value: string } (optional)

  // Navigation
  nextCaseStudy        — reference to another caseStudy (optional, for manual ordering)

  // SEO
  seoTitle             — string
  seoDescription       — text
  ogImage              — image
  canonicalUrl         — url
  noIndex              — boolean
}
```

---

## Visual Design Summary

| Section | Background | Typography | Spacing |
|---------|-----------|------------|---------|
| Hero | trueblack + parallax image + grain | Cormorant display 5xl-7rem | min-h-screen |
| Cold Open | paper (#FAFAFA) + texture | Serif body 18-20px | py-20 to py-28 |
| Story Problem | paper | Sans 14-15px, tracked headers | 3-col grid, gap-16 |
| The World | paper | Sans body, tracked headers | 2-col split |
| The Reframe | paper | Cormorant 3xl-5xl centered | Extra generous py |
| Narrative Architecture | trueblack + grain | Monospace labels, sans descriptions | Grid, generous gaps |
| Execution | paper | Sans, understated | Compact |
| The Shift | paper | Tracked dimension labels, sans body | Vertical list, rust accent |

---

## Migration Notes

- Current `caseStudy` schema fields (`challenge`, `approach`, `outcome`, `fullStory`) will be replaced by the new beat-specific fields
- Hardcoded fallback data in `data/work-projects.ts` needs updating to match new structure
- `types/work.ts` Project interface needs full rewrite
- `lib/work.ts` mapping logic needs updating for new field names
- Existing work listing page (`app/work/page.tsx`) can remain largely unchanged — it only uses title, client, category, image, tagline
