# QA Fixes + Route Rename Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 8 QA issues found in build review, rename `/story-health-check` → `/story-teardown`, and wire in the Dubsado URL as an env var.

**Architecture:** All changes are isolated edits to existing files. Group A tasks are independent of each other and can be done in any order. Group B (route rename) should be done after A so the build is stable before the rename. Group C is a one-liner in the renamed page file.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, Sanity CMS, npm

---

## Group A — QA Fixes

---

### Task 1: Add missing Sanity caseStudy schema fields

**Files:**
- Modify: `sanity/schemaTypes/caseStudy.ts`

**Step 1: Confirm the missing fields**

Run:
```bash
grep -n "industry\|businessCategory\|campaignCategory" sanity/schemaTypes/caseStudy.ts
```
Expected: 0 matches (they don't exist yet).

**Step 2: Read the file to find the right insertion point**

Open `sanity/schemaTypes/caseStudy.ts`. Find the `fields: [` array. Add the three new fields after the existing last field (before the closing `]`):

```typescript
defineField({
  name: 'industry',
  type: 'string',
  title: 'Industry',
}),
defineField({
  name: 'businessCategory',
  type: 'string',
  title: 'Business Category',
}),
defineField({
  name: 'campaignCategory',
  type: 'string',
  title: 'Campaign Category',
}),
```

**Step 3: Verify fields now exist**

Run:
```bash
grep -n "industry\|businessCategory\|campaignCategory" sanity/schemaTypes/caseStudy.ts
```
Expected: 3 matches.

**Step 4: Build check**

Run:
```bash
npm run build 2>&1 | tail -20
```
Expected: Clean build, no TypeScript errors.

**Step 5: Commit**

```bash
git add sanity/schemaTypes/caseStudy.ts
git commit -m "fix: add missing industry, businessCategory, campaignCategory fields to caseStudy schema"
```

---

### Task 2: Brand guide — add error handling around fs.readFile

**Files:**
- Modify: `app/brand-guide/page.tsx`

**Step 1: Read the current readGuideParts function**

Open `app/brand-guide/page.tsx` and find the `readGuideParts` function (or wherever `fs.readFile` / `readFile` is called).

**Step 2: Wrap in try/catch**

The function currently reads an HTML file and returns `{ style, body }`. Wrap the entire read in try/catch so a missing file returns a safe fallback instead of throwing:

```typescript
async function readGuideParts(): Promise<{ style: string; body: string }> {
  try {
    // existing readFile logic here (unchanged)
  } catch {
    return {
      style: '',
      body: '<p style="font-family:sans-serif;padding:2rem">Brand guide unavailable.</p>',
    };
  }
}
```

Keep everything inside `try` identical to what was there before. Only add the try/catch wrapper.

**Step 3: Build check**

Run:
```bash
npm run build 2>&1 | tail -20
```
Expected: Clean build.

**Step 4: Commit**

```bash
git add app/brand-guide/page.tsx
git commit -m "fix: wrap brand guide fs.readFile in try/catch to prevent 500 on missing file"
```

---

### Task 3: Add homepage metadata

**Files:**
- Modify: `app/page.tsx`

**Step 1: Confirm no metadata export currently exists**

Run:
```bash
grep -n "export const metadata" app/page.tsx
```
Expected: 0 matches.

**Step 2: Add the metadata export**

In `app/page.tsx`, add this before the default export function (after any imports):

```typescript
export const metadata = {
  title: 'Protagonist Ink — Where Stories Get Their Edge',
  description: 'Story strategy, narrative consulting, and editorial craft for founders and brand-led companies who need language that moves markets.',
  openGraph: {
    title: 'Protagonist Ink — Where Stories Get Their Edge',
    description: 'Story strategy, narrative consulting, and editorial craft for founders and brand-led companies.',
    url: 'https://protagonist.ink',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protagonist Ink — Where Stories Get Their Edge',
    description: 'Story strategy and editorial craft for brand-led companies.',
  },
};
```

Note: only add this if `/public/og-image.png` exists. If it doesn't exist, omit the `images` array for now rather than pointing to a missing asset. Check with:
```bash
ls public/og-image.png 2>/dev/null && echo "exists" || echo "missing"
```
If missing, remove the `images` and `twitter` blocks until an OG image is created.

**Step 3: Verify**

Run:
```bash
grep -n "export const metadata" app/page.tsx
```
Expected: 1 match.

**Step 4: Build check**

Run:
```bash
npm run build 2>&1 | tail -20
```
Expected: Clean build.

**Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add homepage metadata with title, description, and OG tags"
```

---

### Task 4: Remove unused styled-components

**Files:**
- Modify: `package.json`, `package-lock.json`

**Step 1: Confirm styled-components is unused**

Run:
```bash
grep -r "styled-components\|from 'styled'" app/ components/ lib/ --include="*.tsx" --include="*.ts"
```
Expected: 0 matches.

**Step 2: Uninstall**

Run:
```bash
npm uninstall styled-components
```

**Step 3: Verify removal**

Run:
```bash
grep "styled-components" package.json
```
Expected: 0 matches.

**Step 4: Build check**

Run:
```bash
npm run build 2>&1 | tail -20
```
Expected: Clean build.

**Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: remove unused styled-components dependency"
```

---

### Task 5: Fix Footer link — /journal → /blog, label → "The Ink"

**Files:**
- Modify: `components/Footer.tsx`

**Step 1: Find the current link**

Run:
```bash
grep -n "journal\|Journal" components/Footer.tsx
```

**Step 2: Update href and label**

Change the nav item from:
```typescript
{ label: 'Journal', href: '/journal' }
```
To:
```typescript
{ label: 'The Ink', href: '/blog' }
```

**Step 3: Verify**

Run:
```bash
grep -n "journal\|Journal" components/Footer.tsx
```
Expected: 0 matches.

**Step 4: Build check**

Run:
```bash
npm run build 2>&1 | tail -20
```
Expected: Clean build.

**Step 5: Commit**

```bash
git add components/Footer.tsx
git commit -m "fix: footer nav — change /journal → /blog, label 'Journal' → 'The Ink'"
```

---

### Task 6: Remove .zip_temp/ and COPY_INDEX_404.docx from git

**Files:**
- Modify: `.gitignore`
- Git: untrack `.zip_temp/` and `COPY_INDEX_404.docx`

**Step 1: Confirm what we're removing**

Run:
```bash
git ls-files .zip_temp/ COPY_INDEX_404.docx | head -20
```
Expected: List of tracked files to be removed.

**Step 2: Untrack the files (keep local copies)**

Run:
```bash
git rm -r --cached .zip_temp/
git rm --cached COPY_INDEX_404.docx
```

**Step 3: Add to .gitignore**

Add these two lines to `.gitignore`:
```
.zip_temp/
COPY_INDEX_404.docx
```

**Step 4: Verify**

Run:
```bash
git status | grep "zip_temp\|COPY_INDEX"
```
Expected: Files show as deleted from git index (staged for removal), and `.gitignore` shows as modified.

**Step 5: Commit**

```bash
git add .gitignore
git commit -m "chore: remove .zip_temp/ and COPY_INDEX_404.docx from version control"
```

---

### Task 7: Fix duplicate Sanity fetch in blog detail page

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

**Step 1: Read the current file**

Open `app/blog/[slug]/page.tsx`. Find `generateMetadata` and the page component. Both currently call Sanity independently.

**Step 2: Understand the current pattern**

`generateMetadata` likely calls something like `getBlogPostBySlug(slug)` or `getBlogPosts()`.
The page component calls `getBlogPosts()`.

**Step 3: Fix generateMetadata to reuse the shared fetch**

The simplest fix: in `generateMetadata`, call `getBlogPosts()` and find the post by slug from the result, matching exactly what the page component does. This means both use the same function — Next.js will deduplicate the fetch via its built-in request memoization within a single render cycle.

Change `generateMetadata` from:
```typescript
// whatever it currently does to fetch the single post
const post = await getBlogPostBySlug(slug);
```
To:
```typescript
const posts = await getBlogPosts();
const post = posts.find((p) => p.slug === slug) ?? null;
```

Adjust the variable names to match whatever the file actually uses. The key change is: both `generateMetadata` and the page component call the same `getBlogPosts()` function.

**Step 4: Build check**

Run:
```bash
npm run build 2>&1 | tail -20
```
Expected: Clean build.

**Step 5: Commit**

```bash
git add app/blog/\[slug\]/page.tsx
git commit -m "perf: remove duplicate Sanity fetch in blog detail generateMetadata"
```

---

### Task 8: Delete dead blogPost.ts schema file

**Files:**
- Delete: `sanity/schemaTypes/blogPost.ts`
- Verify: `sanity/schemaTypes/index.ts`

**Step 1: Confirm blogPost.ts is not imported anywhere**

Run:
```bash
grep -r "blogPost\|blog-post" sanity/schemaTypes/index.ts sanity/
```
Expected: Only the file itself — no import in `index.ts`.

**Step 2: Delete the file**

Run:
```bash
rm sanity/schemaTypes/blogPost.ts
```

**Step 3: Build check**

Run:
```bash
npm run build 2>&1 | tail -20
```
Expected: Clean build (the file was never imported, so nothing breaks).

**Step 4: Commit**

```bash
git add -A sanity/schemaTypes/
git commit -m "chore: delete dead blogPost.ts schema — unregistered, conflicts with active post type"
```

---

## Group B — Route Rename

---

### Task 9: Move page files and add redirect

**Files:**
- Move: `app/story-health-check/` → `app/story-teardown/`
- Modify: `next.config.ts`

**Step 1: Move the directory**

Run:
```bash
mv "app/story-health-check" "app/story-teardown"
```

**Step 2: Add permanent redirect and fix /contact redirect in next.config.ts**

Open `next.config.ts`. In the `redirects()` array, add one redirect and update the existing `/contact` redirect:

```typescript
async redirects() {
  return [
    {
      source: '/journal',
      destination: '/blog',
      permanent: true,
    },
    {
      source: '/story-health-check',   // ADD THIS
      destination: '/story-teardown',
      permanent: true,
    },
    {
      source: '/contact',
      destination: '/#story-teardown', // WAS /#story-health-check
      permanent: false,
    },
  ];
},
```

**Step 3: Build check (expect TypeScript errors — links still point to old route)**

Run:
```bash
npm run build 2>&1 | grep -i "error\|Error" | head -20
```
TypeScript won't error on hardcoded strings, but the build should still pass. If it fails for another reason, fix that before proceeding.

**Step 4: Commit**

```bash
git add -A app/story-teardown/ app/story-health-check/
git add next.config.ts
git commit -m "feat: move story-health-check → story-teardown, add 301 redirect"
```

---

### Task 10: Update all route references across the codebase

**Files to update:**
- `components/Navbar.tsx`
- `components/Footer.tsx`
- `app/sitemap.ts`
- `components/home/HeroSection.tsx`
- `components/home/NarrativeBridge.tsx`
- `components/home/ServicesSection.tsx`
- `components/home/AboutSection.tsx`
- `components/about/FadeInCta.tsx`
- `data/brandGuide.ts`
- `app/story-teardown/page.tsx` (the moved file itself — update internal `isStoryHealthCheck` variable name)
- `app/story-teardown/layout.tsx` (check for any self-references)

**Step 1: Find every remaining reference**

Run:
```bash
grep -rn "story-health-check" app/ components/ data/ lib/ --include="*.tsx" --include="*.ts"
```
Note every file and line number returned.

**Step 2: Replace all occurrences**

For each file in the list, replace every instance of `story-health-check` with `story-teardown`.

Also in `Navbar.tsx`, rename the variable:
```typescript
const isStoryHealthCheck = pathname === '/story-health-check';
```
→
```typescript
const isStoryTeardown = pathname === '/story-teardown';
```
And update every usage of `isStoryHealthCheck` in that file to `isStoryTeardown`.

**Step 3: Verify zero remaining references**

Run:
```bash
grep -rn "story-health-check" app/ components/ data/ lib/ --include="*.tsx" --include="*.ts"
```
Expected: **0 matches**.

**Step 4: Build check**

Run:
```bash
npm run build 2>&1 | tail -20
```
Expected: Clean build, zero errors.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: update all story-health-check → story-teardown route references"
```

---

## Group C — Dubsado URL Wiring

---

### Task 11: Wire NEXT_PUBLIC_DUBSADO_URL env var

**Files:**
- Modify: `.env.example`
- Modify: `app/story-teardown/page.tsx`

**Step 1: Add to .env.example**

Open `.env.example`. Add:
```
# Dubsado booking link for the $1,500 Story Audit
# Add this when the Dubsado proposal flow is ready
NEXT_PUBLIC_DUBSADO_URL=
```

**Step 2: Update BOOKING_ACTION constant in the page**

Open `app/story-teardown/page.tsx`. Find line 10:
```typescript
const BOOKING_ACTION = "mailto:hello@protagonist.ink";
```

Replace with:
```typescript
const BOOKING_ACTION = process.env.NEXT_PUBLIC_DUBSADO_URL ?? "mailto:hello@protagonist.ink";
```

**Step 3: Verify**

Run:
```bash
grep -n "BOOKING_ACTION\|DUBSADO" app/story-teardown/page.tsx
```
Expected: Shows the new `process.env.NEXT_PUBLIC_DUBSADO_URL ?? "mailto:..."` line.

**Step 4: Build check**

Run:
```bash
npm run build 2>&1 | tail -20
```
Expected: Clean build.

**Step 5: Commit**

```bash
git add app/story-teardown/page.tsx .env.example
git commit -m "feat: wire NEXT_PUBLIC_DUBSADO_URL env var for Story Audit booking link"
```

---

## Final Verification

### Task 12: Full verification pass

**Step 1: Clean build**

Run:
```bash
npm run build 2>&1 | tail -30
```
Expected: No errors, no warnings.

**Step 2: TypeScript clean**

Run:
```bash
npx tsc --noEmit 2>&1
```
Expected: No output (zero errors).

**Step 3: No old route refs**

Run:
```bash
grep -rn "story-health-check" app/ components/ data/ lib/ --include="*.tsx" --include="*.ts"
```
Expected: 0 matches.

**Step 4: Schema fields present**

Run:
```bash
grep -n "industry\|businessCategory\|campaignCategory" sanity/schemaTypes/caseStudy.ts
```
Expected: 3 matches.

**Step 5: styled-components gone**

Run:
```bash
grep "styled-components" package.json
```
Expected: 0 matches.

**Step 6: .zip_temp not tracked**

Run:
```bash
git ls-files .zip_temp/ | wc -l
```
Expected: `0`.

**Step 7: Commit design doc**

```bash
git add docs/plans/2026-03-03-qa-fixes-and-route-rename.md docs/plans/2026-03-03-qa-fixes-route-rename-plan.md
git commit -m "docs: add QA fixes + route rename design doc and implementation plan"
```
