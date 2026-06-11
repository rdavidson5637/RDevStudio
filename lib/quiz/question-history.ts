import type { Question } from "./types";

const MAX_HISTORY = 300;
const PROMPT_EXCLUDE_LIMIT = 40;

const globalHistory = globalThis as typeof globalThis & {
  __pubQuizQuestionHistory?: string[];
};

function getHistoryStore(): string[] {
  if (!globalHistory.__pubQuizQuestionHistory) {
    globalHistory.__pubQuizQuestionHistory = [];
  }
  return globalHistory.__pubQuizQuestionHistory;
}

export function questionFingerprint(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

export function isRecentlyUsed(text: string): boolean {
  const fingerprint = questionFingerprint(text);
  return getHistoryStore().includes(fingerprint);
}

export function getExcludeListForPrompt(): string[] {
  return getHistoryStore().slice(-PROMPT_EXCLUDE_LIMIT);
}

export function markQuestionsAsUsed(questions: Question[]): void {
  const store = getHistoryStore();

  for (const question of questions) {
    const fingerprint = questionFingerprint(question.text);
    if (!store.includes(fingerprint)) {
      store.push(fingerprint);
    }
  }

  while (store.length > MAX_HISTORY) {
    store.shift();
  }
}

export function filterUnusedQuestions(questions: Question[]): Question[] {
  return questions.filter((question) => !isRecentlyUsed(question.text));
}
