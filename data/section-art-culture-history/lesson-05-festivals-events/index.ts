import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec16-l5",
  title: "Festivals & Events",
  description: "تہوار اور تقریبات",
  icon: "🎉",
  exercises: [
    {
      id: "sec16-l5-vocab-festa",
      type: "VocabularyCard",
      italian: "Festa",
      urdu: "تہوار / پارٹی",
      emoji: "🎈",
      pronunciation: "[fes-tah]",
      exampleItalian: "Oggi è una festa.",
      exampleUrdu: "آج ایک تہوار ہے۔"
    },
    {
      id: "sec16-l5-vocab-evento",
      type: "VocabularyCard",
      italian: "Evento",
      urdu: "تقریب",
      emoji: "📅",
      pronunciation: "[e-ven-toh]",
      exampleItalian: "L'evento è domani.",
      exampleUrdu: "تقریب کل ہے۔"
    },
    {
      id: "sec16-l5-mc-festa",
      type: "MultipleChoice",
      question: "\"تہوار\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Festa", "Evento", "Regalo", "Giorno"],
      correctAnswer: "Festa"
    },
    {
      id: "sec16-l5-vocab-regalo",
      type: "VocabularyCard",
      italian: "Regalo",
      urdu: "تحفہ",
      emoji: "🎁",
      pronunciation: "[re-gah-loh]",
      exampleItalian: "Ti porto un regalo.",
      exampleUrdu: "میں تمہارے لیے ایک تحفہ لایا ہوں۔"
    },
    {
      id: "sec16-l5-tf-regalo",
      type: "TrueFalse",
      statement: "Regalo = کام",
      isTrue: false,
      correctAnswer: "تحفہ"
    },
    {
      id: "sec16-l5-vocab-celebrazione",
      type: "VocabularyCard",
      italian: "Celebrazione",
      urdu: "جشن",
      emoji: "🎊",
      pronunciation: "[che-le-bra-tsyo-ne]",
      exampleItalian: "W la celebrazione!",
      exampleUrdu: "جشن مبارک!"
    },
    {
      id: "sec16-l5-sr-festa-bella",
      type: "SentenceReconstruction",
      question: "تہوار خوبصورت ہے۔",
      correctSequence: ["La", "festa", "è", "bella"],
      shuffledWords: ["La", "festa", "è", "bella", "il", "film"],
      direction: "ur-to-it"
    },
    {
      id: "sec16-l5-sr-porto-regalo",
      type: "SentenceReconstruction",
      question: "Porto un regalo",
      correctSequence: ["میں", "ایک", "تحفہ", "لاتا", "ہوں"],
      shuffledWords: ["میں", "ایک", "تحفہ", "لاتا", "ہوں", "لے", "وہ"],
      direction: "it-to-ur"
    }
  ]
};
