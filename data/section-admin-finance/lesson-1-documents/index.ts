import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "admin-l1",
  title: "Essential Documents",
  description: "ضروری دستاویزات",
  icon: "🆔",
  exercises: [
    {
      id: "admin-l1-vocab-permesso",
      type: "VocabularyCard",
      italian: "Permesso di Soggiorno",
      urdu: "قیام کی اجازت (ریزائڈنس پرمٹ)",
      emoji: "🪪",
      pronunciation: "[per-mes-so dee sod-jor-no]",
      exampleItalian: "Devo rinnovare il mio permesso.",
      exampleUrdu: "مجھے اپنے پرمٹ کی تجدید کرانی ہے۔"
    },
    {
      id: "admin-l1-vocab-codice-fiscale",
      type: "VocabularyCard",
      italian: "Codice Fiscale",
      urdu: "ٹیکس شناختی کوڈ (ٹیکس نمبر)",
      emoji: "🔢",
      pronunciation: "[ko-dee-che fees-ka-le]",
      exampleItalian: "Serve il tuo codice fiscale.",
      exampleUrdu: "آپ کے ٹیکس نمبر کی ضرورت ہے۔"
    },
    {
      id: "admin-l1-mc-questura",
      type: "MultipleChoice",
      question: "\"پولیس ہیڈ کوارٹر\" (جہاں پرمٹ بنتے ہیں) کو Italian میں کیا کہتے ہیں؟",
      options: ["Questura", "Posta", "Banca", "Scuola"],
      correctAnswer: "Questura"
    },
    {
      id: "admin-l1-vocab-questura",
      type: "VocabularyCard",
      italian: "Questura",
      urdu: "پولیس ہیڈ کوارٹر (امیگریشن آفس)",
      emoji: "👮",
      pronunciation: "[kwes-too-rah]",
      exampleItalian: "Ho un appuntamento in questura.",
      exampleUrdu: "میرا پولیس ہیڈ کوارٹر میں اپوائنٹمنٹ ہے۔"
    },
    {
      id: "admin-l1-tf-certificato",
      type: "TrueFalse",
      statement: "Certificato = شناختی کارڈ",
      isTrue: false,
      correctAnswer: "سرٹیفکیٹ / تصدیق نامہ"
    },
    {
      id: "admin-l1-vocab-domanda",
      type: "VocabularyCard",
      italian: "Fare domanda",
      urdu: "درخواست دینا / اپلائی کرنا",
      emoji: "✍️",
      pronunciation: "[fa-re do-man-dah]",
      exampleItalian: "Faccio domanda per il visto.",
      exampleUrdu: "میں ویزا کے لیے درخواست دے رہا ہوں۔"
    },
    {
      id: "admin-l1-sr-rinnovare-permesso",
      type: "SentenceReconstruction",
      question: "مجھے اپنے پرمٹ کی تجدید کرانی ہے۔",
      correctSequence: ["Devo", "rinnovare", "il", "mio", "permesso"],
      shuffledWords: ["Devo", "rinnovare", "il", "mio", "permesso", "la", "casa"],
      direction: "ur-to-it"
    },
    {
      id: "admin-l1-sr-appuntamento-questura",
      type: "SentenceReconstruction",
      question: "Ho un appuntamento in questura",
      correctSequence: ["میرا", "پولیس", "ہیڈ", "کوارٹر", "میں", "اپوائنٹمنٹ", "ہے"],
      shuffledWords: ["میرا", "پولیس", "ہیڈ", "کوارٹر", "میں", "اپوائنٹمنٹ", "ہے", "نہیں", "کیوں"],
      direction: "it-to-ur"
    }
  ]
};
