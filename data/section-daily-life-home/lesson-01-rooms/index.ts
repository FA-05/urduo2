import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec11-l1",
  title: "Rooms",
  description: "کمرے",
  icon: "🏠",
  exercises: [
    {
      id: "sec11-l1-vocab-casa",
      type: "VocabularyCard",
      italian: "la casa",
      urdu: "گھر",
      emoji: "🏠",
      pronunciation: "[lah kah-zah]",
      exampleItalian: "La mia casa è piccola.",
      exampleUrdu: "میرا گھر چھوٹا ہے۔"
    },
    {
      id: "sec11-l1-vocab-cucina",
      type: "VocabularyCard",
      italian: "la cucina",
      urdu: "باورچی خانہ",
      emoji: "🍳",
      pronunciation: "[lah koo-chee-nah]",
      exampleItalian: "Cucino la pasta in cucina.",
      exampleUrdu: "میں باورچی خانے میں پاستا پکاتا ہوں۔"
    },
    {
      id: "sec11-l1-vocab-bagno",
      type: "VocabularyCard",
      italian: "il bagno",
      urdu: "غسل خانہ/باتھ روم",
      emoji: "🚿",
      pronunciation: "[eel bah-nyoh]",
      exampleItalian: "Dov'è il bagno?",
      exampleUrdu: "باتھ روم کہاں ہے؟"
    },
    {
      id: "sec11-l1-vocab-camera",
      type: "VocabularyCard",
      italian: "la camera da letto",
      urdu: "سونے کا کمرہ",
      emoji: "🛏️",
      pronunciation: "[lah kah-me-rah dah let-toh]",
      exampleItalian: "Dormo nella camera da letto.",
      exampleUrdu: "میں سونے کے کمرے میں سوتا ہوں۔"
    },
    {
      id: "sec11-l1-vocab-soggiorno",
      type: "VocabularyCard",
      italian: "il soggiorno",
      urdu: "بیٹھک/ڈرائنگ روم",
      emoji: "🛋️",
      pronunciation: "[eel sod-jor-noh]",
      exampleItalian: "Guardo la TV in soggiorno.",
      exampleUrdu: "میں بیٹھک میں ٹی وی دیکھتا ہوں۔"
    },
    {
      id: "sec11-l1-vocab-corridoio",
      type: "VocabularyCard",
      italian: "il corridoio",
      urdu: "راہداری/گلی",
      emoji: "🚪",
      pronunciation: "[eel kor-ree-doy-oh]",
      exampleItalian: "Il corridoio è lungo.",
      exampleUrdu: "راہداری لمبی ہے۔"
    },
    {
      id: "sec11-l1-mc-casa",
      type: "MultipleChoice",
      question: "\"گھر\" کو Italian میں کیا کہتے ہیں؟",
      options: ["la casa", "il bagno", "la cucina", "il letto"],
      correctAnswer: "la casa"
    },
    {
      id: "sec11-l1-tf-cucina",
      type: "TrueFalse",
      statement: "Cucina = غسل خانہ",
      isTrue: false,
      correctAnswer: "باورچی خانہ"
    },
    {
      id: "sec11-l1-sr-casa-grande",
      type: "SentenceReconstruction",
      question: "La mia casa è grande",
      correctSequence: ["میرا", "گھر", "بڑا", "ہے"],
      shuffledWords: ["میرا", "گھر", "بڑا", "ہے", "چھوٹا", "نیا"],
      direction: "it-to-ur"
    },
    {
      id: "sec11-l1-sr-tavolo-cucina",
      type: "SentenceReconstruction",
      question: "Il tavolo è in cucina",
      correctSequence: ["میز", "باورچی", "خانے", "میں", "ہے"],
      shuffledWords: ["میز", "باورچی", "خانے", "میں", "ہے", "کمرے", "پر"],
      direction: "it-to-ur"
    }
  ]
};
