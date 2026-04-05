import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "idioms-l1",
  title: "Conversational Fillers",
  description: "گفتگو میں روانی پیدا کرنے والے الفاظ",
  icon: "🗣️",
  exercises: [
    {
      id: "idioms-l1-vocab-allora",
      type: "VocabularyCard",
      italian: "Allora",
      urdu: "تو / پھر / اچھا",
      emoji: "🤔",
      pronunciation: "[al-lo-rah]",
      exampleItalian: "Allora, cosa facciamo?",
      exampleUrdu: "تو، ہم کیا کر رہے ہیں؟"
    },
    {
      id: "idioms-l1-vocab-insomma",
      type: "VocabularyCard",
      italian: "Insomma",
      urdu: "بس ایسے ہی / مختصر یہ کہ",
      emoji: "🤷",
      pronunciation: "[in-som-mah]",
      exampleItalian: "Com'è andata? Insomma...",
      exampleUrdu: "کیسا رہا؟ بس ایسے ہی (نہ اچھا نہ برا)۔"
    },
    {
      id: "idioms-l1-mc-magari",
      type: "MultipleChoice",
      question: "\"کاش\" (I wish/If only) کو Italian میں کیا کہتے ہیں؟",
      options: ["Magari", "Allora", "Pure", "Quindi"],
      correctAnswer: "Magari"
    },
    {
      id: "idioms-l1-vocab-magari",
      type: "VocabularyCard",
      italian: "Magari",
      urdu: "کاش / شاید",
      emoji: "🤞",
      pronunciation: "[ma-ga-ree]",
      exampleItalian: "Magari potessi venire!",
      exampleUrdu: "کاش میں آ سکتا!"
    },
    {
      id: "idioms-l1-tf-appunto",
      type: "TrueFalse",
      statement: "Appunto = شکریہ",
      isTrue: false,
      correctAnswer: "بالکل / یہی تو"
    },
    {
      id: "idioms-l1-vocab-pure",
      type: "VocabularyCard",
      italian: "Pure",
      urdu: "بھی",
      emoji: "➕",
      pronunciation: "[poo-re]",
      exampleItalian: "Vengo pure io.",
      exampleUrdu: "میں بھی آ رہا ہوں۔"
    },
    {
      id: "idioms-l1-sr-allora-andiamo",
      type: "SentenceReconstruction",
      question: "تو، چلتے ہیں۔",
      correctSequence: ["Allora", "andiamo"],
      shuffledWords: ["Allora", "andiamo", "magari", "بند"],
      direction: "ur-to-it"
    },
    {
      id: "idioms-l1-sr-vengo-pure",
      type: "SentenceReconstruction",
      question: "Vengo pure io",
      correctSequence: ["میں", "بھی", "آ", "رہا", "ہوں"],
      shuffledWords: ["میں", "بھی", "آ", "رہا", "ہوں", "نہیں", "کیوں"],
      direction: "it-to-ur"
    }
  ]
};
