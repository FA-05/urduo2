import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';

interface BadgeProps {
  label: string;
  icon?: string; // Emoji or single char
  variant?: 'streak' | 'warning' | 'neutral';
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  icon,
  variant = 'neutral',
  style,
  textStyle,
  size = 'md',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'streak':
        return { bg: Colors.saffronTint12, text: Colors.saffronDim, border: Colors.saffronBorder30 };
      case 'warning':
        return { bg: Colors.saffronTint12, text: Colors.saffronDim, border: Colors.saffronBorder30 };
      case 'neutral':
      default:
        return { bg: Colors.creamDeep, text: Colors.inkSoft, border: Colors.jadeBorder10 };
    }
  };

  const colors = getVariantStyles();

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { paddingVertical: 2, paddingHorizontal: 7, fontSize: 10, iconSize: 11 };
      case 'lg':
        return { paddingVertical: 6, paddingHorizontal: 14, fontSize: 15, iconSize: 17 };
      case 'md':
      default:
        return { paddingVertical: 4, paddingHorizontal: 10, fontSize: 12, iconSize: 13 };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
        },
        style,
      ]}
      accessibilityRole="text"
    >
      {icon && (
        <Text style={[styles.icon, { fontSize: sizeStyles.iconSize }]}>
          {icon}
        </Text>
      )}
      <Text
        style={[
          styles.text,
          { color: colors.text, fontSize: sizeStyles.fontSize },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  icon: {
    fontFamily: Fonts.regular,
  },
  text: {
    fontFamily: Fonts.bold,
    letterSpacing: 0.2,
  },
});