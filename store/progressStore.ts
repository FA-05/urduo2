import { create } from 'zustand';
import { Storage, StorageKeys } from '../utils/storage';
import { getSupabase, isSupabaseConfigured } from '../utils/supabase';
import NetInfo from '@react-native-community/netinfo';

export interface ProgressState {
  completedLessons: string[];       // lesson IDs
  masteredWords: string[];          // word IDs
  weakWords: string[];
  streak: number;
  longestStreak: number;
  lastCompletedDate: string | null; // ISO string (YYYY-MM-DD)
  totalExercises: number;
  correctExercises: number;
}

export interface ProgressStore extends ProgressState {
  isHydrated: boolean;
  completeLesson: (lessonId: string) => void;
  markWordMastered: (wordId: string) => void;
  markWordWeak: (wordId: string) => void;
  unmarkWordWeak: (wordId: string) => void;
  recordExerciseResult: (isCorrect: boolean) => void;
  updateStreak: () => void;
  loadProgress: () => Promise<void>;
  syncProgress: () => Promise<void>;
  resetProgress: () => void;
}

const defaultState: ProgressState = {
  completedLessons: [],
  masteredWords: [],
  weakWords: [],
  streak: 0,
  longestStreak: 0,
  lastCompletedDate: null,
  totalExercises: 0,
  correctExercises: 0,
};

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const useProgressStore = create<ProgressStore>((set, get) => ({
  ...defaultState,
  isHydrated: false,
  completeLesson: (lessonId) => {
    set((state) => {
      if (state.completedLessons.includes(lessonId)) return state;
      const newState = { completedLessons: [...state.completedLessons, lessonId] };
      const updatedState = { ...state, ...newState };
      Storage.set(StorageKeys.PROGRESS, updatedState);
      get().syncProgress();
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
      const updatedState = { ...state, ...newState };
      Storage.set(StorageKeys.PROGRESS, updatedState);
      get().syncProgress();
      return newState;
    });
  },
  markWordWeak: (wordId) => {
    set((state) => {
      if (state.weakWords.includes(wordId)) return state;
      const newState = { weakWords: [...state.weakWords, wordId] };
      const updatedState = { ...state, ...newState };
      Storage.set(StorageKeys.PROGRESS, updatedState);
      get().syncProgress();
      return newState;
    });
  },
  unmarkWordWeak: (wordId) => {
    set((state) => {
      const newState = { weakWords: state.weakWords.filter((id) => id !== wordId) };
      const updatedState = { ...state, ...newState };
      Storage.set(StorageKeys.PROGRESS, updatedState);
      get().syncProgress();
      return newState;
    });
  },
  recordExerciseResult: (isCorrect) => {
    set((state) => {
      const newState = {
        totalExercises: state.totalExercises + 1,
        correctExercises: state.correctExercises + (isCorrect ? 1 : 0),
      };
      const updatedState = { ...state, ...newState };
      Storage.set(StorageKeys.PROGRESS, updatedState);
      get().syncProgress();
      return newState;
    });
  },
  updateStreak: () => {
    set((state) => {
      const today = getTodayDateString();
      if (state.lastCompletedDate === today) return state;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split('T')[0];

      let newStreak = state.streak;
      if (state.lastCompletedDate === yesterdayString) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }

      const newLongest = Math.max(newStreak, state.longestStreak);
      const newState = {
        streak: newStreak,
        longestStreak: newLongest,
        lastCompletedDate: today,
      };
      const updatedState = { ...state, ...newState };
      Storage.set(StorageKeys.PROGRESS, updatedState);
      get().syncProgress();
      return newState;
    });
  },
  syncProgress: async () => {
    if (!isSupabaseConfigured()) return;

    // Check for Wi-Fi connection
    try {
      const netInfo = await NetInfo.fetch();
      if (netInfo.type !== 'wifi') {
        console.log('Sync skipped: Not connected to Wi-Fi');
        return;
      }
    } catch (e) {
      console.warn('Network check failed:', e);
      return;
    }

    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const state = get();
    // Use the last completed lesson as the last_lesson_id
    const lastLessonId = state.completedLessons.length > 0 
      ? state.completedLessons[state.completedLessons.length - 1] 
      : 'lesson_1';

    const profile = {
      id: user.id,
      streak: state.streak,
      longest_streak: state.longestStreak,
      last_completed_date: state.lastCompletedDate,
      last_lesson_id: lastLessonId,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('profiles')
      .upsert(profile, { onConflict: 'id' });

    if (error) {
      console.error('Error syncing progress to Supabase:', error);
    }
  },
  loadProgress: async () => {
    // No-op if already hydrated — avoids double-loading when both _layout and
    // the home screen call this.
    if (get().isHydrated) return;

    // 1. Load from local storage immediately so the UI can render
    try {
      const localData = await Storage.get<ProgressState>(StorageKeys.PROGRESS);
      if (localData) {
        set({ ...localData, isHydrated: true });
      } else {
        set({ isHydrated: true });
      }
    } catch (e) {
      console.warn('Error loading local progress:', e);
      set({ isHydrated: true });
    }

    // 2. Sync from Supabase in the background (non-blocking)
    if (!isSupabaseConfigured()) return;

    // Fire-and-forget — don't await so the caller returns immediately
    (async () => {
      try {
        const supabase = getSupabase();
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (user && !userError) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (data && !error) {
            const remoteState: Partial<ProgressState> = {
              streak: data.streak || 0,
              longestStreak: data.longest_streak || 0,
              lastCompletedDate: data.last_completed_date || null,
            };

            if (data.last_lesson_id && !get().completedLessons.includes(data.last_lesson_id)) {
              set((state) => ({ completedLessons: [...state.completedLessons, data.last_lesson_id] }));
            }

            set(remoteState);
            Storage.set(StorageKeys.PROGRESS, { ...get(), ...remoteState });
          }
        }
      } catch (error) {
        console.warn('Supabase progress load failed (skipping):', error);
      }
    })();
  },

  resetProgress: () => {
    set(defaultState);
    Storage.set(StorageKeys.PROGRESS, defaultState);
    get().syncProgress();
  },
}));