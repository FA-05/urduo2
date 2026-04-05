import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "conv4-l3",
  title: "Using Public Services",
  description: "عوامی سہولیات کا استعمال",
  icon: "🏦",
  exercises: [
    {
      id: "conv4-l3-vocab-ufficio-postale",
      type: "VocabularyCard",
      italian: "Ufficio Postale",
      urdu: "پوسٹ آفس",
      emoji: "📬",
      pronunciation: "[uf-fee-cho pos-tah-le]",
      exampleItalian: "Cerco l'ufficio postale.",
      exampleUrdu: "میں پوسٹ آفس تلاش کر رہا ہوں۔"
    },
    {
      id: "conv4-l3-vocab-banca",
      type: "VocabularyCard",
      italian: "Banca",
      urdu: "بینک",
      emoji: "🏦",
      pronunciation: "[ban-kah]",
      exampleItalian: "Devo andare in banca.",
      exampleUrdu: "مجھے بینک جانا ہے۔"
    },
    {
      id: "conv4-l3-mc-biglietto",
      type: "MultipleChoice",
      question: "\"ٹکٹ\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Biglietto", "Libro", "Soldi", "Carta"],
      correctAnswer: "Biglietto"
    },
    {
      id: "conv4-l3-vocab-sportello",
      type: "VocabularyCard",
      italian: "Sportello",
      urdu: "کاؤنٹر / کھڑکی (سروس کے لیے)",
      emoji: "🪟",
      pronunciation: "[spor-tel-loh]",
      exampleItalian: "Vai allo sportello 3.",
      exampleUrdu: "کاؤنٹر نمبر ۳ پر جائیں۔"
    },
    {
      id: "conv4-l3-tf-banca",
      type: "TrueFalse",
      statement: "Banca = اسکول",
      isTrue: false,
      correctAnswer: "بینک"
    },
    {
      id: "conv4-l3-vocab-documento",
      type: "VocabularyCard",
      italian: "Documento",
      urdu: "دستاویز / شناختی کارڈ",
      emoji: "🆔",
      pronunciation: "[do-koo-men-toh]",
      exampleItalian: "Prego, un documento.",
      exampleUrdu: "براہ کرم، ایک شناختی دستاویز دیں۔"
    },
    {
      id: "conv4-l3-sr-dov-e-banca",
      type: "SentenceReconstruction",
      question: "بینک کہاں ہے؟",
      correctSequence: ["Dov'è", "la", "banca", "?"],
      shuffledWords: ["Dov'è", "la", "banca", "?", "il", "libro"],
      direction: "ur-to-it"
    },
    {
      id: "conv4-l3-sr-prendo-biglietto",
      type: "SentenceReconstruction",
      question: "Prendo il biglietto",
      correctSequence: ["میں", "ٹکٹ", "لیتا", "ہوں"],
      shuffledWords: ["میں", "ٹکٹ", "لیتا", "ہوں", "پیسے", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
