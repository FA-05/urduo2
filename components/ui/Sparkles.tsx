import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withDelay,
  withTiming,
  withSequence,
  interpolate,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';

interface SparkleProps {
  size?: number;
  color?: string;
  delay?: number;
  containerSize?: number;
}

const Sparkle: React.FC<SparkleProps> = ({ 
  size = 10, 
  color = Colors.saffron,
  delay = 0,
  containerSize = 100 
}) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const rotation = useSharedValue(0);

  // Random position within the container
  const x = Math.random() * containerSize - containerSize / 2;
  const y = Math.random() * containerSize - containerSize / 2;

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 800 }),
          withTiming(0, { duration: 800 })
        ),
        -1,
        true
      )
    );

    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1.2, { duration: 800 }),
          withTiming(0.4, { duration: 800 })
        ),
        -1,
        true
      )
    );

    rotation.value = withRepeat(
      withTiming(360, { duration: 2500 }),
      -1,
      false
    );
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: x },
      { translateY: y },
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
  }));

  return (
    <Animated.View style={[styles.sparkle, animatedStyle, { backgroundColor: color, width: size, height: size }]} />
  );
};

export const SparkleGroup: React.FC<{ count?: number; size?: number }> = ({ count = 8, size = 120 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {[...Array(count)].map((_, i) => (
        <Sparkle 
          key={i} 
          delay={i * 200} 
          containerSize={size} 
          color={i % 2 === 0 ? Colors.saffron : Colors.saffronLight}
          size={i % 3 === 0 ? 8 : 6}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkle: {
    position: 'absolute',
    borderRadius: 2, // Slightly rounded squares look like sparkles
  },
});
