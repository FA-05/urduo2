import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "body-l2",
  title: "Torso & Limbs",
  description: "دھڑ اور اعضاء",
  icon: "💪",
  exercises: [
    {
      id: "body-l2-vocab-braccio",
      type: "VocabularyCard",
      italian: "Braccio",
      urdu: "بازو",
      emoji: "💪",
      pronunciation: "[brat-tcho]",
      exampleItalian: "Alza il braccio.",
      exampleUrdu: "اپنا بازو اٹھاؤ۔"
    },
    {
      id: "body-l2-vocab-mano",
      type: "VocabularyCard",
      italian: "Mano",
      urdu: "ہاتھ",
      emoji: "✋",
      pronunciation: "[mah-no]",
      exampleItalian: "Dammi la mano.",
      exampleUrdu: "مجھے ہاتھ دو۔"
    },
    {
      id: "body-l2-mc-gamba",
      type: "MultipleChoice",
      question: "\"ٹانگ\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Gamba", "Piede", "Braccio", "Schiena"],
      correctAnswer: "Gamba"
    },
    {
      id: "body-l2-vocab-gamba",
      type: "VocabularyCard",
      italian: "Gamba",
      urdu: "ٹانگ",
      emoji: "🦵",
      pronunciation: "[gam-bah]",
      exampleItalian: "Ho male alla gamba.",
      exampleUrdu: "میری ٹانگ میں درد ہے۔"
    },
    {
      id: "body-l2-tf-piede",
      type: "TrueFalse",
      statement: "Piede = انگلی",
      isTrue: false,
      correctAnswer: "پاؤں"
    },
    {
      id: "body-l2-vocab-schiena",
      type: "VocabularyCard",
      italian: "Schiena",
      urdu: "کمر / پیٹھ",
      emoji: "🧍",
      pronunciation: "[skye-na]",
      exampleItalian: "Ho dolore alla schiena.",
      exampleUrdu: "میری کمر میں درد ہے۔"
    },
    {
      id: "body-l2-sr-alza-braccio",
      type: "SentenceReconstruction",
      question: "اپنا بازو اٹھاؤ۔",
      correctSequence: ["Alza", "il", "braccio"],
      shuffledWords: ["Alza", "il", "braccio", "la", "mano"],
      direction: "ur-to-it"
    },
    {
      id: "body-l2-sr-dammi-mano",
      type: "SentenceReconstruction",
      question: "Dammi la mano",
      correctSequence: ["مجھے", "ہاتھ", "دو"],
      shuffledWords: ["مجھے", "ہاتھ", "دو", "کلو", "نہ"],
      direction: "it-to-ur"
    }
  ]
};
