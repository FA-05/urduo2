import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "conv4-l1",
  title: "Talking to a Neighbor",
  description: "پڑوسی سے بات چیت",
  icon: "🏡",
  exercises: [
    {
      id: "conv4-l1-vocab-vicino",
      type: "VocabularyCard",
      italian: "Vicino",
      urdu: "پڑوسی / قریب",
      emoji: "👋",
      pronunciation: "[vee-chee-no]",
      exampleItalian: "Lui è il mio vicino.",
      exampleUrdu: "وہ میرا پڑوسی ہے۔"
    },
    {
      id: "conv4-l1-vocab-palazzo",
      type: "VocabularyCard",
      italian: "Palazzo",
      urdu: "بلڈنگ / عمارت",
      emoji: "🏢",
      pronunciation: "[pa-lat-tso]",
      exampleItalian: "Vivo in questo palazzo.",
      exampleUrdu: "میں اس بلڈنگ میں رہتا ہوں۔"
    },
    {
      id: "conv4-l1-mc-posta",
      type: "MultipleChoice",
      question: "\"ڈاک / لیٹر\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Posta", "Libro", "Giornale", "Pacco"],
      correctAnswer: "Posta"
    },
    {
      id: "conv4-l1-vocab-posta",
      type: "VocabularyCard",
      italian: "Posta",
      urdu: "ڈاک / پوسٹ",
      emoji: "✉️",
      pronunciation: "[pos-tah]",
      exampleItalian: "C'è posta per me?",
      exampleUrdu: "کیا میرے لیے کوئی ڈاک ہے؟"
    },
    {
      id: "conv4-l1-tf-rumore",
      type: "TrueFalse",
      statement: "Rumore = خاموشی",
      isTrue: false,
      correctAnswer: "شور"
    },
    {
      id: "conv4-l1-vocab-chiave",
      type: "VocabularyCard",
      italian: "Chiave",
      urdu: "چابی",
      emoji: "🔑",
      pronunciation: "[kyah-ve]",
      exampleItalian: "Ho perso la chiave.",
      exampleUrdu: "میں نے چابی کھو دی ہے۔"
    },
    {
      id: "conv4-l1-sr-buon-vicino",
      type: "SentenceReconstruction",
      question: "وہ ایک اچھا پڑوسی ہے۔",
      correctSequence: ["Lui", "è", "un", "buon", "vicino"],
      shuffledWords: ["Lui", "è", "un", "buon", "vicino", "cattivo", "il"],
      direction: "ur-to-it"
    },
    {
      id: "conv4-l1-sr-chi-abita-qui",
      type: "SentenceReconstruction",
      question: "Chi abita qui?",
      correctSequence: ["یہاں", "کون", "رہتا", "ہے", "?"],
      shuffledWords: ["یہاں", "کون", "رہتا", "ہے", "?", "کیوں", "کب"],
      direction: "it-to-ur"
    }
  ]
};
