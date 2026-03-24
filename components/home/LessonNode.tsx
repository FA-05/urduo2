import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
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
  index: number; // To calculate the winding position
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const LessonNode: React.FC<LessonNodeProps> = ({
  id,
  icon,
  status,
  onPress,
  index,
}) => {
  const isPressed = useSharedValue(false);
  const pulseScale = useSharedValue(1);
  const shakeOffset = useSharedValue(0);

  React.useEffect(() => {
    if (status === 'active') {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.15, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1.0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    } else {
      pulseScale.value = 1;
    }
  }, [status]);

  const handlePressIn = () => {
    isPressed.value = true;
  };

  const handlePressOut = () => {
    isPressed.value = false;
  };

  const handlePress = () => {
    if (status === 'locked') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      shakeOffset.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-8, { duration: 50 }),
        withTiming(8, { duration: 50 }),
        withTiming(-5, { duration: 50 }),
        withTiming(5, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress(id, status);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = withSpring(isPressed.value ? 4 : 0, {
      mass: 0.5,
      damping: 15,
      stiffness: 300,
    });
    const borderBottomWidth = withSpring(isPressed.value ? 0 : 6, {
      mass: 0.5,
      damping: 15,
      stiffness: 300,
    });

    return {
      transform: [
        { translateY },
        { scale: status === 'active' ? pulseScale.value : 1 },
        { translateX: shakeOffset.value },
      ],
      borderBottomWidth: status === 'locked' ? 0 : borderBottomWidth,
    };
  });

  const getStyle = () => {
    switch (status) {
      case 'completed':
        return {
          bg: Colors.green,
          border: Colors.greenDark,
          opacity: 1,
        };
      case 'active':
        return {
          bg: Colors.green,
          border: Colors.greenDark,
          opacity: 1,
        };
      case 'locked':
      default:
        return {
          bg: Colors.border,
          border: 'transparent',
          opacity: 0.5,
        };
    }
  };

  const nodeStyle = getStyle();

  // Winding logic:
  // cycle: 0 -> center, 1 -> right, 2 -> right, 3 -> center, 4 -> left, 5 -> left
  const offsetIndex = index % 8;
  let offsetX = 0;
  if (offsetIndex === 1 || offsetIndex === 2 || offsetIndex === 3) offsetX = 60;
  if (offsetIndex === 5 || offsetIndex === 6 || offsetIndex === 7) offsetX = -60;

  return (
    <View style={[styles.container, { transform: [{ translateX: offsetX }] }]}>
      {status === 'active' && (
        <View style={styles.crownContainer}>
          <Text style={styles.crownText}>⭐</Text>
        </View>
      )}
      {status === 'completed' && (
        <View style={styles.crownContainer}>
          <Text style={styles.crownText}>👑</Text>
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
            opacity: nodeStyle.opacity,
          },
          animatedStyle,
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Lesson ${index + 1}, Status: ${status}`}
      >
        <Text style={styles.icon}>{status === 'locked' ? '🔒' : icon}</Text>
      </AnimatedPressable>
    </View>
  );
};

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
    ...Layout.shadow.button,
  },
  icon: {
    fontSize: 32,
  },
  crownContainer: {
    position: 'absolute',
    top: -20,
    zIndex: 10,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 2,
    ...Layout.shadow.card,
  },
  crownText: {
    fontSize: 20,
  },
});