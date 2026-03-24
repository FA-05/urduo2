import { useState, useEffect, useCallback } from 'react';
import { Storage, StorageKeys } from '../utils/storage';

export interface StreakState {
  currentStreak: number;
  lastCompletedDate: string | null;
  longestStreak: number;
}

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const useStreak = () => {
  const [streak, setStreak] = useState<number>(0);
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null);
  const [longestStreak, setLongestStreak] = useState<number>(0);

  const loadStreak = useCallback(async () => {
    const data = await Storage.get<StreakState>(StorageKeys.STREAK);
    if (data) {
      calculateStreak(data.currentStreak, data.lastCompletedDate, data.longestStreak);
    } else {
      setStreak(0);
      setLastCompletedDate(null);
      setLongestStreak(0);
    }
  }, []);

  const saveStreak = async (newStreak: number, newDate: string | null, newLongest: number) => {
    const newState: StreakState = { currentStreak: newStreak, lastCompletedDate: newDate, longestStreak: newLongest };
    await Storage.set(StorageKeys.STREAK, newState);
    setStreak(newStreak);
    setLastCompletedDate(newDate);
    setLongestStreak(newLongest);
  };

  const calculateStreak = (currentStreak: number, lastDate: string | null, longest: number) => {
    if (!lastDate) {
      setStreak(0);
      setLastCompletedDate(null);
      setLongestStreak(longest);
      return;
    }

    const today = getTodayDateString();
    if (today === lastDate) {
      setStreak(currentStreak);
      setLastCompletedDate(lastDate);
      setLongestStreak(longest);
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    if (lastDate === yesterdayString) {
      setStreak(currentStreak);
      setLastCompletedDate(lastDate);
      setLongestStreak(longest);
    } else {
      setStreak(0);
      setLastCompletedDate(lastDate);
      setLongestStreak(longest);
    }
  };

  useEffect(() => {
    loadStreak();
  }, [loadStreak]);

  const incrementStreak = async () => {
    const today = getTodayDateString();
    if (lastCompletedDate === today) return;

    let newStreak = streak;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    if (lastCompletedDate === yesterdayString) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }

    const newLongest = Math.max(newStreak, longestStreak);
    await saveStreak(newStreak, today, newLongest);
  };

  return {
    streak,
    lastCompletedDate,
    longestStreak,
    incrementStreak,
    loadStreak,
  };
};