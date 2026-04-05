import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec11-l3",
  title: "Kitchen & Dining",
  description: "کچن اور ڈائننگ",
  icon: "🍴",
  exercises: [
    {
      id: "sec11-l3-vocab-piatto",
      type: "VocabularyCard",
      italian: "il piatto",
      urdu: "پلیٹ",
      emoji: "🍽️",
      pronunciation: "[eel pyat-toh]",
      exampleItalian: "Il piatto è sulla tavola.",
      exampleUrdu: "پلیٹ میز پر ہے۔"
    },
    {
      id: "sec11-l3-vocab-bicchiere",
      type: "VocabularyCard",
      italian: "il bicchiere",
      urdu: "گلاس",
      emoji: "🥛",
      pronunciation: "[eel beek-kyeh-reh]",
      exampleItalian: "Vuoi un bicchiere d'acqua?",
      exampleUrdu: "کیا تمہیں ایک گلاس پانی چاہیے؟"
    },
    {
      id: "sec11-l3-vocab-forchetta",
      type: "VocabularyCard",
      italian: "la forchetta",
      urdu: "کانٹا",
      emoji: "🍴",
      pronunciation: "[lah for-ket-tah]",
      exampleItalian: "Uso la forchetta per mangiare la pasta.",
      exampleUrdu: "میں پاستا کھانے کے لیے کانٹا استعمال کرتا ہوں۔"
    },
    {
      id: "sec11-l3-vocab-coltello",
      type: "VocabularyCard",
      italian: "il coltello",
      urdu: "چاقو",
      emoji: "🔪",
      pronunciation: "[eel kol-tel-loh]",
      exampleItalian: "Il coltello è affilato.",
      exampleUrdu: "چاقو تیز ہے۔"
    },
    {
      id: "sec11-l3-vocab-cucchiaio",
      type: "VocabularyCard",
      italian: "il cucchiaio",
      urdu: "چمچ",
      emoji: "🥄",
      pronunciation: "[eel kook-kyah-yoh]",
      exampleItalian: "Mangio la zuppa con il cucchiaio.",
      exampleUrdu: "میں چمچ سے سوپ کھاتا ہوں۔"
    },
    {
      id: "sec11-l3-vocab-tovagliolo",
      type: "VocabularyCard",
      italian: "il tovagliolo",
      urdu: "نیپکن",
      emoji: "🧻",
      pronunciation: "[eel toh-vah-lyo-loh]",
      exampleItalian: "Ho bisogno di un tovagliolo.",
      exampleUrdu: "مجھے ایک نیپکن کی ضرورت ہے۔"
    },
    {
      id: "sec11-l3-vocab-bottiglia",
      type: "VocabularyCard",
      italian: "la bottiglia",
      urdu: "بوتل",
      emoji: "🍾",
      pronunciation: "[lah bot-tee-lyah]",
      exampleItalian: "Una bottiglia d'acqua, per favore.",
      exampleUrdu: "ایک بوتل پانی، براہ کرم۔"
    },
    {
      id: "sec11-l3-mc-bicchiere",
      type: "MultipleChoice",
      question: "\"گلاس\" کو Italian میں کیا کہتے ہیں؟",
      options: ["il bicchiere", "il piatto", "la forchetta", "il coltello"],
      correctAnswer: "il bicchiere"
    },
    {
      id: "sec11-l3-tf-forchetta",
      type: "TrueFalse",
      statement: "Forchetta = چاقو",
      isTrue: false,
      correctAnswer: "کانٹا"
    },
    {
      id: "sec11-l3-sr-bicchiere-acqua",
      type: "SentenceReconstruction",
      question: "Un bicchiere d'acqua",
      correctSequence: ["ایک", "گلاس", "پانی"],
      shuffledWords: ["ایک", "گلاس", "پانی", "دودھ", "روٹی"],
      direction: "it-to-ur"
    }
  ]
};
