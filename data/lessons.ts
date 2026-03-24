export type ExerciseType = 'VocabularyCard' | 'MultipleChoice' | 'TrueFalse';

export interface BaseExercise {
  id: string;
  type: ExerciseType;
}

export interface VocabularyCardExercise extends BaseExercise {
  type: 'VocabularyCard';
  italian: string;
  urdu: string;
  emoji: string;
  pronunciation: string;
  exampleItalian: string;
  exampleUrdu: string;
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'MultipleChoice';
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface TrueFalseExercise extends BaseExercise {
  type: 'TrueFalse';
  statement: string;
  isTrue: boolean;
  correctAnswer?: string;
}

export type Exercise = VocabularyCardExercise | MultipleChoiceExercise | TrueFalseExercise;

export interface Lesson {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  icon: string;
  exercises: Exercise[];
}

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  lessons: Lesson[];
}

export const lessonsData: Section[] = [
  {
    id: "section-1",
    title: "بنیادی باتیں",
    subtitle: "Basics",
    lessons: [
      {
        id: "lesson-1",
        title: "Greetings",
        description: "سلام دعا",
        xpReward: 10,
        icon: "👋",
        exercises: [
          {
            id: "l1-e1",
            type: "VocabularyCard",
            italian: "Ciao",
            urdu: "ہیلو",
            emoji: "👋",
            pronunciation: "[chow]",
            exampleItalian: "Ciao! Come stai?",
            exampleUrdu: "ہیلو! تم کیسے ہو؟",
          },
          {
            id: "l1-e2",
            type: "MultipleChoice",
            question: "\"Buongiorno\" کا مطلب کیا ہے؟",
            options: ["صبح بخیر", "شام بخیر", "خداحافظ", "شکریہ"],
            correctAnswer: "صبح بخیر",
          },
          {
            id: "l1-e3",
            type: "TrueFalse",
            statement: "Arrivederci = خداحافظ",
            isTrue: true,
          },
          {
            id: "l1-e4",
            type: "VocabularyCard",
            italian: "Grazie",
            urdu: "شکریہ",
            emoji: "🙏",
            pronunciation: "[graht-see-eh]",
            exampleItalian: "Grazie mille!",
            exampleUrdu: "بہت بہت شکریہ!",
          },
          {
            id: "l1-e5",
            type: "MultipleChoice",
            question: "\"پھر ملیں گے\" کو Italian میں کیا کہتے ہیں؟",
            options: ["Ciao", "Buongiorno", "Arrivederci", "Prego"],
            correctAnswer: "Arrivederci",
          },
          {
            id: "l1-e6",
            type: "TrueFalse",
            statement: "Buonasera = صبح بخیر",
            isTrue: false,
            correctAnswer: "شام بخیر",
          },
          {
            id: "l1-e7",
            type: "VocabularyCard",
            italian: "Per favore",
            urdu: "براہ کرم",
            emoji: "🥺",
            pronunciation: "[pehr fah-voh-reh]",
            exampleItalian: "Un caffè, per favore.",
            exampleUrdu: "ایک کافی، براہ کرم۔",
          },
          {
            id: "l1-e8",
            type: "MultipleChoice",
            question: "\"Prego\" کا مطلب کیا ہے؟",
            options: ["براہ کرم", "خوش آمدید / کوئی بات نہیں", "معاف کرنا", "ہیلو"],
            correctAnswer: "خوش آمدید / کوئی بات نہیں",
          },
          {
            id: "l1-e9",
            type: "TrueFalse",
            statement: "Scusa = معاف کرنا",
            isTrue: true,
          },
          {
            id: "l1-e10",
            type: "MultipleChoice",
            question: "\"شکریہ\" کو Italian میں کیا کہتے ہیں؟",
            options: ["Grazie", "Prego", "Scusa", "Ciao"],
            correctAnswer: "Grazie",
          },
        ]
      },
      {
        id: "lesson-2",
        title: "Numbers 1–10",
        description: "گنتی",
        xpReward: 10,
        icon: "🔢",
        exercises: [
          {
            id: "l2-e1",
            type: "VocabularyCard",
            italian: "Uno",
            urdu: "ایک",
            emoji: "1️⃣",
            pronunciation: "[oo-noh]",
            exampleItalian: "Un gatto.",
            exampleUrdu: "ایک بلی۔",
          },
          {
            id: "l2-e2",
            type: "VocabularyCard",
            italian: "Due",
            urdu: "دو",
            emoji: "2️⃣",
            pronunciation: "[doo-eh]",
            exampleItalian: "Due cani.",
            exampleUrdu: "دو کتے۔",
          },
          {
            id: "l2-e3",
            type: "MultipleChoice",
            question: "\"Tre\" کا مطلب؟",
            options: ["دو", "تین", "چار", "پانچ"],
            correctAnswer: "تین",
          },
          {
            id: "l2-e4",
            type: "TrueFalse",
            statement: "Quattro = پانچ",
            isTrue: false,
            correctAnswer: "چار",
          },
          {
            id: "l2-e5",
            type: "MultipleChoice",
            question: "\"سات\" کو Italian میں کیا کہتے ہیں؟",
            options: ["Cinque", "Sei", "Sette", "Otto"],
            correctAnswer: "Sette",
          },
          {
            id: "l2-e6",
            type: "VocabularyCard",
            italian: "Otto",
            urdu: "آٹھ",
            emoji: "8️⃣",
            pronunciation: "[oht-toh]",
            exampleItalian: "Otto libri.",
            exampleUrdu: "آٹھ کتابیں۔",
          },
          {
            id: "l2-e7",
            type: "TrueFalse",
            statement: "Nove = نو",
            isTrue: true,
          },
          {
            id: "l2-e8",
            type: "MultipleChoice",
            question: "\"Dieci\" کا مطلب؟",
            options: ["نو", "دس", "سات", "آٹھ"],
            correctAnswer: "دس",
          },
          {
            id: "l2-e9",
            type: "VocabularyCard",
            italian: "Cinque",
            urdu: "پانچ",
            emoji: "5️⃣",
            pronunciation: "[cheen-kweh]",
            exampleItalian: "Cinque mele.",
            exampleUrdu: "پانچ سیب۔",
          },
          {
            id: "l2-e10",
            type: "MultipleChoice",
            question: "\"چھ\" کو Italian میں کیا کہتے ہیں؟",
            options: ["Tre", "Quattro", "Cinque", "Sei"],
            correctAnswer: "Sei",
          },
        ]
      },
      {
        id: "lesson-3",
        title: "Colors",
        description: "رنگ",
        xpReward: 10,
        icon: "🌈",
        exercises: [
          {
            id: "l3-e1",
            type: "VocabularyCard",
            italian: "Rosso",
            urdu: "لال",
            emoji: "🔴",
            pronunciation: "[rohs-soh]",
            exampleItalian: "Il cielo non è rosso.",
            exampleUrdu: "آسمان لال نہیں ہے۔",
          },
          {
            id: "l3-e2",
            type: "MultipleChoice",
            question: "\"Blu\" کا مطلب؟",
            options: ["نیلا", "لال", "پیلا", "سبز"],
            correctAnswer: "نیلا",
          },
          {
            id: "l3-e3",
            type: "TrueFalse",
            statement: "Verde = پیلا",
            isTrue: false,
            correctAnswer: "سبز",
          },
          {
            id: "l3-e4",
            type: "VocabularyCard",
            italian: "Giallo",
            urdu: "پیلا",
            emoji: "🟡",
            pronunciation: "[jahl-loh]",
            exampleItalian: "Il sole è giallo.",
            exampleUrdu: "سورج پیلا ہے۔",
          },
          {
            id: "l3-e5",
            type: "TrueFalse",
            statement: "Bianco = سفید",
            isTrue: true,
          },
          {
            id: "l3-e6",
            type: "MultipleChoice",
            question: "\"کالا\" کو Italian میں کیا کہتے ہیں؟",
            options: ["Nero", "Bianco", "Rosso", "Blu"],
            correctAnswer: "Nero",
          },
          {
            id: "l3-e7",
            type: "VocabularyCard",
            italian: "Arancione",
            urdu: "نارنجی",
            emoji: "🟠",
            pronunciation: "[ah-rahn-choh-neh]",
            exampleItalian: "L'arancia è arancione.",
            exampleUrdu: "نارنجی نارنجی ہے۔",
          },
          {
            id: "l3-e8",
            type: "MultipleChoice",
            question: "\"Rosa\" کا مطلب؟",
            options: ["گلابی", "نیلا", "کالا", "سفید"],
            correctAnswer: "گلابی",
          },
          {
            id: "l3-e9",
            type: "TrueFalse",
            statement: "Viola = بنفشی",
            isTrue: true,
          },
          {
            id: "l3-e10",
            type: "MultipleChoice",
            question: "\"سبز\" کو Italian میں کیا کہتے ہیں؟",
            options: ["Verde", "Giallo", "Blu", "Nero"],
            correctAnswer: "Verde",
          },
        ]
      }
    ]
  },
  {
    id: "section-2",
    title: "روزمرہ زندگی",
    subtitle: "Everyday Life",
    lessons: [
      {
        id: "lesson-4",
        title: "Food & Drinks",
        description: "کھانا پینا",
        xpReward: 15,
        icon: "🍎",
        exercises: [
          {
            id: "l4-e1",
            type: "VocabularyCard",
            italian: "Mela",
            urdu: "سیب",
            emoji: "🍎",
            pronunciation: "[meh-lah]",
            exampleItalian: "Io mangio una mela.",
            exampleUrdu: "میں ایک سیب کھاتا ہوں۔",
          },
          {
            id: "l4-e2",
            type: "MultipleChoice",
            question: "\"Acqua\" کا مطلب؟",
            options: ["پانی", "دودھ", "چائے", "کافی"],
            correctAnswer: "پانی",
          },
          {
            id: "l4-e3",
            type: "TrueFalse",
            statement: "Pane = روٹی",
            isTrue: true,
          },
          {
            id: "l4-e4",
            type: "VocabularyCard",
            italian: "Latte",
            urdu: "دودھ",
            emoji: "🥛",
            pronunciation: "[laht-teh]",
            exampleItalian: "Io bevo il latte.",
            exampleUrdu: "میں دودھ پیتا ہوں۔",
          },
          {
            id: "l4-e5",
            type: "MultipleChoice",
            question: "\"چائے\" کو Italian میں کیا کہتے ہیں؟",
            options: ["Acqua", "Latte", "Tè", "Caffè"],
            correctAnswer: "Tè",
          },
          {
            id: "l4-e6",
            type: "TrueFalse",
            statement: "Uovo = مچھلی",
            isTrue: false,
            correctAnswer: "انڈہ",
          },
          {
            id: "l4-e7",
            type: "VocabularyCard",
            italian: "Pollo",
            urdu: "مرغی",
            emoji: "🍗",
            pronunciation: "[pohl-loh]",
            exampleItalian: "Il pollo è delizioso.",
            exampleUrdu: "مرغی مزیدار ہے۔",
          },
          {
            id: "l4-e8",
            type: "MultipleChoice",
            question: "\"Caffè\" کا مطلب؟",
            options: ["پانی", "کافی", "چائے", "دودھ"],
            correctAnswer: "کافی",
          },
          {
            id: "l4-e9",
            type: "TrueFalse",
            statement: "Pizza = پیزا",
            isTrue: true,
          },
          {
            id: "l4-e10",
            type: "MultipleChoice",
            question: "\"پانی\" کو Italian میں کیا کہتے ہیں؟",
            options: ["Latte", "Tè", "Acqua", "Vino"],
            correctAnswer: "Acqua",
          },
        ]
      },
      {
        id: "lesson-5",
        title: "Animals",
        description: "جانور",
        xpReward: 15,
        icon: "🐾",
        exercises: [
          {
            id: "l5-e1",
            type: "VocabularyCard",
            italian: "Cane",
            urdu: "کتا",
            emoji: "🐕",
            pronunciation: "[kah-neh]",
            exampleItalian: "Il cane abbaia.",
            exampleUrdu: "کتا بھونکتا ہے۔",
          },
          {
            id: "l5-e2",
            type: "MultipleChoice",
            question: "\"Gatto\" کا مطلب؟",
            options: ["کتا", "بلی", "گھوڑا", "پرندہ"],
            correctAnswer: "بلی",
          },
          {
            id: "l5-e3",
            type: "TrueFalse",
            statement: "Cavallo = بھیڑ",
            isTrue: false,
            correctAnswer: "گھوڑا",
          },
          {
            id: "l5-e4",
            type: "VocabularyCard",
            italian: "Uccello",
            urdu: "پرندہ",
            emoji: "🐦",
            pronunciation: "[oot-chel-loh]",
            exampleItalian: "L'uccello vola.",
            exampleUrdu: "پرندہ اڑتا ہے۔",
          },
          {
            id: "l5-e5",
            type: "TrueFalse",
            statement: "Pesce = مچھلی",
            isTrue: true,
          },
          {
            id: "l5-e6",
            type: "MultipleChoice",
            question: "\"شیر\" کو Italian میں کیا کہتے ہیں؟",
            options: ["Leone", "Tigre", "Orso", "Elefante"],
            correctAnswer: "Leone",
          },
          {
            id: "l5-e7",
            type: "VocabularyCard",
            italian: "Mucca",
            urdu: "گائے",
            emoji: "🐄",
            pronunciation: "[mook-kah]",
            exampleItalian: "La mucca mangia l'erba.",
            exampleUrdu: "گائے گھاس کھاتی ہے۔",
          },
          {
            id: "l5-e8",
            type: "MultipleChoice",
            question: "\"Coniglio\" کا مطلب؟",
            options: ["ہاتھی", "خرگوش", "گھوڑا", "کتا"],
            correctAnswer: "خرگوش",
          },
          {
            id: "l5-e9",
            type: "TrueFalse",
            statement: "Elefante = ہاتھی",
            isTrue: true,
          },
          {
            id: "l5-e10",
            type: "MultipleChoice",
            question: "\"بلی\" کو Italian میں کیا کہتے ہیں؟",
            options: ["Cane", "Gatto", "Uccello", "Pesce"],
            correctAnswer: "Gatto",
          },
        ]
      },
      {
        id: "lesson-6",
        title: "Home & Family",
        description: "گھر اور خاندان",
        xpReward: 15,
        icon: "🏠",
        exercises: [
          {
            id: "l6-e1",
            type: "VocabularyCard",
            italian: "Casa",
            urdu: "گھر",
            emoji: "🏠",
            pronunciation: "[kah-zah]",
            exampleItalian: "La mia casa è grande.",
            exampleUrdu: "میرا گھر بڑا ہے۔",
          },
          {
            id: "l6-e2",
            type: "MultipleChoice",
            question: "\"Madre\" کا مطلب؟",
            options: ["باپ", "ماں", "بھائی", "بہن"],
            correctAnswer: "ماں",
          },
          {
            id: "l6-e3",
            type: "TrueFalse",
            statement: "Padre = باپ",
            isTrue: true,
          },
          {
            id: "l6-e4",
            type: "VocabularyCard",
            italian: "Fratello",
            urdu: "بھائی",
            emoji: "👦",
            pronunciation: "[frah-tel-loh]",
            exampleItalian: "Mio fratello è alto.",
            exampleUrdu: "میرا بھائی لمبا ہے۔",
          },
          {
            id: "l6-e5",
            type: "MultipleChoice",
            question: "\"بہن\" کو Italian میں کیا کہتے ہیں؟",
            options: ["Fratello", "Sorella", "Padre", "Madre"],
            correctAnswer: "Sorella",
          },
          {
            id: "l6-e6",
            type: "TrueFalse",
            statement: "Nonno = بیٹا",
            isTrue: false,
            correctAnswer: "دادا/نانا",
          },
          {
            id: "l6-e7",
            type: "VocabularyCard",
            italian: "Figlia",
            urdu: "بیٹی",
            emoji: "👧",
            pronunciation: "[feel-lyah]",
            exampleItalian: "Mia figlia è brava.",
            exampleUrdu: "میری بیٹی اچھی ہے۔",
          },
          {
            id: "l6-e8",
            type: "MultipleChoice",
            question: "\"Cucina\" کا مطلب؟",
            options: ["کمرہ", "باورچی خانہ", "گھر", "باغ"],
            correctAnswer: "باورچی خانہ",
          },
          {
            id: "l6-e9",
            type: "TrueFalse",
            statement: "Camera = کمرہ",
            isTrue: true,
          },
          {
            id: "l6-e10",
            type: "MultipleChoice",
            question: "\"گھر\" کو Italian میں کیا کہتے ہیں؟",
            options: ["Casa", "Cucina", "Camera", "Porta"],
            correctAnswer: "Casa",
          },
        ]
      }
    ]
  }
];

export const getLessonById = (id: string): Lesson | undefined => {
  for (const section of lessonsData) {
    const lesson = section.lessons.find((l) => l.id === id);
    if (lesson) return lesson;
  }
  return undefined;
};