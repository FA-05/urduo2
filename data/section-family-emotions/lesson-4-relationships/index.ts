import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "family-l4",
  title: "Relationships & Life Events",
  description: "تعلقات اور زندگی کے اہم لمحات",
  icon: "💍",
  exercises: [
    {
      id: "family-l4-vocab-matrimonio",
      type: "VocabularyCard",
      italian: "Matrimonio",
      urdu: "شادی",
      emoji: "💍",
      pronunciation: "[ma-tree-mo-nyo]",
      exampleItalian: "Oggi c'è un matrimonio.",
      exampleUrdu: "آج ایک شادی ہے۔"
    },
    {
      id: "family-l4-vocab-nascita",
      type: "VocabularyCard",
      italian: "Nascita",
      urdu: "پیدائش",
      emoji: "👶",
      pronunciation: "[na-shee-tah]",
      exampleItalian: "Festeggiamo la nascita.",
      exampleUrdu: "ہم پیدائش کا جشن مناتے ہیں۔"
    },
    {
      id: "family-l4-mc-amico",
      type: "MultipleChoice",
      question: "\"دوست\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Amico", "Nemico", "Fratello", "Cugino"],
      correctAnswer: "Amico"
    },
    {
      id: "family-l4-vocab-innamorato",
      type: "VocabularyCard",
      italian: "Innamorato",
      urdu: "محبت میں / عاشق",
      emoji: "😍",
      pronunciation: "[in-na-mo-rah-toh]",
      exampleItalian: "Lui è innamorato di Maria.",
      exampleUrdu: "وہ ماریا کی محبت میں گرفتار ہے۔"
    },
    {
      id: "family-l4-tf-matrimonio",
      type: "TrueFalse",
      statement: "Matrimonio = لڑائی",
      isTrue: false,
      correctAnswer: "شادی"
    },
    {
      id: "family-l4-vocab-fidanzato",
      type: "VocabularyCard",
      italian: "Fidanzato",
      urdu: "منگیتر / بوائے فرینڈ",
      emoji: "👩‍❤️‍👨",
      pronunciation: "[fee-dan-tsah-toh]",
      exampleItalian: "Lui è il mio fidanzato.",
      exampleUrdu: "وہ میرا منگیتر ہے۔"
    },
    {
      id: "family-l4-sr-mio-amico",
      type: "SentenceReconstruction",
      question: "وہ میرا دوست ہے۔",
      correctSequence: ["Lui", "è", "il", "mio", "amico"],
      shuffledWords: ["Lui", "è", "il", "mio", "amico", "la", "mia"],
      direction: "ur-to-it"
    },
    {
      id: "family-l4-sr-festeggiamo-nascita",
      type: "SentenceReconstruction",
      question: "Festeggiamo la nascita",
      correctSequence: ["ہم", "پیدائش", "کا", "جشن", "مناتے", "ہیں"],
      shuffledWords: ["ہم", "پیدائش", "کا", "جشن", "مناتے", "ہیں", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
