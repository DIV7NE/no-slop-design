# Seed catalog of AI design slop

This is a starting list compiled from the model's own knowledge (cutoff early 2026). It is a hypothesis for Track A to confirm, date, extend, or strike. Nothing here goes into the ledger as BANNED without the research pass, and nothing here is exhaustive. The current year's patterns are the ones you do not know yet — that is why research is mandatory.

## Era 1 — 2022 to mid-2023: the first generated sites

Visual: purple-to-blue or pink-to-orange gradients on headlines and buttons; gradient text (`bg-clip-text text-transparent`); glassmorphism cards (`backdrop-blur`, white/10 borders) floating over dark mesh or "blob" backgrounds; neon glow borders and drop shadows; rounded-2xl on everything; emoji used as icons; icon-in-colored-circle feature cards; stock-avatar testimonials; fake logo strips ("Trusted by 10,000+ companies"); Inter, Poppins, Montserrat as the only fonts; hero = centered headline, subheadline, two buttons ("Get Started" + "Learn More").

Layout: hero → logo strip → three equal feature cards → testimonials → pricing (three tiers, middle "Most Popular") → FAQ accordion → CTA banner → four-column footer. Same skeleton regardless of product.

Copy: "Streamline your workflow", "Supercharge your productivity", "All-in-one platform", "Effortlessly manage", "Take your X to the next level", "Say goodbye to X", "Unlock the power of", "Built for teams who", "Where X meets Y", "X made simple", "Join thousands of happy users". Checkmark bullet lists of adjectives. Exclamation marks.

## Era 2 — late 2023 to 2024: the template era

Visual: "Linear-style" dark mode (`slate-950`/`zinc-950`, subtle radial gradient, grain); bento grids for everything; animated gradient borders and shimmering buttons; dot-grid and grid-line backgrounds; gradient orbs behind the hero; pill badge above the headline ("New ✨ v2.0 is here"); sparkles icon for anything AI; shadcn/ui components with default theme untouched; Geist/Inter + zinc; spotlight-on-hover cards; tilt-on-hover cards; marquee logo strips; number count-up stats; `rounded-xl border bg-card` card-in-card-in-card nesting; uniform 16px radii; every section equally spaced.

Motion: everything fades up 20px with 0.1s stagger on scroll; hover scale 1.05; infinite floating/bobbing; pulsing glows; gradient backgrounds that shift forever; spring bounce on every state change; parallax on everything; typewriter headline; loading spinner with gradient ring; 300ms ease-in-out as the only timing.

Copy: "Meet [Product]", "[Product] is the X for Y", "Built for the modern team", "Ship faster", "Designed for humans", "The last X you'll ever need", "Reimagined", "Lightning-fast", "Blazingly fast", three-word alliterative feature names, section headers phrased as questions, benefit triads (Fast. Secure. Reliable.), "not X but Y" taglines, "In a world where…", em-dash-heavy subheads. Microcopy: "Oops! Something went wrong", "Whoops", "You're all set! 🎉", "Let's get you started", "Hang tight". Placeholder people: John Doe, Jane Smith, Sarah Johnson (CEO, TechCorp), Acme Inc.

## Era 3 — 2025 to now: the "premium" and "editorial" templates

Visual: oversized serif display headline + all-caps mono eyebrow label ("the 2025 agency template"); noise/grain overlay on everything; aurora/mesh animated backgrounds; imitation "liquid glass" after Apple's 2025 redesign; dark glass + spotlight + bento combined; huge whitespace with tiny mono labels as decoration; sidebar + topbar admin template with gradient avatar and four KPI stat cards over a chart over a table; pastel status chips on everything; badges and icons on every list item; generated-app sameness (v0 / Lovable / Bolt / Cursor default output); OKLCH pastel palettes that all look alike.

Motion: word-by-word text reveal on scroll; infinite marquees; scroll-jacked pinned sections; image reveal with clip-path on every section; magnetic buttons; custom cursors; blur-in entrance on everything; scroll progress bars; smooth-scroll libraries by default.

Copy: "Crafted", "Thoughtfully designed", "Obsessed with detail", "Precision-engineered", "Built different", "for people who care", "Quietly powerful", "Less noise. More signal.", "Your X, reimagined", "Meet the new standard", one-word section headers ("Craft.", "Speed.", "Trust."), lowercase-everything as a personality substitute.

## Things that look like slop but are by-the-book (candidates for ALLOWED WITH SOURCE)

Track B decides these, with citations. Likely allowed under conditions:
- Highlighted recommended pricing tier — if the recommendation is honest and there are ≤3 tiers.
- FAQ section — if it answers real objections and is not SEO filler.
- Logo strip — if the logos are real customers with permission.
- "No credit card required" — if it is true.
- Skeleton loaders, empty states with one primary action, toasts for background outcomes.
- Entrance animations with ease-out, 150–300ms for small elements, longer for large surfaces, staggers ≤ 50ms, all disabled under `prefers-reduced-motion` — per platform motion guidance.
- Consistent 4/8pt spacing scale, a modular type scale, 44×44pt touch targets, visible focus rings, 4.5:1 body contrast.
- Dark mode — if the product is used in low light or for long sessions, not as a default aesthetic.

