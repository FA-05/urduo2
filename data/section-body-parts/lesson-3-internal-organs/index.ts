import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "body-l3",
  title: "Internal Organs",
  description: "اندرونی اعضاء",
  icon: "🫀",
  exercises: [
    {
      id: "body-l3-vocab-cuore",
      type: "VocabularyCard",
      italian: "Cuore",
      urdu: "دل",
      emoji: "🫀",
      pronunciation: "[kwo-re]",
      exampleItalian: "Il cuore batte forte.",
      exampleUrdu: "دل زور سے دھڑکتا ہے۔"
    },
    {
      id: "body-l3-vocab-cervello",
      type: "VocabularyCard",
      italian: "Cervello",
      urdu: "دماغ",
      emoji: "🧠",
      pronunciation: "[cher-vel-lo]",
      exampleItalian: "Usa il cervello.",
      exampleUrdu: "دماغ کا استعمال کرو۔"
    },
    {
      id: "body-l3-mc-stomaco",
      type: "MultipleChoice",
      question: "\"معدہ\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Stomaco", "Cuore", "Cervello", "Polmone"],
      correctAnswer: "Stomaco"
    },
    {
      id: "body-l3-vocab-polmone",
      type: "VocabularyCard",
      italian: "Polmone",
      urdu: "پھیپھڑا",
      emoji: "🫁",
      pronunciation: "[pol-mo-ne]",
      exampleItalian: "Abbiamo due polmoni.",
      exampleUrdu: "ہمارے دو پھیپھڑے ہیں۔"
    },
    {
      id: "body-l3-tf-cuore",
      type: "TrueFalse",
      statement: "Cuore = گردہ",
      isTrue: false,
      correctAnswer: "دل"
    },
    {
      id: "body-l3-vocab-sangue",
      type: "VocabularyCard",
      italian: "Sangue",
      urdu: "خون",
      emoji: "🩸",
      pronunciation: "[san-gwe]",
      exampleItalian: "Il sangue è rosso.",
      exampleUrdu: "خون سرخ ہے۔"
    },
    {
      id: "body-l3-sr-usa-cervello",
      type: "SentenceReconstruction",
      question: "دماغ کا استعمال کرو۔",
      correctSequence: ["Usa", "il", "cervello"],
      shuffledWords: ["Usa", "il", "cervello", "la", "mano"],
      direction: "ur-to-it"
    },
    {
      id: "body-l3-sr-cuore-batte",
      type: "SentenceReconstruction",
      question: "Il cuore batte forte",
      correctSequence: ["دل", "زور", "سے", "دھڑکتا", "ہے"],
      shuffledWords: ["دل", "زور", "سے", "دھڑکتا", "ہے", "بند", "ہے"],
      direction: "it-to-ur"
    }
  ]
};
