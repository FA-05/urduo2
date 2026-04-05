import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec12-l4",
  title: "Regular Verbs (-ARE)",
  description: "باقاعدہ افعال (-ARE)",
  icon: "👄",
  exercises: [
    {
      id: "sec12-l4-vocab-parlare",
      type: "VocabularyCard",
      italian: "Parlare",
      urdu: "بولنا",
      emoji: "🗣️",
      pronunciation: "[par-lah-reh]",
      exampleItalian: "Parlo l'italiano.",
      exampleUrdu: "میں اطالوی بولتا ہوں۔"
    },
    {
      id: "sec12-l4-vocab-mangiare",
      type: "VocabularyCard",
      italian: "Mangiare",
      urdu: "کھانا",
      emoji: "🍕",
      pronunciation: "[man-jah-reh]",
      exampleItalian: "Mangio la pizza.",
      exampleUrdu: "میں پاستا کھاتا ہوں۔"
    },
    {
      id: "sec12-l4-vocab-lavorare",
      type: "VocabularyCard",
      italian: "Lavorare",
      urdu: "کام کرنا",
      emoji: "💼",
      pronunciation: "[la-vo-ra-reh]",
      exampleItalian: "Lavoro in ufficio.",
      exampleUrdu: "میں دفتر میں کام کرتا ہوں۔"
    },
    {
      id: "sec12-l4-vocab-are-endings",
      type: "VocabularyCard",
      italian: "Endings (-ARE)",
      urdu: "ختم ہونے والے حروف (-ARE)",
      emoji: "📏",
      pronunciation: "-",
      exampleItalian: "o, i, a, iamo, ate, ano.",
      exampleUrdu: "میں، تم، وہ، ہم، آپ، وہ۔"
    },
    {
      id: "sec12-l4-mc-parlo",
      type: "MultipleChoice",
      question: "\"میں بولتا ہوں\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Parlo", "Parli", "Parla", "Parliamo"],
      correctAnswer: "Parlo"
    },
    {
      id: "sec12-l4-tf-mangiamo",
      type: "TrueFalse",
      statement: "Mangiamo = ہم کھاتے ہیں",
      isTrue: true
    },
    {
      id: "sec12-l4-sr-parlo-italiano",
      type: "SentenceReconstruction",
      question: "Io parlo italiano",
      correctSequence: ["میں", "اطالوی", "زبان", "بولتا", "ہوں"],
      shuffledWords: ["میں", "اطالوی", "زبان", "بولتا", "ہوں", "پڑھتا", "نہیں"],
      direction: "it-to-ur"
    },
    {
      id: "sec12-l4-sr-lavoro-ufficio",
      type: "SentenceReconstruction",
      question: "Loro lavorano in ufficio",
      correctSequence: ["وہ", "دفتر", "میں", "کام", "کرتے", "ہیں"],
      shuffledWords: ["وہ", "دفتر", "میں", "کام", "کرتے", "ہیں", "گھر", "آتے"],
      direction: "it-to-ur"
    },
    {
      id: "sec12-l4-sr-mangiamo-pizza",
      type: "SentenceReconstruction",
      question: "ہم پیزا کھاتے ہیں",
      correctSequence: ["Noi", "mangiamo", "la", "pizza"],
      shuffledWords: ["Noi", "mangiamo", "la", "pizza", "Voi", "mangi"],
      direction: "ur-to-it"
    }
  ]
};
