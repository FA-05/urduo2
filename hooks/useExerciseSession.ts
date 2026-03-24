import { useState } from 'react';
import { Exercise } from '../data/lessons';

export interface AnswerRecord {
  exerciseId: string;
  correct: boolean;
  timeMs: number;
}

export interface SessionState {
  currentIndex: number;       // 0–9
  exercises: Exercise[];      // shuffled
  answers: AnswerRecord[];    // { exerciseId, correct, timeMs }
  heartsLost: number;         // 0–5
  xpEarned: number;
  startTime: number;          // Date.now()
}

export const useExerciseSession = (initialExercises: Exercise[]) => {
  const [sessionState, setSessionState] = useState<SessionState>({
    currentIndex: 0,
    exercises: initialExercises,
    answers: [],
    heartsLost: 0,
    xpEarned: 0,
    startTime: Date.now(),
  });

  const recordAnswer = (exerciseId: string, correct: boolean) => {
    setSessionState((prev) => {
      const timeMs = Date.now() - prev.startTime;
      return {
        ...prev,
        answers: [...prev.answers, { exerciseId, correct, timeMs }],
        heartsLost: correct ? prev.heartsLost : prev.heartsLost + 1,
        currentIndex: correct ? prev.currentIndex + 1 : prev.currentIndex,
      };
    });
  };

  const advanceExercise = () => {
    setSessionState((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex + 1,
      startTime: Date.now(),
    }));
  };

  const addXP = (xp: number) => {
    setSessionState((prev) => ({
      ...prev,
      xpEarned: prev.xpEarned + xp,
    }));
  };

  const resetSession = () => {
    setSessionState({
      currentIndex: 0,
      exercises: initialExercises,
      answers: [],
      heartsLost: 0,
      xpEarned: 0,
      startTime: Date.now(),
    });
  };

  return {
    ...sessionState,
    recordAnswer,
    advanceExercise,
    addXP,
    resetSession,
  };
};