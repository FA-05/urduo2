import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "body-l4",
  title: "Body Plurals",
  description: "جسم کی جمع (قواعد)",
  icon: "🧬",
  exercises: [
    {
      id: "body-l4-vocab-bracci",
      type: "VocabularyCard",
      italian: "Le braccia",
      urdu: "بازو (جمع)",
      emoji: "💪💪",
      pronunciation: "[le brat-tcha]",
      exampleItalian: "Le braccia sono forti.",
      exampleUrdu: "بازو مضبوط ہیں۔"
    },
    {
      id: "body-l4-vocab-mani",
      type: "VocabularyCard",
      italian: "Le mani",
      urdu: "ہاتھ (جمع)",
      emoji: "✋✋",
      pronunciation: "[le mah-nee]",
      exampleItalian: "Lavati le mani.",
      exampleUrdu: "اپنے ہاتھ دھوؤ۔"
    },
    {
      id: "body-l4-mc-occhi",
      type: "MultipleChoice",
      question: "\"آنکھیں\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Gli occhi", "Le orecchie", "Le mani", "I piedi"],
      correctAnswer: "Gli occhi"
    },
    {
      id: "body-l4-vocab-piedi",
      type: "VocabularyCard",
      italian: "I piedi",
      urdu: "پاؤں (جمع)",
      emoji: "🦶🦶",
      pronunciation: "[ee pye-dee]",
      exampleItalian: "Ho i piedi freddi.",
      exampleUrdu: "میرے پاؤں ٹھنڈے ہیں۔"
    },
    {
      id: "body-l4-tf-orecchie",
      type: "TrueFalse",
      statement: "Le orecchie = آنکھیں",
      isTrue: false,
      correctAnswer: "کان"
    },
    {
      id: "body-l4-vocab-dita",
      type: "VocabularyCard",
      italian: "Le dita",
      urdu: "انگلیاں",
      emoji: "🖐️",
      pronunciation: "[le dee-tah]",
      exampleItalian: "Le dita della mano.",
      exampleUrdu: "ہاتھ کی انگلیاں۔"
    },
    {
      id: "body-l4-sr-lavati-le-mani",
      type: "SentenceReconstruction",
      question: "اپنے ہاتھ دھوؤ۔",
      correctSequence: ["Lavati", "le", "mani"],
      shuffledWords: ["Lavati", "le", "mani", "i", "piedi"],
      direction: "ur-to-it"
    },
    {
      id: "body-l4-sr-orecchie-lunghe",
      type: "SentenceReconstruction",
      question: "Le orecchie lunghe",
      correctSequence: ["لمبے", "کان"],
      shuffledWords: ["لمبے", "کان", "چھوٹے", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
