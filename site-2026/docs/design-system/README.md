# Protagonist Ink

A contemporary editorial studio: expressive typography, carefully composed photography, and the clarity of a well-edited publication.

Working visual and homepage UX specification, updated 25 September 2026. The headline, palette, font pairing, wordmark, required homepage sections and homepage composition are established. Photography and final supporting copy are still being tested. This system does not approve new positioning, expand services, or establish client outcomes.

## Brand and purpose

Protagonist Ink brings together narrative strategy, messaging and copywriting: defining a direction, finding the story, developing the language, and writing the materials that put it into public use.

The visitor is an artist, founder or organizational leader contemplating a rebrand, website, pitch or campaign. They have substantial work behind them and ambition for what comes next. Some arrive with a clear direction; others need help articulating it. The site must show what they can hire the practice to do, show evidence of judgment and craft, and make an incomplete brief feel welcome. Never make a visitor diagnose themselves as "needing narrative strategy."

**Character:** intelligent, culturally engaged, human, precise, assured. Creative authorship alongside practical clarity. The methodology is not the visual subject.

Story emerges through sequence, emphasis and language. Book pages, typewriters, screenplay formatting, blueprints, ink splashes, red-pen annotations and chapter metaphors are **not** brand devices.

## Colour

| Token | Hex | Role |
| --- | --- | --- |
| `paper` | #FAFAF7 | Dominant background and reading field |
| `ink` | #282828 | Primary text; the occasional dark surface |
| `red` | #C83C2F | Editorial red: primary button, headline full stop, engagement labels |
| `indigo` | #252B54 | Occasional substantial dark field, paper text |
| `graphite` | #6D6A64 | Captions and secondary information on paper |
| `proof` | #E1D5D2 | Optional quiet surface |

