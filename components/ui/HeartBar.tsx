import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';

interface HeartProps {
  active: boolean;
  lost: boolean;
}

const Heart: React.FC<HeartProps> = ({ active, lost }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(active ? 1 : 0.25);

  React.useEffect(() => {
    if (lost) {
      // No bounce — clean timing animation
      scale.value = withSequence(
        withTiming(1.2, { duration: 120 }),
        withTiming(0, { duration: 200 })
      );
      opacity.value = withTiming(0, { duration: 300 });
    } else if (!active) {
      scale.value = withTiming(1, { duration: 150 });
      opacity.value = withTiming(0.25, { duration: 150 });
    } else {
      scale.value = withTiming(1, { duration: 150 });
      opacity.value = withTiming(1, { duration: 150 });
    }
  }, [active, lost]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.heartContainer, animatedStyle]}>
      <Text style={styles.heartText} accessibilityLabel={active ? 'Heart active' : 'Heart inactive'}>
        ❤️
      </Text>
    </Animated.View>
  );
};

interface HeartBarProps {
  hearts: number; // 0 to 5
  maxHearts?: number;
  style?: ViewStyle;
}

export const HeartBar: React.FC<HeartBarProps> = ({
  hearts,
  maxHearts = 5,
  style,
}) => {
  const [prevHearts, setPrevHearts] = React.useState(hearts);
  const [lostIndex, setLostIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (hearts < prevHearts) {
      setLostIndex(hearts);
    } else {
      setLostIndex(null);
    }
    setPrevHearts(hearts);
  }, [hearts]);

  const heartElements = Array.from({ length: maxHearts }).map((_, i) => {
    const active = i < hearts;
    const lost = i === lostIndex;
    return <Heart key={i} active={active} lost={lost} />;
  });

  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: maxHearts, now: hearts }}
    >
      <Text style={styles.countText}>{hearts}</Text>
      <View style={styles.heartsRow}>{heartElements}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  countText: {
    fontFamily: Fonts.extraBold,
    color: Colors.errorDark,
    fontSize: 14,
    lineHeight: 18,
  },
  heartsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  heartContainer: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartText: {
    fontSize: 14,
    lineHeight: 18,
  },
});