import { championsDraftNote } from "./champions-draft";
import { draftAnalyserNote } from "./draft-analyser";
import { pubQuizNote } from "./pub-quiz";
import type { BuildNote } from "./types";

export const BUILD_NOTES: readonly BuildNote[] = [
  pubQuizNote,
  draftAnalyserNote,
  championsDraftNote,
];

export const REPO_URL = "https://github.com/rdavidson5637/rdevstudio";

export function getBuildNote(slug: string): BuildNote | undefined {
  return BUILD_NOTES.find((note) => note.slug === slug);
}

export function repoFileUrl(path: string): string {
  return `${REPO_URL}/blob/main/${path.split("/").map(encodeURIComponent).join("/")}`;
}

export function repoCommitUrl(sha: string): string {
  return `${REPO_URL}/commit/${sha}`;
}
