import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec5-l3",
  title: "Study & Exams",
  description: "مطالعہ اور امتحانات",
  icon: "📝",
  exercises: [
    {
      id: "sec5-l3-vocab-esame",
      type: "VocabularyCard",
      italian: "Esame",
      urdu: "امتحان",
      emoji: "📝",
      pronunciation: "[eh-zah-meh]",
      exampleItalian: "Ho un esame difficile.",
      exampleUrdu: "میرا ایک مشکل امتحان ہے۔"
    },
    {
      id: "sec5-l3-vocab-studiare",
      type: "VocabularyCard",
      italian: "Studiare",
      urdu: "مطالعہ کرنا/پڑھنا",
      emoji: "📖",
      pronunciation: "[stoo-dya-reh]",
      exampleItalian: "Devo studiare per l'esame.",
      exampleUrdu: "مجھے امتحان کے لیے پڑھنا ہے۔"
    },
    {
      id: "sec5-l3-vocab-imparare",
      type: "VocabularyCard",
      italian: "Imparare",
      urdu: "سیکھنا",
      emoji: "💡",
      pronunciation: "[eem-pah-ra-reh]",
      exampleItalian: "Voglio imparare l'italiano.",
      exampleUrdu: "میں اطالوی زبان سیکھنا چاہتا ہوں۔"
    },
    {
      id: "sec5-l3-mc-esame",
      type: "MultipleChoice",
      question: "\"Esame\"",
      options: ["امتحان", "کلاس", "کتاب", "استاد"],
      correctAnswer: "امتحان"
    },
    {
      id: "sec5-l3-tf-studiare",
      type: "TrueFalse",
      statement: "Studiare = کھیلنا",
      isTrue: false,
      correctAnswer: "مطالعہ کرنا"
    },
    {
      id: "sec5-l3-sr-esame-oggi",
      type: "SentenceReconstruction",
      question: "Ho un esame oggi",
      correctSequence: ["میرا", "آج", "امتحان", "ہے"],
      shuffledWords: ["میرا", "آج", "امتحان", "ہے", "کل", "تھا"],
      direction: "it-to-ur"
    },
    {
      id: "sec5-l3-sr-studio-italiano",
      type: "SentenceReconstruction",
      question: "Studio l'italiano",
      correctSequence: ["میں", "اطالوی", "زبان", "کا", "مطالعہ", "کرتا", "ہوں"],
      shuffledWords: ["میں", "اطالوی", "زبان", "کا", "مطالعہ", "کرتا", "ہوں", "انگریزی"],
      direction: "it-to-ur"
    },
    {
      id: "sec5-l3-sr-imparo-parole",
      type: "SentenceReconstruction",
      question: "میں نئے الفاظ سیکھتا ہوں",
      correctSequence: ["Imparo", "nuove", "parole"],
      shuffledWords: ["Imparo", "nuove", "parole", "vecchie", "leggo"],
      direction: "ur-to-it"
    }
  ]
};
