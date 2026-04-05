import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec12-l5",
  title: "Simple Prepositions",
  description: "سادہ حروفِ جار",
  icon: "🔗",
  exercises: [
    {
      id: "sec12-l5-vocab-prep1",
      type: "VocabularyCard",
      italian: "Di, A, Da",
      urdu: "کا/کی، کو/میں، سے/طرف",
      emoji: "📍",
      pronunciation: "[dee, ah, dah]",
      exampleItalian: "Di Roma. A casa. Da Milano.",
      exampleUrdu: "روم کا۔ گھر کو۔ میلان سے۔"
    },
    {
      id: "sec12-l5-vocab-prep2",
      type: "VocabularyCard",
      italian: "In, Su, Per",
      urdu: "میں، پر، کے لیے",
      emoji: "📍",
      pronunciation: "[een, soo, per]",
      exampleItalian: "In ufficio. Sul tavolo. Per te.",
      exampleUrdu: "دفتر میں۔ میز پر۔ تمہارے لیے۔"
    },
    {
      id: "sec12-l5-vocab-prep3",
      type: "VocabularyCard",
      italian: "Con, Tra, Fra",
      urdu: "کے ساتھ، کے درمیان/کے بیچ",
      emoji: "📍",
      pronunciation: "[kon, trah, frah]",
      exampleItalian: "Con me. Tra amici. Fra due ore.",
      exampleUrdu: "میرے ساتھ۔ دوستوں کے درمیان۔ دو گھنٹے میں۔"
    },
    {
      id: "sec12-l5-mc-di",
      type: "MultipleChoice",
      question: "\"Di\"",
      options: ["کا/کی", "سے", "میں", "پر"],
      correctAnswer: "کا/کی"
    },
    {
      id: "sec12-l5-tf-in",
      type: "TrueFalse",
      statement: "In = باہر",
      isTrue: false,
      correctAnswer: "میں"
    },
    {
      id: "sec12-l5-sr-vado-roma",
      type: "SentenceReconstruction",
      question: "Vado a Roma",
      correctSequence: ["میں", "روم", "جا", "رہا", "ہوں"],
      shuffledWords: ["میں", "روم", "جا", "رہا", "ہوں", "میلان", "سے"],
      direction: "it-to-ur"
    },
    {
      id: "sec12-l5-sr-libro-tavolo",
      type: "SentenceReconstruction",
      question: "Il libro è sul tavolo",
      correctSequence: ["کتاب", "میز", "پر", "ہے"],
      shuffledWords: ["کتاب", "میز", "پر", "ہے", "نیچے", "الماری"],
      direction: "it-to-ur"
    },
    {
      id: "sec12-l5-sr-vengo-milano",
      type: "SentenceReconstruction",
      question: "Vengo da Milano",
      correctSequence: ["میں", "میلان", "سے", "آتا", "ہوں"],
      shuffledWords: ["میں", "میلان", "سے", "آتا", "ہوں", "جاتا", "روم"],
      direction: "it-to-ur"
    },
    {
      id: "sec12-l5-sr-viaggio-con-te",
      type: "SentenceReconstruction",
      question: "میں تمہارے ساتھ سفر کرتا ہوں",
      correctSequence: ["Viaggio", "con", "te"],
      shuffledWords: ["Viaggio", "con", "te", "me", "senza", "lui"],
      direction: "ur-to-it"
    }
  ]
};
