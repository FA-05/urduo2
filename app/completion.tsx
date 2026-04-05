import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  SharedValue,
} from 'react-native-reanimated';
import { useProgressStore } from '../store/progressStore';
import { useCompletionStore } from '../store/completionStore';
import { useHearts, MAX_HEARTS } from '../hooks/useHearts';
import { useSound } from '../hooks/useSound';
import { useAdManager } from '../hooks/useAdManager';
import { ConfettiCannon } from '../components/ui/ConfettiCannon';
import { Button } from '../components/ui/Button';
import { AdRewardModal } from '../components/ui/AdRewardModal';
import { Card } from '../components/ui/Card';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';
import { Layout } from '../constants/layout';
import { urduStyle, urduStyleLarge } from '../utils/rtl';
import { SparkleGroup } from '../components/ui/Sparkles';

export default function LessonCompleteScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { data: completionData, clearCompletionData } = useCompletionStore();
  const { completeLesson, updateStreak } = useProgressStore();
  const { hearts, refillHearts } = useHearts();
  const { playSound } = useSound();
  const { isLoaded, isInterstitialLoaded, showAd, showInterstitialAd } = useAdManager();

  const [isAdModalVisible, setIsAdModalVisible] = React.useState(false);

  // Read all data from the store (no URL params)
  const lessonId = completionData?.lessonId ?? '';
  const score = completionData?.score ?? 0;
  const answers = completionData?.answers ?? {};
  const totalQuestions = Object.keys(answers).length || 0;
  const correctAnswers = Object.values(answers).filter(v => v === true).length;

  const trophyScale = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const card1Y = useSharedValue(100);
  const card2Y = useSharedValue(100);
  const cardsOpacity = useSharedValue(0);

  useEffect(() => {
    // Safety: if we got here with no data, go back to tabs
    if (!completionData) {
      router.replace('/(tabs)');
      return;
    }

    if (lessonId !== 'practice') {
      completeLesson(lessonId);
    }

    updateStreak();
    playSound('complete');

    // Animations
    trophyScale.value = withSpring(1.2, { damping: 10, stiffness: 100 }, (isFinished) => {
      if (isFinished) {
        trophyScale.value = withSpring(1);
      }
    });

    titleOpacity.value = withDelay(300, withSpring(1));

    const cardSpringConfig = { damping: 12, stiffness: 90 };
    card1Y.value = withDelay(500, withSpring(0, cardSpringConfig));
    card2Y.value = withDelay(600, withSpring(0, cardSpringConfig));
    cardsOpacity.value = withDelay(500, withSpring(1));

    // Ads logic: 50% chance for a general ad (interstitial)
    const roll = Math.random();
    if (roll < 0.5) {
      const timer = setTimeout(() => {
        showInterstitialAd();
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Secondary logic: if hearts === 0, always show the refill modal (if ad didn't roll or as an option)
    if (hearts === 0 && roll >= 0.5) {
      const timer = setTimeout(() => {
        setIsAdModalVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleWatchAd = async () => {
    setIsAdModalVisible(false);
    await showAd(() => {
      refillHearts();
      playSound('correct');
    });
  };

  const trophyStyle = useAnimatedStyle(() => ({
    transform: [{ scale: trophyScale.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }));

  const getCardStyle = (translateY: SharedValue<number>) => useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: cardsOpacity.value,
  }));


  const handlePracticeAgain = () => {
    clearCompletionData();
    router.replace({
      pathname: '/lesson/[id]',
      params: { id: lessonId }
    });
  };

  return (
    <View style={styles.container}>
      <ConfettiCannon />

      <View style={[styles.content, { paddingTop: insets.top + Layout.spacing.md, paddingBottom: insets.bottom + Layout.spacing.lg }]}>
        <Animated.View style={[styles.successContainer, trophyStyle]}>
          <View style={styles.trophyWrapper}>
            <SparkleGroup size={140} count={10} />
            <Text style={styles.trophy}>🏆</Text>
          </View>
          <Animated.Text style={[styles.title, titleStyle]}>Lesson Complete!</Animated.Text>
          <Animated.Text style={[styles.subtitle, urduStyleLarge, titleStyle, { textAlign: 'center' }]}>بہت شاندار!</Animated.Text>
        </Animated.View>

        <View style={styles.statsRow}>
          {/* CORRECT */}
          <Animated.View style={[styles.statItem, getCardStyle(card1Y)]}>
            <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
            <Text style={[styles.statValue, { color: Colors.primary }]}>{correctAnswers}/{totalQuestions || '?'}</Text>
            <Text style={styles.statLabel}>CORRECT</Text>
          </Animated.View>

          <View style={styles.verticalDivider} />

          {/* SCORE */}
          <Animated.View style={[styles.statItem, getCardStyle(card2Y)]}>
            <Ionicons name="star" size={24} color={Colors.goldDark} />
            <Text style={[styles.statValue, { color: Colors.goldDark }]}>{score}%</Text>
            <Text style={styles.statLabel}>SCORE</Text>
          </Animated.View>

          <View style={styles.verticalDivider} />

          {/* LIVES */}
          <Animated.View style={[styles.statItem, getCardStyle(card1Y)]}>
            <Ionicons name="heart" size={24} color={Colors.error} />
            <Text style={[styles.statValue, { color: Colors.error }]}>{hearts}/{MAX_HEARTS}</Text>
            <Text style={styles.statLabel}>LIVES</Text>
          </Animated.View>
        </View>

        <View style={styles.actionsContainer}>
          <Button
            title="Retry Lesson"
            variant="primary"
            icon="refresh"
            onPress={handlePracticeAgain}
            size="lg"
            style={styles.mainButton}
          />
          <Button
            title="Home"
            variant="outline"
            icon="home"
            onPress={() => {
              clearCompletionData();
              router.replace('/(tabs)');
            }}
            size="lg"
            style={styles.mainButton}
          />
        </View>
      </View>

      <AdRewardModal
        visible={isAdModalVisible}
        onClose={() => setIsAdModalVisible(false)}
        onWatchAd={handleWatchAd}
        isLoading={!isLoaded}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.lg,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  trophyWrapper: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.md,
  },
  trophy: {
    fontSize: 70,
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: 28,
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: Layout.spacing.xs2,
  },
  subtitle: {
    fontSize: 24,
    color: Colors.textMid,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: Layout.radius.xl,
    paddingVertical: Layout.spacing.lg,
    paddingHorizontal: Layout.spacing.md,
    width: '100%',
    ...Layout.shadow.card,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: Layout.spacing.xs2,
  },
  statValue: {
    fontFamily: Fonts.extraBold,
    fontSize: 20,
    marginTop: Layout.spacing.xs2,
  },
  statLabel: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  verticalDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  actionsContainer: {
    width: '100%',
    gap: Layout.spacing.md,
  },
  mainButton: {
    width: '100%',
  },
});