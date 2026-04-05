import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "family-l2",
  title: "Extended Relatives",
  description: "دور کا خاندان / رشتہ دار",
  icon: "👵",
  exercises: [
    {
      id: "family-l2-vocab-nonno",
      type: "VocabularyCard",
      italian: "Nonno",
      urdu: "دادا / نانا",
      emoji: "👴",
      pronunciation: "[non-no]",
      exampleItalian: "Mio nonno racconta storie.",
      exampleUrdu: "میرے دادا کہانیاں سناتے ہیں۔"
    },
    {
      id: "family-l2-vocab-nonna",
      type: "VocabularyCard",
      italian: "Nonna",
      urdu: "دادی / نانی",
      emoji: "👵",
      pronunciation: "[non-na]",
      exampleItalian: "La nonna è in cucina.",
      exampleUrdu: "دادی باورچی خانے میں ہیں۔"
    },
    {
      id: "family-l2-mc-zio",
      type: "MultipleChoice",
      question: "\"چاچا / ماموں / خالو / پھوپھا\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Zio", "Zia", "Cugino", "Nipote"],
      correctAnswer: "Zio"
    },
    {
      id: "family-l2-vocab-zia",
      type: "VocabularyCard",
      italian: "Zia",
      urdu: "چاچی / ممانی / خالہ / پھوپھی",
      emoji: "👩‍🦳",
      pronunciation: "[tsee-ah]",
      exampleItalian: "Mia zia vive a Milano.",
      exampleUrdu: "میری خالہ میلان میں رہتی ہیں۔"
    },
    {
      id: "family-l2-tf-cugino",
      type: "TrueFalse",
      statement: "Cugino = بھائی",
      isTrue: false,
      correctAnswer: "کزن / چاچا زاد"
    },
    {
      id: "family-l2-vocab-parente",
      type: "VocabularyCard",
      italian: "Parente",
      urdu: "رشتہ دار",
      emoji: "🏘️",
      pronunciation: "[pa-ren-te]",
      exampleItalian: "Ho molti parenti.",
      exampleUrdu: "میرے بہت سے رشتہ دار ہیں۔"
    },
    {
      id: "family-l2-sr-nonno-racconta",
      type: "SentenceReconstruction",
      question: "میرے دادا کہانیاں سناتے ہیں۔",
      correctSequence: ["Mio", "nonno", "racconta", "storie"],
      shuffledWords: ["Mio", "nonno", "racconta", "storie", "scrive", "il"],
      direction: "ur-to-it"
    },
    {
      id: "family-l2-sr-zia-milano",
      type: "SentenceReconstruction",
      question: "Mia zia vive a Milano",
      correctSequence: ["میری", "خالہ", "میلان", "میں", "رہتی", "ہیں"],
      shuffledWords: ["میری", "خالہ", "میلان", "میں", "رہتی", "ہیں", "کھاتی"],
      direction: "it-to-ur"
    }
  ]
};
