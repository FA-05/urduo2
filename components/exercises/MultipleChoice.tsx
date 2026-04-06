import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
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
import { MultipleChoiceExercise as MultipleChoiceData } from '../../data';
import { shuffle } from '../../utils/shuffle';
import { Button } from '../ui/Button';

interface MultipleChoiceProps {
  data: MultipleChoiceData;
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const OptionButton = ({
  option,
  isSelected,
  isCorrect,
  isWrong,
  disabled,
  onPress,
  index,
}: {
  option: string;
  isSelected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  disabled: boolean;
  onPress: () => void;
  index: number;
}) => {
  const shakeOffset = useSharedValue(0);
  const pressScale = useSharedValue(1);

  useEffect(() => {
    if (isWrong && isSelected) {
      // Spec §7.3: shake translateX(-4, 4, -2, 0) over 300ms
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
    return 'default';
  };

  const state = getState();

  // Spec §6.4 Multiple Choice
  const stateStyles = {
    correct: {
      bg: Colors.jadeTint12,
      border: Colors.jadeVivid,
      text: Colors.jadeDim,
    },
    wrong: {
      bg: Colors.roseTint08,
      border: Colors.rose,
      text: Colors.roseDim,
    },
    selected: {
      bg: Colors.jadeTint10,
      border: Colors.jadeVivid,
      text: Colors.jadeDim,
    },
    default: {
      bg: Colors.white,
      border: Colors.jadeBorder10,
      text: Colors.ink,
    },
  };

  const s = stateStyles[state];

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

  const labels = ['A', 'B', 'C', 'D'];

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.optionButton,
        {
          backgroundColor: s.bg,
          borderColor: s.border,
        },
        animatedStyle,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled, selected: isSelected }}
    >
      <View style={[styles.letterBadge, { borderColor: s.border }]}>
        <Text style={[styles.letterBadgeText, { color: s.text }]}>
          {state === 'correct' ? '✓' : state === 'wrong' ? '✗' : labels[index] ?? '•'}
        </Text>
      </View>

      <Text style={[styles.optionText, urduStyle, { color: s.text }]} numberOfLines={2}>
        {option}
      </Text>
    </AnimatedPressable>
  );
};

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({ data, onAnswer, disabled }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const cleanQuestionText = (text: string) => {
    const quoteMatch = text.match(/["'«»"„]([^"'«»""„]+)["'«»""„]/);
    if (quoteMatch) return quoteMatch[1];
    const parenMatch = text.match(/\(([^)]+)\)/);
    if (parenMatch) return parenMatch[1];
    return text;
  };

  const displayQuestion = cleanQuestionText(data.question);

  useEffect(() => {
    setSelectedOption(null);
    setShuffledOptions(shuffle([...data.options]));
  }, [data.id]);

  const handlePress = (option: string) => {
    if (disabled || (selectedOption && disabled)) return;
    setSelectedOption(option);
  };

  const handleCheck = () => {
    if (!selectedOption || disabled) return;
    onAnswer(selectedOption === data.correctAnswer);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.instruction, urduStyle]}>اس کا کیا مطلب ہے؟</Text>
      </View>

      {/* Question card — spec: jade gradient */}
      <View style={styles.questionCard}>
        <Text style={[styles.questionText, urduStyle]}>{displayQuestion}</Text>
        <Text style={styles.questionHint}>صحیح ترجمہ چنیں</Text>
      </View>

      <View style={styles.optionsGrid}>
        {shuffledOptions.map((option, index) => {
          const isSelected = selectedOption === option;
          const isCorrect = disabled && option === data.correctAnswer;
          const isWrong = disabled && isSelected && option !== data.correctAnswer;

          return (
            <OptionButton
              key={index}
              index={index}
              option={option}
              isSelected={isSelected}
              isCorrect={isCorrect}
              isWrong={isWrong}
              disabled={disabled}
              onPress={() => handlePress(option)}
            />
          );
        })}
      </View>

      <View style={styles.footer}>
        <Button
          title="چیک کریں"
          variant="primary"
          disabled={!selectedOption || disabled}
          onPress={handleCheck}
          style={styles.checkButton}
          size="lg"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.isShortDevice ? Layout.spacing.sm : Layout.spacing.md,
    paddingBottom: Layout.isShortDevice ? Layout.spacing.lg : Layout.spacing.xl,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: Layout.isShortDevice ? 4 : Layout.spacing.sm,
  },
  instruction: {
    fontSize: Layout.isShortDevice ? 17 : 20,
    color: Colors.inkSoft,
    fontFamily: Fonts.extraBold,
    textAlign: 'center',
  },
  questionCard: {
    alignItems: 'center',
    padding: Layout.isShortDevice ? Layout.spacing.md : Layout.spacing.lg,
    backgroundColor: Colors.jadeDim,
    borderRadius: Layout.radius.lg,
    gap: Layout.isShortDevice ? 4 : 8,
  },
  questionText: {
    fontFamily: Fonts.urduBold,
    fontSize: Layout.isShortDevice ? 26 : 32,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: Layout.isShortDevice ? 40 : 50,
  },
  questionHint: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    fontFamily: Fonts.regular,
    letterSpacing: 0.3,
    marginTop: 2,
  },
  optionsGrid: {
    flex: 1,
    justifyContent: 'center',
    gap: Layout.isShortDevice ? Layout.spacing.xs : Layout.spacing.sm,
    paddingVertical: Layout.isShortDevice ? 4 : Layout.spacing.sm,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.isShortDevice ? 10 : 14,
    borderRadius: Layout.radius.lg,
    borderWidth: 2,
    gap: Layout.spacing.sm,
  },
  letterBadge: {
    width: Layout.isShortDevice ? 28 : 32,
    height: Layout.isShortDevice ? 28 : 32,
    borderRadius: Layout.isShortDevice ? 14 : 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  letterBadgeText: {
    fontFamily: Fonts.extraBold,
    fontSize: Layout.isShortDevice ? 13 : 15,
  },
  optionText: {
    fontSize: Layout.isShortDevice ? 16 : 18,
    textAlign: 'right',
    flex: 1,
    fontFamily: Fonts.bold,
  },
  footer: {
    paddingTop: Layout.isShortDevice ? 4 : Layout.spacing.sm,
  },
  checkButton: {
    width: '100%',
  },
});
