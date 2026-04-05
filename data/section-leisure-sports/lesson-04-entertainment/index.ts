import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec8-l4",
  title: "Entertainment & Media",
  description: "تفریح اور میڈیا",
  icon: "🎬",
  exercises: [
    {
      id: "sec8-l4-vocab-cinema",
      type: "VocabularyCard",
      italian: "Cinema",
      urdu: "سینما",
      emoji: "🎬",
      pronunciation: "[chee-neh-mah]",
      exampleItalian: "Andiamo al cinema stasera.",
      exampleUrdu: "ہم آج رات سینما چلتے ہیں۔"
    },
    {
      id: "sec8-l4-vocab-film",
      type: "VocabularyCard",
      italian: "Film",
      urdu: "فلم",
      emoji: "🎞️",
      pronunciation: "[feelm]",
      exampleItalian: "Questo film è molto bello.",
      exampleUrdu: "یہ فلم بہت اچھی ہے۔"
    },
    {
      id: "sec8-l4-vocab-attore",
      type: "VocabularyCard",
      italian: "Attore",
      urdu: "اداکار",
      emoji: "🎭",
      pronunciation: "[at-toh-reh]",
      exampleItalian: "Lui è un attore famoso.",
      exampleUrdu: "وہ ایک مشہور اداکار ہے۔"
    },
    {
      id: "sec8-l4-vocab-teatro",
      type: "VocabularyCard",
      italian: "Teatro",
      urdu: "تھیٹر",
      emoji: "🏛️",
      pronunciation: "[teh-ah-troh]",
      exampleItalian: "Mi piace andare a teatro.",
      exampleUrdu: "مجھے تھیٹر جانا پسند ہے۔"
    },
    {
      id: "sec8-l4-vocab-biglietto",
      type: "VocabularyCard",
      italian: "Biglietto",
      urdu: "ٹکٹ",
      emoji: "🎫",
      pronunciation: "[bee-lyet-toh]",
      exampleItalian: "Ho comprato due biglietti.",
      exampleUrdu: "میں نے دو ٹکٹیں خریدی ہیں۔"
    },
    {
      id: "sec8-l4-vocab-concerto",
      type: "VocabularyCard",
      italian: "Concerto",
      urdu: "کنسرٹ",
      emoji: "🎸",
      pronunciation: "[kon-cher-toh]",
      exampleItalian: "Il concerto inizia alle nove.",
      exampleUrdu: "کنسرٹ نو بجے شروع ہوتا ہے۔"
    },
    {
      id: "sec8-l4-vocab-spettacolo",
      type: "VocabularyCard",
      italian: "Spettacolo",
      urdu: "شو/منظر",
      emoji: "🏟️",
      pronunciation: "[spet-tah-ko-loh]",
      exampleItalian: "Lo spettacolo è stato fantastico.",
      exampleUrdu: "شو بہت شاندار تھا۔"
    },
    {
      id: "sec8-l4-mc-cinema",
      type: "MultipleChoice",
      question: "\"سینما\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Cinema", "Teatro", "Museo", "Scuola"],
      correctAnswer: "Cinema"
    },
    {
      id: "sec8-l4-tf-film",
      type: "TrueFalse",
      statement: "Film = کتاب",
      isTrue: false,
      correctAnswer: "فلم"
    },
    {
      id: "sec8-l4-sr-andiamo-cinema",
      type: "SentenceReconstruction",
      question: "Andiamo al cinema",
      correctSequence: ["ہم", "سینما", "جا", "رہے", "ہیں"],
      shuffledWords: ["ہم", "سینما", "جا", "رہے", "ہیں", "گھر", "آرہے"],
      direction: "it-to-ur"
    },
    {
      id: "sec8-l4-sr-ho-biglietto",
      type: "SentenceReconstruction",
      question: "میرے پاس ٹکٹ ہے",
      correctSequence: ["Ho", "il", "biglietto"],
      shuffledWords: ["Ho", "il", "biglietto", "ho", "la", "casa"],
      direction: "ur-to-it"
    }
  ]
};
