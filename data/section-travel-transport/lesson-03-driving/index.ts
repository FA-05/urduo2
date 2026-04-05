import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec13-l3",
  title: "Driving & Car Rental",
  description: "ڈرائیونگ اور کار کرایہ پر لینا",
  icon: "🚗",
  exercises: [
    {
      id: "sec13-l3-vocab-noleggio",
      type: "VocabularyCard",
      italian: "il noleggio",
      urdu: "کرایہ پر لینا / رینٹل",
      emoji: "🏢",
      pronunciation: "[eel no-led-jo]",
      exampleItalian: "Dov'è il noleggio auto?",
      exampleUrdu: "کار رینٹل کہاں ہے؟"
    },
    {
      id: "sec13-l3-vocab-patente",
      type: "VocabularyCard",
      italian: "la patente",
      urdu: "ڈرائیونگ لائسنس",
      emoji: "🪪",
      pronunciation: "[lah pah-ten-teh]",
      exampleItalian: "Ho dimenticato la patente a casa.",
      exampleUrdu: "میں گھر پر اپنا ڈرائیونگ لائسنس بھول گیا ہوں۔"
    },
    {
      id: "sec13-l3-vocab-benzina",
      type: "VocabularyCard",
      italian: "la benzina",
      urdu: "پیٹرول / ایندھن",
      emoji: "⛽",
      pronunciation: "[lah ben-dzee-nah]",
      exampleItalian: "Dobbiamo fare benzina.",
      exampleUrdu: "ہمیں پیٹرول بھروانا چاہیے۔"
    },
    {
      id: "sec13-l3-vocab-parcheggio",
      type: "VocabularyCard",
      italian: "il parcheggio",
      urdu: "پارکنگ",
      emoji: "🅿️",
      pronunciation: "[eel par-ked-jo]",
      exampleItalian: "C'è un parcheggio gratuito qui vicino?",
      exampleUrdu: "کیا یہاں قریب میں کوئی مفت پارکنگ ہے؟"
    },
    {
      id: "sec13-l3-vocab-traffico",
      type: "VocabularyCard",
      italian: "il traffico",
      urdu: "ٹریفک",
      emoji: "🚦",
      pronunciation: "[eel traf-fee-koh]",
      exampleItalian: "C'è molto traffico stamattina.",
      exampleUrdu: "آج صبح بہت ٹریفک ہے۔"
    },
    {
      id: "sec13-l3-vocab-chiavi",
      type: "VocabularyCard",
      italian: "le chiavi",
      urdu: "چابیاں",
      emoji: "🔑",
      pronunciation: "[leh kyah-vee]",
      exampleItalian: "Ecco le chiavi della macchina.",
      exampleUrdu: "یہ کار کی چابیاں ہیں۔"
    },
    {
      id: "sec13-l3-vocab-assicurazione",
      type: "VocabularyCard",
      italian: "l'assicurazione",
      urdu: "انشورنس / بیمہ",
      emoji: "🛡️",
      pronunciation: "[las-see-koo-rat-tsyo-neh]",
      exampleItalian: "L'assicurazione è inclusa nel prezzo.",
      exampleUrdu: "بیمہ قیمت میں شامل ہے۔"
    },
    {
      id: "sec13-l3-mc-patente",
      type: "MultipleChoice",
      question: "\"ڈرائیونگ لائسنس\" کو Italian میں کیا کہتے ہیں؟",
      options: ["la patente", "la macchina", "il treno", "la strada"],
      correctAnswer: "la patente"
    },
    {
      id: "sec13-l3-tf-traffico",
      type: "TrueFalse",
      statement: "Traffico = ہجوم",
      isTrue: true,
      correctAnswer: "ٹریفک / ہجوم"
    },
    {
      id: "sec13-l3-sr-prenota-auto",
      type: "SentenceReconstruction",
      question: "Voglio noleggiare un'auto",
      correctSequence: ["میں", "ایک", "کار", "کرائے", "پر", "لینا", "چاہتا", "ہوں"],
      shuffledWords: ["میں", "ایک", "کار", "کرائے", "پر", "لینا", "چاہتا", "ہوں", "پانی", "پیتا"],
      direction: "it-to-ur"
    }
  ]
};
