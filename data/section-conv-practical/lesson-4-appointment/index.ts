import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "conv2-l4",
  title: "Making an Appointment",
  description: "ملاقات کا وقت طے کرنا",
  icon: "📅",
  exercises: [
    {
      id: "conv2-l4-vocab-appuntamento",
      type: "VocabularyCard",
      italian: "Appuntamento",
      urdu: "ملاقات کا وقت / اپوائنٹمنٹ",
      emoji: "📅",
      pronunciation: "[ap-pun-ta-men-toh]",
      exampleItalian: "Ho un appuntamento domani.",
      exampleUrdu: "کل میری ایک ملاقات ہے۔"
    },
    {
      id: "conv2-l4-vocab-domani",
      type: "VocabularyCard",
      italian: "Domani",
      urdu: "کل (آنے والا)",
      emoji: "🌅",
      pronunciation: "[do-mah-nee]",
      exampleItalian: "Ci vediamo domani.",
      exampleUrdu: "کل ملتے ہیں۔"
    },
    {
      id: "conv2-l4-mc-disponibile",
      type: "MultipleChoice",
      question: "\"دستیاب\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Disponibile", "Libero", "Occupato", "Pronto"],
      correctAnswer: "Disponibile"
    },
    {
      id: "conv2-l4-vocab-libero",
      type: "VocabularyCard",
      italian: "Libero",
      urdu: "فری / آزاد / خالی",
      emoji: "🆓",
      pronunciation: "[lee-be-ro]",
      exampleItalian: "Sei libero oggi?",
      exampleUrdu: "کیا تم آج فری ہو؟"
    },
    {
      id: "conv2-l4-tf-domani",
      type: "TrueFalse",
      statement: "Domani = کل (گزرا ہوا)",
      isTrue: false,
      correctAnswer: "کل (آنے والا)"
    },
    {
      id: "conv2-l4-vocab-pomeriggio",
      type: "VocabularyCard",
      italian: "Pomeriggio",
      urdu: "سپہر / سہ پہر",
      emoji: "🌆",
      pronunciation: "[po-me-reed-joh]",
      exampleItalian: "Oggi pomeriggio.",
      exampleUrdu: "آج سہ پہر۔"
    },
    {
      id: "conv2-l4-sr-ho-un-appuntamento",
      type: "SentenceReconstruction",
      question: "کل میری ایک ملاقات ہے۔",
      correctSequence: ["Ho", "un", "appuntamento", "domani"],
      shuffledWords: ["Ho", "un", "appuntamento", "domani", "oggi", "il"],
      direction: "ur-to-it"
    },
    {
      id: "conv2-l4-sr-sei-libero",
      type: "SentenceReconstruction",
      question: "Sei libero oggi?",
      correctSequence: ["کیا", "تم", "آج", "فری", "ہو", "?"],
      shuffledWords: ["کیا", "تم", "آج", "فری", "ہو", "?", "نہیں", "کل"],
      direction: "it-to-ur"
    }
  ]
};
