import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';

interface BadgeProps {
  label: string;
  icon?: string; // Emoji
  variant?: 'xp' | 'level' | 'streak' | 'neutral';
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
      case 'xp':
        return { bg: Colors.goldLight, text: Colors.goldDark, border: Colors.gold };
      case 'level':
        return { bg: Colors.purpleLight, text: Colors.purple, border: Colors.purple };
      case 'streak':
        return { bg: Colors.redLight, text: Colors.redDark, border: Colors.red };
      case 'neutral':
      default:
        return { bg: Colors.background, text: Colors.textMid, border: Colors.border };
    }
  };

  const colors = getVariantStyles();

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { paddingVertical: 2, paddingHorizontal: 6, fontSize: 10, iconSize: 12 };
      case 'lg':
        return { paddingVertical: 6, paddingHorizontal: 12, fontSize: 16, iconSize: 18 };
      case 'md':
      default:
        return { paddingVertical: 4, paddingHorizontal: 8, fontSize: 12, iconSize: 14 };
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
          borderWidth: 1,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
        },
        style,
      ]}
      accessibilityRole="text"
    >
      {icon && (
        <Text style={[styles.icon, { fontSize: sizeStyles.iconSize, marginRight: 4 }]}>
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
    borderRadius: Layout.radius.round,
    alignSelf: 'flex-start',
  },
  icon: {
    fontFamily: Fonts.regular,
  },
  text: {
    fontFamily: Fonts.extraBold,
    textTransform: 'uppercase',
  },
});