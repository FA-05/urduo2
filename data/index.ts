// Re-export all types
export type {
  ExerciseType,
  BaseExercise,
  VocabularyCardExercise,
  MultipleChoiceExercise,
  TrueFalseExercise,
  SentenceReconstructionExercise,
  Exercise,
  Lesson,
  Section,
  LessonMeta,
  SectionMeta,
} from './types';

// ── Lightweight metadata (no exercise arrays) ──────────────────────────────
// Use this for the home screen lesson path and vocabulary topic list.
export { orderedSectionsMeta as lessonsData } from './registry-meta';

// ── On-demand exercise loader ──────────────────────────────────────────────
// Use this inside the lesson screen to load exercises only when needed.
export { getLessonExercises, prefetchLesson } from './lesson-loader';

// ── Legacy helper (operates on metadata only — no exercises) ───────────────
import { orderedSectionsMeta } from './registry-meta';
import { SectionMeta, LessonMeta } from './types';

export const getLessonById = (id: string): LessonMeta | undefined => {
  for (const section of orderedSectionsMeta) {
    const lesson = section.lessons.find((l) => l.id === id);
    if (lesson) return lesson;
  }
  return undefined;
};
