import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProgress } from '../../hooks/useProgress';
import { useHearts } from '../../hooks/useHearts';
import { useStreak } from '../../hooks/useStreak';
import { useSettingsStore } from '../../store/settingsStore';
import { lessonsData } from '../../data/lessons';
import { LessonPath } from '../../components/home/LessonPath';
import { StreakWidget } from '../../components/home/StreakWidget';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyle } from '../../utils/rtl';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { completedLessons, totalXP, weeklyXP, loadProgress } = useProgress();
  const { hearts, timeUntilNextHeart, loadHearts } = useHearts();
  const { streak, loadStreak } = useStreak();
  const { hasOnboarded, dailyGoalXP, loadSettings } = useSettingsStore();

  const [isLoading, setIsLoading] = React.useState(true);
  const [showHeartsModal, setShowHeartsModal] = React.useState(false);
  const [showStreakModal, setShowStreakModal] = React.useState(false);
  const [todayXP, setTodayXP] = React.useState(0);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        loadProgress(),
        loadHearts(),
        loadStreak(),
        loadSettings(),
      ]);
      setIsLoading(false);
    };
    loadData();
  }, [loadProgress, loadHearts, loadStreak, loadSettings]);

  useEffect(() => {
    if (!isLoading && !hasOnboarded) {
      router.replace('/onboarding/welcome');
    }
  }, [isLoading, hasOnboarded]);

  useEffect(() => {
      const today = new Date().toISOString().split('T')[0];
      setTodayXP(weeklyXP[today] || 0);
  }, [totalXP, weeklyXP]);

  const handleLessonPress = (id: string, status: 'completed' | 'active' | 'locked') => {
    if (status === 'locked') return;
    if (hearts === 0) {
      setShowHeartsModal(true);
      return;
    }
    router.push(`/lesson/${id}`);
  };

  if (isLoading || !hasOnboarded) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.topRow}>
          <Text style={styles.flagIcon}>🇮🇹</Text>
          <Text style={styles.appTitle}>ItalianoUrdu</Text>
          <View style={{ flex: 1 }} />
          <StreakWidget streak={streak} onPress={() => setShowStreakModal(true)} />
          <Pressable style={styles.heartsBadge} onPress={() => setShowHeartsModal(true)}>
            <Text style={styles.heartsText}>❤️ {hearts}</Text>
          </Pressable>
        </View>
        <View style={styles.xpRow}>
          <ProgressBar progress={Math.min(todayXP / dailyGoalXP, 1)} style={{ flex: 1 }} />
          <Text style={styles.xpText}>{todayXP}/{dailyGoalXP} XP</Text>
        </View>
      </View>

      {/* Path */}
      <LessonPath
        sections={lessonsData}
        completedLessons={completedLessons}
        onLessonPress={handleLessonPress}
      />

      {/* Hearts Modal */}
      <Modal visible={showHeartsModal} onClose={() => setShowHeartsModal(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalEmoji}>❤️</Text>
          <Text style={[styles.modalTitle, urduStyle]}>
            {hearts === 0 ? 'دل ختم ہو گئے!' : 'آپ کے پاس دل ہیں'}
          </Text>
          {hearts < 5 ? (
             <Text style={[styles.modalSubtitle, urduStyle]}>
               اگلا دل ملنے میں وقت: {timeUntilNextHeart ? formatTime(timeUntilNextHeart) : '...'}
             </Text>
          ) : (
             <Text style={[styles.modalSubtitle, urduStyle]}>
               آپ کے دل بھرے ہوئے ہیں! سیکھنا جاری رکھیں۔
             </Text>
          )}

          <Button
            title="جاری رکھیں"
            onPress={() => setShowHeartsModal(false)}
            style={{ width: '100%', marginTop: Layout.spacing.xl }}
          />
        </View>
      </Modal>

      {/* Streak Modal */}
      <Modal visible={showStreakModal} onClose={() => setShowStreakModal(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalEmoji}>🔥</Text>
          <Text style={[styles.modalTitle, urduStyle]}>
            {streak} دن کا سلسلہ!
          </Text>
          <Text style={[styles.modalSubtitle, urduStyle]}>
            روزانہ مشق کریں تاکہ آپ کا سلسلہ ٹوٹنے نہ پائے۔
          </Text>
          <Button
            title="بہت خوب!"
            onPress={() => setShowStreakModal(false)}
            style={{ width: '100%', marginTop: Layout.spacing.xl }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
    gap: Layout.spacing.sm,
  },
  flagIcon: {
    fontSize: 24,
  },
  appTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 20,
    color: Colors.textDark,
  },
  heartsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Layout.radius.md,
    ...Layout.shadow.card,
  },
  heartsText: {
    fontFamily: Fonts.extraBold,
    fontSize: 16,
    color: Colors.redDark,
  },
  xpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.md,
  },
  xpText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.textMid,
  },
  modalContent: {
    alignItems: 'center',
  },
  modalEmoji: {
    fontSize: 64,
    marginBottom: Layout.spacing.md,
  },
  modalTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 24,
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: Layout.spacing.sm,
  },
  modalSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textMid,
    textAlign: 'center',
  },
});