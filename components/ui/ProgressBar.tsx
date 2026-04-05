import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Layout } from '../../constants/layout';

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
  backgroundColor?: string;
  height?: number;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = Colors.primary,
  backgroundColor = Colors.border,
  height = 14,
  style,
}) => {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 350,
      easing: Easing.inOut(Easing.ease),
    });
  }, [progress]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%`,
  }));

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, height, borderRadius: height / 2 },
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(progress * 100) }}
    >
      <Animated.View
        style={[
          styles.fill,
          { backgroundColor: color, borderRadius: height / 2 },
          progressStyle,
        ]}
      >
        {/* Subtle inner highlight for depth */}
        <View style={[styles.highlight, { borderRadius: height / 2 }]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    position: 'relative',
  },
  highlight: {
    position: 'absolute',
    top: '10%',
    left: '4%',
    right: '4%',
    height: '35%',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
});