## Structural tells independent of era

- Every section has the same rhythm: eyebrow label, headline, subhead, grid of cards.
- Every card has an icon, a title, and two lines of text.
- Nothing is asymmetric, nothing is dense, nothing is specific to the product.
- Screenshots or product UI are absent; abstract shapes stand in for the product.
- Copy could be swapped between any two products in the category without anyone noticing.

## Confirmed additions

Appended by Gate 2 research passes, newest last. Format: `- YYYY-MM-DD — pattern — medium — source URL`. Entries that name a category (astrology apps, local trade sites, a locale's boilerplate) apply to that category only. An entry describing a *category default* is not a ban on a product's own identity: a product that owns that world keeps it through an ALLOWED BY IDENTITY row and answers the entry by making the execution specific. Never record a product's own name here; describe the pattern.
- 2026-09-01 — Inter + Tailwind indigo-500→purple gradient called "the single loudest AI tell in 2026" — visual — https://www.925studios.co/blog/ai-slop-design-tells
- 2026-09-01 — Everything wrapped in a card (stats, testimonials, signup); homogenization is now structural — layout — https://www.sailop.com/blog/ai-slop-2026-state-of-the-ai-generated-web
- 2026-09-01 — Lavender "VibeCode purple" tints leaking from image models; dark-mode body text failing AA — visual — https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it
- 2026-09-01 — Local-business template pool: identical sites across trades, "family-owned", "serving X and surrounding areas", hero + 3 bullets + process + 6 FAQs — copy/layout — https://flat6solutions.com/blog/are-ai-generated-websites-good-enough-for-small-businesses/
- 2026-09-01 — Buzzword inventory with a 3-per-paragraph threshold (elevate, unlock, unleash, seamless, robust, leverage, delve, tapestry, pivotal, harness, foster) — copy — https://www.contentbeta.com/blog/list-of-words-overused-by-ai/
- 2026-09-01 — The overcorrection cluster: sparse "editorial minimal" page — hairlines, mono eyebrow labels, one accent on one button, grey-on-grey, huge whitespace, no photographs of people or place, two sections and a form. Produced by applying bans without adding material; a critic called it "the current minimalist redesign default". Compare against real local competitors in the category, which lead with photos of the people and the place, alternate section grounds, and use the brand colour throughout — visual/layout — observed on the first live run of this skill

## App UI slop (product register) — seed, to be verified by Track A per platform

Mobile: onboarding carousel of three flat illustrations (undraw/storyset style) with dots and "Skip"; "Welcome back, Name 👋"; gradient header bars; pill (fully rounded) buttons on everything; card stacks for content that is a list; custom five-tab bars with generic icons (home, search, plus, bell, person); floating action button with no clear primary action; purple/indigo accent; the same screens shipped to iOS and Android with neither platform's navigation conventions; empty states that are a single grey icon and "Nothing here yet"; permission prompts with "We need access to…" and no reason.

Desktop / dashboards: sidebar + topbar shell with a gradient avatar; four KPI stat cards over a chart over a table; everything in `rounded-xl border bg-card`; pastel status chips on every row; "Overview / Analytics / Reports / Settings" nav for a product that has none of those; Electron apps with a website header, hero, and footer inside the window; dark-only with 12 px text; charts with default library colours.

Copy: "Oops! Something went wrong", "Whoops", "Hang tight", "You're all set! 🎉", "Let's get you started", "Supercharge your workflow", toast messages that thank the user, tooltips that restate the label.

By-the-book here, not slop: platform system type via the official type scale; native navigation bars and tab bars; standard pickers, sheets, and dialogs; motion tokens from HIG/M3/Fluent; skeleton loading; semantic status colours distinct from the accent; SF Symbols / Material Symbols used per their rules.

- 2026-09-01 — animated starfield / shooting stars / rotating zodiac mandala as ambient set-dressing — visual+motion — https://www.auraeastrology.com/topics/co-star-vs-chani-which-astrology-app-wins-2026-compared-ranked (category default for astrology/tarot; the two most-current competitors use none of it)
- 2026-09-01 — Cinzel as a display face — visual — competitor CSS reads (Co-Star, CHANI, The Pattern, AstroTalk all avoid it); most-reused "mystical" serif on Canva/Envato/Etsy templates
- 2026-09-01 — dark-cosmic ground + gold accent as a whole-page identity — visual — Track B captures in one astrology-app run: three category incumbents were mutually indistinguishable on this alone, while the two most-cited current apps differentiate by going light/paper — a category default; a product that owns the cosmic world keeps it and must make the execution its own (its own painted art, its own type, its own motifs)
- 2026-09-01 — coloured top/left border revealed on card hover — visual — https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it
- 2026-09-01 — gradient-clipped text (bg-clip-text text-transparent) on stats/headlines — visual — https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it
- 2026-09-01 — "every section wrapped in the same rounded card" — layout — https://www.sailop.com/blog/ai-slop-2026-state-of-the-ai-generated-web
- 2026-09-01 — missing local trust markers on generated trade sites: phone buried instead of pinned in the header, no messaging link, no company registration number, testimonials pasted as loose text instead of named and attributed — layout+copy — https://growthguys.tech/blog/genuine-website-vs-ai-slop.html
- 2026-09-01 — absence of motion as a tell: buttons that snap with no transition, no hover micro-interaction, generated code omitting transitions entirely (the inverse of the too-much-motion tell) — motion — https://www.925studios.co/blog/ai-slop-web-design-guide
- 2026-09-01 — backdrop-filter: blur() costs 15-30% FPS on Android — a performance ban, not a taste ban — visual — https://studiomeyer.io/en/blog/webdesign-trends-2026-reality-check
- 2026-09-01 — word-by-word kinetic headline reveal "almost never ships in production" (layout shift, a11y); one hero moment at most — motion — https://studiomeyer.io/en/blog/webdesign-trends-2026-reality-check
- 2026-09-01 — Slovenian trade boilerplate "celovite rešitve" / "zaupanja vreden partner" recurring verbatim across unrelated service sites — copy — https://spletke.si/spletne-storitve/, https://termogetik.si/celovite-resitve-za-podjetja/ (SERP observation)
- 2026-09-01 — decorative stock globe / world map with no relation to the actual service area — visual — https://growthguys.tech/blog/genuine-website-vs-ai-slop.html
- 2026-09-01 — "lazy minimalism": sparseness standing in for an idea. Upgrades the previously unsourced overcorrection-cluster entry — visual+layout — https://www.creativeboom.com/insight/10-trends-creatives-are-so-over-in-2026/
- 2026-09-02 — The "tasteful editorial SaaS" cluster, this skill's own house style across three runs: grotesk (wide or slab) headline with an italic serif accent word in the accent colour, aubergine/ink ground, one cream or tan band, one desaturated accent (teal, sage, rust), a tabular stats band with mono labels, outline line diagrams, understated-number copy ("sixty-six thousand readings so far"), public-domain imagery standing in for the product's own art. Produced when the direction is derived from "what is safe" instead of the subject's world — visual/layout/copy — observed on a live Evolve run of this skill that lost the product's world to it
- 2026-09-02 — Process copy: the design's reasoning written into user-facing text ("Not ten cards in a grid. A list, because that is what it is.", "We do not round these up.", "measured, not asserted") — copy — observed on two live runs of this skill

## AI-image tells (for generated art) — seed, verify per run

Over-rendered glossy surfaces and HDR contrast; lens flare and volumetric god-rays by default; airbrushed symmetrical faces with dead eyes; hands with wrong fingers; purple-teal nebula gradients as the default "magic"; generic fantasy compositions (centred subject, radial glow, floating particles); garbled or invented text; smeared watermark-like regions; over-detailed everything with no focal hierarchy; a different light and medium in every image of the same set. The fix is art direction: a named medium, a locked palette, a hero reference reused for the set, quiet zones for type, and three candidates per slot judged against the brief.
- 2026-09-02 — Counter-aesthetic as a new default: deliberate friction/texture/glitch/nostalgia/organic shapes/custom illustration used as a "made by a human" signal — visual — https://medium.com/creative-black-pug-studio/7-web-design-trends-being-shaped-by-ai-in-2026-4afbec683b34
- 2026-09-02 — "Active grid": bento tiles that expand/play video/reveal data on hover, marketed as bento's 2026 successor — layout — https://mockuuups.studio/blog/post/best-bento-grid-design-examples/
- 2026-09-02 — Astrology genre split at product level: editorial monochrome (screens + chart diagrams, no glow) vs warm collage/paper (illustration + texture) are the two live alternatives to the purple-cosmic-gradient default — visual — https://soularmap.app/blog/best-astrology-app-2026-comparison
- 2026-09-02 — "Unlock your cosmic destiny" / "unlock the mysteries of your destiny" verbatim across Play-store astrology listings and spiritual book titles — copy — https://play.google.com/store/apps/details?id=com.cosmicoracle.moodlr.app
- 2026-09-02 — Astrology/tarot template packs still ship the "living sky-map hero + circular chart wheel + glowing panels + gold hairlines" bundle — visual/layout — https://www.aura.build/templates/astrology-tarot (the wheel and hairline are the product's world; the bundle as a whole, with glow panels and a sky-map on every page, is the tell)
- 2026-09-02 — A site that mirrors a superseded app theme (site still purple after the app moved to gold) reads as a template even when hand-built; the fix is to take the shipped app's tokens verbatim — visual — observed on a live Evolve run of this skill
