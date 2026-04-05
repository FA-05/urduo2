import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec8-l1",
  title: "Hobbies",
  description: "مشاغل",
  icon: "🎨",
  exercises: [
    {
      id: "sec8-l1-vocab-hobby",
      type: "VocabularyCard",
      italian: "Hobby",
      urdu: "مشغلہ",
      emoji: "🎨",
      pronunciation: "[ob-bee]",
      exampleItalian: "Qual è il tuo hobby preferito?",
      exampleUrdu: "تمہارا پسندیدہ مشغلہ کون سا ہے؟"
    },
    {
      id: "sec8-l1-vocab-musica",
      type: "VocabularyCard",
      italian: "Musica",
      urdu: "موسیقی",
      emoji: "🎵",
      pronunciation: "[moo-zee-kah]",
      exampleItalian: "Ascolto la musica ogni giorno.",
      exampleUrdu: "میں ہر روز موسیقی سنتا ہوں۔"
    },
    {
      id: "sec8-l1-vocab-dipingere",
      type: "VocabularyCard",
      italian: "Dipingere",
      urdu: "تصویر بنانا/پینٹ کرنا",
      emoji: "🎨",
      pronunciation: "[dee-peen-je-reh]",
      exampleItalian: "Mi piace dipingere paesaggi.",
      exampleUrdu: "مجھے مناظر کی تصویر بنانا پسند ہے۔"
    },
    {
      id: "sec8-l1-vocab-scacchi",
      type: "VocabularyCard",
      italian: "Scacchi",
      urdu: "شطرنج",
      emoji: "♟️",
      pronunciation: "[skak-kee]",
      exampleItalian: "Giochiamo a scacchi stasera.",
      exampleUrdu: "ہم آج رات شطرنج کھیلتے ہیں۔"
    },
    {
      id: "sec8-l1-vocab-leggere",
      type: "VocabularyCard",
      italian: "Leggere",
      urdu: "پڑھنا",
      emoji: "📚",
      pronunciation: "[lej-je-reh]",
      exampleItalian: "Mi piace leggere libri.",
      exampleUrdu: "مجھے کتابیں پڑھنا پسند ہے۔"
    },
    {
      id: "sec8-l1-vocab-cantare",
      type: "VocabularyCard",
      italian: "Cantare",
      urdu: "گانا",
      emoji: "🎤",
      pronunciation: "[kan-tah-reh]",
      exampleItalian: "Lei sa cantare molto bene.",
      exampleUrdu: "وہ بہت اچھا گا سکتی ہے۔"
    },
    {
      id: "sec8-l1-vocab-ballare",
      type: "VocabularyCard",
      italian: "Ballare",
      urdu: "ناچنا",
      emoji: "💃",
      pronunciation: "[bal-lah-reh]",
      exampleItalian: "Andiamo a ballare?",
      exampleUrdu: "کیا ہم ناچنے چلیں؟"
    },
    {
      id: "sec8-l1-mc-musica",
      type: "MultipleChoice",
      question: "\"موسیقی\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Musica", "Canzone", "Ballo", "Studio"],
      correctAnswer: "Musica"
    },
    {
      id: "sec8-l1-tf-dipingere",
      type: "TrueFalse",
      statement: "Dipingere = گانا",
      isTrue: false,
      correctAnswer: "پینٹ کرنا"
    },
    {
      id: "sec8-l1-sr-piace-leggere",
      type: "SentenceReconstruction",
      question: "Mi piace leggere",
      correctSequence: ["مجھے", "پڑھنا", "پسند", "ہے"],
      shuffledWords: ["مجھے", "پڑھنا", "پسند", "ہے", "لکھنا", "سونا"],
      direction: "it-to-ur"
    }
  ]
};
