import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "adv-gram-l5",
  title: "Past Tense: Auxiliary Verbs",
  description: "ماضی قریب: فعلِ امدادی (essere یا avere)",
  icon: "📜",
  exercises: [
    {
      id: "adv-gram-l5-vocab-sono-andato",
      type: "VocabularyCard",
      italian: "Sono andato",
      urdu: "میں گیا ہوں",
      emoji: "🚶",
      pronunciation: "[so-no an-dah-toh]",
      exampleItalian: "Sono andato a casa.",
      exampleUrdu: "میں گھر گیا ہوں۔"
    },
    {
      id: "adv-gram-l5-vocab-arrivato",
      type: "VocabularyCard",
      italian: "È arrivato",
      urdu: "وہ پہنچ گیا ہے",
      emoji: "🏁",
      pronunciation: "[e ar-ree-vah-toh]",
      exampleItalian: "Il treno è arrivato.",
      exampleUrdu: "ٹرین پہنچ گئی ہے۔"
    },
    {
      id: "adv-gram-l5-mc-andato",
      type: "MultipleChoice",
      question: "\"وہ (مذکر) گیا ہے\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Lui è andato", "Lui ha andato", "Lui va", "Lui andrà"],
      correctAnswer: "Lui è andato"
    },
    {
      id: "adv-gram-l5-vocab-stati",
      type: "VocabularyCard",
      italian: "Siamo stati",
      urdu: "ہم رہے ہیں / ہم تھے",
      emoji: "👥",
      pronunciation: "[syah-mo stah-tee]",
      exampleItalian: "Siamo stati in Italia.",
      exampleUrdu: "ہم اٹلی میں رہے ہیں۔"
    },
    {
      id: "adv-gram-l5-tf-andato",
      type: "TrueFalse",
      statement: "Sono andato = میں نے دیکھا",
      isTrue: false,
      correctAnswer: "میں گیا ہوں"
    },
    {
      id: "adv-gram-l5-vocab-uscita",
      type: "VocabularyCard",
      italian: "È uscita",
      urdu: "وہ (مؤنث) باہر نکلی ہے",
      emoji: "🚪",
      pronunciation: "[e oo-shee-tah]",
      exampleItalian: "Maria è uscita.",
      exampleUrdu: "ماریا باہر نکلی ہے۔"
    },
    {
      id: "adv-gram-l5-sr-sono-andato-roma",
      type: "SentenceReconstruction",
      question: "میں روم گیا ہوں۔",
      correctSequence: ["Sono", "andato", "a", "Roma"],
      shuffledWords: ["Sono", "andato", "a", "Roma", "il", "treno"],
      direction: "ur-to-it"
    },
    {
      id: "adv-gram-l5-sr-treno-arrivato",
      type: "SentenceReconstruction",
      question: "Il treno è arrivato",
      correctSequence: ["ٹرین", "پہنچ", "گئی", "ہے"],
      shuffledWords: ["ٹرین", "پہنچ", "گئی", "ہے", "لیٹ", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
