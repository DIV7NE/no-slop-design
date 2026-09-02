# Gate 1 interview — exact questions

Ask with `AskUserQuestion`. One round per step. Skip any step the conversation already answers. Put the recommended option first and mark it "(Recommended)" only when the context genuinely points at one.

## Round 1 — situation

Question: "Are we working on something that already exists, or starting new?"
- Existing — there is UI/design already in this project
- New — nothing to inherit, greenfield

Skip this round only when the user literally said the project or site is new or existing, or a manifest and UI code are visibly present. "Make me a hero for my app" does not answer it: the app existing says nothing about whether its site exists. When in doubt, ask.

## Round 1b — interface type (always; one AskUserQuestion call with both questions)

Before asking, detect from the project manifest (never from UI code): package.json deps, pubspec.yaml, build.gradle, *.xcodeproj, *.csproj. Mark detected options "(detected)" and put them first. `AskUserQuestion` adds a free-text "Other" choice to every question automatically; that is where an unlisted platform or kind is named, and it triggers the discovery procedure in platforms.md.

Question A: "Which platforms are we designing for?" (multiSelect)
- Web — site, web app, or anything rendered in a browser (incl. Electron/Tauri renderer)
- iOS / iPadOS
- Android
- Desktop — Windows or macOS native

Question B: "What kind of interface?" (multiSelect)
- Marketing site or landing page — design is the product (brand register)
- App or product UI — screens people operate: apps, dashboards, tools, settings, onboarding (product register)
- Component or design system — reusable parts and tokens
- Print, graphics, or video — poster, deck, social, motion graphics

If both a marketing kind and a product kind are selected, the ledger carries both registers and each unit in Gate 4 is tagged with its register. If several platforms are selected, Track B/C research and the Gate 2b stack question run per platform, and the preview has artboards per platform. If the user picks "Other" for either question (a TV app, a watch face, an in-car screen, a kiosk, a CLI, an email, a deck, a game HUD), run the discovery procedure in platforms.md before Gate 2 and append what it finds; the process does not change, only its sources.

## Round 2a — existing: redesign or on top

Question: "What kind of change to what exists?"
- Evolve — keep the identity (mark, palette, art, voice) and rework the execution; I read the current UI and it becomes part of the bar (Recommended when you like what exists and want it better)
- On top of existing — keep the current design language; I read it first, then we change specific things
- Full redesign — fresh direction; I will NOT read the current UI code so the result isn't anchored to it
- Review only — a critique against research and competitors, no build

If **Evolve**, follow up: "Anything in the current identity you want dropped?" (free text; default: nothing).

If **Full redesign**, follow up in the same round or the next:
Question: "What survives the redesign?" (multiSelect)
- Logo and brand marks
- Colour palette and typefaces
- Copy / content
- Nothing — everything is up for change

## Round 2b — existing, on top: what changes

Question: "What do you want to change?" (multiSelect)
- Motion and interaction (animations, transitions, flows)
- Layout and structure
- Look and feel (colour, type, spacing, surfaces)
- Content and copy

Then, for each selected item, one specific follow-up if needed (e.g. motion: "Is anything currently moving that annoys you, or is it that nothing moves?").

## Round 2c — new: working mode

Question: "How do you want to approach the design?"
- Artistic freedom — I decide direction from the brief and research; you react to the preview
- Step-by-step interview — I ask about audience, tone, references, type, color, motion one round at a time and build from your answers
- Direction then checkpoints — you give 2–3 anchors (references, mood words, must-haves); I fill in the rest and check in at each preview

## Round 3 — constraints (always, unless known)

Question: "Anything fixed before I start?" (multiSelect)
- Brand assets exist (logo / palette / typeface) — I'll ask where they are
- Stack or framework is fixed — I'll ask which
- Accessibility, regulatory, or language/locale requirements apply — I'll ask which (UI language, number and date conventions, diacritics decide the font subset)
- There are 1–3 reference products/sites/apps you like — I'll ask for them

