# Protagonist Ink Site Go-Live Runbook (March 4, 2026)

This is the exact pre-launch sequence for the current Next.js + Sanity + Vercel setup.

## Current status from local preflight

- `npm run lint`: PASS
- `npm run build`: PASS
- Sitemap and robots routes exist and build (`/sitemap.xml`, `/robots.txt`)
- `/studio/*` redirects to hosted Studio (`https://protagonistink.sanity.studio`)

## 1) Freeze and branch hygiene

- [ ] Stop non-launch feature changes.
- [ ] Confirm branch is clean enough to tag (`git status`).
- [ ] Tag launch candidate commit:

```bash
git tag -a v2026-03-04-launch -m "Launch candidate"
```

## 2) Production environment checklist (Vercel Project Settings)

Set and verify these before deploy:

- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] `NEXT_PUBLIC_SANITY_DATASET`
- [ ] `ASANA_ACCESS_TOKEN`
- [ ] `ASANA_PROJECT_ID`
- [ ] `ASANA_SECTION_ID` (optional)
- [ ] `NOTION_TOKEN` (optional fan-out)
- [ ] `NOTION_DATABASE_ID` (optional fan-out)
- [ ] `MAKE_LOOM_WEBHOOK_URL` (optional)
- [ ] `NEXT_PUBLIC_DUBSADO_URL` (if story teardown booking is live)
- [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` (if captcha enabled)

Go/no-go gate:

- [ ] At least one lead destination is live: Asana configured, or Notion configured, or both.

## 3) Pre-deploy verification (run locally)

```bash
npm run lint
npm run build
```

Go/no-go gate:

- [ ] Both commands pass with no errors.

## 4) Deploy

Use your normal Vercel production promotion flow.

Go/no-go gate:

- [ ] Production deployment completes with no build/runtime errors.

## 5) First 15 minutes smoke test on production URL

- [ ] `/` loads, nav works, footer links work.
- [ ] `/about`, `/work`, `/blog`, `/story-teardown` load.
- [ ] One case-study detail page loads (`/work/<slug>`).
- [ ] One blog detail page loads (`/blog/<slug>`).
- [ ] `/robots.txt` and `/sitemap.xml` return 200.
- [ ] `/studio` redirects to `https://protagonistink.sanity.studio/`.
- [ ] `/brand-guide` is not indexed.
- [ ] `/journal` redirects to `/blog`.
- [ ] `/story-health-check` redirects to `/story-teardown`.

## 6) Lead capture hard test (`/api/loom-submit`)

Run one real test submission through the live form and confirm destination delivery.

Go/no-go gate:

- [ ] Submission succeeds for user.
- [ ] Task appears in Asana (or page appears in Notion if that destination is enabled).
- [ ] No 5xx errors in deployment logs for `loom-submit`.

## 7) Search and analytics readiness

- [ ] Confirm canonical production domain is `https://protagonist.ink`.
- [ ] Submit `https://protagonist.ink/sitemap.xml` in Google Search Console.
- [ ] Verify analytics/pageview and conversion events are firing on production.

## 8) Launch watch window (first 60 minutes)

- [ ] Watch Vercel logs for 4xx/5xx spikes.
- [ ] Watch form submissions and destination delivery.
- [ ] Roll back immediately if core pages fail or lead capture fails.

Rollback triggers:

- [ ] Any persistent 5xx on public routes.
- [ ] Lead submissions failing or not delivered.
- [ ] Site navigation or primary pages unavailable.

## 9) Post-launch same day

- [ ] Re-test core user flow once after traffic starts.
- [ ] Capture first issues as a triaged hotfix list.
- [ ] Create a post-launch patch release tag if needed.
