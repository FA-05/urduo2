import React, { useMemo } from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { LessonNode } from './LessonNode';
import { SectionHeader } from './SectionHeader';
import { SectionMeta } from '../../data';
import { Layout } from '../../constants/layout';
import { Colors } from '../../constants/colors';

interface LessonPathProps {
  sections: SectionMeta[];
  completedLessons: string[];
  onLessonPress: (id: string, status: 'completed' | 'active' | 'locked') => void;
}

export const LessonPath: React.FC<LessonPathProps> = ({
  sections,
  completedLessons,
  onLessonPress,
}) => {
  const { items, stickyHeaderIndices } = useMemo(() => {
    const items: React.ReactNode[] = [];
    const stickyHeaderIndices: number[] = [];
    let activeFoundLocal = false;
    let globalIndexLocal = 0;

    sections.forEach((section, sectionIndex) => {
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
        <View key={`lessons-${section.id}`} style={styles.lessonsContainer}>
          {section.lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            let status: 'completed' | 'active' | 'locked' = 'locked';

            if (isCompleted) {
              status = 'completed';
            } else if (!activeFoundLocal) {
              status = 'active';
              activeFoundLocal = true;
            }

            const node = (
              <LessonNode
                key={lesson.id}
                id={lesson.id}
                icon={lesson.icon}
                status={status}
                index={globalIndexLocal}
                sectionIndex={sectionIndex}
                onPress={onLessonPress}
              />
            );
            globalIndexLocal++;
            return node;
          })}
        </View>
      );
    });

    return { items, stickyHeaderIndices };
  }, [sections, completedLessons, onLessonPress]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={stickyHeaderIndices}
      scrollEventThrottle={16}
      decelerationRate="normal"
      removeClippedSubviews={Platform.OS === 'android'}
    >
      {items}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Layout.spacing.xxl,
  },
  stickyHeaderWrapper: {
    backgroundColor: Colors.cream,
    zIndex: 10,
  },
  lessonsContainer: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl,
  },
});
