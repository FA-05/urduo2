import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "conv2-l3",
  title: "Talking About Work",
  description: "کام کے بارے میں بات",
  icon: "💼",
  exercises: [
    {
      id: "conv2-l3-vocab-che-lavoro-fai",
      type: "VocabularyCard",
      italian: "Che lavoro fai?",
      urdu: "تم کیا کام کرتے ہو؟",
      emoji: "👔",
      pronunciation: "[ke la-vo-ro fa-ee]",
      exampleItalian: "Piacere, che lavoro fai?",
      exampleUrdu: "خوشی ہوئی، تم کیا کام کرتے ہو؟"
    },
    {
      id: "conv2-l3-vocab-azienda",
      type: "VocabularyCard",
      italian: "Azienda",
      urdu: "کمپنی / ادارہ",
      emoji: "🏢",
      pronunciation: "[a-tsyen-dah]",
      exampleItalian: "Lavoro in un'azienda.",
      exampleUrdu: "میں ایک کمپنی میں کام کرتا ہوں۔"
    },
    {
      id: "conv2-l3-mc-collega",
      type: "MultipleChoice",
      question: "\"کام کا ساتھی\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Collega", "Amico", "Studente", "Dottore"],
      correctAnswer: "Collega"
    },
    {
      id: "conv2-l3-vocab-stipendio",
      type: "VocabularyCard",
      italian: "Stipendio",
      urdu: "تنخواہ",
      emoji: "💸",
      pronunciation: "[stee-pen-dyo]",
      exampleItalian: "Ho ricevuto lo stipendio.",
      exampleUrdu: "مجھے تنخواہ مل گئی ہے۔"
    },
    {
      id: "conv2-l3-tf-stipendio",
      type: "TrueFalse",
      statement: "Stipendio = تحفہ",
      isTrue: false,
      correctAnswer: "تنخواہ"
    },
    {
      id: "conv2-l3-vocab-ufficio",
      type: "VocabularyCard",
      italian: "Ufficio",
      urdu: "دفتر",
      emoji: "🖥️",
      pronunciation: "[uf-fee-cho]",
      exampleItalian: "Vado in ufficio.",
      exampleUrdu: "میں دفتر جا رہا ہوں۔"
    },
    {
      id: "conv2-l3-sr-che-lavoro-fai",
      type: "SentenceReconstruction",
      question: "تم کیا کام کرتے ہو؟",
      correctSequence: ["Che", "lavoro", "fai", "?"],
      shuffledWords: ["Che", "lavoro", "fai", "?", "va", "bene"],
      direction: "ur-to-it"
    },
    {
      id: "conv2-l3-sr-lavoro-in-ufficio",
      type: "SentenceReconstruction",
      question: "Lavoro in ufficio",
      correctSequence: ["میں", "دفتر", "میں", "کام", "کرتا", "ہوں"],
      shuffledWords: ["میں", "دفتر", "میں", "کام", "کرتا", "ہوں", "نہیں", "گھر"],
      direction: "it-to-ur"
    }
  ]
};
