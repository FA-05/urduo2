import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec7-l3",
  title: "Grocery & Market",
  description: "کریانہ اور مارکیٹ",
  icon: "🍎",
  exercises: [
    {
      id: "sec7-l3-vocab-verdura",
      type: "VocabularyCard",
      italian: "Verdura",
      urdu: "سبزی",
      emoji: "🥦",
      pronunciation: "[ver-doo-rah]",
      exampleItalian: "Compro la verdura al mercato.",
      exampleUrdu: "میں مارکیٹ سے سبزی خریدتا ہوں۔"
    },
    {
      id: "sec7-l3-vocab-frutta",
      type: "VocabularyCard",
      italian: "Frutta",
      urdu: "پھل",
      emoji: "🍎",
      pronunciation: "[frooot-tah]",
      exampleItalian: "La frutta è dolce.",
      exampleUrdu: "پھل میٹھا ہے۔"
    },
    {
      id: "sec7-l3-vocab-pane",
      type: "VocabularyCard",
      italian: "Pane",
      urdu: "روٹی/ڈبل روٹی",
      emoji: "🍞",
      pronunciation: "[pah-neh]",
      exampleItalian: "Mangio pane e formaggio.",
      exampleUrdu: "میں روٹی اور پنیر کھاتا ہوں۔"
    },
    {
      id: "sec7-l3-vocab-latte",
      type: "VocabularyCard",
      italian: "Latte",
      urdu: "دودھ",
      emoji: "🥛",
      pronunciation: "[lat-teh]",
      exampleItalian: "Bevo un bicchiere di latte.",
      exampleUrdu: "میں دودھ کا ایک گلاس پیتا ہوں۔"
    },
    {
      id: "sec7-l3-vocab-uova",
      type: "VocabularyCard",
      italian: "Uova",
      urdu: "انڈے",
      emoji: "🥚",
      pronunciation: "[wo-vah]",
      exampleItalian: "Compro sei uova.",
      exampleUrdu: "میں چھ انڈے خریدتا ہوں۔"
    },
    {
      id: "sec7-l3-vocab-zucchero",
      type: "VocabularyCard",
      italian: "Zucchero",
      urdu: "چینی",
      emoji: "🧂",
      pronunciation: "[dzook-ke-roh]",
      exampleItalian: "Il tè ha troppo zucchero.",
      exampleUrdu: "چائے میں بہت زیادہ چینی ہے۔"
    },
    {
      id: "sec7-l3-mc-frutta",
      type: "MultipleChoice",
      question: "\"پھل\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Frutta", "Verdura", "Pane", "Latte"],
      correctAnswer: "Frutta"
    },
    {
      id: "sec7-l3-tf-latte",
      type: "TrueFalse",
      statement: "Latte = پانی",
      isTrue: false,
      correctAnswer: "دودھ"
    },
    {
      id: "sec7-l3-sr-comprare-pane",
      type: "SentenceReconstruction",
      question: "Voglio comprare il pane",
      correctSequence: ["میں", "روٹی", "خریدنا", "چاہتا", "ہوں"],
      shuffledWords: ["میں", "روٹی", "خریدنا", "چاہتا", "ہوں", "پانی", "پینا"],
      direction: "it-to-ur"
    },
    {
      id: "sec7-l3-sr-bevo-latte",
      type: "SentenceReconstruction",
      question: "میں دودھ پیتا ہوں",
      correctSequence: ["Bevo", "il", "latte"],
      shuffledWords: ["Bevo", "il", "latte", "mangio", "il", "pane"],
      direction: "ur-to-it"
    }
  ]
};
