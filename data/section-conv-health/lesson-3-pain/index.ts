import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "conv3-l3",
  title: "Explaining Pain",
  description: "درد کی وضاحت",
  icon: "🤕",
  exercises: [
    {
      id: "conv3-l3-vocab-mi-fa-male",
      type: "VocabularyCard",
      italian: "Mi fa male...",
      urdu: "مجھے ... میں درد ہے",
      emoji: "😢",
      pronunciation: "[mee fah mah-le]",
      exampleItalian: "Mi fa male la testa.",
      exampleUrdu: "میرے سر میں درد ہے۔"
    },
    {
      id: "conv3-l3-vocab-testa",
      type: "VocabularyCard",
      italian: "Testa",
      urdu: "سر",
      emoji: "👤",
      pronunciation: "[tes-tah]",
      exampleItalian: "Ho un dolore alla testa.",
      exampleUrdu: "میرے سر میں تکلیف ہے۔"
    },
    {
      id: "conv3-l3-mc-stomaco",
      type: "MultipleChoice",
      question: "\"معدہ / پیٹ\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Stomaco", "Gamba", "Braccio", "Piede"],
      correctAnswer: "Stomaco"
    },
    {
      id: "conv3-l3-vocab-stomaco",
      type: "VocabularyCard",
      italian: "Stomaco",
      urdu: "معدہ / پیٹ",
      emoji: "🍗",
      pronunciation: "[sto-mah-ko]",
      exampleItalian: "Mi fa male lo stomaco.",
      exampleUrdu: "میرے پیٹ میں درد ہے۔"
    },
    {
      id: "conv3-l3-tf-male",
      type: "TrueFalse",
      statement: "Male = اچھا",
      isTrue: false,
      correctAnswer: "برا / درد"
    },
    {
      id: "conv3-l3-vocab-dottore",
      type: "VocabularyCard",
      italian: "Dottore",
      urdu: "ڈاکٹر",
      emoji: "👨‍⚕️",
      pronunciation: "[dot-toh-re]",
      exampleItalian: "Vado dal dottore.",
      exampleUrdu: "میں ڈاکٹر کے پاس جا رہا ہوں۔"
    },
    {
      id: "conv3-l3-sr-mi-fa-male-testa",
      type: "SentenceReconstruction",
      question: "میرے سر میں درد ہے۔",
      correctSequence: ["Mi", "fa", "male", "la", "testa"],
      shuffledWords: ["Mi", "fa", "male", "la", "testa", "il", "libro"],
      direction: "ur-to-it"
    },
    {
      id: "conv3-l3-sr-ho-mal-di-stomaco",
      type: "SentenceReconstruction",
      question: "Ho mal di stomaco",
      correctSequence: ["میرے", "پیٹ", "میں", "درد", "ہے"],
      shuffledWords: ["میرے", "پیٹ", "میں", "درد", "ہے", "سر", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
