import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec9-l4",
  title: "Software & Apps",
  description: "سافٹ ویئر اور ایپس",
  icon: "💾",
  exercises: [
    {
      id: "sec9-l4-vocab-app",
      type: "VocabularyCard",
      italian: "App / Applicazione",
      urdu: "ایپ / ایپلی کیشن",
      emoji: "📱",
      pronunciation: "[ap / ap-plee-kat-tsyo-neh]",
      exampleItalian: "Scarico una nuova app.",
      exampleUrdu: "میں ایک نئی ایپ ڈاؤن لوڈ کرتا ہوں۔"
    },
    {
      id: "sec9-l4-vocab-scaricare",
      type: "VocabularyCard",
      italian: "Scaricare",
      urdu: "ڈاؤن لوڈ کرنا",
      emoji: "📥",
      pronunciation: "[ska-ree-ka-reh]",
      exampleItalian: "Devo scaricare questo file.",
      exampleUrdu: "مجھے یہ فائل ڈاؤن لوڈ کرنی ہے۔"
    },
    {
      id: "sec9-l4-vocab-installare",
      type: "VocabularyCard",
      italian: "Installare",
      urdu: "انسٹال کرنا",
      emoji: "⚙️",
      pronunciation: "[een-stal-lah-reh]",
      exampleItalian: "Installo l'app sul telefono.",
      exampleUrdu: "میں فون پر ایپ انسٹال کرتا ہوں۔"
    },
    {
      id: "sec9-l4-vocab-aggiornare",
      type: "VocabularyCard",
      italian: "Aggiornare",
      urdu: "اپ ڈیٹ کرنا",
      emoji: "🔄",
      pronunciation: "[ad-jor-nah-reh]",
      exampleItalian: "È importante aggiornare il software.",
      exampleUrdu: "سافٹ ویئر اپ ڈیٹ کرنا اہم ہے۔"
    },
    {
      id: "sec9-l4-vocab-account",
      type: "VocabularyCard",
      italian: "Account",
      urdu: "اکاؤنٹ",
      emoji: "👤",
      pronunciation: "[ak-ka-oont]",
      exampleItalian: "Ho creato un nuovo account.",
      exampleUrdu: "میں نے ایک نیا اکاؤنٹ بنایا ہے۔"
    },
    {
      id: "sec9-l4-vocab-username",
      type: "VocabularyCard",
      italian: "Nome utente",
      urdu: "صارف کا نام / یوزر نیم",
      emoji: "🆔",
      pronunciation: "[no-meh oo-ten-teh]",
      exampleItalian: "Qual è il tuo nome utente?",
      exampleUrdu: "آپ کا یوزر نیم کیا ہے؟"
    },
    {
      id: "sec9-l4-vocab-icona",
      type: "VocabularyCard",
      italian: "Icona",
      urdu: "آئیکن",
      emoji: "🖼️",
      pronunciation: "[ee-ko-nah]",
      exampleItalian: "Clicca sull'icona dell'app.",
      exampleUrdu: "ایپ کے آئیکن پر کلک کریں۔"
    },
    {
      id: "sec9-l4-mc-scaricare",
      type: "MultipleChoice",
      question: "\"ڈاؤن لوڈ کرنا\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Scaricare", "Caricare", "Mandare", "Ricevere"],
      correctAnswer: "Scaricare"
    },
    {
      id: "sec9-l4-tf-aggiornare",
      type: "TrueFalse",
      statement: "Aggiornare = ڈیلیٹ کرنا",
      isTrue: false,
      correctAnswer: "اپ ڈیٹ کرنا"
    },
    {
      id: "sec9-l4-sr-scarica-app",
      type: "SentenceReconstruction",
      question: "Scarica l'app",
      correctSequence: ["ایپ", "ڈاؤن لوڈ", "کریں"],
      shuffledWords: ["ایپ", "ڈاؤن لوڈ", "کریں", "ڈیلیٹ", "انسٹال"],
      direction: "it-to-ur"
    }
  ]
};
