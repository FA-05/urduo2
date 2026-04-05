import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec16-l1",
  title: "Art & Music",
  description: "فن اور موسیقی",
  icon: "🎨",
  exercises: [
    {
      id: "sec16-l1-vocab-arte",
      type: "VocabularyCard",
      italian: "Arte",
      urdu: "فن",
      emoji: "🎨",
      pronunciation: "[ar-te]",
      exampleItalian: "L'arte è importante.",
      exampleUrdu: "فن اہم ہے۔"
    },
    {
      id: "sec16-l1-vocab-musica",
      type: "VocabularyCard",
      italian: "Musica",
      urdu: "موسیقی",
      emoji: "🎵",
      pronunciation: "[moo-zee-kah]",
      exampleItalian: "Mi piace la musica.",
      exampleUrdu: "مجھے موسیقی پسند ہے۔"
    },
    {
      id: "sec16-l1-mc-arte",
      type: "MultipleChoice",
      question: "\"فن\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Arte", "Musica", "Libro", "Film"],
      correctAnswer: "Arte"
    },
    {
      id: "sec16-l1-vocab-pittura",
      type: "VocabularyCard",
      italian: "Pittura",
      urdu: "پینٹنگ",
      emoji: "🖼️",
      pronunciation: "[peet-too-rah]",
      exampleItalian: "Questa pittura è bella.",
      exampleUrdu: "یہ پینٹنگ خوبصورت ہے۔"
    },
    {
      id: "sec16-l1-tf-musica",
      type: "TrueFalse",
      statement: "Musica = کتاب",
      isTrue: false,
      correctAnswer: "موسیقی"
    },
    {
      id: "sec16-l1-vocab-strumento",
      type: "VocabularyCard",
      italian: "Strumento",
      urdu: "آلہ / ساز",
      emoji: "🎸",
      pronunciation: "[stroo-men-toh]",
      exampleItalian: "Suono uno strumento.",
      exampleUrdu: "میں ایک ساز بجاتا ہوں۔"
    },
    {
      id: "sec16-l1-sr-musica-bella",
      type: "SentenceReconstruction",
      question: "موسیقی خوبصورت ہے۔",
      correctSequence: ["La", "musica", "è", "bella"],
      shuffledWords: ["La", "musica", "è", "bella", "il", "libro"],
      direction: "ur-to-it"
    },
    {
      id: "sec16-l1-sr-amo-arte",
      type: "SentenceReconstruction",
      question: "Amo l'arte",
      correctSequence: ["میں", "فن", "سے", "محبت", "کرتا", "ہوں"],
      shuffledWords: ["میں", "فن", "سے", "محبت", "کرتا", "ہوں", "نہیں", "وہ"],
      direction: "it-to-ur"
    }
  ]
};
