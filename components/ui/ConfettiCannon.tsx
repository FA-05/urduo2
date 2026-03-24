import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const CONFETTI_COLORS = [
  Colors.green,
  Colors.red,
  Colors.gold,
  Colors.blue,
  Colors.purple,
];

interface ParticleProps {
  x: number;
  y: number;
  color: string;
  delay: number;
  duration: number;
}

const Particle: React.FC<ParticleProps> = ({ x, y, color, delay, duration }) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withTiming(SCREEN_HEIGHT, {
        duration,
        easing: Easing.in(Easing.cubic),
      })
    );
    translateX.value = withDelay(
      delay,
      withTiming((Math.random() - 0.5) * SCREEN_WIDTH * 0.5, {
        duration,
        easing: Easing.out(Easing.quad),
      })
    );
    rotate.value = withDelay(
      delay,
      withTiming(Math.random() * 360 * 3, {
        duration,
        easing: Easing.linear,
      })
    );
    opacity.value = withDelay(
      delay + duration * 0.8,
      withTiming(0, {
        duration: duration * 0.2,
      })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { rotate: `${rotate.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        { backgroundColor: color, left: x, top: y },
        animatedStyle,
      ]}
    />
  );
};

interface ConfettiCannonProps {
  count?: number;
  origin?: { x: number; y: number };
}

export const ConfettiCannon: React.FC<ConfettiCannonProps> = ({
  count = 100,
  origin = { x: SCREEN_WIDTH / 2, y: -50 },
}) => {
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: origin.x + (Math.random() - 0.5) * 50,
    y: origin.y + (Math.random() - 0.5) * 50,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 500,
    duration: 1500 + Math.random() * 1000,
  }));

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    width: 8,
    height: 16,
    borderRadius: 4,
  },
});