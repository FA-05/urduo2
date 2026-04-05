import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec12-l2",
  title: "Verbs 'Essere' & 'Avere'",
  description: "افعال 'ہونا' اور 'رکھنا'",
  icon: "⚙️",
  exercises: [
    {
      id: "sec12-l2-vocab-essere",
      type: "VocabularyCard",
      italian: "Essere",
      urdu: "ہونا",
      emoji: "👤",
      pronunciation: "[es-se-reh]",
      exampleItalian: "Io sono felice.",
      exampleUrdu: "میں خوش ہوں۔"
    },
    {
      id: "sec12-l2-vocab-essere-conj",
      type: "VocabularyCard",
      italian: "Coniugazione Essere",
      urdu: "Io sono, Tu sei, Lui/Lei è",
      emoji: "📝",
      pronunciation: "-",
      exampleItalian: "Noi siamo, Voi siete, Loro sono.",
      exampleUrdu: "ہم ہیں، آپ ہیں، وہ ہیں۔"
    },
    {
      id: "sec12-l2-vocab-avere",
      type: "VocabularyCard",
      italian: "Avere",
      urdu: "رکھنا/پاس ہونا",
      emoji: "👜",
      pronunciation: "[ah-ve-reh]",
      exampleItalian: "Io ho un libro.",
      exampleUrdu: "میرے پاس ایک کتاب ہے۔"
    },
    {
      id: "sec12-l2-vocab-avere-conj",
      type: "VocabularyCard",
      italian: "Coniugazione Avere",
      urdu: "Io ho, Tu hai, Lui/Lei ha",
      emoji: "📝",
      pronunciation: "-",
      exampleItalian: "Noi abbiamo, Voi avete, Loro hanno.",
      exampleUrdu: "ہمارے پاس ہے، آپ کے پاس ہے، ان کے پاس ہے۔"
    },
    {
      id: "sec12-l2-mc-siamo",
      type: "MultipleChoice",
      question: "\"Noi siamo\"",
      options: ["ہم ہیں", "میں ہوں", "وہ ہے", "آپ ہیں"],
      correctAnswer: "ہم ہیں"
    },
    {
      id: "sec12-l2-tf-hai",
      type: "TrueFalse",
      statement: "Tu hai = تمہارے پاس ہے",
      isTrue: true
    },
    {
      id: "sec12-l2-mc-hanno",
      type: "MultipleChoice",
      question: "\"ان کے پاس ہے\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Loro hanno", "Noi abbiamo", "Voi avete", "Lui ha"],
      correctAnswer: "Loro hanno"
    },
    {
      id: "sec12-l2-sr-siamo-amici",
      type: "SentenceReconstruction",
      question: "Noi siamo amici",
      correctSequence: ["ہم", "دوست", "ہیں"],
      shuffledWords: ["ہم", "دوست", "ہیں", "بھائی", "استاد"],
      direction: "it-to-ur"
    },
    {
      id: "sec12-l2-sr-abbiamo-casa",
      type: "SentenceReconstruction",
      question: "ہماری ایک گھر ہے / ہمارے پاس ایک گھر ہے",
      correctSequence: ["Abbiamo", "una", "casa"],
      shuffledWords: ["Abbiamo", "una", "casa", "Siamo", "una", "scuola"],
      direction: "ur-to-it"
    }
  ]
};
