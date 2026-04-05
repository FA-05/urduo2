import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "idioms-l4",
  title: "Slang & Informal Italian",
  description: "عام بول چال اور غیر رسمی اطالوی",
  icon: "😎",
  exercises: [
    {
      id: "idioms-l4-vocab-boh",
      type: "VocabularyCard",
      italian: "Boh!",
      urdu: "مجھے نہیں معلوم! (غیر رسمی)",
      emoji: "🤷‍♂️",
      pronunciation: "[bo]",
      exampleItalian: "Sai dove sono? - Boh!",
      exampleUrdu: "کیا تمہیں معلوم ہے وہ کہاں ہیں؟ - مجھے نہیں معلوم!"
    },
    {
      id: "idioms-l4-vocab-figo",
      type: "VocabularyCard",
      italian: "Che figo!",
      urdu: "کتنا کول ہے! / کتنا اچھا ہے!",
      emoji: "🔥",
      pronunciation: "[kay fee-go]",
      exampleItalian: "Guarda la mia auto. - Che figo!",
      exampleUrdu: "میری گاڑی دیکھو۔ - کتنا کول ہے!"
    },
    {
      id: "idioms-l4-mc-beccarsi",
      type: "MultipleChoice",
      question: "\"ملتے ہیں\" ( informal 'see you') کے لیے کون سا لفظ استعمال ہوتا ہے؟",
      options: ["Beccarci", "Vedere", "Mangiare", "Dormire"],
      correctAnswer: "Beccarci"
    },
    {
      id: "idioms-l4-vocab-beccarsi",
      type: "VocabularyCard",
      italian: "Ci becchiamo!",
      urdu: "پھر ملتے ہیں! (غیر رسمی)",
      emoji: "👋",
      pronunciation: "[chee bek-kyah-mo]",
      exampleItalian: "Vado via. Ci becchiamo!",
      exampleUrdu: "میں جا رہا ہوں۔ پھر ملتے ہیں!"
    },
    {
      id: "idioms-l4-tf-cavolo",
      type: "TrueFalse",
      statement: "Cavolo = صرف ایک سبزی",
      isTrue: false,
      correctAnswer: "اوہ نا! / یار! (حیرت یا غصے کا اظہار)"
    },
    {
      id: "idioms-l4-vocab-macche",
      type: "VocabularyCard",
      italian: "Ma chè!",
      urdu: "کچھ بھی! / ایسا نہیں ہے!",
      emoji: "🙄",
      pronunciation: "[ma-keh]",
      exampleItalian: "Sei stanco? - Ma chè!",
      exampleUrdu: "تھکے ہو؟ - نہیں، بالکل بھی نہیں!"
    },
    {
      id: "idioms-l4-sr-che-figo",
      type: "SentenceReconstruction",
      question: "کتنا کول ہے!",
      correctSequence: ["Che", "figo", "!"],
      shuffledWords: ["Che", "figo", "!", "il", "naso"],
      direction: "ur-to-it"
    },
    {
      id: "idioms-l4-sr-ci-becchiamo",
      type: "SentenceReconstruction",
      question: "Ci becchiamo più tardi",
      correctSequence: ["ہم", "بعد", "میں", "ملتے", "ہیں"],
      shuffledWords: ["ہم", "بعد", "میں", "ملتے", "ہیں", "نہیں", "کیوں"],
      direction: "it-to-ur"
    }
  ]
};
