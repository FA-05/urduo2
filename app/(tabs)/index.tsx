import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useProgress } from '../../hooks/useProgress';
import { useHearts, MAX_HEARTS } from '../../hooks/useHearts';
import { useSettingsStore } from '../../store/settingsStore';
import { orderedSectionsMeta } from '../../data/registry-meta';
import { StreakWidget } from '../../components/home/StreakWidget';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { StatCard } from '../../components/ui/StatCard';
import { ActionCard } from '../../components/ui/ActionCard';
import { Colors } from '../../constants/colors';
import { Fonts, TypeScale } from '../../constants/fonts';
import { Layout } from '../../constants/layout';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    completedLessons,
    streak,
    longestStreak,
    totalExercises,
    correctExercises,
    masteredWords,
    weakWords,
    loadProgress,
  } = useProgress();
  const { hearts, timeUntilNextHeart } = useHearts();
  const { username, avatar, loadSettings } = useSettingsStore();

  const [showStreakModal, setShowStreakModal] = React.useState(false);
  const [showHeartsModal, setShowHeartsModal] = React.useState(false);

  useEffect(() => {
    loadProgress();
    loadSettings();
  }, []);

  // Derive stats
  const allLessons = orderedSectionsMeta.flatMap((s) => s.lessons);
  const totalLessons = allLessons.length;
  const completedCount = completedLessons.length;
  const accuracy =
    totalExercises > 0 ? Math.round((correctExercises / totalExercises) * 100) : 0;

  // Find next lesson to continue
  const nextLesson = allLessons.find((l) => !completedLessons.includes(l.id));

  // Find which section the next lesson belongs to
  const currentSection = nextLesson
    ? orderedSectionsMeta.find((s) => s.lessons.some((l) => l.id === nextLesson.id))
    : null;

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleContinue = () => {
    if (!nextLesson) return;
    if (hearts === 0) {
      setShowHeartsModal(true);
      return;
    }
    router.push(`/lesson/${nextLesson.id}`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.mascot}
          resizeMode="contain"
        />
        <View style={styles.headerRight}>
        <StreakWidget streak={streak} onPress={() => setShowStreakModal(true)} />
        <Pressable
          style={styles.heartsBadge}
          onPress={() => setShowHeartsModal(true)}
          hitSlop={Layout.hitSlop}
        >
          <Text style={styles.heartsIcon}>❤️</Text>
          <Text style={styles.heartsCount}>{hearts}</Text>
        </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome / Continue Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(500).springify()}>
          <Card style={styles.continueCard}>
            <View style={styles.continueHeader}>
              <View style={styles.continueInfo}>
                <Text style={styles.welcomeText}>
                  {completedCount > 0 ? 'Continue Learning' : 'Start Learning'}
                </Text>
                {nextLesson ? (
                  <>
                    <Text style={styles.lessonTitle}>{nextLesson.title}</Text>
                    {currentSection && (
                      <Text style={styles.sectionLabel}>
                        {currentSection.subtitle}
                      </Text>
                    )}
                  </>
                ) : (
                  <Text style={styles.lessonTitle}>All lessons completed!</Text>
                )}
              </View>
            </View>
            {nextLesson && (
              <Button
                title="Continue"
                onPress={handleContinue}
                icon="play"
                style={styles.continueButton}
              />
            )}
          </Card>
        </Animated.View>

        {/* Stats Row */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(500).springify()}
          style={styles.statsRow}
        >
          <StatCard value={completedCount} label="Lessons" />
          <StatCard value={`${accuracy}%`} label="Accuracy" />
          <StatCard value={masteredWords.length} label="Words" />
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View entering={FadeInDown.delay(300).duration(500).springify()}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <ActionCard
              label="Lesson Path"
              icon="map-outline"
              iconColor={Colors.jade}
              iconBg={Colors.jadeTint12}
              onPress={() => router.push('/(tabs)/path')}
            />
            <ActionCard
              label="Vocabulary"
              icon="book-outline"
              iconColor={Colors.saffron}
              iconBg={Colors.saffronTint12}
              onPress={() => router.push('/(tabs)/vocabulary')}
            />
            <ActionCard
              label="Profile"
              icon="person-outline"
              iconColor={Colors.indigo}
              iconBg={Colors.jadeTint12}
              onPress={() => router.push('/(tabs)/profile')}
            />
          </View>
        </Animated.View>

        {/* Words to Review */}
        {weakWords.length > 0 && (
          <Animated.View entering={FadeInDown.delay(400).duration(500).springify()}>
            <Pressable
              style={styles.reviewCard}
              onPress={() => router.push('/(tabs)/vocabulary')}
            >
              <View style={styles.reviewLeft}>
                <View style={styles.reviewIconWrap}>
                  <Ionicons name="refresh-outline" size={20} color={Colors.saffron} />
                </View>
                <View>
                  <Text style={styles.reviewTitle}>Words to Review</Text>
                  <Text style={styles.reviewSub}>
                    {weakWords.length} word{weakWords.length !== 1 ? 's' : ''} need practice
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.inkMuted} />
            </Pressable>
          </Animated.View>
        )}

        {/* Progress Overview */}
        <Animated.View entering={FadeInDown.delay(500).duration(500).springify()}>
          <Text style={styles.sectionTitle}>Progress</Text>
          <Card style={styles.progressCard}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Lessons completed</Text>
              <Text style={styles.progressValue}>
                {completedCount}/{totalLessons}
              </Text>
            </View>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${Math.round((completedCount / totalLessons) * 100)}%` },
                ]}
              />
            </View>

            <View style={[styles.progressRow, { marginTop: 16 }]}>
              <Text style={styles.progressLabel}>Current streak</Text>
              <Text style={styles.progressValue}>{streak} days</Text>
            </View>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Longest streak</Text>
              <Text style={styles.progressValue}>{longestStreak} days</Text>
            </View>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Total exercises</Text>
              <Text style={styles.progressValue}>{totalExercises}</Text>
            </View>
          </Card>
        </Animated.View>
      </ScrollView>

      {/* Modals */}
      <Modal visible={showHeartsModal} onClose={() => setShowHeartsModal(false)}>
        <View style={styles.modalBody}>
          <Text style={styles.modalEmoji}>❤️</Text>
          <Text style={styles.modalTitle}>
            {hearts === 0 ? 'Out of Hearts!' : 'You have Hearts'}
          </Text>
          {hearts < MAX_HEARTS ? (
            <Text style={styles.modalSub}>
              Next heart in:{' '}
              {timeUntilNextHeart ? formatTime(timeUntilNextHeart) : '...'}
            </Text>
          ) : (
            <Text style={styles.modalSub}>Your hearts are full! Keep learning.</Text>
          )}
          <Button
            title="Got it"
            onPress={() => setShowHeartsModal(false)}
            style={styles.modalButton}
          />
        </View>
      </Modal>

      <Modal visible={showStreakModal} onClose={() => setShowStreakModal(false)}>
        <View style={styles.modalBody}>
          <Text style={styles.modalEmoji}>🔥</Text>
          <Text style={styles.modalTitle}>{streak} Day Streak!</Text>
          <Text style={styles.modalSub}>Practice daily to keep your streak alive.</Text>
          <Button
            title="Great!"
            onPress={() => setShowStreakModal(false)}
            style={styles.modalButton}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mascot: {
    width: 36,
    height: 36,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  heartsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.roseTint10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
    borderColor: Colors.roseBorder25,
  },
  heartsIcon: { fontSize: 15 },
  heartsCount: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.roseDim,
  },
  scrollContent: {
    padding: Layout.spacing.md,
    gap: 20,
  },

  // ── Continue Card ──
  continueCard: {
    padding: Layout.spacing.lg,
    borderRadius: Layout.radius.xl,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.jadeBorder08,
  },
  continueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  continueInfo: {
    flex: 1,
    marginRight: 12,
  },
  welcomeText: {
    fontFamily: Fonts.semiBold,
    fontSize: TypeScale.body,
    color: Colors.inkSoft,
    marginBottom: 4,
  },
  lessonTitle: {
    fontFamily: Fonts.bold,
    fontSize: TypeScale.h2,
    color: Colors.ink,
    marginBottom: 4,
  },
  sectionLabel: {
    fontFamily: Fonts.medium,
    fontSize: TypeScale.caption,
    color: Colors.inkMuted,
  },
  continueEmoji: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.jadeTint06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    marginTop: 4,
  },

  // ── Stats Row ──
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  // ── Quick Actions ──
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: TypeScale.h3,
    color: Colors.ink,
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  // ── Review Card ──
  reviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.saffronTint12,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.saffronBorder30,
  },
  reviewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reviewIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewTitle: {
    fontFamily: Fonts.bold,
    fontSize: TypeScale.body,
    color: Colors.saffronDim,
  },
  reviewSub: {
    fontFamily: Fonts.regular,
    fontSize: TypeScale.caption,
    color: Colors.inkMuted,
    marginTop: 1,
  },

  // ── Progress Card ──
  progressCard: {
    padding: Layout.spacing.lg,
    borderRadius: Layout.radius.lg,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.jadeBorder08,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontFamily: Fonts.medium,
    fontSize: TypeScale.body,
    color: Colors.inkSoft,
  },
  progressValue: {
    fontFamily: Fonts.bold,
    fontSize: TypeScale.body,
    color: Colors.ink,
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.lockedFill,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: Colors.jadeVivid,
  },

  // ── Modals ──
  modalBody: {
    alignItems: 'center',
    gap: Layout.spacing.md,
  },
  modalEmoji: {
    fontSize: 56,
    marginBottom: Layout.spacing.xs,
  },
  modalTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 26,
    color: Colors.ink,
    textAlign: 'center',
  },
  modalSub: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.inkSoft,
    textAlign: 'center',
    lineHeight: 24,
  },
  modalButton: {
    width: '100%',
    marginTop: Layout.spacing.md,
  },
});
