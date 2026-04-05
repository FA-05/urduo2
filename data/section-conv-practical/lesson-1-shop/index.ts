import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "conv2-l1",
  title: "In the Shop",
  description: "دکان پر",
  icon: "🛍️",
  exercises: [
    {
      id: "conv2-l1-vocab-quanto-costa",
      type: "VocabularyCard",
      italian: "Quanto costa?",
      urdu: "اس کی قیمت کیا ہے؟",
      emoji: "💰",
      pronunciation: "[kwan-toh kos-tah]",
      exampleItalian: "Scusa, quanto costa questo?",
      exampleUrdu: "معاف کیجیے گا، اس کی قیمت کیا ہے؟"
    },
    {
      id: "conv2-l1-vocab-sconto",
      type: "VocabularyCard",
      italian: "Sconto",
      urdu: "رعایت / ڈسکاؤنٹ",
      emoji: "🏷️",
      pronunciation: "[skon-toh]",
      exampleItalian: "C'è uno sconto?",
      exampleUrdu: "کیا کوئی رعایت ہے؟"
    },
    {
      id: "conv2-l1-mc-costo",
      type: "MultipleChoice",
      question: "\"قیمت\" معلوم کرنے کے لیے کیا کہتے ہیں؟",
      options: ["Quanto costa?", "Dove vai?", "Che ore sono?", "Come stai?"],
      correctAnswer: "Quanto costa?"
    },
    {
      id: "conv2-l1-vocab-comprare",
      type: "VocabularyCard",
      italian: "Comprare",
      urdu: "خریدنا",
      emoji: "🛒",
      pronunciation: "[kom-prah-re]",
      exampleItalian: "Voglio comprare una maglia.",
      exampleUrdu: "میں ایک قمیض خریدنا چاہتا ہوں۔"
    },
    {
      id: "conv2-l1-tf-comprare",
      type: "TrueFalse",
      statement: "Comprare = بیچنا",
      isTrue: false,
      correctAnswer: "خریدنا"
    },
    {
      id: "conv2-l1-vocab-caro",
      type: "VocabularyCard",
      italian: "Caro",
      urdu: "مہنگا / پیارا",
      emoji: "💸",
      pronunciation: "[kah-roh]",
      exampleItalian: "Questo è troppo caro.",
      exampleUrdu: "یہ بہت مہنگا ہے۔"
    },
    {
      id: "conv2-l1-sr-quanto-costa",
      type: "SentenceReconstruction",
      question: "اس کی قیمت کیا ہے؟",
      correctSequence: ["Quanto", "costa", "questo", "?"],
      shuffledWords: ["Quanto", "costa", "questo", "?", "va", "bene"],
      direction: "ur-to-it"
    },
    {
      id: "conv2-l1-sr-troppo-caro",
      type: "SentenceReconstruction",
      question: "Questo è troppo caro",
      correctSequence: ["یہ", "بہت", "مہنگا", "ہے"],
      shuffledWords: ["یہ", "بہت", "مہنگا", "ہے", "سستا", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
