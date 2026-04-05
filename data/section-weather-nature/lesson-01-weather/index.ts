import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec15-l1",
  title: "The Weather",
  description: "موسم",
  icon: "☀️",
  exercises: [
    {
      id: "sec15-l1-vocab-sole",
      type: "VocabularyCard",
      italian: "il sole",
      urdu: "سورج / دھوپ",
      emoji: "☀️",
      pronunciation: "[eel soh-leh]",
      exampleItalian: "Oggi c'è il sole.",
      exampleUrdu: "آج دھوپ ہے۔"
    },
    {
      id: "sec15-l1-vocab-pioggia",
      type: "VocabularyCard",
      italian: "la pioggia",
      urdu: "بارش",
      emoji: "🌧️",
      pronunciation: "[lah pyod-jah]",
      exampleItalian: "Amo il suono della pioggia.",
      exampleUrdu: "مجھے بارش کی آواز پسند ہے۔"
    },
    {
      id: "sec15-l1-vocab-neve",
      type: "VocabularyCard",
      italian: "la neve",
      urdu: "برف",
      emoji: "❄️",
      pronunciation: "[lah neh-veht]",
      exampleItalian: "La neve è bianca.",
      exampleUrdu: "برف سفید ہے۔"
    },
    {
      id: "sec15-l1-vocab-nuvola",
      type: "VocabularyCard",
      italian: "la nuvola",
      urdu: "بادل",
      emoji: "☁️",
      pronunciation: "[lah noo-vo-lah]",
      exampleItalian: "C'è una nuvola nel cielo.",
      exampleUrdu: "آسمان میں ایک بادل ہے۔"
    },
    {
      id: "sec15-l1-vocab-vento",
      type: "VocabularyCard",
      italian: "il vento",
      urdu: "ہوا",
      emoji: "🌬️",
      pronunciation: "[eel ven-toh]",
      exampleItalian: "Il vento soffia forte.",
      exampleUrdu: "ہوا تیز چل رہی ہے۔"
    },
    {
      id: "sec15-l1-vocab-caldo",
      type: "VocabularyCard",
      italian: "caldo",
      urdu: "گرم",
      emoji: "🔥",
      pronunciation: "[kal-doh]",
      exampleItalian: "Fa molto caldo oggi.",
      exampleUrdu: "آج بہت گرمی ہے۔"
    },
    {
      id: "sec15-l1-vocab-freddo",
      type: "VocabularyCard",
      italian: "freddo",
      urdu: "ٹھنڈا",
      emoji: "❄️",
      pronunciation: "[fred-doh]",
      exampleItalian: "Fa freddo fuori.",
      exampleUrdu: "باہر تھنڈ ہے۔"
    },
    {
      id: "sec15-l1-mc-sole",
      type: "MultipleChoice",
      question: "\"سورج\" کو Italian میں کیا کہتے ہیں؟",
      options: ["il sole", "la luna", "la pioggia", "il vento"],
      correctAnswer: "il sole"
    },
    {
      id: "sec15-l1-tf-neve",
      type: "TrueFalse",
      statement: "Neve = بارش",
      isTrue: false,
      correctAnswer: "برف"
    },
    {
      id: "sec15-l1-sr-fa-caldo",
      type: "SentenceReconstruction",
      question: "آج بہت گرمی ہے",
      correctSequence: ["Oggi", "fa", "molto", "caldo"],
      shuffledWords: ["Oggi", "fa", "molto", "caldo", "freddo", "piove"],
      direction: "ur-to-it"
    }
  ]
};
