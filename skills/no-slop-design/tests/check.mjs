#!/usr/bin/env node
// Mechanical checks for the skill: frontmatter, cross-references, interview option counts, script smoke tests.
// usage: node tests/check.mjs   (from the skill directory or anywhere)
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let failures = 0;
const fail = (m) => { failures++; console.log("FAIL " + m); };
const ok = (m) => console.log("ok   " + m);

// 1. frontmatter
const skill = readFileSync(join(root, "SKILL.md"), "utf8");
const fm = skill.split("---")[1] || "";
if (!/^name:\s*no-slop-design\s*$/m.test(fm)) fail("frontmatter name");
else ok("frontmatter name");
const desc = (fm.match(/description:([\s\S]*)/) || ["", ""])[1].trim();
if (!desc.startsWith("Use when")) fail("description must start with 'Use when'"); else ok("description trigger form");
if (fm.length > 1024) fail(`frontmatter ${fm.length} chars > 1024`); else ok(`frontmatter ${fm.length} chars`);

// 2. cross-references from SKILL.md and references/*.md
const files = ["SKILL.md", ...readdirSync(join(root, "references")).map((f) => "references/" + f)];
for (const f of files) {
  const text = readFileSync(join(root, f), "utf8");
  for (const m of text.matchAll(/`?(references\/[a-z-]+\.md|scripts\/[a-z-]+\.mjs|tests\/[a-z-]+\.(md|mjs))`?/g)) {
    if (!existsSync(join(root, m[1]))) fail(`${f} references missing ${m[1]}`);
  }
  for (const m of text.matchAll(/\[([^\]]+)\]\(([a-z-]+\.md)\)/g)) {
    if (!existsSync(join(root, "references", m[2]))) fail(`${f} links missing references/${m[2]}`);
  }
}
ok("cross-references resolve");

// 3. interview option counts (2–4 per question; questions whose options come from research are marked dynamic)
const interview = readFileSync(join(root, "references/interview.md"), "utf8").split(/\r?\n/);
let q = null, n = 0;
const flush = () => { if (q && !/type pairing|Which direction/.test(q) && (n < 2 || n > 4)) fail(`interview: "${q.slice(0, 60)}" has ${n} options`); };
for (const l of interview) {
  if (/^Question/.test(l)) { flush(); q = l; n = 0; }
  else if (/^- /.test(l) && q) n++;
  else if (/^## /.test(l)) { flush(); q = null; }
}
flush();
ok("interview option counts");

// 4. scripts smoke
const node = process.execPath;
const c = spawnSync(node, [join(root, "scripts/contrast.mjs"), "16191C", "EEF0EF"], { encoding: "utf8" });
if (c.status !== 0 || !/15\.4\d:1/.test(c.stdout)) fail("contrast.mjs"); else ok("contrast.mjs");
const a = spawnSync(node, [join(root, "scripts/audit.mjs"), "-", join(root, "tests/check.mjs")], { encoding: "utf8" });
if (a.status !== 0 || !/0 hit/.test(a.stdout)) fail("audit.mjs on a clean file: " + a.stdout.split("\n").slice(-2).join(" ")); else ok("audit.mjs clean run");
const cap = spawnSync(node, [join(root, "scripts/capture.mjs")], { encoding: "utf8" });
if (cap.status !== 2 || !/usage/.test(cap.stderr)) fail("capture.mjs usage"); else ok("capture.mjs usage");

// 5. size guard
const words = skill.split(/\s+/).length;
if (words > 3000) fail(`SKILL.md is ${words} words; keep the spine under 3000`); else ok(`SKILL.md ${words} words`);

console.log(failures ? `\n${failures} failure(s)` : "\nall checks passed");
process.exit(failures ? 1 : 0);
