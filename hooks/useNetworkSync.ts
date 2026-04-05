import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useProgressStore } from '../store/progressStore';
import { useSettingsStore } from '../store/settingsStore';
import { useAuthStore } from '../store/authStore';

export function useNetworkSync() {
  const { syncProgress } = useProgressStore();
  const { syncSettings } = useSettingsStore();
  const { session } = useAuthStore();

  useEffect(() => {
    if (!session) return;

    // Initial sync attempt when hook is mounted (if on WiFi)
    syncProgress();
    syncSettings();

    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.type === 'wifi' && state.isConnected) {
        console.log('Wi-Fi connected, triggering sync...');
        syncProgress();
        syncSettings();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [session, syncProgress, syncSettings]);
}
