import { useEffect } from 'react';
import { useProgressStore } from '../store/progressStore';

export const useProgress = () => {
  const {
    completedLessons,
    totalXP,
    weeklyXP,
    masteredWords,
    weakWords,
    addXP,
    completeLesson,
    markWordMastered,
    markWordWeak,
    unmarkWordWeak,
    loadProgress,
    resetProgress,
  } = useProgressStore();

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return {
    completedLessons,
    totalXP,
    weeklyXP,
    masteredWords,
    weakWords,
    addXP,
    completeLesson,
    markWordMastered,
    markWordWeak,
    unmarkWordWeak,
    loadProgress,
    resetProgress,
  };
};