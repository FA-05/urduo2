import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec15-l2",
  title: "Nature & Landscape",
  description: "فطرت اور مناظر",
  icon: "🏔️",
  exercises: [
    {
      id: "sec15-l2-vocab-montagna",
      type: "VocabularyCard",
      italian: "la montagna",
      urdu: "پہاڑ",
      emoji: "🏔️",
      pronunciation: "[lah mon-tah-nyah]",
      exampleItalian: "Andiamo in montagna d'inverno.",
      exampleUrdu: "ہم سردیوں میں پہاڑ پر جاتے ہیں۔"
    },
    {
      id: "sec15-l2-vocab-mare",
      type: "VocabularyCard",
      italian: "il mare",
      urdu: "سمندر",
      emoji: "🌊",
      pronunciation: "[eel mah-reh]",
      exampleItalian: "Il mare è calmo oggi.",
      exampleUrdu: "آج سمندر پرسکون ہے۔"
    },
    {
      id: "sec15-l2-vocab-fiume",
      type: "VocabularyCard",
      italian: "il fiume",
      urdu: "دریا",
      emoji: "🏞️",
      pronunciation: "[eel fyoo-meh]",
      exampleItalian: "Il fiume scorre veloce.",
      exampleUrdu: "دریا تیزی سے بہتا ہے۔"
    },
    {
      id: "sec15-l2-vocab-albero",
      type: "VocabularyCard",
      italian: "l'albero",
      urdu: "درخت",
      emoji: "🌳",
      pronunciation: "[lal-beh-roh]",
      exampleItalian: "L'albero è molto alto.",
      exampleUrdu: "درخت بہت اونچا ہے۔"
    },
    {
      id: "sec15-l2-vocab-fiore",
      type: "VocabularyCard",
      italian: "il fiore",
      urdu: "پھول",
      emoji: "🌸",
      pronunciation: "[eel fyoh-reh]",
      exampleItalian: "Questo fiore profuma molto.",
      exampleUrdu: "اس پھول کی خوشبو بہت اچھی ہے۔"
    },
    {
      id: "sec15-l2-vocab-spiaggia",
      type: "VocabularyCard",
      italian: "la spiaggia",
      urdu: "ساحل سمندر / بیچ",
      emoji: "🏖️",
      pronunciation: "[lah spyad-jah]",
      exampleItalian: "Corriamo sulla spiaggia.",
      exampleUrdu: "ہم ساحل سمندر پر دوڑتے ہیں۔"
    },
    {
      id: "sec15-l2-vocab-isola",
      type: "VocabularyCard",
      italian: "l'isola",
      urdu: "جزیرہ",
      emoji: "🏝️",
      pronunciation: "[lee-zo-lah]",
      exampleItalian: "La Sardegna è un'isola.",
      exampleUrdu: "سارڈینیا ایک جزیرہ ہے۔"
    },
    {
      id: "sec15-l2-mc-montagna",
      type: "MultipleChoice",
      question: "\"پہاڑ\" کو Italian میں کیا کہتے ہیں؟",
      options: ["la montagna", "il mare", "il fiume", "la spiaggia"],
      correctAnswer: "la montagna"
    },
    {
      id: "sec15-l2-tf-mare",
      type: "TrueFalse",
      statement: "Mare = دریا",
      isTrue: false,
      correctAnswer: "سمندر"
    },
    {
      id: "sec15-l2-sr-piace-mare",
      type: "SentenceReconstruction",
      question: "Mi piace il mare",
      correctSequence: ["مجھے", "سمندر", "پسند", "ہے"],
      shuffledWords: ["مجھے", "سمندر", "پسند", "ہے", "پہاڑ", "دریا"],
      direction: "it-to-ur"
    }
  ]
};