Supporting tokens: `red-press` (hover), `paper-muted` (secondary text on ink), `rule` and `rule-on-ink` (hairlines), `focus`. `red-on-ink` (#E86A57) is a **proposed** tint, outside the approved palette, for the rare case red type must sit on charcoal.

- Paper dominates. Ink carries most text. Client imagery keeps its own colour: no filters or overlays to match the palette.
- Red repeats wherever it has a consistent function. There is no "one per viewport" rule.
- Dark fields are rare changes of pace. On the homepage the selected work section is the one `ink` field; the invitation sits on paper. Indigo is an option for a single mood shift; it never replaces ink across the site. Never tint every section.
- Outside the palette: structural greens #34554E / #28564E, oxblood #7C433F, alternative vermilions and cobalts.

### Contrast

On paper: ink 14.10, graphite 5.15, red 4.85, indigo 12.94. All clear 4.5:1.
On ink: paper 14.10, paper-muted 5.94, red **2.91 (fails, even for large type)**, red-on-ink 4.65.
Red on indigo is 2.67: never for text or control boundaries.
Red buttons live on paper. On a dark field the primary button is paper with ink (or indigo) text.
These are solid-colour calculations, not an audit. Verify hover, focus, disabled, error and image-overlay states in build.

## Typography

**Ethic Serif** (Jen Wagner) carries the hero and selected major statements. Start with upright Regular and Medium; italic is an occasional expressive choice, not a default. Avoid the lightest weights and never assign every heading to the serif.

**Satoshi** carries descriptions, body, navigation, captions, labels, forms, buttons and some substantial headings, at a scale that gives it visible authority.

> Font files: Satoshi (Fontshare, ITF Free Font License) and Ethic Serif (Light, Light Italic, Regular, Italic, Medium; WOFF) are included under `fonts/`. **Confirm the Ethic web licence covers embedding before launch.** Newsreader is no longer used.

| Style | Desktop | Mobile | Treatment |
| --- | --- | --- | --- |
| `hero` | 72–112px | 42–56px | Ethic; sentence case; intentional breaks |
| `statement` | 40–64px | 30–40px | Ethic or Satoshi by hierarchy |
| `lede` | 22–28px | 20–24px | Satoshi |
| `body` | 18–20px | 18–20px | Satoshi, ~1.55 leading |
| `label`, `nav`, `caption` | 14–16px | 14–16px | Satoshi, never decorative microtype |

Body lines 55–70 characters. Check serif ascenders and descenders; don't tighten until lines collide. Capitals only for short labels. No long italic or all-caps passages.

The approved headline is fixed, word for word and mark for mark:

> You’re more than they think.

(Changed 8 October 2026 per the Notion Home Page copy. The statement band under the hero is now “We’re obsessed with the storymakers.” The rest of this spec has not yet been rewritten for the new premise.)

Line breaks and scale may change. Nothing else.

## Wordmark

`wordmark/protagonist-ink-wordmark.svg`: the Protagonist Ink wordmark (serif "Protagonist", script "Ink"), traced from `wordmark/protagonist-ink-wordmark-source.png`. It fills with `currentColor`, so it is ink on paper and paper on ink. Inline it in HTML to recolour; give its mask a unique id each time it appears on a page.

## Layout and rhythm

- Desktop: 12 columns, `content-max` 1280px, 32px gutters (`space-5`), 64px margins (`space-7`).
- Mobile: 4 columns, 24px margins (`space-4`), a straightforward reading order.
- Related things close (`space-3`–`space-6`); major ideas far apart (`space-8`–`space-9`). Never equal padding everywhere.
- One dominant element per composition. Unequal pairings share precise alignment.
- Hairline rules (`rule`) only divide meaningful content.
- Full-bleed image or colour only for a deliberate change of pace.
- Unboxed text and imagery by default. A card only when a bounded object helps comprehension.
- Mobile is recomposed, not shrunk: stack logically, captions stay with their images, nothing hides behind hover.
- Deliberate overlap and poster-scale type are allowed where they serve the content, as long as essential text stays readable at 4.5:1. Never give a service category ("website", "campaign") display scale: category is a small label. Decorative rotated or vertical type is allowed; essential text never rotates.
- Never: overlap that compromises reading, endless identical card grids, ornamental numbering, fake print wear, or empty space that hides the offer.

## The hero

The built composition ("Aperture", revised 25 September 2026): the headline set large on paper across two lines, the second pushed right, stationary and uncrowded, nothing sharing its rows. Beneath it as one group: the credential line, a hairline rule, then the two links (**Start a conversation**, **See selected work**). Then one wide photograph beneath that. Under the photograph, a full band of paper carries the centred "what we do" statement.

- The headline stays the dominant element, stationary and readable before anything moves, with nothing else sharing its two rows.
- Credential line, then links, directly beneath the headline.
- The statement band is a section in its own right, not a leftover strip: "Tangible writing. Defensible arguments." (h2, Ethic, centred, two lines) with the supporting paragraph beneath it in graphite, `space-9` above and below.
- Imagery: someone with substantial work behind them at the moment just before making it public: purposeful, absorbed, expectant. Enough of the room to show the relationship between the person and their audience. Not desk photography, not a back-of-head portrait, not skyline contemplation.

### Hero motion

- One take on load: the frame opens from a letterbox and the image settles (≤ 4% scale), finished in under 5 seconds, then it holds. Because it stops within 5 seconds, no pause control is needed (WCAG 2.2.2). Anything longer or looping needs a visible, labelled 44px pause control.
- Removed entirely under `prefers-reduced-motion`.
- No typewriter effects, rotating words, montage, heavy parallax, scroll-controlled sequences, autoplay sound, custom cursors or intros.

## Photography

Images bring humanity to the site: people with presence, warmth and a point of view, never stock-polish or decorative design. Generated or photographed, the test is whether it feels human.

## Homepage architecture

1. **Opening**: the headline, standing alone; the credential line and "Start a conversation" / "See selected work" links directly beneath it (early reassurance, not a caption); the photograph; then the centred "what we do" statement band: "Tangible writing. Defensible arguments." (h2, serif) over the supporting paragraph that leads with what people come for (websites, pitches, launches) and for whom. A logo wall may follow later. Logos need a real basis, and the wall's label must say whether they are Protagonist Ink clients or brands Pat wrote for earlier in his career; never blur the two. Credential (Pat's individual career experience, kept distinct from Protagonist Ink client relationships; no logos without basis). Work appears early; no prolonged intro.
2. **Selected work** (the ink section): its heading is the "Case Studies" eyebrow alone above a hairline rule, then exactly three proof spreads of equal weight, no "featured" study and no list rows. Positioning is broad: the three should span founders, artists and brand teams. Each spread shows the work, not the world it lives in: a small engagement label; who it was for; **the line** (a finished piece of writing, set large in Ethic, the dominant element); **the call** (one or two sentences on what was noticed and decided, the proof of judgment); the **artifact** (the line in its finished setting: a homepage, a deck slide, a poster, drawn readable); and Assignment/Role. Sides alternate. Spec work is allowed while case studies are prepared, but every spec spread is labelled Spec and uses a description, never an invented client name. Engagement labels lead with what visitors arrive needing: Website, Pitch, Launch, Campaign; Rebrand stays available but lower. No invented projects, testimonials or metrics.
3. **What people bring you, and how it's carried through** (eyebrow: "How we work"): a short intro that starts from the deliverable, then the three stages as an ordered list that sits collapsed, like index cards stacked edge-on. Each card opens on a tab edge (a hairline top rule with short side stubs, `radius-frame` top corners) and tucks under the next, so only its number (01., 02., 03.) and the top of its name show; names are set large in Satoshi capitals. Hover (fine pointers) or keyboard focus opens a card; clicking, tapping, Enter or Space pins it open. Open, the description and what it becomes sit to the right of the name (below it on mobile) and the cards beneath make room. It eases open and shut (320ms, ease-out, no bounce), the site's one motion outside the hero; under `prefers-reduced-motion` it opens instantly. Without JavaScript every stage renders open. The numbers carry real order (the stages run in sequence), so they are content, not ornamental numbering. No diagram, no icons.
4. **The people**: Patrick and Amy, how the partnership works and what working with them is like. Never invent roles or credentials.
5. **Invitation** (on paper): an "Invitation" eyebrow label, matching the other sections; then "Bring us the (half-formed) version." as a standard statement headline (Ethic, upright, no italic aside), sized so the form sits beside it and the submit button is visible on arrival; a three-field form (name, email, a sentence about the project) with the red primary button; an email alternative.
6. **The Latest Ink** (on paper, after the invitation): the header as a standard statement headline (Ethic), centred over the row, then four posts in a row (two on small tablets, one on phones). Each post: a cover capped at 350px tall with `radius-frame` corners (a photograph, or a typographic cover in palette colours: paired punctuation on indigo or proof), a category chip on `proof` beside a Spec marker, the title in Ethic, then date and read time. Only the cover is bounded; the text sits unboxed beneath it. Below the row, a centred ink "Read more ink" button. Spec posts use bracketed titles and labelled placeholder covers until the journal exists; cards don't link until there are post pages, and the button points at `/ink/`, which doesn't exist yet.