Follow up on each selected item with a free-text prompt ("Paste the references" / "Which platform and stack?").

## Round 3b — loop budget (Iteration tier and above; Micro is fixed at 2 rounds and is not asked)

The tier's default is the option marked "(Recommended)" and goes first: at Full and Evolve it is "3 rounds per unit + 2 smooth passes"; at Iteration it is "2 rounds per unit + smooth pass only if more than one section changed" (swap the labels accordingly).

Question: "How far should the build-critique loop run? Each critic round is roughly 4–8 minutes and 60–90k billed tokens per critic; a unit usually needs 2–4 rounds."
- "3 rounds per unit + 2 smooth passes (Recommended at Full/Evolve)" — Pros: catches the real bugs, bounded cost. Cons: some gaps get reported instead of fixed.
- "2 rounds per unit + 1 smooth pass (Recommended at Iteration)" — Pros: cheapest bounded loop. Cons: expect several reported gaps.
- "5 rounds per unit + 3 smooth passes" — Pros: closer to the bar. Cons: roughly double the cost of the default.
- "Unlimited — run until every critic passes or two rounds stop improving" — Pros: the original gauntlet. Cons: open-ended; the first live run took 9 rounds and 1 h 45 min.

## Round 3c — content inventory (always)

Question: "What real material exists for this?" (multiSelect)
- Photos of the place / people / work (or real data and screenshots, for a product) — I'll ask for them
- Reviews with names, brands, partners, certifications
- Logo, team, and story (who, since when, what they did before)
- Very little of the above — give me a shot list and content list to fill in

If the last option is chosen (or the others are thin), the deliverable includes the shot list and content list, and the preview carries labelled slots. Say plainly that the page cannot look alive until the slots are filled.

## Round 4 — type (Gate 2b, after research, always)

Publish a type-sheet artifact first: each of the 3–4 pairings rendered with the real headline, a paragraph, prices/numerals, a button, and the wordmark. Then ask:

Question: "Which type pairing?" — recommended first, each description: `<display> + <body>: what it says about the business in one line. Cons: one line.`

## Round 5 — stack decision (Gate 2b, after research)

One question per open layer, or one combined question if the layers are few. Asked even when the user said "whatever you recommend" — the recommendation goes first and they confirm it in one click. Options come from the ledger's STACK OPTIONS, capped at four per layer: the recommendation, up to two alternatives, and from scratch; further candidates stay in the ledger. Format each option exactly like this:

- label: `<option name> (Recommended)` for the one you recommend, first in the list
- description: `Pros: <one line>. Cons: <one line>. <Why recommended, if it is.>`

Example (motion layer, Next.js app, nothing fixed):

Question: "How should we build the motion?"
- "CSS transitions + View Transitions API (Recommended)" — Pros: zero dependencies, runs off main thread, reduced-motion is one media query. Cons: no spring physics, orchestration across components is manual. Recommended because the brief has only state-change motion and no scroll choreography.
- "Motion (framer-motion) 12.x" — Pros: springs, layout animation, exit animations solved. Cons: ~30 KB, React-only, its defaults are the 2024 fade-up look you'll have to override.
- "GSAP 3.x" — Pros: timeline control, ScrollTrigger, framework-agnostic. Cons: ~25 KB core plus plugins, imperative style in React needs cleanup discipline.
- "From scratch (Web Animations API)" — Pros: full control, no lock-in. Cons: you write easing, interruption handling, and reduced-motion handling yourself; roughly a day of work for what a library gives in an hour.

Always include a from-scratch option. Never present an option without both a pro and a con.

## Round 6 — theme (Gate 2b, always)

Question: "Light or dark?" — options carry the Track B evidence for this context, recommended first:
- "Light only (Recommended when …)" — Pros/cons from the research (e.g. daylight use, older readers, print-like content, WCAG contrast easier).
- "Dark only" — Pros/cons (e.g. low-light or long-session use, media-heavy, brand world is dark; cons: body-text contrast failures are the common slop, halation for astigmatic readers).
- "Both, light default" — Pros: respects OS preference. Cons: two palettes to design and test, double the contrast checks.
- "Both, dark default" — same, inverted.

