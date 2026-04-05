import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  PROGRESS:    'app:progress',
  SETTINGS:    'app:settings',
  HEARTS:      'app:hearts',
  STREAK:      'app:streak',
  ONBOARDED:   'app:onboarded',
  VOCABULARY:  'app:vocabulary',
  GUEST:       'app:guest',
  NOTIFICATION_CONFIG: 'app:notifications',
  DAILY_FIRST_OPEN:    'app:daily_first_open',
};

export const Storage = {
  get: async <T>(key: string): Promise<T | null> => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading from storage', e);
      return null;
    }
  },
  set: async <T>(key: string, value: T): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error writing to storage', e);
    }
  },
  remove: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from storage', e);
    }
  },
  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('Error clearing storage', e);
    }
  }
};