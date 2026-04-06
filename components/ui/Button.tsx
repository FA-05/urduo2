import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  StyleProp,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Layout } from "../../constants/layout";
import * as Haptics from "expo-haptics";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  size?: "sm" | "md" | "lg";
  icon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  style,
  textStyle,
  size = "md",
  icon,
  iconSize,
  iconColor,
}) => {
  const scale = useSharedValue(1);

  const getColors = () => {
    switch (variant) {
      case "primary":
        return {
          bg: Colors.jadeVivid,
          border: Colors.jade,
          text: Colors.white,
        };
      case "secondary":
        return { bg: Colors.indigo, border: "#4338CA", text: Colors.white };
      case "danger":
        return { bg: Colors.rose, border: Colors.roseDim, text: Colors.white };
      case "outline":
        return {
          bg: Colors.white,
          border: Colors.jadeBorder20,
          text: Colors.inkSoft,
        };
      case "ghost":
        return {
          bg: "transparent",
          border: "transparent",
          text: Colors.inkSoft,
        };
      default:
        return {
          bg: Colors.jadeVivid,
          border: Colors.jade,
          text: Colors.white,
        };
    }
  };

  const colors = getColors();

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
          fontSize: 14,
          minHeight: 40,
        };
      case "lg":
        return {
          paddingVertical: 16,
          paddingHorizontal: 32,
          fontSize: 18,
          minHeight: 56,
        };
      default:
        return {
          paddingVertical: 13,
          paddingHorizontal: 24,
          fontSize: 16,
          minHeight: 48,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const handlePressIn = () => {
    if (disabled || loading) return;
    scale.value = withTiming(0.98, { duration: 120 });
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

  const off = disabled || loading;

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor: off ? Colors.lockedFill : colors.bg,
          borderColor: off ? Colors.lockedShadow : colors.border,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          minHeight: sizeStyles.minHeight,
          opacity: off ? 0.6 : 1,
        },
        variant === "primary" && !off && Layout.shadow.btn,
        animatedStyle,
        style,
      ]}
      android_ripple={off ? null : { color: "rgba(0,0,0,0.08)" }}
      accessibilityRole="button"
      accessibilityState={{ disabled: off }}
      hitSlop={Layout.hitSlop}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} size="small" />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={iconSize || (size === "sm" ? 18 : size === "lg" ? 24 : 20)}
              color={iconColor || (off ? Colors.inkMuted : colors.text)}
              style={{ marginRight: 8 }}
            />
          )}
          <Text
            style={[
              styles.text,
              {
                color: off ? Colors.inkMuted : colors.text,
                fontSize: sizeStyles.fontSize,
              },
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
    borderRadius: Layout.radius.lg,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1.5,
    borderBottomWidth: 3,
  },
  text: {
    fontFamily: Fonts.bold,
    letterSpacing: 0.4,
  },
});