The preview then renders the chosen theme regardless of the viewer's OS setting.

## Round 7 — images, decoration, video (Gate 2b, always)

Question 1: "Images?" — recommended first, with the research reason. In product register (apps, tools) the question is about imagery for empty states, onboarding, and illustrations: options are the product's own illustration style (drawn for it) / icon-only states / photography where the product has real things to show / none — and the flat "undraw-style" illustration set is a listed tell, not an option. In brand register, for any business with a place, people, or products the recommendation is real photographs:
- "Real photos — I will supply them (Recommended when they exist)" — Pros: the strongest trust signal there is; faces and the real room are what make it look like a real business. Cons: I need the files before Gate 4; I'll give you a shot list.
- "Generated custom art, art-directed from the subject's world" — Pros: backgrounds, illustration, textures, and hero art made for this product in one consistent style, via the installed image generator; right for products whose world is illustrated or imagined (a divination app, a game, a brand with a painted identity). Cons: never a substitute for photos of a real place or real people; must be directed with a written brief and checked for AI-image tells; costs generation rounds.
- "Unsplash placeholders" — Pros: the page looks complete for a demo. Cons: stock imagery is a listed template tell; every placeholder must be credited and listed for replacement.
- "Shot list and labelled slots, or no image slots" — Pros: nothing fake ships. Cons: looks unfinished until filled; no images at all is only right when there is nothing to show.

Several can apply (real photos of the shop plus generated textures). Generated art follows the art-direction brief in preview.md.

Question 2: "Drawn elements — SVG illustration, motifs, diagrams, animated line work?" (vector assets, SF Symbols, or VectorDrawable natively) — recommended first, from the subject material:
- "Yes, a motif system drawn for this subject (Recommended when the world has marks, objects, or diagrams)" — Pros: identity from the subject's own world, scalable, animatable, cheap to ship. Cons: each graphic must depict something real about the subject; generic blobs, waves, orbs, and sparkles are banned.
- "Yes, plus ambient or interactive motion on them" — Pros: the world moves the way it would (stars drift, embers rise, a card turns). Cons: must respect reduced-motion and stay off the main thread; motion that is not from the world is the fade-up cliché.
- "None — type, photography, and layout carry it" — Pros: nothing decorative to misjudge. Cons: less personality unless the type and images are already doing the work; a choice to be made for a reason.

Question 3: "Video?" — recommended first:
- "No" — Pros: fastest page, nothing autoplaying, nothing to fake. Cons: none for most pages.
- "Yes — I have real footage" — Pros: shows the real thing. Cons: must be muted, non-autoplay or reduced-motion aware, captioned, and under a few MB; I need the file before Gate 4.
- "Yes — reserve a labelled slot" — Pros: layout ready for footage later. Cons: an empty box until it arrives.

## Round 8 — direction pick (Gate 3, Full and Evolve tiers)

After the three direction thumbnails are published (see preview.md):

Question: "Which direction? (open the artifact to compare)" — the three directions as options, each described as `<name>: from <facet of the subject's world>; feels like <two phrases>. Risk: <one line>.` Recommended first with the reason.

## Step-by-step interview mode (if chosen in 2c)

One round per topic, in this order, each with 2–4 concrete options plus Other. Stop early if the user says "enough, go".

1. Audience and the one job the screen must do
2. Tone in three words (offer contrasting sets, e.g. "quiet, precise, expensive" vs "warm, direct, practical")
3. References — what they like and specifically what about it
4. Type: serif / sans / mono mix, size feeling (editorial large vs dense product)
5. Color: light/dark/both, one accent or none, warm or cool neutrals
6. Motion: none / functional only (state changes) / expressive within reason
7. Density: airy marketing vs dense tool
8. Anything they hate seeing on other sites/apps
