# QA Fixes + Route Rename — Design Doc
_2026-03-03_

## Overview

Three groups of changes following a full-build QA pass:

- **Group A** — 8 QA fixes (code hygiene, schema, SEO, git)
- **Group B** — Route rename `/story-health-check` → `/story-teardown`
- **Group C** — Dubsado URL wiring (env var, fallback to mailto)

---

## Group A — QA Fixes

### A1: Sanity caseStudy schema — add missing fields
- **File:** `sanity/schemaTypes/caseStudy.ts`
- **Problem:** GROQ query in `lib/work.ts` requests `industry`, `businessCategory`, `campaignCategory` — none exist in the schema. Sanity silently returns null; fallback labels always fire.
- **Fix:** Add three `defineField` entries: `industry` (string), `businessCategory` (string), `campaignCategory` (string).

### A2: Brand guide — add error handling around fs.readFile
- **File:** `app/brand-guide/page.tsx`
- **Problem:** If the HTML file is missing on deploy, page throws unhandled ENOENT → 500.
- **Fix:** Wrap `readGuideParts()` in try/catch; return a safe fallback object on error.

### A3: Homepage metadata
- **File:** `app/page.tsx`
- **Problem:** No `export const metadata` — only root layout defaults used. Missing page-specific description and OG stub.
- **Fix:** Add `export const metadata` with title, description, and openGraph image pointing to the existing og-image asset.

### A4: Remove unused styled-components
- **File:** `package.json`
- **Problem:** `styled-components` listed in dependencies but never imported anywhere.
- **Fix:** `npm uninstall styled-components`. Update lockfile.

### A5: Footer link — /journal → /blog
- **File:** `components/Footer.tsx`
- **Problem:** Footer links to `/journal` (301 redirects to `/blog`). Label says "Journal" but destination page is titled "The Ink".
- **Fix:** Change `href` to `/blog`, label to `The Ink`.

### A6: Remove .zip_temp/ from git
- **Files:** `.gitignore`, git history
- **Problem:** `.zip_temp/` (80+ files, large PNGs) and `COPY_INDEX_404.docx` committed to repo.
- **Fix:** `git rm -r --cached .zip_temp/ COPY_INDEX_404.docx`, add both to `.gitignore`.

### A7: Fix duplicate Sanity fetch in blog detail
- **File:** `app/blog/[slug]/page.tsx`
- **Problem:** `generateMetadata` calls `getBlogPostBySlug()` (which fetches all posts), then the page component calls `getBlogPosts()` again — two full Sanity round-trips per render.
- **Fix:** In `generateMetadata`, derive the post from the `posts` array already fetched, or extract a shared cached fetch. Simplest: call `getBlogPosts()` once, find the matching slug in both places.

### A8: Delete dead blogPost.ts schema
- **Files:** `sanity/schemaTypes/blogPost.ts`, `sanity/schemaTypes/index.ts`
- **Problem:** `blogPost.ts` defines an unregistered schema that conflicts conceptually with the active `post` type.
- **Fix:** Delete the file. Confirm `index.ts` does not import it (it doesn't).

---

## Group B — Route Rename

### Old route: `/story-health-check`
### New route: `/story-teardown`

**Rationale:** "Health check" reads as SaaS/clinical. "Story teardown" uses founder vocabulary — self-selecting audience, owns the framing.

**File moves:**
- `app/story-health-check/` → `app/story-teardown/` (page.tsx + layout.tsx)

**Redirects (next.config.ts):**
- Add permanent redirect: `/story-health-check` → `/story-teardown` (preserves any existing inbound links)
- Update existing redirect: `/contact` → `/#story-health-check` becomes `/#story-teardown`

**String replacements across codebase:**
| File | Change |
|------|--------|
| `components/Navbar.tsx` | `/story-health-check` → `/story-teardown`, `isStoryHealthCheck` variable rename |
| `components/Footer.tsx` | `/story-health-check` → `/story-teardown` |
| `app/sitemap.ts` | `/story-health-check` → `/story-teardown` |
| `components/home/HeroSection.tsx` | href + any anchor refs |
| `components/home/NarrativeBridge.tsx` | href |
| `components/home/ServicesSection.tsx` | href |
| `components/home/AboutSection.tsx` | href |
| `components/about/FadeInCta.tsx` | href |
| `data/brandGuide.ts` | any route refs |

**Verification:** `grep -r "story-health-check" app/ components/ data/` → 0 matches after rename.

---

## Group C — Dubsado URL Wiring

**Problem:** `BOOKING_ACTION = "mailto:hello@protagonist.ink"` is a hardcoded placeholder. The Dubsado booking flow isn't built yet.

**Fix:**
- Add to `.env.example`:
  ```
  # Dubsado booking link for Story Teardown ($1,500 Story Audit)
  # Set this when the Dubsado proposal flow is ready
  NEXT_PUBLIC_DUBSADO_URL=
  ```
- In `app/story-teardown/page.tsx`, change:
  ```ts
  const BOOKING_ACTION = "mailto:hello@protagonist.ink";
  ```
  to:
  ```ts
  const BOOKING_ACTION = process.env.NEXT_PUBLIC_DUBSADO_URL ?? "mailto:hello@protagonist.ink";
  ```

When the Dubsado link is ready: add `NEXT_PUBLIC_DUBSADO_URL=<link>` to Vercel env vars. No code change needed.

---

## Out of Scope

- The full story-health-check overhaul plan (`2026-02-28-story-health-check-overhaul.md`) — separate sprint
- OG images for all pages — separate sprint
- ISR/caching for Sanity fetches — separate sprint

---

## Success Criteria

- `npm run build` passes clean
- `npx tsc --noEmit` — zero errors
- `grep -r "story-health-check" app/ components/ data/` → 0 matches
- `/story-health-check` redirects to `/story-teardown` (301)
- `styled-components` removed from `node_modules`
- `.zip_temp/` not in `git status`
- Sanity Studio shows `industry`, `businessCategory`, `campaignCategory` fields on case study documents
- Homepage has metadata title + description
