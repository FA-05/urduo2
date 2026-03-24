import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyle } from '../../utils/rtl';
import { VocabularyCardExercise as VocabularyData } from '../../data/lessons';

interface VocabularyCardProps {
  data: VocabularyData;
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const VocabularyCard: React.FC<VocabularyCardProps> = ({ data, onAnswer, disabled }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useSharedValue(0);

  useEffect(() => {
    setIsFlipped(false);
    flipAnim.value = 0;
  }, [data.id]);

  const handleFlip = () => {
    if (disabled) return;
    setIsFlipped(!isFlipped);
    flipAnim.value = withTiming(isFlipped ? 0 : 1, {
      duration: 350,
      easing: Easing.out(Easing.cubic),
    });
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipAnim.value, [0, 1], [0, 90]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity: interpolate(flipAnim.value, [0, 0.5, 0.51, 1], [1, 1, 0, 0]),
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipAnim.value, [0, 1], [-90, 0]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity: interpolate(flipAnim.value, [0, 0.49, 0.5, 1], [0, 0, 1, 1]),
    };
  });

  const handleAction = (knewIt: boolean) => {
    if (disabled || !isFlipped) return;
    onAnswer(knewIt);
  };

  return (
    <View style={styles.container}>
      <AnimatedPressable onPress={handleFlip} style={[styles.cardContainer, frontAnimatedStyle]}>
        <Text style={styles.flag}>🇮🇹</Text>
        <Text style={styles.emoji}>{data.emoji}</Text>
        <Text style={styles.italianText}>{data.italian}</Text>
        <Text style={styles.pronunciation}>{data.pronunciation}</Text>
        <Text style={styles.hintText}>Tocca per girare (tap to flip)</Text>
      </AnimatedPressable>

      <AnimatedPressable onPress={handleFlip} style={[styles.cardContainer, styles.cardBack, backAnimatedStyle]}>
        <Text style={styles.flag}>🇵🇰</Text>
        <View style={styles.urduContainer}>
            <Text style={[styles.urduText, urduStyle]}>{data.urdu}</Text>
        </View>
        <View style={styles.examplesContainer}>
            <Text style={styles.exampleItalian}>{data.exampleItalian}</Text>
            <Text style={[styles.exampleUrdu, urduStyle]}>{data.exampleUrdu}</Text>
        </View>
      </AnimatedPressable>

      <View style={[styles.actionsContainer, { opacity: isFlipped ? 1 : 0 }]} pointerEvents={isFlipped ? 'auto' : 'none'}>
        <Pressable
          style={[styles.actionButton, styles.notYetButton]}
          onPress={() => handleAction(false)}
        >
          <Text style={[styles.actionButtonText, urduStyle, { color: Colors.textMid }]}>ابھی نہیں</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.knewItButton]}
          onPress={() => handleAction(true)}
        >
          <Text style={[styles.actionButtonText, urduStyle, { color: Colors.white }]}>یاد ہے!</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    height: 400,
    backgroundColor: Colors.white,
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    backfaceVisibility: 'hidden',
    position: 'absolute',
    ...Layout.shadow.card,
  },
  cardBack: {
    backgroundColor: Colors.white,
  },
  flag: {
    position: 'absolute',
    top: Layout.spacing.lg,
    right: Layout.spacing.lg,
    fontSize: 24,
  },
  emoji: {
    fontSize: 72,
    marginBottom: Layout.spacing.lg,
  },
  italianText: {
    fontFamily: Fonts.extraBold,
    fontSize: 40,
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: Layout.spacing.sm,
  },
  pronunciation: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  hintText: {
    position: 'absolute',
    bottom: Layout.spacing.lg,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textMuted,
  },
  urduContainer: {
    alignItems: 'flex-end',
    width: '100%',
    marginBottom: Layout.spacing.xxl,
  },
  urduText: {
    fontFamily: Fonts.extraBold,
    fontSize: 44,
    color: Colors.textDark,
  },
  examplesContainer: {
    width: '100%',
    gap: Layout.spacing.sm,
  },
  exampleItalian: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    color: Colors.textMid,
    fontStyle: 'italic',
  },
  exampleUrdu: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    color: Colors.textMid,
  },
  actionsContainer: {
    position: 'absolute',
    bottom: -100, // Move below the card initially, adjust based on layout
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Layout.spacing.lg,
    marginTop: Layout.spacing.xxl,
  },
  actionButton: {
    flex: 1,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderBottomWidth: 4,
  },
  notYetButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.borderDark,
  },
  knewItButton: {
    backgroundColor: Colors.green,
    borderColor: Colors.greenDark,
  },
  actionButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 20,
  },
});