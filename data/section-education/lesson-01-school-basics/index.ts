import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec5-l1",
  title: "School Basics",
  description: "سکول کی بنیادی باتیں",
  icon: "🏫",
  exercises: [
    {
      id: "sec5-l1-vocab-scuola",
      type: "VocabularyCard",
      italian: "Scuola",
      urdu: "سکول",
      emoji: "🏫",
      pronunciation: "[skwo-lah]",
      exampleItalian: "Vado a scuola ogni mattina.",
      exampleUrdu: "میں ہر صبح سکول جاتا ہوں۔"
    },
    {
      id: "sec5-l1-mc-scuola",
      type: "MultipleChoice",
      question: "\"Scuola\"",
      options: ["سکول", "یونیورسٹی", "گھر", "دفتر"],
      correctAnswer: "سکول"
    },
    {
      id: "sec5-l1-vocab-universita",
      type: "VocabularyCard",
      italian: "Università",
      urdu: "یونیورسٹی",
      emoji: "🎓",
      pronunciation: "[oo-nee-ver-see-tah]",
      exampleItalian: "L'università è grande.",
      exampleUrdu: "یونیورسٹی بڑی ہے۔"
    },
    {
      id: "sec5-l1-tf-universita",
      type: "TrueFalse",
      statement: "Università = سکول",
      isTrue: false,
      correctAnswer: "یونیورسٹی"
    },
    {
      id: "sec5-l1-vocab-classe",
      type: "VocabularyCard",
      italian: "Classe",
      urdu: "کلاس",
      emoji: "👨‍🏫",
      pronunciation: "[klas-seh]",
      exampleItalian: "La nostra classe è bella.",
      exampleUrdu: "ہماری کلاس خوبصورت ہے۔"
    },
    {
      id: "sec5-l1-mc-classe",
      type: "MultipleChoice",
      question: "\"کلاس\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Classe", "Scuola", "Libro", "Penna"],
      correctAnswer: "Classe"
    },
    {
      id: "sec5-l1-vocab-aula",
      type: "VocabularyCard",
      italian: "Aula",
      urdu: "کلاس روم/کمرہ جماعت",
      emoji: "🏢",
      pronunciation: "[ow-lah]",
      exampleItalian: "L'aula è al secondo piano.",
      exampleUrdu: "کلاس روم دوسری منزل پر ہے۔"
    },
    {
      id: "sec5-l1-tf-aula",
      type: "TrueFalse",
      statement: "Aula = کلاس روم",
      isTrue: true
    },
    {
      id: "sec5-l1-sr-vado-a-scuola",
      type: "SentenceReconstruction",
      question: "Vado a scuola",
      correctSequence: ["میں", "سکول", "جاتا", "ہوں"],
      shuffledWords: ["میں", "سکول", "جاتا", "ہوں", "گھر", "آتا"],
      direction: "it-to-ur"
    },
    {
      id: "sec5-l1-sr-aula-grande",
      type: "SentenceReconstruction",
      question: "کلاس روم بڑا ہے",
      correctSequence: ["L'aula", "è", "grande"],
      shuffledWords: ["L'aula", "è", "grande", "piccola", "scuola"],
      direction: "ur-to-it"
    }
  ]
};
