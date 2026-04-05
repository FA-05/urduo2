import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "health-l1",
  title: "Common Symptoms",
  description: "عام علامات",
  icon: "🤒",
  exercises: [
    {
      id: "health-l1-vocab-febbre",
      type: "VocabularyCard",
      italian: "Febbre",
      urdu: "بخار",
      emoji: "🤒",
      pronunciation: "[feb-bre]",
      exampleItalian: "Ho la febbre alta.",
      exampleUrdu: "مجھے تیز بخار ہے۔"
    },
    {
      id: "health-l1-vocab-tosse",
      type: "VocabularyCard",
      italian: "Tosse",
      urdu: "کھانسی",
      emoji: "😷",
      pronunciation: "[tos-se]",
      exampleItalian: "Ho una brutta tosse.",
      exampleUrdu: "مجھے بری کھانسی ہے۔"
    },
    {
      id: "health-l1-mc-raffreddore",
      type: "MultipleChoice",
      question: "\"زکام / نزلہ\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Raffreddore", "Mal di testa", "Tosse", "Febbre"],
      correctAnswer: "Raffreddore"
    },
    {
      id: "health-l1-vocab-dolore",
      type: "VocabularyCard",
      italian: "Dolore",
      urdu: "درد",
      emoji: "🤕",
      pronunciation: "[do-lo-re]",
      exampleItalian: "Sento un forte dolore.",
      exampleUrdu: "مجھے شدید درد محسوس ہو رہا ہے۔"
    },
    {
      id: "health-l1-tf-tosse",
      type: "TrueFalse",
      statement: "Tosse = نیند",
      isTrue: false,
      correctAnswer: "کھانسی"
    },
    {
      id: "health-l1-vocab-stanchezza",
      type: "VocabularyCard",
      italian: "Stanchezza",
      urdu: "تھکن",
      emoji: "😫",
      pronunciation: "[stan-ket-tsa]",
      exampleItalian: "Sento molta stanchezza.",
      exampleUrdu: "میں بہت تھکن محسوس کر رہا ہوں۔"
    },
    {
      id: "health-l1-sr-ho-febbre-alta",
      type: "SentenceReconstruction",
      question: "مجھے تیز بخار ہے۔",
      correctSequence: ["Ho", "la", "febbre", "alta"],
      shuffledWords: ["Ho", "la", "febbre", "alta", "bassa", "il"],
      direction: "ur-to-it"
    },
    {
      id: "health-l1-sr-ho-raffreddore",
      type: "SentenceReconstruction",
      question: "Ho il raffreddore",
      correctSequence: ["مجھے", "زکام", "ہے"],
      shuffledWords: ["مجھے", "زکام", "ہے", "بخار", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
