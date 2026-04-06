import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyleLarge } from '../../utils/rtl';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  index: number;
  icon: string;
}

// Spec §2.4: Section banners rotate color per section
const SECTION_GRADIENTS: [string, string][] = [
  [Colors.jadeDim, Colors.jade],       // Tertiary → Secondary
  [Colors.jade, Colors.jadeVivid],     // Secondary → Primary
  [Colors.jadeDim, Colors.jadeVivid],  // Tertiary → Primary
  [Colors.jadeDim, Colors.jade],
  [Colors.jade, Colors.jadeVivid],
  [Colors.jadeDim, Colors.jadeVivid],
  [Colors.jadeDim, Colors.jade],
  [Colors.jade, Colors.jadeVivid],
];

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, index, icon }) => {
  const gradient = SECTION_GRADIENTS[(index - 1) % SECTION_GRADIENTS.length];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Decorative circles (spec §6.3) */}
        <View style={styles.decoCircle1} />
        <View style={styles.decoCircle2} />

        <View style={styles.contentRow}>
          <View style={styles.textContent}>
            {/* Section number tag */}
            <Text style={styles.sectionTag}>قسم {index}</Text>
            {/* Urdu title (primary) */}
            <Text style={[styles.urduTitle, urduStyleLarge]}>{title}</Text>
            {/* Latin subtitle */}
            <Text style={styles.latinSubtitle}>{subtitle}</Text>
          </View>
          {/* Emoji in frosted pill */}
          <View style={styles.emojiBadge}>
            <Text style={styles.emoji}>{icon}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Layout.spacing.md,
    marginTop: Layout.spacing.xl,
    marginBottom: Layout.spacing.sm,
    borderRadius: Layout.radius.lg,
    overflow: 'hidden',
  },
  gradient: {
    padding: 18,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
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
  sectionTag: {
    fontFamily: Fonts.bold,
    color: 'rgba(255,255,255,0.50)',
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  urduTitle: {
    color: Colors.white,
    fontSize: 20,
  },
  latinSubtitle: {
    fontFamily: Fonts.medium,
    color: 'rgba(255,255,255,0.65)',
    fontSize: 13,
    marginTop: 2,
  },
  emojiBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginLeft: Layout.spacing.md,
  },
  emoji: {
    fontSize: 24,
  },
  // Decorative circles (spec §6.3)
  decoCircle1: {
    position: 'absolute',
    top: -20,
    right: -10,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  decoCircle2: {
    position: 'absolute',
    bottom: -30,
    left: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
});
