import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec9-l2",
  title: "Internet & Social",
  description: "انٹرنیٹ اور سوشل میڈیا",
  icon: "🌐",
  exercises: [
    {
      id: "sec9-l2-vocab-social",
      type: "VocabularyCard",
      italian: "Social media",
      urdu: "سوشل میڈیا",
      emoji: "📱",
      pronunciation: "[so-shal me-dya]",
      exampleItalian: "Passo troppo tempo sui social media.",
      exampleUrdu: "میں سوشل میڈیا پر بہت زیادہ وقت گزارتا ہوں۔"
    },
    {
      id: "sec9-l2-vocab-sitoweb",
      type: "VocabularyCard",
      italian: "Sito web",
      urdu: "ویب سائٹ",
      emoji: "💻",
      pronunciation: "[see-toh web]",
      exampleItalian: "Guardo un sito web interessante.",
      exampleUrdu: "میں ایک دلچسپ ویب سائٹ دیکھتا ہوں۔"
    },
    {
      id: "sec9-l2-vocab-email",
      type: "VocabularyCard",
      italian: "E-mail",
      urdu: "ای میل",
      emoji: "📧",
      pronunciation: "[ee-me-eel]",
      exampleItalian: "Hai ricevuto la mia e-mail?",
      exampleUrdu: "کیا تمہیں میری ای میل ملی؟"
    },
    {
      id: "sec9-l2-vocab-connessione",
      type: "VocabularyCard",
      italian: "Connessione",
      urdu: "کنکشن",
      emoji: "🔗",
      pronunciation: "[kon-nes-syo-neh]",
      exampleItalian: "La connessione Internet è lenta.",
      exampleUrdu: "انٹرنیٹ کنکشن سست ہے۔"
    },
    {
      id: "sec9-l2-vocab-password",
      type: "VocabularyCard",
      italian: "Password",
      urdu: "پاس ورڈ",
      emoji: "🔑",
      pronunciation: "[pas-swoord]",
      exampleItalian: "Devo cambiare la mia password.",
      exampleUrdu: "مجھے اپنا پاس ورڈ تبدیل کرنا ہے۔"
    },
    {
      id: "sec9-l2-vocab-profilo",
      type: "VocabularyCard",
      italian: "Profilo",
      urdu: "پروفائل",
      emoji: "👤",
      pronunciation: "[pro-fee-loh]",
      exampleItalian: "Ho aggiornato il mio profilo.",
      exampleUrdu: "میں نے اپنی پروفائل اپ ڈیٹ کر دی ہے۔"
    },
    {
      id: "sec9-l2-mc-sitoweb",
      type: "MultipleChoice",
      question: "\"ویب سائٹ\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Sito web", "Telefono", "Internet", "Messaggio"],
      correctAnswer: "Sito web"
    },
    {
      id: "sec9-l2-tf-email",
      type: "TrueFalse",
      statement: "E-mail = خط",
      isTrue: false,
      correctAnswer: "ای میل"
    },
    {
      id: "sec9-l2-sr-connessione-lenta",
      type: "SentenceReconstruction",
      question: "La connessione Internet è lenta",
      correctSequence: ["انٹرنیٹ", "کنکشن", "سست", "ہے"],
      shuffledWords: ["انٹرنیٹ", "کنکشن", "سست", "ہے", "تیز", "بند"],
      direction: "it-to-ur"
    },
    {
      id: "sec9-l2-sr-mandato-messaggio",
      type: "SentenceReconstruction",
      question: "میں نے ایک پیغام بھیجا ہے",
      correctSequence: ["Ho", "mandato", "un", "messaggio"],
      shuffledWords: ["Ho", "mandato", "un", "messaggio", "ricevuto", "chiamato"],
      direction: "ur-to-it"
    }
  ]
};
