import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec9-l1",
  title: "Tech Basics",
  description: "ٹیکنالوجی کی بنیادی باتیں",
  icon: "📱",
  exercises: [
    {
      id: "sec9-l1-vocab-telefono",
      type: "VocabularyCard",
      italian: "Telefono",
      urdu: "فون",
      emoji: "📱",
      pronunciation: "[te-le-fo-noh]",
      exampleItalian: "Dov'è il mio telefono?",
      exampleUrdu: "میرا فون کہاں ہے؟"
    },
    {
      id: "sec9-l1-mc-telefono",
      type: "MultipleChoice",
      question: "\"فون\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Telefono", "Computer", "Libro", "Penna"],
      correctAnswer: "Telefono"
    },
    {
      id: "sec9-l1-vocab-computer",
      type: "VocabularyCard",
      italian: "Computer",
      urdu: "کمپیوٹر",
      emoji: "💻",
      pronunciation: "[kom-pyoo-ter]",
      exampleItalian: "Uso il computer per lavoro.",
      exampleUrdu: "میں کام کے لیے کمپیوٹر استعمال کرتا ہوں۔"
    },
    {
      id: "sec9-l1-tf-computer",
      type: "TrueFalse",
      statement: "Computer = ٹی وی",
      isTrue: false,
      correctAnswer: "کمپیوٹر"
    },
    {
      id: "sec9-l1-vocab-internet",
      type: "VocabularyCard",
      italian: "Internet",
      urdu: "انٹرنیٹ",
      emoji: "🌐",
      pronunciation: "[een-ter-net]",
      exampleItalian: "La connessione Internet è lenta.",
      exampleUrdu: "انٹرنیٹ کنکشن سست ہے۔"
    },
    {
      id: "sec9-l1-vocab-messaggio",
      type: "VocabularyCard",
      italian: "Messaggio",
      urdu: "پیغام",
      emoji: "📩",
      pronunciation: "[mes-sad-joh]",
      exampleItalian: "Ti ho mandato un messaggio.",
      exampleUrdu: "میں نے تمہیں ایک پیغام بھیجا ہے۔"
    },
    {
      id: "sec9-l1-sr-mio-telefono",
      type: "SentenceReconstruction",
      question: "میرا فون کہاں ہے؟",
      correctSequence: ["Dov'è", "il", "mio", "telefono", "?"],
      shuffledWords: ["Dov'è", "il", "mio", "telefono", "?", "tuo", "libro"],
      direction: "ur-to-it"
    },
    {
      id: "sec9-l1-sr-computer-rotto",
      type: "SentenceReconstruction",
      question: "Il computer è rotto",
      correctSequence: ["کمپیوٹر", "خراب", "ہے"],
      shuffledWords: ["کمپیوٹر", "خراب", "ہے", "نیا", "پرانا"],
      direction: "it-to-ur"
    }
  ]
};
