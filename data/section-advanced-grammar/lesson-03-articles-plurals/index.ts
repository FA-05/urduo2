import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec12-l3",
  title: "Definite Articles & Plurals",
  description: "حروفِ تعریف اور جمع",
  icon: "📚",
  exercises: [
    {
      id: "sec12-l3-vocab-art-sing",
      type: "VocabularyCard",
      italian: "Articoli (Singolare)",
      urdu: "حروفِ تعریف (واحد) - Il, Lo, La, L'",
      emoji: "☝️",
      pronunciation: "-",
      exampleItalian: "Il libro, Lo zaino, La casa, L'amico.",
      exampleUrdu: "کتاب، بستہ، گھر، دوست۔"
    },
    {
      id: "sec12-l3-vocab-art-plur",
      type: "VocabularyCard",
      italian: "Articoli (Plurale)",
      urdu: "حروفِ تعریف (جمع) - I, Gli, Le",
      emoji: "☝️☝️",
      pronunciation: "-",
      exampleItalian: "I libri, Gli zaini, Le case, Gli amici.",
      exampleUrdu: "کتابیں، بستے، گھر، دوست۔"
    },
    {
      id: "sec12-l3-vocab-plur-rule",
      type: "VocabularyCard",
      italian: "Regola del Plurale",
      urdu: "جمع بنانے کا طریقہ",
      emoji: "📏",
      pronunciation: "-",
      exampleItalian: "o -> i (libro-libri), a -> e (casa-case), e -> i (cane-cani).",
      exampleUrdu: "مذکر 'o' کو 'i' میں، مؤنث 'a' کو 'e' میں بدلیں۔"
    },
    {
      id: "sec12-l3-mc-libri",
      type: "MultipleChoice",
      question: "\"Il libro\" کی جمع کیا ہے؟",
      options: ["I libri", "Gli libri", "Le libri", "Il librii"],
      correctAnswer: "I libri"
    },
    {
      id: "sec12-l3-mc-zaini",
      type: "MultipleChoice",
      question: "\"Lo zaino\" کی جمع کیا ہے؟",
      options: ["Gli zaini", "I zaini", "Le zaini", "Lo zainii"],
      correctAnswer: "Gli zaini"
    },
    {
      id: "sec12-l3-mc-case",
      type: "MultipleChoice",
      question: "\"La casa\" کی جمع کیا ہے؟",
      options: ["Le case", "I case", "Gli case", "La casee"],
      correctAnswer: "Le case"
    },
    {
      id: "sec12-l3-tf-scarpe",
      type: "TrueFalse",
      statement: "Le scarpe = جمع (جوتے)",
      isTrue: true
    },
    {
      id: "sec12-l3-sr-libri-tavolo",
      type: "SentenceReconstruction",
      question: "I libri sono sul tavolo",
      correctSequence: ["کتابیں", "میز", "پر", "ہیں"],
      shuffledWords: ["کتابیں", "میز", "پر", "ہیں", "بستہ", "نیچے"],
      direction: "it-to-ur"
    },
    {
      id: "sec12-l3-sr-studenti-studiano",
      type: "SentenceReconstruction",
      question: "طالب علم پڑھتے ہیں",
      correctSequence: ["Gli", "studenti", "studiano"],
      shuffledWords: ["Gli", "studenti", "studiano", "I", "Le", "scuola"],
      direction: "ur-to-it"
    }
  ]
};
