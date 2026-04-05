import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "adv-gram-l4",
  title: "The Past Tense: Basics",
  description: "ماضی قریب کی بنیادی باتیں (Passato Prossimo)",
  icon: "📜",
  exercises: [
    {
      id: "adv-gram-l4-vocab-mangiato",
      type: "VocabularyCard",
      italian: "Ho mangiato",
      urdu: "میں نے کھایا ہے",
      emoji: "🍕",
      pronunciation: "[o man-ja-toh]",
      exampleItalian: "Ho mangiato ایک پیزا.",
      exampleUrdu: "میں نے ایک پیزا کھایا ہے۔"
    },
    {
      id: "adv-gram-l4-vocab-parlato",
      type: "VocabularyCard",
      italian: "Ho parlato",
      urdu: "میں نے بات کی ہے",
      emoji: "🗣️",
      pronunciation: "[o par-la-toh]",
      exampleItalian: "Ho parlato con lui.",
      exampleUrdu: "میں نے اس سے بات کی ہے۔"
    },
    {
      id: "adv-gram-l4-mc-visto",
      type: "MultipleChoice",
      question: "\"میں نے دیکھا ہے\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Ho visto", "Ho guardato", "Vedo", "Guardo"],
      correctAnswer: "Ho visto"
    },
    {
      id: "adv-gram-l4-vocab-fatto",
      type: "VocabularyCard",
      italian: "Ho fatto",
      urdu: "میں نے کیا ہے",
      emoji: "✅",
      pronunciation: "[o fat-toh]",
      exampleItalian: "Ho fatto colazione.",
      exampleUrdu: "میں نے ناشتہ کیا ہے۔"
    },
    {
      id: "adv-gram-l4-tf-mangiato",
      type: "TrueFalse",
      statement: "Ho mangiato = میں کھا رہا ہوں",
      isTrue: false,
      correctAnswer: "میں نے کھایا ہے"
    },
    {
      id: "adv-gram-l4-vocab-comprato",
      type: "VocabularyCard",
      italian: "Ho comprato",
      urdu: "میں نے خریدا ہے",
      emoji: "🛍️",
      pronunciation: "[o kom-pra-toh]",
      exampleItalian: "Ho comprato un libro.",
      exampleUrdu: "میں نے ایک کتاب خریدی ہے۔"
    },
    {
      id: "adv-gram-l4-sr-ho-mangiato",
      type: "SentenceReconstruction",
      question: "میں نے ایک پیزا کھایا ہے۔",
      correctSequence: ["Ho", "mangiato", "una", "pizza"],
      shuffledWords: ["Ho", "mangiato", "una", "pizza", "il", "pane"],
      direction: "ur-to-it"
    },
    {
      id: "adv-gram-l4-sr-ho-fatto-tutto",
      type: "SentenceReconstruction",
      question: "Ho fatto tutto",
      correctSequence: ["میں", "نہیں", "سب", "کچھ", "کر", "لیا", "ہے"],
      shuffledWords: ["میں", "نہیں", "سب", "کچھ", "کر", "لیا", "ہے", "کچھ", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
