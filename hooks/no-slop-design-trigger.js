// UserPromptSubmit hook: when the prompt reads like design/UI/UX/animation work,
// inject a reminder that the no-slop-design skill is mandatory.
const chunks = [];
process.stdin.on("data", (c) => chunks.push(c));
process.stdin.on("end", () => {
  let prompt = "";
  try {
    prompt = JSON.parse(Buffer.concat(chunks).toString("utf8")).prompt || "";
  } catch {
    process.exit(0);
  }
  if (/no-slop-design/i.test(prompt)) process.exit(0);
  const design =
    /\b(design|redesign|restyle|ui|ux|layout|landing page|hero section|animation|animate|motion|transition|styling|theming|dark mode|typography|fonts?|palette|mockup|wireframe|figma|tailwind|css|component library|micro-?interactions?|hover (state|effect)|make (it|this) (look|feel)|looks? (better|nicer|prettier|modern|premium|clean)|polish the (ui|page|screen))\b/i;
  if (!design.test(prompt)) process.exit(0);
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "UserPromptSubmit",
        additionalContext:
          "This prompt mentions design, UI, styling, or animation. If the task changes how anything looks, moves, or reads (new UI, restyle, animation, layout, copy), the no-slop-design skill is mandatory: invoke it with the Skill tool (skill: no-slop-design) before asking anything, reading files, or writing code. If the task is a pure bug fix or refactor with no visual change, proceed without it.",
      },
    })
  );
});
