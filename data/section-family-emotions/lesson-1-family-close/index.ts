import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "family-l1",
  title: "Immediate Family",
  description: "قریبی خاندان",
  icon: "👪",
  exercises: [
    {
      id: "family-l1-vocab-padre",
      type: "VocabularyCard",
      italian: "Padre",
      urdu: "والد / باپ",
      emoji: "👨",
      pronunciation: "[pa-dre]",
      exampleItalian: "Mio padre è alto.",
      exampleUrdu: "میرے والد لمبے ہیں۔"
    },
    {
      id: "family-l1-vocab-madre",
      type: "VocabularyCard",
      italian: "Madre",
      urdu: "والدہ / ماں",
      emoji: "👩",
      pronunciation: "[ma-dre]",
      exampleItalian: "Mia madre cucina bene.",
      exampleUrdu: "میری والدہ اچھا کھانا پکاتی ہیں۔"
    },
    {
      id: "family-l1-mc-fratello",
      type: "MultipleChoice",
      question: "\"بھائی\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Fratello", "Sorella", "Padre", "Zio"],
      correctAnswer: "Fratello"
    },
    {
      id: "family-l1-vocab-fratello",
      type: "VocabularyCard",
      italian: "Fratello",
      urdu: "بھائی",
      emoji: "👦",
      pronunciation: "[fra-tel-lo]",
      exampleItalian: "Ho un fratello minore.",
      exampleUrdu: "میرا ایک چھوٹا بھائی ہے۔"
    },
    {
      id: "family-l1-tf-sorella",
      type: "TrueFalse",
      statement: "Sorella = بھائی",
      isTrue: false,
      correctAnswer: "بہن"
    },
    {
      id: "family-l1-vocab-figlio",
      type: "VocabularyCard",
      italian: "Figlio",
      urdu: "بیٹا",
      emoji: "👶",
      pronunciation: "[fee-lyo]",
      exampleItalian: "Lui è mio figlio.",
      exampleUrdu: "وہ میرا بیٹا ہے۔"
    },
    {
      id: "family-l1-sr-mio-padre-alto",
      type: "SentenceReconstruction",
      question: "میرے والد لمبے ہیں۔",
      correctSequence: ["Mio", "padre", "è", "alto"],
      shuffledWords: ["Mio", "padre", "è", "alto", "bello", "la"],
      direction: "ur-to-it"
    },
    {
      id: "family-l1-sr-mia-madre-cucina",
      type: "SentenceReconstruction",
      question: "Mia madre cucina bene",
      correctSequence: ["میری", "والدہ", "اچھا", "کھانا", "پکاتی", "ہیں"],
      shuffledWords: ["میری", "والدہ", "اچھا", "کھانا", "پکاتی", "ہیں", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
