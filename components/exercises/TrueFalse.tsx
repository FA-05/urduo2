import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyle } from '../../utils/rtl';
import { TrueFalseExercise as TrueFalseData } from '../../data';

interface TrueFalseProps {
  data: TrueFalseData;
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ActionButton = ({
  label,
  colorType,
  isSelected,
  isCorrect,
  isWrong,
  disabled,
  onPress,
  icon,
}: {
  label: string;
  colorType: 'green' | 'red';
  isSelected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  disabled: boolean;
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
}) => {
  const shakeOffset = useSharedValue(0);
  const pressScale = useSharedValue(1);

  useEffect(() => {
    if (isWrong && isSelected) {
      shakeOffset.value = withSequence(
        withTiming(-4, { duration: 75 }),
        withTiming(4, { duration: 75 }),
        withTiming(-2, { duration: 75 }),
        withTiming(0, { duration: 75 })
      );
    }
  }, [isWrong, isSelected]);

  const getState = () => {
    if (isCorrect) return 'correct';
    if (isWrong && isSelected) return 'wrong';
    if (isSelected) return 'selected';
    return colorType === 'green' ? 'defaultGreen' : 'defaultRed';
  };

  const state = getState();

  // Spec §6.4 True/False: jade tones for صحیح, rose tones for غلط
  const stateMap = {
    correct: {
      bg: Colors.jadeTint12,
      border: Colors.jadeVivid,
      icon: Colors.jadeDim,
      text: Colors.jadeDim,
      iconName: 'checkmark-circle' as keyof typeof Ionicons.glyphMap,
    },
    wrong: {
      bg: Colors.roseTint08,
      border: Colors.rose,
      icon: Colors.roseDim,
      text: Colors.roseDim,
      iconName: 'close-circle' as keyof typeof Ionicons.glyphMap,
    },
    selected: {
      bg: Colors.jadeTint10,
      border: Colors.jadeVivid,
      icon: Colors.jadeDim,
      text: Colors.jadeDim,
      iconName: icon,
    },
    defaultGreen: {
      bg: Colors.jadeVivid,
      border: Colors.jade,
      icon: Colors.white,
      text: Colors.white,
      iconName: icon,
    },
    defaultRed: {
      bg: Colors.rose,
      border: Colors.roseDim,
      icon: Colors.white,
      text: Colors.white,
      iconName: icon,
    },
  };

  const s = stateMap[state];

  const handlePressIn = () => {
    if (!disabled) pressScale.value = withTiming(0.97, { duration: 60 });
  };
  const handlePressOut = () => {
    pressScale.value = withTiming(1, { duration: 100 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: shakeOffset.value },
      { scale: pressScale.value },
    ],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.actionButton,
        {
          backgroundColor: s.bg,
          borderColor: s.border,
        },
        animatedStyle,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled, selected: isSelected }}
    >
      <View style={styles.actionButtonContent}>
        {/* Filled circle icon badge (spec §6.4) */}
        <View style={[styles.iconBadge, { backgroundColor: state === 'correct' || state === 'wrong' || state === 'selected' ? 'transparent' : 'rgba(255,255,255,0.25)' }]}>
          <Ionicons name={s.iconName} size={Layout.isShortDevice ? 22 : 26} color={s.icon} />
        </View>
        <Text style={[styles.actionText, urduStyle, { color: s.text }]}>{label}</Text>
      </View>
    </AnimatedPressable>
  );
};

