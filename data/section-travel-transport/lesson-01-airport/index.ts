import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec13-l1",
  title: "Airport & Flights",
  description: "ایئرپورٹ اور پروازیں",
  icon: "✈️",
  exercises: [
    {
      id: "sec13-l1-vocab-aeroporto",
      type: "VocabularyCard",
      italian: "l'aeroporto",
      urdu: "ہوائی اڈہ / ایئرپورٹ",
      emoji: "✈️",
      pronunciation: "[ah-eh-ro-por-toh]",
      exampleItalian: "Devo andare all'aeroporto.",
      exampleUrdu: "مجھے ایئرپورٹ جانا ہے۔"
    },
    {
      id: "sec13-l1-vocab-passaporto",
      type: "VocabularyCard",
      italian: "il passaporto",
      urdu: "پاسپورٹ",
      emoji: "🛂",
      pronunciation: "[pas-sah-por-toh]",
      exampleItalian: "Dov'è il mio passaporto?",
      exampleUrdu: "میرا پاسپورٹ کہاں ہے؟"
    },
    {
      id: "sec13-l1-vocab-volo",
      type: "VocabularyCard",
      italian: "il volo",
      urdu: "پرواز",
      emoji: "🛫",
      pronunciation: "[eel vo-loh]",
      exampleItalian: "Il volo è in ritardo.",
      exampleUrdu: "پرواز میں تاخیر ہے۔"
    },
    {
      id: "sec13-l1-vocab-valigia",
      type: "VocabularyCard",
      italian: "la valigia",
      urdu: "سوٹ کیس / بیگ",
      emoji: "🧳",
      pronunciation: "[lah vah-lee-jah]",
      exampleItalian: "La mia valigia è pesante.",
      exampleUrdu: "میرا سوٹ کیس بھاری ہے۔"
    },
    {
      id: "sec13-l1-vocab-biglietto",
      type: "VocabularyCard",
      italian: "il biglietto",
      urdu: "ٹکٹ",
      emoji: "🎫",
      pronunciation: "[eel bee-lyet-toh]",
      exampleItalian: "Ho comprato il biglietto aereo.",
      exampleUrdu: "میں نے ہوائی جہاز کا ٹکٹ خریدا ہے۔"
    },
    {
      id: "sec13-l1-vocab-imbarco",
      type: "VocabularyCard",
      italian: "l'imbarco",
      urdu: "بورڈنگ",
      emoji: "🚶‍♂️",
      pronunciation: "[leem-bar-koh]",
      exampleItalian: "L'imbarco inizia tra poco.",
      exampleUrdu: "بورڈنگ تھوڑی دیر میں شروع ہو رہی ہے۔"
    },
    {
      id: "sec13-l1-mc-passaporto",
      type: "MultipleChoice",
      question: "\"پاسپورٹ\" کو Italian میں کیا کہتے ہیں؟",
      options: ["il passaporto", "la valigia", "il volo", "l'aeroporto"],
      correctAnswer: "il passaporto"
    },
    {
      id: "sec13-l1-tf-volo",
      type: "TrueFalse",
      statement: "Volo = بس",
      isTrue: false,
      correctAnswer: "پرواز"
    },
    {
      id: "sec13-l1-sr-vado-aeroporto",
      type: "SentenceReconstruction",
      question: "Vado all'aeroporto",
      correctSequence: ["میں", "ایئرپورٹ", "جاؤں", "گا"],
      shuffledWords: ["میں", "ایئرپورٹ", "جاؤں", "گا", "گھر", "آتا"],
      direction: "it-to-ur"
    },
    {
      id: "sec13-l1-sr-mio-passaporto",
      type: "SentenceReconstruction",
      question: "میرا پاسپورٹ کہاں ہے؟",
      correctSequence: ["Dov'è", "il", "mio", "passaporto", "?"],
      shuffledWords: ["Dov'è", "il", "mio", "passaporto", "?", "tua", "valigia"],
      direction: "ur-to-it"
    }
  ]
};
