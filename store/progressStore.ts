import { create } from 'zustand';
import { Storage, StorageKeys } from '../utils/storage';

export interface ProgressState {
  completedLessons: string[];       // lesson IDs
  totalXP: number;
  weeklyXP: Record<string, number>; // "2024-01-15" → xp
  masteredWords: string[];          // word IDs
  weakWords: string[];
}

export interface ProgressStore extends ProgressState {
  addXP: (xp: number) => void;
  completeLesson: (lessonId: string) => void;
  markWordMastered: (wordId: string) => void;
  markWordWeak: (wordId: string) => void;
  unmarkWordWeak: (wordId: string) => void;
  loadProgress: () => Promise<void>;
  resetProgress: () => void;
}

const defaultState: ProgressState = {
  completedLessons: [],
  totalXP: 0,
  weeklyXP: {},
  masteredWords: [],
  weakWords: [],
};

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const useProgressStore = create<ProgressStore>((set, get) => ({
  ...defaultState,
  addXP: (xp) => {
    set((state) => {
      const today = getTodayDateString();
      const currentWeeklyXP = state.weeklyXP[today] || 0;
      const newState = {
        totalXP: state.totalXP + xp,
        weeklyXP: { ...state.weeklyXP, [today]: currentWeeklyXP + xp },
      };
      Storage.set(StorageKeys.PROGRESS, { ...state, ...newState });
      return newState;
    });
  },
  completeLesson: (lessonId) => {
    set((state) => {
      if (state.completedLessons.includes(lessonId)) return state;
      const newState = { completedLessons: [...state.completedLessons, lessonId] };
      Storage.set(StorageKeys.PROGRESS, { ...state, ...newState });
      return newState;
    });
  },
  markWordMastered: (wordId) => {
    set((state) => {
      if (state.masteredWords.includes(wordId)) return state;
      const newState = {
        masteredWords: [...state.masteredWords, wordId],
        weakWords: state.weakWords.filter((id) => id !== wordId),
      };
      Storage.set(StorageKeys.PROGRESS, { ...state, ...newState });
      return newState;
    });
  },
  markWordWeak: (wordId) => {
    set((state) => {
      if (state.weakWords.includes(wordId)) return state;
      const newState = { weakWords: [...state.weakWords, wordId] };
      Storage.set(StorageKeys.PROGRESS, { ...state, ...newState });
      return newState;
    });
  },
  unmarkWordWeak: (wordId) => {
    set((state) => {
      const newState = { weakWords: state.weakWords.filter((id) => id !== wordId) };
      Storage.set(StorageKeys.PROGRESS, { ...state, ...newState });
      return newState;
    });
  },
  loadProgress: async () => {
    const data = await Storage.get<ProgressState>(StorageKeys.PROGRESS);
    if (data) {
      set(data);
    }
  },
  resetProgress: () => {
    set(defaultState);
    Storage.set(StorageKeys.PROGRESS, defaultState);
  },
}));