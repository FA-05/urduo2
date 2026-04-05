import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getVocabularyBySection, SectionVocabulary, VocabularyTopic } from '../../data/vocabulary';
import { lessonsData } from '../../data';
import { useProgressStore } from '../../store/progressStore';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyle, urduStyleLarge } from '../../utils/rtl';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { SectionHeader } from '../../components/home/SectionHeader';

const { width } = Dimensions.get('window');

// Accent colours for topic cards that align with SectionHeader themes
const SECTION_ACCENTS = [
  Colors.primary, // Emerald
  Colors.indigo,  // Indigo
  '#7C3AED',      // Royal Purple
  Colors.gold,    // Amber
  '#E11D48',      // Crimson
  '#0D9488',      // Teal
  '#DB2777',      // Deep Pink
  '#475569',      // Slate Blue
];

export default function VocabularyScreen() {
  const router = useRouter();
  const sectionVocab = getVocabularyBySection();
  const insets = useSafeAreaInsets();
  const { completedLessons, masteredWords } = useProgressStore();
  const [showUnlockModal, setShowUnlockModal] = React.useState(false);
  const [selectedLockedTopic, setSelectedLockedTopic] = React.useState<VocabularyTopic | null>(null);

  // Determine unlocked lessons logic
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

  // Calculate stats
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

  // Flatten sectionVocab for ScrollView with stickyHeaderIndices
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
            const accentColor = isUnlocked 
              ? SECTION_ACCENTS[sectionIndex % SECTION_ACCENTS.length]
              : Colors.textMuted;
            
            return (
              <Pressable
                key={topicIndex}
                style={({ pressed }) => [
                  styles.topicCard,
                  { opacity: pressed ? 0.88 : 1 },
                ]}
                onPress={() => handleTopicPress(topic, !isUnlocked, section.icon)}
              >
                {!isUnlocked && (
                  <View style={styles.lockOverlay}>
                    <Ionicons name="lock-closed" size={20} color={Colors.textMuted} />
                  </View>
                )}

                <View style={[styles.topStripe, { backgroundColor: isUnlocked ? accentColor : Colors.border }]} />

                <View style={[
                  styles.emojiContainer, 
                  { backgroundColor: isUnlocked ? `${accentColor}18` : Colors.background }
                ]}>
                  <Text style={[styles.topicEmoji, !isUnlocked && { opacity: 0.3 }]}>
                    {topic.words[0]?.emoji || '📚'}
                  </Text>
                </View>
                
                <Text style={[styles.topicTitle, !isUnlocked && { color: Colors.textMuted }]} numberOfLines={2}>
                  {topic.title}
                </Text>
                
                <View style={styles.cardFooter}>
                   <Text style={[styles.wordCount, urduStyle]}>
                    {topic.words.length} الفاظ
                  </Text>
                  {isUnlocked && (
                    <Ionicons name="chevron-forward" size={12} color={Colors.textMuted} />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      );
    });

    return { items, stickyHeaderIndices };
  }, [sectionVocab, unlockedLessonIds]);

  return (
    <View style={styles.container}>
      {/* Simplified Header */}
      <View style={[styles.simpleHeader, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.title, urduStyleLarge]}>ذخیرہ الفاظ</Text>
            <Text style={styles.subtitle}>Vocabulary</Text>
          </View>
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
        {/* Bottom padding */}
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
                    <Ionicons name="lock-closed" size={42} color={Colors.warning} />
                  </View>
                  
                  <Text style={[styles.modalTitle, urduStyleLarge]}>یہ سبق مقفل ہے</Text>
                  <Text style={styles.modalSubUrdu}>
                    اس ذخیرہ الفاظ کو کھولنے کے لیے آپ کو سیکشن {info?.sectionIcon} "{info?.sectionTitle}" کا سبق "{info?.lessonTitle}" مکمل کرنا ہوگا۔
                  </Text>

                  <View style={styles.divider} />

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
    backgroundColor: Colors.background,
  },
  simpleHeader: {
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
    ...Layout.shadow.xs,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.sm,
  },
  title: {
    fontSize: 28,
    color: Colors.textDark,
  },
  subtitle: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: -2,
  },
  simpleBadge: {
    backgroundColor: Colors.primary + '10',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
  },
  simpleBadgeText: {
    fontFamily: Fonts.extraBold,
    fontSize: 13,
    color: Colors.primary,
  },
  percentText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.textMuted,
    width: 35,
  },
  scrollContent: {
    paddingBottom: Layout.spacing.xxl,
  },
  stickyHeaderWrapper: {
    backgroundColor: Colors.background,
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
  topicCard: {
    width: (width - Layout.spacing.md * 3) / 2, // 2 columns with spacing
    backgroundColor: Colors.white,
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.md,
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderBottomWidth: 4,
    ...Layout.shadow.card,
    marginBottom: Layout.spacing.sm,
  },
  lockOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  topStripe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    borderTopLeftRadius: Layout.radius.xl,
    borderTopRightRadius: Layout.radius.xl,
  },
  emojiContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.sm,
    marginTop: Layout.spacing.sm,
  },
  topicEmoji: {
    fontSize: 30,
  },
  topicTitle: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.textDark,
    textAlign: 'center',
    minHeight: 40,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 4,
  },
  wordCount: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  modalBody: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.sm,
  },
  modalIconContainer: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: Colors.warning + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.md,
  },
  modalTitle: {
    fontSize: 24,
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: Layout.spacing.sm,
  },
  modalSubUrdu: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    color: Colors.textMid,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.sm,
  },
  divider: {
    width: '30%',
    height: 1.5,
    backgroundColor: Colors.border,
    marginVertical: Layout.spacing.md,
    opacity: 0.6,
  },
  modalTitleEn: {
    fontFamily: Fonts.extraBold,
    fontSize: 17,
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: Layout.spacing.xs,
  },
  modalSubEn: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Layout.spacing.xl,
    paddingHorizontal: Layout.spacing.md,
  },
  modalButton: {
    width: '100%',
  },
});
