import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "gram2-l4",
  title: "Basic Conjunctions",
  description: "جملوں کو ملانے والے الفاظ: اور، لیکن، یا، کیوں",
  icon: "🔗",
  exercises: [
    {
      id: "gram2-l4-vocab-e",
      type: "VocabularyCard",
      italian: "E",
      urdu: "اور",
      emoji: "➕",
      pronunciation: "[e]",
      exampleItalian: "Pane e burro.",
      exampleUrdu: "روٹی اور مکھن۔"
    },
    {
      id: "gram2-l4-vocab-ma",
      type: "VocabularyCard",
      italian: "Ma",
      urdu: "لیکن",
      emoji: "⏸️",
      pronunciation: "[mah]",
      exampleItalian: "Voglio uscire, ma piove.",
      exampleUrdu: "میں باہر جانا چاہتا ہوں، لیکن بارش ہو رہی ہے۔"
    },
    {
      id: "gram2-l4-mc-perche",
      type: "MultipleChoice",
      question: "\"کیوں / کیونکہ\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Perché", "Quando", "Come", "Dove"],
      correctAnswer: "Perché"
    },
    {
      id: "gram2-l4-vocab-o",
      type: "VocabularyCard",
      italian: "O",
      urdu: "یا",
      emoji: "❓",
      pronunciation: "[o]",
      exampleItalian: "Tè o caffè?",
      exampleUrdu: "چائے یا کافی؟"
    },
    {
      id: "gram2-l4-tf-perche",
      type: "TrueFalse",
      statement: "Perché = کیسے",
      isTrue: false,
      correctAnswer: "کیوں / کیونکہ"
    },
    {
      id: "gram2-l4-vocab-perche",
      type: "VocabularyCard",
      italian: "Perché",
      urdu: "کیوں / کیونکہ / اس لیے کہ",
      emoji: "❔",
      pronunciation: "[per-keh]",
      exampleItalian: "Perché sei qui?",
      exampleUrdu: "تم یہاں کیوں ہو؟"
    },
    {
      id: "gram2-l4-sr-pane-e-burro",
      type: "SentenceReconstruction",
      question: "روٹی اور مکھن۔",
      correctSequence: ["Pane", "e", "burro"],
      shuffledWords: ["Pane", "e", "burro", "il", "latte"],
      direction: "ur-to-it"
    },
    {
      id: "gram2-l4-sr-voglio-ma-piove",
      type: "SentenceReconstruction",
      question: "Voglio uscire, ma piove",
      correctSequence: ["میں", "باہر", "جانا", "چاہتا", "ہوں", "لیکن", "بارش", "ہو", "رہی", "ہے"],
      shuffledWords: ["میں", "باہر", "جانا", "چاہتا", "ہوں", "لیکن", "بارش", "ہو", "رہی", "ہے", "دھوپ"],
      direction: "it-to-ur"
    }
  ]
};
