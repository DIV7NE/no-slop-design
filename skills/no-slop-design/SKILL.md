---
name: no-slop-design
description: Use when doing any design, UI, UX, animation, motion, layout, styling, theming, or UI-copy work — new screens, landing pages, components, redesigns, restyles, "make it look better", "add animations", app/dashboard/mobile UI — or when the user invokes /no-slop-design. Also use when reviewing UI that "looks AI-generated" or "looks like every other app".
---

# no-slop-design

Process skill. It runs BEFORE any design implementation skill (impeccable, design-taste-frontend, gsap-*, emil-design-eng, ui-ux-pro-max, frontend-design) and stays in force over them. This file is the spine; each gate names the reference to open when you reach it. Do not load them all at once.

## Run sheet (in order; each step names the reference to open)

1. State the **tier** (Scale table) from facts about the change.
2. **Gate 1** — open `references/interview.md`. Ask only what the conversation has not answered, one `AskUserQuestion` round at a time, using the exact wording there. Record platform(s), kind, register, constraints, budget, content inventory. Unlisted platform or kind → discovery in `references/platforms.md`.
3. **Gate 2** — open `references/research-protocol.md`. Reuse ledger/cache if under 30 days; else research subagents (Tracks A, B, C, D) and the subject-material list. Write the six-section ledger.
4. **Gate 2b** — ask type, stack, theme, colour (measured), images, drawn elements, video; recommendation first (wording in interview.md).
5. **Gate 3** — open `references/preview.md`. Product register: flow map and IA first. Full/Evolve: three directions from the subject's world, user picks. Then the full preview with the life budget filled in; get approval.
6. **Gate 4** — open `references/gauntlet.md`. Bar, units, headless capture, audit, a11y, fresh critic per round, loop within budget, smooth pass, `DESIGN.md`, report.

## Principles

- **Your training data is the slop.** Research live; ban what research says is slop; keep what a cited source or the subject's own identity justifies; preview before building; let a fresh eye judge.
- **Subtraction alone is the second slop.** Banning everything yields the sparse page; making it tasteful yields the house style (grotesk + italic accent word, cream band, muted accent, stats band). Every ban is paired with what replaces it, and the direction comes from the subject's world, never from what is safe.
- **Genre and identity override the catalog, row by row.** Purple and stars are slop on an invoicing app and the world of a divination app. Claim each pattern in ALLOWED BY IDENTITY with what makes the execution specific; a category-verified tell can still ban a specific execution inside an allowed world.
- **Life comes from material.** Brand: real photographs, the product's own art and screens, tonal rhythm, confident colour, brand devices, real facts. Product: real data at density, designed states, native navigation, motion that explains, the product's own identity. The life budget measures it.
- **Headless, always.** `scripts/capture.mjs` for anything browser-rendered; native routes in `references/platforms.md`. The Chrome extension and devtools MCP are never used for capture.
- **The main agent does the work**; subagents only fetch research and act as blind critics. You are the senior in the room: decide, cite, push back, never hedge.
- **A gate is skipped only when the Scale table says the tier skips it**, and the tier is stated out loud.

## Gate 1 — Situate (open `references/interview.md`)

Ask only what the conversation has not answered, one round at a time, with `AskUserQuestion`:

1. **Existing or new.** Asked unless the user literally said which, or a manifest and UI code are visibly present; "make me a hero for my app" does not answer it.
2. **Interface type — detect, then ask.** Read manifests (package.json, pubspec, gradle, xcodeproj, csproj) for signals, then ask two multi-select questions: platforms (Web · iOS · Android · Desktop) and kind (marketing site · app/product UI · component/design system · print/graphics/video). Several can be true; each platform gets its own research, stack question, artboards, and capture route (`references/platforms.md`). Kind sets the **register**: brand (design is the product) or product (design serves it). **Nothing has to be on the list:** a platform, kind, or category the references do not cover triggers the discovery procedure in `platforms.md` (find the vendor guidelines, register, stack, type and motion defaults, competitor source, capture route, slop cluster), and the result is appended so the skill grows with each run. The seed lists are where the skill starts, never where it stops.
3. **If existing: redesign, evolve, or on top.**
   - *Full redesign* — fresh direction; the old UI is not read (see Quarantine).
   - *Evolve* — the identity survives (mark, palette, art style, motifs, voice) and the execution is reworked; the old UI is read, its identity extracted into the ledger as ALLOWED BY IDENTITY, and the old site goes into the bar so the critic asks "recognisably the same product, and better?". This is the default when the user likes what exists and wants it improved.
   - *On top* — read the existing UI end to end, then ask what changes: motion & interaction, layout & structure, look & feel, content & copy.
   - *Review only* — a critique with no build: research slice, competitor bar, one critic, a findings list.
