import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "colors-l1",
  title: "Basic Colors",
  description: "بنیادی رنگ",
  icon: "🎨",
  exercises: [
    {
      id: "colors-l1-vocab-rosso",
      type: "VocabularyCard",
      italian: "Rosso",
      urdu: "سرخ / لال",
      emoji: "🔴",
      pronunciation: "[ros-so]",
      exampleItalian: "Il pomodoro è rosso.",
      exampleUrdu: "ٹماٹر سرخ ہے۔"
    },
    {
      id: "colors-l1-vocab-blu",
      type: "VocabularyCard",
      italian: "Blu",
      urdu: "نیلا",
      emoji: "🔵",
      pronunciation: "[bloo]",
      exampleItalian: "Il mare è blu.",
      exampleUrdu: "سمندر نیلا ہے۔"
    },
    {
      id: "colors-l1-mc-verde",
      type: "MultipleChoice",
      question: "\"سبز\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Verde", "Giallo", "Nero", "Bianco"],
      correctAnswer: "Verde"
    },
    {
      id: "colors-l1-vocab-giallo",
      type: "VocabularyCard",
      italian: "Giallo",
      urdu: "پیلا",
      emoji: "🟡",
      pronunciation: "[jal-lo]",
      exampleItalian: "Il sole è giallo.",
      exampleUrdu: "سورج پیلا ہے۔"
    },
    {
      id: "colors-l1-tf-nero",
      type: "TrueFalse",
      statement: "Nero = سفید",
      isTrue: false,
      correctAnswer: "کالا"
    },
    {
      id: "colors-l1-vocab-bianco",
      type: "VocabularyCard",
      italian: "Bianco",
      urdu: "سفید",
      emoji: "⚪",
      pronunciation: "[byan-ko]",
      exampleItalian: "Il latte è bianco.",
      exampleUrdu: "دودھ سفید ہے۔"
    },
    {
      id: "colors-l1-sr-pomodoro-rosso",
      type: "SentenceReconstruction",
      question: "ٹماٹر سرخ ہے۔",
      correctSequence: ["Il", "pomodoro", "è", "rosso"],
      shuffledWords: ["Il", "pomodoro", "è", "rosso", "giallo", "la"],
      direction: "ur-to-it"
    },
    {
      id: "colors-l1-sr-mare-blu",
      type: "SentenceReconstruction",
      question: "Il mare è blu",
      correctSequence: ["سمندر", "نیلا", "ہے"],
      shuffledWords: ["سمندر", "نیلا", "ہے", "سرخ", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
