import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "admin-l4",
  title: "Work & Salary",
  description: "کام اور آمدنی",
  icon: "💼",
  exercises: [
    {
      id: "admin-l4-vocab-stipendio",
      type: "VocabularyCard",
      italian: "Stipendio",
      urdu: "تنخواہ / پگار",
      emoji: "💵",
      pronunciation: "[stee-pen-dyo]",
      exampleItalian: " Ricevo lo stipendio ogni mese.",
      exampleUrdu: "مجھے ہر ماہ تنخواہ ملتی ہے۔"
    },
    {
      id: "admin-l4-vocab-contratto",
      type: "VocabularyCard",
      italian: "Contratto di lavoro",
      urdu: "ملازمت کا معاہدہ / کنٹریکٹ",
      emoji: "📄",
      pronunciation: "[kon-trat-toh dee la-vo-ro]",
      exampleItalian: "Ho firmato il contratto.",
      exampleUrdu: "میں نے معاہدے پر دستخط کر دیے ہیں۔"
    },
    {
      id: "admin-l4-mc-busta-paga",
      type: "MultipleChoice",
      question: "\"پے سلپ\" (salary slip) کو Italian میں کیا کہتے ہیں؟",
      options: ["Busta paga", "Conto", "Firma", "Lavoro"],
      correctAnswer: "Busta paga"
    },
    {
      id: "admin-l4-vocab-disoccupato",
      type: "VocabularyCard",
      italian: "Disoccupato",
      urdu: "بے روزگار",
      emoji: "🏠",
      pronunciation: "[dee-sok-koo-pa-toh]",
      exampleItalian: "Lui è disoccupato.",
      exampleUrdu: "وہ بے روزگار ہے۔"
    },
    {
      id: "admin-l4-tf-firma",
      type: "TrueFalse",
      statement: "Firma = پتے",
      isTrue: false,
      correctAnswer: "دستخط / سائن"
    },
    {
      id: "admin-l4-vocab-colloquio",
      type: "VocabularyCard",
      italian: "Colloquio",
      urdu: "انٹرویو (ملازمت کا)",
      emoji: "🤝",
      pronunciation: "[kol-lo-kwyo]",
      exampleItalian: "Ho un colloquio domani.",
      exampleUrdu: "کل میرا ایک انٹرویو ہے۔"
    },
    {
      id: "admin-l4-sr-firmare-contratto",
      type: "SentenceReconstruction",
      question: "معاہدے پر دستخط کریں۔",
      correctSequence: ["Firmare", "il", "contratto"],
      shuffledWords: ["Firmare", "il", "contratto", "la", "casa"],
      direction: "ur-to-it"
    },
    {
      id: "admin-l4-sr-ho-stipendio",
      type: "SentenceReconstruction",
      question: "Ricevo lo stipendio",
      correctSequence: ["مجھے", "تنخواہ", "ملتی", "ہے"],
      shuffledWords: ["مجھے", "تنخواہ", "ملتی", "ہے", "نہیں", "زیادہ"],
      direction: "it-to-ur"
    }
  ]
};
