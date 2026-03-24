import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyle } from '../../utils/rtl';
import { MultipleChoiceExercise as MultipleChoiceData } from '../../data/lessons';

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
}: {
  option: string;
  isSelected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  disabled: boolean;
  onPress: () => void;
}) => {
  const isPressed = useSharedValue(false);
  const shakeOffset = useSharedValue(0);

  useEffect(() => {
    if (isWrong && isSelected) {
      shakeOffset.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-8, { duration: 50 }),
        withTiming(8, { duration: 50 }),
        withTiming(-5, { duration: 50 }),
        withTiming(5, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
  }, [isWrong, isSelected]);

  const handlePressIn = () => {
    if (disabled) return;
    isPressed.value = true;
  };

  const handlePressOut = () => {
    if (disabled) return;
    isPressed.value = false;
  };

  const getColors = () => {
    if (isCorrect) return { bg: Colors.greenLight, border: Colors.greenDark, text: Colors.greenDark };
    if (isWrong && isSelected) return { bg: Colors.redLight, border: Colors.redDark, text: Colors.redDark };
    if (isSelected) return { bg: Colors.blueLight, border: Colors.blueDark, text: Colors.blueDark };
    return { bg: Colors.white, border: Colors.border, text: Colors.textDark };
  };

  const colors = getColors();

  const animatedStyle = useAnimatedStyle(() => {
    const scale = withSpring(isPressed.value ? 0.97 : 1, { mass: 0.5, damping: 15, stiffness: 300 });
    const borderBottomWidth = withSpring(isPressed.value && !disabled ? 2 : 4, { mass: 0.5, damping: 15, stiffness: 300 });
    const translateY = withSpring(isPressed.value && !disabled ? 2 : 0, { mass: 0.5, damping: 15, stiffness: 300 });

    return {
      transform: [{ scale }, { translateX: shakeOffset.value }, { translateY }],
      borderBottomWidth,
    };
  });

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.optionButton,
        { backgroundColor: colors.bg, borderColor: colors.border },
        animatedStyle,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled, selected: isSelected }}
    >
      <Text style={[styles.optionText, urduStyle, { color: colors.text }]}>{option}</Text>
      {isCorrect && <Text style={styles.icon}>✓</Text>}
      {isWrong && isSelected && <Text style={styles.icon}>✗</Text>}
    </AnimatedPressable>
  );
};

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({ data, onAnswer, disabled }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Reset state when data changes (new exercise)
  useEffect(() => {
    setSelectedOption(null);
  }, [data.id]);

  const handlePress = (option: string) => {
    if (disabled || selectedOption) return;
    setSelectedOption(option);
    const correct = option === data.correctAnswer;
    onAnswer(correct);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.instruction, urduStyle]}>اس کا کیا مطلب ہے؟</Text>
      <View style={styles.questionContainer}>
        <Text style={[styles.questionText, urduStyle, { fontFamily: Fonts.extraBold, textAlign: 'center' }]}>{data.question}</Text>
      </View>
      <View style={styles.optionsGrid}>
        {data.options.map((option, index) => {
          const isSelected = selectedOption === option;
          const isCorrect = selectedOption !== null && option === data.correctAnswer && (isSelected || selectedOption !== null); // Reveal correct if wrong selected
          const isWrong = selectedOption === option && option !== data.correctAnswer;

          return (
            <OptionButton
              key={index}
              option={option}
              isSelected={isSelected}
              isCorrect={isCorrect}
              isWrong={isWrong}
              disabled={disabled || selectedOption !== null}
              onPress={() => handlePress(option)}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.spacing.lg,
  },
  instruction: {
    fontSize: 24,
    color: Colors.textDark,
    marginBottom: Layout.spacing.xl,
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xxl,
  },
  questionText: {
    fontSize: 32,
    color: Colors.textDark,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Layout.spacing.md,
  },
  optionButton: {
    width: '48%',
    minHeight: 80,
    borderRadius: Layout.radius.lg,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.md,
    flexDirection: 'row',
  },
  optionText: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 20,
    marginLeft: 8,
    fontFamily: Fonts.extraBold,
  },
});