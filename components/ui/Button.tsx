import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import * as Haptics from 'expo-haptics';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'sm' | 'md' | 'lg';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
  size = 'md',
}) => {
  const isPressed = useSharedValue(false);

  const getColors = () => {
    switch (variant) {
      case 'primary':
        return { bg: Colors.green, border: Colors.greenDark, text: Colors.white };
      case 'secondary':
        return { bg: Colors.blue, border: Colors.blueDark, text: Colors.white };
      case 'danger':
        return { bg: Colors.red, border: Colors.redDark, text: Colors.white };
      case 'outline':
        return { bg: Colors.white, border: Colors.borderDark, text: Colors.textMid };
      case 'ghost':
        return { bg: 'transparent', border: 'transparent', text: Colors.textMid };
      default:
        return { bg: Colors.green, border: Colors.greenDark, text: Colors.white };
    }
  };

  const colors = getColors();

  const bgOpacity = disabled ? 0.5 : 1;

  const handlePressIn = () => {
    if (disabled) return;
    isPressed.value = true;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    if (disabled) return;
    isPressed.value = false;
  };

  const handlePress = () => {
    if (disabled) return;
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = withSpring(isPressed.value ? 4 : 0, {
      mass: 0.5,
      damping: 15,
      stiffness: 300,
    });
    const borderBottomWidth = withSpring(isPressed.value ? 0 : 4, {
      mass: 0.5,
      damping: 15,
      stiffness: 300,
    });

    return {
      transform: [{ translateY }],
      borderBottomWidth,
    };
  });

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { paddingVertical: Layout.spacing.sm, paddingHorizontal: Layout.spacing.md, fontSize: 14 };
      case 'lg':
        return { paddingVertical: Layout.spacing.md, paddingHorizontal: Layout.spacing.xl, fontSize: 20 };
      case 'md':
      default:
        return { paddingVertical: 12, paddingHorizontal: Layout.spacing.lg, fontSize: 16 };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          opacity: bgOpacity,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
        },
        animatedStyle,
        style,
      ]}
      android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Text
        style={[
          styles.text,
          { color: colors.text, fontSize: sizeStyles.fontSize },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Layout.radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: Fonts.extraBold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});