import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getVocabularyForTopic } from '../../data/vocabulary';
import { useProgressStore } from '../../store/progressStore';
import { CardStack } from '../../components/vocabulary/CardStack';
import { SwipeActions } from '../../components/vocabulary/SwipeActions';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';

export default function TopicVocabularyScreen() {
  const { topic, sectionIcon } = useLocalSearchParams<{ topic: string; sectionIcon?: string }>();
  const router = useRouter();
  const words = getVocabularyForTopic(topic || '');
  const insets = useSafeAreaInsets();
  const { markWordMastered, markWordWeak } = useProgressStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const advanceCard = useCallback(() => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      router.back();
    }
  }, [currentIndex, words.length, router]);

  const handleSwipeRight = useCallback((wordId: string) => {
    markWordMastered(wordId);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    advanceCard();
  }, [markWordMastered, advanceCard]);

  const handleSwipeLeft = useCallback((wordId: string) => {
    markWordWeak(wordId);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    advanceCard();
  }, [markWordWeak, advanceCard]);

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  if (words.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={Colors.jade} />
          </Pressable>
          <Text style={styles.title}>Error</Text>
          <View style={{ width: 38 }} />
        </View>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>No words found for this topic.</Text>
        </View>
      </View>
    );
  }

  const progress = words.length > 0 ? (currentIndex + 1) / words.length : 0;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={Colors.jade} />
          </Pressable>
          <View style={styles.titleContainer}>
            <View style={styles.titleRow}>
              {sectionIcon && <Text style={styles.headerIcon}>{sectionIcon}</Text>}
              <Text style={styles.title} numberOfLines={1}>{topic}</Text>
            </View>
            <Text style={styles.progressLabel}>
              {currentIndex + 1} of {words.length} words
            </Text>
          </View>
          <View style={{ width: 38 }} />
        </View>

        {/* Progress Track */}
        <ProgressBar
          progress={progress}
          height={4}
          style={styles.progressTrack}
        />

        {/* Hint Strip */}
        <View style={styles.hintStrip}>
          <View style={styles.hintItem}>
            <View style={[styles.hintDot, { backgroundColor: Colors.rose }]} />
            <Text style={[styles.hintText, { color: Colors.rose }]}>Don't know</Text>
          </View>
          <View style={styles.hintItem}>
            <View style={[styles.hintDot, { backgroundColor: Colors.inkMuted }]} />
            <Text style={styles.hintText}>Tap to flip</Text>
          </View>
          <View style={styles.hintItem}>
            <Text style={[styles.hintText, { color: Colors.jadeVivid }]}>Know it</Text>
            <View style={[styles.hintDot, { backgroundColor: Colors.jadeVivid }]} />
          </View>
        </View>

        {/* Card Area */}
        <View style={styles.cardArea}>
          <CardStack
            words={words}
            currentIndex={currentIndex}
            onSwipeRight={handleSwipeRight}
            onSwipeLeft={handleSwipeLeft}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />
        </View>

        {/* Swipe Actions */}
        <View style={styles.actionsArea}>
          <SwipeActions
            onDunno={() => handleSwipeLeft(words[currentIndex].id)}
            onFlip={handleFlip}
            onKnow={() => handleSwipeRight(words[currentIndex].id)}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    backgroundColor: Colors.white,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: Layout.radius.sm,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.jadeBorder10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: Layout.spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerIcon: {
    fontSize: 18,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 17,
    color: Colors.ink,
  },
  progressLabel: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Colors.inkMuted,
    marginTop: 2,
  },
  progressTrack: {
    borderRadius: 0,
  },
  hintStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.sm,
    backgroundColor: Colors.creamDeep,
  },
  hintItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  hintDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  hintText: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    color: Colors.inkMuted,
  },
  cardArea: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Layout.spacing.lg,
  },
  actionsArea: {
    paddingBottom: Layout.spacing.md,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.rose,
  },
});
