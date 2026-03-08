# Blog Post Continuous Scroll Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the blog post detail page's `MoreInk` card grid and back link with a full PostRow cascade into The Ink publication, followed by an editorial footer strip — and suppress the global site footer on blog detail pages.

**Architecture:** The global `Footer` component already has a `usePathname()` pattern for conditional rendering (currently used for `/brand-guide`). Extend that pattern for blog detail routes. Two new components (`BlogContinuation`, `EditorialFooter`) are dropped into `page.tsx` after the paper article section closes. No new data fetching — the page already fetches all posts.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4. Reuses existing `PostRow` component directly.

---

### Task 1: Suppress the global footer on blog detail pages

**Files:**
- Modify: `components/Footer.tsx`

The `Footer` component is already `'use client'` and already uses `usePathname()` to hide on `/brand-guide`. Add the same pattern for blog detail pages.

**Step 1: Open Footer.tsx and locate the existing guard**

Look at lines 20–26:
```tsx
export default function Footer() {
  const pathname = usePathname();
  const isBrandGuide = pathname?.startsWith('/brand-guide');

  if (isBrandGuide) {
    return null;
  }
```

**Step 2: Add the blog detail guard**

Replace those lines with:
```tsx
export default function Footer() {
  const pathname = usePathname();
  const isBrandGuide = pathname?.startsWith('/brand-guide');
  const isBlogDetail = /^\/blog\/.+/.test(pathname ?? '');

  if (isBrandGuide || isBlogDetail) {
    return null;
  }
```

**Step 3: Verify in preview**

Navigate to `http://localhost:3000/blog/brand-messaging-narrative-debt` in the preview server. Scroll to the bottom — the global footer (nav links, Connect column, "Built with conviction." legal bar) should NOT appear. The blog index at `http://localhost:3000/blog` should still show the footer.

**Step 4: Commit**
```bash
git add components/Footer.tsx
git commit -m "feat: suppress global footer on blog detail pages"
```

---

### Task 2: Create BlogContinuation component

**Files:**
- Create: `components/blog/detail/BlogContinuation.tsx`

This component renders the `THE INK` transition band followed by all the PostRow entries.

**Step 1: Create the file**

```tsx
// components/blog/detail/BlogContinuation.tsx
import PostRow from '@/components/blog/PostRow';
import type { BlogPost } from '@/types/blog';

interface BlogContinuationProps {
  posts: BlogPost[];
}

export default function BlogContinuation({ posts }: BlogContinuationProps) {
  if (posts.length === 0) return null;

  return (
    <>
      {/* THE INK — transition band */}
      <div className="bg-trueblack texture-grain py-6 md:py-8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <p className="text-technical text-[11px] tracking-[0.24em] text-warmwhite/50 mb-2">
            THE INK
          </p>
          <div className="w-4 h-px bg-rust/60" />
        </div>
      </div>

      {/* PostRow cascade */}
      <section className="bg-[#FAFAFA]">
        {posts.map((post, i) => (
          <PostRow
            key={post.id}
            post={post}
            displayNumber={i + 1}
            index={i}
          />
        ))}
      </section>
    </>
  );
}
```

**Step 2: Check PostRow's props signature**

Open `components/blog/PostRow.tsx` and confirm it accepts:
```tsx
interface PostRowProps {
  post: BlogPost;
  displayNumber: number;
  index: number;
}
```
It does. No changes needed to PostRow.

**Step 3: Verify TypeScript compiles**
```bash
cd "/Users/pat/Sites/Protagonist Ink/next" && npx tsc --noEmit
```
Expected: no errors.

**Step 4: Commit**
```bash
git add components/blog/detail/BlogContinuation.tsx
git commit -m "feat: add BlogContinuation component (THE INK transition band + PostRow cascade)"
```

---

### Task 3: Create EditorialFooter component

**Files:**
- Create: `components/blog/detail/EditorialFooter.tsx`

This is the dark editorial footer strip — newsletter, Story Teardown CTA, PI mark. Newsletter form is UI-only (no backend wired yet).

**Step 1: Create the file**

```tsx
// components/blog/detail/EditorialFooter.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function EditorialFooter() {
  return (
    <footer className="bg-trueblack texture-grain px-6 md:px-10 lg:px-12 pt-16 md:pt-20 pb-12 md:pb-16">
      <div className="max-w-[1400px] mx-auto">

        {/* Two-column CTA grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16 md:mb-20">

          {/* Newsletter */}
          <div>
            <p className="text-technical text-[11px] tracking-[0.24em] text-warmwhite/40 mb-4">
              DISPATCH
            </p>
            <p className="font-serif italic text-warmwhite/60 text-lg md:text-xl mb-8 leading-snug">
              The Ink, delivered.
            </p>
            {/* TODO: wire to newsletter provider */}
            <form action="#" className="max-w-sm">
              <div className="flex items-end gap-0 border-b border-warmwhite/20 pb-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent text-warmwhite text-sm placeholder-warmwhite/30 focus:outline-none font-sans min-w-0"
                />
                <button
                  type="submit"
                  className="text-technical text-[11px] tracking-[0.18em] text-rust hover:text-warmwhite transition-colors duration-300 ml-4 flex-shrink-0"
                >
                  Subscribe →
                </button>
              </div>
            </form>
          </div>

          {/* Story Teardown */}
          <div>
            <p className="text-technical text-[11px] tracking-[0.24em] text-warmwhite/40 mb-4">
              STORY TEARDOWN
            </p>
            <p className="font-serif italic text-warmwhite/60 text-lg md:text-xl mb-8 leading-snug">
              Find out exactly where your story breaks.
            </p>
            <Link
              href="/story-teardown"
              className="text-technical text-[13px] tracking-[0.18em] text-rust hover:text-warmwhite transition-colors duration-300"
            >
              protagonist.ink/story-teardown →
            </Link>
          </div>

        </div>

        {/* PI mark + copyright */}
        <div className="flex flex-col items-center gap-4 pt-8 border-t border-warmwhite/[0.06]">
          <Image
            src="/images/brand/transparent_black_symbol.png"
            alt=""
            width={48}
            height={48}
            aria-hidden
            className="opacity-[0.15] invert"
          />
          <p className="text-technical text-[10px] tracking-[0.2em] text-warmwhite/20">
            © {new Date().getFullYear()} Protagonist Ink
          </p>
        </div>

      </div>
    </footer>
  );
}
```

