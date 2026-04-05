import { useEffect } from 'react';
import { Storage, StorageKeys } from '../utils/storage';
import { NotificationService } from '../utils/notifications';

interface DailyFirstOpen {
  date: string; // YYYY-MM-DD
  timestamp: number;
}

export const useDailyReminder = () => {
  useEffect(() => {
    const checkDailyReminder = async () => {
      try {
        // 1. Request permissions (silent if already granted)
        const granted = await NotificationService.requestPermissions();
        if (!granted) return;

        // 2. Get today's date string
        const today = new Date().toISOString().split('T')[0];
        
        // 3. Get last recorded first open
        const lastFirstOpen = await Storage.get<DailyFirstOpen>(StorageKeys.DAILY_FIRST_OPEN);

        // 4. If it's a new day or no record exists
        if (!lastFirstOpen || lastFirstOpen.date !== today) {
          const now = new Date();
          const timestamp = now.getTime();
          
          // Save today's first open
          await Storage.set(StorageKeys.DAILY_FIRST_OPEN, {
            date: today,
            timestamp: timestamp
          });

          // Schedule reminder for tomorrow at the same time
          // We use the current hour and minute
          const hour = now.getHours();
          const minute = now.getMinutes();
          
          await NotificationService.scheduleDailyReminder(hour, minute);
          console.log(`Daily reminder scheduled for tomorrow at ${hour}:${minute}`);
        } else {
          // If we already opened today, we might want to ensure a reminder is still scheduled for tomorrow
          // (Usually it's already scheduled from the first open, but let's be safe or just leave it)
          console.log(`Already recorded first open for today: ${lastFirstOpen.date}`);
        }
      } catch (error) {
        console.error('Error in useDailyReminder:', error);
      }
    };

    checkDailyReminder();
  }, []);
};
