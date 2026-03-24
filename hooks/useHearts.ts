import { useState, useEffect, useCallback } from 'react';
import { Storage, StorageKeys } from '../utils/storage';

export interface HeartsState {
  count: number;                    // 0–5
  lastLostAt: number | null;        // timestamp
}

const MAX_HEARTS = 5;
const REGEN_TIME_MS = 30 * 60 * 1000; // 30 minutes

export const useHearts = () => {
  const [hearts, setHearts] = useState<number>(MAX_HEARTS);
  const [lastLostAt, setLastLostAt] = useState<number | null>(null);
  const [timeUntilNextHeart, setTimeUntilNextHeart] = useState<number | null>(null);

  const loadHearts = useCallback(async () => {
    const data = await Storage.get<HeartsState>(StorageKeys.HEARTS);
    if (data) {
      calculateHearts(data.count, data.lastLostAt);
    } else {
      setHearts(MAX_HEARTS);
      setLastLostAt(null);
    }
  }, []);

  const saveHearts = async (newCount: number, newLastLostAt: number | null) => {
    const newState: HeartsState = { count: newCount, lastLostAt: newLastLostAt };
    await Storage.set(StorageKeys.HEARTS, newState);
    setHearts(newCount);
    setLastLostAt(newLastLostAt);
  };

  const calculateHearts = (currentCount: number, lostAt: number | null) => {
    if (currentCount >= MAX_HEARTS || !lostAt) {
      setHearts(currentCount);
      setLastLostAt(null);
      setTimeUntilNextHeart(null);
      return;
    }

    const now = Date.now();
    const timePassed = now - lostAt;
    const heartsRecovered = Math.floor(timePassed / REGEN_TIME_MS);

    if (heartsRecovered > 0) {
      const newCount = Math.min(MAX_HEARTS, currentCount + heartsRecovered);
      const newLastLostAt = newCount === MAX_HEARTS ? null : lostAt + (heartsRecovered * REGEN_TIME_MS);
      saveHearts(newCount, newLastLostAt);
    } else {
      setHearts(currentCount);
      setLastLostAt(lostAt);
      setTimeUntilNextHeart(REGEN_TIME_MS - (timePassed % REGEN_TIME_MS));
    }
  };

  useEffect(() => {
    loadHearts();

    // Check for regeneration every minute
    const interval = setInterval(() => {
      loadHearts();
    }, 60000);

    return () => clearInterval(interval);
  }, [loadHearts]);

  const loseHeart = async () => {
    if (hearts > 0) {
      const newCount = hearts - 1;
      const newLastLostAt = newCount === MAX_HEARTS - 1 ? Date.now() : lastLostAt;
      await saveHearts(newCount, newLastLostAt);
    }
  };

  const refillHearts = async () => {
    await saveHearts(MAX_HEARTS, null);
  };

  return {
    hearts,
    lastLostAt,
    timeUntilNextHeart,
    loseHeart,
    refillHearts,
    loadHearts,
  };
};