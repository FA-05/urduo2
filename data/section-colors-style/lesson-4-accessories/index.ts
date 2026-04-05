import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "colors-l4",
  title: "Accessories & Materials",
  description: "آرائشی اشیاء اور کپڑوں کے مواد",
  icon: "🕶️",
  exercises: [
    {
      id: "colors-l4-vocab-borsa",
      type: "VocabularyCard",
      italian: "Borsa",
      urdu: "بیگ / تھیلا",
      emoji: "👜",
      pronunciation: "[bor-sah]",
      exampleItalian: "Dov'è la mia borsa?",
      exampleUrdu: "میرا بیگ کہاں ہے؟"
    },
    {
      id: "colors-l4-vocab-occhiali",
      type: "VocabularyCard",
      italian: "Occhiali",
      urdu: "چشمہ",
      emoji: "🕶️",
      pronunciation: "[ok-kyah-lee]",
      exampleItalian: "Porto gli occhiali da sole.",
      exampleUrdu: "میں دھوپ کا چشمہ پہنتا ہوں۔"
    },
    {
      id: "colors-l4-mc-cotone",
      type: "MultipleChoice",
      question: "\"سوتی کپڑا\" (cotton) کو Italian میں کیا کہتے ہیں؟",
      options: ["Cotone", "Seta", "Lana", "Pelle"],
      correctAnswer: "Cotone"
    },
    {
      id: "colors-l4-vocab-lana",
      type: "VocabularyCard",
      italian: "Lana",
      urdu: "اون (wool)",
      emoji: "🧶",
      pronunciation: "[la-nah]",
      exampleItalian: "Un maglione di lana.",
      exampleUrdu: "اون کا ایک سویٹر۔"
    },
    {
      id: "colors-l4-tf-seta",
      type: "TrueFalse",
      statement: "Seta = چمڑا",
      isTrue: false,
      correctAnswer: "ریشم"
    },
    {
      id: "colors-l4-vocab-cintura",
      type: "VocabularyCard",
      italian: "Cintura",
      urdu: "بیلٹ",
      emoji: "ベルト",
      pronunciation: "[chin-too-rah]",
      exampleItalian: "Una cintura di pelle.",
      exampleUrdu: "چمڑے کی ایک بیلٹ۔"
    },
    {
      id: "colors-l4-sr-dov-e-borsa",
      type: "SentenceReconstruction",
      question: "میرا بیگ کہاں ہے؟",
      correctSequence: ["Dov'è", "la", "mia", "borsa", "?"],
      shuffledWords: ["Dov'è", "la", "mia", "borsa", "?", "il", "mio"],
      direction: "ur-to-it"
    },
    {
      id: "colors-l4-sr-maglione-lana",
      type: "SentenceReconstruction",
      question: "Un maglione di lana",
      correctSequence: ["اون", "کا", "ایک", "سویٹر"],
      shuffledWords: ["اون", "کا", "ایک", "سویٹر", "سردی", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
