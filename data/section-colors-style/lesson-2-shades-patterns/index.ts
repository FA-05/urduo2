import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "colors-l2",
  title: "Shades & Patterns",
  description: "رنگوں کی مختلف تہیں اور ڈیزائن",
  icon: "🏁",
  exercises: [
    {
      id: "colors-l2-vocab-chiaro",
      type: "VocabularyCard",
      italian: "Chiaro",
      urdu: "ہلکا (رنگ کے لیے)",
      emoji: "🌤️",
      pronunciation: "[kya-ro]",
      exampleItalian: "Voglio il blu chiaro.",
      exampleUrdu: "مجھے ہلکا نیلا رنگ چاہیے۔"
    },
    {
      id: "colors-l2-vocab-scuro",
      type: "VocabularyCard",
      italian: "Scuro",
      urdu: "گہرا / ڈارک",
      emoji: "🌑",
      pronunciation: "[skoo-ro]",
      exampleItalian: "È un rosso scuro.",
      exampleUrdu: "یہ گہرا سرخ رنگ ہے۔"
    },
    {
      id: "colors-l2-mc-righe",
      type: "MultipleChoice",
      question: "\"دھاری دار\" (striped) کو Italian میں کیا کہتے ہیں؟",
      options: ["A righe", "A pois", "Chiaro", "Scuro"],
      correctAnswer: "A righe"
    },
    {
      id: "colors-l2-vocab-pois",
      type: "VocabularyCard",
      italian: "A pois",
      urdu: "بندکیوں والا (polka dots)",
      emoji: "⚪🔴",
      pronunciation: "[a pwa]",
      exampleItalian: "Una camicia a pois.",
      exampleUrdu: "ایک بندکیوں والی قمیض۔"
    },
    {
      id: "colors-l2-tf-chiaro",
      type: "TrueFalse",
      statement: "Chiaro = گہرا",
      isTrue: false,
      correctAnswer: "ہلکا"
    },
    {
      id: "colors-l2-vocab-quadri",
      type: "VocabularyCard",
      italian: "A quadri",
      urdu: "چوکور خانوں والا (checkered)",
      emoji: "🏁",
      pronunciation: "[a kwa-dree]",
      exampleItalian: "Gonna a quadri.",
      exampleUrdu: "چوکور خانوں والا اسکرٹ۔"
    },
    {
      id: "colors-l2-sr-blu-chiaro",
      type: "SentenceReconstruction",
      question: "مجھے ہلکا نیلا رنگ چاہیے۔",
      correctSequence: ["Voglio", "il", "blu", "chiaro"],
      shuffledWords: ["Voglio", "il", "blu", "chiaro", "scuro", "la"],
      direction: "ur-to-it"
    },
    {
      id: "colors-l2-sr-camicia-pois",
      type: "SentenceReconstruction",
      question: "Una camicia a pois",
      correctSequence: ["ایک", "بندکیوں", "والی", "قمیض"],
      shuffledWords: ["ایک", "بندکیوں", "والی", "قمیض", "سادہ", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
