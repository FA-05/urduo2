import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  index: number;
  icon: string;
}

const THEME_COLORS = [
  Colors.primary, // Emerald
  Colors.indigo,  // Indigo
  '#7C3AED',      // Royal Purple
  Colors.gold,    // Amber
  '#E11D48',      // Crimson
  '#0D9488',      // Teal
  '#DB2777',      // Deep Pink
  '#475569',      // Slate Blue
  '#F59E0B',      // Amber Bright
  '#10B981',      // Emerald Bold
  '#3B82F6',      // Blue
  '#8B5CF6',      // Violet
  '#EC4899',      // Pink
  '#06B6D4',      // Cyan
];

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, index, icon }) => {
  // Select color based on index (1-based from props)
  const backgroundColor = THEME_COLORS[(index - 1) % THEME_COLORS.length];

  return (
    <View style={styles.container}>
      <View style={[styles.background, { backgroundColor }]}>
        <View style={styles.contentRow}>
          <View style={styles.textContent}>
            <Text style={styles.sectionLabel}>قسم {index}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Text style={styles.emoji}>{icon}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Layout.spacing.md,
    marginTop: Layout.spacing.xl,
    marginBottom: Layout.spacing.sm,
    borderRadius: Layout.radius.xl,
    overflow: 'hidden',
    ...Layout.shadow.card,
    elevation: 8, // Enhanced shadow for Android
  },
  background: {
    padding: Layout.spacing.md,
    paddingVertical: Layout.spacing.md, // More compact
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContent: {
    flex: 1,
    zIndex: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Layout.spacing.md,
  },
  emoji: {
    fontSize: 28,
  },
  sectionLabel: {
    fontFamily: Fonts.bold,
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 0,
  },
  title: {
    fontFamily: Fonts.extraBold,
    color: Colors.white,
    fontSize: 18, // Reduced from 23
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontFamily: Fonts.semiBold,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13, // Reduced from 15
    lineHeight: 18, // Adjusted
  },
});