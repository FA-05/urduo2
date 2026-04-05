import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "gram1-l4",
  title: "Modal Verbs",
  description: "موڈل فعل: چاہیے، سکنا، چاہنا",
  icon: "⚙️",
  exercises: [
    {
      id: "gram1-l4-vocab-volere",
      type: "VocabularyCard",
      italian: "Voglio",
      urdu: "میں چاہتا ہوں",
      emoji: "❤️",
      pronunciation: "[vo-lyo]",
      exampleItalian: "Voglio un gelato.",
      exampleUrdu: "میں ایک آئس کریم چاہتا ہوں۔"
    },
    {
      id: "gram1-l4-vocab-potere",
      type: "VocabularyCard",
      italian: "Posso",
      urdu: "میں کر سکتا ہوں",
      emoji: "💪",
      pronunciation: "[pos-so]",
      exampleItalian: "Posso venire?",
      exampleUrdu: "کیا میں آ سکتا ہوں؟"
    },
    {
      id: "gram1-l4-mc-dovere",
      type: "MultipleChoice",
      question: "\"مجھے کام کرنا چاہیے\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Devo lavorare", "Voglio lavorare", "Posso lavorare", "Lavoro"],
      correctAnswer: "Devo lavorare"
    },
    {
      id: "gram1-l4-vocab-dovere",
      type: "VocabularyCard",
      italian: "Devo",
      urdu: "مجھے ... کرنا ہے / چاہیے",
      emoji: "📅",
      pronunciation: "[de-vo]",
      exampleItalian: "Devo studiare oggi.",
      exampleUrdu: "مجھے آج مطالعہ کرنا ہے۔"
    },
    {
      id: "gram1-l4-tf-volere",
      type: "TrueFalse",
      statement: "Voglio = مجھے نہیں چاہیے",
      isTrue: false,
      correctAnswer: "میں چاہتا ہوں"
    },
    {
      id: "gram1-l4-vocab-sapere",
      type: "VocabularyCard",
      italian: "So",
      urdu: "میں جانتا ہوں (کیسے کرنا ہے)",
      emoji: "🧠",
      pronunciation: "[so]",
      exampleItalian: "So cucinare.",
      exampleUrdu: "میں جانتا ہوں کہ کیسے پکانا ہے۔"
    },
    {
      id: "gram1-l4-sr-voglio-dormire",
      type: "SentenceReconstruction",
      question: "میں سونا چاہتا ہوں۔",
      correctSequence: ["Voglio", "dormire"],
      shuffledWords: ["Voglio", "dormire", "devo", "mangiare"],
      direction: "ur-to-it"
    },
    {
      id: "gram1-l4-sr-posso-aiutare",
      type: "SentenceReconstruction",
      question: "Posso aiutarti?",
      correctSequence: ["کیا", "میں", "تمہاری", "مدد", "کر", "سکتا", "ہوں", "?"],
      shuffledWords: ["کیا", "میں", "تمہاری", "مدد", "کر", "سکتا", "ہوں", "?", "کیوں", "وہ"],
      direction: "it-to-ur"
    }
  ]
};
