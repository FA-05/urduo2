import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "conv1-l4",
  title: "Talking About Origin",
  description: "اصل وطن کی بات",
  icon: "🌍",
  exercises: [
    {
      id: "conv1-l4-vocab-di-dove-sei",
      type: "VocabularyCard",
      italian: "Di dove sei?",
      urdu: "تم کہاں سے ہو؟",
      emoji: "📍",
      pronunciation: "[dee do-ve se-ee]",
      exampleItalian: "Ciao, di dove sei?",
      exampleUrdu: "سلام، تم کہاں سے ہو؟"
    },
    {
      id: "conv1-l4-vocab-sono-di",
      type: "VocabularyCard",
      italian: "Sono di...",
      urdu: "میں ... سے ہوں",
      emoji: "🏠",
      pronunciation: "[so-no dee]",
      exampleItalian: "Sono di Roma.",
      exampleUrdu: "میں روم سے ہوں۔"
    },
    {
      id: "conv1-l4-mc-citta",
      type: "MultipleChoice",
      question: "\"شہر\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Città", "Nazione", "Casa", "Mondo"],
      correctAnswer: "Città"
    },
    {
      id: "conv1-l4-vocab-nazione",
      type: "VocabularyCard",
      italian: "Nazione",
      urdu: "ملک / قوم",
      emoji: "🏳️",
      pronunciation: "[na-tsyo-ne]",
      exampleItalian: "L'Italia è una nazione.",
      exampleUrdu: "اٹلی ایک ملک ہے۔"
    },
    {
      id: "conv1-l4-tf-citta",
      type: "TrueFalse",
      statement: "Città = پہاڑ",
      isTrue: false,
      correctAnswer: "شہر"
    },
    {
      id: "conv1-l4-vocab-estero",
      type: "VocabularyCard",
      italian: "Estero",
      urdu: "بیرون ملک",
      emoji: "✈️",
      pronunciation: "[es-te-ro]",
      exampleItalian: "Vado all'estero.",
      exampleUrdu: "میں بیرون ملک جا رہا ہوں۔"
    },
    {
      id: "conv1-l4-sr-di-dove-sei",
      type: "SentenceReconstruction",
      question: "تم کہاں سے ہو؟",
      correctSequence: ["Di", "dove", "sei", "?"],
      shuffledWords: ["Di", "dove", "sei", "?", "va", "bene"],
      direction: "ur-to-it"
    },
    {
      id: "conv1-l4-sr-sono-di-roma",
      type: "SentenceReconstruction",
      question: "Sono di Roma",
      correctSequence: ["میں", "روم", "سے", "ہوں"],
      shuffledWords: ["میں", "روم", "سے", "ہوں", "پیرس", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
