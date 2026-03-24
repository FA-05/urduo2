import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  index: number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, index }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.greenDark, Colors.green]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.title}>
          🌟 SECTION {index}: {title}
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Layout.spacing.md,
    marginTop: Layout.spacing.xl,
    marginBottom: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    overflow: 'hidden',
    ...Layout.shadow.card,
  },
  gradient: {
    padding: Layout.spacing.lg,
  },
  title: {
    fontFamily: Fonts.extraBold,
    color: Colors.white,
    fontSize: 20,
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    fontFamily: Fonts.bold,
    color: Colors.white,
    opacity: 0.9,
    fontSize: 16,
  },
});