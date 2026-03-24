import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import * as Haptics from 'expo-haptics';

interface StreakWidgetProps {
  streak: number;
  onPress: () => void;
  justIncreased?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const StreakWidget: React.FC<StreakWidgetProps> = ({
  streak,
  onPress,
  justIncreased = false,
}) => {
  const isPressed = useSharedValue(false);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    if (justIncreased) {
      scale.value = withSequence(
        withTiming(1.3, { duration: 300 }),
        withSpring(1, { damping: 10, stiffness: 200 })
      );
    }
  }, [justIncreased]);

  const handlePressIn = () => {
    isPressed.value = true;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    isPressed.value = false;
  };

  const animatedStyle = useAnimatedStyle(() => {
    const scaleVal = withSpring(isPressed.value ? 0.95 : scale.value, {
      mass: 0.5,
      damping: 15,
      stiffness: 300,
    });
    return {
      transform: [{ scale: scaleVal }],
    };
  });

  const isActive = streak > 0;
  const color = isActive ? Colors.gold : Colors.textMuted;
  const flame = isActive ? '🔥' : '🔥'; // Could use a different emoji for inactive

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={[styles.container, animatedStyle]}
      accessibilityRole="button"
      accessibilityLabel={`Streak: ${streak} days`}
    >
      <Text style={styles.icon}>{flame}</Text>
      <Text style={[styles.text, { color }]}>{streak}</Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Layout.radius.md,
    backgroundColor: Colors.white,
    ...Layout.shadow.card,
  },
  icon: {
    fontSize: 20,
  },
  text: {
    fontFamily: Fonts.extraBold,
    fontSize: 16,
  },
});