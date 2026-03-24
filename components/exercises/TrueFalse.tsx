import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyle } from '../../utils/rtl';
import { TrueFalseExercise as TrueFalseData } from '../../data/lessons';
import { Badge } from '../ui/Badge';

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
}: {
  label: string;
  colorType: 'green' | 'red';
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
    if (colorType === 'green') return { bg: Colors.green, border: Colors.greenDark, text: Colors.white };
    if (colorType === 'red') return { bg: Colors.red, border: Colors.redDark, text: Colors.white };
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
        styles.actionButton,
        { backgroundColor: colors.bg, borderColor: colors.border },
        animatedStyle,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled, selected: isSelected }}
    >
      <Text style={[styles.actionText, urduStyle, { color: colors.text }]}>{label}</Text>
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

  return (
    <View style={styles.container}>
      <Badge label="صحیح؟" variant="neutral" style={styles.badge} textStyle={urduStyle} />
      <View style={styles.card}>
        <Text style={[styles.statementText, urduStyle, { fontFamily: Fonts.extraBold, textAlign: 'center' }]}>{data.statement}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <ActionButton
          label="صحیح"
          colorType="green"
          isSelected={selectedOption === true}
          isCorrect={selectedOption !== null && data.isTrue} // Reveal correct if chosen true and it is true, or chosen false and it is true
          isWrong={selectedOption === true && !data.isTrue}
          disabled={disabled || selectedOption !== null}
          onPress={() => handlePress(true)}
        />
        <ActionButton
          label="غلط"
          colorType="red"
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
    padding: Layout.spacing.lg,
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'center',
    marginBottom: Layout.spacing.lg,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.xxl,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    marginBottom: Layout.spacing.xxl,
    ...Layout.shadow.card,
  },
  statementText: {
    fontSize: 36,
    color: Colors.textDark,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Layout.spacing.lg,
  },
  actionButton: {
    flex: 1,
    height: 64,
    borderRadius: Layout.radius.lg,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 24,
  },
});