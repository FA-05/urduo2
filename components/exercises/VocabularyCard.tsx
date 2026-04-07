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
          style={[styles.cardBase, frontAnimatedStyle]}
        >
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              handleSpeak(data.italian);
            }}
            style={styles.ttsButton}
          >
            <Ionicons name="volume-high" size={22} color={Colors.jade} />
          </Pressable>

          <View style={styles.langBadgeIt}>
            <Text style={styles.langBadgeFlag}>🇮🇹</Text>
            <Text style={styles.langBadgeTextIt}>Italiano</Text>
          </View>

          <Text style={styles.emoji}>{data.emoji}</Text>
          <Text style={styles.italianText}>{data.italian}</Text>
          <Text style={styles.pronunciation}>[{data.pronunciation}]</Text>
          <Text style={styles.tapHint}>اُلٹنے کے لیے ٹیپ کریں</Text>
        </AnimatedPressable>

        {/* Back — Urdu */}
        <AnimatedPressable
          onPress={handleFlip}
          style={[styles.cardBase, backAnimatedStyle]}
        >
          <View style={styles.langBadgeUr}>
            <Text style={styles.langBadgeFlag}>🇵🇰</Text>
            <Text style={styles.langBadgeTextUr}>اردو</Text>
          </View>

          <View style={styles.urduSection}>
            <Text style={[styles.urduText, urduStyleDisplay]}>{data.urdu}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.exampleBlock}>
            <View style={styles.exampleHeader}>
              <Text style={styles.exampleItalian}>"{data.exampleItalian}"</Text>
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  handleSpeak(data.exampleItalian);
                }}
                style={styles.ttsButtonSmall}
              >
                <Ionicons name="volume-medium" size={18} color={Colors.jade} />
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
            <Text style={[styles.actionButtonText, urduStyle, { color: Colors.inkSoft }]}>
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
    borderRadius: Layout.radius.xl,
    padding: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.jadeBorder08,
    backgroundColor: Colors.white,
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  ttsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.jadeTint08,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ttsButtonSmall: {
    padding: 4,
    borderRadius: 10,
    backgroundColor: Colors.jadeTint08,
  },
  langBadgeIt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Layout.radius.full,
    backgroundColor: Colors.jadeTint10,
    marginBottom: Layout.spacing.sm,
  },
  langBadgeUr: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Layout.radius.full,
    backgroundColor: Colors.saffronTint12,
    alignSelf: 'flex-end',
    marginBottom: Layout.spacing.md,
  },
  langBadgeFlag: { fontSize: 14 },
  langBadgeTextIt: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    color: Colors.jade,
    letterSpacing: 0.3,
  },
  langBadgeTextUr: {
    fontFamily: Fonts.urduSemiBold,
    fontSize: 13,
    color: Colors.saffronDim,
    writingDirection: 'rtl',
  },
  emoji: {
    fontSize: 56,
    marginBottom: Layout.spacing.md,
  },
  italianText: {
    fontFamily: Fonts.extraBold,
    fontSize: 38,
    color: Colors.ink,
    textAlign: 'center',
    letterSpacing: -1.14,
    marginBottom: Layout.spacing.xs,
  },
  pronunciation: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.inkMuted,
  },
  tapHint: {
    position: 'absolute',
    bottom: 20,
    fontFamily: Fonts.urdu,
    fontSize: 12,
    color: Colors.inkMuted,
    writingDirection: 'rtl',
  },
  urduSection: {
    alignItems: 'flex-end',
    width: '100%',
  },
  urduText: {
    fontSize: 32,
    color: Colors.ink,
    lineHeight: 32 * 2.2,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.jadeBorder08,
    marginVertical: Layout.spacing.md,
  },
  exampleBlock: {
    width: '100%',
    gap: Layout.spacing.xs,
    padding: Layout.spacing.md,
    backgroundColor: Colors.jadeTint06,
    borderRadius: Layout.radius.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.jadeVivid,
  },
  exampleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Layout.spacing.xs,
  },
  exampleItalian: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.inkSoft,
    fontStyle: 'italic',
    flex: 1,
  },
  exampleUrdu: {
    fontSize: 15,
    color: Colors.inkSoft,
    lineHeight: 15 * 2.2,
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
  },
  notYetButton: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.jadeBorder20,
  },
  knewItButton: {
    backgroundColor: Colors.jadeVivid,
    ...Layout.shadow.btn,
  },
  actionButtonText: {
    fontFamily: Fonts.urduBold,
    fontSize: 18,
  },
});