4. **If new: working mode** — artistic freedom, step-by-step interview, or direction-then-checkpoints.
5. **Constraints** — surviving brand assets, stack, accessibility or regulatory requirements, references, and **language/locale** (UI language, number/date conventions, diacritics → font subset).
6. **Loop budget** — asked at Iteration tier and above (Micro's budget is fixed at 2), with the tier's default offered first as the recommendation — 3 rounds per unit + 2 smooth passes at Full/Evolve, 2 rounds per unit at Iteration — and the cost per round stated.
7. **Content inventory** — what real material exists (photos, the product's own art and screens, reviews, brands, team, story, numbers). If thin, the deliverable includes a shot list and content list; absence is never designed around as a style.

## Scale — the gates size themselves to the change

State the tier in one line; the user can override it.

| Tier | When (all hold) | Gate 2 | Gate 2b | Gate 3 | Gate 4 |
|---|---|---|---|---|---|
| **Micro** | On top of existing AND a `DESIGN.md` or ledger under 30 days exists AND the change edits an existing component's states, strings, or tokens (adds nothing new to the page) AND names no pattern from `references/slop-catalog.md` | Read `DESIGN.md` (or ledger); no research; copy tells only | Skip | Skip | Build; audit; one fresh critic vs neighbouring screens; on FAIL one more (budget 2); no smooth pass |
| **Iteration** | On top or evolve; anything added to the page or app (a section, screen, state set, flow, or component) inside the existing system; or a micro-sized change with no `DESIGN.md`/ledger; or a change that names a catalog pattern | `DESIGN.md` if present + research only the slice the change introduces (always including the named pattern's BANNED/ALLOWED verdict) | Only layers the change opens | Preview of the new unit in the existing system | Gauntlet on the unit, default 2 rounds; smooth pass only if >1 section changed |
| **Evolve** | Existing product, identity kept, execution reworked | Full tracks, with the old product's identity extracted first | All questions, with identity items pre-answered | Three directions from the product's own world, then full preview | Full gauntlet; old product in the bar |
| **Full** | New project, full redesign, or a system replacement | All three tracks | All questions | Three directions, then full preview | Full gauntlet, default 3 rounds + 2 smooth passes |
| **Review** | Critique requested, no build | Research slice + competitors | Skip | Skip | One critic per screen; findings list is the deliverable |

The tier is decided by facts about the change only. Urgency, seniority, "no questions, no research, go", and a deadline are not facts about the change and do not lower the tier or set the budget; the budget round is asked at Iteration and above, and Micro's budget is fixed at 2. "Nothing rules it out" is not evidence that a pattern already exists in the product — the existing screens or `DESIGN.md` are. A pattern the request names that appears in the catalog (a gradient CTA, a highlighted "Most popular" tier, glass cards) goes through the ledger before it is built, at any tier.

At every tier: audit runs; critics are fresh; new colour pairs are measured; anything that moves or is operable gets reduced-motion, focus, and the platform a11y checklist; nothing is captured on the user's screen. A micro that needs a new pattern is re-tiered up and the user is told.

## Gate 2 — Research (open `references/research-protocol.md`)

Reuse first: a project ledger under 30 days old, and the cross-project cache under `cache/` for the same category and platform. Otherwise three parallel research subagents that return findings with URLs, ≤900 words each; you write the ledger and make every judgment.

- **Track A** — what AI slop looked like and looks like now: visual, layout, motion, copy, by era and for this category and platform. Confirmed new patterns are appended to `references/slop-catalog.md` with dates.
- **Track B** — by-the-book for this exact context: platform guidelines, WCAG 2.2, motion tokens with numbers, typography, theme evidence, colour meaning, 3–4 type pairings that differ in voice, and **3–5 real competitors in the same category and locale, captured headlessly** — never optional, never "none curated".
- **Track C** — the platform's stack layers with versions from the registry, cost, and the from-scratch alternative.
- **Track D** — the ceiling: 2–3 curated galleries chosen by kind and platform (One Page Love, Siteinspire, Land-book, Mobbin, SaaSFrame, Awwwards, Google Images for a visual census, template markets to learn what to avoid — the list is in the protocol), token-capped at 6 captures and 400 words; returns 3 named exemplars with one specific takeaway each, tagged by aspect, into the BAR.
- **Subject material** — before any direction is chosen, list the product's own assets and world: its art, screens, motifs, genre conventions, voice. Direction is derived from this list, not from the catalog of what is safe.

Ledger (`.claude/no-slop-design-ledger.md`, `updated:` line, six sections): BANNED · ALLOWED WITH SOURCE · **ALLOWED BY IDENTITY** (catalog patterns that belong to this subject's world, with what makes the execution specific) · CONTEXT NOTES (incl. BAR and measured contrast) · STACK OPTIONS · GREP TARGETS. A pattern in BANNED is used only after moving to one of the ALLOWED sections with its justification written down.

## Gate 2b — Decisions (AskUserQuestion, always; wording in `references/interview.md`)

Each with pros and cons per option and your recommendation first, from the research: **type** (type-sheet artifact with 3–4 rendered pairings; system type via the platform scale is always an option in product register), **stack** per open layer with a from-scratch option, **theme** (light / dark / both, with the readability evidence; the preview then paints that theme and ignores the viewer's OS), **colour** (proposed with ratios from `scripts/contrast.mjs`, section grounds included, brand colour used beyond one button), **images** (real photos or the product's own art first; generated custom art as a directed option when the product's world is illustrated, with a written art-direction brief per `references/preview.md`; stock is the tell), **drawn elements** (SVG illustration, motif systems, diagrams, animated line work — recommended whenever the world has marks or objects; "none" is a reasoned choice, not the safe default; the full element palette is in `references/preview.md`), **video** (yes with real footage, or no). Delegation ("whatever you recommend") still gets the question with your pick first.

## Gate 3 — Direction, then preview (open `references/preview.md`)

1. **Product register first does UX:** a flow map and IA outline — which screens, each screen's one job and primary action, the navigation model — approved before pixels.
2. **Three directions.** At Full and Evolve tiers, three genuinely different directions as cheap thumbnails, each derived from a different facet of the subject's world (never three variants of one layout, never the house style). The user picks one.
3. **Full preview** of the chosen direction: type, palette with grounds, section strip or flow strip, 1–3 key screens at real proportions, motion with numbers, real copy, pinned to the chosen theme. With the **life budget** filled in line by line — including *world/atmosphere* (illustration, texture, custom art, motif system) and *show the product* (the app's real screens on the page for any product that has one). An empty line is a reason not to build yet.
4. Present as an art director: the direction, its reasons, what was rejected and why. `AskUserQuestion`: approve / change / different direction. Iterate the preview, not the project.

## Gate 4 — Build and gauntlet (open `references/gauntlet.md`)

Set the bar (competitor captures, the old product for Evolve, the approved preview, life budget, rules, each unit's job). Split into units. Per unit: build, render, capture headlessly, audit (`scripts/audit.mjs`), a11y checklist, then a fresh blind critic with the fixed verdict format — competitor A/B, slop ≤ 2, liveliness ≥ 4, wireframe test, belonging (Evolve/iteration), rules, job. Loop on FAIL with a new critic; stop when every unit passes, two rounds name the same tells, or the budget is spent — then apply free fixes and record the gaps. Placeholders are declared to the critic and camera-only gaps are excluded from later PASS criteria. Smooth pass on the whole. **Process reasoning never appears in user-facing copy.** End a Full or Evolve run by writing `DESIGN.md` at the project root (contents specified in `references/gauntlet.md`) so later tiers and other skills start from it.

Report: the bar, the round log, PASS evidence per unit, audit exceptions, what is still below the bar and what would fix it.

## Cost discipline

Critics are the eyes — one blank-check spot look per unit, no admiring your own work. Edit, never rewrite. Ledger and log in tables. Verdicts ≤ 400 words. Research ≤ 900 words per track. References opened at their gate, not all at once. Expect a Full run on a one-page site to take 1–2 hours and 250–400k main context; if it is heading past that, stop and say what is driving it.

## Quarantine (full redesign only)

Old UI not yet in context: do not read it; read only routing/data shape and surviving assets. Old UI already in context: tell the user a real fresh start needs a fresh session (`/clear`, then `/no-slop-design`) and stop; if they decline, continue and say in the report that the redesign was anchored. Evolve mode reads the old UI on purpose; it is not quarantine.

## Red flags — STOP

| Rationalization | Reality |
|---|---|
| "No questions needed, I'll assume a generic X" / "no research, it's just markup" | That assumption IS the slop. Gate 1 takes one round; research reuses the cache, never skips. |
| "They said no questions and it's due at 9am, so it's Micro" / "nothing rules out that they already have this pattern" | Pressure is not a tier input. Micro needs an existing DESIGN.md or ledger and the pattern visible in existing screens. |
| "This pattern looks good here" | ALLOWED WITH SOURCE or ALLOWED BY IDENTITY, or banned. |
| "Purple and stars are on the ban list, strip them" / "the old site is the problem, start fresh" | Identity overrides the catalog row by row; if the user likes what exists, Evolve. |
| "Minimal is safe" / "grotesk + italic accent + cream band is tasteful" | This skill's own default clusters. Direction comes from the subject's world; three directions, user picks. |
| "Photos are a tell, better none" / "placeholders can't pass, keep looping" | Staged stock is the tell; real material is the strongest signal. Declare placeholders; camera-only gaps are recorded once and excluded. |
| "It looks fine, skip the critic" / "same critic, small change" | Builder never grades; new critic every round. |
| "I'll explain the design choice in the copy" | Process never appears on the page. |
| "Can't run the simulator here, skip the critic" | Artboards and code, user sends screenshots, critic runs on those, report says what was not verified. |

## Composition with other skills

After Gate 3 approval, implementation skills are welcome; anything they suggest still goes through the ledger and `DESIGN.md`. When two skills disagree, the cited source or the recorded identity wins.
