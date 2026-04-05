import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "conv4-l4",
  title: "Describing your Area",
  description: "اپنے علاقے کی وضاحت",
  icon: "🏙️",
  exercises: [
    {
      id: "conv4-l4-vocab-quartiere",
      type: "VocabularyCard",
      italian: "Quartiere",
      urdu: "محلہ / علاقہ",
      emoji: "🏘️",
      pronunciation: "[kwar-tye-re]",
      exampleItalian: "Il mio quartiere è bello.",
      exampleUrdu: "میرا محلہ خوبصورت ہے۔"
    },
    {
      id: "conv4-l4-vocab-piazza",
      type: "VocabularyCard",
      italian: "Piazza",
      urdu: "چوک / میدان",
      emoji: "🏛️",
      pronunciation: "[pyat-tsa]",
      exampleItalian: "Ci vediamo in piazza.",
      exampleUrdu: "چوک میں ملتے ہیں۔"
    },
    {
      id: "conv4-l4-mc-negozio",
      type: "MultipleChoice",
      question: "\"دکان\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Negozio", "Casa", "Scuola", "Piazza"],
      correctAnswer: "Negozio"
    },
    {
      id: "conv4-l4-vocab-negozio",
      type: "VocabularyCard",
      italian: "Negozio",
      urdu: "دکان",
      emoji: "🏪",
      pronunciation: "[ne-go-tsyo]",
      exampleItalian: "Il negozio è chiuso.",
      exampleUrdu: "دکان بند ہے۔"
    },
    {
      id: "conv4-l4-tf-tranquillo",
      type: "TrueFalse",
      statement: "Tranquillo = شور والا",
      isTrue: false,
      correctAnswer: "پرسکون"
    },
    {
      id: "conv4-l4-vocab-centro",
      type: "VocabularyCard",
      italian: "Centro",
      urdu: "مرکز / شہر کا وسط",
      emoji: "🏢",
      pronunciation: "[chen-troh]",
      exampleItalian: "Vado in centro.",
      exampleUrdu: "میں سینٹر جا رہا ہوں۔"
    },
    {
      id: "conv4-l4-sr-quartiere-tranquillo",
      type: "SentenceReconstruction",
      question: "میرا محلہ پرسکون ہے۔",
      correctSequence: ["Il", "mio", "quartiere", "è", "tranquillo"],
      shuffledWords: ["Il", "mio", "quartiere", "è", "tranquillo", "il", "rumore"],
      direction: "ur-to-it"
    },
    {
      id: "conv4-l4-sr-vai-centro",
      type: "SentenceReconstruction",
      question: "Vai in centro?",
      correctSequence: ["کیا", "تم", "سینٹر", "جا", "رہے", "ہو", "?"],
      shuffledWords: ["کیا", "تم", "سینٹر", "جا", "رہے", "ہو", "?", "نہیں", "باہر"],
      direction: "it-to-ur"
    }
  ]
};
