import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec5-l4",
  title: "Higher Ed & Places",
  description: "اعلیٰ تعلیم اور جگہیں",
  icon: "🎓",
  exercises: [
    {
      id: "sec5-l4-vocab-laurea",
      type: "VocabularyCard",
      italian: "Laurea",
      urdu: "ڈگری",
      emoji: "📜",
      pronunciation: "[low-reh-ah]",
      exampleItalian: "Ho preso la mia laurea.",
      exampleUrdu: "میں نے اپنی ڈگری حاصل کر لی ہے۔"
    },
    {
      id: "sec5-l4-vocab-professore",
      type: "VocabularyCard",
      italian: "Professore",
      urdu: "پروفیسر",
      emoji: "👨‍🏫",
      pronunciation: "[pro-fes-so-reh]",
      exampleItalian: "Il professore spiega la lezione.",
      exampleUrdu: "پروفیسر سبق سمجھاتے ہیں۔"
    },
    {
      id: "sec5-l4-vocab-biblioteca",
      type: "VocabularyCard",
      italian: "Biblioteca",
      urdu: "لائبریری",
      emoji: "📚",
      pronunciation: "[beeb-lyo-teh-kah]",
      exampleItalian: "Studio in biblioteca.",
      exampleUrdu: "میں لائبریری میں پڑھتا ہوں۔"
    },
    {
      id: "sec5-l4-vocab-laboratorio",
      type: "VocabularyCard",
      italian: "Laboratorio",
      urdu: "لیبارٹری",
      emoji: "🧪",
      pronunciation: "[lah-bo-ra-toh-ryoh]",
      exampleItalian: "Facciamo ricerca in laboratorio.",
      exampleUrdu: "ہم لیبارٹری میں تحقیق کرتے ہیں۔"
    },
    {
      id: "sec5-l4-vocab-ricerca",
      type: "VocabularyCard",
      italian: "Ricerca",
      urdu: "تحقیق",
      emoji: "🔍",
      pronunciation: "[ree-cher-kah]",
      exampleItalian: "La ricerca è importante.",
      exampleUrdu: "تحقیق اہم ہے۔"
    },
    {
      id: "sec5-l4-vocab-borsa",
      type: "VocabularyCard",
      italian: "Borsa di studio",
      urdu: "سکالرشپ/تعلیمی وظیفہ",
      emoji: "💰",
      pronunciation: "[bor-sah dee stoo-dyoh]",
      exampleItalian: "Ho vinto una borsa di studio.",
      exampleUrdu: "میں نے ایک سکالرشپ جیتی ہے۔"
    },
    {
      id: "sec5-l4-mc-professore",
      type: "MultipleChoice",
      question: "\"پروفیسر\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Professore", "Studente", "Libro", "Scuola"],
      correctAnswer: "Professore"
    },
    {
      id: "sec5-l4-tf-biblioteca",
      type: "TrueFalse",
      statement: "Biblioteca = لائبریری",
      isTrue: true
    },
    {
      id: "sec5-l4-sr-studio-biblioteca",
      type: "SentenceReconstruction",
      question: "Studio in biblioteca",
      correctSequence: ["میں", "لائبریری", "میں", "پڑھتا", "ہوں"],
      shuffledWords: ["میں", "لائبریری", "میں", "پڑھتا", "ہوں", "گھر", "سوتا"],
      direction: "it-to-ur"
    },
    {
      id: "sec5-l4-sr-borsa-studio",
      type: "SentenceReconstruction",
      question: "میرا تعلیمی وظیفہ ہے",
      correctSequence: ["Ho", "una", "borsa", "di", "studio"],
      shuffledWords: ["Ho", "una", "borsa", "di", "studio", "laurea", "esame"],
      direction: "ur-to-it"
    }
  ]
};
