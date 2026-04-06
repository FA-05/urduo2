import { create } from 'zustand';
import { Storage, StorageKeys } from '../utils/storage';
import { getSupabase, isSupabaseConfigured } from '../utils/supabase';
import NetInfo from '@react-native-community/netinfo';

export type AppLanguage = 'ur' | 'it' | 'en' | 'hi' | 'de' | 'fr';

export const LANGUAGES: { code: AppLanguage; label: string; flag: string; comingSoon?: boolean }[] = [
  { code: 'ur', label: 'Urdu', flag: '🇵🇰' },
  { code: 'it', label: 'Italian', flag: '🇮🇹' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳', comingSoon: true },
  { code: 'de', label: 'German', flag: '🇩🇪', comingSoon: true },
  { code: 'fr', label: 'French', flag: '🇫🇷', comingSoon: true },
];

export interface SettingsState {
  soundEnabled: boolean;
  dailyReminderEnabled: boolean;
  avatar: string;
  username: string;
  language: AppLanguage;
}

export interface SettingsStore extends SettingsState {
  isHydrated: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  setDailyReminderEnabled: (enabled: boolean) => void;
  setAvatar: (avatar: string) => void;
  setUsername: (username: string) => void;
  setLanguage: (language: AppLanguage) => void;
  loadSettings: () => Promise<void>;
  syncSettings: () => Promise<void>;
  resetSettings: () => void;
}

const defaultState: SettingsState = {
  soundEnabled: true,
  dailyReminderEnabled: true,
  avatar: '👤',
  username: 'New Learner',
  language: 'ur',
};

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  ...defaultState,
  isHydrated: false,
  setSoundEnabled: (enabled) => {
    set({ soundEnabled: enabled });
    Storage.set(StorageKeys.SETTINGS, get());
  },
  setDailyReminderEnabled: (enabled) => {
    set({ dailyReminderEnabled: enabled });
    Storage.set(StorageKeys.SETTINGS, get());
  },
  setAvatar: (avatar) => {
    set({ avatar });
    Storage.set(StorageKeys.SETTINGS, get());
  },
  setUsername: (username) => {
    set({ username });
    Storage.set(StorageKeys.SETTINGS, get());
    get().syncSettings();
  },
  setLanguage: (language) => {
    set({ language });
    Storage.set(StorageKeys.SETTINGS, get());
  },
  syncSettings: async () => {
    if (!isSupabaseConfigured()) return;

    // Check for Wi-Fi connection
    try {
      const netInfo = await NetInfo.fetch();
      if (netInfo.type !== 'wifi') return;
    } catch (e) {
      return;
    }

    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({ username: get().username })
      .eq('id', user.id);

    if (error) {
      console.error('Error syncing settings to Supabase:', error);
    }
  },
  loadSettings: async () => {
    // No-op if already hydrated
    if (get().isHydrated) return;

    // 1. Load from local storage immediately
    try {
      const localData = await Storage.get<SettingsState>(StorageKeys.SETTINGS);
      if (localData) {
        set({ ...localData, isHydrated: true });
      } else {
        set({ isHydrated: true });
      }
    } catch (e) {
      console.warn('Error loading local settings:', e);
      set({ isHydrated: true });
    }

    // 2. Sync username from Supabase in the background (non-blocking)
    if (!isSupabaseConfigured()) return;

    (async () => {
      try {
        const supabase = getSupabase();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .single();

          if (data && !error) {
            set({ username: data.username });
            Storage.set(StorageKeys.SETTINGS, get());
          }
        }
      } catch (e) {
        console.warn('Supabase settings load failed (skipping):', e);
      }
    })();
  },
  resetSettings: () => {
    set(defaultState);
    Storage.set(StorageKeys.SETTINGS, defaultState);
  },
}));