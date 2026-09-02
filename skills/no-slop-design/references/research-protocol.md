# Gate 2 research protocol

## Reuse before research

1. **Project ledger** `.claude/no-slop-design-ledger.md` (or the older `.claude/design-no-slop-ledger.md`) under 30 days old → reuse; refresh only Track A's current-year slice and Track C's versions.
2. **Cross-project cache** `<skill dir>/cache/<platform>-<category-slug>.md` (e.g. `web-restaurant.md`, `android-expense-tracker.md`) under 30 days old → copy its BANNED, ALLOWED WITH SOURCE, type candidates, and STACK OPTIONS into the new ledger, then run only the locale-specific part of Track B (competitors in this city, this language) and the subject-material step. After any full Track A/B/C run, write or update the cache file with the same sections and an `updated:` line, minus anything project-specific (competitors, subject material, identity).
3. Otherwise, full research below.

## Subject material (always, before any direction)

Write the list that the direction will be derived from: the product's own art and illustration style, its real screens, its motifs and symbols, its genre's visual conventions and what its audience expects to see, its voice, the place and the people, the materials of its world. For Evolve tier, extract this from the existing product first and put what survives into ALLOWED BY IDENTITY. The catalog decides what is default; this list decides what is *this product*.

## Tracks

Four tracks, run in parallel, each as its own subagent with `WebSearch` and `WebFetch` (and `last30days` when installed, for what designers are complaining about this month). Each track returns findings with URLs. Findings without a URL are guesses and are labeled as such in the ledger.

Time-box: 10–15 minutes of agent work per track. Depth matters less than currency: a 2026 thread saying "every generated app now looks like X" outranks a 2023 article.

## Track A — AI slop, then and now

Goal: a dated list of what generated design looked like in each era and what it looks like right now, in visuals, layout, motion, and copy. Then narrow to this project's category.

Generic queries (run several, vary wording):
- `AI generated website look` / `AI generated landing page cliches`
- `"AI slop" UI design` / `"AI slop" web design`
- `every AI generated app looks the same` / `v0 lovable bolt generated app look same`
- `ChatGPT website design tells` / `signs a website was made by AI`
- `linear style dark mode template overused` / `bento grid overused`
- `AI generated marketing copy tells` / `words AI uses in headlines`
- `AI UX writing sounds like AI` / `microcopy AI tells`
- `AI generated animation cliches scroll fade` / `framer motion fade up everywhere`
- `<current year> web design trends dead` / `<current year> design cliches to stop`

