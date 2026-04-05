import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "idioms-l2",
  title: "Popular Idioms",
  description: "مشہور اطالوی محاورے",
  icon: "🐺",
  exercises: [
    {
      id: "idioms-l2-vocab-bocca-lupo",
      type: "VocabularyCard",
      italian: "In bocca al lupo",
      urdu: "خوش قسمتی ہو (گڈ لک)!",
      emoji: "🐺",
      pronunciation: "[in bok-kah al loo-po]",
      exampleItalian: "Hai un esame? In bocca al lupo!",
      exampleUrdu: "تمہارا امتحان ہے؟ گڈ لک!"
    },
    {
      id: "idioms-l2-vocab-crepi",
      type: "VocabularyCard",
      italian: "Crepi il lupo",
      urdu: "بہت شکریہ (گڈ لک کا جواب)!",
      emoji: "🙏",
      pronunciation: "[kre-pee il loo-po]",
      exampleItalian: "Risposta: Crepi!",
      exampleUrdu: "جواب: بہت شکریہ!"
    },
    {
      id: "idioms-l2-mc-gamba",
      type: "MultipleChoice",
      question: "\"ہوشیار / قابل\" (smart/capable) کے لیے کون سا محاورہ ہے؟",
      options: ["In gamba", "In bocca", "In testa", "In mano"],
      correctAnswer: "In gamba"
    },
    {
      id: "idioms-l2-vocab-gamba",
      type: "VocabularyCard",
      italian: "In gamba",
      urdu: "قابل / ہوشیار / سمجھدار",
      emoji: "🦵✨",
      pronunciation: "[in gam-bah]",
      exampleItalian: "Sei proprio in gamba!",
      exampleUrdu: "تم واقعی بہت قابل ہو!"
    },
    {
      id: "idioms-l2-tf-tanta-roba",
      type: "TrueFalse",
      statement: "Tanta roba = بہت زیادہ کچرا",
      isTrue: false,
      correctAnswer: "بہت شاندار / کمال کی چیز"
    },
    {
      id: "idioms-l2-vocab-stare-fresco",
      type: "VocabularyCard",
      italian: "Stare fresco",
      urdu: "مشکل میں پڑنا (آئرونی کے ساتھ)",
      emoji: "🥶",
      pronunciation: "[sta-re fres-ko]",
      exampleItalian: "Se aspetti lui, stai fresco!",
      exampleUrdu: "اگر تم اس کا انتظار کر رہے ہو، تو تم مشکل میں ہو (وہ نہیں آئے گا)۔"
    },
    {
      id: "idioms-l2-sr-in-bocca-al-lupo",
      type: "SentenceReconstruction",
      question: "In bocca al lupo!",
      correctSequence: ["In", "bocca", "al", "lupo", "!"],
      shuffledWords: ["In", "bocca", "al", "lupo", "!", "il", "naso"],
      direction: "it-to-ur"
    },
    {
      id: "idioms-l2-sr-sei-in-gamba",
      type: "SentenceReconstruction",
      question: "تم واقعی بہت قابل ہو۔",
      correctSequence: ["Sei", "proprio", "in", "gamba"],
      shuffledWords: ["Sei", "proprio", "in", "gamba", "il", "pane"],
      direction: "ur-to-it"
    }
  ]
};
