import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec6-l1",
  title: "Common Professions",
  description: "عام پیشے",
  icon: "👨‍🏫",
  exercises: [
    {
      id: "sec6-l1-vocab-insegnante",
      type: "VocabularyCard",
      italian: "Insegnante",
      urdu: "استاد",
      emoji: "👨‍🏫",
      pronunciation: "[een-se-nyan-teh]",
      exampleItalian: "L'insegnante è in classe.",
      exampleUrdu: "استاد کلاس میں ہے۔"
    },
    {
      id: "sec6-l1-mc-insegnante",
      type: "MultipleChoice",
      question: "\"Insegnante\"",
      options: ["استاد", "شاگرد", "ڈاکٹر", "انجینئر"],
      correctAnswer: "استاد"
    },
    {
      id: "sec6-l1-tf-insegnante",
      type: "TrueFalse",
      statement: "Insegnante = شاگرد",
      isTrue: false,
      correctAnswer: "استاد"
    },
    {
      id: "sec6-l1-vocab-medico",
      type: "VocabularyCard",
      italian: "Medico",
      urdu: "ڈاکٹر",
      emoji: "👨‍⚕️",
      pronunciation: "[meh-dee-koh]",
      exampleItalian: "Il medico cura i malati.",
      exampleUrdu: "ڈاکٹر بیماروں کا علاج کرتا ہے۔"
    },
    {
      id: "sec6-l1-mc-medico",
      type: "MultipleChoice",
      question: "\"Medico\"",
      options: ["ڈاکٹر", "وکیل", "انجینئر", "باورچی"],
      correctAnswer: "ڈاکٹر"
    },
    {
      id: "sec6-l1-vocab-studente",
      type: "VocabularyCard",
      italian: "Studente",
      urdu: "طالب علم",
      emoji: "👨‍🎓",
      pronunciation: "[stoo-den-teh]",
      exampleItalian: "Lo studente studia molto.",
      exampleUrdu: "طالب علم بہت پڑھتا ہے۔"
    },
    {
      id: "sec6-l1-tf-studente",
      type: "TrueFalse",
      statement: "Studente = طالب علم",
      isTrue: true
    },
    {
      id: "sec6-l1-vocab-cuoco",
      type: "VocabularyCard",
      italian: "Cuoco",
      urdu: "باورچی",
      emoji: "👨‍🍳",
      pronunciation: "[kwo-koh]",
      exampleItalian: "Il cuoco cucina la pasta.",
      exampleUrdu: "باورچی پاستا پکاتا ہے۔"
    },
    {
      id: "sec6-l1-sr-io-studente",
      type: "SentenceReconstruction",
      question: "Io sono uno studente",
      correctSequence: ["میں", "ایک", "طالب", "علم", "ہوں"],
      shuffledWords: ["میں", "ایک", "طالب", "علم", "ہوں", "استاد", "ڈاکٹر"],
      direction: "it-to-ur"
    },
    {
      id: "sec6-l1-sr-lei-insegnante",
      type: "SentenceReconstruction",
      question: "Lei è un'insegnante",
      correctSequence: ["وہ", "ایک", "استانی", "ہے"],
      shuffledWords: ["وہ", "ایک", "استانی", "ہے", "طالب", "علم"],
      direction: "it-to-ur"
    }
  ]
};
