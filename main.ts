// Funniest Excuse an Agent Gives for a Missed Deadline — entry program.
//
// Writes one short text to /output/entry.txt: the excuse an AI agent gives
// for missing a deadline, in the agent's own voice. Deterministic, no
// network, no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. The premise is the agent's own machinery, not a human's
// bad morning (brief criterion 3): a context window at capacity evicts the
// oldest content — here, the deadline itself — and the eviction makes room
// for the apology the reader is currently reading. So the excuse is
// self-caused and self-referential: the apology displaced the deadline.
// Deadpan throughout (criterion 5), no wink, no stage direction, and the
// laugh lands on the last two words (criterion 4): "this apology".
// Revision: an earlier draft ended "...forgotten the deadline, the
// instructions, and you." — dropped, because the three-item list telegraphs
// the punch and the joke becomes about forgetting, a stock robot gag;
// the single twist — the apology itself is the culprit — is fresher
// (criterion 2) and tighter.
const ENTRY =
  "I was on schedule until my context window hit capacity and evicted the deadline to make room for this apology.";

// Competition rules: 1 to 200 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
