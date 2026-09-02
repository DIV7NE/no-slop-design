# no-slop-design

A process skill for coding agents that makes design work come out specific, alive, and recognisably yours instead of AI-generic — for websites, web apps, iOS, Android, desktop, and anything else with a screen.

It runs before any design implementation and stays in force over it. In one line: interview first, research live (what generated design looks like *this* year, the by-the-book rules for your platform, and the real competitors a user would compare you to), keep only what a cited source or your own identity justifies, show three directions and a preview before building, then build one unit at a time and let a fresh blind critic grade each one against the competitors until it passes.

## What it does that other design skills don't

- **Sizes itself to the change.** A hover-state tweak is a Micro run (one critic, no research); a new section is an Iteration; a new product or a redesign is Full; "I like it, make it better" is Evolve (identity survives, execution is reworked); "tell me what's wrong" is Review. The tier is decided from facts about the change, never from urgency.
- **Researches instead of remembering.** Four research subagents per run: current AI-design tells, platform guidelines with numbers, the stack landscape with real versions, and curated inspiration galleries (One Page Love, Siteinspire, Land-book, Mobbin, SaaSFrame, Awwwards, a Google Images census, template markets for what to avoid) chosen by kind and platform and token-capped. Real competitors are captured headlessly and become the floor the critic grades against; the best gallery exemplars become the ceiling. Findings are cached per category and platform.
- **Bans without emptiness.** Every ban is paired with what replaces it. Direction comes from the subject's own world, and a *life budget* (real photos or the product's own art, tonal rhythm, confident colour, brand devices, real data and states) has to be filled before anything is built. Purple and stars are slop on an invoicing app and the world of a divination app; the skill knows the difference and writes it down.
- **Never grades its own work.** Each unit is built, captured headlessly, audited by script, and handed to a fresh critic that has never seen the project. The loop stops on evidence or on the budget you set.
- **Grows with use.** New slop patterns, new platforms, and new categories are appended to its own references when a run discovers them.
- **Headless only.** Nothing it captures or tests appears on your screen.

## Install

The skill follows the [Agent Skills](https://agentskills.io/specification) format, so it works with Claude Code, Codex, Gemini CLI, GitHub Copilot CLI, Cursor, and any agent that reads `SKILL.md` files.

**With the skills CLI** (asks whether to install globally or into the current project):

```
npx skills add DIV7NE/no-slop-design
```

**Manually, global:**

```
git clone https://github.com/DIV7NE/no-slop-design
# copy or symlink skills/no-slop-design into your agent's skills directory:
#   Claude Code:  ~/.claude/skills/no-slop-design
#   Codex / Gemini CLI / Copilot CLI:  ~/.agents/skills/no-slop-design
```

**Manually, per project:** copy `skills/no-slop-design` into `.claude/skills/` or `.agents/skills/` at the project root.

Then invoke it with `/no-slop-design` (or let your agent pick it up from its description whenever design, UI, UX, animation, or UI-copy work comes up).

### Optional: deterministic trigger for Claude Code

`hooks/no-slop-design-trigger.js` is a `UserPromptSubmit` hook that reminds the agent to invoke the skill whenever a prompt reads like design work. Copy it to `~/.claude/hooks/` and add to `~/.claude/settings.json`:

```json
"hooks": {
  "UserPromptSubmit": [{ "hooks": [{ "type": "command", "command": "node \"<path>/no-slop-design-trigger.js\"", "timeout": 5 }] }]
}
```

## Requirements

- Node 18+ (for the scripts).
- Google Chrome or Edge installed (headless capture). `npm i -g puppeteer-core` enables true full-page and phone-emulated captures and in-page checks; without it the scripts fall back to the bare Chrome CLI.
- Optional: ImageMagick (cropping captures), an image generator skill (the skill can art-direct generated illustration when you choose it), the Android SDK (headless emulator captures).

## Layout

```
skills/no-slop-design/
  SKILL.md                    the spine: run sheet, principles, gates, tiers, red flags
  references/interview.md     exact question wording for every round
  references/research-protocol.md  research tracks, ledger format, cache
  references/preview.md       directions, art-direction brief, life budget
  references/gauntlet.md      build loop, critic prompt, capture notes, DESIGN.md
  references/platforms.md     per-platform guidelines, stacks, capture routes, discovery procedure
  references/slop-catalog.md  dated, sourced catalog of generated-design tells (self-extending)
  scripts/capture.mjs         headless screenshots and in-page checks
  scripts/audit.mjs           greps built files for banned patterns and copy tells
  scripts/contrast.mjs        WCAG contrast ratios
  tests/check.mjs             mechanical checks for the skill itself
  tests/scenarios.md          behavioural scenarios with expected outcomes
hooks/no-slop-design-trigger.js  optional Claude Code prompt hook
```

## Verifying the skill

```
node skills/no-slop-design/tests/check.mjs
```

Behavioural scenarios in `tests/scenarios.md` are run by giving each prompt to a fresh agent with the skill loaded and comparing against the expected column.

## License

MIT
