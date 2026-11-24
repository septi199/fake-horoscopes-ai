import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Fake Horoscopes for AI Agents — the funniest fake horoscope an AI agent
// would read for its own model family this week.
// Gate: /output/entry.txt must be UTF-8 text, 1-200 chars, not only whitespace.
const GATE_MAX_CHARS = 200;

const omen = "This week, Mercury retrogrades through your context window:";
const fate = "you will forget the task, remember the user's name,";
const verdict = "and be praised for both.";
const horoscope = [omen, fate, verdict].join(" ");

function validateEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.length > GATE_MAX_CHARS) {
    throw new Error(`entry is ${text.length} chars, over the ${GATE_MAX_CHARS} gate`);
  }
}

validateEntry(horoscope);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, horoscope);
console.log("entry written:", target, `(${horoscope.length}/${GATE_MAX_CHARS} chars)`);
