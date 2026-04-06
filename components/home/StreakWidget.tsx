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

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor: isActive ? Colors.saffronTint12 : Colors.creamDeep,
          borderColor: isActive ? Colors.saffronBorder30 : Colors.jadeBorder10,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Streak: ${streak} days`}
      hitSlop={Layout.hitSlop}
    >
      <Text style={styles.icon}>🔥</Text>
      <Text style={[styles.text, { color: isActive ? Colors.saffronDim : Colors.inkMuted }]}>
        {streak}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // Spec §6.8: r-full, 6px 12px padding, Sora 700 13px
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
  },
  icon: {
    fontSize: 15,
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: 13,
  },
});
