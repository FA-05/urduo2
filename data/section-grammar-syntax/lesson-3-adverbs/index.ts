import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "gram2-l3",
  title: "Adverbs of Frequency",
  description: "تعداد اور تکرار بتانے والے الفاظ",
  icon: "⏳",
  exercises: [
    {
      id: "gram2-l3-vocab-sempre",
      type: "VocabularyCard",
      italian: "Sempre",
      urdu: "ہمیشہ",
      emoji: "♾️",
      pronunciation: "[sem-pre]",
      exampleItalian: "Studio sempre.",
      exampleUrdu: "میں ہمیشہ پڑھتا ہوں۔"
    },
    {
      id: "gram2-l3-vocab-spesso",
      type: "VocabularyCard",
      italian: "Spesso",
      urdu: "اکثر / اکثر و بیشتر",
      emoji: "🔄",
      pronunciation: "[spes-so]",
      exampleItalian: "Vado spesso al parco.",
      exampleUrdu: "میں اکثر پارک جاتا ہوں۔"
    },
    {
      id: "gram2-l3-mc-mai",
      type: "MultipleChoice",
      question: "\"کبھی نہیں\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Mai", "Sempre", "Spesso", "Qualche volta"],
      correctAnswer: "Mai"
    },
    {
      id: "gram2-l3-vocab-qualche-volta",
      type: "VocabularyCard",
      italian: "Qualche volta",
      urdu: "کبھی کبھی",
      emoji: "🕒",
      pronunciation: "[kwal-ke vol-ta]",
      exampleItalian: "Qualche volta mangio fuori.",
      exampleUrdu: "کبھی کبھی میں باہر کھاتا ہوں۔"
    },
    {
      id: "gram2-l3-tf-sempre",
      type: "TrueFalse",
      statement: "Sempre = کبھی نہیں",
      isTrue: false,
      correctAnswer: "ہمیشہ"
    },
    {
      id: "gram2-l3-vocab-mai",
      type: "VocabularyCard",
      italian: "Non... mai",
      urdu: "کبھی نہیں",
      emoji: "🚫",
      pronunciation: "[non ... ma-ee]",
      exampleItalian: "Non dormo mai tarde.",
      exampleUrdu: "میں کبھی دیر سے نہیں سوتا ہوں۔"
    },
    {
      id: "gram2-l3-sr-studio-sempre",
      type: "SentenceReconstruction",
      question: "میں ہمیشہ پڑھتا ہوں۔",
      correctSequence: ["Studio", "sempre"],
      shuffledWords: ["Studio", "sempre", "mai", "lavoro"],
      direction: "ur-to-it"
    },
    {
      id: "gram2-l3-sr-vado-spesso",
      type: "SentenceReconstruction",
      question: "Vado spesso al cinema",
      correctSequence: ["میں", "اکثر", "سینما", "جاتا", "ہوں"],
      shuffledWords: ["میں", "اکثر", "سینما", "جاتا", "ہوں", "کبھی", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
