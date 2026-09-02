# Platforms and registers

The gates are the same everywhere. What changes per platform is the guideline source, the stack candidates, the type and motion defaults, where competitors are found, how the artifact is rendered and captured, and which slop cluster to watch for. What changes per register is what "life" means.

## Register: brand vs product

Decide this in Gate 1 from the task and record it in the ledger.

- **Brand register** — design IS the product: marketing sites, landing pages, portfolios, campaign pages, posters, decks. Motion is welcome when it comes from the world and always deliberate.
- **Product register** — design SERVES the product: apps, dashboards, tools, settings, onboarding, forms, any screen someone operates. Motion that explains state changes is by-the-book here. Photography is usually absent; that is not deadness.

What "life" means in each register is the life budget in `preview.md` §3, one list per register. The critic's wireframe test reads differently too: in product register, "grey bars instead of text" must still look like this product — its data shapes, navigation, states — not like a template dashboard.

## Per platform

### Web (site or web app)
- Guidelines: WCAG 2.2; NN/g; for web apps also the platform the users are on (desktop browsers: pointer + keyboard; mobile web: touch targets, safe areas).
- Stack layers: styling, components, motion, forms, fonts, icons (see research-protocol Track C).
- Type default: web fonts are a decision, not a given; system stack is legitimate for product register.
- Motion: brand register — state changes only; product register — transitions that explain navigation and state, View Transitions API, reduced-motion honoured.
- Competitors: the sites a customer would compare against; captured with `scripts/capture.mjs --all`.
- Render and capture: `scripts/capture.mjs` (headless Chrome), `file://` or a dev server URL.
- Slop cluster: see slop-catalog eras 1–3 and the overcorrection cluster.

### iOS / iPadOS / macOS
- Guidelines: Apple Human Interface Guidelines (layout, navigation, typography, colour, motion, components, accessibility). Dynamic Type, safe areas, 44×44 pt targets, SF Symbols usage rules.
- Stack layers: SwiftUI vs UIKit/AppKit (or cross-platform: React Native, Flutter, Kotlin Multiplatform); navigation (NavigationStack, tabs, sheets); animation (SwiftUI implicit/explicit animations, `matchedGeometryEffect`, UIKit spring APIs); icons (SF Symbols first).
- Type default: SF Pro / SF Compact / New York via the system text styles. A custom face is a brand decision that must survive Dynamic Type.
- Motion: HIG motion — purposeful, brief, interruptible; springs are native here. "Nothing moves" is wrong for an app.
- Competitors: App Store product pages (screenshots and previews are public): capture `https://apps.apple.com/...` pages with `capture.mjs --tall`, then crop the screenshot carousel. Plus the category's known-good apps from designer discussion.
- Render and capture: needs macOS — `xcrun simctl io booted screenshot out.png` on a booted simulator; SwiftUI previews via `xcodebuild` snapshot tests. On Windows this platform cannot be run: build the preview as device-size artboards (Gate 3), write the code, and ask the user to run it and send screenshots back; say so in the report rather than skipping the critic.
- Slop cluster: gradient headers, rounded-full pill buttons everywhere, onboarding carousel with three flat illustrations, "Welcome back, Name 👋", card stacks for everything, custom tab bars that ignore the HIG, purple accents.

### Android
- Guidelines: Material Design 3 (layout, adaptive layouts, colour system, type scale, motion tokens, components), Android accessibility (48 dp targets, TalkBack), predictive back, edge-to-edge.
- Stack layers: Jetpack Compose vs Views; Material 3 components vs custom; navigation (Navigation Compose); animation (Compose animation APIs, MotionLayout); icons (Material Symbols).
- Type default: Roboto / Roboto Flex via the M3 type scale; brand faces through the type scale, not around it.
- Motion: M3 motion tokens (durations 50–1000 ms, easing sets, container transform, shared axis). Expected, not optional.
- Competitors: Google Play listing pages (public screenshots): `capture.mjs --tall` on `https://play.google.com/store/apps/details?id=...`, crop the carousel.
- Render and capture: Android emulator can run headless — `emulator -avd <name> -no-window -no-audio` then `adb exec-out screencap -p > out.png`; Compose previews via screenshot tests. Works on Windows when Android Studio's SDK is installed.
- Slop cluster: Material defaults left untouched (default purple M3 seed colour, default shapes), iOS patterns copied onto Android, floating action buttons with no primary action, five-tab bottom bars with generic icons.

