import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "admin-l2",
  title: "Banking & Money",
  description: "بینکنگ اور رقم کا انتظام",
  icon: "💰",
  exercises: [
    {
      id: "admin-l2-vocab-conto",
      type: "VocabularyCard",
      italian: "Conto Corrente",
      urdu: "بینک اکاؤنٹ",
      emoji: "🏦",
      pronunciation: "[kon-toh kor-ren-te]",
      exampleItalian: "Voglio aprire un conto.",
      exampleUrdu: "میں ایک اکاؤنٹ کھولنا چاہتا ہوں۔"
    },
    {
      id: "admin-l2-vocab-bonifico",
      type: "VocabularyCard",
      italian: "Bonifico",
      urdu: "بینک ٹرانسفر (رقم بھیجنا)",
      emoji: "💸",
      pronunciation: "[bo-nee-fee-ko]",
      exampleItalian: "Faccio un bonifico online.",
      exampleUrdu: "میں آن لائن بینک ٹرانسفر کر رہا ہوں۔"
    },
    {
      id: "admin-l2-mc-bancomat",
      type: "MultipleChoice",
      question: "\"اے ٹی ایم کارڈ / ڈیبٹ کارڈ\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Bancomat", "Conto", "Soldi", "Carta"],
      correctAnswer: "Bancomat"
    },
    {
      id: "admin-l2-vocab-prelievo",
      type: "VocabularyCard",
      italian: "Prelievo",
      urdu: "رقم نکلوانا (Withdrawal)",
      emoji: "🏧",
      pronunciation: "[pre-lye-vo]",
      exampleItalian: "Devo fare un prelievo.",
      exampleUrdu: "مجھے رقم نکلوانی ہے۔"
    },
    {
      id: "admin-l2-tf-soldi",
      type: "TrueFalse",
      statement: "Soldi = کاغذ",
      isTrue: false,
      correctAnswer: "پیسے / رقم"
    },
    {
      id: "admin-l2-vocab-iban",
      type: "VocabularyCard",
      italian: "IBAN",
      urdu: "بینک اکاؤنٹ نمبر (IBAN)",
      emoji: "🆔",
      pronunciation: "[ee-ban]",
      exampleItalian: "Mi serve il tuo IBAN.",
      exampleUrdu: "مجھے آپ کے اکاؤنٹ نمبر کی ضرورت ہے۔"
    },
    {
      id: "admin-l2-sr-voglio-aprire-conto",
      type: "SentenceReconstruction",
      question: "میں ایک اکاؤنٹ کھولنا چاہتا ہوں۔",
      correctSequence: ["Voglio", "aprire", "un", "conto"],
      shuffledWords: ["Voglio", "aprire", "un", "conto", "il", "pane"],
      direction: "ur-to-it"
    },
    {
      id: "admin-l2-sr-faccio-bonifico",
      type: "SentenceReconstruction",
      question: "Faccio un bonifico",
      correctSequence: ["میں", "بینک", "ٹرانسفر", "کر", "رہا", "ہوں"],
      shuffledWords: ["میں", "بینک", "ٹرانسفر", "کر", "رہا", "ہوں", "نہیں", "پیسے"],
      direction: "it-to-ur"
    }
  ]
};
