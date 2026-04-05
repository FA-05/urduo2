import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyle, urduStyleDisplay } from '../../utils/rtl';
import { VocabularyCardExercise as VocabularyData } from '../../data';
import { useSound } from '../../hooks/useSound';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

interface VocabularyCardProps {
  data: VocabularyData;
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
  showActions?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  data,
  onAnswer,
  disabled,
  showActions = true,
}) => {
  const { speak } = useSound();
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useSharedValue(0);

  useEffect(() => {
    setIsFlipped(false);
    flipAnim.value = 0;
  }, [data.id]);

  const handleFlip = () => {
    const next = !isFlipped;
    setIsFlipped(next);
    flipAnim.value = withTiming(next ? 1 : 0, {
      duration: 320,
      easing: Easing.out(Easing.cubic),
    });
  };

  const handleSpeak = (text: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    speak(text);
  };

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${interpolate(flipAnim.value, [0, 1], [0, 90])}deg` }],
    opacity: interpolate(flipAnim.value, [0, 0.48, 0.5, 1], [1, 1, 0, 0]),
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${interpolate(flipAnim.value, [0, 1], [-90, 0])}deg` }],
    opacity: interpolate(flipAnim.value, [0, 0.48, 0.5, 1], [0, 0, 1, 1]),
  }));

  const handleAction = (knewIt: boolean) => {
    if (disabled || !isFlipped) return;
    onAnswer(knewIt);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        {/* Front — Italian */}
        <AnimatedPressable
          onPress={handleFlip}
          style={[styles.cardBase, styles.cardFront, frontAnimatedStyle]}
        >
          <Text style={styles.flagCorner}>🇮🇹</Text>
          <Text style={styles.tapHint}>اُلٹنے کے لیے ٹیپ کریں</Text>
          <Text style={styles.emoji}>{data.emoji}</Text>
          <View style={styles.italianContainer}>
            <Text style={styles.italianText}>{data.italian}</Text>
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                handleSpeak(data.italian);
              }}
              style={styles.audioButtonSmall}
            >
              <Ionicons name="volume-high" size={24} color={Colors.primary} />
            </Pressable>
          </View>
          <Text style={styles.pronunciation}>[{data.pronunciation}]</Text>
        </AnimatedPressable>

        {/* Back — Urdu */}
        <AnimatedPressable
          onPress={handleFlip}
          style={[styles.cardBase, styles.cardBack, backAnimatedStyle]}
        >
          <Text style={styles.flagCorner}>🇵🇰</Text>
          <View style={styles.urduSection}>
            <Text style={[styles.urduText, urduStyleDisplay]}>{data.urdu}</Text>
          </View>
          <View style={styles.exampleBlock}>
            <View style={styles.exampleHeader}>
              <Text style={styles.exampleItalian}>"{data.exampleItalian}"</Text>
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  handleSpeak(data.exampleItalian);
                }}
                style={styles.audioButtonTiny}
              >
                <Ionicons name="volume-medium" size={20} color={Colors.primary} />
              </Pressable>
            </View>
            <Text style={[styles.exampleUrdu, urduStyle]}>"{data.exampleUrdu}"</Text>
          </View>
        </AnimatedPressable>
      </View>

      {showActions && (
        <View
          style={[styles.actionsContainer, { opacity: isFlipped ? 1 : 0 }]}
          pointerEvents={isFlipped ? 'auto' : 'none'}
        >
          <Pressable
            style={[styles.actionButton, styles.notYetButton]}
            onPress={() => handleAction(false)}
          >
            <Text style={[styles.actionButtonText, urduStyle, { color: Colors.textMid }]}>
              ابھی نہیں
            </Text>
          </Pressable>
          <Pressable
            style={[styles.actionButton, styles.knewItButton]}
            onPress={() => handleAction(true)}
          >
            <Text style={[styles.actionButtonText, urduStyle, { color: Colors.white }]}>
              یاد ہے!
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Layout.spacing.xl,
  },
  cardWrapper: {
    width: '100%',
    height: 380,
    position: 'relative',
  },
  cardBase: {
    width: '100%',
    height: 380,
    borderRadius: Layout.radius.xxl,
    padding: Layout.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderBottomWidth: 4,
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    ...Layout.shadow.card,
  },
  cardFront: {
    backgroundColor: Colors.white,
  },
  cardBack: {
    backgroundColor: Colors.surface,
  },
  flagCorner: {
    position: 'absolute',
    top: Layout.spacing.lg,
    right: Layout.spacing.lg,
    fontSize: 22,
  },
  tapHint: {
    position: 'absolute',
    bottom: Layout.spacing.lg,
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  emoji: {
    fontSize: 68,
    marginBottom: Layout.spacing.lg,
  },
  italianText: {
    fontFamily: Fonts.extraBold,
    fontSize: 38,
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: Layout.spacing.xs,
    letterSpacing: -0.5,
  },
  pronunciation: {
    fontFamily: Fonts.regular,
    fontSize: 17,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  urduSection: {
    alignItems: 'flex-end',
    width: '100%',
    marginBottom: Layout.spacing.xl,
  },
  urduText: {
    fontSize: 46,
    color: Colors.textDark,
  },
  exampleBlock: {
    width: '100%',
    gap: Layout.spacing.xs,
    padding: Layout.spacing.md,
    backgroundColor: Colors.background,
    borderRadius: Layout.radius.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  exampleItalian: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.textMid,
    fontStyle: 'italic',
    flex: 1,
  },
  exampleUrdu: {
    fontSize: 16,
    color: Colors.textMid,
  },
  italianContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.xs,
  },
  exampleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Layout.spacing.xs,
  },
  audioButtonSmall: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.primary + '11',
  },
  audioButtonTiny: {
    padding: 4,
    borderRadius: 15,
    backgroundColor: Colors.primary + '11',
  },
  actionsContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: Layout.spacing.md,
  },
  actionButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: Layout.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderBottomWidth: 3,
  },
  notYetButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.borderDark,
  },
  knewItButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryDark,
  },
  actionButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
  },
});