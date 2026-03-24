import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { LessonNode } from './LessonNode';
import { SectionHeader } from './SectionHeader';
import { Section } from '../../data/lessons';
import { Layout } from '../../constants/layout';

interface LessonPathProps {
  sections: Section[];
  completedLessons: string[];
  onLessonPress: (id: string, status: 'completed' | 'active' | 'locked') => void;
}

export const LessonPath: React.FC<LessonPathProps> = ({
  sections,
  completedLessons,
  onLessonPress,
}) => {
  let globalIndex = 0;
  let activeFound = false;

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {sections.map((section, sectionIndex) => (
        <View key={section.id}>
          <SectionHeader title={section.title} subtitle={section.subtitle} index={sectionIndex + 1} />
          <View style={styles.lessonsContainer}>
            {section.lessons.map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id);
              let status: 'completed' | 'active' | 'locked' = 'locked';

              if (isCompleted) {
                status = 'completed';
              } else if (!activeFound) {
                status = 'active';
                activeFound = true;
              }

              const node = (
                <LessonNode
                  key={lesson.id}
                  id={lesson.id}
                  icon={lesson.icon}
                  status={status}
                  index={globalIndex}
                  onPress={onLessonPress}
                />
              );
              globalIndex++;
              return node;
            })}
          </View>
        </View>
      ))}
      {/* Spacer at the bottom */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Layout.spacing.xxl,
  },
  lessonsContainer: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl,
  },
});