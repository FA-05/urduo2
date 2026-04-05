import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec14-l3",
  title: "Cuisine & Courses",
  description: "کھانے کی اقسام اور کورسز",
  icon: "🍝",
  exercises: [
    {
      id: "sec14-l3-vocab-carne",
      type: "VocabularyCard",
      italian: "la carne",
      urdu: "گوشت",
      emoji: "🥩",
      pronunciation: "[lah kar-neh]",
      exampleItalian: "Non mangio carne.",
      exampleUrdu: "میں گوشت نہیں کھاتا ہوں۔"
    },
    {
      id: "sec14-l3-vocab-pesce",
      type: "VocabularyCard",
      italian: "il pesce",
      urdu: "مچھلی",
      emoji: "🐟",
      pronunciation: "[eel pe-sheh]",
      exampleItalian: "Il pesce è fresco.",
      exampleUrdu: "مچھلی تازہ ہے۔"
    },
    {
      id: "sec14-l3-vocab-dolce",
      type: "VocabularyCard",
      italian: "il dolce",
      urdu: "میٹھا / ڈیسرٹ",
      emoji: "🍰",
      pronunciation: "[eel dol-cheh]",
      exampleItalian: "Cosa c'è per dolce?",
      exampleUrdu: "میٹھے میں کیا ہے؟"
    },
    {
      id: "sec14-l3-vocab-antipasto",
      type: "VocabularyCard",
      italian: "l'antipasto",
      urdu: "سٹارٹر / بھوک بڑھانے والا کھانا",
      emoji: "🥗",
      pronunciation: "[lan-tee-pas-toh]",
      exampleItalian: "Prendiamo un antipasto misto.",
      exampleUrdu: "آؤ مکس سٹارٹر لیں۔"
    },
    {
      id: "sec14-l3-vocab-primo",
      type: "VocabularyCard",
      italian: "il primo piatto",
      urdu: "پہلا کورس (پاستا/چاول)",
      emoji: "🍝",
      pronunciation: "[eel pree-mo pyat-toh]",
      exampleItalian: "Come primo prendo le lasagne.",
      exampleUrdu: "پہلے کورس کے طور پر میں لزانیا لیتا ہوں۔"
    },
    {
      id: "sec14-l3-vocab-secondo",
      type: "VocabularyCard",
      italian: "il secondo piatto",
      urdu: "دوسرا کورس (گوشت/مچھلی)",
      emoji: "🍗",
      pronunciation: "[eel se-kon-doh pyat-toh]",
      exampleItalian: "Il secondo è pollo arrosto.",
      exampleUrdu: "دوسرا کورس روسٹ چکن ہے۔"
    },
    {
      id: "sec14-l3-vocab-contorno",
      type: "VocabularyCard",
      italian: "il contorno",
      urdu: "سائیڈ ڈش (سبزی/سلاد)",
      emoji: "🥔",
      pronunciation: "[eel kon-tor-noh]",
      exampleItalian: "Voglio le patate come contorno.",
      exampleUrdu: "میں سائیڈ ڈش کے طور پر آلو چاہتا ہوں۔"
    },
    {
      id: "sec14-l3-mc-pesce",
      type: "MultipleChoice",
      question: "\"مچھلی\" کو Italian میں کیا کہتے ہیں؟",
      options: ["il pesce", "la carne", "il dolce", "il pane"],
      correctAnswer: "il pesce"
    },
    {
      id: "sec14-l3-tf-dolce",
      type: "TrueFalse",
      statement: "Dolce = نمکین",
      isTrue: false,
      correctAnswer: "میٹھا"
    },
    {
      id: "sec14-l3-sr-mangio-pesce",
      type: "SentenceReconstruction",
      question: "Mangio il pesce",
      correctSequence: ["میں", "مچھلی", "کھاتا", "ہوں"],
      shuffledWords: ["میں", "مچھلی", "کھاتا", "ہوں", "گوشت", "پیتا"],
      direction: "it-to-ur"
    }
  ]
};
