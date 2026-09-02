#!/usr/bin/env node
// WCAG 2.x contrast ratios for hex colour pairs.
// usage: node contrast.mjs <fg> <bg> [<fg> <bg> ...]   (hex, with or without #)
// Prints the ratio and pass/fail for body text (4.5), large text / UI (3.0), and AAA body (7.0).
// Exit 1 if any pair is below 3.0.
const args = process.argv.slice(2);
if (args.length < 2 || args.length % 2) {
  console.error("usage: node contrast.mjs <fg> <bg> [<fg> <bg> ...]");
  process.exit(2);
}
function rgb(hex) {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  if (!/^[0-9a-f]{6}$/i.test(n)) throw new Error(`bad hex: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255);
}
function lum(hex) {
  const [r, g, b] = rgb(hex).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
let worst = Infinity;
for (let i = 0; i < args.length; i += 2) {
  const [a, b] = [lum(args[i]), lum(args[i + 1])];
  const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  worst = Math.min(worst, ratio);
  const r = ratio.toFixed(2);
  console.log(`${args[i]} on ${args[i + 1]}: ${r}:1  body(4.5) ${ratio >= 4.5 ? "pass" : "FAIL"}  large/ui(3.0) ${ratio >= 3 ? "pass" : "FAIL"}  aaa(7.0) ${ratio >= 7 ? "pass" : "no"}`);
}
process.exit(worst < 3 ? 1 : 0);
