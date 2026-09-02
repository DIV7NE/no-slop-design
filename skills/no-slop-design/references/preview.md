# Gate 3 — direction and preview

## 0. UX first (product register)

Before any visual work on an app, dashboard, or tool: a **flow map** (screens as boxes, arrows for navigation, the entry points) and an **IA outline** (for each screen: its one job, its primary action, what it must show, its states — empty, loading, error, partial, success, denied/offline). Publish as a small artifact or a Markdown table and get it approved. Pixels on the wrong flow are wasted rounds.

## 1. Subject material and three directions (Full and Evolve tiers)

The direction must be derived from the subject, not from the catalog of what is safe. First write the **subject material** list (also in the ledger): the product's own art and illustration style, its real screens, its motifs and symbols, its genre's conventions, its voice, the place and people, the materials of its world. For Evolve, this list starts from the existing product.

Then produce **three directions** as cheap thumbnails — one artboard or a single scaled HTML frame each — where each is born from a different facet of that list. They must differ in type voice, palette logic, and composition. At Evolve tier all three keep the identity (mark, palette family, art style, voice) and differ in which facet of the world leads and how it is executed — a direction that drops the identity is not a candidate. None may be the house style (grotesk headline + italic serif accent word, cream band, one muted accent, tabular stats band, outline diagrams). For each: a name, two sentences on which facet of the world it comes from and what it would feel like, and one honest risk. Ask the user to pick with `AskUserQuestion` (options are the three directions; the one you recommend goes first with the reason).

Skip this step at Micro and Iteration tiers (the direction already exists in `DESIGN.md`).

## 1a. The element palette — nothing is off the table by default

Each direction states which elements it uses and why. All of these are welcome when they come from the subject's world, are executed with craft, and pass the same tests as everything else (belonging, no catalog tell, performance, reduced-motion, a11y): drawn SVG illustration and motif systems (marks, borders, diagrams, pattern fills, animated line drawings); generated art directed per §1b; photography; textures and grain that come from a named material; typography as image (display lettering, custom numerals, drop caps); ambient motion (slow parallax, drifting particles that depict something real — stars, embers, dust — not generic sparkles); scroll-driven reveals when the content is a sequence; hover and state micro-interactions; 3D or WebGL when the subject is an object or a space; video when real footage exists; interactive moments (draw a card, turn a page, read a palm) when the product is interactive. "None" is a choice made for a reason, not the safe default. The catalog bans *default* uses of these (fade-up on every section, floating blobs, sparkles for "AI"); it does not ban the elements.

## 1b. Generated art — directed like commissioned work

When the user chose generated art (Gate 2b), it is produced the way a studio commissions illustration, using the installed generator (`higgsfield-generate` skill; use its image-to-image and reference features for consistency). Before generating anything, write an **art-direction brief** into the ledger:

- **Style source:** which items of the subject-material list the art descends from (the product's existing art, its genre's visual tradition, a named medium — gouache, ink, woodcut, foil on black), and 2–3 reference images if they exist.
- **Locked palette:** the token colours the art must live in; nothing off-palette.
- **Set list:** every slot that gets art — hero ground, section grounds, textures, spot illustrations, empty states — with size, aspect, where type will sit over it (and therefore where the image must stay quiet), and what it must depict.
- **Consistency rule:** one style, one light, one medium across the set; generate the hero first, then use it as the reference for every other piece.
- **Negative list:** the AI-image tells from the slop catalog (over-rendered gloss, HDR, lens flare, symmetrical airbrushed faces, purple nebula gradients, generic fantasy, garbled text, extra fingers, watermark smears).

**Precondition:** before offering generated art in Gate 2b, check the generator is usable (`higgsfield auth status`, or a dry `higgsfield model list`); its login is interactive, so if it is not authenticated tell the user to run `! higgsfield auth login` themselves and offer the shot-list option meanwhile.

Per slot generate three candidates — three separate `higgsfield generate create` calls with the same brief and `--image` reference, saved as `.claude/art/<slot>-1.png`, `-2`, `-3` — pick one against the brief, copy it to the project's asset folder (e.g. `assets/art/<slot>.png`, then the responsive/AVIF variants), and record the prompt, model, reference, and chosen file in the ledger's CONTEXT NOTES under `## ART`. Every generated image is declared to the critic as generated (not as a placeholder — these ship, so coherence of the set and AI-image tells ARE graded). Generated art never stands in for a real place, real people, or the product's real screens.

## 2. The full preview

Build the chosen direction as a preview artifact: `design` skill canvas with artboards at real device sizes for apps (390×844, 412×915, tablet, 1440×900 desktop), HTML artifact at real widths for sites. Pinned to the theme chosen in Gate 2b — paint the background and every colour explicitly; never follow the viewer's OS. Second theme in its own frames only if both were chosen.

Contents: type and scale (from the chosen pairing), palette with section grounds and the measured ratios, the **section strip** (every section of the whole page as a scaled band showing its ground and main element) or **flow strip** (every screen of the flow), 1–3 key screens or sections at real proportions, motion described with durations and easings or prototyped, real copy from the copy deck, and the life budget below filled in.

## 3. Life budget (one list per register; every line names the element that satisfies it)

**Brand register**
- Photographs and art: how many, where, how large; at least one photo with a person above the fold for any business with people; the product's own art where it exists.
- **World / atmosphere:** the illustration, texture, custom art, or motif system that makes this page belong to this subject and no other — named.
- **Show the product:** real screens of the app or product on the page, in context, for any product that has one.
- Tonal rhythm: the sequence of section grounds; no two adjacent sections on the same ground unless an image separates them.
- Colour confidence: where the brand colour appears beyond the button.
- Brand devices: mark-as-pattern, badge, label, coloured rule — at least one used more than once.
- Density: real facts per viewport (names, numbers, places, brands, reviews); fewer than three is a wireframe.
- Secondary type voice: the pairing's second face doing real work.

**Product register**
- Real data at real density on every list, table, and card; never identical placeholder rows.
- States designed for every key screen with their copy: empty, loading, error, partial, success, denied/offline.
- Navigation model named and shown, matching the platform.
- Motion that explains navigation and state changes, with the platform's tokens.
- Platform fit: native controls, safe areas, target sizes, font scaling shown at a large setting.
- Identity: the product's own icon set, empty-state illustration style, colour system beyond the accent; semantic status colours separate from the brand accent.
- Density per screen: a screen that could belong to any app is a template.

## 4. Presenting

As an art director: the direction in two sentences, the three or four decisions that carry it and their reasons, what was rejected (the other two directions, the house style) and why. Then `AskUserQuestion`: approve / change specific things / different direction. Iterate the preview, never the project, until approved.
