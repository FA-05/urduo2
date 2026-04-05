export type ExerciseType = 'VocabularyCard' | 'MultipleChoice' | 'TrueFalse' | 'SentenceReconstruction';

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

export interface SentenceReconstructionExercise extends BaseExercise {
  type: 'SentenceReconstruction';
  question: string;
  correctSequence: string[];
  shuffledWords: string[];
  direction: 'it-to-ur' | 'ur-to-it';
}

export type Exercise = VocabularyCardExercise | MultipleChoiceExercise | TrueFalseExercise | SentenceReconstructionExercise;

export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  exercises: Exercise[];
}

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  icon?: string;
  lessons: Lesson[];
}

// ── Lightweight metadata types (no exercises loaded) ──────────────────────────
export interface LessonMeta {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SectionMeta {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  lessons: LessonMeta[];
}
