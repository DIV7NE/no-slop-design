# Gate 4 gauntlet — build, blind critique, loop until the evidence passes

Adapted from Matt Shumer's Gauntlet Loop (see sources at the bottom). Three rules carry the whole thing:

1. The agent that built a thing never grades it.
2. A critic that saw a previous draft never grades the retry. Fresh critic, fresh context, every round.
3. The bar is concrete: reference exemplars and the approved preview, compared side by side against the real rendered artifact. "Make it look good" is not a bar.

## The bar

Set before the first build, written into the ledger under CONTEXT NOTES as `## BAR`:

- **Competitors:** captures of the 3–5 real sites, apps, or store listings in the same category and locale from Track B (`.claude/refs/<name>-tall.jpg` for the full page, `-desktop` and `-mobile` for viewports, as `capture.mjs` names them). Ugly or dated ones stay in — the customer compares against them, so the critic does too.
- **Reference exemplars:** the 3 gallery exemplars from Track D (and any Track B found), each tagged with the aspect it is a reference for (type, density, motion, copy voice, imagery placement). The critic's A/B must be at least even on each exemplar's aspect; exemplars never replace competitors.
- **The approved Gate 3 preview** and its filled-in **life budget**.
- **The ledger's BANNED and ALLOWED WITH SOURCE sections:** the rules.
- **The one job of each unit.**

Only when the product is genuinely novel (nothing comparable exists anywhere) may the bar be the interview record plus the approved preview plus the rules. "Nothing curated" is not "nothing comparable".

**Evolve tier:** the old product's captures are in the bar alongside the competitors, and the critic's first question is "is this recognisably the same product, and better?" — losing the identity is a FAIL even when the result is prettier.

**Review tier:** no build; the critic receives the existing product's captures, the competitor captures, and the ledger, and returns the same verdict format; the findings list, ordered by impact with what to change each element to, is the deliverable. For a live site without source, the audit runs on the fetched markup (`curl -sL <url> -o .claude/refs/<name>.html`, then `audit.mjs` on that file) and the accessibility checklist is measured through `capture.mjs --eval` (computed colours for contrast, focus order, alt text, target sizes) rather than ticked from local files. Multi-step flows are reached with `--eval` driving the forms.

**Micro and iteration tiers (working on top of an existing system):** the bar is the existing product itself — captures of the neighbouring screens or sections the change sits beside, plus the ledger rules. The critic's first question becomes "does this belong to the same product, and is it better than what was there?" (blind A/B against the before-capture when one exists). Competitor captures are added only when the change introduces a screen type the product did not have.

### Capturing the bar and the artifacts — headless only

All screenshots, of competitors and of the built page, are taken with `scripts/capture.mjs`, which runs the installed Chrome in `--headless=new` with a throwaway profile. Nothing opens on the user's screen. The Chrome extension and the chrome-devtools MCP both drive a visible browser and are NOT used for capture.

```
node ~/.claude/skills/no-slop-design/scripts/capture.mjs .claude/refs  https://competitor.example/ ... --all
node ~/.claude/skills/no-slop-design/scripts/capture.mjs .claude/rounds index.html --desktop --mobile
```

