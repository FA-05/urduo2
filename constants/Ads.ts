import { Platform } from 'react-native';
import Constants from 'expo-constants';

const IS_EXPO_GO = Constants.appOwnership === 'expo';

// Real IDs from environment variables (set in .env)
const REWARDED_ANDROID = process.env.EXPO_PUBLIC_AD_MOB_REWARDED_UNIT_ID_ANDROID;
const REWARDED_IOS = process.env.EXPO_PUBLIC_AD_MOB_REWARDED_UNIT_ID_IOS;
const INTERSTITIAL_ANDROID = process.env.EXPO_PUBLIC_AD_MOB_INTERSTITIAL_UNIT_ID_ANDROID;
const INTERSTITIAL_IOS = process.env.EXPO_PUBLIC_AD_MOB_INTERSTITIAL_UNIT_ID_IOS;

// Test IDs
const TEST_REWARDED_ANDROID = 'ca-app-pub-3940256099942544/5224354917';
const TEST_REWARDED_IOS = 'ca-app-pub-3940256099942544/1712485313';
const TEST_INTERSTITIAL_ANDROID = 'ca-app-pub-3940256099942544/1033173712';
const TEST_INTERSTITIAL_IOS = 'ca-app-pub-3940256099942544/4411468910';

// Avoid loading react-native-google-mobile-ads in Expo Go
let TestIds: any = null;
if (!IS_EXPO_GO) {
  try {
    TestIds = require('react-native-google-mobile-ads').TestIds;
  } catch (e) {
    console.warn('Failed to load TestIds from react-native-google-mobile-ads');
  }
}

export const AdUnits = {
  REWARDED_VIDEO: Platform.select({
    ios: REWARDED_IOS || TEST_REWARDED_IOS,
    android: REWARDED_ANDROID || TEST_REWARDED_ANDROID,
    default: TestIds?.REWARDED ?? TEST_REWARDED_ANDROID,
  }),
  INTERSTITIAL: Platform.select({
    ios: INTERSTITIAL_IOS || TEST_INTERSTITIAL_IOS,
    android: INTERSTITIAL_ANDROID || TEST_INTERSTITIAL_ANDROID,
    default: TestIds?.INTERSTITIAL ?? TEST_INTERSTITIAL_ANDROID,
  }),
};
