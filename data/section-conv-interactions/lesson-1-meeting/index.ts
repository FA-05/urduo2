import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "conv1-l1",
  title: "Meeting a Friend",
  description: "دوست سے ملاقات",
  icon: "👋",
  exercises: [
    {
      id: "conv1-l1-vocab-ciao",
      type: "VocabularyCard",
      italian: "Ciao",
      urdu: "ہیلو / سلام",
      emoji: "👋",
      pronunciation: "[cha-oh]",
      exampleItalian: "Ciao, come stai?",
      exampleUrdu: "سلام، تم کیسے ہو؟"
    },
    {
      id: "conv1-l1-vocab-bene",
      type: "VocabularyCard",
      italian: "Bene",
      urdu: "ٹھیک / اچھا",
      emoji: "😊",
      pronunciation: "[be-ne]",
      exampleItalian: "Sto bene, grazie.",
      exampleUrdu: "میں ٹھیک ہوں، شکریہ۔"
    },
    {
      id: "conv1-l1-mc-ciao",
      type: "MultipleChoice",
      question: "\"تم کیسے ہو؟\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Come stai?", "Come ti chiami?", "Dove vai?", "Che ore sono?"],
      correctAnswer: "Come stai?"
    },
    {
      id: "conv1-l1-vocab-prego",
      type: "VocabularyCard",
      italian: "Prego",
      urdu: "خوش آمدید / کوئی بات نہیں",
      emoji: "🙏",
      pronunciation: "[pre-goh]",
      exampleItalian: "Grazie! - Prego.",
      exampleUrdu: "شکریہ! - کوئی بات نہیں۔"
    },
    {
      id: "conv1-l1-tf-bene",
      type: "TrueFalse",
      statement: "Bene = برا",
      isTrue: false,
      correctAnswer: "ٹھیک"
    },
    {
      id: "conv1-l1-vocab-amico",
      type: "VocabularyCard",
      italian: "Amico",
      urdu: "دوست",
      emoji: "🤝",
      pronunciation: "[a-mee-koh]",
      exampleItalian: "Lui è il mio amico.",
      exampleUrdu: "وہ میرا دوست ہے۔"
    },
    {
      id: "conv1-l1-sr-come-stai",
      type: "SentenceReconstruction",
      question: "تم کیسے ہو؟",
      correctSequence: ["Come", "stai", "?"],
      shuffledWords: ["Come", "stai", "?", "va", "bene"],
      direction: "ur-to-it"
    },
    {
      id: "conv1-l1-sr-sto-bene",
      type: "SentenceReconstruction",
      question: "Sto bene, grazie",
      correctSequence: ["میں", "ٹھیک", "ہوں", "شکریہ"],
      shuffledWords: ["میں", "ٹھیک", "ہوں", "شکریہ", "برا", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
