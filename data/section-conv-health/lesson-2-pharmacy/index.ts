import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "conv3-l2",
  title: "At the Pharmacy",
  description: "فارمیسی میں",
  icon: "💊",
  exercises: [
    {
      id: "conv3-l2-vocab-farmacia",
      type: "VocabularyCard",
      italian: "Farmacia",
      urdu: "فارمیسی / میڈیکل اسٹور",
      emoji: "🏥",
      pronunciation: "[far-ma-chee-ah]",
      exampleItalian: "Dov'è la farmacia?",
      exampleUrdu: "فارمیسی کہاں ہے؟"
    },
    {
      id: "conv3-l2-vocab-medicina",
      type: "VocabularyCard",
      italian: "Medicina",
      urdu: "دوا",
      emoji: "💊",
      pronunciation: "[me-dee-chee-nah]",
      exampleItalian: "Prendo la medicina.",
      exampleUrdu: "میں دوا لیتا ہوں۔"
    },
    {
      id: "conv3-l2-mc-ricetta",
      type: "MultipleChoice",
      question: "\"میڈیکل نسخہ\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Ricetta", "Libro", "Foglio", "Carta"],
      correctAnswer: "Ricetta"
    },
    {
      id: "conv3-l2-vocab-ricetta",
      type: "VocabularyCard",
      italian: "Ricetta",
      urdu: "نسخہ / ریسیپی",
      emoji: "📜",
      pronunciation: "[ree-chet-tah]",
      exampleItalian: "Ho la ricetta del dottore.",
      exampleUrdu: "میرے پاس ڈاکٹر کا نسخہ ہے۔"
    },
    {
      id: "conv3-l2-tf-medicina",
      type: "TrueFalse",
      statement: "Medicina = کھانا",
      isTrue: false,
      correctAnswer: "دوا"
    },
    {
      id: "conv3-l2-vocab-dolore",
      type: "VocabularyCard",
      italian: "Dolore",
      urdu: "درد",
      emoji: "🤕",
      pronunciation: "[do-lo-re]",
      exampleItalian: "Ho un forte dolore.",
      exampleUrdu: "مجھے سخت درد ہے۔"
    },
    {
      id: "conv3-l2-sr-farmacia-aperta",
      type: "SentenceReconstruction",
      question: "کیا فارمیسی کھلی ہے؟",
      correctSequence: ["La", "farmacia", "è", "aperta", "?"],
      shuffledWords: ["La", "farmacia", "è", "aperta", "?", "chiusa", "casa"],
      direction: "ur-to-it"
    },
    {
      id: "conv3-l2-sr-ho-ricetta",
      type: "SentenceReconstruction",
      question: "Ho la ricetta",
      correctSequence: ["میرے", "پاس", "نسخہ", "ہے"],
      shuffledWords: ["میرے", "پاس", "نسخہ", "ہے", "دوا", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