### Windows desktop
- Guidelines: Fluent 2 (layout, typography, colour, elevation, motion), Windows app design (title bar, mica/acrylic rules, keyboard and pointer, high contrast).
- Stack layers: WinUI 3 / WPF / Avalonia / Electron / Tauri / Qt / Flutter desktop; controls (WinUI vs custom); animation (Composition APIs, WinUI implicit animations; CSS for Electron/Tauri).
- Type default: Segoe UI Variable via the Fluent type ramp.
- Motion: Fluent motion (connected animations, directional page transitions, 150–300 ms); expected.
- Competitors: the desktop tools users already have open; Microsoft Store listings; product pages with screenshots — captured with `capture.mjs`.
- Render and capture: Electron/Tauri renderer content can be captured headlessly with `capture.mjs` against the renderer's file or URL. Native windows must exist to be captured: run the app, capture its window (`fastuse` screenshot or a PowerShell `CopyFromScreen` of the window bounds), close it — tell the user a window will flash.
- Slop cluster: "Electron app that looks like a website" (web header/footer, marketing hero inside an app), custom title bars that break window controls, dark-mode-only with tiny text, sidebar + topbar + KPI-card template.

### macOS desktop
- As iOS/macOS above for guidelines and stack (AppKit/SwiftUI, Catalyst); menu bar, toolbars, sidebars, and keyboard shortcuts are the platform; render and capture need macOS.

### Cross-platform frameworks (React Native / Expo, Flutter, KMP, Ionic)
- Guidelines: the target platform's, per platform — one design does not fit both; decide what is shared and what is native (navigation bars, pickers, haptics, type).
- Render and capture: Expo/RN web target and Flutter web target can be captured headlessly with `capture.mjs`; Android via the headless emulator; iOS needs macOS.
- Slop cluster: the same UI shipped identically to both platforms with neither platform's conventions; Expo template look untouched.

### Component or design system (Kind = design system, any platform)
- The unit is a component with its full state matrix, not a screen: default, hover, focus, active, disabled, loading, error, selected, with content at minimum and maximum length and at the largest font scale.
- Deliverables: tokens (colour with ratios, type scale, spacing, radii, motion) as code in the project's token format; each component's states rendered on one artboard; usage rules (when to use, when not, copy rules) in `DESIGN.md`; a11y contract per component (role, name, keyboard, focus).
- The bar: the platform's own component guidelines (HIG, M3, Fluent, WCAG for web) and the best-regarded systems in the category (captured headlessly from their public docs). The critic grades consistency across states and components, not liveliness — the liveliness score is replaced by a consistency score (1–5) with the same PASS threshold.

### Terminal / TUI, games, kiosks, embedded
- Guidelines: the runtime's own (terminal colour and width constraints, console/game platform UI guidelines, kiosk touch-target and glare rules). Competitors: the tools or games users already know. Capture: terminal recording or the runtime's screenshot facility. Say plainly when the environment cannot be run here.

## Any platform, kind, or category not listed — discover it, then append it

The sections above are a seed, like the slop catalog. Nothing in the process depends on the target being listed. When Gate 1 lands on a platform, kind, or surface this file does not cover (a smart-TV app, an in-car screen, a watch face, a VR panel, a POS terminal, a CLI, a printed menu, a slide deck, an email template, a game HUD, a voice UI with a visual companion), run this procedure before Gate 2 and write the result as a new section in this file under "Discovered platforms" so the next run inherits it:

