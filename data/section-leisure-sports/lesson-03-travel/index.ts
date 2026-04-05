import { Lesson } from '../../types';

export const lesson: Lesson = {
  id: "sec8-l3",
  title: "Travel & Leisure",
  description: "سفر اور تفریح",
  icon: "✈️",
  exercises: [
    {
      id: "sec8-l3-vocab-viaggiare",
      type: "VocabularyCard",
      italian: "Viaggiare",
      urdu: "سفر کرنا",
      emoji: "✈️",
      pronunciation: "[vee-aj-jah-reh]",
      exampleItalian: "Voglio viaggiare in Italia.",
      exampleUrdu: "میں اٹلی کا سفر کرنا چاہتا ہوں۔"
    },
    {
      id: "sec8-l3-vocab-vacanza",
      type: "VocabularyCard",
      italian: "Vacanza",
      urdu: "چھٹی",
      emoji: "🏖️",
      pronunciation: "[vah-kan-tsah]",
      exampleItalian: "Sono in vacanza.",
      exampleUrdu: "میں چھٹی پر ہوں۔"
    },
    {
      id: "sec8-l3-vocab-mare",
      type: "VocabularyCard",
      italian: "Mare",
      urdu: "سمندر",
      emoji: "🌊",
      pronunciation: "[mah-reh]",
      exampleItalian: "Andiamo al mare oggi.",
      exampleUrdu: "ہم آج سمندر پر جاتے ہیں۔"
    },
    {
      id: "sec8-l3-vocab-montagna",
      type: "VocabularyCard",
      italian: "Montagna",
      urdu: "پہاڑ",
      emoji: "🏔️",
      pronunciation: "[mon-ta-nyah]",
      exampleItalian: "La montagna è molto alta.",
      exampleUrdu: "پہاڑ بہت اونچا ہے۔"
    },
    {
      id: "sec8-l3-mc-viaggiare",
      type: "MultipleChoice",
      question: "\"سفر کرنا\" کو Italian میں کیا کہتے ہیں؟",
      options: ["Viaggiare", "Giocare", "Dipingere", "Studiare"],
      correctAnswer: "Viaggiare"
    },
    {
      id: "sec8-l3-tf-vacanza",
      type: "TrueFalse",
      statement: "Vacanza = کام",
      isTrue: false,
      correctAnswer: "چھٹی"
    },
    {
      id: "sec8-l3-sr-vado-mare",
      type: "SentenceReconstruction",
      question: "ہم آج سمندر پر جاتے ہیں",
      correctSequence: ["Andiamo", "al", "mare", "oggi"],
      shuffledWords: ["Andiamo", "al", "mare", "oggi", "montagna", "scuola"],
      direction: "ur-to-it"
    },
    {
      id: "sec8-l3-sr-viaggio-italia",
      type: "SentenceReconstruction",
      question: "Voglio viaggiare in Italia",
      correctSequence: ["میں", "اٹلی", "کا", "سفر", "کرنا", "چاہتا", "ہوں"],
      shuffledWords: ["میں", "اٹلی", "کا", "سفر", "کرنا", "چاہتا", "ہوں", "پاکستان"],
      direction: "it-to-ur"
    }
  ]
};
