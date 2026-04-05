import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec14-l2",
  title: "Socializing & Friends",
  description: "سماجی میل جول اور دوست",
  icon: "🎉",
  exercises: [
    {
      id: "sec14-l2-vocab-festa",
      type: "VocabularyCard",
      italian: "la festa",
      urdu: "پارٹی / جشن",
      emoji: "🎉",
      pronunciation: "[lah fes-tah]",
      exampleItalian: "Andiamo alla festa stasera.",
      exampleUrdu: "ہم آج رات پارٹی میں جا رہے ہیں۔"
    },
    {
      id: "sec14-l2-vocab-invitare",
      type: "VocabularyCard",
      italian: "invitare",
      urdu: "دعوت دینا",
      emoji: "✉️",
      pronunciation: "[een-vee-tah-reh]",
      exampleItalian: "Voglio invitare i miei amici.",
      exampleUrdu: "میں اپنے دوستوں کو دعوت دینا چاہتا ہوں۔"
    },
    {
      id: "sec14-l2-vocab-incontro",
      type: "VocabularyCard",
      italian: "l'incontro",
      urdu: "ملاقات",
      emoji: "🤝",
      pronunciation: "[leen-kon-troh]",
      exampleItalian: "L'incontro è alle sei.",
      exampleUrdu: "ملاقات چھ بجے ہے۔"
    },
    {
      id: "sec14-l2-vocab-brindisi",
      type: "VocabularyCard",
      italian: "il brindisi",
      urdu: "جام ٹکرانا / ٹوسٹ",
      emoji: "🥂",
      pronunciation: "[eel breen-dee-zee]",
      exampleItalian: "Facciamo un brindisi!",
      exampleUrdu: "آؤ جام ٹکرائیں!"
    },
    {
      id: "sec14-l2-vocab-regalo",
      type: "VocabularyCard",
      italian: "il regalo",
      urdu: "تحفہ",
      emoji: "🎁",
      pronunciation: "[eel reh-gah-loh]",
      exampleItalian: "Ho comprato un regalo per te.",
      exampleUrdu: "میں نے تمہارے لیے ایک تحفہ خریدا ہے۔"
    },
    {
      id: "sec14-l2-vocab-divertimento",
      type: "VocabularyCard",
      italian: "il divertimento",
      urdu: "تفریح / مزہ",
      emoji: "🎢",
      pronunciation: "[eel dee-ver-tee-men-toh]",
      exampleItalian: "Il divertimento è assicurato.",
      exampleUrdu: "تفریح کی ضمانت ہے۔"
    },
    {
      id: "sec14-l2-vocab-chiacchierare",
      type: "VocabularyCard",
      italian: "chiacchierare",
      urdu: "گپ شپ کرنا",
      emoji: "💬",
      pronunciation: "[kyak-kyeh-rah-reh]",
      exampleItalian: "Ci piace chiacchierare.",
      exampleUrdu: "ہمیں گپ شپ کرنا پسند ہے۔"
    },
    {
      id: "sec14-l2-mc-festa",
      type: "MultipleChoice",
      question: "\"پارٹی\" کو Italian میں کیا کہتے ہیں؟",
      options: ["la festa", "il lavoro", "la scuola", "la casa"],
      correctAnswer: "la festa"
    },
    {
      id: "sec14-l2-tf-regalo",
      type: "TrueFalse",
      statement: "Regalo = کام",
      isTrue: false,
      correctAnswer: "تحفہ"
    },
    {
      id: "sec14-l2-sr-invito-amici",
      type: "SentenceReconstruction",
      question: "Invito i miei amici",
      correctSequence: ["میں", "اپنے", "دوستوں", "کو", "دعوت", "دیتا", "ہوں"],
      shuffledWords: ["میں", "اپنے", "دوستوں", "کو", "دعوت", "دیتا", "ہوں", "پانی", "پیتا"],
      direction: "it-to-ur"
    }
  ]
};
