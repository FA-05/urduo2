// expo-notifications remote push was removed from Expo Go in SDK 53.
// TurboModule Invariant Violations cannot be caught with try/catch, so we
// check appOwnership BEFORE calling require() to avoid touching the native module.
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { Storage, StorageKeys } from './storage';

const IS_EXPO_GO = Constants.appOwnership === 'expo';

type NotificationsModule = typeof import('expo-notifications');
let Notifications: NotificationsModule | null = null;

if (!IS_EXPO_GO) {
  Notifications = require('expo-notifications');
  // Configure foreground notification handling
  Notifications!.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
} else {
  console.log('expo-notifications skipped in Expo Go (SDK 53+).');
}

export const NotificationService = {
  /**
   * Request permissions for notifications
   */
  requestPermissions: async (): Promise<boolean> => {
    if (Platform.OS === 'web' || !Notifications) return false;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  },

  /**
   * Schedule a notification for when hearts are full
   */
  scheduleHeartsFullNotification: async (fullAtTimestamp: number) => {
    if (!Notifications) return;

    // 1. Cancel any existing heart notifications first
    await NotificationService.cancelHeartNotifications();

    const now = Date.now();
    const secondsToWait = Math.max(1, Math.floor((fullAtTimestamp - now) / 1000));

    // Only schedule if it's in the future
    if (secondsToWait > 0) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Hearts are full! 💖",
          body: "Your energy is back! Ready for another Italian lesson?",
          data: { type: 'hearts_full' },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: secondsToWait,
        },
        identifier: 'hearts_full',
      });
      console.log(`Scheduled hearts full notification in ${secondsToWait}s`);
    }
  },

  /**
   * Cancel the heart full notification
   */
  cancelHeartNotifications: async () => {
    if (!Notifications) return;
    await Notifications.cancelScheduledNotificationAsync('hearts_full');
  },

  /**
   * Schedule a daily reminder for tomorrow at the given time
   */
  scheduleDailyReminder: async (hour: number, minute: number) => {
    if (!Notifications) return;

    // Cancel existing daily reminder
    await NotificationService.cancelDailyReminder();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Lesson Time! 🇮🇹",
        body: "Time for your daily Italian practice. Keep the streak alive!",
        data: { type: 'daily_reminder' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
      identifier: 'daily_reminder',
    });
    console.log(`Scheduled daily reminder for ${hour}:${minute.toString().padStart(2, '0')}`);
  },

  /**
   * Cancel the daily reminder
   */
  cancelDailyReminder: async () => {
    if (!Notifications) return;
    await Notifications.cancelScheduledNotificationAsync('daily_reminder');
  },

  /**
   * Cancel all scheduled notifications
   */
  cancelAllNotifications: async () => {
    if (!Notifications) return;
    await Notifications.cancelAllScheduledNotificationsAsync();
  }
};