Category-specific (substitute the project's category and platform):
- `AI generated <category> dashboard look`
- `<category> app design cliches <current year>`
- `<platform> app looks like every other app`

For each finding record: pattern, era (year range), medium (visual / layout / motion / copy), source URL, and a literal grep target where one exists (e.g. `from-purple-`, `backdrop-blur`, `animate-pulse`, `rounded-2xl`, `Streamline`, `Effortlessly`).

Also fetch the seed list in [slop-catalog.md](slop-catalog.md) and mark each entry confirmed, outdated, or unverified.

## Track B — by-the-book best practice for this exact context

Goal: cited rules that decide what stays. Primary sources only.

Always:
- Platform guidelines for the target platform: Apple Human Interface Guidelines, Material Design 3, Microsoft Fluent 2, GOV.UK Design System / USWDS for public-sector, Web Content Accessibility Guidelines 2.2.
- Nielsen Norman Group heuristics and articles for the specific component (forms, tables, navigation, empty states, onboarding).
- Motion: the platform's motion section (durations, easings, reduced-motion), plus one practitioner source with numbers (e.g. Emil Kowalski's writing, Material motion tokens). Record actual milliseconds and easing curves.
- Typography: modular scale, measure (45–75 characters), line-height rules, from a primary source (e.g. Butterick's Practical Typography, platform type ramps).
- Color and contrast: WCAG 2.2 ratios (1.4.3 text 4.5:1 / large 3:1; 1.4.11 non-text 3:1), platform semantic color guidance, and colour for THIS context: what palettes the category's respected products use and why, what the audience reads as trustworthy, what the candidate accent means (safety, warning, sale, luxury) in the local culture. Every proposed palette is then run through `scripts/contrast.mjs` and the ratios go in the ledger. A colour choice without a reason and a measured ratio is a default, and defaults are the slop.
- Imagery and decoration: whether the category's respected products use photography, illustration, or neither; whether stock imagery is a tell in this category (it usually is); what decorative graphics, if any, come from the subject's own world. Output feeds the Gate 2b images and decoration questions.
- Theme: light vs dark for this audience and environment — readability research (NN/g dark mode article, legibility studies on polarity), platform guidance on when dark is appropriate, and what the category's well-regarded products do. Output is a recommendation with reasons, not a default; the user chooses in Gate 2b.

Category-specific:
- **Competitors, mandatory:** 3–5 real businesses or products in the same category and locale, found with the searches a customer would use (`<category> <city>`, `<service> <city> cenik`, the local language). Capture each headlessly — never in the user's visible browser: `node ~/.claude/skills/no-slop-design/scripts/capture.mjs .claude/refs <url> [...] --all` gives desktop, tall (full-page approximation), and mobile PNGs per site with nothing appearing on screen. Read the fonts from the page's CSS with `WebFetch` (or `curl` the HTML and grep `font-family`) rather than a live `getComputedStyle`. For each write: what carries the life (photos of people/place and where, colour blocks and their sequence, density of facts, brand devices, voice of the copy), what is dated, and one thing to take. These captures are the Gate 4 bar; they are never optional and never replaced by "no curated references found".
- 3–5 well-regarded products in the same category from curated sources (`best <category> design <current year>`, award sites, designer discussion), if they exist. Note what specifically is worth taking — not "looks clean".
- Warning: a product that everyone copies is itself a slop source now (Linear, Stripe, Vercel, Apple marketing pages). Take the principle, never the look.
- **Type candidates:** 3–4 pairings that differ in voice and fit the subject's world, with a one-line reason each and where the faces come from (Google Fonts for previews; self-host in production). For a workshop that might be a condensed industrial grotesk + humanist body, a slab + grotesk, a wide grotesk + system, an italic heavy display + neutral body. Not four neutral grotesks. Not Inter, not Space Grotesk.
- **Life extraction:** across the competitors and references, list concretely what makes the good ones feel alive — usually photographs of people and the place placed large and early, alternating section grounds, a brand colour used in headlines and bands, a repeated brand device, and real numbers/names/reviews everywhere. This list feeds the preview's life budget.

For each finding record: rule, source URL, and the condition under which it applies.

## Track C — best approaches, frameworks, and libraries

Goal: for each layer of the build, the current real options, so Gate 2b can present a from-scratch vs library choice with honest pros and cons and one recommendation.

Layers (skip a layer the user has fixed):
- Component approach: hand-rolled / headless primitives (Radix, React Aria, Base UI, Ark) / styled kits (shadcn, MUI, Mantine, Chakra) / platform native (SwiftUI, Jetpack Compose, WinUI).
- Styling: plain CSS + custom properties / CSS Modules / Tailwind / vanilla-extract / StyleX / CSS-in-JS.
- Motion: CSS transitions & `@starting-style` & View Transitions / Web Animations API / Motion (framer-motion) / GSAP / Rive or Lottie for vector animation / platform native animation APIs.
- Icons and type: icon sets (Lucide, Phosphor, Heroicons, custom), variable fonts, self-hosting vs font service.
- Charts, tables, forms where relevant.

Queries:
- `best <layer> library <current year> <framework>` / `<library A> vs <library B> <current year>`
- `state of css <current year>` / `state of js <current year>` results for the layer
- `<library> maintenance status` / npm page for last publish date and weekly downloads
- `<library> bundle size` (bundlephobia or the package's own docs)
- `why we moved away from <library>` / `<library> regrets` for the cons nobody advertises
- Use `context7` (if available) to confirm current version and API of any library you intend to recommend.

For each option record: name, version, source URL, install cost (KB, dependencies), what it gives you for free, what it locks you into, how much its default look is itself a slop source, and the from-scratch alternative with its real cost (hours, a11y work you must do yourself). Then write ONE recommendation per layer with the reason in one sentence.

Version, bundle size, and maintenance facts come from the package itself: the npm page or registry JSON (`https://registry.npmjs.org/<pkg>/latest`), the project's own docs or changelog, bundlephobia for size. Comparison blogs and "X vs Y" listicles are for finding candidates and cons, never for numbers.

## Non-web contexts

The queries above are web-first. Adjust the sources, not the process — per-platform guidelines, stack layers, type and motion defaults, competitor sources, capture routes, and slop clusters are in [platforms.md](platforms.md). For apps, the competitors are the App Store / Google Play listing pages: capture with `scripts/capture.mjs --tall` and crop the screenshot carousels; Track A adds `AI generated <platform> app look` and the app-UI section of the slop catalog. Motion graphics, video, and print take motion-design or typographic fundamentals as Track B and the generator-default tells as Track A.

## Track D — inspiration galleries (the ceiling)

Competitors set the floor: what a customer will compare against. Track D sets the ceiling: the best work in the category and platform, from curated galleries. One research subagent, token-capped: ≤ 3 galleries read, ≤ 5 headless captures (of exemplar sites, not galleries), ≤ 400 words back. Pick the galleries by kind and platform — never all of them:

| Kind / platform | Pick 2–3 of |
|---|---|
| Landing page, one-pager, marketing site | One Page Love (onepagelove.com, tag or search page), Land-book (land-book.com), Lapa Ninja (lapa.ninja), Siteinspire (siteinspire.com), Godly (godly.website), Awwwards (awwwards.com) for ambition and motion, Dark Mode Design (darkmodedesign.com) when the theme is dark, Siiimple (siiimple.com) for restraint done well |
| Web app, SaaS, dashboard | SaaSFrame (saasframe.io), Mobbin web (mobbin.com), Pageflows (pageflows.com) for real flows, Unsection (unsection.com) for section patterns, Details.so for micro-details |
| Mobile app | Mobbin (mobbin.com), Pttrns (pttrns.com), Pageflows |
| E-commerce | Commerce Cream (commercecream.com), ecomm.design |
| Email | Really Good Emails (reallygoodemails.com) |
| Brand, mark, identity | Branition (branition.com), LogoLounge, Behance (behance.net) |
| Motion-heavy | Awwwards, The FWA (thefwa.com), Dribbble animation, Behance Motion |
| Any category, fast visual census | Google Images: `<category> website design` / `<category> app UI` — one results page, to see what the category looks like at a glance and which looks are already everywhere |
| Templates as evidence | ThemeForest / Envato, Framer and Webflow template galleries — searched for the category to learn the template conventions buyers expect and the exact looks to avoid; a template is never a reference, it is the floor of the floor |

Procedure — read galleries, capture exemplars: several galleries (One Page Love, Land-book, Lapa Ninja, Google Images) serve a bot wall to headless Chrome, so never spend captures on gallery pages. For each chosen gallery run `WebFetch` on its tag, search, or category page and ask for the example names, URLs, and one line on each (this costs no capture and gets through where a screenshot does not). Pick the 3–4 most relevant examples across galleries, then capture the example sites themselves with `scripts/capture.mjs --desktop --jpeg` (they are ordinary sites and load fine); `--tall` on at most one of them. If a gallery's fetch also fails, move to the next gallery on the list rather than retrying. For the visual census, use `WebSearch` with the category query and read the result titles and descriptions; do not try to capture Google Images. The full toools.design list (https://www.toools.design/ui-web-design-inspiration-websites) is the fallback when none of the above fits the platform.

Return: 3 named exemplars with URLs, each with ONE specific takeaway (a layout decision, a type treatment, how imagery is placed, how motion is used, how the product is shown), what the category's best work has in common, and what it never does. Never "looks clean". Exemplar captures go to `.claude/refs/` and into the BAR as reference exemplars, each tagged with the aspect it is a reference for; the critic's A/B uses them alongside the competitors. Warning: galleries reward novelty; an exemplar informs a facet of a direction, never the direction itself, and a look that appears on every gallery this year is a tell, not a target.

Cache Track D per category and platform with the rest.

## Writing the ledger

File: `.claude/no-slop-design-ledger.md` in the project (scratchpad if there is no project). Kept between sessions and reused while under 30 days old. First line is `updated: YYYY-MM-DD`. Six sections, nothing else:

```
updated: YYYY-MM-DD

# BANNED
| pattern | era | medium | why slop | grep target | source |

# ALLOWED WITH SOURCE
| pattern | source | condition |

# ALLOWED BY IDENTITY
| pattern | why it belongs to this subject's world | what makes the execution specific, not default |

# CONTEXT NOTES
- Category: ...
- References and what to take from each: ...
- Type decision + reason: ...
- Color decision + reason: ...
- Motion decision + reason (with ms / easing): ...
- Copy voice + reason: ...

# STACK OPTIONS
| layer | option | version | pros | cons | source | recommended? + why |

# GREP TARGETS
from-purple-|to-purple-|via-purple-
backdrop-blur
animate-pulse
\b(streamline|effortless|supercharge)\b
```

GREP TARGETS is one case-insensitive regex per line, derived from BANNED. `scripts/audit.mjs` reads this section literally; keep it free of prose.

After writing the ledger, append every Track A pattern that is not already in [slop-catalog.md](slop-catalog.md) to that file under `## Confirmed additions`, as `- YYYY-MM-DD — pattern — medium — source URL`.

Conflict resolution: a pattern appearing in both tracks goes to ALLOWED WITH SOURCE only if Track B has a real citation and the condition is written down; it goes to ALLOWED BY IDENTITY only if the subject-material list shows it belongs to this product's world and the row says what makes the execution specific (a purple night sky painted for this app is identity; Tailwind's indigo-500 on a button is default). Otherwise BANNED.

Present a two-paragraph summary of the ledger to the user before Gate 3: what's banned that they might have expected, and what direction the research points to.
