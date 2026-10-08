# Protagonist Ink: static site (2026)

The new Protagonist Ink site, built as plain HTML, CSS and JS. It lives in its own folder so it can grow page by page without touching the Next.js app at the repo root, which is the older version of the site.

## What's here

```
index.html         Homepage (storymakers premise, copy from the Notion "Home Page" doc, 8 Oct 2026)
styles.css         Shared styles for every page
main.js            Mobile menu, How-we-work stages, client marquee pause, form validation (no sending)
assets/
  tokens.css       Copy of docs/design-system/tokens.css
  fonts/           Satoshi (committed). Ethic Serif: add locally, see below
  images/          Photography and the Protagonist symbol
docs/
  design-system/   Brand book and homepage spec (README.md), tokens.json, tokens.css, wordmark
  DESIGN.md        Design notes
  PRODUCT.md       Product notes
CLAUDE.md          Working rules for Claude Code in this folder
```

## Running it

Open `index.html` in a browser, or serve the folder:

```bash
cd site-2026 && python3 -m http.server 8000
```

## Before launch

- **Ethic Serif.** Not committed: the web licence is unconfirmed and this repo is public. Copy `EthicSerif-*.woff` into `assets/fonts/` locally (they're gitignored). Until then the serif falls back to Georgia.
- **Form.** Nothing is sent. Wire it to a real endpoint in `main.js` before it says anything was received.
- **Copy.** Two open edits in the Notion doc: the Story stage has missing words ("the nugget that [—]"), and Strategy reads "helps" where "help" may be meant.
- **Selected work** is still three labelled Spec spreads.
