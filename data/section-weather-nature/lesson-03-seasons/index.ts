import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec15-l3",
  title: "The Four Seasons",
  description: "چار موسم",
  icon: "🍀",
  exercises: [
    {
      id: "sec15-l3-vocab-stagione",
      type: "VocabularyCard",
      italian: "la stagione",
      urdu: "موسم (سالانہ)",
      emoji: "📅",
      pronunciation: "[lah sta-jo-neh]",
      exampleItalian: "Qual è la tua stagione preferita?",
      exampleUrdu: "آپ کا پسندیدہ موسم کون سا ہے؟"
    },
    {
      id: "sec15-l3-vocab-primavera",
      type: "VocabularyCard",
      italian: "la primavera",
      urdu: "بہار",
      emoji: "🌸",
      pronunciation: "[lah pree-mah-ve-rah]",
      exampleItalian: "In primavera sbocciano i fiori.",
      exampleUrdu: "بہار میں پھول کھلتے ہیں۔"
    },
    {
      id: "sec15-l3-vocab-estate",
      type: "VocabularyCard",
      italian: "l'estate",
      urdu: "گرمی / گرمیوں کا موسم",
      emoji: "☀️",
      pronunciation: "[les-tah-teh]",
      exampleItalian: "In estate andiamo al mare.",
      exampleUrdu: "گرمیوں میں ہم سمندر پر جاتے ہیں۔"
    },
    {
      id: "sec15-l3-vocab-autunno",
      type: "VocabularyCard",
      italian: "l'autunno",
      urdu: "خزاں",
      emoji: "🍂",
      pronunciation: "[low-toon-noh]",
      exampleItalian: "In autunno cadono le foglie.",
      exampleUrdu: "خزاں میں پتے گرتے ہیں۔"
    },
    {
      id: "sec15-l3-vocab-inverno",
      type: "VocabularyCard",
      italian: "l'inverno",
      urdu: "سردی / سردیوں کا موسم",
      emoji: "❄️",
      pronunciation: "[leen-ver-noh]",
      exampleItalian: "In inverno fa molto freddo.",
      exampleUrdu: "سردیوں میں بہت ٹھنڈ ہوتی ہے۔"
    },
    {
      id: "sec15-l3-vocab-cielo",
      type: "VocabularyCard",
      italian: "il cielo",
      urdu: "آسمان",
      emoji: "🌌",
      pronunciation: "[eel che-loh]",
      exampleItalian: "Il cielo è pieno di stelle.",
      exampleUrdu: "آسمان ستاروں سے بھرا ہوا ہے۔"
    },
    {
      id: "sec15-l3-vocab-luna",
      type: "VocabularyCard",
      italian: "la luna",
      urdu: "چاند",
      emoji: "🌙",
      pronunciation: "[lah loo-nah]",
      exampleItalian: "La luna splende di notte.",
      exampleUrdu: "رات کو چاند چمکتا ہے۔"
    },
    {
      id: "sec15-l3-mc-inverno",
      type: "MultipleChoice",
      question: "\"سردی\" کو Italian میں کیا کہتے ہیں؟",
      options: ["l'inverno", "l'estate", "la primavera", "l'autunno"],
      correctAnswer: "l'inverno"
    },
    {
      id: "sec15-l3-tf-estate",
      type: "TrueFalse",
      statement: "Estate = بہار",
      isTrue: false,
      correctAnswer: "گرمی / سمر"
    },
    {
      id: "sec15-l3-sr-amo-primavera",
      type: "SentenceReconstruction",
      question: "Amo la primavera",
      correctSequence: ["مجھے", "بہار", "پسند", "ہے"],
      shuffledWords: ["مجھے", "بہار", "پسند", "ہے", "خزاں", "سردی"],
      direction: "it-to-ur"
    }
  ]
};
