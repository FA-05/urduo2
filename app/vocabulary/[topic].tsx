import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getVocabularyForTopic } from '../../data/vocabulary';
import { VocabularyCard } from '../../components/exercises/VocabularyCard';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyle } from '../../utils/rtl';
import { VocabularyCardExercise } from '../../data';

export default function TopicVocabularyScreen() {
  const { topic, sectionIcon } = useLocalSearchParams<{ topic: string, sectionIcon?: string }>();
  const router = useRouter();
  const words = getVocabularyForTopic(topic || '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const insets = useSafeAreaInsets();

  if (words.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
             <Text style={styles.backButtonText}>←</Text>
          </Pressable>
          <Text style={styles.title}>Error</Text>
          <View style={{ width: 44 }} />
        </View>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>No words found for this topic.</Text>
        </View>
      </View>
    );
  }

  const currentWord = words[currentIndex];
  const exerciseData: VocabularyCardExercise = {
    ...currentWord,
    type: 'VocabularyCard',
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>
        <View style={styles.titleContainer}>
          <View style={styles.titleRow}>
            {sectionIcon && <Text style={styles.headerIcon}>{sectionIcon}</Text>}
            <Text style={styles.title}>{topic}</Text>
          </View>
          <Text style={styles.progress}>
            {currentIndex + 1} / {words.length}
          </Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      {/* Card Area */}
      <View style={styles.content}>
        <VocabularyCard
          key={currentWord.id}
          data={exerciseData}
          onAnswer={() => {}} 
          disabled={false}
          showActions={false}
        />
      </View>

      {/* Navigation Area */}
      <View style={styles.navigationFooter}>
        <Pressable 
          onPress={handlePrevious} 
          style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
          disabled={currentIndex === 0}
        >
          <Text style={styles.navIcon}>←</Text>
          <Text style={styles.navLabel}>Back</Text>
        </Pressable>

        <View style={styles.indicatorContainer}>
          {words.map((_: any, index: number) => (
            <View 
              key={index} 
              style={[
                styles.dot, 
                index === currentIndex && styles.activeDot
              ]} 
            />
          ))}
        </View>

        <Pressable 
          onPress={handleNext} 
          style={[styles.navButton, currentIndex === words.length - 1 && styles.navButtonDisabled]}
          disabled={currentIndex === words.length - 1}
        >
          <Text style={styles.navLabel}>Next</Text>
          <Text style={styles.navIcon}>→</Text>
        </Pressable>
      </View>
    </View>
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
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.jadeBorder10,
    backgroundColor: Colors.white,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 32,
    color: Colors.jadeVivid,
    fontFamily: Fonts.bold,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.ink,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIcon: {
    fontSize: 20,
  },
  progress: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.inkMuted,
    marginTop: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
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
  navigationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.xl,
    paddingVertical: Layout.spacing.xl,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.jadeBorder10,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.xs,
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.radius.md,
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navIcon: {
    fontSize: 24,
    color: Colors.jadeVivid,
    fontFamily: Fonts.bold,
  },
  navLabel: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.jadeVivid,
  },
  indicatorContainer: {
    flexDirection: 'row',
    gap: Layout.spacing.xs,
    justifyContent: 'center',
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.jadeBorder10,
  },
  activeDot: {
    backgroundColor: Colors.jadeVivid,
    width: 20,
  },
});
