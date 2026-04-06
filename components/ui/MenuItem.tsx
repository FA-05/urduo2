import React from 'react';
import { Pressable, View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';

interface MenuItemProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  /** Icon foreground color */
  iconColor?: string;
  /** Icon background tint */
  iconBg?: string;
  /** Override the label text color */
  labelColor?: string;
  /** Show a chevron arrow on the right (default: true) */
  showChevron?: boolean;
  /** Right-side accessory element (e.g. Switch) — overrides chevron */
  rightAccessory?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon,
  iconColor = Colors.jade,
  iconBg = Colors.jadeTint10,
  labelColor,
  showChevron = true,
  rightAccessory,
  onPress,
  style,
}) => {
  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper
      style={[styles.container, style] as any}
      {...(onPress ? { onPress } : {})}
    >
      <View style={styles.left}>
        <View style={[styles.iconBg, { backgroundColor: iconBg }]}>
          <Ionicons name={icon} size={18} color={iconColor} />
        </View>
        <Text style={[styles.label, labelColor ? { color: labelColor } : undefined]}>
          {label}
        </Text>
      </View>
      {rightAccessory
        ? rightAccessory
        : showChevron && onPress && (
            <Ionicons name="chevron-forward" size={20} color={Colors.inkMuted} />
          )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.sm,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.md,
    flex: 1,
  },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.ink,
  },
});
