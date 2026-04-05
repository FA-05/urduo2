import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec16-l4",
  title: "History & Traditions",
  description: "تاریخ اور روایات",
  icon: "🏛️",
  exercises: [
    {
      id: "sec16-l4-vocab-storia",
      type: "VocabularyCard",
      italian: "Storia",
      urdu: "تاریخ",
      emoji: "📚",
      pronunciation: "[sto-ryah]",
      exampleItalian: "Studio la storia.",
      exampleUrdu: "میں تاریخ پڑھتا ہوں۔"
    },
    {
      id: "sec16-l4-vocab-tradizione",
      type: "VocabularyCard",
      italian: "Tradizione",
      urdu: "روايت",
      emoji: "🕯️",
      pronunciation: "[tra-dee-tsyo-ne]",
      exampleItalian: "È una vecchia tradizione.",
      exampleUrdu: "یہ ایک پرانی روایت ہے۔"
    },
    {
      id: "sec16-l4-mc-storia",
      type: "MultipleChoice",
      question: "\"تاریخ\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Storia", "Arte", "Musica", "Film"],
      correctAnswer: "Storia"
    },
    {
      id: "sec16-l4-vocab-passato",
      type: "VocabularyCard",
      italian: "Passato",
      urdu: "گزرا ہوا وقت / ماضی",
      emoji: "⏳",
      pronunciation: "[pas-sah-toh]",
      exampleItalian: "Ricordo il passato.",
      exampleUrdu: "مجھے ماضی یاد ہے۔"
    },
    {
      id: "sec16-l4-tf-tradizione",
      type: "TrueFalse",
      statement: "Tradizione = مستقبل",
      isTrue: false,
      correctAnswer: "روايت"
    },
    {
      id: "sec16-l4-vocab-antico",
      type: "VocabularyCard",
      italian: "Antico",
      urdu: "قدیم",
      emoji: "🏺",
      pronunciation: "[an-tee-koh]",
      exampleItalian: "Il castello è antico.",
      exampleUrdu: "قلعہ قدیم ہے۔"
    },
    {
      id: "sec16-l4-sr-studio-storia",
      type: "SentenceReconstruction",
      question: "میں تاریخ پڑھتا ہوں۔",
      correctSequence: ["Studio", "la", "storia"],
      shuffledWords: ["Studio", "la", "storia", "leggo", "un"],
      direction: "ur-to-it"
    },
    {
      id: "sec16-l4-sr-tradizione-bella",
      type: "SentenceReconstruction",
      question: "La tradizione è bella",
      correctSequence: ["روايت", "خوبصورت", "ہے"],
      shuffledWords: ["روايت", "خوبصورت", "ہے", "بری", "نئی"],
      direction: "it-to-ur"
    }
  ]
};
