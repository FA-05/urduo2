import { useEffect } from 'react';
import { useProgressStore } from '../store/progressStore';

export const useProgress = () => {
  const {
    completedLessons,
    masteredWords,
    weakWords,
    streak,
    longestStreak,
    totalExercises,
    correctExercises,
    completeLesson,
    markWordMastered,
    markWordWeak,
    unmarkWordWeak,
    recordExerciseResult,
    updateStreak,
    loadProgress,
    resetProgress,
  } = useProgressStore();

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return {
    completedLessons,
    masteredWords,
    weakWords,
    streak,
    longestStreak,
    totalExercises,
    correctExercises,
    completeLesson,
    markWordMastered,
    markWordWeak,
    unmarkWordWeak,
    recordExerciseResult,
    updateStreak,
    loadProgress,
    resetProgress,
  };
};