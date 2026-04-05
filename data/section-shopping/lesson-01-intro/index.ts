import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec7-l1",
  title: "Shopping Intro",
  description: "خریداری کا تعارف",
  icon: "🛍️",
  exercises: [
    {
      id: "sec7-l1-vocab-negozio",
      type: "VocabularyCard",
      italian: "Negozio",
      urdu: "دکان",
      emoji: "🏪",
      pronunciation: "[ne-got-tsyo]",
      exampleItalian: "Il negozio è chiuso.",
      exampleUrdu: "دکان بند ہے۔"
    },
    {
      id: "sec7-l1-vocab-mercato",
      type: "VocabularyCard",
      italian: "Mercato",
      urdu: "مارکیٹ/منڈی",
      emoji: "🛒",
      pronunciation: "[mer-kah-toh]",
      exampleItalian: "Vado al mercato oggi.",
      exampleUrdu: "میں آج مارکیٹ جا رہا ہوں۔"
    },
    {
      id: "sec7-l1-vocab-comprare",
      type: "VocabularyCard",
      italian: "Comprare",
      urdu: "خریدنا",
      emoji: "💰",
      pronunciation: "[kom-prah-reh]",
      exampleItalian: "Voglio comprare una penna.",
      exampleUrdu: "میں ایک قلم خریدنا چاہتا ہوں۔"
    },
    {
      id: "sec7-l1-vocab-vendere",
      type: "VocabularyCard",
      italian: "Vendere",
      urdu: "بیچنا",
      emoji: "📦",
      pronunciation: "[ven-de-reh]",
      exampleItalian: "Loro vendono frutta fresca.",
      exampleUrdu: "وہ تازہ پھل بیچتے ہیں۔"
    },
    {
      id: "sec7-l1-vocab-cliente",
      type: "VocabularyCard",
      italian: "Cliente",
      urdu: "گاہک",
      emoji: "👤",
      pronunciation: "[klee-en-teh]",
      exampleItalian: "Il cliente ha sempre ragione.",
      exampleUrdu: "گاہک ہمیشہ درست ہوتا ہے۔"
    },
    {
      id: "sec7-l1-tf-negozio",
      type: "TrueFalse",
      statement: "Negozio = گھر",
      isTrue: false,
      correctAnswer: "دکان"
    },
    {
      id: "sec7-l1-mc-mercato",
      type: "MultipleChoice",
      question: "\"مارکیٹ\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Mercato", "Negozio", "Scuola", "Casa"],
      correctAnswer: "Mercato"
    },
    {
      id: "sec7-l1-sr-vado-mercato",
      type: "SentenceReconstruction",
      question: "Vado al mercato",
      correctSequence: ["میں", "مارکیٹ", "جاتا", "ہوں"],
      shuffledWords: ["میں", "مارکیٹ", "جاتا", "ہوں", "سکول", "آتا"],
      direction: "it-to-ur"
    },
    {
      id: "sec7-l1-sr-comprare-pane",
      type: "SentenceReconstruction",
      question: "Voglio comprare il pane",
      correctSequence: ["میں", "روٹی", "خریدنا", "چاہتا", "ہوں"],
      shuffledWords: ["میں", "روٹی", "خریدنا", "چاہتا", "ہوں", "پانی", "پینا"],
      direction: "it-to-ur"
    }
  ]
};
