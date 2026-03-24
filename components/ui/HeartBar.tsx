import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withSequence,
  runOnJS,
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
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    if (lost) {
      scale.value = withSequence(
        withTiming(1.2, { duration: 150 }),
        withSpring(0, { damping: 10, stiffness: 200 })
      );
      opacity.value = withTiming(0, { duration: 300 });
    } else if (!active) {
      scale.value = 1;
      opacity.value = 0.3;
    } else {
      scale.value = 1;
      opacity.value = 1;
    }
  }, [active, lost]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

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
      setLostIndex(hearts); // The index that was just lost
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
    <View style={[styles.container, style]} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: maxHearts, now: hearts }}>
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
    color: Colors.redDark,
    fontSize: 16,
  },
  heartsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  heartContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartText: {
    fontSize: 20,
  },
});