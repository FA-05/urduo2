import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import * as Haptics from 'expo-haptics';

interface LessonNodeProps {
  id: string;
  icon: string;
  status: 'completed' | 'active' | 'locked';
  onPress: (id: string, status: 'completed' | 'active' | 'locked') => void;
  index: number;
  sectionIndex?: number;
}

const THEMES = [
  { bg: Colors.primary, border: Colors.primaryDark, ring: Colors.primaryLight }, // Emerald
  { bg: Colors.indigo, border: Colors.indigoDark, ring: Colors.indigoLight },   // Indigo
  { bg: '#7C3AED', border: '#5B21B6', ring: '#DDD6FE' },                        // Royal Purple
  { bg: Colors.gold, border: Colors.goldDark, ring: Colors.goldLight },         // Amber
  { bg: '#E11D48', border: '#9F1239', ring: '#FFE4E6' },                        // Crimson
  { bg: '#0D9488', border: '#0F766E', ring: '#CCFBF1' },                        // Teal
  { bg: '#DB2777', border: '#9D174D', ring: '#FCE7F3' },                        // Deep Pink
  { bg: '#475569', border: '#1E293B', ring: '#F1F5F9' },                        // Slate Blue
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const LessonNode = React.memo<LessonNodeProps>(({
  id,
  icon,
  status,
  onPress,
  index,
  sectionIndex = 0,
}) => {
  const pulseScale = useSharedValue(1);
  const shakeOffset = useSharedValue(0);
  const pressScale = useSharedValue(1);

  React.useEffect(() => {
    if (status === 'active') {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1100, easing: Easing.inOut(Easing.ease) }),
          withTiming(1.0, { duration: 1100, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    } else {
      pulseScale.value = withTiming(1, { duration: 200 });
    }
  }, [status]);

  const handlePressIn = () => {
    if (status !== 'locked') {
      pressScale.value = withTiming(0.94, { duration: 80 });
    }
  };
  const handlePressOut = () => {
    pressScale.value = withTiming(1, { duration: 120 });
  };

  const handlePress = () => {
    if (status === 'locked') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      shakeOffset.value = withSequence(
        withTiming(-9, { duration: 50 }),
        withTiming(9, { duration: 50 }),
        withTiming(-6, { duration: 50 }),
        withTiming(6, { duration: 50 }),
        withTiming(-3, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress(id, status);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: status === 'active' ? pulseScale.value * pressScale.value : pressScale.value },
      { translateX: shakeOffset.value },
    ],
  }));

  const getNodeStyle = () => {
    const theme = THEMES[sectionIndex % THEMES.length];
    
    switch (status) {
      case 'completed':
        return {
          bg: theme.bg,
          border: theme.border,
          innerRing: theme.ring,
          opacity: 1,
        };
      case 'active':
        return {
          bg: theme.bg,
          border: theme.border,
          innerRing: theme.ring,
          opacity: 1,
        };
      case 'locked':
      default:
        return {
          bg: Colors.border,
          border: Colors.borderDark,
          innerRing: 'transparent',
          opacity: 0.48,
        };
    }
  };

  const nodeStyle = getNodeStyle();

  // Winding path: 8-node cycle offset
  const offsetIndex = index % 8;
  const offsetXAmount = Layout.window.width * 0.16;
  let offsetX = 0;
  if (offsetIndex === 1 || offsetIndex === 2 || offsetIndex === 3) offsetX = offsetXAmount;
  if (offsetIndex === 5 || offsetIndex === 6 || offsetIndex === 7) offsetX = -offsetXAmount;

  return (
    <View
      style={[
        styles.container,
        { transform: [{ translateX: offsetX }], opacity: nodeStyle.opacity },
      ]}
    >
      {/* Crown / star above node */}
      {status === 'active' && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>⭐</Text>
        </View>
      )}
      {status === 'completed' && (
        <View style={[styles.badgeContainer, styles.badgeCompleted]}>
          <Text style={styles.badgeText}>✓</Text>
        </View>
      )}

      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={[
          styles.node,
          {
            backgroundColor: nodeStyle.bg,
            borderColor: nodeStyle.border,
          },
          animatedStyle,
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Lesson ${index + 1}, Status: ${status}`}
        hitSlop={Layout.hitSlop}
      >
        <View style={styles.iconWrapper}>
          <Text style={[styles.icon, status === 'locked' && styles.lockedIcon]}>
            {icon}
          </Text>
          {status === 'locked' && (
            <View style={styles.lockOverlay}>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
          )}
        </View>
      </AnimatedPressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Layout.spacing.lg,
  },
  node: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderBottomWidth: 4,
    ...Layout.shadow.button,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  icon: {
    fontSize: 32,
  },
  lockedIcon: {
    opacity: 0.35,
    transform: [{ scale: 0.85 }],
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  badgeContainer: {
    position: 'absolute',
    top: -18,
    zIndex: 10,
    backgroundColor: Colors.white,
    borderRadius: Layout.radius.round,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    ...Layout.shadow.xs,
  },
  badgeCompleted: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  badgeText: {
    fontSize: 14,
  },
});