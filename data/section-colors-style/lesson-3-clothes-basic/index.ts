import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "colors-l3",
  title: "Essential Clothing",
  description: "ضروری لباس",
  icon: "👕",
  exercises: [
    {
      id: "colors-l3-vocab-camicia",
      type: "VocabularyCard",
      italian: "Camicia",
      urdu: "قمیض",
      emoji: "👔",
      pronunciation: "[ka-mee-tcha]",
      exampleItalian: "Porto una camicia bianca.",
      exampleUrdu: "میں ایک سفید قمیض پہنتا ہوں۔"
    },
    {
      id: "colors-l3-vocab-pantaloni",
      type: "VocabularyCard",
      italian: "Pantaloni",
      urdu: "پتلون",
      emoji: "👖",
      pronunciation: "[pan-ta-lo-nee]",
      exampleItalian: "Questi pantaloni sono neri.",
      exampleUrdu: "یہ پتلون کالی ہے۔"
    },
    {
      id: "colors-l3-mc-scarpe",
      type: "MultipleChoice",
      question: "\"جوتے\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Scarpe", "Giacca", "Maglietta", "Calze"],
      correctAnswer: "Scarpe"
    },
    {
      id: "colors-l3-vocab-giacca",
      type: "VocabularyCard",
      italian: "Giacca",
      urdu: "جیکٹ / کوٹ",
      emoji: "🧥",
      pronunciation: "[jak-kah]",
      exampleItalian: "Metti la giacca.",
      exampleUrdu: "جیکٹ پہنو۔"
    },
    {
      id: "colors-l3-tf-calze",
      type: "TrueFalse",
      statement: "Calze = ٹوپی",
      isTrue: false,
      correctAnswer: "جرابیں"
    },
    {
      id: "colors-l3-vocab-vestito",
      type: "VocabularyCard",
      italian: "Vestito",
      urdu: "لباس / ڈریس",
      emoji: "👗",
      pronunciation: "[ves-tee-toh]",
      exampleItalian: "Un bel vestito rosso.",
      exampleUrdu: "ایک خوبصورت سرخ لباس۔"
    },
    {
      id: "colors-l3-sr-camicia-bianca",
      type: "SentenceReconstruction",
      question: "میں ایک سفید قمیض پہنتا ہوں۔",
      correctSequence: ["Porto", "una", "camicia", "bianca"],
      shuffledWords: ["Porto", "una", "camicia", "bianca", "nera", "la"],
      direction: "ur-to-it"
    },
    {
      id: "colors-l3-sr-metti-giacca",
      type: "SentenceReconstruction",
      question: "Metti la giacca",
      correctSequence: ["جیکٹ", "پہنو"],
      shuffledWords: ["جیکٹ", "پہنو", "نکالو", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
