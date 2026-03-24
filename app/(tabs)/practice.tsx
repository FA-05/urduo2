import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProgressStore } from '../../store/progressStore';
import { getWordById, VocabularyWord } from '../../data/vocabulary';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyle } from '../../utils/rtl';

export default function PracticeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { weakWords, loadProgress } = useProgressStore();
  const [wordsToReview, setWordsToReview] = React.useState<VocabularyWord[]>([]);

  useEffect(() => {
    loadProgress().then(() => {
      const words = weakWords
        .map(id => getWordById(id))
        .filter((w): w is VocabularyWord => w !== undefined);
      setWordsToReview(words);
    });
  }, [weakWords, loadProgress]);

  const handleStartPractice = () => {
    if (wordsToReview.length > 0) {
      router.push({
        pathname: '/lesson/practice',
        params: { mode: 'practice' },
      });
    }
  };

  const renderWord = ({ item }: { item: VocabularyWord }) => (
    <Card style={styles.wordCard}>
      <Text style={styles.wordEmoji}>{item.emoji}</Text>
      <View style={styles.wordContent}>
        <Text style={styles.wordItalian}>{item.italian}</Text>
        <Text style={[styles.wordUrdu, urduStyle]}>{item.urdu}</Text>
      </View>
    </Card>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={[styles.title, urduStyle]}>کمزور الفاظ</Text>
        <Badge label="Weak Words" variant="neutral" />
      </View>

      {wordsToReview.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🎉</Text>
          <Text style={[styles.emptyTitle, urduStyle]}>سب ٹھیک ہے!</Text>
          <Text style={[styles.emptySubtitle, urduStyle]}>
            آپ کے پاس جائزہ لینے کے لیے کوئی کمزور الفاظ نہیں ہیں۔
          </Text>
        </View>
      ) : (
        <>
          <Text style={[styles.subtitle, urduStyle]}>
            ان الفاظ پر مزید مشق کی ضرورت ہے:
          </Text>
          <FlatList
            data={wordsToReview}
            keyExtractor={(item) => item.id}
            renderItem={renderWord}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="مشق شروع کریں"
              onPress={handleStartPractice}
              size="lg"
              style={{ width: '100%' }}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Layout.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.xl,
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: 28,
    color: Colors.textDark,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textMid,
    marginBottom: Layout.spacing.lg,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: Layout.spacing.lg,
  },
  emptyTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 28,
    color: Colors.greenDark,
    textAlign: 'center',
    marginBottom: Layout.spacing.md,
  },
  emptySubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textMid,
    textAlign: 'center',
    lineHeight: 24,
  },
  listContent: {
    gap: Layout.spacing.md,
    paddingBottom: 100, // Make room for the button
  },
  wordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
    gap: Layout.spacing.md,
  },
  wordEmoji: {
    fontSize: 32,
  },
  wordContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wordItalian: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.textDark,
  },
  wordUrdu: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.textDark,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: Layout.spacing.xl,
    left: Layout.spacing.lg,
    right: Layout.spacing.lg,
    backgroundColor: 'rgba(247, 247, 247, 0.9)',
    paddingTop: Layout.spacing.md,
  },
});