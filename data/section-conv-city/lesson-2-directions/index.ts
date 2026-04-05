import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "conv4-l2",
  title: "Asking for Directions",
  description: "راستہ پوچھنا",
  icon: "🗺️",
  exercises: [
    {
      id: "conv4-l2-vocab-destra",
      type: "VocabularyCard",
      italian: "Destra",
      urdu: "دائیں",
      emoji: "➡️",
      pronunciation: "[des-trah]",
      exampleItalian: "Gira a destra.",
      exampleUrdu: "دائیں مڑیں۔"
    },
    {
      id: "conv4-l2-vocab-sinistra",
      type: "VocabularyCard",
      italian: "Sinistra",
      urdu: "بائیں",
      emoji: "⬅️",
      pronunciation: "[see-nees-trah]",
      exampleItalian: "Gira a sinistra.",
      exampleUrdu: "بائیں مڑیں۔"
    },
    {
      id: "conv4-l2-mc-dritto",
      type: "MultipleChoice",
      question: "\"سیدھا\" جانے کو Italian میں کیا کہتے ہیں؟",
      options: ["Dritto", "Lontano", "Vicino", "Alto"],
      correctAnswer: "Dritto"
    },
    {
      id: "conv4-l2-vocab-dritto",
      type: "VocabularyCard",
      italian: "Dritto",
      urdu: "سیدھا",
      emoji: "⬆️",
      pronunciation: "[dreet-toh]",
      exampleItalian: "Vai sempre dritto.",
      exampleUrdu: "ہمیشہ سیدھا جاؤ۔"
    },
    {
      id: "conv4-l2-tf-lontano",
      type: "TrueFalse",
      statement: "Lontano = قریب",
      isTrue: false,
      correctAnswer: "دور"
    },
    {
      id: "conv4-l2-vocab-lontano",
      type: "VocabularyCard",
      italian: "Lontano",
      urdu: "دور",
      emoji: "🔭",
      pronunciation: "[lon-tah-no]",
      exampleItalian: "È molto lontano?",
      exampleUrdu: "کیا یہ بہت دور ہے؟"
    },
    {
      id: "conv4-l2-sr-gira-destra",
      type: "SentenceReconstruction",
      question: "دائیں مڑیں۔",
      correctSequence: ["Gira", "a", "destra"],
      shuffledWords: ["Gira", "a", "destra", "sinistra", "va"],
      direction: "ur-to-it"
    },
    {
      id: "conv4-l2-sr-fermati-qui",
      type: "SentenceReconstruction",
      question: "Fermati qui",
      correctSequence: ["یہاں", "رک", "جاؤ"],
      shuffledWords: ["یہاں", "رک", "جاؤ", "چلو", "وہاں"],
      direction: "it-to-ur"
    }
  ]
};
