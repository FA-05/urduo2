import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "idioms-l3",
  title: "Social Etiquette & Responses",
  description: "سماجی آداب اور موزوں جوابات",
  icon: "🤝",
  exercises: [
    {
      id: "idioms-l3-vocab-figurati",
      type: "VocabularyCard",
      italian: "Figurati",
      urdu: "کوئی بات نہیں / ذکر نہ کریں",
      emoji: "🚫🧔",
      pronunciation: "[fee-goo-ra-tee]",
      exampleItalian: "Grazie! - Figurati!",
      exampleUrdu: "شکریہ! - کوئی بات نہیں!"
    },
    {
      id: "idioms-l3-vocab-ci-mancherebbe",
      type: "VocabularyCard",
      italian: "Ci mancherebbe",
      urdu: "بالکل / کیوں نہیں (اعلیٰ درجہ کا احترام)",
      emoji: "🙏✨",
      pronunciation: "[chee man-ke-reb-be]",
      exampleItalian: "Posso entrare? - Ci mancherebbe!",
      exampleUrdu: "کیا میں آ سکتا ہوں؟ - بالکل، کیوں نہیں!"
    },
    {
      id: "idioms-l3-mc-piacere",
      type: "MultipleChoice",
      question: "\"میری خوشی\" (My pleasure) کو Italian میں کیا کہتے ہیں؟",
      options: ["Piacere mio", "Di niente", "Prego", "Scusa"],
      correctAnswer: "Piacere mio"
    },
    {
      id: "idioms-l3-vocab-piacere-mio",
      type: "VocabularyCard",
      italian: "Piacere mio",
      urdu: "میری خوشی / مجھے خوشی ہوئی",
      emoji: "😊🤝",
      pronunciation: "[pya-che-re mee-oh]",
      exampleItalian: "Piacere di conoscerti. - Piacere mio!",
      exampleUrdu: "آپ سے مل کر خوشی ہوئی۔ - مجھے بھی!"
    },
    {
      id: "idioms-l3-tf-prego",
      type: "TrueFalse",
      statement: "Prego = معاف کیجیے گا",
      isTrue: false,
      correctAnswer: "خوش آمدید / یو آر ویلکم"
    },
    {
      id: "idioms-l3-vocab-dovere",
      type: "VocabularyCard",
      italian: "È stato un dovere",
      urdu: "یہ میرا فرض تھا",
      emoji: "🫡",
      pronunciation: "[e sta-toh oon do-ve-re]",
      exampleItalian: "Grazie dell'aiuto. - È stato un dovere.",
      exampleUrdu: "مدد کا شکریہ۔ - یہ میرا فرض تھا۔"
    },
    {
      id: "idioms-l3-sr-figurati-niente",
      type: "SentenceReconstruction",
      question: "کوئی بات نہیں، یہ کچھ بھی نہیں تھا۔",
      correctSequence: ["Figurati", "non", "è", "niente"],
      shuffledWords: ["Figurati", "non", "è", "niente", "lo", "so"],
      direction: "ur-to-it"
    },
    {
      id: "idioms-l3-sr-piacere-mio",
      type: "SentenceReconstruction",
      question: "Piacere mio",
      correctSequence: ["مجھے", "بھی", "خوشی", "ہوئی"],
      shuffledWords: ["مجھے", "بھی", "خوشی", "ہوئی", "شکریہ", "کیوں"],
      direction: "it-to-ur"
    }
  ]
};
