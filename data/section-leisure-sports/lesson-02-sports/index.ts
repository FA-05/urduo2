import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec8-l2",
  title: "Sports",
  description: "کھیل",
  icon: "⚽",
  exercises: [
    {
      id: "sec8-l2-vocab-sport",
      type: "VocabularyCard",
      italian: "Sport",
      urdu: "کھیل",
      emoji: "⚽",
      pronunciation: "[sport]",
      exampleItalian: "Qual è il tuo sport preferito?",
      exampleUrdu: "تمہارا پسندیدہ کھیل کون سا ہے؟"
    },
    {
      id: "sec8-l2-vocab-calcio",
      type: "VocabularyCard",
      italian: "Calcio",
      urdu: "فٹ بال",
      emoji: "⚽",
      pronunciation: "[kal-choh]",
      exampleItalian: "Mi piace giocare a calcio.",
      exampleUrdu: "مجھے فٹ بال کھیلنا پسند ہے۔"
    },
    {
      id: "sec8-l2-vocab-nuoto",
      type: "VocabularyCard",
      italian: "Nuoto",
      urdu: "تیراکی",
      emoji: "🏊",
      pronunciation: "[nwo-toh]",
      exampleItalian: "Il nuoto è un buon esercizio.",
      exampleUrdu: "تیراکی ایک اچھی ورزش ہے۔"
    },
    {
      id: "sec8-l2-vocab-pallavolo",
      type: "VocabularyCard",
      italian: "Pallavolo",
      urdu: "والی بال",
      emoji: "🏐",
      pronunciation: "[pal-lah-vo-loh]",
      exampleItalian: "Giochiamo a pallavolo.",
      exampleUrdu: "ہم والی بال کھیلتے ہیں۔"
    },
    {
      id: "sec8-l2-vocab-tennis",
      type: "VocabularyCard",
      italian: "Tennis",
      urdu: "ٹینس",
      emoji: "🎾",
      pronunciation: "[ten-nees]",
      exampleItalian: "Il tennis è divertente.",
      exampleUrdu: "ٹینس تفریحی ہے۔"
    },
    {
      id: "sec8-l2-vocab-giocare",
      type: "VocabularyCard",
      italian: "Giocare",
      urdu: "کھیلنا",
      emoji: "🎮",
      pronunciation: "[jo-kah-reh]",
      exampleItalian: "Voglio giocare con te.",
      exampleUrdu: "میں تمہارے ساتھ کھیلنا چاہتا ہوں۔"
    },
    {
      id: "sec8-l2-mc-calcio",
      type: "MultipleChoice",
      question: "\"فٹ بال\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Calcio", "Tennis", "Pallavolo", "Sport"],
      correctAnswer: "Calcio"
    },
    {
      id: "sec8-l2-tf-sport",
      type: "TrueFalse",
      statement: "Sport = کام",
      isTrue: false,
      correctAnswer: "کھیل"
    },
    {
      id: "sec8-l2-sr-piace-calcio",
      type: "SentenceReconstruction",
      question: "Mi piace giocare a calcio",
      correctSequence: ["مجھے", "فٹ", "بال", "کھیلنا", "پسند", "ہے"],
      shuffledWords: ["مجھے", "فٹ", "بال", "کھیلنا", "پسند", "ہے", "کرکٹ", "ناچنا"],
      direction: "it-to-ur"
    },
    {
      id: "sec8-l2-sr-giochiamo-tennis",
      type: "SentenceReconstruction",
      question: "کیا ہم ٹینس کھیلیں؟",
      correctSequence: ["Giochiamo", "a", "tennis", "?"],
      shuffledWords: ["Giochiamo", "a", "tennis", "?", "calcio", "nuoto"],
      direction: "ur-to-it"
    }
  ]
};
