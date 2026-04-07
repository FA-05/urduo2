import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { VocabularyWord } from '../../data/vocabulary';

interface CardBackProps {
  word: VocabularyWord;
}

export const CardBack: React.FC<CardBackProps> = ({ word }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.urduSmall}>{word.urdu}</Text>
        <Text style={styles.pronunciationSmall}>{word.pronunciation}</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.italianWord}>{word.italian}</Text>

      {(word.exampleItalian || word.exampleUrdu) && (
        <View style={styles.exampleBlock}>
          {word.exampleItalian && (
            <Text style={styles.exampleItalian}>"{word.exampleItalian}"</Text>
          )}
          {word.exampleUrdu && (
            <Text style={styles.exampleUrdu}>"{word.exampleUrdu}"</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ink,
    padding: Layout.spacing.lg,
    justifyContent: 'center',
  },
  topSection: {
    alignItems: 'flex-end',
  },
  urduSmall: {
    fontFamily: Fonts.urduSemiBold,
    fontSize: 18,
    color: 'rgba(255,255,255,0.5)',
    writingDirection: 'rtl',
    textAlign: 'right',
    lineHeight: 18 * 2.2,
    paddingVertical: 4,
  },
  pronunciationSmall: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.35)',
    fontStyle: 'italic',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: Layout.spacing.md,
  },
  italianWord: {
    fontFamily: Fonts.extraBold,
    fontSize: 36,
    color: Colors.white,
    textAlign: 'center',
    letterSpacing: -1,
    marginBottom: Layout.spacing.lg,
  },
  exampleBlock: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.jadeVivid,
    gap: Layout.spacing.xs,
  },
  exampleItalian: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontStyle: 'italic',
  },
  exampleUrdu: {
    fontFamily: Fonts.urduMedium,
    fontSize: 15,
    color: 'rgba(255,255,255,0.5)',
    writingDirection: 'rtl',
    textAlign: 'right',
    lineHeight: 15 * 2.2,
    paddingVertical: 4,
  },
});
