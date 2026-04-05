import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec13-l2",
  title: "Trains & Public Transit",
  description: "ٹرینیں اور عوامی آمد و رفت",
  icon: "🚆",
  exercises: [
    {
      id: "sec13-l2-vocab-treno",
      type: "VocabularyCard",
      italian: "il treno",
      urdu: "ٹرین / ریل گاڑی",
      emoji: "🚆",
      pronunciation: "[eel tre-noh]",
      exampleItalian: "Prendo il treno per Roma.",
      exampleUrdu: "میں روم کے لیے ٹرین لیتا ہوں۔"
    },
    {
      id: "sec13-l2-vocab-binario",
      type: "VocabularyCard",
      italian: "il binario",
      urdu: "پلیٹ فارم",
      emoji: "🚉",
      pronunciation: "[eel bee-nah-ryoh]",
      exampleItalian: "Il treno parte dal binario tre.",
      exampleUrdu: "ٹرین پلیٹ فارم نمبر تین سے روانہ ہوتی ہے۔"
    },
    {
      id: "sec13-l2-vocab-biglietteria",
      type: "VocabularyCard",
      italian: "la biglietteria",
      urdu: "ٹکٹ آفس",
      emoji: "🎫",
      pronunciation: "[lah bee-lyet-teh-ree-ah]",
      exampleItalian: "Dov'è la biglietteria?",
      exampleUrdu: "ٹکٹ آفس کہاں ہے؟"
    },
    {
      id: "sec13-l2-vocab-fermata",
      type: "VocabularyCard",
      italian: "la fermata",
      urdu: "اسٹاپ / رکنے کی جگہ",
      emoji: "🚏",
      pronunciation: "[lah fer-mah-tah]",
      exampleItalian: "Aspetto l'autobus alla fermata.",
      exampleUrdu: "میں اسٹاپ پر بس کا انتظار کرتا ہوں۔"
    },
    {
      id: "sec13-l2-vocab-autobus",
      type: "VocabularyCard",
      italian: "l'autobus",
      urdu: "بس",
      emoji: "🚌",
      pronunciation: "[low-toh-boos]",
      exampleItalian: "L'autobus è pieno.",
      exampleUrdu: "بس بھری ہوئی ہے۔"
    },
    {
      id: "sec13-l2-vocab-metropolitana",
      type: "VocabularyCard",
      italian: "la metropolitana",
      urdu: "میٹرو / سب وے",
      emoji: "🚇",
      pronunciation: "[lah meh-tro-po-lee-tah-nah]",
      exampleItalian: "La metropolitana è veloce.",
      exampleUrdu: "میٹرو تیز ہے۔"
    },
    {
      id: "sec13-l2-vocab-ritardo",
      type: "VocabularyCard",
      italian: "il ritardo",
      urdu: "تاخیر",
      emoji: "⏰",
      pronunciation: "[eel ree-tar-doh]",
      exampleItalian: "C'è un ritardo di dieci minuti.",
      exampleUrdu: "دس منٹ کی تاخیر ہے۔"
    },
    {
      id: "sec13-l2-mc-treno",
      type: "MultipleChoice",
      question: "\"ٹرین\" کو Italian میں کیا کہتے ہیں؟",
      options: ["il treno", "l'autobus", "la macchina", "la bici"],
      correctAnswer: "il treno"
    },
    {
      id: "sec13-l2-tf-fermata",
      type: "TrueFalse",
      statement: "Fermata = اسٹیشن",
      isTrue: true,
      correctAnswer: "اسٹاپ / اسٹیشن"
    },
    {
      id: "sec13-l2-sr-autobus-fermata",
      type: "SentenceReconstruction",
      question: "L'autobus è alla fermata",
      correctSequence: ["بس", "اسٹاپ", "پر", "ہے"],
      shuffledWords: ["بس", "اسٹاپ", "پر", "ہے", "گھر", "میں"],
      direction: "it-to-ur"
    }
  ]
};
