import { useState, useEffect, useCallback } from 'react';
import Constants from 'expo-constants';
import type { RewardedAd as RewardedAdType } from 'react-native-google-mobile-ads';
import { AdUnits } from '../constants/Ads';

const IS_EXPO_GO = Constants.appOwnership === 'expo';

// Dynamic require to prevent crashes in Expo Go
let AdsModule: any = null;
if (!IS_EXPO_GO) {
  try {
    AdsModule = require('react-native-google-mobile-ads');
  } catch (e) {
    console.warn('Failed to load react-native-google-mobile-ads. Ad logic will be mocked.');
  }
}

export const useAdManager = () => {
  const [rewardedAd, setRewardedAd] = useState<RewardedAdType | null>(null);
  const [interstitialAd, setInterstitialAd] = useState<any>(null); // Type 'any' to avoid rigidness with InterstitialAd type
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInterstitialLoaded, setIsInterstitialLoaded] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  const rewardedUnitId = AdUnits.REWARDED_VIDEO;
  const interstitialUnitId = AdUnits.INTERSTITIAL;

  const loadRewardedAd = useCallback(() => {
    if (IS_EXPO_GO || !AdsModule || !rewardedUnitId) {
      setIsLoaded(true);
      return () => {};
    }

    try {
      const ad = AdsModule.RewardedAd.createForAdRequest(rewardedUnitId, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['education', 'languages', 'learning'],
      });

      const unsubscribers: (() => void)[] = [];
      unsubscribers.push(ad.addAdEventListener(AdsModule.RewardedAdEventType.LOADED, () => setIsLoaded(true)));
      unsubscribers.push(ad.addAdEventListener(AdsModule.AdEventType.OPENED, () => setIsShowing(true)));
      unsubscribers.push(ad.addAdEventListener(AdsModule.AdEventType.CLOSED, () => {
        setIsShowing(false);
        setIsLoaded(false);
        loadRewardedAd();
      }));

      ad.load();
      setRewardedAd(ad);
      return () => unsubscribers.forEach(u => u());
    } catch (e) {
      console.error('[AdManager] Error loading rewarded ad:', e);
      return () => {};
    }
  }, [rewardedUnitId]);

  const loadInterstitialAd = useCallback(() => {
    if (IS_EXPO_GO || !AdsModule || !interstitialUnitId) {
      setIsInterstitialLoaded(true);
      return () => {};
    }

    try {
      const ad = AdsModule.InterstitialAd.createForAdRequest(interstitialUnitId, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['education', 'languages', 'learning'],
      });

      const unsubscribers: (() => void)[] = [];
      unsubscribers.push(ad.addAdEventListener(AdsModule.AdEventType.LOADED, () => setIsInterstitialLoaded(true)));
      unsubscribers.push(ad.addAdEventListener(AdsModule.AdEventType.OPENED, () => setIsShowing(true)));
      unsubscribers.push(ad.addAdEventListener(AdsModule.AdEventType.CLOSED, () => {
        setIsShowing(false);
        setIsInterstitialLoaded(false);
        loadInterstitialAd();
      }));

      ad.load();
      setInterstitialAd(ad);
      return () => unsubscribers.forEach(u => u());
    } catch (e) {
      console.error('[AdManager] Error loading interstitial ad:', e);
      return () => {};
    }
  }, [interstitialUnitId]);

  useEffect(() => {
    const cleanupRewarded = loadRewardedAd();
    const cleanupInterstitial = loadInterstitialAd();
    return () => {
      cleanupRewarded();
      cleanupInterstitial();
    };
  }, [loadRewardedAd, loadInterstitialAd]);

  const showAd = async (onReward: () => void) => {
    if (IS_EXPO_GO || !AdsModule) {
      setIsShowing(true);
      setTimeout(() => {
        setIsShowing(false);
        onReward();
      }, 1500);
      return;
    }

    if (rewardedAd && isLoaded) {
      const rewardListener = rewardedAd.addAdEventListener(
        AdsModule.RewardedAdEventType.EARNED_REWARD,
        () => onReward()
      );

      try {
        await rewardedAd.show();
      } catch (e) {
        console.error('[AdManager] Failed to show rewarded ad:', e);
        rewardListener();
      }
    } else {
      loadRewardedAd();
    }
  };

  const showInterstitialAd = async () => {
    if (IS_EXPO_GO || !AdsModule) {
      console.log('[AdManager] Showing mock interstitial ad...');
      setIsShowing(true);
      setTimeout(() => setIsShowing(false), 2000);
      return;
    }

    if (interstitialAd && isInterstitialLoaded) {
      try {
        await interstitialAd.show();
      } catch (e) {
        console.error('[AdManager] Failed to show interstitial ad:', e);
      }
    } else {
      loadInterstitialAd();
    }
  };

  return {
    isLoaded,
    isInterstitialLoaded,
    isShowing,
    showAd,
    showInterstitialAd,
    loadAd: loadRewardedAd,
    isMock: IS_EXPO_GO || !AdsModule,
  };
};
