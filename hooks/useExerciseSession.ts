import { useState } from 'react';
import { Exercise } from '../data';

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
  startTime: number;          // Date.now()
}

export const useExerciseSession = (initialExercises: Exercise[]) => {
  const [sessionState, setSessionState] = useState<SessionState>({
    currentIndex: 0,
    exercises: initialExercises,
    answers: [],
    heartsLost: 0,
    startTime: Date.now(),
  });

  const recordAnswer = (exerciseId: string, correct: boolean) => {
    setSessionState((prev) => {
      const timeMs = Date.now() - prev.startTime;
      return {
        ...prev,
        answers: [...prev.answers, { exerciseId, correct, timeMs }],
        heartsLost: correct ? prev.heartsLost : prev.heartsLost + 1,
        currentIndex: prev.currentIndex,
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

  const resetSession = () => {
    setSessionState({
      currentIndex: 0,
      exercises: initialExercises,
      answers: [],
      heartsLost: 0,
      startTime: Date.now(),
    });
  };

  const addExercise = (exercise: Exercise) => {
    setSessionState((prev) => ({
      ...prev,
      exercises: [...prev.exercises, exercise],
    }));
  };

  return {
    ...sessionState,
    recordAnswer,
    advanceExercise,
    addExercise,
    resetSession,
  };
};