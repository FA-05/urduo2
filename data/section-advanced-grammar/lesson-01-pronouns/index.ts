import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec12-l1",
  title: "Object Pronouns",
  description: "مفعولی ضمیریں",
  icon: "👥",
  exercises: [
    {
      id: "sec12-l1-vocab-mi-ti",
      type: "VocabularyCard",
      italian: "Mi / Ti",
      urdu: "مجھے / تمہیں",
      emoji: "👈",
      pronunciation: "[mee / tee]",
      exampleItalian: "Mi piaci. / Ti vedo.",
      exampleUrdu: "تم مجھے پسند ہو۔ / میں تمہیں دیکھتا ہوں۔"
    },
    {
      id: "sec12-l1-vocab-lo-la",
      type: "VocabularyCard",
      italian: "Lo / La",
      urdu: "اسے (مذکر / مؤنث)",
      emoji: "👈",
      pronunciation: "[lo / la]",
      exampleItalian: "Lo compro. / La vedo.",
      exampleUrdu: "میں اسے خریدتا ہوں۔ / میں اسے دیکھتی ہوں۔"
    },
    {
      id: "sec12-l1-vocab-li-le",
      type: "VocabularyCard",
      italian: "Li / Le",
      urdu: "انہیں (مذکر جمع / مؤنث جمع)",
      emoji: "👈👈",
      pronunciation: "[lee / leh]",
      exampleItalian: "Li mangio. / Le leggo.",
      exampleUrdu: "میں انہیں کھاتا ہوں۔ / میں انہیں پڑھتا ہوں۔"
    },
    {
      id: "sec12-l1-mc-lo",
      type: "MultipleChoice",
      question: "اگر آپ ایک کتاب (libro) خرید رہے ہیں، تو کیا کہیں گے؟",
      options: ["Lo compro", "La compro", "Li compro", "Le compro"],
      correctAnswer: "Lo compro"
    },
    {
      id: "sec12-l1-tf-li",
      type: "TrueFalse",
      statement: "Li vedo = میں اسے دیکھتا ہوں",
      isTrue: false,
      correctAnswer: "میں انہیں (جمع) دیکھتا ہوں"
    },
    {
      id: "sec12-l1-sr-ti-amo",
      type: "SentenceReconstruction",
      question: "Ti amo",
      correctSequence: ["میں", "تم", "سے", "محبت", "کرتا", "ہوں"],
      shuffledWords: ["میں", "تم", "سے", "محبت", "کرتا", "ہوں", "وہ", "نفرت"],
      direction: "it-to-ur"
    },
    {
      id: "sec12-l1-sr-lo-conosco",
      type: "SentenceReconstruction",
      question: "Lo conosco",
      correctSequence: ["میں", "اسے", "جانتا", "ہوں"],
      shuffledWords: ["میں", "اسے", "جانتا", "ہوں", "ہمارا", "تمہیں"],
      direction: "it-to-ur"
    },
    {
      id: "sec12-l1-sr-mi-piaci",
      type: "SentenceReconstruction",
      question: "تم مجھے پسند ہو",
      correctSequence: ["Mi", "piaci"],
      shuffledWords: ["Mi", "piaci", "Ti", "piace", "Lo", "conosco"],
      direction: "ur-to-it"
    }
  ]
};