- The script uses `puppeteer-core` from the global npm root when present (`npm i -g puppeteer-core`; it drives the installed Chrome, no browser download) and falls back to the bare chrome CLI otherwise. With puppeteer-core: `--desktop` 1400×900, `--tall` a true full-page capture at 1400 wide (the page is scrolled once first so lazy images load), `--mobile` 390×844 with real device emulation, `--all` for the three, `--jpeg` for smaller files. The CLI fallback cannot emulate a phone (Chrome's minimum window is ~500px) and cannot run `--eval`. Local files are given as paths; `file://` works headless, so no local server and no iframe harness are needed. Add `<meta charset="utf-8">` to any page you build anyway.
- Per-unit artifacts: capture the whole page in desktop and mobile, then crop the unit's region with ImageMagick (`magick in.png -crop WxH+X+Y +repage out.jpg`) if the critic should see only that unit. Name files `.claude/rounds/<unit>-r<n>-<view>.jpg` so the round log points at stable paths.
- Popups on competitor sites are not dismissed; the `--tall` capture shows the page beneath them, which is enough for the bar.
- Interaction tests (a form's success and failure paths, a state change) run headlessly too: `--eval "<js expression>"` evaluates in the page after load and prints the JSON result — set values, `requestSubmit()`, await, return the DOM state. Example: `node capture.mjs .claude/rounds index.html --desktop --eval "(async()=>{const f=document.getElementById('f'); f.name.value='T'; f.requestSubmit(); await new Promise(r=>setTimeout(r,3000)); return {failed: !document.getElementById('failed').hidden}})()"`.

### Placeholders and camera-only gaps

When any image on the page is a placeholder (stock, Unsplash, a labelled slot), the critic is told which ones, in the prompt. The critic then grades layout, type, colour, copy, states, and the placement and size of imagery — not whether the placeholder photographs cohere as one real place. Gaps that only a real photograph can close ("the two ovens are different ovens", "nothing shows the 430 °C claim") are recorded once in the round log and the shot list, and are excluded from later rounds' PASS criteria; a critic naming them again is not a new finding. Two further rules for placeholder pages: a caption may describe only what is in the frame, and copy may never assert a specific thing a placeholder cannot show.

### Accessibility checklist (per unit, per platform)

Ticked in the round log before the critic runs. Web: contrast measured (4.5:1 text, 3:1 UI), visible focus on every operable element, logical tab order, labels on every input, name/role/state on custom controls, target ≥ 24 px (44 px preferred), reduced-motion honoured, no content lost at 200 % zoom or 320 px width, alt text that says what the image shows. iOS: Dynamic Type through the largest accessibility size, VoiceOver labels and traits, 44 pt targets, reduced-motion and reduced-transparency respected, no colour-only meaning. Android: 48 dp targets, TalkBack content descriptions, font scaling to 200 %, focus order, predictive back. Desktop: full keyboard operation, visible focus, high-contrast mode, screen-reader names on every control.

### Process never appears on the page

Reasoning about the design ("a list, because that is what it is", "we do not round these up", "not a grid") is not copy. The copy scan flags it; the critic's rules check flags it; it is removed before the next round.

## Units

Split the build into the smallest pieces that can be graded on their own: one screen, one section, one component state set, one animation. Each unit is built, rendered, critiqued, and fixed on its own before the next one starts.

## Round protocol (per unit)

1. **Build** the unit. Render it where it runs. Capture screenshots at real proportions (and a short recording or frame sequence for motion). Do not write a self-assessment, and do not `Read` the screenshots yourself beyond one spot-check that the capture is not blank — the critic is the eye, and every image you view costs the main context.
2. **Run `scripts/audit.mjs`** on the unit's files. Fix hits or match them to ALLOWED WITH SOURCE.
3. **Dispatch a fresh critic** (`Agent`, general-purpose, never a fork, never a reused agent). The critic receives ONLY: the unit's job, the bar (reference screenshots, preview screenshot, BANNED/ALLOWED sections), and the artifact (screenshots, and the URL or file to open if it can render it). It does NOT receive: your reasoning, the code diff, the previous round's verdict, or the round number.
4. **Critic returns** a verdict in the fixed format below. PASS requires evidence; FAIL requires specific fixes.
5. **FAIL → fix exactly the named gaps**, re-render, go to step 2 with a new critic.
6. **PASS → record and move to the next unit.**

## Critic prompt (verbatim template)

```
You are a hostile design critic with fresh eyes. You have never seen this project before.
Platform and register: <web / iOS / Android / Windows / macOS / cross-platform> · <brand / product>.
Unit under review: <one sentence: what it is and the one job it must do>.

The bar:
- Reference A (<aspect>): <path>
- Reference B (<aspect>): <path>
- Approved direction: <preview path — or, at micro/iteration tiers with no preview, "none; DESIGN.md governs" plus the neighbouring-screen captures>
- Rules: <paste BANNED and ALLOWED WITH SOURCE sections>

Placeholders: <list the images that are placeholders, or "none">. Grade placement and size of imagery, not whether placeholder photos cohere as one real place.
Real assets: <list the real photographs, the product's own art, and real product screens, or "none">. These are the strongest material on the page: grade whether they are given the size and placement that material deserves.
Generated art: <list the images that were generated, or "none">. These ship: grade whether the set reads as one hand and one world, whether it belongs to this subject, and whether any AI-image tells are visible (over-rendered gloss, HDR, lens flare, airbrushed symmetrical faces, purple nebula gradients, garbled text, extra fingers). Any tell is a named fix.

The artifact: <screenshot paths; URL or file path to open if you can render it>.

Do this, in order:
0. (Evolve, micro, and iteration tiers) Belonging: compare the artifact to the existing product's captures. Does it read as the same product — mark, palette, art, type, control styles, voice? Is it better, and in what? One sentence each. For Evolve, a result that is prettier but no longer recognisably this product is a FAIL.
1. Competitor A/B (Full tier, or when competitor captures are supplied): for each competitor capture, answer "as a customer, which of these two looks like a real business I would trust with <the job>?" — competitor or artifact — and why, in one sentence. Then, for each reference exemplar, which is stronger on its aspect. Do not assume the artifact is worse; do not reward emptiness as cleanliness.
2. AI-slop check: rate 1–5 how likely the artifact was generated by an AI with default taste. Name the era or template it most resembles — including the sparse-minimal cluster (hairlines, mono labels, one accent, no photos) if that is what you see. List the three strongest tells, each tied to a visible element.
3. Liveliness: rate 1–5 how alive it looks. Brand register: like a real place with real people and a personality (5) or a wireframe with good type (1) — name what carries it or what is missing: photographs of people/place or the product's own art, a world/atmosphere that belongs to this subject only, the product itself shown on the page, tonal rhythm between sections, colour used with confidence, brand devices, density of real facts, a secondary type voice doing real work. Also name the house style if you see it: grotesk headline with an italic serif accent word, cream band, one muted accent, tabular stats band, outline diagrams — that is a generated default, not taste. Product register: like a product people use every day, with real data at real density, designed states, platform-native navigation and motion, and its own identity (5) or a template dashboard/app shell with placeholder rows (1).
4. Wireframe test: imagine every text block as grey bars. Does what remains still look like this specific business (brand register) or this specific product with its data shapes, navigation, and states (product register), or like a layout template? One sentence.
5. Rules check: list every visible violation of BANNED not covered by ALLOWED WITH SOURCE, with the element.
6. Job check: can a first-time user do the unit's one job within a few seconds? What gets in the way?
7. Verdict: PASS or FAIL.
   PASS only if: preferred over at least half the competitors, at least even on every reference aspect, slop ≤ 2, liveliness ≥ 4, wireframe test passed, no rules violations, job check clear.
   FAIL must list the specific fixes, ordered by impact, each naming the element and what to change it to — including what to ADD, not only what to remove.

Judge only what you can see in the artifact. Never grade effort, intent, or explanations.
```

## Stop criteria (per unit and overall)

The loop ends when ANY of these is true:

- Every unit has a PASS from a fresh critic.
- Two consecutive rounds on the same unit produced no improvement against the bar (same tells named twice). Stop, record the gap, tell the user.
- The user's budget is spent. The budget is always asked in Gate 1 (Round 3b); the recommended default is 3 rounds per unit and 2 smooth passes. When it runs out, apply the free fixes from the last verdict, record what is still below the bar, and report — never silently continue.

Never stop at a round count you chose yourself; stop at the one the user chose. Within the budget, run longer than feels necessary.

## Smooth pass

After every unit passes, one final fresh critic reviews the assembled whole with the same prompt (unit = "the whole page / flow", job = the product's job). Pieces improved separately drift apart; this catches the seams.

## DESIGN.md — the record that outlives the run

A Full or Evolve run ends by writing `DESIGN.md` at the project root (and updating it on later runs). It is what Micro and Iteration tiers read first, and what other design skills (impeccable reads a DESIGN.md) start from. Contents, in tables where possible: identity (mark, art style, motifs, voice, what survives any change); tokens (colours with measured ratios, section grounds, type pairing and scale, spacing, radii, motion durations and easings); ALLOWED BY IDENTITY and ALLOWED WITH SOURCE, each with its justification; FORBIDDEN for this product (the BANNED patterns that matter here, plus anything the user rejected); the navigation model and states (product register); the shot list and open gaps; the date and the ledger it came from.

## Round log

Keep `.claude/no-slop-design-rounds.md` in the project, updated after every round:

```
| round | unit | verdict | slop score | tells named | fixes applied | artifact |
```

The final report to the user includes: the bar (what was compared against), the round log, the PASS evidence for each unit, and what is still below the bar.

## Sources

- Matt Shumer's original method as summarized at https://somethingbig.ai/gauntlet-loop — separate builder and critic, concrete bar, blind A/B, no arbitrary round count, critic inspects the real artifact.
- Skill adaptations: https://github.com/trilwu/gauntlet-loop-skills (set bar & budget → split → build → critique → fix → smooth; stop on two no-improvement rounds; progress log) and https://github.com/NicholasSpisak/gauntlet-loop (fresh critic per retry so it grades the bar, not the improvement; human gates the loop cannot override).
- Known flaw and fix: https://daily.dev/posts/the-new-gauntlet-loop-has-a-flaw-this-claude-skill-just-fixed-it-2u5yvngy5 — without a real reference the critic invents a standard; a settled spec from a planning interview becomes the bar instead.
