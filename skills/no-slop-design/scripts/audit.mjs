#!/usr/bin/env node
// Slop audit: greps produced files for the ledger's GREP TARGETS, a built-in
// baseline of known slop tells, and the fuck-slop copy tells if that skill is installed.
// usage: node audit.mjs <ledger.md|-> <file|dir> [...]
// Exit 1 when anything matches. Hits are findings, not verdicts: the ledger's
// ALLOWED WITH SOURCE section decides what stays.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { homedir } from "node:os";

const [ledgerPath, ...targets] = process.argv.slice(2);
if (!ledgerPath || targets.length === 0) {
  console.error("usage: node audit.mjs <ledger.md|-> <file|dir> [...]");
  process.exit(2);
}

const baseline = [
  ["visual", "from-(purple|violet|indigo|pink|fuchsia)-|to-(purple|violet|indigo|pink|fuchsia)-"],
  ["visual", "bg-clip-text|text-transparent"],
  ["visual", "backdrop-blur|backdrop-filter"],
  ["visual", "bg-(slate|zinc|neutral|gray)-950"],
  ["motion", "animate-(pulse|bounce|ping|spin)"],
  ["motion", "hover:scale-105|scale\\(1\\.05\\)"],
  ["motion", "infinite|marquee"],
  ["copy", "trusted by [0-9,.]+\\+?"],
  ["copy", "\\b(streamline|effortless(ly)?|supercharge|seamless(ly)?|elevate|unlock the|revolutioni[sz]e|reimagined|game-?changer|next level|all-in-one|blazing(ly)? fast|lightning-?fast)\\b"],
  ["copy", "\\b(acme|john doe|jane smith|sarah johnson|techcorp|lorem ipsum)\\b"],
  ["copy", "\\b(oops|whoops|hang tight|you're all set|let's get you started)\\b"],
  ["copy", "\\b(get started|learn more)\\b"],
  ["copy", "\\b(crafted|thoughtfully designed|obsessed with|built different|precision-engineered)\\b"],
  ["copy:process", "because that is what it is|we do not round|measured,? not asserted|\\bnot a grid\\b|\\bnot (ten|three|four) [a-z]+ in a grid"],
];

function sectionLines(md, heading) {
  const lines = md.split(/\r?\n/);
  const start = lines.findIndex((l) => l.trim().toLowerCase() === heading.toLowerCase());
  if (start < 0) return [];
  const out = [];
  for (const l of lines.slice(start + 1)) {
    if (/^#\s/.test(l)) break;
    const t = l.trim();
    if (t && !t.startsWith("#") && !t.startsWith("|") && !t.startsWith("<")) out.push(t);
  }
  return out;
}

const patterns = [];
if (ledgerPath !== "-") {
  if (!existsSync(ledgerPath)) {
    console.error(`ledger not found: ${ledgerPath} (baseline + copy tells only)`);
  } else {
    const targets = sectionLines(readFileSync(ledgerPath, "utf8"), "# GREP TARGETS");
    if (targets.length === 0) console.error(`ledger has no "# GREP TARGETS" section: ${ledgerPath}`);
    for (const p of targets) patterns.push(["ledger", p]);
  }
}
for (const [kind, p] of baseline) patterns.push([`baseline:${kind}`, p]);

const tellsPath = join(homedir(), ".claude", "skills", "fuck-slop", "references", "tells.md");
if (existsSync(tellsPath)) {
  const md = readFileSync(tellsPath, "utf8");
  const fences = md.match(/```[\s\S]*?```/g) || [];
  for (const block of fences) {
    for (const line of block.split(/\r?\n/).slice(1, -1)) {
      const t = line.trim();
      if (!t || t.startsWith("grep") || t.startsWith("PATTERNS") || t.startsWith("<")) continue;
      patterns.push(["copy:fuck-slop", t]);
    }
  }
}

// visual/motion baseline patterns only make sense in web-rendered files; copy tells apply everywhere
const webExts = new Set([".html", ".htm", ".css", ".scss", ".sass", ".less", ".js", ".jsx", ".mjs", ".ts", ".tsx", ".vue", ".svelte", ".astro", ".mdx"]);
const compiled = [];
for (const [src, p] of patterns) {
  try {
    compiled.push([src, p, new RegExp(p, "i")]);
  } catch {
    console.error(`skipping invalid pattern (${src}): ${p}`);
  }
}

const exts = new Set([".html", ".htm", ".css", ".scss", ".sass", ".less", ".js", ".jsx", ".mjs", ".ts", ".tsx", ".vue", ".svelte", ".astro", ".md", ".mdx", ".json", ".swift", ".kt", ".dart", ".xaml", ".txt"]);
const skipDirs = new Set(["node_modules", ".git", "dist", "build", ".next", "out", "coverage", "vendor"]);

function* walk(p) {
  const st = statSync(p);
  if (st.isDirectory()) {
    for (const name of readdirSync(p)) {
      if (skipDirs.has(name)) continue;
      yield* walk(join(p, name));
    }
  } else if (exts.has(extname(p).toLowerCase())) {
    yield p;
  }
}

let hits = 0;
const counts = {};
for (const target of targets) {
  if (!existsSync(target)) {
    console.error(`missing: ${target}`);
    continue;
  }
  for (const file of walk(target)) {
    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    const isWeb = webExts.has(extname(file).toLowerCase());
    lines.forEach((line, i) => {
      for (const [src, p, re] of compiled) {
        if (!isWeb && /^baseline:(visual|motion)$/.test(src)) continue;
        const m = re.exec(line);
        if (!m) continue;
        hits++;
        counts[src] = (counts[src] || 0) + 1;
        console.log(`${file}:${i + 1}: [${src}] ${m[0].trim().slice(0, 60)}  <- /${p}/`);
      }
    });
  }
}

console.log(`\n${hits} hit(s)` + (hits ? " by source: " + Object.entries(counts).map(([k, v]) => `${k}=${v}`).join(", ") : ""));
process.exit(hits ? 1 : 0);
