# ActInk — Cinematic Video Strip

**Date:** 2026-03-04
**Placement:** Between `<ActOne />` and `<ActTwo />` in `about/page.tsx`

## Purpose
A full-width letterbox video interlude that punctuates the space between the opening brand statement ("Every brand is living a story") and the personal origin section ("It started with a realization"). The ink plume video is the brand identity made visible — pure visual breathing room.

## Design
- **Component:** `ActInk` (`components/about/ActInk.tsx`)
- **Height:** `42vh` — narrow cinematic strip
- **Video:** Vimeo `1104985427` in background mode (`autoplay=1&loop=1&muted=1&background=1`)
- **No text overlay** — purely visual
- **iframe cover technique** — 16:9 iframe oversized and centered/clipped to fill container
- **Lazy load** — iframe only renders when section enters viewport (`useInView`, `once: true`)
- **Fade in** — `opacity: 0 → 1` over 1.2s on scroll-in
- **Grain overlay** — `texture-grain opacity-[0.04]` matching page texture language
- **Editorial rules** — 1px `bg-paper/10` top and bottom edges
- **Reduced motion** — iframe omitted; dark `bg-trueblack` fallback
- **`aria-hidden="true"`** — decorative, no semantic content

## Page update
Remove nothing. Insert `<ActInk />` directly after `<ActOne />`.
