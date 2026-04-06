import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProgress } from '../../hooks/useProgress';
import { useHearts, MAX_HEARTS } from '../../hooks/useHearts';
import { useSettingsStore } from '../../store/settingsStore';
import { lessonsData } from '../../data';
import { LessonPath } from '../../components/home/LessonPath';
import { StreakWidget } from '../../components/home/StreakWidget';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { completedLessons, streak, loadProgress } = useProgress();
  const { hearts, timeUntilNextHeart } = useHearts();
  const { loadSettings } = useSettingsStore();

  const [showHeartsModal, setShowHeartsModal] = React.useState(false);
  const [showStreakModal, setShowStreakModal] = React.useState(false);

  useEffect(() => {
    loadProgress();
    loadSettings();
  }, []);

  const handleLessonPress = (id: string, status: 'completed' | 'active' | 'locked') => {
    if (status === 'locked') return;
    if (hearts === 0) {
      setShowHeartsModal(true);
      return;
    }
    router.push(`/lesson/${id}`);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Lessons</Text>
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

      <LessonPath
        sections={lessonsData}
        completedLessons={completedLessons}
        onLessonPress={handleLessonPress}
      />

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
  pageTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 18,
    color: Colors.ink,
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
