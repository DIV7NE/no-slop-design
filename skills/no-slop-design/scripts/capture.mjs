#!/usr/bin/env node
// Headless screenshots and page checks with the installed Chrome. Nothing opens on the user's screen.
//
// usage: node capture.mjs <out-dir> <url-or-file> [...] [--desktop] [--tall] [--mobile] [--all]
//                         [--eval "<js expression>"] [--budget ms] [--jpeg]
//   --desktop  1400x900 viewport (default when no mode is given)
//   --tall     full page at 1400 wide (real full-page with puppeteer-core; 1400x7000 window with the CLI fallback)
//   --mobile   390x844, device-emulated (puppeteer-core only; the CLI cannot go under ~500px)
//   --all      all three
//   --eval     run a JS expression in the page after load (puppeteer-core only), print its JSON result;
//              use it for form tests: set values, requestSubmit(), await, read DOM state
//   --budget   load/settle budget in ms (default 8000)
//
// Prefers puppeteer-core from the global npm root (npm i -g puppeteer-core); falls back to the chrome CLI.
import { spawnSync, execSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const candidates = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, "Google\\Chrome\\Application\\chrome.exe"),
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) {
  console.error("no Chrome/Edge found; set CHROME_PATH");
  process.exit(2);
}

const args = process.argv.slice(2);
function opt(name) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}
const valued = new Set(["--eval", "--budget"]);
const flags = new Set(args.filter((a) => a.startsWith("--") && !valued.has(a)));
const evalExpr = opt("--eval");
const budget = Number(opt("--budget") || 8000);
const jpeg = flags.has("--jpeg");
const positional = args.filter((a, i) => !a.startsWith("--") && !valued.has(args[i - 1]));
const [outDir, ...targets] = positional;
if (!outDir || targets.length === 0) {
  console.error("usage: node capture.mjs <out-dir> <url-or-file> [...] [--desktop] [--tall] [--mobile] [--all] [--eval js] [--budget ms] [--jpeg]");
  process.exit(2);
}
mkdirSync(outDir, { recursive: true });

const modes = [];
if (flags.has("--all") || flags.has("--desktop") || (!flags.has("--tall") && !flags.has("--mobile"))) modes.push("desktop");
if (flags.has("--all") || flags.has("--tall")) modes.push("tall");
if (flags.has("--all") || flags.has("--mobile")) modes.push("mobile");

const toUrl = (t) => (/^(https?|file):/i.test(t) ? t : pathToFileURL(resolve(t)).href);
function slug(t) {
  const s = /^https?:\/\//i.test(t) ? t.replace(/^https?:\/\//i, "") : resolve(t).split(/[\\/]/).pop().replace(/\.[a-z0-9]+$/i, "");
  return s.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").slice(0, 60).toLowerCase();
}
const ext = jpeg ? "jpg" : "png";

let puppeteer = null;
try {
  const root = execSync("npm root -g", { stdio: "pipe" }).toString().trim();
  puppeteer = createRequire(join(root, "x.js"))("puppeteer-core");
} catch {}

let failures = 0;

async function withPuppeteer() {
  const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ["--disable-gpu", "--mute-audio", "--no-first-run"] });
  try {
    for (const target of targets) {
      const url = toUrl(target);
      for (const mode of modes) {
        const page = await browser.newPage();
        try {
          if (mode === "mobile") await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
          else await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
          await page.goto(url, { waitUntil: "networkidle2", timeout: budget + 20000 }).catch(() => {});
          // scroll through once so lazy images load, then return to the top
          await page.evaluate(async () => {
            const h = document.documentElement.scrollHeight;
            for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
            window.scrollTo(0, 0);
          }).catch(() => {});
          await new Promise((r) => setTimeout(r, Math.min(budget, 3000)));
          if (evalExpr) {
            const result = await page.evaluate(evalExpr);
            console.log(JSON.stringify({ target, mode, eval: result }, null, 2));
          }
          const out = resolve(outDir, `${slug(target)}-${mode}.${ext}`);
          await page.screenshot({ path: out, fullPage: mode === "tall", type: jpeg ? "jpeg" : "png", ...(jpeg ? { quality: 70 } : {}) });
          console.log(out);
        } catch (e) {
          failures++;
          console.error(`failed: ${url} (${mode}) ${e.message}`);
        } finally {
          await page.close().catch(() => {});
        }
      }
    }
  } finally {
    await browser.close();
  }
}

function withCli() {
  if (evalExpr) console.error("--eval needs puppeteer-core (npm i -g puppeteer-core); ignored");
  const sizes = { desktop: [1400, 900], tall: [1400, 7000], mobile: [390, 844] };
  for (const target of targets) {
    const url = toUrl(target);
    for (const mode of modes) {
      if (mode === "mobile") console.error("note: CLI fallback cannot emulate a phone; Chrome's minimum window is ~500px wide");
      const [w, h] = sizes[mode];
      const out = resolve(outDir, `${slug(target)}-${mode}.png`);
      const profile = mkdtempSync(join(tmpdir(), "dns-capture-"));
      rmSync(out, { force: true });
      spawnSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check", "--disable-extensions", "--mute-audio", `--user-data-dir=${profile}`, `--window-size=${w},${h}`, `--virtual-time-budget=${budget}`, `--screenshot=${out}`, url], { stdio: "pipe", timeout: budget + 60000, windowsHide: true });
      // chrome.exe returns at once on Windows; wait for a stable file
      const deadline = Date.now() + budget + 30000;
      let size = -1, stable = 0;
      while (Date.now() < deadline && stable < 2) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 500);
        const s = existsSync(out) ? statSync(out).size : -1;
        stable = s > 0 && s === size ? stable + 1 : 0;
        size = s;
      }
      rmSync(profile, { recursive: true, force: true });
      if (stable >= 2) console.log(out);
      else { failures++; console.error(`failed: ${url} (${mode})`); }
    }
  }
}

if (puppeteer) await withPuppeteer();
else { console.error("puppeteer-core not found; using chrome CLI fallback (no phone emulation, no --eval)"); withCli(); }
process.exit(failures ? 1 : 0);
