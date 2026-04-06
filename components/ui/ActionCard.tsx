import React from 'react';
import { Pressable, View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';

interface ActionCardProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  /** Icon foreground color */
  iconColor?: string;
  /** Icon background tint */
  iconBg?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  label,
  icon,
  iconColor = Colors.jade,
  iconBg = Colors.jadeTint12,
  onPress,
  style,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
        style,
      ]}
      onPress={onPress}
    >
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={22} color={iconColor} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: Layout.radius.lg,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.jadeBorder08,
    gap: 8,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    color: Colors.inkSoft,
  },
});
