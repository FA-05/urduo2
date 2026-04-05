import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec6-l2",
  title: "Specialized Jobs",
  description: "خصوصی ملازمتیں",
  icon: "👨‍💻",
  exercises: [
    {
      id: "sec6-l2-vocab-autista",
      type: "VocabularyCard",
      italian: "Autista",
      urdu: "ڈرائیور",
      emoji: "🚌",
      pronunciation: "[ow-tees-tah]",
      exampleItalian: "L'autista guida l'autobus.",
      exampleUrdu: "ڈرائیور بس چلاتا ہے۔"
    },
    {
      id: "sec6-l2-vocab-ingegnere",
      type: "VocabularyCard",
      italian: "Ingegnere",
      urdu: "انجینئر",
      emoji: "👷",
      pronunciation: "[een-je-nye-reh]",
      exampleItalian: "Mio fratello è ingegnere.",
      exampleUrdu: "میرا بھائی انجینئر ہے۔"
    },
    {
      id: "sec6-l2-vocab-avvocato",
      type: "VocabularyCard",
      italian: "Avvocato",
      urdu: "وکیل",
      emoji: "⚖️",
      pronunciation: "[av-vo-ka-toh]",
      exampleItalian: "L'avvocato lavora in tribunale.",
      exampleUrdu: "وکیل عدالت میں کام کرتا ہے۔"
    },
    {
      id: "sec6-l2-vocab-impiegato",
      type: "VocabularyCard",
      italian: "Impiegato",
      urdu: "ملازم/آفس ورکر",
      emoji: "👔",
      pronunciation: "[eem-pyeh-gah-toh]",
      exampleItalian: "L'impiegato lavora in ufficio.",
      exampleUrdu: "ملازم دفتر میں کام کرتا ہے۔"
    },
    {
      id: "sec6-l2-vocab-architetto",
      type: "VocabularyCard",
      italian: "Architetto",
      urdu: "ماہر تعمیرات/آرکیٹیکٹ",
      emoji: "🏗️",
      pronunciation: "[ar-kee-tet-toh]",
      exampleItalian: "L'architetto disegna la casa.",
      exampleUrdu: "آرکیٹیکٹ گھر کا نقشہ بناتا ہے۔"
    },
    {
      id: "sec6-l2-vocab-veterinario",
      type: "VocabularyCard",
      italian: "Veterinario",
      urdu: "جانوروں کا ڈاکٹر",
      emoji: "🐾",
      pronunciation: "[ve-te-ree-nah-ryoh]",
      exampleItalian: "Il veterinario cura il cane.",
      exampleUrdu: "جانوروں کا ڈاکٹر کتے کا علاج کرتا ہے۔"
    },
    {
      id: "sec6-l2-vocab-poliziotto",
      type: "VocabularyCard",
      italian: "Poliziotto",
      urdu: "پولیس والا",
      emoji: "👮",
      pronunciation: "[po-lee-tsyot-toh]",
      exampleItalian: "Il poliziotto aiuta le persone.",
      exampleUrdu: "پولیس والا لوگوں کی مدد کرتا ہے۔"
    },
    {
      id: "sec6-l2-mc-architetto",
      type: "MultipleChoice",
      question: "\"آرکیٹیکٹ\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Architetto", "Ingegnere", "Medico", "Cuoco"],
      correctAnswer: "Architetto"
    },
    {
      id: "sec6-l2-sr-lui-un-medico",
      type: "SentenceReconstruction",
      question: "Lui è un medico",
      correctSequence: ["وہ", "ایک", "ڈاکٹر", "ہے"],
      shuffledWords: ["وہ", "ایک", "ڈاکٹر", "ہے", "پولیس", "والا"],
      direction: "it-to-ur"
    },
    {
      id: "sec6-l2-sr-sei-ingegnere",
      type: "SentenceReconstruction",
      question: "کیا تم انجینئر ہو؟",
      correctSequence: ["Sei", "un", "ingegnere", "?"],
      shuffledWords: ["Sei", "un", "ingegnere", "?", "medico", "cuoco"],
      direction: "ur-to-it"
    }
  ]
};
