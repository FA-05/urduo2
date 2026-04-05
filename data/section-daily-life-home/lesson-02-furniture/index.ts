import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec11-l2",
  title: "Furniture & Parts",
  description: "فرنیچر اور حصے",
  icon: "🛋️",
  exercises: [
    {
      id: "sec11-l2-vocab-tavolo",
      type: "VocabularyCard",
      italian: "il tavolo",
      urdu: "میز",
      emoji: "🪑",
      pronunciation: "[eel tah-vo-loh]",
      exampleItalian: "Il libro è sul tavolo.",
      exampleUrdu: "کتاب میز پر ہے۔"
    },
    {
      id: "sec11-l2-vocab-sedia",
      type: "VocabularyCard",
      italian: "la sedia",
      urdu: "کرسی",
      emoji: "🪑",
      pronunciation: "[lah se-dyah]",
      exampleItalian: "Siedo sulla sedia.",
      exampleUrdu: "میں کرسی پر بیٹھتا ہوں۔"
    },
    {
      id: "sec11-l2-vocab-letto",
      type: "VocabularyCard",
      italian: "il letto",
      urdu: "بستر/بیڈ",
      emoji: "🛏️",
      pronunciation: "[eel let-toh]",
      exampleItalian: "Dormo sul letto.",
      exampleUrdu: "میں بیڈ پر سوتا ہوں۔"
    },
    {
      id: "sec11-l2-vocab-armadio",
      type: "VocabularyCard",
      italian: "l'armadio",
      urdu: "الماری",
      emoji: "👗",
      pronunciation: "[lar-mah-dyoh]",
      exampleItalian: "I vestiti sono nell'armadio.",
      exampleUrdu: "کپڑے الماری میں ہیں۔"
    },
    {
      id: "sec11-l2-vocab-divano",
      type: "VocabularyCard",
      italian: "il divano",
      urdu: "صوفہ",
      emoji: "🛋️",
      pronunciation: "[eel dee-vah-noh]",
      exampleItalian: "Mi riposo sul divano.",
      exampleUrdu: "میں صوفے پر آرام کرتا ہوں۔"
    },
    {
      id: "sec11-l2-vocab-finestra",
      type: "VocabularyCard",
      italian: "la finestra",
      urdu: "کھڑکی",
      emoji: "🪟",
      pronunciation: "[lah fee-nes-trah]",
      exampleItalian: "Apro la finestra.",
      exampleUrdu: "میں کھڑکی کھولتا ہوں۔"
    },
    {
      id: "sec11-l2-vocab-porta",
      type: "VocabularyCard",
      italian: "la porta",
      urdu: "دروازہ",
      emoji: "🚪",
      pronunciation: "[lah por-tah]",
      exampleItalian: "Chiudo la porta.",
      exampleUrdu: "میں دروازہ بند کرتا ہوں۔"
    },
    {
      id: "sec11-l2-vocab-tappeto",
      type: "VocabularyCard",
      italian: "il tappeto",
      urdu: "قالین/تپائی",
      emoji: "🧶",
      pronunciation: "[eel tap-pe-toh]",
      exampleItalian: "Il tappeto è rosso.",
      exampleUrdu: "قالین سرخ ہے۔"
    },
    {
      id: "sec11-l2-mc-tavolo",
      type: "MultipleChoice",
      question: "\"میز\" کو Italian میں کیا کہتے ہیں؟",
      options: ["il tavolo", "la sedia", "il letto", "la porta"],
      correctAnswer: "il tavolo"
    },
    {
      id: "sec11-l2-tf-finestra",
      type: "TrueFalse",
      statement: "Finestra = دروازہ",
      isTrue: false,
      correctAnswer: "کھڑکی"
    },
    {
      id: "sec11-l2-sr-porta-chiusa",
      type: "SentenceReconstruction",
      question: "دروازہ بند ہے",
      correctSequence: ["La", "porta", "è", "chiusa"],
      shuffledWords: ["La", "porta", "è", "chiusa", "aperta", "finestra"],
      direction: "ur-to-it"
    }
  ]
};
