import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "gram1-l3",
  title: "Regular -IRE Verbs",
  description: "-IRE پر ختم ہونے والے فعل",
  icon: "🔤",
  exercises: [
    {
      id: "gram1-l3-vocab-dormire",
      type: "VocabularyCard",
      italian: "Dormire",
      urdu: "سونا",
      emoji: "😴",
      pronunciation: "[dor-mee-re]",
      exampleItalian: "Dormo bene la notte.",
      exampleUrdu: "میں رات کو اچھی طرح سوتا ہوں۔"
    },
    {
      id: "gram1-l3-vocab-partire",
      type: "VocabularyCard",
      italian: "Partire",
      urdu: "روانہ ہونا / جانا",
      emoji: "🛫",
      pronunciation: "[par-tee-re]",
      exampleItalian: "Parto per Roma alle otto.",
      exampleUrdu: "میں آٹھ بجے روم کے لیے روانہ ہوتا ہوں۔"
    },
    {
      id: "gram1-l3-mc-sentire",
      type: "MultipleChoice",
      question: "\"سننا / محسوس کرنا\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Sentire", "Capire", "Dormire", "Partire"],
      correctAnswer: "Sentire"
    },
    {
      id: "gram1-l3-vocab-capire",
      type: "VocabularyCard",
      italian: "Capire",
      urdu: "سمجھنا",
      emoji: "💡",
      pronunciation: "[ka-pee-re]",
      exampleItalian: "Capisco l'italiano.",
      exampleUrdu: "میں اطالوی سمجھتا ہوں۔"
    },
    {
      id: "gram1-l3-tf-dormire",
      type: "TrueFalse",
      statement: "Dormire = کام کرنا",
      isTrue: false,
      correctAnswer: "سونا"
    },
    {
      id: "gram1-l3-vocab-uscire",
      type: "VocabularyCard",
      italian: "Uscire",
      urdu: "باہر نکلنا / باہر جانا",
      emoji: "🚪",
      pronunciation: "[oo-shee-re]",
      exampleItalian: "Esco con gli amici.",
      exampleUrdu: "میں دوستوں کے ساتھ باہر جاتا ہوں۔"
    },
    {
      id: "gram1-l3-sr-dormo-bene",
      type: "SentenceReconstruction",
      question: "میں اچھی طرح سوتا ہوں۔",
      correctSequence: ["Dormo", "bene"],
      shuffledWords: ["Dormo", "bene", "male", "lavoro"],
      direction: "ur-to-it"
    },
    {
      id: "gram1-l3-sr-capisco-italiano",
      type: "SentenceReconstruction",
      question: "Capisco l'italiano",
      correctSequence: ["میں", "اطالوی", "سمجھتا", "ہوں"],
      shuffledWords: ["میں", "اطالوی", "سمجھتا", "ہوں", "پڑھتا", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