## Components

- **Navigation**: Work, Approach, About, and an underlined "Start a conversation"; the wordmark links home. Below 900px: the wordmark and a Menu button that opens all four destinations (Escape closes it). The header must fit at 320px.
- **Buttons**: `radius-pill`, `nav` type, min 44px tall. Primary on paper: red fill, paper text, `red-press` on hover. On ink: paper fill, ink text. A secondary button on paper, when a link won't do (e.g. "Read more ink"): ink fill, paper text, indigo on hover, so red stays with the primary action. Other secondary actions are underlined text links. Focus: 2px `focus` ring, 3px offset (paper ring on dark).
- **Corners**: editorial with a little humanity. Framed surfaces set within the grid (photographs, post covers, case-study artifacts, the How we work tabs) take `radius-frame` (8px); small tags and fields `radius-soft` (2px); buttons are pills. Full-bleed photography stays square.
- **Inline links**: underlined, never colour alone.
- **Work entry (proof spread)**: line, call, artifact and facts read as one group; captions under the artifact; no hover-only information or carousels hiding proof.
- **Inquiry form**: visible labels, three fields (name, email, a sentence about the project) plus optional timing; helpful errors; a real success state only once delivery works.
- **Accessibility**: WCAG 2.2 AA target; semantic headings; keyboard access; descriptive alt text; text stays text.

## Open decisions

Ethic web licence; which projects and assets can be shown; supporting description, credential line and invitation copy; contact workflow and case-study destinations; the relationship to the personal writing site; The Latest Ink's real posts, covers, post pages and the `/ink/` index.
