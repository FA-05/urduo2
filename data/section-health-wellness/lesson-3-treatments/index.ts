import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "health-l3",
  title: "Treatments & Remedies",
  description: "علاج اور ادویات",
  icon: "💊",
  exercises: [
    {
      id: "health-l3-vocab-medicina",
      type: "VocabularyCard",
      italian: "Medicina",
      urdu: "دوا",
      emoji: "💊",
      pronunciation: "[me-dee-chee-na]",
      exampleItalian: "Prendi la medicina.",
      exampleUrdu: "دوا لو۔"
    },
    {
      id: "health-l3-vocab-sciroppo",
      type: "VocabularyCard",
      italian: "Sciroppo",
      urdu: "شربت (دوائی کا)",
      emoji: "🧴",
      pronunciation: "[she-rop-po]",
      exampleItalian: "Uno sciroppo per la tosse.",
      exampleUrdu: "کھانسی کے لیے ایک شربت۔"
    },
    {
      id: "health-l3-mc-cerotto",
      type: "MultipleChoice",
      question: "\"پٹی / بینڈ ایڈ\" (plaster/bandage) کو Italian میں کیا کہتے ہیں؟",
      options: ["Cerotto", "Crema", "Pasticca", "Iniezione"],
      correctAnswer: "Cerotto"
    },
    {
      id: "health-l3-vocab-pasticca",
      type: "VocabularyCard",
      italian: "Pasticca / Compressa",
      urdu: "گولی / ٹیبلٹ",
      emoji: "💊",
      pronunciation: "[pas-teek-kah]",
      exampleItalian: "Una pasticca al giorno.",
      exampleUrdu: "دن میں ایک گولی۔"
    },
    {
      id: "health-l3-tf-riposo",
      type: "TrueFalse",
      statement: "Riposo = کام کرنا",
      isTrue: false,
      correctAnswer: "آرام"
    },
    {
      id: "health-l3-vocab-ghiaccio",
      type: "VocabularyCard",
      italian: "Ghiaccio",
      urdu: "برف",
      emoji: "🧊",
      pronunciation: "[gyat-tcho]",
      exampleItalian: "Metti del ghiaccio.",
      exampleUrdu: "تھوڑی برف لگاؤ۔"
    },
    {
      id: "health-l3-sr-prendi-medicina",
      type: "SentenceReconstruction",
      question: "دوا لو۔",
      correctSequence: ["Prendi", "la", "medicina"],
      shuffledWords: ["Prendi", "la", "medicina", "il", "pane"],
      direction: "ur-to-it"
    },
    {
      id: "health-l3-sr-sciroppo-tosse",
      type: "SentenceReconstruction",
      question: "Uno sciroppo per la tosse",
      correctSequence: ["کھانسی", "کے", "لیے", "ایک", "شربت"],
      shuffledWords: ["کھانسی", "کے", "لیے", "ایک", "شربت", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
