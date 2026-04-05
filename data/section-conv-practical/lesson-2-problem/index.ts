import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "conv2-l2",
  title: "Describing a Problem",
  description: "مسئلے کی وضاحت",
  icon: "⚠️",
  exercises: [
    {
      id: "conv2-l2-vocab-problema",
      type: "VocabularyCard",
      italian: "Problema",
      urdu: "مسئلہ",
      emoji: "❓",
      pronunciation: "[pro-ble-mah]",
      exampleItalian: "Ho un problema.",
      exampleUrdu: "میرا ایک مسئلہ ہے۔"
    },
    {
      id: "conv2-l2-vocab-rotto",
      type: "VocabularyCard",
      italian: "Rotto",
      urdu: "ٹوٹا ہوا / خراب",
      emoji: "🔨",
      pronunciation: "[rot-toh]",
      exampleItalian: "Il telefono è rotto.",
      exampleUrdu: "فون خراب ہے۔"
    },
    {
      id: "conv2-l2-mc-perso",
      type: "MultipleChoice",
      question: "\"میرا فون کھو گیا ہے\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Ho perso il telefono", "Il telefono è rotto", "Cerco il telefono", "Dov'è il telefono?"],
      correctAnswer: "Ho perso il telefono"
    },
    {
      id: "conv2-l2-vocab-perso",
      type: "VocabularyCard",
      italian: "Ho perso",
      urdu: "میں نے کھو دیا",
      emoji: "🏃",
      pronunciation: "[ho per-so]",
      exampleItalian: "Ho perso le chiavi.",
      exampleUrdu: "میں نے چابیاں کھو دی ہیں۔"
    },
    {
      id: "conv2-l2-tf-rotto",
      type: "TrueFalse",
      statement: "Rotto = نیا",
      isTrue: false,
      correctAnswer: "ٹوٹا ہوا"
    },
    {
      id: "conv2-l2-vocab-cercare",
      type: "VocabularyCard",
      italian: "Cerco",
      urdu: "میں تلاش کر رہا ہوں",
      emoji: "🔍",
      pronunciation: "[cher-koh]",
      exampleItalian: "Cerco aiuto.",
      exampleUrdu: "میں مدد تلاش کر رہا ہوں۔"
    },
    {
      id: "conv2-l2-sr-ho-un-problema",
      type: "SentenceReconstruction",
      question: "میرا ایک مسئلہ ہے۔",
      correctSequence: ["Ho", "un", "problema"],
      shuffledWords: ["Ho", "un", "problema", "il", "libro"],
      direction: "ur-to-it"
    },
    {
      id: "conv2-l2-sr-telefono-rotto",
      type: "SentenceReconstruction",
      question: "Il telefono è rotto",
      correctSequence: ["فون", "خراب", "ہے"],
      shuffledWords: ["فون", "خراب", "ہے", "تعمیر", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
