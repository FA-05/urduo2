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
  variant = 'bank',
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

  // Spec §6.4 Sentence Builder
  const chipStyles = {
    bank: {
      bg: Colors.white,
      border: Colors.jadeBorder15,
      text: Colors.ink,
    },
    selected: {
      bg: Colors.jadeTint10,
      border: Colors.jadeVivid,
      text: Colors.jadeDim,
    },
    used: {
      bg: Colors.creamDeep,
      border: Colors.jadeBorder08,
      text: 'transparent' as string,
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.instruction, urduStyle]}>ترجمہ مکمل کریں</Text>
      </View>

      <View style={styles.questionCard}>
        <Text style={[styles.questionText, data.direction === 'ur-to-it' && urduStyle]}>
          {data.question}
        </Text>
      </View>

      {/* Answer slot — spec: dashed border rgba-jade-25, r-lg, rgba-white-70 bg */}
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

      {/* Word bank — spec: white fill chips, rgba-jade-15 border, r-sm */}
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
    color: Colors.inkSoft,
    fontFamily: Fonts.extraBold,
    textAlign: 'center',
  },
  questionCard: {
    padding: Layout.isShortDevice ? Layout.spacing.md : Layout.spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: Layout.radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.jadeBorder08,
    alignItems: 'center',
  },
  questionText: {
    fontSize: Layout.isShortDevice ? 19 : 24,
    color: Colors.ink,
    fontFamily: Fonts.bold,
    textAlign: 'center',
  },
  slotSection: {
    gap: Layout.isShortDevice ? 4 : 8,
  },
  slotBox: {
    minHeight: Layout.isShortDevice ? 56 : 68,
    backgroundColor: 'rgba(255,255,255,0.70)',
    borderRadius: Layout.radius.lg,
    borderWidth: 2,
    borderColor: Colors.jadeBorder25,
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
    color: Colors.inkMuted,
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
    borderRadius: Layout.radius.sm,
    paddingHorizontal: Layout.isShortDevice ? Layout.spacing.sm : Layout.spacing.md,
    paddingVertical: Layout.isShortDevice ? 6 : Layout.spacing.sm,
    minWidth: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: Layout.isShortDevice ? 15 : 17,
    color: Colors.ink,
    fontFamily: Fonts.semiBold,
    textAlign: 'center',
  },
  selectedChipText: {
    color: Colors.jadeDim,
    fontFamily: Fonts.bold,
  },
  footer: {
    paddingTop: Layout.isShortDevice ? 4 : Layout.spacing.sm,
  },
  checkButton: {
    width: '100%',
  },
});
