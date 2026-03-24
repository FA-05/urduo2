import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { useProgressStore } from '../../store/progressStore';
import { useStreak } from '../../hooks/useStreak';
import { useHearts } from '../../hooks/useHearts';
import { useSound } from '../../hooks/useSound';
import { ConfettiCannon } from '../../components/ui/ConfettiCannon';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyle } from '../../utils/rtl';

export default function LessonCompleteScreen() {
  const { id, xp, heartsLost, score } = useLocalSearchParams<{ id: string, xp: string, heartsLost: string, score: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { addXP, completeLesson } = useProgressStore();
  const { incrementStreak } = useStreak();
  const { hearts } = useHearts();
  const { playSound } = useSound();

  const trophyScale = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const card1Y = useSharedValue(100);
  const card2Y = useSharedValue(100);
  const card3Y = useSharedValue(100);
  const cardsOpacity = useSharedValue(0);

  useEffect(() => {
    // Process results
    const numXp = parseInt(xp || '10', 10);
    const numHeartsLost = parseInt(heartsLost || '0', 10);
    const numScore = parseInt(score || '100', 10);

    addXP(numXp);
    if (id !== 'practice') {
      completeLesson(id as string);
    }
    incrementStreak();
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
    card3Y.value = withDelay(700, withSpring(0, cardSpringConfig));
    cardsOpacity.value = withDelay(500, withSpring(1));

  }, []);

  const trophyStyle = useAnimatedStyle(() => ({
    transform: [{ scale: trophyScale.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }));

  const getCardStyle = (translateY: Animated.SharedValue<number>) => useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: cardsOpacity.value,
  }));

  const handleNextLesson = () => {
    router.replace('/(tabs)/');
  };

  const handlePracticeAgain = () => {
    router.replace(`/lesson/${id}`);
  };

  return (
    <View style={styles.container}>
      <ConfettiCannon />

      <View style={[styles.topHalf, { paddingTop: insets.top + Layout.spacing.xxl }]}>
        <Animated.Text style={[styles.trophy, trophyStyle]}>🏆</Animated.Text>
        <Animated.Text style={[styles.title, urduStyle, titleStyle]}>بہت شاندار!</Animated.Text>
      </View>

      <View style={[styles.bottomHalf, { paddingBottom: insets.bottom + Layout.spacing.xl }]}>
        <View style={styles.statsRow}>
          <Animated.View style={[styles.statCardWrapper, getCardStyle(card1Y)]}>
            <Card style={styles.statCard}>
              <Text style={styles.statLabel}>⭐ XP</Text>
              <Text style={[styles.statValue, { color: Colors.goldDark }]}>+{xp}</Text>
            </Card>
          </Animated.View>

          <Animated.View style={[styles.statCardWrapper, getCardStyle(card2Y)]}>
            <Card style={styles.statCard}>
              <Text style={styles.statLabel}>❤️ Lives</Text>
              <Text style={[styles.statValue, { color: Colors.redDark }]}>{hearts}/5</Text>
            </Card>
          </Animated.View>

          <Animated.View style={[styles.statCardWrapper, getCardStyle(card3Y)]}>
            <Card style={styles.statCard}>
              <Text style={styles.statLabel}>✅ Score</Text>
              <Text style={[styles.statValue, { color: Colors.greenDark }]}>{score}%</Text>
            </Card>
          </Animated.View>
        </View>

        <View style={styles.actionsContainer}>
          <Button
            title="اگلا سبق"
            onPress={handleNextLesson}
            size="lg"
            style={styles.button}
          />
          <Button
            title="دوبارہ کریں"
            variant="outline"
            onPress={handlePracticeAgain}
            size="lg"
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topHalf: {
    flex: 1,
    backgroundColor: Colors.greenDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: Layout.radius.xl * 2,
    borderBottomRightRadius: Layout.radius.xl * 2,
    ...Layout.shadow.card,
  },
  trophy: {
    fontSize: 100,
    marginBottom: Layout.spacing.lg,
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: 32,
    color: Colors.white,
    textAlign: 'center',
  },
  bottomHalf: {
    flex: 1.5,
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.xxl,
    justifyContent: 'space-between',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Layout.spacing.sm,
  },
  statCardWrapper: {
    flex: 1,
  },
  statCard: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.lg,
    paddingHorizontal: Layout.spacing.sm,
  },
  statLabel: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.textMid,
    marginBottom: Layout.spacing.sm,
  },
  statValue: {
    fontFamily: Fonts.extraBold,
    fontSize: 20,
  },
  actionsContainer: {
    gap: Layout.spacing.md,
  },
  button: {
    width: '100%',
  },
});