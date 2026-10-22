#!/usr/bin/env node
// PostToolUse hook for Edit, Write and MultiEdit.
// Scans only the text Claude just wrote (not the whole file) so old copy does not nag.
// Exit 2 sends stderr back to Claude so it fixes the problem before carrying on.

import { readFileSync } from "node:fs";

const EM_DASH = "—";
const BANNED = [
  "passionate",
  "journey",
  "seamless",
  "leverage",
  "synergy",
  "elevate",
  "unlock",
  "crafting digital experiences",
  "crafting experiences",
  "i['’]d love to",
  "reaching out",
  "circling back",
  "we take pride",
  "look no further",
  "second to none",
  "welcome to",
  "work in progress",
  "not finished yet",
];

let input = {};
try {
  input = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}

const ti = input.tool_input || {};
const file = String(ti.file_path || "").replace(/\\/g, "/");

const inScope = /\/(app|components|lib|data)\//.test(file) && /\.(tsx?|jsx?|mdx?|json)$/.test(file);
if (!inScope) process.exit(0);

const chunks = [];
if (typeof ti.content === "string") chunks.push(ti.content);
if (typeof ti.new_string === "string") chunks.push(ti.new_string);
if (Array.isArray(ti.edits)) {
  for (const e of ti.edits) if (e && typeof e.new_string === "string") chunks.push(e.new_string);
}
const text = chunks.join("\n");
if (!text) process.exit(0);

const problems = [];
if (text.includes(EM_DASH)) problems.push("em dash (use a hyphen or rewrite the sentence)");
for (const w of BANNED) {
  if (new RegExp(`\\b${w}\\b`, "i").test(text)) problems.push(`banned word or phrase: ${w.replace(/\['’\]/, "'")}`);
}

if (problems.length) {
  console.error(`Copy check failed in ${file}:\n- ${problems.join("\n- ")}\nFix these in the text you just wrote, then continue. Rules: .claude/rules/copy.md`);
  process.exit(2);
}
process.exit(0);
