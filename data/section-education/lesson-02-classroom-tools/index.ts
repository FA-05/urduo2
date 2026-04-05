import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec5-l2",
  title: "Classroom Tools",
  description: "کلاس روم کے اوزار",
  icon: "🎒",
  exercises: [
    {
      id: "sec5-l2-vocab-libro",
      type: "VocabularyCard",
      italian: "Libro",
      urdu: "کتاب",
      emoji: "📖",
      pronunciation: "[lee-broh]",
      exampleItalian: "Il libro è sul tavolo.",
      exampleUrdu: "کتاب میز پر ہے۔"
    },
    {
      id: "sec5-l2-vocab-quaderno",
      type: "VocabularyCard",
      italian: "Quaderno",
      urdu: "کاپی/نوٹ بُک",
      emoji: "📔",
      pronunciation: "[kwa-der-noh]",
      exampleItalian: "Scrivo sul quaderno.",
      exampleUrdu: "میں کاپی پر لکھتا ہوں۔"
    },
    {
      id: "sec5-l2-vocab-penna",
      type: "VocabularyCard",
      italian: "Penna",
      urdu: "قلم",
      emoji: "🖋️",
      pronunciation: "[pen-nah]",
      exampleItalian: "Hai una penna?",
      exampleUrdu: "کیا تمہارے پاس قلم ہے؟"
    },
    {
      id: "sec5-l2-vocab-matita",
      type: "VocabularyCard",
      italian: "Matita",
      urdu: "پنسل",
      emoji: "✏️",
      pronunciation: "[ma-tee-tah]",
      exampleItalian: "Uso la matita per disegnare.",
      exampleUrdu: "میں ڈرائنگ کے لیے پنسل استعمال کرتا ہوں۔"
    },
    {
      id: "sec5-l2-vocab-lavagna",
      type: "VocabularyCard",
      italian: "Lavagna",
      urdu: "تختہ",
      emoji: "🧱",
      pronunciation: "[lah-va-nya]",
      exampleItalian: "Scrivo sulla lavagna.",
      exampleUrdu: "میں تختے پر لکھتا ہوں۔"
    },
    {
      id: "sec5-l2-vocab-zaino",
      type: "VocabularyCard",
      italian: "Zaino",
      urdu: "بستہ/بیک پیک",
      emoji: "🎒",
      pronunciation: "[dzay-noh]",
      exampleItalian: "Metto i libri nello zaino.",
      exampleUrdu: "میں کتابیں بستے میں رکھتا ہوں۔"
    },
    {
      id: "sec5-l2-mc-penna",
      type: "MultipleChoice",
      question: "\"قلم\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Penna", "Matita", "Libro", "Quaderno"],
      correctAnswer: "Penna"
    },
    {
      id: "sec5-l2-tf-libro",
      type: "TrueFalse",
      statement: "Libro = قلم",
      isTrue: false,
      correctAnswer: "کتاب"
    },
    {
      id: "sec5-l2-sr-mia-penna",
      type: "SentenceReconstruction",
      question: "یہ میرا قلم ہے",
      correctSequence: ["Questa", "è", "la", "mia", "penna"],
      shuffledWords: ["Questa", "è", "la", "mia", "penna", "tua", "libro"],
      direction: "ur-to-it"
    },
    {
      id: "sec5-l2-sr-libro-zaino",
      type: "SentenceReconstruction",
      question: "Il libro è nello zaino",
      correctSequence: ["کتاب", "بستے", "میں", "ہے"],
      shuffledWords: ["کتاب", "بستے", "میں", "ہے", "میز", "پر"],
      direction: "it-to-ur"
    }
  ]
};
