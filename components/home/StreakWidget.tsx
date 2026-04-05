import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import * as Haptics from 'expo-haptics';

interface StreakWidgetProps {
  streak: number;
  onPress: () => void;
}

export const StreakWidget: React.FC<StreakWidgetProps> = ({ streak, onPress }) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const isActive = streak > 0;
  const color = isActive ? Colors.goldDark : Colors.textMuted;
  const bgColor = isActive ? Colors.goldLight : Colors.background;

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container, { backgroundColor: bgColor }]}
      accessibilityRole="button"
      accessibilityLabel={`Streak: ${streak} days`}
      hitSlop={Layout.hitSlop}
    >
      <Text style={styles.icon}>🔥</Text>
      <Text style={[styles.text, { color }]}>{streak}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Layout.radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  icon: {
    fontSize: 18,
  },
  text: {
    fontFamily: Fonts.extraBold,
    fontSize: 15,
  },
});