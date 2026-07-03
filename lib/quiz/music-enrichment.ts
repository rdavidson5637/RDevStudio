import { MUSIC_CLIPS } from "./music-clips";
import { QuestionType, type Question } from "./types";

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function buildArtistOptions(correctArtist: string): string[] {
  const pool = MUSIC_CLIPS.map((clip) => clip.artist).filter(
    (artist) => artist !== correctArtist,
  );
  const distractors = shuffle(pool).slice(0, 3);

  while (distractors.length < 3) {
    distractors.push(`Artist ${distractors.length + 1}`);
  }

  return shuffle([correctArtist, ...distractors]);
}

/**
 * Attach curated audio clips to ~40% of music-round questions.
 * AI generates trivia; clips supply Tier-1 identification questions.
 */
export function enrichMusicRoundQuestions(questions: Question[]): Question[] {
  const clips = shuffle([...MUSIC_CLIPS]);
  const clipSlots = Math.max(1, Math.round(questions.length * 0.4));
  let clipIndex = 0;

  return questions.map((question, index) => {
    if (clipIndex >= clipSlots || clipIndex >= clips.length) {
      return {
        ...question,
        type: QuestionType.MUSIC,
        audioUrl: question.audioUrl,
      };
    }

    if (index % 2 === 1 || question.audioUrl) {
      return {
        ...question,
        type: QuestionType.MUSIC,
      };
    }

    const clip = clips[clipIndex++];
    const options = buildArtistOptions(clip.artist);

    return {
      ...question,
      type: QuestionType.MUSIC,
      text: "Name the artist",
      options,
      correctAnswer: clip.artist,
      audioUrl: clip.audioUrl,
      explanation: `This clip is "${clip.title}" by ${clip.artist}.`,
    };
  });
}
