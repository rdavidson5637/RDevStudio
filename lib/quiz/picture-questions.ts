import {
  getPictureFallbackQuestions,
  pictureFallbackQuestions,
} from "./picture-fallback";
import { QuestionType, type Question } from "./types";
import {
  isWikimediaImageAccessible,
  normalizeWikimediaImageUrl,
} from "./wikimedia";

async function verifyPictureQuestion(
  question: Question
): Promise<Question | null> {
  if (!question.imageUrl || !question.imageAlt) {
    return null;
  }

  const imageUrl = normalizeWikimediaImageUrl(question.imageUrl);

  if (!(await isWikimediaImageAccessible(imageUrl))) {
    console.warn(
      `Picture question "${question.id}" dropped — image not accessible: ${imageUrl}`
    );
    return null;
  }

  return {
    ...question,
    type: QuestionType.PICTURE,
    imageUrl,
  };
}

/**
 * Build a picture round from AI output, keeping only questions with working
 * images and filling the rest from our verified fallback pool.
 */
export async function buildPictureRoundQuestions(
  aiQuestions: Question[],
  count: number
): Promise<Question[]> {
  const verified: Question[] = [];

  for (const question of aiQuestions) {
    const valid = await verifyPictureQuestion(question);

    if (valid) {
      verified.push(valid);
    }

    if (verified.length >= count) {
      break;
    }
  }

  if (verified.length >= count) {
    return verified.slice(0, count);
  }

  const usedUrls = new Set(verified.map((question) => question.imageUrl));
  const fallbacks = getPictureFallbackQuestions(count * 2);

  for (const fallback of fallbacks) {
    if (verified.length >= count) {
      break;
    }

    if (fallback.imageUrl && !usedUrls.has(fallback.imageUrl)) {
      verified.push(fallback);
      usedUrls.add(fallback.imageUrl);
    }
  }

  let cycleIndex = 0;
  while (
    verified.length < count &&
    pictureFallbackQuestions.length > 0 &&
    cycleIndex < pictureFallbackQuestions.length * 2
  ) {
    const fallback =
      pictureFallbackQuestions[cycleIndex % pictureFallbackQuestions.length];
    cycleIndex += 1;

    if (!fallback.imageUrl || usedUrls.has(fallback.imageUrl)) {
      continue;
    }

    verified.push({
      ...fallback,
      id: `${fallback.id}_fill_${verified.length}`,
    });
    usedUrls.add(fallback.imageUrl);
  }

  return verified.slice(0, count);
}
