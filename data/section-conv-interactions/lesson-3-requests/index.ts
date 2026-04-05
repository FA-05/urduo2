import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "conv1-l3",
  title: "Simple Requests",
  description: "سادہ درخواستیں",
  icon: "🙏",
  exercises: [
    {
      id: "conv1-l3-vocab-per-favore",
      type: "VocabularyCard",
      italian: "Per favore",
      urdu: "براہ کرم / پلیز",
      emoji: "🙏",
      pronunciation: "[per fa-vo-re]",
      exampleItalian: "Un caffè, per favore.",
      exampleUrdu: "ایک کافی، براہ مہربانی۔"
    },
    {
      id: "conv1-l3-vocab-posso",
      type: "VocabularyCard",
      italian: "Posso?",
      urdu: "کیا میں؟ / کیا ممکن ہے؟",
      emoji: "❓",
      pronunciation: "[pos-so]",
      exampleItalian: "Posso entrare?",
      exampleUrdu: "کیا میں اندر آ سکتا ہوں؟"
    },
    {
      id: "conv1-l3-mc-aiuto",
      type: "MultipleChoice",
      question: "\"مدد\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Aiuto", "Grazie", "Prego", "Scusa"],
      correctAnswer: "Aiuto"
    },
    {
      id: "conv1-l3-vocab-certo",
      type: "VocabularyCard",
      italian: "Certo",
      urdu: "یقیناً / بے شک",
      emoji: "✅",
      pronunciation: "[cher-toh]",
      exampleItalian: "Certo, nessun problema.",
      exampleUrdu: "یقیناً، کوئی مسئلہ نہیں۔"
    },
    {
      id: "conv1-l3-tf-posso",
      type: "TrueFalse",
      statement: "Posso = میں نہیں کر سکتا",
      isTrue: false,
      correctAnswer: "کیا میں؟"
    },
    {
      id: "conv1-l3-vocab-scusa",
      type: "VocabularyCard",
      italian: "Scusa",
      urdu: "معذرت / معاف کیجیے گا",
      emoji: "🙇",
      pronunciation: "[skoo-zah]",
      exampleItalian: "Scusa, non sapevo.",
      exampleUrdu: "معذرت، مجھے معلوم نہیں تھا۔"
    },
    {
      id: "conv1-l3-sr-un-caffe",
      type: "SentenceReconstruction",
      question: "ایک کافی، براہ مہربانی۔",
      correctSequence: ["Un", "caffè", "per", "favore"],
      shuffledWords: ["Un", "caffè", "per", "favore", "il", "libro"],
      direction: "ur-to-it"
    },
    {
      id: "conv1-l3-sr-posso-entrare",
      type: "SentenceReconstruction",
      question: "Posso entrare?",
      correctSequence: ["کیا", "میں", "اندر", "آ", "سکتا", "ہوں", "?"],
      shuffledWords: ["کیا", "میں", "اندر", "آ", "سکتا", "ہوں", "?", "نہیں", "باہر"],
      direction: "it-to-ur"
    }
  ]
};
