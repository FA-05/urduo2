import React from 'react';
import { 
  Pressable, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle, 
  ActivityIndicator,
  StyleProp 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
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
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  size?: 'sm' | 'md' | 'lg';
  icon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  size = 'md',
  icon,
  iconSize,
  iconColor,
}) => {
  const scale = useSharedValue(1);

  const getColors = () => {
    switch (variant) {
      case 'primary':
        return {
          bg: Colors.primary,
          border: Colors.primaryDark,
          text: Colors.white,
        };
      case 'secondary':
        return {
          bg: Colors.indigo,
          border: Colors.indigoDark,
          text: Colors.white,
        };
      case 'danger':
        return {
          bg: Colors.error,
          border: Colors.errorDark,
          text: Colors.white,
        };
      case 'outline':
        return {
          bg: Colors.white,
          border: Colors.borderDark,
          text: Colors.textMid,
        };
      case 'ghost':
        return {
          bg: 'transparent',
          border: 'transparent',
          text: Colors.textMid,
        };
      default:
        return {
          bg: Colors.primary,
          border: Colors.primaryDark,
          text: Colors.white,
        };
    }
  };

  const colors = getColors();

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: Layout.spacing.sm,
          paddingHorizontal: Layout.spacing.md,
          fontSize: 14,
          minHeight: 40,
        };
      case 'lg':
        return {
          paddingVertical: 15,
          paddingHorizontal: Layout.spacing.xl,
          fontSize: 18,
          minHeight: 56,
        };
      case 'md':
      default:
        return {
          paddingVertical: 13,
          paddingHorizontal: Layout.spacing.lg,
          fontSize: 16,
          minHeight: 48,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const handlePressIn = () => {
    if (disabled || loading) return;
    scale.value = withTiming(0.97, { duration: 80 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 120 });
  };

  const handlePress = () => {
    if (disabled || loading) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isInteractionDisabled = disabled || loading;

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor: isInteractionDisabled ? Colors.border : colors.bg,
          borderColor: isInteractionDisabled ? Colors.borderDark : colors.border,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          minHeight: sizeStyles.minHeight,
          opacity: isInteractionDisabled ? 0.6 : 1,
        },
        animatedStyle,
        style,
      ]}
      android_ripple={isInteractionDisabled ? null : { color: 'rgba(0,0,0,0.08)' }}
      accessibilityRole="button"
      accessibilityState={{ disabled: isInteractionDisabled }}
      hitSlop={Layout.hitSlop}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} size="small" />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={iconSize || (size === 'sm' ? 18 : size === 'lg' ? 24 : 20)}
              color={iconColor || (isInteractionDisabled ? Colors.textMuted : colors.text)}
              style={{ marginRight: Layout.spacing.sm }}
            />
          )}
          <Text
            style={[
              styles.text,
              { color: isInteractionDisabled ? Colors.textMuted : colors.text, fontSize: sizeStyles.fontSize },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </AnimatedPressable>
  );
};


const styles = StyleSheet.create({
  container: {
    borderRadius: Layout.radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1.5,
    borderBottomWidth: 3,
    ...Layout.shadow.button,
  },
  text: {
    fontFamily: Fonts.extraBold,
    letterSpacing: 0.4,
  },
});