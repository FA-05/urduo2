import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "health-l4",
  title: "Personal Hygiene",
  description: "ذاتی صفائی",
  icon: "🪥",
  exercises: [
    {
      id: "health-l4-vocab-sapone",
      type: "VocabularyCard",
      italian: "Sapone",
      urdu: "صابن",
      emoji: "🧼",
      pronunciation: "[sa-po-ne]",
      exampleItalian: "Usa il sapone.",
      exampleUrdu: "صابن استعمال کرو۔"
    },
    {
      id: "health-l4-vocab-spazzolino",
      type: "VocabularyCard",
      italian: "Spazzolino",
      urdu: "دانتوں کا برش",
      emoji: "🪥",
      pronunciation: "[spat-tso-lee-no]",
      exampleItalian: "Dov'è lo spazzolino?",
      exampleUrdu: "ٹوتھ برش کہاں ہے؟"
    },
    {
      id: "health-l4-mc-doccia",
      type: "MultipleChoice",
      question: "\"غسل / شاور\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Doccia", "Bagno", "Lavabo", "Asciugamano"],
      correctAnswer: "Doccia"
    },
    {
      id: "health-l4-vocab-asciugamano",
      type: "VocabularyCard",
      italian: "Asciugamano",
      urdu: "تولیہ",
      emoji: "🧣",
      pronunciation: "[a-shoo-ga-mah-no]",
      exampleItalian: "Mi serve un asciugamano.",
      exampleUrdu: "مجھے ایک تولیہ چاہیے۔"
    },
    {
      id: "health-l4-tf-dentifricio",
      type: "TrueFalse",
      statement: "Dentifricio = صابن",
      isTrue: false,
      correctAnswer: "ٹوتھ پیسٹ"
    },
    {
      id: "health-l4-vocab-lavarsi",
      type: "VocabularyCard",
      italian: "Lavarsi",
      urdu: "دھونا / نہانا",
      emoji: "🚿",
      pronunciation: "[la-var-see]",
      exampleItalian: "Lavati le mani.",
      exampleUrdu: "اپنے ہاتھ دھوؤ۔"
    },
    {
      id: "health-l4-sr-usa-sapone",
      type: "SentenceReconstruction",
      question: "صابن استعمال کرو۔",
      correctSequence: ["Usa", "il", "sapone"],
      shuffledWords: ["Usa", "il", "sapone", "la", "faccia"],
      direction: "ur-to-it"
    },
    {
      id: "health-l4-sr-serve-asciugamano",
      type: "SentenceReconstruction",
      question: "Mi serve un asciugamano",
      correctSequence: ["مجھے", "ایک", "تولیہ", "چاہیے"],
      shuffledWords: ["مجھے", "ایک", "تولیہ", "چاہیے", "پانی", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
