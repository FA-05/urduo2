import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getLessonExercises, Exercise } from '../../data';
import { masterVocabularyList, VocabularyWord } from '../../data/vocabulary';
import { useExerciseSession } from '../../hooks/useExerciseSession';
import { useHearts, MAX_HEARTS } from '../../hooks/useHearts';
import { useSound } from '../../hooks/useSound';
import { useProgressStore } from '../../store/progressStore';
import { useCompletionStore } from '../../store/completionStore';
import { shuffle } from '../../utils/shuffle';
import { ExerciseWrapper } from '../../components/exercises/ExerciseWrapper';
import { MultipleChoice } from '../../components/exercises/MultipleChoice';
import { TrueFalse } from '../../components/exercises/TrueFalse';
import { VocabularyCard } from '../../components/exercises/VocabularyCard';
import { SentenceReconstruction } from '../../components/exercises/SentenceReconstruction';
import { FeedbackBanner } from '../../components/exercises/FeedbackBanner';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import * as Haptics from 'expo-haptics';

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { playSound } = useSound();
  const { hearts, loseHeart } = useHearts();
  const { weakWords, recordExerciseResult } = useProgressStore();
  const { setCompletionData } = useCompletionStore();

  const [lessonData, setLessonData] = useState<Exercise[] | null>(null);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState<string | undefined>(undefined);
  const [isOutOfHearts, setIsOutOfHearts] = useState(false);

  const session = useExerciseSession(lessonData || []);

  useEffect(() => {
    if (id === 'practice') {
      // Generate practice session from weak words
      const practiceExercises = weakWords
        .map(wordId => masterVocabularyList.find(w => w.id === wordId))
        .filter((w): w is VocabularyWord => w !== undefined)
        .map(w => ({
          id: `practice-${w.id}`,
          type: 'VocabularyCard' as const,
          italian: w.italian,
          urdu: w.urdu,
          emoji: w.emoji,
          pronunciation: w.pronunciation,
          exampleItalian: w.exampleItalian,
          exampleUrdu: w.exampleUrdu,
        }))
        .slice(0, 5);

      setLessonData(shuffle(practiceExercises));
    } else {
      // Lazy-load exercises only when the lesson screen is opened
      const exercises = getLessonExercises(id as string);
      if (exercises) {
        setLessonData(shuffle([...exercises]));
      } else {
        router.replace('/(tabs)/');
      }
    }
  }, [id]);

  useEffect(() => {
    if (lessonData && lessonData.length > 0) {
      session.resetSession();
    }
  }, [lessonData]);


  const currentExercise = session.exercises[session.currentIndex];

  if (!lessonData || session.exercises.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }


  const handleAnswer = (correct: boolean) => {
    setLastAnswerCorrect(correct);
    session.recordAnswer(currentExercise.id, correct);
    recordExerciseResult(correct);

    const outOfHearts = !correct && hearts <= 1;
    if (outOfHearts) {
      setIsOutOfHearts(true);
    }

    if (!correct) {
      loseHeart();
      playSound('incorrect');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else {
      playSound('correct');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    // VocabularyCard: skip feedback banner, advance directly (unless out of hearts)
    if (currentExercise.type === 'VocabularyCard' && !outOfHearts) {
      advanceOrComplete(correct);
      return;
    }

    // Determine the correct answer string for FeedbackBanner if wrong
    if (!correct) {
      if (currentExercise.type === 'MultipleChoice') {
        setLastCorrectAnswer(currentExercise.correctAnswer);
      } else if (currentExercise.type === 'TrueFalse') {
        setLastCorrectAnswer(currentExercise.correctAnswer || (currentExercise.isTrue ? "صحیح" : "غلط"));
      } else if (currentExercise.type === 'SentenceReconstruction') {
        setLastCorrectAnswer(currentExercise.correctSequence.join(' '));
      } else {
        setLastCorrectAnswer(undefined);
      }
    }

    setIsFeedbackVisible(true);
  };

  const advanceOrComplete = (correct: boolean) => {
    if (isOutOfHearts) {
      router.replace('/(tabs)');
      return;
    }

    if (session.currentIndex >= session.exercises.length - 1) {
      // Lesson complete — write to store, then navigate (no URL params)
      const previousCorrect = session.answers.filter(a => a.correct).length;
      const totalCorrect = previousCorrect + (correct ? 1 : 0);
      const totalExercises = session.exercises.length;
      const score = Math.round((totalCorrect / totalExercises) * 100);
      const finalHeartsLost = session.heartsLost + (correct ? 0 : 1);

      const answersMap = session.answers.reduce<Record<string, boolean>>((acc, a) => {
        acc[a.exerciseId] = a.correct;
        return acc;
      }, {} as Record<string, boolean>);
      answersMap[currentExercise.id] = correct;

      setCompletionData({
        lessonId: id as string,
        score,
        heartsLost: finalHeartsLost,
        answers: answersMap,
      });

      router.replace('/completion');
    } else {
      session.advanceExercise();
    }
  };

  const handleContinue = () => {
    setIsFeedbackVisible(false);
    
    if (isOutOfHearts) {
      router.replace('/(tabs)');
      return;
    }

    advanceOrComplete(!!lastAnswerCorrect);
  };


  const handleQuit = () => {
    router.replace('/(tabs)');
  };

  const renderExercise = () => {
    if (!currentExercise) return null;

    switch (currentExercise.type) {
      case 'MultipleChoice':
        return (
          <MultipleChoice
            data={currentExercise}
            onAnswer={handleAnswer}
            disabled={isFeedbackVisible}
          />
        );
      case 'TrueFalse':
        return (
          <TrueFalse
            data={currentExercise}
            onAnswer={handleAnswer}
            disabled={isFeedbackVisible}
          />
        );
      case 'VocabularyCard':
        return (
          <VocabularyCard
            data={currentExercise}
            onAnswer={handleAnswer}
            disabled={isFeedbackVisible}
          />
        );
      case 'SentenceReconstruction':
        return (
          <SentenceReconstruction
            data={currentExercise}
            onAnswer={handleAnswer}
            disabled={isFeedbackVisible}
          />
        );
      default:
        return <Text>Unknown exercise type</Text>;
    }
  };

  return (
    <ExerciseWrapper
      progress={session.currentIndex / session.exercises.length}
      hearts={hearts}
      onQuit={handleQuit}
    >
      <View style={styles.exerciseContainer}>
        {renderExercise()}
      </View>
      <FeedbackBanner
        visible={isFeedbackVisible}
        isCorrect={!!lastAnswerCorrect}
        correctAnswer={lastCorrectAnswer}
        onContinue={handleContinue}
        outOfHearts={isOutOfHearts}
      />
    </ExerciseWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  exerciseContainer: {
    flex: 1,
  },
});