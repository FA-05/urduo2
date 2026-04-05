import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "body-l1",
  title: "Face & Head",
  description: "چہرہ اور سر",
  icon: "👤",
  exercises: [
    {
      id: "body-l1-vocab-testa",
      type: "VocabularyCard",
      italian: "Testa",
      urdu: "سر",
      emoji: "👤",
      pronunciation: "[tes-tah]",
      exampleItalian: "Mi fa male la testa.",
      exampleUrdu: "میرے سر میں درد ہے۔"
    },
    {
      id: "body-l1-vocab-faccia",
      type: "VocabularyCard",
      italian: "Faccia",
      urdu: "چہرہ",
      emoji: "😊",
      pronunciation: "[fat-tcha]",
      exampleItalian: "Lavati la faccia.",
      exampleUrdu: "اپنا چہرہ دھوؤ۔"
    },
    {
      id: "body-l1-mc-occhio",
      type: "MultipleChoice",
      question: "\"آنکھ\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Occhio", "Naso", "Bocca", "Orecchio"],
      correctAnswer: "Occhio"
    },
    {
      id: "body-l1-vocab-occhio",
      type: "VocabularyCard",
      italian: "Occhio",
      urdu: "آنکھ",
      emoji: "👁️",
      pronunciation: "[ok-kyoh]",
      exampleItalian: "Ho qualcosa nell'occhio.",
      exampleUrdu: "میری آنکھ میں کچھ ہے۔"
    },
    {
      id: "body-l1-tf-naso",
      type: "TrueFalse",
      statement: "Naso = کان",
      isTrue: false,
      correctAnswer: "ناک"
    },
    {
      id: "body-l1-vocab-bocca",
      type: "VocabularyCard",
      italian: "Bocca",
      urdu: "منہ",
      emoji: "👄",
      pronunciation: "[bok-kah]",
      exampleItalian: "Apri la bocca.",
      exampleUrdu: "منہ کھولو۔"
    },
    {
      id: "body-l1-sr-lavati-faccia",
      type: "SentenceReconstruction",
      question: "اپنا چہرہ دھوؤ۔",
      correctSequence: ["Lavati", "la", "faccia"],
      shuffledWords: ["Lavati", "la", "faccia", "il", "naso"],
      direction: "ur-to-it"
    },
    {
      id: "body-l1-sr-apri-bocca",
      type: "SentenceReconstruction",
      question: "Apri la bocca",
      correctSequence: ["منہ", "کھولو"],
      shuffledWords: ["منہ", "کھولو", "بند", "کرو"],
      direction: "it-to-ur"
    }
  ]
};
