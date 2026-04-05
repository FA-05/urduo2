import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

// TurboModule Invariant Violations cannot be caught with try/catch.
// We must check appOwnership BEFORE calling require() to avoid loading
// native-only modules in Expo Go.
const IS_EXPO_GO = Constants.appOwnership === 'expo';

let mobileAds: (() => { initialize: () => Promise<unknown> }) | null = null;
if (!IS_EXPO_GO) {
  mobileAds = require('react-native-google-mobile-ads').default;
}
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { useSettingsStore } from '../store/settingsStore';
import { useNetworkSync } from '../hooks/useNetworkSync';
import { useDailyReminder } from '../hooks/useDailyReminder';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Nunito-Regular':          require('../assets/fonts/Nunito-Regular.ttf'),
    'Nunito-SemiBold':         require('../assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-Bold':             require('../assets/fonts/Nunito-Bold.ttf'),
    'Nunito-ExtraBold':        require('../assets/fonts/Nunito-ExtraBold.ttf'),
    'NotoNastaliqUrdu-Regular': require('../assets/fonts/NotoNastaliqUrdu-Regular.ttf'),
  });

  const { session, initialized, initialize, isGuest } = useAuthStore();
  const { loadProgress } = useProgressStore();
  const { loadSettings } = useSettingsStore();
  const segments = useSegments();
  const router = useRouter();

  // Enable automatic sync when Wi-Fi is connected
  useNetworkSync();

  // Handle daily reminders
  useDailyReminder();

  useEffect(() => {
    initialize();
    loadProgress();
    loadSettings();
    
    // Initialize Google Mobile Ads only when the native module is available
    if (mobileAds && typeof mobileAds === 'function') {
      mobileAds()
        .initialize()
        .then((adapterStatuses: unknown) => {
          // Success
        })
        .catch((e: unknown) => {
          // Error
        });
    }
  }, []);

  useEffect(() => {
    if (!initialized || !fontsLoaded) return;

    SplashScreen.hideAsync();

    const inAuthGroup = segments[0] === 'auth';
    const inTabsGroup = segments[0] === '(tabs)';
    const inLessonGroup = segments[0] === 'lesson';
    const inCompletionGroup = segments[0] === 'completion';

    // 1. If not authenticated and not a guest, force them to login
    if (!session && !isGuest) {
      if (!inAuthGroup) {
        router.replace('/auth/login');
      }
    }
    // 2. Authenticated: only kick out of auth screens.
    //    Leave lesson, completion, and tabs alone — never redirect mid-navigation.
    else {
      if (inAuthGroup) {
        router.replace('/(tabs)');
      }
      // If segments[0] is empty/undefined it means navigation is still
      // initialising — only redirect to tabs if we haven't already landed
      // somewhere meaningful.
      if (!segments[0] && !inTabsGroup && !inLessonGroup && !inCompletionGroup) {
        router.replace('/(tabs)');
      }
    }
  }, [session, initialized, segments, fontsLoaded, isGuest]);

  // Prevent rendering anything until fonts and auth are ready
  if (!fontsLoaded || !initialized) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="lesson/[id]" />
        <Stack.Screen name="completion" />
      </Stack>
    </SafeAreaProvider>
  );
}