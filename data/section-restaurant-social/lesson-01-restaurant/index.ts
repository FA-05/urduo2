import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec14-l1",
  title: "Eating Out",
  description: "باہر کھانا کھانا",
  icon: "🍽️",
  exercises: [
    {
      id: "sec14-l1-vocab-menu",
      type: "VocabularyCard",
      italian: "il menù",
      urdu: "مینو",
      emoji: "📜",
      pronunciation: "[eel meh-noo]",
      exampleItalian: "Posso avere il menù, per favore?",
      exampleUrdu: "کیا مجھے مینو مل سکتا ہے، براہ کرم؟"
    },
    {
      id: "sec14-l1-vocab-ordinare",
      type: "VocabularyCard",
      italian: "ordinare",
      urdu: "آرڈر کرنا",
      emoji: "📝",
      pronunciation: "[or-dee-nah-reh]",
      exampleItalian: "Siamo pronti per ordinare.",
      exampleUrdu: "ہم آرڈر دینے کے لیے تیار ہیں۔"
    },
    {
      id: "sec14-l1-vocab-cameriere",
      type: "VocabularyCard",
      italian: "il cameriere",
      urdu: "ویٹر",
      emoji: "👨‍🍳",
      pronunciation: "[eel kah-meh-ryeh-reh]",
      exampleItalian: "Il cameriere è molto gentile.",
      exampleUrdu: "ویٹر بہت مہربان ہے۔"
    },
    {
      id: "sec14-l1-vocab-conto",
      type: "VocabularyCard",
      italian: "il conto",
      urdu: "بل",
      emoji: "🧾",
      pronunciation: "[eel kon-toh]",
      exampleItalian: "Il conto, per favore.",
      exampleUrdu: "بل، براہ کرم۔"
    },
    {
      id: "sec14-l1-vocab-tavolo",
      type: "VocabularyCard",
      italian: "il tavolo",
      urdu: "میز",
      emoji: "🪑",
      pronunciation: "[eel tah-vo-loh]",
      exampleItalian: "Un tavolo per due, grazie.",
      exampleUrdu: "دو افراد کے لیے ایک میز، شکریہ۔"
    },
    {
      id: "sec14-l1-vocab-prenotazione",
      type: "VocabularyCard",
      italian: "la prenotazione",
      urdu: "بکنگ / ریزرویشن",
      emoji: "📞",
      pronunciation: "[lah pre-no-tat-tsyo-neh]",
      exampleItalian: "Ho una prenotazione a nome Rossi.",
      exampleUrdu: "میری روسی کے نام سے بکنگ ہے۔"
    },
    {
      id: "sec14-l1-vocab-bevanda",
      type: "VocabularyCard",
      italian: "la bevanda",
      urdu: "مشروب",
      emoji: "🥤",
      pronunciation: "[lah beh-van-dah]",
      exampleItalian: "Volete una bevanda?",
      exampleUrdu: "کیا آپ کو کوئی مشروب چاہیے؟"
    },
    {
      id: "sec14-l1-mc-menu",
      type: "MultipleChoice",
      question: "\"مینو\" کو Italian میں کیا کہتے ہیں؟",
      options: ["il menù", "il conto", "la carta", "il libro"],
      correctAnswer: "il menù"
    },
    {
      id: "sec14-l1-tf-cameriere",
      type: "TrueFalse",
      statement: "Cameriere = استاد",
      isTrue: false,
      correctAnswer: "ویٹر"
    },
    {
      id: "sec14-l1-sr-conto-favore",
      type: "SentenceReconstruction",
      question: "Il conto, per favore",
      correctSequence: ["بل", "براہ", "کرم"],
      shuffledWords: ["بل", "براہ", "کرم", "پانی", "لاؤ"],
      direction: "it-to-ur"
    }
  ]
};
