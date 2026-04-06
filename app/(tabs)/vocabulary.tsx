import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getVocabularyBySection, VocabularyTopic } from '../../data/vocabulary';
import { lessonsData } from '../../data';
import { useProgressStore } from '../../store/progressStore';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyleLarge } from '../../utils/rtl';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { TopicCard } from '../../components/ui/TopicCard';
import { SectionHeader } from '../../components/home/SectionHeader';

// Section accent colours aligned with SectionHeader gradients
const SECTION_ACCENTS = [
  Colors.jade,
  Colors.jadeDim,
  Colors.jadeVivid,
  Colors.jade,
  Colors.jadeDim,
  Colors.jadeVivid,
  Colors.jade,
  Colors.jadeDim,
];

export default function VocabularyScreen() {
  const router = useRouter();
  const sectionVocab = getVocabularyBySection();
  const insets = useSafeAreaInsets();
  const { completedLessons } = useProgressStore();
  const [showUnlockModal, setShowUnlockModal] = React.useState(false);
  const [selectedLockedTopic, setSelectedLockedTopic] = React.useState<VocabularyTopic | null>(null);

  const unlockedLessonIds = useMemo(() => {
    const ids = new Set<string>();
    let activeFound = false;

    lessonsData.forEach(section => {
      section.lessons.forEach(lesson => {
        const isCompleted = completedLessons.includes(lesson.id);
        if (isCompleted || !activeFound) {
          ids.add(lesson.id);
          if (!isCompleted) activeFound = true;
        }
      });
    });
    return ids;
  }, [completedLessons]);

  const { totalWordsCount, unlockedWordsCount } = useMemo(() => {
    let total = 0;
    let unlocked = 0;

    sectionVocab.forEach(section => {
      section.topics.forEach(topic => {
        total += topic.words.length;
        if (unlockedLessonIds.has(topic.lessonId)) {
          unlocked += topic.words.length;
        }
      });
    });
    return { totalWordsCount: total, unlockedWordsCount: unlocked };
  }, [sectionVocab, unlockedLessonIds]);

  const handleTopicPress = (topic: any, isLocked: boolean, sectionIcon: string) => {
    if (isLocked) {
      setSelectedLockedTopic(topic);
      setShowUnlockModal(true);
      return;
    }
    router.push({
      pathname: '/vocabulary/[topic]',
      params: {
        topic: topic.title,
        sectionIcon: sectionIcon,
      },
    });
  };

  const getUnlockInfo = (lessonId: string) => {
    for (const section of lessonsData) {
      const lesson = section.lessons.find(l => l.id === lessonId);
      if (lesson) {
        return {
          sectionTitle: section.title,
          sectionSubtitle: section.subtitle,
          sectionIcon: section.icon,
          lessonTitle: lesson.title,
        };
      }
    }
    return null;
  };

  const { items, stickyHeaderIndices } = useMemo(() => {
    const items: React.ReactNode[] = [];
    const stickyHeaderIndices: number[] = [];

    sectionVocab.forEach((section, sectionIndex) => {
      stickyHeaderIndices.push(items.length);
      items.push(
        <View key={`header-${section.id}`} style={styles.stickyHeaderWrapper}>
          <SectionHeader
            title={section.title}
            subtitle={section.subtitle}
            index={sectionIndex + 1}
            icon={section.icon}
          />
        </View>
      );

      items.push(
        <View key={`grid-${section.id}`} style={styles.grid}>
          {section.topics.map((topic, topicIndex) => {
            const isUnlocked = unlockedLessonIds.has(topic.lessonId);
            const accentColor = SECTION_ACCENTS[sectionIndex % SECTION_ACCENTS.length];

            return (
              <TopicCard
                key={topicIndex}
                title={topic.title}
                emoji={topic.words[0]?.emoji || '📚'}
                wordCount={topic.words.length}
                accentColor={accentColor}
                isLocked={!isUnlocked}
                onPress={() => handleTopicPress(topic, !isUnlocked, section.icon)}
              />
            );
          })}
        </View>
      );
    });

    return { items, stickyHeaderIndices };
  }, [sectionVocab, unlockedLessonIds]);

  return (
    <View style={styles.container}>
      <View style={[styles.simpleHeader, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Vocabulary</Text>
          <View style={styles.simpleBadge}>
            <Text style={styles.simpleBadgeText}>Unlocked: {unlockedWordsCount} / {totalWordsCount}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={stickyHeaderIndices}
        scrollEventThrottle={16}
        decelerationRate="normal"
        removeClippedSubviews={Platform.OS === 'android'}
      >
        {items}
        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal visible={showUnlockModal} onClose={() => setShowUnlockModal(false)}>
        {selectedLockedTopic && (
          <View style={styles.modalBody}>
            {(() => {
              const info = getUnlockInfo(selectedLockedTopic.lessonId);
              return (
                <React.Fragment>
                  <View style={styles.modalIconContainer}>
                    <Ionicons name="lock-closed" size={42} color={Colors.saffron} />
                  </View>

                  <Text style={[styles.modalTitle, urduStyleLarge]}>یہ سبق مقفل ہے</Text>
                  <Text style={styles.modalSubUrdu}>
                    اس ذخیرہ الفاظ کو کھولنے کے لیے آپ کو سیکشن {info?.sectionIcon} "{info?.sectionTitle}" کا سبق "{info?.lessonTitle}" مکمل کرنا ہوگا۔
                  </Text>

                  <View style={styles.modalDivider} />

                  <Text style={styles.modalTitleEn}>Vocabulary Locked</Text>
                  <Text style={styles.modalSubEn}>
                    To unlock this, you need to complete the lesson "{info?.lessonTitle}" in the {info?.sectionIcon} "{info?.sectionSubtitle}" section.
                  </Text>
                </React.Fragment>
              );
            })()}

            <Button
              title="ٹھیک ہے / Got it"
              onPress={() => setShowUnlockModal(false)}
              style={styles.modalButton}
            />
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  simpleHeader: {
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.md,
    backgroundColor: Colors.white,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.sm,
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: 18,
    color: Colors.ink,
  },
  simpleBadge: {
    backgroundColor: Colors.jadeTint10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Layout.radius.full,
    marginTop: 4,
  },
  simpleBadgeText: {
    fontFamily: Fonts.extraBold,
    fontSize: 13,
    color: Colors.jade,
  },
  scrollContent: {
    paddingBottom: Layout.spacing.xxl,
  },
  stickyHeaderWrapper: {
    backgroundColor: Colors.cream,
    zIndex: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.md,
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.md,
    marginTop: Layout.spacing.sm,
  },
  modalBody: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.sm,
  },
  modalIconContainer: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: Colors.saffronTint12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.md,
  },
  modalTitle: {
    fontSize: 24,
    color: Colors.ink,
    textAlign: 'center',
    marginBottom: Layout.spacing.sm,
  },
  modalSubUrdu: {
    fontFamily: Fonts.urdu,
    fontSize: 18,
    color: Colors.inkSoft,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.sm,
  },
  modalDivider: {
    width: '30%',
    height: 1.5,
    backgroundColor: Colors.creamDeep,
    marginVertical: Layout.spacing.md,
    opacity: 0.6,
  },
  modalTitleEn: {
    fontFamily: Fonts.extraBold,
    fontSize: 17,
    color: Colors.ink,
    textAlign: 'center',
    marginBottom: Layout.spacing.xs,
  },
  modalSubEn: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.inkMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Layout.spacing.xl,
    paddingHorizontal: Layout.spacing.md,
  },
  modalButton: {
    width: '100%',
  },
});
