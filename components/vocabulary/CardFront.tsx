import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { VocabularyWord } from '../../data/vocabulary';

interface CardFrontProps {
  word: VocabularyWord;
}

export const CardFront: React.FC<CardFrontProps> = ({ word }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{word.emoji}</Text>

      <Text style={styles.urduWord}>{word.urdu}</Text>

      <Text style={styles.pronunciation}>{word.pronunciation}</Text>

      <View style={styles.tapHint}>
        <Ionicons name="sync-outline" size={14} color={Colors.inkMuted} />
        <Text style={styles.tapHintText}>Tap to flip</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
  },
  emoji: {
    fontSize: 48,
    marginBottom: Layout.spacing.md,
  },
  urduWord: {
    fontFamily: Fonts.urduBold,
    fontSize: 40,
    color: Colors.ink,
    writingDirection: 'rtl',
    textAlign: 'center',
    lineHeight: 40 * 2.2,
    paddingVertical: 8,
    marginBottom: Layout.spacing.xs,
  },
  pronunciation: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: Colors.jade,
    fontStyle: 'italic',
    marginBottom: Layout.spacing.xl,
  },
  tapHint: {
    position: 'absolute',
    bottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.jadeBorder25,
    borderStyle: 'dashed',
    borderRadius: Layout.radius.full,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  tapHintText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Colors.inkMuted,
  },
});
