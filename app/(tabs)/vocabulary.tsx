import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getVocabularyBySection, VocabularyTopic } from '../../data/vocabulary';
import { lessonsData } from '../../data';
import { useProgressStore } from '../../store/progressStore';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { OverallRing } from '../../components/vocabulary/OverallRing';
import { FilterChip } from '../../components/vocabulary/FilterChip';
import { TopicPill } from '../../components/vocabulary/TopicPill';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { SectionHeader } from '../../components/home/SectionHeader';

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

type FilterType = 'all' | 'unlocked' | 'in_progress' | 'mastered';

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'unlocked', label: 'Unlocked' },
  { key: 'in_progress', label: 'In progress' },
  { key: 'mastered', label: 'Mastered' },
];

export default function VocabularyScreen() {
  const router = useRouter();
  const sectionVocab = getVocabularyBySection();
  const insets = useSafeAreaInsets();
  const { completedLessons, masteredWords } = useProgressStore();
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [selectedLockedTopic, setSelectedLockedTopic] = useState<VocabularyTopic | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

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

  const masteredSet = useMemo(() => new Set(masteredWords), [masteredWords]);

  const getTopicMasteredCount = (topic: VocabularyTopic) =>
    topic.words.filter(w => masteredSet.has(w.id)).length;

  const getTopicStatus = (topic: VocabularyTopic, isUnlocked: boolean): FilterType | 'locked' => {
    if (!isUnlocked) return 'locked';
    const mastered = getTopicMasteredCount(topic);
    if (mastered === topic.words.length && topic.words.length > 0) return 'mastered';
    if (mastered > 0) return 'in_progress';
    return 'unlocked';
  };

  const overallProgress = useMemo(() => {
    const allWordIds = sectionVocab.flatMap(s => s.topics.flatMap(t => t.words.map(w => w.id)));
    const mastered = allWordIds.filter(id => masteredSet.has(id)).length;
    return allWordIds.length > 0 ? mastered / allWordIds.length : 0;
  }, [sectionVocab, masteredSet]);

  const handleTopicPress = (topic: VocabularyTopic, isLocked: boolean, sectionIcon: string) => {
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

  const unlockInfo = selectedLockedTopic ? getUnlockInfo(selectedLockedTopic.lessonId) : null;

  const filteredSections = useMemo(() => {
    return sectionVocab
      .map((section, sectionIndex) => {
        const accentColor = SECTION_ACCENTS[sectionIndex % SECTION_ACCENTS.length];
        const filteredTopics = section.topics.filter(topic => {
          if (activeFilter === 'all') return true;
          const isUnlocked = unlockedLessonIds.has(topic.lessonId);
          const status = getTopicStatus(topic, isUnlocked);
          return status === activeFilter;
        });
        return { section, sectionIndex, accentColor, filteredTopics };
      })
      .filter(entry => entry.filteredTopics.length > 0);
  }, [sectionVocab, unlockedLessonIds, activeFilter, masteredSet]);

  const stickyHeaderIndices = useMemo(
    () => filteredSections.map((_, i) => i * 2),
    [filteredSections],
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Vocabulary</Text>
          <OverallRing progress={overallProgress} />
        </View>
      </View>

      <View style={styles.filterStrip}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterStripContent}
        >
          {FILTERS.map(f => (
            <FilterChip
              key={f.key}
              label={f.label}
              isActive={activeFilter === f.key}
              onPress={() => setActiveFilter(f.key)}
            />
          ))}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={stickyHeaderIndices}
        scrollEventThrottle={16}
        decelerationRate="normal"
      >
        {filteredSections.flatMap(({ section, sectionIndex, accentColor, filteredTopics }) => [
          <View key={`header-${section.id}`} style={styles.stickyHeaderWrapper}>
            <SectionHeader
              title={section.title}
              subtitle={section.subtitle}
              index={sectionIndex + 1}
              icon={section.icon}
            />
          </View>,
          <ScrollView
            key={`topics-${section.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topicRow}
            style={styles.topicRowOuter}
          >
            {filteredTopics.map((topic, topicIndex) => {
              const isUnlocked = unlockedLessonIds.has(topic.lessonId);
              return (
                <TopicPill
                  key={topicIndex}
                  title={topic.title}
                  emoji={topic.words[0]?.emoji || '📚'}
                  wordCount={topic.words.length}
                  masteredCount={getTopicMasteredCount(topic)}
                  accentColor={accentColor}
                  isLocked={!isUnlocked}
                  onPress={() => handleTopicPress(topic, !isUnlocked, section.icon)}
                />
              );
            })}
          </ScrollView>,
        ])}
        <View style={{ height: 40 }} />
      </ScrollView>

      <ConfirmModal
        visible={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        icon="lock-closed"
        iconColor={Colors.saffron}
        title="Vocabulary Locked"
        message={
          unlockInfo
            ? `To unlock this, you need to complete the lesson "${unlockInfo.lessonTitle}" in the ${unlockInfo.sectionIcon} "${unlockInfo.sectionSubtitle}" section.`
            : 'Complete the required lesson to unlock this vocabulary.'
        }
        actions={[
          {
            title: 'Got it',
            variant: 'primary',
            onPress: () => setShowUnlockModal(false),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  header: {
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.md,
    backgroundColor: Colors.white,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: 22,
    color: Colors.ink,
  },
  filterStrip: {
    backgroundColor: Colors.white,
    paddingBottom: Layout.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.jadeBorder08,
  },
  filterStripContent: {
    paddingHorizontal: Layout.spacing.lg,
    gap: Layout.spacing.sm,
  },
  scrollContent: {
    paddingBottom: Layout.spacing.xxl,
  },
  stickyHeaderWrapper: {
    backgroundColor: Colors.cream,
    zIndex: 10,
  },
  topicRowOuter: {
    marginTop: Layout.spacing.sm,
    marginBottom: Layout.spacing.lg,
  },
  topicRow: {
    paddingHorizontal: Layout.spacing.md,
    gap: Layout.spacing.sm,
  },
});
