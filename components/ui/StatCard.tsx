import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts, TypeScale } from '../../constants/fonts';
import { Layout } from '../../constants/layout';

interface StatCardProps {
  value: string | number;
  label: string;
  /** Optional emoji displayed in a colored tint circle */
  emoji?: string;
  /** Background tint for the emoji circle (e.g. `Colors.saffron`) */
  emojiTint?: string;
  /** Style variant */
  variant?: 'compact' | 'large';
  style?: StyleProp<ViewStyle>;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  emoji,
  emojiTint,
  variant = 'compact',
  style,
}) => {
  const isLarge = variant === 'large';

  return (
    <View style={[styles.container, isLarge && styles.containerLarge, style]}>
      {emoji && (
        <View
          style={[
            styles.emojiCircle,
            emojiTint ? { backgroundColor: `${emojiTint}15` } : undefined,
          ]}
        >
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
      )}
      <Text style={[styles.value, isLarge && styles.valueLarge]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
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
  },
  containerLarge: {
    paddingVertical: Layout.spacing.lg,
    borderWidth: 1.5,
  },
  emojiCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.sm,
  },
  emoji: {
    fontSize: 18,
  },
  value: {
    fontFamily: Fonts.extraBold,
    fontSize: 22,
    color: Colors.jade,
  },
  valueLarge: {
    fontSize: 32,
    color: Colors.ink,
    letterSpacing: -1.3,
    marginBottom: 2,
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: TypeScale.caption,
    color: Colors.inkMuted,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});
