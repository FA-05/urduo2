import { useEffect, useState, useCallback } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import SplashScreenAnimated from '../components/ui/SplashScreenAnimated';

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
import { Storage, StorageKeys } from '../utils/storage';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // ── Sora (Latin / Italian + UI) ──────────────────────────────────────────
    'Sora_400Regular':            require('../assets/fonts/Sora_400Regular.ttf'),
    'Sora_500Medium':             require('../assets/fonts/Sora_500Medium.ttf'),
    'Sora_600SemiBold':           require('../assets/fonts/Sora_600SemiBold.ttf'),
    'Sora_700Bold':               require('../assets/fonts/Sora_700Bold.ttf'),
    'Sora_800ExtraBold':          require('../assets/fonts/Sora_800ExtraBold.ttf'),
    // ── Noto Nastaliq Urdu ───────────────────────────────────────────────────
    'NotoNastaliqUrdu_400Regular': require('../assets/fonts/NotoNastaliqUrdu_400Regular.ttf'),
    'NotoNastaliqUrdu_500Medium':  require('../assets/fonts/NotoNastaliqUrdu_500Medium.ttf'),
    'NotoNastaliqUrdu_600SemiBold':require('../assets/fonts/NotoNastaliqUrdu_600SemiBold.ttf'),
    'NotoNastaliqUrdu_700Bold':    require('../assets/fonts/NotoNastaliqUrdu_700Bold.ttf'),
  });

  const [showSplash, setShowSplash] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  const { session, initialized, initialize, isGuest } = useAuthStore();
  const { loadProgress } = useProgressStore();
  const { loadSettings } = useSettingsStore();
  const segments = useSegments();
  const router = useRouter();

  const onSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  // Enable automatic sync when Wi-Fi is connected
  useNetworkSync();

  // Handle daily reminders
  useDailyReminder();

  useEffect(() => {
    initialize();
    loadProgress();
    loadSettings();

    // Check if user has completed onboarding
    Storage.get<boolean>(StorageKeys.ONBOARDED).then((value) => {
      setHasOnboarded(value === true);
    });

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

  const isReady = fontsLoaded && initialized && hasOnboarded !== null;

  // Hide the native splash screen as soon as everything is ready,
  // our custom animated splash takes over from here.
  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  // Handle routing after the animated splash finishes
  useEffect(() => {
    if (!isReady || showSplash) return;

    const inAuthGroup = segments[0] === 'auth';
    const inTabsGroup = segments[0] === '(tabs)';
    const inLessonGroup = segments[0] === 'lesson';
    const inCompletionGroup = segments[0] === 'completion';
    const inOnboarding = segments[0] === 'onboarding';

    // 0. First-time user → show onboarding
    //    If we're navigating away from onboarding (e.g. to auth), re-check storage
    //    so the state catches up with what the onboarding screen persisted.
    if (!hasOnboarded) {
      if (inOnboarding) return;

      Storage.get<boolean>(StorageKeys.ONBOARDED).then((value) => {
        if (value === true) {
          setHasOnboarded(true);
        } else {
          router.replace('/onboarding');
        }
      });
      return;
    }

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
  }, [session, initialized, segments, fontsLoaded, isGuest, showSplash, hasOnboarded]);

  // Prevent rendering anything until everything is ready
  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style={showSplash ? 'light' : 'auto'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="lesson/[id]" />
        <Stack.Screen name="completion" />
      </Stack>
      {showSplash && <SplashScreenAnimated onFinish={onSplashFinish} />}
    </SafeAreaProvider>
  );
}
