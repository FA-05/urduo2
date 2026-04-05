import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec16-l3",
  title: "Cinema & Theater",
  description: "سینما اور تھیٹر",
  icon: "🎭",
  exercises: [
    {
      id: "sec16-l3-vocab-film",
      type: "VocabularyCard",
      italian: "Film",
      urdu: "فلم",
      emoji: "🎬",
      pronunciation: "[feelm]",
      exampleItalian: "Guardo un film.",
      exampleUrdu: "میں ایک فلم دیکھتا ہوں۔"
    },
    {
      id: "sec16-l3-vocab-attore",
      type: "VocabularyCard",
      italian: "Attore",
      urdu: "اداکار",
      emoji: "🎭",
      pronunciation: "[at-toh-re]",
      exampleItalian: "Lui è un bravo attore.",
      exampleUrdu: "وہ ایک اچھا اداکار ہے۔"
    },
    {
      id: "sec16-l3-mc-film",
      type: "MultipleChoice",
      question: "\"فلم\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Film", "Teatro", "Musica", "Arte"],
      correctAnswer: "Film"
    },
    {
      id: "sec16-l3-vocab-teatro",
      type: "VocabularyCard",
      italian: "Teatro",
      urdu: "تھیٹر",
      emoji: "🏛️",
      pronunciation: "[te-ah-troh]",
      exampleItalian: "Andiamo a teatro.",
      exampleUrdu: "ہم تھیٹر جا رہے ہیں۔"
    },
    {
      id: "sec16-l3-tf-teatro",
      type: "TrueFalse",
      statement: "Teatro = اسکول",
      isTrue: false,
      correctAnswer: "تھیٹر"
    },
    {
      id: "sec16-l3-vocab-spettacolo",
      type: "VocabularyCard",
      italian: "Spettacolo",
      urdu: "شو / نمائش",
      emoji: "🎟️",
      pronunciation: "[spet-tah-ko-loh]",
      exampleItalian: "Lo spettacolo è finito.",
      exampleUrdu: "شو ختم ہو گیا ہے۔"
    },
    {
      id: "sec16-l3-sr-guardo-film",
      type: "SentenceReconstruction",
      question: "میں ایک فلم دیکھتا ہوں۔",
      correctSequence: ["Guardo", "un", "film"],
      shuffledWords: ["Guardo", "un", "film", "leggo", "il"],
      direction: "ur-to-it"
    },
    {
      id: "sec16-l3-sr-attore-bravo",
      type: "SentenceReconstruction",
      question: "L'attore è bravo",
      correctSequence: ["اداکار", "اچھا", "ہے"],
      shuffledWords: ["اداکار", "اچھا", "ہے", "برا", "فون"],
      direction: "it-to-ur"
    }
  ]
};
