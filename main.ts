import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Entry for make.fun's "One Emoji, One Smile" bounty. The program
// writes exactly one emoji to /output/entry.txt (or
// $OUTPUT_DIR/entry.txt): the single emoji most likely to make a
// stranger smile, judged on warmth at first glance, universality,
// and how chosen-rather-than-default it feels.
// Pass 1 was the hugging face — an offered hug, warm at first
// glance, but a hug is physical intimacy, and the judge's brief
// warns that anything intimate can read oddly from a stranger.
// Pass 2 (final): the sun with a face. It is literally a smiling
// face radiating warmth, so it plainly aims to warm a stranger;
// every age and culture reads sunshine the same way; it is gently
// funny rather than the first smiley that comes to mind, so it
// feels chosen while staying instantly readable; and nothing
// about it is intimate, sarcastic or flirtatious. The default
// smileys were rejected as exactly that — default — and the
// heart-carrying faces for risking a flirtatious read.
// buildEntryEmoji() is the single source of truth for the exact
// text; nothing below duplicates the emoji.
export function buildEntryEmoji(): string {
  return "\u{1F31E}"; // sun with face
}

export const ENTRY_EMOJI = buildEntryEmoji();

const MAX_CHARS = 8;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_EMOJI)) {
  throw new Error(
    `entry must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_EMOJI)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_EMOJI, "utf8");
