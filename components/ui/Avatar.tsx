import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';

interface AvatarProps {
  emoji: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({ emoji, size = 'md', style }) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { width: 32, height: 32, fontSize: 16 };
      case 'lg':
        return { width: 64, height: 64, fontSize: 32 };
      case 'xl':
        return { width: 96, height: 96, fontSize: 48 };
      case 'md':
      default:
        return { width: 48, height: 48, fontSize: 24 };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View
      style={[
        styles.container,
        {
          width: sizeStyles.width,
          height: sizeStyles.height,
          borderRadius: sizeStyles.width / 2,
        },
        style,
      ]}
      accessibilityRole="image"
      accessibilityLabel={`Avatar: ${emoji}`}
    >
      <Text style={[styles.emoji, { fontSize: sizeStyles.fontSize }]}>{emoji}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.creamDeep,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  emoji: {
    fontFamily: Fonts.regular,
  },
});