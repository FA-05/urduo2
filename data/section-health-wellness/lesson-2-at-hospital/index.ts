import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "health-l2",
  title: "At the Hospital",
  description: "ہسپتال میں",
  icon: "🏥",
  exercises: [
    {
      id: "health-l2-vocab-pronto-soccorso",
      type: "VocabularyCard",
      italian: "Pronto Soccorso",
      urdu: "ایمرجنسی وارڈ / فوری طبی امداد",
      emoji: "🚨",
      pronunciation: "[pron-toh sok-kor-so]",
      exampleItalian: "Andiamo al pronto soccorso.",
      exampleUrdu: "ہم ایمرجنسی وارڈ جا رہے ہیں۔"
    },
    {
      id: "health-l2-vocab-infermiere",
      type: "VocabularyCard",
      italian: "L'infermiere",
      urdu: "نرس (مذکر / مونث)",
      emoji: "🧑‍⚕️",
      pronunciation: "[in-fer-mye-re]",
      exampleItalian: "L'infermiere mi aiuta.",
      exampleUrdu: "نرس میری مدد کرتی ہے۔"
    },
    {
      id: "health-l2-mc-ricetta",
      type: "MultipleChoice",
      question: "\"طبی نسخہ\" (prescription) کو Italian میں کیا کہتے ہیں؟",
      options: ["Ricetta", "Letto", "Dottore", "Medicina"],
      correctAnswer: "Ricetta"
    },
    {
      id: "health-l2-vocab-visita",
      type: "VocabularyCard",
      italian: "Visita medica",
      urdu: "طبی معائنہ / چیک اپ",
      emoji: "🩺",
      pronunciation: "[vee-zee-tah me-dee-ka]",
      exampleItalian: "Ho una visita oggi.",
      exampleUrdu: "آج میرا معائنہ ہے۔"
    },
    {
      id: "health-l2-tf-medico",
      type: "TrueFalse",
      statement: "Medico = مریض",
      isTrue: false,
      correctAnswer: "ڈاکٹر"
    },
    {
      id: "health-l2-vocab-paziente",
      type: "VocabularyCard",
      italian: "Paziente",
      urdu: "مریض",
      emoji: "🛌",
      pronunciation: "[pa-tsyèn-te]",
      exampleItalian: "Il paziente riposa.",
      exampleUrdu: "مریض آرام کر رہا ہے۔"
    },
    {
      id: "health-l2-sr-andiamo-ospedale",
      type: "SentenceReconstruction",
      question: "ہم ہسپتال جا رہے ہیں۔",
      correctSequence: ["Andiamo", "all'", "ospedale"],
      shuffledWords: ["Andiamo", "all'", "ospedale", "il", "cuore"],
      direction: "ur-to-it"
    },
    {
      id: "health-l2-sr-ho-ricetta",
      type: "SentenceReconstruction",
      question: "Ho la ricetta medica",
      correctSequence: ["میرے", "پاس", "طبی", "نسخہ", "ہے"],
      shuffledWords: ["میرے", "پاس", "طبی", "نسخہ", "ہے", "پیسے", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
