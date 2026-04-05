import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyle } from '../../utils/rtl';
import { SentenceReconstructionExercise as SentenceReconstructionData } from '../../data';
import { Button } from '../ui/Button';
import { shuffle } from '../../utils/shuffle';

interface SentenceReconstructionProps {
  data: SentenceReconstructionData;
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const WordChip = ({
  word,
  onPress,
  disabled,
  variant = 'bank', // 'bank' | 'selected' | 'used'
  isUrdu = false,
}: {
  word: string;
  onPress: () => void;
  disabled: boolean;
  variant?: 'bank' | 'selected' | 'used';
  isUrdu?: boolean;
}) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    if (!disabled && variant !== 'used') scale.value = withTiming(0.93, { duration: 80 });
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const chipStyles = {
    bank: {
      bg: Colors.white,
      border: Colors.border,
      borderBottom: Colors.borderDark,
      text: Colors.textDark,
    },
    selected: {
      bg: Colors.indigoLight,
      border: Colors.indigo,
      borderBottom: Colors.indigoDark,
      text: Colors.indigoDark,
    },
    used: {
      bg: Colors.background,
      border: Colors.border,
      borderBottom: Colors.border,
      text: 'transparent',
    },
  };

  const s = chipStyles[variant];

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || variant === 'used'}
      style={[
        styles.chip,
        {
          backgroundColor: s.bg,
          borderColor: s.border,
          borderBottomColor: s.borderBottom,
          opacity: variant === 'used' ? 0.35 : 1,
        },
        animatedStyle,
      ]}
      android_ripple={variant === 'used' ? null : { color: 'rgba(0,0,0,0.06)' }}
    >
      <Text
        style={[
          styles.chipText,
          isUrdu && urduStyle,
          variant === 'selected' && styles.selectedChipText,
          { color: s.text },
        ]}
      >
        {word}
      </Text>
    </AnimatedPressable>
  );
};

export const SentenceReconstruction: React.FC<SentenceReconstructionProps> = ({
  data,
  onAnswer,
  disabled,
}) => {
  const [selectedWords, setSelectedWords] = useState<{ id: string; word: string }[]>([]);
  const [availableWords, setAvailableWords] = useState<{ id: string; word: string }[]>([]);

  useEffect(() => {
    const randomizedWords = shuffle([...data.shuffledWords]);
    const initialWords = randomizedWords.map((word, index) => ({
      id: `${data.id}-${index}`,
      word,
    }));
    setAvailableWords(initialWords);
    setSelectedWords([]);
  }, [data.id]);

  const handleSelectWord = (wordObj: { id: string; word: string }) => {
    if (disabled) return;
    setSelectedWords([...selectedWords, wordObj]);
    setAvailableWords(availableWords.filter((w) => w.id !== wordObj.id));
  };

  const handleDeselectWord = (wordObj: { id: string; word: string }) => {
    if (disabled) return;
    setSelectedWords(selectedWords.filter((w) => w.id !== wordObj.id));
    setAvailableWords([...availableWords, wordObj]);
  };

  const handleCheck = () => {
    if (disabled || selectedWords.length === 0) return;
    const userSeq = selectedWords.map((w) => w.word);
    const isCorrect =
      userSeq.length === data.correctSequence.length &&
      userSeq.every((w, i) => w === data.correctSequence[i]);
    onAnswer(isCorrect);
  };

  const isUrduBank = data.direction === 'it-to-ur';
  const isUrduQuestion = data.direction === 'ur-to-it';

  const sourceLang = isUrduQuestion ? { flag: '🇵🇰', label: 'اردو' } : { flag: '🇮🇹', label: 'Italiano' };
  const targetLang = isUrduBank ? { flag: '🇮🇹', label: 'Italiano' } : { flag: '🇵🇰', label: 'اردو' };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.instruction, urduStyle]}>ترجمہ مکمل کریں</Text>
      </View>

      {/* Question Card */}
      <View style={styles.questionCard}>
        <Text style={[styles.questionText, isUrduQuestion && urduStyle]}>
          {data.question}
        </Text>
      </View>

      {/* Answer Slot */}
      <View style={styles.slotSection}>
        <View style={styles.slotBox}>
          {selectedWords.length === 0 ? (
            <Text style={styles.slotPlaceholder}>
              {isUrduBank ? 'الفاظ یہاں رکھیں' : 'Tap words below…'}
            </Text>
          ) : (
            <View style={styles.slotRow}>
              {selectedWords.map((wordObj) => (
                <WordChip
                  key={wordObj.id}
                  word={wordObj.word}
                  onPress={() => handleDeselectWord(wordObj)}
                  disabled={disabled}
                  variant="selected"
                  isUrdu={isUrduBank}
                />
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Word Bank */}
      <View style={styles.bankSection}>
        <View style={styles.bankGrid}>
          {availableWords.map((wordObj) => (
            <WordChip
              key={wordObj.id}
              word={wordObj.word}
              onPress={() => handleSelectWord(wordObj)}
              disabled={disabled}
              variant="bank"
              isUrdu={isUrduBank}
            />
          ))}
          {/* Ghost chips for used words to maintain layout */}
          {selectedWords.map((wordObj) => (
            <WordChip
              key={`ghost-${wordObj.id}`}
              word={wordObj.word}
              onPress={() => {}}
              disabled={true}
              variant="used"
              isUrdu={isUrduBank}
            />
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          title="چیک کریں"
          onPress={handleCheck}
          disabled={disabled || selectedWords.length === 0}
          variant="primary"
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
    color: Colors.textMid,
    fontFamily: Fonts.extraBold,
    textAlign: 'center',
  },
  questionCard: {
    padding: Layout.isShortDevice ? Layout.spacing.md : Layout.spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: Layout.radius.xl,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    gap: Layout.isShortDevice ? 4 : 8,
    ...Layout.shadow.card,
    elevation: 3,
  },
  questionText: {
    fontSize: Layout.isShortDevice ? 19 : 24,
    color: Colors.textDark,
    fontFamily: Fonts.bold,
    textAlign: 'center',
  },
  slotSection: {
    gap: Layout.isShortDevice ? 4 : 8,
  },
  slotBox: {
    minHeight: Layout.isShortDevice ? 56 : 68,
    backgroundColor: Colors.background,
    borderRadius: Layout.radius.lg,
    borderWidth: 2,
    borderColor: Colors.borderDark,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.sm,
  },
  slotRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotPlaceholder: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  bankSection: {
    flex: 1,
    justifyContent: 'center',
  },
  bankGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.isShortDevice ? Layout.spacing.xs : Layout.spacing.sm,
    justifyContent: 'center',
    alignContent: 'center',
  },
  chip: {
    borderWidth: 1.5,
    borderBottomWidth: 3,
    borderRadius: Layout.radius.md,
    paddingHorizontal: Layout.isShortDevice ? Layout.spacing.sm : Layout.spacing.md,
    paddingVertical: Layout.isShortDevice ? 6 : Layout.spacing.sm,
    minWidth: 48,
    alignItems: 'center',
    justifyContent: 'center',
    ...Layout.shadow.xs,
  },
  chipText: {
    fontSize: Layout.isShortDevice ? 15 : 17,
    color: Colors.textDark,
    fontFamily: Fonts.semiBold,
    textAlign: 'center',
  },
  selectedChipText: {
    color: Colors.indigoDark,
    fontFamily: Fonts.bold,
  },
  footer: {
    paddingTop: Layout.isShortDevice ? 4 : Layout.spacing.sm,
  },
  checkButton: {
    width: '100%',
  },
});