**Step 2: Verify TypeScript compiles**
```bash
cd "/Users/pat/Sites/Protagonist Ink/next" && npx tsc --noEmit
```
Expected: no errors.

**Step 3: Commit**
```bash
git add components/blog/detail/EditorialFooter.tsx
git commit -m "feat: add EditorialFooter component (newsletter, Story Teardown, PI mark)"
```

---

### Task 4: Wire everything into page.tsx

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

**Step 1: Update imports at the top of the file**

Replace:
```tsx
import PostCredits from '@/components/blog/detail/PostCredits';
import MoreInk from '@/components/blog/detail/MoreInk';
import Prose from '@/components/blog/detail/Prose';
```

With:
```tsx
import PostCredits from '@/components/blog/detail/PostCredits';
import BlogContinuation from '@/components/blog/detail/BlogContinuation';
import EditorialFooter from '@/components/blog/detail/EditorialFooter';
import Prose from '@/components/blog/detail/Prose';
```

**Step 2: Remove the relatedPosts logic and replace with a date-sorted catalogue**

Find and remove this function (lines 47–52):
```tsx
function getRelatedPosts(posts: BlogPost[], currentSlug: string, category: string) {
  const others = posts.filter((p) => p.slug !== currentSlug);
  const sameCategory = others.filter((p) => p.category === category);
  const different = others.filter((p) => p.category !== category);
  return [...sameCategory, ...different].slice(0, 3);
}
```

Replace with:
```tsx
function getCataloguePosts(posts: BlogPost[], currentSlug: string): BlogPost[] {
  return posts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
```

**Step 3: Update the page function body**

Inside the page function, replace:
```tsx
const relatedPosts = getRelatedPosts(posts, post.slug, post.category);
```
With:
```tsx
const cataloguePosts = getCataloguePosts(posts, post.slug);
```

**Step 4: Close the paper section after PostCredits and wire the new sections**

Find the bottom of the paper `<section>` — currently it ends after the back link. Replace everything from `{/* Post Credits */}` to `</section>` with:

```tsx
        {/* Post Credits (only renders if post has faqItems) */}
        {post.faqItems && post.faqItems.length > 0 && (
          <PostCredits items={post.faqItems} />
        )}

      </section>

      {/* The Ink — PostRow catalogue */}
      <BlogContinuation posts={cataloguePosts} />

      {/* Editorial footer — newsletter, Story Teardown, PI mark */}
      <EditorialFooter />
```

Note the `</section>` closing tag — the paper section closes right after PostCredits. `BlogContinuation` and `EditorialFooter` are siblings to the paper section, not children.

**Step 5: Verify TypeScript compiles**
```bash
cd "/Users/pat/Sites/Protagonist Ink/next" && npx tsc --noEmit
```
Expected: no errors.

**Step 6: Visual verification in preview**

Navigate to `http://localhost:3000/blog/brand-messaging-narrative-debt`:

1. Scroll past POST-CREDITS — the paper section should end cleanly
2. A thin `trueblack` band should appear with `THE INK` label and short rust rule
3. PostRow entries should follow on paper background, exactly like the blog index
4. Current post should NOT appear in the PostRow list
5. The EditorialFooter dark strip should close the page — DISPATCH newsletter input, STORY TEARDOWN CTA, PI mark, copyright
6. The global site footer (nav links, "Built with conviction") should NOT appear

**Step 7: Commit**
```bash
git add app/blog/\[slug\]/page.tsx
git commit -m "feat: replace MoreInk with continuous scroll into The Ink publication"
```

---

## Post-Implementation Notes

- **Newsletter backend:** The form currently submits to `#`. When a newsletter provider is chosen (e.g. ConvertKit, Mailchimp, Resend), wire the form action or add a server action to `app/api/newsletter/route.ts`.
- **`MoreInk` component:** Left in place at `components/blog/detail/MoreInk.tsx`. No longer imported in `page.tsx` but available if needed elsewhere.
- **Footer on blog index:** The global footer still renders on `/blog` (the index page). Only `/blog/[slug]` routes suppress it. This is correct per design.
- **Story Teardown URL:** Uses `/story-teardown` per the Footer nav config and existing internal links. If this route doesn't exist, verify the `app/story-teardown` directory.
