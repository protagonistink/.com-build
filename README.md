## Protagonist Ink

Marketing site, blog, case-study system, and embedded Sanity Studio for Protagonist Ink.

### Local development

```bash
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

### Verification

```bash
npm run verify
```

This runs TypeScript and ESLint across the repo.

For a full production check:

```bash
npm run verify:full
```

That build step requires live Sanity access because blog and case-study routes are generated from CMS data.

### Sanity

The site expects a Sanity project and dataset in local env:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

Optional preview/live-editing variables:

- `SANITY_API_READ_TOKEN`
- `NEXT_PUBLIC_SANITY_API_READ_TOKEN`

Studio lives at `https://protagonistink.sanity.studio/`.

### Additional integrations

Story Rip and newsletter routes can use these variables:

- `CRAFT_LINK_ID`
- `CRAFT_COLLECTION_ID`
- `ASANA_ACCESS_TOKEN`
- `ASANA_PROJECT_ID`
- `ASANA_SECTION_ID`
- `NOTION_TOKEN`
- `NOTION_DATABASE_ID`
- `MAKE_LOOM_WEBHOOK_URL`
- `NEXT_PUBLIC_DUBSADO_URL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `BEEHIIV_API_KEY`
- `BEEHIIV_PUBLICATION_ID`

Copy `.env.example` to `.env.local` and set the values that apply to your local workflow.
