import { create } from 'zustand';
import { Storage, StorageKeys } from '../utils/storage';

export interface SettingsState {
  soundEnabled: boolean;
  dailyReminderEnabled: boolean;
  dailyGoalXP: number;
  avatar: string;
  username: string;
  hasOnboarded: boolean;
}

export interface SettingsStore extends SettingsState {
  setSoundEnabled: (enabled: boolean) => void;
  setDailyReminderEnabled: (enabled: boolean) => void;
  setDailyGoalXP: (xp: number) => void;
  setAvatar: (avatar: string) => void;
  setUsername: (username: string) => void;
  setHasOnboarded: (onboarded: boolean) => void;
  loadSettings: () => Promise<void>;
  resetSettings: () => void;
}

const defaultState: SettingsState = {
  soundEnabled: true,
  dailyReminderEnabled: true,
  dailyGoalXP: 20, // Default to regular
  avatar: '👤',
  username: 'New Learner',
  hasOnboarded: false,
};

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  ...defaultState,
  setSoundEnabled: (enabled) => {
    set({ soundEnabled: enabled });
    Storage.set(StorageKeys.SETTINGS, get());
  },
  setDailyReminderEnabled: (enabled) => {
    set({ dailyReminderEnabled: enabled });
    Storage.set(StorageKeys.SETTINGS, get());
  },
  setDailyGoalXP: (xp) => {
    set({ dailyGoalXP: xp });
    Storage.set(StorageKeys.SETTINGS, get());
  },
  setAvatar: (avatar) => {
    set({ avatar });
    Storage.set(StorageKeys.SETTINGS, get());
  },
  setUsername: (username) => {
    set({ username });
    Storage.set(StorageKeys.SETTINGS, get());
  },
  setHasOnboarded: (onboarded) => {
    set({ hasOnboarded: onboarded });
    Storage.set(StorageKeys.SETTINGS, get());
  },
  loadSettings: async () => {
    const data = await Storage.get<SettingsState>(StorageKeys.SETTINGS);
    if (data) {
      set(data);
    }
  },
  resetSettings: () => {
    set(defaultState);
    Storage.set(StorageKeys.SETTINGS, defaultState);
  },
}));