export const TrueFalse: React.FC<TrueFalseProps> = ({ data, onAnswer, disabled }) => {
  const [selectedOption, setSelectedOption] = useState<boolean | null>(null);

  useEffect(() => {
    setSelectedOption(null);
  }, [data.id]);

  const handlePress = (answer: boolean) => {
    if (disabled || selectedOption !== null) return;
    setSelectedOption(answer);
    const correct = answer === data.isTrue;
    onAnswer(correct);
  };

  const [italian, urdu] = data.statement.split(' = ');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.instructionHeader, urduStyle]}>کیا یہ صحیح ہے؟</Text>
      </View>

      {/* Statement card (spec §6.4 True/False) */}
      <View style={styles.card}>
        <View style={styles.wordContainer}>
          <View style={styles.langBlock}>
            <View style={styles.langLabelRow}>
              <Text style={styles.flagEmoji}>🇮🇹</Text>
              <Text style={styles.langLabel}>Italiano</Text>
            </View>
            <Text style={styles.italianText}>{italian?.trim()}</Text>
          </View>

          {/* Gradient divider: jade-vivid → saffron, 40px wide, 2px tall */}
          <View style={styles.cardDivider} />

          <View style={styles.langBlock}>
            <View style={styles.langLabelRow}>
              <Text style={styles.flagEmoji}>🇵🇰</Text>
              <Text style={styles.langLabel}>اردو</Text>
            </View>
            <Text style={[styles.urduText, urduStyle]}>{urdu?.trim()}</Text>
          </View>
        </View>
      </View>

      <Text style={[styles.hint, urduStyle]}>اوپر دیے گئے ترجمے کی تصدیق کریں</Text>

      {/* Two full-width buttons (spec §6.4) */}
      <View style={styles.actionsContainer}>
        <ActionButton
          label="صحیح ✓"
          colorType="green"
          icon="checkmark-circle"
          isSelected={selectedOption === true}
          isCorrect={selectedOption !== null && data.isTrue}
          isWrong={selectedOption === true && !data.isTrue}
          disabled={disabled || selectedOption !== null}
          onPress={() => handlePress(true)}
        />
        <ActionButton
          label="غلط ✗"
          colorType="red"
          icon="close-circle"
          isSelected={selectedOption === false}
          isCorrect={selectedOption !== null && !data.isTrue}
          isWrong={selectedOption === false && data.isTrue}
          disabled={disabled || selectedOption !== null}
          onPress={() => handlePress(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.isShortDevice ? Layout.spacing.sm : Layout.spacing.lg,
    paddingBottom: Layout.isShortDevice ? Layout.spacing.lg : Layout.spacing.xl,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: Layout.isShortDevice ? Layout.spacing.sm : Layout.spacing.md,
  },
  instructionHeader: {
    fontSize: Layout.isShortDevice ? 16 : 18,
    fontFamily: Fonts.extraBold,
    color: Colors.inkSoft,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Layout.radius.xl,
    borderWidth: 1.5,
    borderColor: Colors.jadeBorder08,
    overflow: 'hidden',
    marginBottom: Layout.isShortDevice ? Layout.spacing.sm : Layout.spacing.lg,
  },
  wordContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.isShortDevice ? Layout.spacing.lg : Layout.spacing.xl,
    paddingVertical: Layout.isShortDevice ? Layout.spacing.lg : Layout.spacing.xl,
    gap: Layout.isShortDevice ? Layout.spacing.md : Layout.spacing.lg,
  },
  langBlock: {
    alignItems: 'center',
    gap: Layout.isShortDevice ? 4 : 6,
    width: '100%',
  },
  langLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.xs,
  },
  flagEmoji: {
    fontSize: Layout.isShortDevice ? 14 : 16,
  },
  langLabel: {
    fontSize: 10,
    color: Colors.inkMuted,
    fontFamily: Fonts.semiBold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  italianText: {
    fontSize: Layout.isShortDevice ? 20 : 24,
    color: Colors.ink,
    fontFamily: Fonts.bold,
    textAlign: 'center',
  },
  // Spec: short gradient divider jade-vivid → saffron, 40px wide, 2px tall
  cardDivider: {
    height: 2,
    width: 40,
    backgroundColor: Colors.jadeVivid,
    borderRadius: 1,
  },
  urduText: {
    fontSize: Layout.isShortDevice ? 26 : 32,
    color: Colors.ink,
    fontFamily: Fonts.urduBold,
    textAlign: 'center',
    lineHeight: Layout.isShortDevice ? 38 : 50,
  },
  hint: {
    fontSize: 11,
    color: Colors.inkMuted,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    marginBottom: Layout.isShortDevice ? Layout.spacing.sm : Layout.spacing.md,
    letterSpacing: 0.3,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: Layout.isShortDevice ? Layout.spacing.sm : Layout.spacing.md,
    width: '100%',
  },
  actionButton: {
    flex: 1,
    height: Layout.isShortDevice ? 56 : 64,
    borderRadius: Layout.radius.lg,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Layout.spacing.sm,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.xs,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: Layout.isShortDevice ? 16 : 18,
    fontFamily: Fonts.extraBold,
  },
});
