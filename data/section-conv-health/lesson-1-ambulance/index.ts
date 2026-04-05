import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "conv3-l1",
  title: "Calling an Ambulance",
  description: "ایمبولینس بلانا",
  icon: "🚑",
  exercises: [
    {
      id: "conv3-l1-vocab-ambulanza",
      type: "VocabularyCard",
      italian: "Ambulanza",
      urdu: "ایمبولینس",
      emoji: "🚑",
      pronunciation: "[am-bu-lan-tsa]",
      exampleItalian: "Chiama un'ambulanza!",
      exampleUrdu: "ایک ایمبولینس بلاؤ!"
    },
    {
      id: "conv3-l1-vocab-emergenza",
      type: "VocabularyCard",
      italian: "Emergenza",
      urdu: "ہنگامی حالت",
      emoji: "🚨",
      pronunciation: "[e-mer-jen-tsa]",
      exampleItalian: "È un'emergenza.",
      exampleUrdu: "یہ ایک ہنگامی صورتحال ہے۔"
    },
    {
      id: "conv3-l1-mc-ambulanza",
      type: "MultipleChoice",
      question: "\"ایمبولینس\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Ambulanza", "Ospedale", "Dottore", "Polizia"],
      correctAnswer: "Ambulanza"
    },
    {
      id: "conv3-l1-vocab-subito",
      type: "VocabularyCard",
      italian: "Subito",
      urdu: "فوری طور پر / ابھی",
      emoji: "🏃",
      pronunciation: "[soo-bee-toh]",
      exampleItalian: "Vieni qui subito!",
      exampleUrdu: "فوری طور پر یہاں آؤ!"
    },
    {
      id: "conv3-l1-tf-emergenza",
      type: "TrueFalse",
      statement: "Emergenza = پارٹی",
      isTrue: false,
      correctAnswer: "ہنگامی حالت"
    },
    {
      id: "conv3-l1-vocab-chiamare",
      type: "VocabularyCard",
      italian: "Chiamare",
      urdu: "کال کرنا / بلانا",
      emoji: "📞",
      pronunciation: "[kya-mah-re]",
      exampleItalian: "Devo chiamare aiuto.",
      exampleUrdu: "مجھے مدد بلانی ہے۔"
    },
    {
      id: "conv3-l1-sr-chiama-ambulanza",
      type: "SentenceReconstruction",
      question: "ایک ایمبولینس بلاؤ!",
      correctSequence: ["Chiama", "un'ambulanza", "!"],
      shuffledWords: ["Chiama", "un'ambulanza", "!", "il", "libro"],
      direction: "ur-to-it"
    },
    {
      id: "conv3-l1-sr-e-emergenza",
      type: "SentenceReconstruction",
      question: "È un'emergenza",
      correctSequence: ["یہ", "ایک", "ہنگامی", "صورتحال", "ہے"],
      shuffledWords: ["یہ", "ایک", "ہنگامی", "صورتحال", "ہے", "عام", "نہیں"],
      direction: "it-to-ur"
    }
  ]
};
