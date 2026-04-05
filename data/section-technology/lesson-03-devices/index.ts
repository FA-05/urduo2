import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec9-l3",
  title: "Devices & Actions",
  description: "آلات اور افعال",
  icon: "🔧",
  exercises: [
    {
      id: "sec9-l3-vocab-chiamare",
      type: "VocabularyCard",
      italian: "Chiamare",
      urdu: "کال کرنا",
      emoji: "📞",
      pronunciation: "[kya-ma-reh]",
      exampleItalian: "Devo chiamare mia madre.",
      exampleUrdu: "مجھے اپنی والدہ کو کال کرنی ہے۔"
    },
    {
      id: "sec9-l3-vocab-scrivere",
      type: "VocabularyCard",
      italian: "Scrivere",
      urdu: "لکھنا",
      emoji: "✍️",
      pronunciation: "[skree-ve-reh]",
      exampleItalian: "Scrivo un'e-mail ogni giorno.",
      exampleUrdu: "میں ہر روز ایک ای میل لکھتا ہوں۔"
    },
    {
      id: "sec9-l3-vocab-schermo",
      type: "VocabularyCard",
      italian: "Schermo",
      urdu: "سکین/شرمہ",
      emoji: "🖥️",
      pronunciation: "[sker-moh]",
      exampleItalian: "Lo schermo del telefono è rotto.",
      exampleUrdu: "فون کی سکرین ٹوٹی ہوئی ہے۔"
    },
    {
      id: "sec9-l3-vocab-tastiera",
      type: "VocabularyCard",
      italian: "Tastiera",
      urdu: "کی بورڈ",
      emoji: "⌨️",
      pronunciation: "[tas-tyeh-rah]",
      exampleItalian: "Uso la tastiera per scrivere.",
      exampleUrdu: "میں لکھنے کے لیے کی بورڈ استعمال کرتا ہوں۔"
    },
    {
      id: "sec9-l3-vocab-mouse",
      type: "VocabularyCard",
      italian: "Mouse",
      urdu: "ماؤس",
      emoji: "🖱️",
      pronunciation: "[mow-ze]",
      exampleItalian: "Il mouse non funziona.",
      exampleUrdu: "ماؤس کام نہیں کر رہا۔"
    },
    {
      id: "sec9-l3-vocab-tablet",
      type: "VocabularyCard",
      italian: "Tablet",
      urdu: "ٹیبلٹ",
      emoji: "📠",
      pronunciation: "[tab-let]",
      exampleItalian: "Leggo libri sul mio tablet.",
      exampleUrdu: "میں اپنے ٹیبلٹ پر کتابیں پڑھتا ہوں۔"
    },
    {
      id: "sec9-l3-vocab-caricabatterie",
      type: "VocabularyCard",
      italian: "Caricabatterie",
      urdu: "چارجر",
      emoji: "🔌",
      pronunciation: "[ka-ree-ka-bat-te-ryeh-reh]",
      exampleItalian: "Ho bisogno del caricabatterie.",
      exampleUrdu: "مجھے چارجر کی ضرورت ہے۔"
    },
    {
      id: "sec9-l3-mc-chiamare",
      type: "MultipleChoice",
      question: "\"کال کرنا\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Chiamare", "Scrivere", "Leggere", "Dormire"],
      correctAnswer: "Chiamare"
    },
    {
      id: "sec9-l3-sr-ti-chiamo",
      type: "SentenceReconstruction",
      question: "Ti chiamo dopo",
      correctSequence: ["میں", "تمہیں", "بعد", "میں", "کال", "کرتا", "ہوں"],
      shuffledWords: ["میں", "تمہیں", "بعد", "میں", "کال", "کرتا", "ہوں", "پہلے", "آج"],
      direction: "it-to-ur"
    },
    {
      id: "sec9-l3-sr-scrivo-email",
      type: "SentenceReconstruction",
      question: "میں ایک ای میل لکھتا ہوں",
      correctSequence: ["Scrivo", "un'e-mail"],
      shuffledWords: ["Scrivo", "un'e-mail", "un", "messaggio", "leggo"],
      direction: "ur-to-it"
    }
  ]
};
