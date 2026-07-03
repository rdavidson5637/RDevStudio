import { filterUnusedQuestions } from "./question-history";
import { QuestionType, QuizCategory, type Question } from "./types";

export const pictureFallbackQuestions: Question[] = [
  {
    id: "pic_001",
    text: "Which country does this flag belong to?",
    type: QuestionType.PICTURE,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/330px-Flag_of_Ireland.svg.png",
    imageAlt: "A flag with green, white, and orange vertical stripes",
    options: ["Ireland", "Italy", "Ivory Coast", "Hungary"],
    correctAnswer: "Ireland",
    category: QuizCategory.GEOGRAPHY,
    explanation:
      "The Irish tricolour — green represents Irish nationalism, orange represents Unionism, white represents peace between them.",
  },
  {
    id: "pic_002",
    text: "Which country does this flag belong to?",
    type: QuestionType.PICTURE,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/330px-Flag_of_France.svg.png",
    imageAlt: "A flag with blue, white, and red vertical stripes",
    options: ["France", "Netherlands", "Russia", "Luxembourg"],
    correctAnswer: "France",
    category: QuizCategory.GEOGRAPHY,
    explanation: "The French tricolour dates from the French Revolution.",
  },
  {
    id: "pic_003",
    text: "Which country does this flag belong to?",
    type: QuestionType.PICTURE,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/330px-Flag_of_Japan.svg.png",
    imageAlt: "A white flag with a red circle in the centre",
    options: ["Japan", "Bangladesh", "Palau", "South Korea"],
    correctAnswer: "Japan",
    category: QuizCategory.GEOGRAPHY,
    explanation:
      "The Japanese flag is known as the Hinomaru — 'circle of the sun'.",
  },
  {
    id: "pic_004",
    text: "Name this landmark",
    type: QuestionType.PICTURE,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/330px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
    imageAlt: "An iron lattice tower in Paris",
    options: [
      "Eiffel Tower",
      "Tokyo Tower",
      "CN Tower",
      "Leaning Tower of Pisa",
    ],
    correctAnswer: "Eiffel Tower",
    category: QuizCategory.GEOGRAPHY,
    explanation:
      "The Eiffel Tower was built for the 1889 World's Fair in Paris.",
  },
  {
    id: "pic_005",
    text: "Name this landmark",
    type: QuestionType.PICTURE,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/330px-Colosseo_2020.jpg",
    imageAlt: "A large ancient amphitheatre in Rome",
    options: ["Colosseum", "Parthenon", "Pantheon", "Acropolis"],
    correctAnswer: "Colosseum",
    category: QuizCategory.GEOGRAPHY,
    explanation:
      "The Colosseum could hold an estimated 50,000–80,000 spectators.",
  },
  {
    id: "pic_006",
    text: "Name this landmark",
    type: QuestionType.PICTURE,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Clock_Tower_-_Palace_of_Westminster%2C_London_-_May_2007.jpg/330px-Clock_Tower_-_Palace_of_Westminster%2C_London_-_May_2007.jpg",
    imageAlt: "A clock tower beside the River Thames",
    options: ["Big Ben", "Tower Bridge", "London Eye", "St Paul's Cathedral"],
    correctAnswer: "Big Ben",
    category: QuizCategory.GEOGRAPHY,
    explanation:
      "Big Ben is the nickname for the Great Bell in the Elizabeth Tower at Westminster.",
  },
  {
    id: "pic_007",
    text: "Name this landmark",
    type: QuestionType.PICTURE,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sydney_Opera_House_Sails.jpg/330px-Sydney_Opera_House_Sails.jpg",
    imageAlt: "A building with white sail-shaped roofs on a harbour",
    options: [
      "Sydney Opera House",
      "Guggenheim Museum",
      "Lotus Temple",
      "Walt Disney Concert Hall",
    ],
    correctAnswer: "Sydney Opera House",
    category: QuizCategory.GEOGRAPHY,
    explanation: "Designed by Jørn Utzon, it opened in 1973.",
  },
  {
    id: "pic_008",
    text: "What animal is pictured?",
    type: QuestionType.PICTURE,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/330px-African_Bush_Elephant.jpg",
    imageAlt: "A large grey elephant with tusks on the savannah",
    options: [
      "African elephant",
      "Asian elephant",
      "Rhinoceros",
      "Hippopotamus",
    ],
    correctAnswer: "African elephant",
    category: QuizCategory.GENERAL,
    explanation: "African elephants have larger ears than their Asian cousins.",
  },
  {
    id: "pic_009",
    text: "What animal is pictured?",
    type: QuestionType.PICTURE,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Bald_Eagle_Portrait.jpg/330px-Bald_Eagle_Portrait.jpg",
    imageAlt: "A white-headed eagle with a yellow beak",
    options: ["Bald eagle", "Golden eagle", "Osprey", "Red-tailed hawk"],
    correctAnswer: "Bald eagle",
    category: QuizCategory.GENERAL,
    explanation: "The bald eagle is the national bird of the United States.",
  },
  {
    id: "pic_010",
    text: "Name this landmark",
    type: QuestionType.PICTURE,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Statue_of_Liberty_7.jpg/330px-Statue_of_Liberty_7.jpg",
    imageAlt: "A green copper statue holding a torch on an island",
    options: [
      "Statue of Liberty",
      "Christ the Redeemer",
      "Liberty Bell",
      "Mount Rushmore",
    ],
    correctAnswer: "Statue of Liberty",
    category: QuizCategory.GEOGRAPHY,
    explanation: "A gift from France, dedicated in 1886.",
  },
  {
    id: "pic_011",
    text: "Which mountain is shown?",
    type: QuestionType.PICTURE,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/080103_hiruzen_sanrou_01.jpg/330px-080103_hiruzen_sanrou_01.jpg",
    imageAlt: "A snow-capped mountain peak above clouds",
    options: ["Mount Fuji", "Mount Everest", "Mount Kilimanjaro", "Matterhorn"],
    correctAnswer: "Mount Fuji",
    category: QuizCategory.GEOGRAPHY,
    explanation: "Mount Fuji is Japan's highest peak at 3,776 metres.",
  },
  {
    id: "pic_012",
    text: "Which country does this flag belong to?",
    type: QuestionType.PICTURE,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/330px-Flag_of_Germany.svg.png",
    imageAlt: "A flag with black, red, and gold horizontal stripes",
    options: ["Germany", "Belgium", "Austria", "Estonia"],
    correctAnswer: "Germany",
    category: QuizCategory.GEOGRAPHY,
    explanation:
      "The German flag's black-red-gold colours date to the 19th century.",
  },
];

function shuffleArray<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getPictureFallbackQuestions(count: number): Question[] {
  const unused = filterUnusedQuestions(shuffleArray(pictureFallbackQuestions));
  return unused.slice(0, count);
}
