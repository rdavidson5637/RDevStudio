import type { Question } from "./types";
import { normalizeWikimediaImageUrl } from "./wikimedia";

type MediaQuestion = Pick<Question, "imageUrl" | "audioUrl">;

export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Image failed to load"));
    image.src = url;
  });
}

export function preloadAudio(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.preload = "auto";

    const cleanup = () => {
      audio.removeEventListener("canplaythrough", onReady);
      audio.removeEventListener("error", onError);
    };

    const onReady = () => {
      cleanup();
      resolve();
    };

    const onError = () => {
      cleanup();
      reject(new Error("Audio failed to load"));
    };

    audio.addEventListener("canplaythrough", onReady);
    audio.addEventListener("error", onError);
    audio.src = url;
    audio.load();
  });
}

export async function preloadQuestionMedia(
  question: MediaQuestion,
  timeoutMs = 3000
): Promise<void> {
  const tasks: Promise<void>[] = [];

  if (question.imageUrl) {
    tasks.push(
      preloadImage(normalizeWikimediaImageUrl(question.imageUrl)).catch(() => {
        /* show question anyway — QuestionImage handles error UI */
      })
    );
  }

  if (question.audioUrl) {
    tasks.push(
      preloadAudio(question.audioUrl).catch(() => {
        /* AudioPlayer handles error UI */
      })
    );
  }

  if (tasks.length === 0) {
    return;
  }

  await Promise.race([
    Promise.all(tasks).then(() => undefined),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, timeoutMs);
    }),
  ]);
}
