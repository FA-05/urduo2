import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec7-l2",
  title: "Prices & Payments",
  description: "قیمتیں اور ادائیگی",
  icon: "💶",
  exercises: [
    {
      id: "sec7-l2-vocab-prezzo",
      type: "VocabularyCard",
      italian: "Prezzo",
      urdu: "قیمت",
      emoji: "🏷️",
      pronunciation: "[pret-tso]",
      exampleItalian: "Il prezzo è alto.",
      exampleUrdu: "قیمت زیادہ ہے۔"
    },
    {
      id: "sec7-l2-vocab-sconto",
      type: "VocabularyCard",
      italian: "Sconto",
      urdu: "رعایت/ڈسکاؤنٹ",
      emoji: "📉",
      pronunciation: "[skon-toh]",
      exampleItalian: "C'è uno sconto del dieci per cento.",
      exampleUrdu: "دس فیصد ڈسکاؤنٹ ہے۔"
    },
    {
      id: "sec7-l2-vocab-scontrino",
      type: "VocabularyCard",
      italian: "Scontrino",
      urdu: "رسید",
      emoji: "🧾",
      pronunciation: "[skon-tree-noh]",
      exampleItalian: "Ecco il suo scontrino.",
      exampleUrdu: "یہ رہی آپ کی رسید۔"
    },
    {
      id: "sec7-l2-vocab-soldi",
      type: "VocabularyCard",
      italian: "Soldi",
      urdu: "پیسے",
      emoji: "💸",
      pronunciation: "[sol-dee]",
      exampleItalian: "Non ho molti soldi.",
      exampleUrdu: "میرے پاس زیادہ پیسے نہیں ہیں۔"
    },
    {
      id: "sec7-l2-vocab-pagare",
      type: "VocabularyCard",
      italian: "Pagare",
      urdu: "ادائیگی کرنا",
      emoji: "💳",
      pronunciation: "[pah-gah-reh]",
      exampleItalian: "Posso pagare con la carta?",
      exampleUrdu: "کیا میں کارڈ سے ادائیگی کر سکتا ہوں؟"
    },
    {
      id: "sec7-l2-vocab-contanti",
      type: "VocabularyCard",
      italian: "Contanti",
      urdu: "نقد",
      emoji: "💵",
      pronunciation: "[kon-tan-tee]",
      exampleItalian: "Pago in contanti.",
      exampleUrdu: "میں نقد ادائیگی کرتا ہوں۔"
    },
    {
      id: "sec7-l2-mc-soldi",
      type: "MultipleChoice",
      question: "\"پیسے\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Soldi", "Prezzo", "Sconto", "Carta"],
      correctAnswer: "Soldi"
    },
    {
      id: "sec7-l2-tf-sconto",
      type: "TrueFalse",
      statement: "Sconto = قیمت",
      isTrue: false,
      correctAnswer: "ڈسکاؤنٹ"
    },
    {
      id: "sec7-l2-sr-quanto-costa",
      type: "SentenceReconstruction",
      question: "Quanto costa?",
      correctSequence: ["اس", "کی", "قیمت", "کتنی", "ہے", "?"],
      shuffledWords: ["اس", "کی", "قیمت", "کتنی", "ہے", "?", "کب", "کہاں"],
      direction: "it-to-ur"
    },
    {
      id: "sec7-l2-sr-pago-contanti",
      type: "SentenceReconstruction",
      question: "میں نقد ادائیگی کرتا ہوں",
      correctSequence: ["Pago", "in", "contanti"],
      shuffledWords: ["Pago", "in", "contanti", "con", "carta", "monete"],
      direction: "ur-to-it"
    }
  ]
};
