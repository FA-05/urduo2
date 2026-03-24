import { lessonsData, VocabularyCardExercise } from './lessons';

export interface VocabularyWord {
  id: string;
  italian: string;
  urdu: string;
  emoji: string;
  pronunciation: string;
  exampleItalian: string;
  exampleUrdu: string;
}

export const extractVocabulary = (): VocabularyWord[] => {
  const vocab: VocabularyWord[] = [];

  lessonsData.forEach(section => {
    section.lessons.forEach(lesson => {
      lesson.exercises.forEach(exercise => {
        if (exercise.type === 'VocabularyCard') {
          const vocabEx = exercise as VocabularyCardExercise;
          vocab.push({
            id: vocabEx.id,
            italian: vocabEx.italian,
            urdu: vocabEx.urdu,
            emoji: vocabEx.emoji,
            pronunciation: vocabEx.pronunciation,
            exampleItalian: vocabEx.exampleItalian,
            exampleUrdu: vocabEx.exampleUrdu,
          });
        }
      });
    });
  });

  return vocab;
};

export const masterVocabularyList = extractVocabulary();

export const getWordById = (id: string): VocabularyWord | undefined => {
  return masterVocabularyList.find(word => word.id === id);
};