import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "admin-l3",
  title: "Post Office & Services",
  description: "ڈاک خانہ اور دیگر عوامی خدمات",
  icon: "🏤",
  exercises: [
    {
      id: "admin-l3-vocab-posta",
      type: "VocabularyCard",
      italian: "Posta",
      urdu: "ڈاک / پوسٹ آفس",
      emoji: "🏤",
      pronunciation: "[pos-tah]",
      exampleItalian: "Vado alla posta.",
      exampleUrdu: "میں پوسٹ آفس جا رہا ہوں۔"
    },
    {
      id: "admin-l3-vocab-raccomandata",
      type: "VocabularyCard",
      italian: "Raccomandata",
      urdu: "رجسٹری (رجسٹرڈ لیٹر)",
      emoji: "✉️",
      pronunciation: "[rak-ko-man-dah-tah]",
      exampleItalian: "Devo spedire una raccomandata.",
      exampleUrdu: "مجھے ایک رجسٹری بھیجنی ہے۔"
    },
    {
      id: "admin-l3-mc-bolletta",
      type: "MultipleChoice",
      question: "\"یوٹیلٹی بل\" (بجلی، گیس وغیرہ) کو Italian میں کیا کہتے ہیں؟",
      options: ["Bolletta", "Lettera", "Pacco", "Soldi"],
      correctAnswer: "Bolletta"
    },
    {
      id: "admin-l3-vocab-bolletta",
      type: "VocabularyCard",
      italian: "Bolletta della luce",
      urdu: "بجلی کا بل",
      emoji: "💡",
      pronunciation: "[bol-let-tah del-lah loo-che]",
      exampleItalian: "Pago la bolletta online.",
      exampleUrdu: "میں بل آن لائن ادا کرتا ہوں۔"
    },
    {
      id: "admin-l3-tf-pacco",
      type: "TrueFalse",
      statement: "Pacco = خط",
      isTrue: false,
      correctAnswer: "پارسل / پیکج"
    },
    {
      id: "admin-l3-vocab-francobollo",
      type: "VocabularyCard",
      italian: "Francobollo",
      urdu: "پوسٹیج اسٹیمپ / ٹکٹ",
      emoji: "🎫",
      pronunciation: "[fran-ko-bol-lo]",
      exampleItalian: "Serve un francobollo.",
      exampleUrdu: "ایک اسٹیمپ کی ضرورت ہے۔"
    },
    {
      id: "admin-l3-sr-spedire-pacco",
      type: "SentenceReconstruction",
      question: "مجھے ایک پارسل بھیجنا ہے۔",
      correctSequence: ["Devo", "spedire", "un", "pacco"],
      shuffledWords: ["Devo", "spedire", "un", "pacco", "la", "casa"],
      direction: "ur-to-it"
    },
    {
      id: "admin-l3-sr-pago-bolletta",
      type: "SentenceReconstruction",
      question: "Pago la bolletta",
      correctSequence: ["میں", "بل", "ادا", "کرتا", "ہوں"],
      shuffledWords: ["میں", "بل", "ادا", "کرتا", "ہوں", "نہیں", "پیسے"],
      direction: "it-to-ur"
    }
  ]
};
