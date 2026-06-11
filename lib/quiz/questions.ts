import {
  finalizeGeneratedQuestions,
  generateQuestionsFromAI,
} from "./ai-generator";
import { getFallbackQuestions } from "./fallback-questions";
import { enrichMusicRoundQuestions } from "./music-enrichment";
import { getMusicFallbackQuestions } from "./music-fallback";
import { buildPictureRoundQuestions } from "./picture-questions";
import { getPictureFallbackQuestions } from "./picture-fallback";
import { filterUnusedQuestions } from "./question-history";
import { RoundFormat, type Question, type RoundConfig } from "./types";
import { normalizeWikimediaImageUrl } from "./wikimedia";

function getFormatFallbackQuestions(
  round: RoundConfig,
  count: number
): Question[] {
  if (round.format === RoundFormat.PICTURE) {
    return getPictureFallbackQuestions(count);
  }

  if (round.format === RoundFormat.MUSIC) {
    return getMusicFallbackQuestions(count);
  }

  return getFallbackQuestions(round.category, count);
}

export async function generateQuestionsForRound(
  round: RoundConfig,
  gameId: string
): Promise<Question[]> {
  if (round.questionCount <= 0) {
    return [];
  }

  let questions: Question[] = [];

  try {
    questions = await generateQuestionsFromAI({
      category: round.category,
      format: round.format,
      difficulty: round.difficulty,
      count: round.questionCount,
      roundName: round.name,
      gameId,
    });
  } catch (error) {
    console.error(
      `AI generation failed for ${round.name}, using fallback:`,
      error
    );
  }

  if (questions.length < round.questionCount) {
    const needed = round.questionCount - questions.length;
    const fallback = filterUnusedQuestions(
      getFormatFallbackQuestions(round, needed * 2)
    ).slice(0, needed);

    questions = [...questions, ...fallback];
  }

  if (round.format === RoundFormat.PICTURE) {
    questions = await buildPictureRoundQuestions(
      questions,
      round.questionCount
    );
  } else if (round.format === RoundFormat.MUSIC) {
    questions = enrichMusicRoundQuestions(questions);
  } else {
    questions = filterUnusedQuestions(questions).slice(0, round.questionCount);
  }

  const unique =
    round.format === RoundFormat.PICTURE
      ? questions
      : filterUnusedQuestions(questions).slice(0, round.questionCount);

  return finalizeGeneratedQuestions(
    unique.map((question, index) => ({
      ...question,
      id: `${round.id}_q${index + 1}`,
      roundId: round.id,
      format: round.format,
      imageUrl: question.imageUrl
        ? normalizeWikimediaImageUrl(question.imageUrl)
        : undefined,
    }))
  );
}

export async function generateQuestionsForGame(
  roundConfigs: RoundConfig[],
  gameId: string
): Promise<Question[]> {
  if (roundConfigs.length === 0) {
    return [];
  }

  const questionSets = await Promise.all(
    roundConfigs.map((round) => generateQuestionsForRound(round, gameId))
  );

  return questionSets.flat();
}
