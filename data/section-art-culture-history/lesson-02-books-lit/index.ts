import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec16-l2",
  title: "Books & Literature",
  description: "کتابیں اور ادب",
  icon: "📚",
  exercises: [
    {
      id: "sec16-l2-vocab-libro",
      type: "VocabularyCard",
      italian: "Libro",
      urdu: "کتاب",
      emoji: "📖",
      pronunciation: "[lee-broh]",
      exampleItalian: "Leggo un libro.",
      exampleUrdu: "میں ایک کتاب پڑھتا ہوں۔"
    },
    {
      id: "sec16-l2-vocab-scrittore",
      type: "VocabularyCard",
      italian: "Scrittore",
      urdu: "مصنف",
      emoji: "✍️",
      pronunciation: "[skreet-toh-re]",
      exampleItalian: "Lui è uno scrittore.",
      exampleUrdu: "وہ ایک مصنف ہے۔"
    },
    {
      id: "sec16-l2-mc-libro",
      type: "MultipleChoice",
      question: "\"کتاب\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Libro", "Penna", "Foglio", "Borsa"],
      correctAnswer: "Libro"
    },
    {
      id: "sec16-l2-vocab-poesia",
      type: "VocabularyCard",
      italian: "Poesia",
      urdu: "شاعری",
      emoji: "📜",
      pronunciation: "[po-e-zee-ah]",
      exampleItalian: "Mi piace la poesia.",
      exampleUrdu: "مجھے شاعری پسند ہے۔"
    },
    {
      id: "sec16-l2-tf-scrittore",
      type: "TrueFalse",
      statement: "Scrittore = طالب علم",
      isTrue: false,
      correctAnswer: "مصنف"
    },
    {
      id: "sec16-l2-vocab-biblioteca",
      type: "VocabularyCard",
      italian: "Biblioteca",
      urdu: "لائبریری",
      emoji: "🏛️",
      pronunciation: "[bee-blee-o-te-kah]",
      exampleItalian: "Vado in biblioteca.",
      exampleUrdu: "میں لائبریری جاتا ہوں۔"
    },
    {
      id: "sec16-l2-sr-leggo-libro",
      type: "SentenceReconstruction",
      question: "میں ایک کتاب پڑھتا ہوں۔",
      correctSequence: ["Leggo", "un", "libro"],
      shuffledWords: ["Leggo", "un", "libro", "scrivo", "una"],
      direction: "ur-to-it"
    },
    {
      id: "sec16-l2-sr-biblioteca-grande",
      type: "SentenceReconstruction",
      question: "La biblioteca è grande",
      correctSequence: ["لائبریری", "بڑی", "ہے"],
      shuffledWords: ["لائبریری", "بڑی", "ہے", "چھوٹی", "پرانی"],
      direction: "it-to-ur"
    }
  ]
};
