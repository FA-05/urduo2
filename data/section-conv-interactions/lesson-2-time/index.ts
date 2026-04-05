import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "conv1-l2",
  title: "Asking the Time",
  description: "وقت پوچھنا",
  icon: "⌚",
  exercises: [
    {
      id: "conv1-l2-vocab-che-ore-sono",
      type: "VocabularyCard",
      italian: "Che ore sono?",
      urdu: "کیا وقت ہوا ہے؟",
      emoji: "🕰️",
      pronunciation: "[ke o-re so-no]",
      exampleItalian: "Scusa, che ore sono?",
      exampleUrdu: "معاف کیجیے گا، کیا وقت ہوا ہے؟"
    },
    {
      id: "conv1-l2-vocab-mezzogiorno",
      type: "VocabularyCard",
      italian: "Mezzogiorno",
      urdu: "دوپہر",
      emoji: "☀️",
      pronunciation: "[med-zo-jor-no]",
      exampleItalian: "È mezzogiorno.",
      exampleUrdu: "دوپہر ہو گئی ہے۔"
    },
    {
      id: "conv1-l2-mc-tempo",
      type: "MultipleChoice",
      question: "\"دوپہر\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Mezzogiorno", "Mezzanotte", "Mattina", "Sera"],
      correctAnswer: "Mezzogiorno"
    },
    {
      id: "conv1-l2-vocab-mezzanotte",
      type: "VocabularyCard",
      italian: "Mezzanotte",
      urdu: "آدھی رات",
      emoji: "🌙",
      pronunciation: "[med-za-not-te]",
      exampleItalian: "È già mezzanotte.",
      exampleUrdu: "آدھی رات ہو چکی ہے۔"
    },
    {
      id: "conv1-l2-tf-mezzanotte",
      type: "TrueFalse",
      statement: "Mezzanotte = صبح",
      isTrue: false,
      correctAnswer: "آدھی رات"
    },
    {
      id: "conv1-l2-vocab-ora",
      type: "VocabularyCard",
      italian: "Ora",
      urdu: "گھنٹہ / ابھی / وقت",
      emoji: "⏳",
      pronunciation: "[o-rah]",
      exampleItalian: "Un'ora fa.",
      exampleUrdu: "ایک گھنٹہ پہلے۔"
    },
    {
      id: "conv1-l2-sr-che-ore-sono",
      type: "SentenceReconstruction",
      question: "کیا وقت ہوا ہے؟",
      correctSequence: ["Che", "ore", "sono", "?"],
      shuffledWords: ["Che", "ore", "sono", "?", "va", "bene"],
      direction: "ur-to-it"
    },
    {
      id: "conv1-l2-sr-sono-le-otto",
      type: "SentenceReconstruction",
      question: "Sono le otto",
      correctSequence: ["آٹھ", "بجے", "ہیں"],
      shuffledWords: ["آٹھ", "بجے", "ہیں", "نو", "بجے"],
      direction: "it-to-ur"
    }
  ]
};
