import { MUSIC_CLIPS } from "./music-clips";
import { filterUnusedQuestions } from "./question-history";
import { QuestionType, QuizCategory, type Question } from "./types";

const musicTriviaFallback: Question[] = [
  {
    id: "music_trivia_001",
    text: "Which band released 'Bohemian Rhapsody'?",
    type: QuestionType.MUSIC,
    options: ["Queen", "The Beatles", "Led Zeppelin", "Pink Floyd"],
    correctAnswer: "Queen",
    category: QuizCategory.MUSIC,
    explanation: "Bohemian Rhapsody topped the UK charts twice — in 1975 and 1991.",
  },
  {
    id: "music_trivia_002",
    text: "What year did Adele release the album '21'?",
    type: QuestionType.MUSIC,
    options: ["2009", "2011", "2013", "2015"],
    correctAnswer: "2011",
    category: QuizCategory.MUSIC,
    explanation: "21 won six Grammy Awards including Album of the Year.",
  },
  {
    id: "music_trivia_003",
    text: "Who is known as the King of Pop?",
    type: QuestionType.MUSIC,
    options: null,
    correctAnswer: "Michael Jackson",
    category: QuizCategory.MUSIC,
    explanation: "Michael Jackson earned the nickname throughout his career.",
  },
  {
    id: "music_trivia_004",
    text: "Which band released the album Abbey Road?",
    type: QuestionType.MUSIC,
    options: ["The Rolling Stones", "The Beatles", "Queen", "Led Zeppelin"],
    correctAnswer: "The Beatles",
    category: QuizCategory.MUSIC,
    explanation: "Abbey Road was released in 1969.",
  },
  {
    id: "music_trivia_005",
    text: "Complete the song title: The Beatles — ___ Submarine",
    type: QuestionType.MUSIC,
    options: ["Yellow", "Blue", "Green", "Red"],
    correctAnswer: "Yellow",
    category: QuizCategory.MUSIC,
    explanation: "Yellow Submarine was released in 1966.",
  },
  {
    id: "music_trivia_006",
    text: "Which artist had a 2020 hit with 'Blinding Lights'?",
    type: QuestionType.MUSIC,
    options: null,
    correctAnswer: "The Weeknd",
    category: QuizCategory.MUSIC,
    explanation: "Blinding Lights topped charts in over 30 countries.",
  },
  {
    id: "music_trivia_007",
    text: "In what year was 'Smells Like Teen Spirit' released?",
    type: QuestionType.MUSIC,
    options: ["1989", "1991", "1993", "1995"],
    correctAnswer: "1991",
    category: QuizCategory.MUSIC,
    explanation: "Nirvana's anthem defined the grunge era.",
  },
  {
    id: "music_trivia_008",
    text: "Which Irish band released 'With or Without You'?",
    type: QuestionType.MUSIC,
    options: ["U2", "The Cranberries", "Snow Patrol", "The Script"],
    correctAnswer: "U2",
    category: QuizCategory.MUSIC,
    explanation: "The song appeared on U2's 1987 album The Joshua Tree.",
  },
];

function buildClipQuestion(
  clip: (typeof MUSIC_CLIPS)[number],
  index: number
): Question {
  const distractors = MUSIC_CLIPS.filter((item) => item.artist !== clip.artist)
    .slice(0, 3)
    .map((item) => item.artist);

  return {
    id: `music_clip_${index}`,
    text: "Name the artist",
    type: QuestionType.MUSIC,
    audioUrl: clip.audioUrl,
    options: [clip.artist, ...distractors].slice(0, 4),
    correctAnswer: clip.artist,
    category: QuizCategory.MUSIC,
    explanation: `This clip is "${clip.title}" by ${clip.artist}.`,
  };
}

export const musicFallbackQuestions: Question[] = [
  ...musicTriviaFallback,
  ...MUSIC_CLIPS.slice(0, 6).map((clip, index) =>
    buildClipQuestion(clip, index)
  ),
];

function shuffleArray<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getMusicFallbackQuestions(count: number): Question[] {
  const unused = filterUnusedQuestions(shuffleArray(musicFallbackQuestions));
  return unused.slice(0, count);
}