1. **Guidelines** — search `<platform> human interface guidelines`, `<platform> design guidelines`, `<platform> accessibility requirements`; take the vendor's own document first (Apple tvOS/watchOS/visionOS HIG, Android TV / Wear OS / Automotive guidelines, Roku/Samsung Tizen design docs, W3C for email/CLI-adjacent standards, the print shop's specs for print). Record the URL and the three constraints that most change the design (input model, viewing distance, target sizes, safe areas, session length).
2. **Register** — decide brand or product from what the surface is for; if neither fits cleanly (a game HUD, a museum kiosk), write a one-line register note in the ledger naming what "life" means here and what the one job is, and derive the life budget from that note.
3. **Stack layers** — search `<platform> UI framework <year>`, the vendor's SDK docs; list the native option, the cross-platform options, and from scratch, with versions from the registry or vendor page.
4. **Type and motion defaults** — the platform's system face and type ramp; its motion guidance with numbers; if none exists, use the nearest vendor's (Material or HIG) and say so.
5. **Competitor source** — where a user would compare: the platform's store, catalog, or channel listing; capture with `scripts/capture.mjs` when the listing is a web page, otherwise ask the user for screenshots of two or three incumbents.
6. **Capture route** — the platform's simulator or emulator and its screenshot command, run headless where the tool allows; if it cannot run here, deliver artboards and code, ask the user for screenshots, and say so.
7. **Slop cluster** — Track A with `AI generated <platform> app look` and `<platform> template sameness`; whatever it finds goes in the slop catalog under the category.

Category is never a limit either: the cache is keyed by `<platform>-<category-slug>` with the slug chosen from the brief, and a category never seen before simply runs the full tracks and creates the cache entry.

## Discovered platforms (appended by runs)

Format: the same headings as the seed sections above, with the date and the source URLs.

### Samsung Tizen TV / LG webOS TV (smart TV apps) — discovered 2026-09-02
- Guidelines: Samsung Design Principles https://developer.samsung.com/smarttv/design/design-principles.html, UX Checklist https://developer.samsung.com/smarttv/design/ux-checklist.html, Apps Screen https://developer.samsung.com/smarttv/design/apps-screen.html; LG webOS App Resources https://webostv.developer.lge.com/develop/getting-started/app-resources; Magic Remote pointer background https://www.oxagile.com/article/magic-remote-ux-webos/. Three constraints that most change the design: (1) 10-foot / ~3 m legibility distance; (2) two divergent input models — Samsung D-pad focus-only vs LG Magic Remote pointer, both must work, LG review fails apps that get pointer navigation wrong; (3) lean-back, hands-off sessions where voice via the remote mic is a primary input, so listening and no-match states are designed.
- Register: product. Life = real content at density, a focus/pointer dual navigation model, designed states for search/voice/timer/empty/no-match, motion that shows focus movement and step transitions.
- Stack layers: Tizen web app (HTML/CSS/JS or React) for Samsung; webOS Enact (React, Sandstone theme) for LG; shared option React + Norigin Spatial Navigation https://github.com/NoriginMedia/norigin-spatial-navigation (supports Tizen and webOS focus management); from scratch = hand-rolled keydown/focus-trap navigation. Pin Tizen Studio / webOS TV SDK versions at build time.
- Type and motion defaults: Samsung system face One UI Sans (200/300/400/600). LG: no verified system type spec found; Enact theme defaults as the fallback — re-verify at Gate 2b. No numeric motion-token document found for either vendor — Track B must search for Tizen/webOS transition guidance before locking motion.
- Competitor source: the vendors' own TV apps (e.g. Samsung Food TV integration) are on-device, not web listings — ask the user for screenshots; capture store listing pages with capture.mjs where they exist. Fewer than 3 competitors surfaced in the first pass; Track B re-runs before Gate 2 closes.
- Capture route: Tizen Studio's TV emulator and the webOS TV Simulator are GUI-only on Windows — deliver artboards at 1920x1080 (and 3840x2160 if targeted), write the code, ask the user to run it in the simulator or on a TV and send screenshots; report says not verified in-session.
- Slop cluster: not yet established; the first query returned template galleries, not critique. Track A re-runs with sharper queries (smart TV app UI sameness, streaming app design cliches <year>).


## Capture summary

| Platform | Headless route available here (Windows) | If not |
|---|---|---|
| Web, Electron/Tauri renderer, RN/Flutter web | `scripts/capture.mjs` | — |
| Android | headless emulator + `adb screencap` (needs SDK) | ask the user for device screenshots |
| iOS / macOS | none on Windows | artboards for Gate 3; user runs and sends screenshots; report says so |
| Native Windows app | run + window capture (a window flashes) | — |
