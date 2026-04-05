import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "family-l3",
  title: "Feelings & Emotions",
  description: "احساسات اور جذبات",
  icon: "❤️",
  exercises: [
    {
      id: "family-l3-vocab-felice",
      type: "VocabularyCard",
      italian: "Felice",
      urdu: "خوش",
      emoji: "😊",
      pronunciation: "[fe-lee-che]",
      exampleItalian: "Oggi sono molto felice.",
      exampleUrdu: "میں آج بہت خوش ہوں۔"
    },
    {
      id: "family-l3-vocab-triste",
      type: "VocabularyCard",
      italian: "Triste",
      urdu: "اداس",
      emoji: "😢",
      pronunciation: "[trees-te]",
      exampleItalian: "Perché sei triste?",
      exampleUrdu: "تم اداس کیوں ہو؟"
    },
    {
      id: "family-l3-mc-arrabbiato",
      type: "MultipleChoice",
      question: "\"غصہ\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Arrabbiato", "Stanco", "Affamato", "Semplice"],
      correctAnswer: "Arrabbiato"
    },
    {
      id: "family-l3-vocab-stanco",
      type: "VocabularyCard",
      italian: "Stanco",
      urdu: "تھکا ہوا",
      emoji: "😫",
      pronunciation: "[stan-ko]",
      exampleItalian: "Sono stanco dopo il lavoro.",
      exampleUrdu: "میں کام کے بعد تھکا ہوا ہوں۔"
    },
    {
      id: "family-l3-tf-stanco",
      type: "TrueFalse",
      statement: "Stanco = تازہ دم",
      isTrue: false,
      correctAnswer: "تھکا ہوا"
    },
    {
      id: "family-l3-vocab-paura",
      type: "VocabularyCard",
      italian: "Avere paura",
      urdu: "ڈرنا / خوفزدہ ہونا",
      emoji: "😨",
      pronunciation: "[a-ve-re pa-oo-rah]",
      exampleItalian: "Ho paura del buio.",
      exampleUrdu: "مجھے اندھیرے سے ڈر لگتا ہے۔"
    },
    {
      id: "family-l3-sr-sono-felice",
      type: "SentenceReconstruction",
      question: "میں بہت خوش ہوں۔",
      correctSequence: ["Sono", "molto", "felice"],
      shuffledWords: ["Sono", "molto", "felice", "triste", "il"],
      direction: "ur-to-it"
    },
    {
      id: "family-l3-sr-ho-paura",
      type: "SentenceReconstruction",
      question: "Ho paura del buio",
      correctSequence: ["مجھے", "اندھیرے", "سے", "ڈر", "لگتا", "ہے"],
      shuffledWords: ["مجھے", "اندھیرے", "سے", "ڈر", "لگتا", "ہے", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
