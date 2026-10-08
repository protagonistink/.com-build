# Protagonist Ink site: instructions for Claude Code

- Read `docs/design-system/README.md` before any visual or layout change. It's the brand book and the homepage spec. `docs/design-system/tokens.json` is the source of truth for tokens. `docs/design-system/tokens.css` mirrors it, and `assets/tokens.css` is a copy. Keep all three in sync.
- Style with the CSS custom properties from tokens.css. Don't hard-code new colours. Anything outside the palette (greens, oxblood, other vermilions or cobalts) is off-limits.
- This folder (`site-2026/`) is the new static build of the site: plain HTML, CSS and JS, no framework. It is independent of the Next.js app at the repo root; don't import from it or change it. `index.html` is the homepage (6 Oct 2026, the "storymakers" premise). New pages go alongside it and share `styles.css`, `main.js` and `assets/`.
- The hero headline is fixed: "You’re more than they think." Don't reword it or change its punctuation. Approved page copy lives in the Notion "Home Page" doc (Backstage › Documents); match it.
- The homepage section order is fixed: Opening → Selected work → What you bring → The people → Invitation → The Latest Ink.
- Don't invent clients, projects, testimonials, metrics or outcomes. Unresolved copy stays in [brackets].
- Accessibility target is WCAG 2.2 AA: 4.5:1 text contrast (red text never on ink), visible focus, 44px targets, alt text, and all motion paused or removed under prefers-reduced-motion.
- Motion is limited to the hero, plus one exception: the How we work stages ease open and shut when a visitor hovers, focuses or taps them (user-triggered, and removed under prefers-reduced-motion). No typewriter effects, rotating words, scroll-jacking, parallax, custom cursors, intros or autoplay sound.
- The form must not claim success until a real delivery route is configured.
- Ethic Serif files are not committed (licence unconfirmed; this repo is public). Keep them out of git; `.gitignore` here covers them.
