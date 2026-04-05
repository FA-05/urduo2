import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec6-l3",
  title: "Office & Workplace",
  description: "دفتر اور کام کی جگہ",
  icon: "🏢",
  exercises: [
    {
      id: "sec6-l3-vocab-ufficio",
      type: "VocabularyCard",
      italian: "Ufficio",
      urdu: "دفتر",
      emoji: "🏢",
      pronunciation: "[oof-fee-choh]",
      exampleItalian: "Lavoro in un ufficio moderno.",
      exampleUrdu: "میں ایک جدید دفتر میں کام کرتا ہوں۔"
    },
    {
      id: "sec6-l3-vocab-fabbrica",
      type: "VocabularyCard",
      italian: "Fabbrica",
      urdu: "فیکٹری",
      emoji: "🏭",
      pronunciation: "[fab-bree-kah]",
      exampleItalian: "Mio padre lavora in fabbrica.",
      exampleUrdu: "میرے والد فیکٹری میں کام کرتے ہیں۔"
    },
    {
      id: "sec6-l3-vocab-ospedale",
      type: "VocabularyCard",
      italian: "Ospedale",
      urdu: "ہسپتال",
      emoji: "🏥",
      pronunciation: "[os-peh-dah-leh]",
      exampleItalian: "L'ospedale è vicino.",
      exampleUrdu: "ہسپتال قریب ہے۔"
    },
    {
      id: "sec6-l3-vocab-riunione",
      type: "VocabularyCard",
      italian: "Riunione",
      urdu: "میٹنگ/اجلاس",
      emoji: "🤝",
      pronunciation: "[ryoo-nyo-neh]",
      exampleItalian: "Abbiamo una riunione alle dieci.",
      exampleUrdu: "ہماری دس بجے میٹنگ ہے۔"
    },
    {
      id: "sec6-l3-vocab-stipendio",
      type: "VocabularyCard",
      italian: "Stipendio",
      urdu: "تنخواہ",
      emoji: "💰",
      pronunciation: "[stee-pen-dyoh]",
      exampleItalian: "Ricevo lo stipendio ogni mese.",
      exampleUrdu: "مجھے ہر ماہ تنخواہ ملتی ہے۔"
    },
    {
      id: "sec6-l3-vocab-capo",
      type: "VocabularyCard",
      italian: "Capo",
      urdu: "باس/سربراہ",
      emoji: "👨‍اکثر",
      pronunciation: "[kah-poh]",
      exampleItalian: "Il mio capo è gentile.",
      exampleUrdu: "میرا باس مہربان ہے۔"
    },
    {
      id: "sec6-l3-mc-ufficio",
      type: "MultipleChoice",
      question: "\"دفتر\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Ufficio", "Scuola", "Casa", "Negozio"],
      correctAnswer: "Ufficio"
    },
    {
      id: "sec6-l3-tf-stipendio",
      type: "TrueFalse",
      statement: "Stipendio = کام",
      isTrue: false,
      correctAnswer: "تنخواہ"
    },
    {
      id: "sec6-l3-sr-lavoro-ufficio",
      type: "SentenceReconstruction",
      question: "Lavoro in ufficio",
      correctSequence: ["میں", "دفتر", "میں", "کام", "کرتا", "ہوں"],
      shuffledWords: ["میں", "دفتر", "میں", "کام", "کرتا", "ہوں", "گھر", "سوتا"],
      direction: "it-to-ur"
    },
    {
      id: "sec6-l3-sr-riunione-importante",
      type: "SentenceReconstruction",
      question: "میٹنگ اہم ہے",
      correctSequence: ["La", "riunione", "è", "importante"],
      shuffledWords: ["La", "riunione", "è", "importante", "lunga", "stipendio"],
      direction: "ur-to-it"
    }
  ]
};
