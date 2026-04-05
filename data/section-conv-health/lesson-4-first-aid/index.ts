import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "conv3-l4",
  title: "First Aid Talk",
  description: "ابتدائی طبی امداد کی بات",
  icon: "🩹",
  exercises: [
    {
      id: "conv3-l4-vocab-soccorso",
      type: "VocabularyCard",
      italian: "Pronto Soccorso",
      urdu: "ایمرجنسی وارڈ / ابتدائی طبی امداد",
      emoji: "🏥",
      pronunciation: "[pron-toh sok-kor-so]",
      exampleItalian: "Andiamo al pronto soccorso.",
      exampleUrdu: "ہم ایمرجنسی وارڈ جا رہے ہیں۔"
    },
    {
      id: "conv3-l4-vocab-ferita",
      type: "VocabularyCard",
      italian: "Ferita",
      urdu: "زخم",
      emoji: "🩹",
      pronunciation: "[fe-ree-tah]",
      exampleItalian: "Ho una piccola ferita.",
      exampleUrdu: "مجھے ایک چھوٹا سا زخم ہے۔"
    },
    {
      id: "conv3-l4-mc-ghiaccio",
      type: "MultipleChoice",
      question: "\"برف\" (درد کے لیے) کو Italian میں کیا کہتے ہیں؟",
      options: ["Ghiaccio", "Acqua", "Fuoco", "Aria"],
      correctAnswer: "Ghiaccio"
    },
    {
      id: "conv3-l4-vocab-cerotto",
      type: "VocabularyCard",
      italian: "Cerotto",
      urdu: "پٹی / بینڈ ایڈ",
      emoji: "🩹",
      pronunciation: "[che-rot-toh]",
      exampleItalian: "Metti un cerotto.",
      exampleUrdu: "ایک پٹی لگاؤ۔"
    },
    {
      id: "conv3-l4-tf-ghiaccio",
      type: "TrueFalse",
      statement: "Ghiaccio = گرم",
      isTrue: false,
      correctAnswer: "برف"
    },
    {
      id: "conv3-l4-vocab-aiutami",
      type: "VocabularyCard",
      italian: "Aiutami!",
      urdu: "میری مدد کرو!",
      emoji: "🆘",
      pronunciation: "[a-yoo-ta-mee]",
      exampleItalian: "Aiutami, per favore!",
      exampleUrdu: "میری مدد کریں، براہ مہربانی!"
    },
    {
      id: "conv3-l4-sr-pronto-soccorso",
      type: "SentenceReconstruction",
      question: "ہم ایمرجنسی وارڈ جا رہے ہیں۔",
      correctSequence: ["Andiamo", "al", "pronto", "soccorso"],
      shuffledWords: ["Andiamo", "al", "pronto", "soccorso", "il", "libro"],
      direction: "ur-to-it"
    },
    {
      id: "conv3-l4-sr-metti-cerotto",
      type: "SentenceReconstruction",
      question: "Metti un cerotto",
      correctSequence: ["ایک", "پٹی", "لگاؤ"],
      shuffledWords: ["ایک", "پٹی", "لگاؤ", "کھاؤ", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
