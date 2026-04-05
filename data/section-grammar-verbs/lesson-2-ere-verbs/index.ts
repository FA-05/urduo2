import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "gram1-l2",
  title: "Regular -ERE Verbs",
  description: "-ERE پر ختم ہونے والے فعل",
  icon: "🔤",
  exercises: [
    {
      id: "gram1-l2-vocab-vendere",
      type: "VocabularyCard",
      italian: "Vendere",
      urdu: "بیچنا",
      emoji: "💰",
      pronunciation: "[ven-de-re]",
      exampleItalian: "Lui vende la sua auto.",
      exampleUrdu: "وہ اپنی گاڑی بیچتا ہے۔"
    },
    {
      id: "gram1-l2-vocab-prendere",
      type: "VocabularyCard",
      italian: "Prendere",
      urdu: "لینا / پکڑنا",
      emoji: "🤲",
      pronunciation: "[pren-de-re]",
      exampleItalian: "Prendo il treno.",
      exampleUrdu: "میں ٹرین لیتا ہوں۔"
    },
    {
      id: "gram1-l2-mc-vedere",
      type: "MultipleChoice",
      question: "\"دیکھنا\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Vedere", "Correre", "Vendere", "Prendere"],
      correctAnswer: "Vedere"
    },
    {
      id: "gram1-l2-vocab-vedere",
      type: "VocabularyCard",
      italian: "Vedere",
      urdu: "دیکھنا",
      emoji: "👀",
      pronunciation: "[ve-de-re]",
      exampleItalian: "Vedo un gatto.",
      exampleUrdu: "میں ایک بلی دیکھتا ہوں۔"
    },
    {
      id: "gram1-l2-tf-correre",
      type: "TrueFalse",
      statement: "Correre = سونا",
      isTrue: false,
      correctAnswer: "دوڑنا"
    },
    {
      id: "gram1-l2-vocab-correre",
      type: "VocabularyCard",
      italian: "Correre",
      urdu: "دوڑنا",
      emoji: "🏃",
      pronunciation: "[kor-re-re]",
      exampleItalian: "Corro nel parco.",
      exampleUrdu: "میں پارک میں دوڑتا ہوں۔"
    },
    {
      id: "gram1-l2-sr-vendo-auto",
      type: "SentenceReconstruction",
      question: "میں اپنی گاڑی بیچتا ہوں۔",
      correctSequence: ["Vendo", "la", "mia", "auto"],
      shuffledWords: ["Vendo", "la", "mia", "auto", "compro", "il"],
      direction: "ur-to-it"
    },
    {
      id: "gram1-l2-sr-prendo-treno",
      type: "SentenceReconstruction",
      question: "Prendo il treno",
      correctSequence: ["میں", "ٹرین", "لیتا", "ہوں"],
      shuffledWords: ["میں", "ٹرین", "لیتا", "ہوں", "بس", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
