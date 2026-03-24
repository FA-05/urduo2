import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getLessonById, Exercise } from '../../data/lessons';
import { masterVocabularyList, VocabularyWord } from '../../data/vocabulary';
import { useExerciseSession } from '../../hooks/useExerciseSession';
import { useHearts } from '../../hooks/useHearts';
import { useSound } from '../../hooks/useSound';
import { useProgressStore } from '../../store/progressStore';
import { shuffle } from '../../utils/shuffle';
import { ExerciseWrapper } from '../../components/exercises/ExerciseWrapper';
import { MultipleChoice } from '../../components/exercises/MultipleChoice';
import { TrueFalse } from '../../components/exercises/TrueFalse';
import { VocabularyCard } from '../../components/exercises/VocabularyCard';
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
  const { weakWords } = useProgressStore();

  const [lessonData, setLessonData] = useState<Exercise[] | null>(null);
  const [xpReward, setXpReward] = useState<number>(10);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState<string | undefined>(undefined);

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
        .slice(0, 5); // Limit practice session to 5 words

      setLessonData(shuffle(practiceExercises));
      setXpReward(5); // Fixed XP for practice
    } else {
      const lesson = getLessonById(id as string);
      if (lesson) {
        setLessonData(shuffle([...lesson.exercises]));
        setXpReward(lesson.xpReward);
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

  if (!lessonData || session.exercises.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  const currentExercise = session.exercises[session.currentIndex];

  const handleAnswer = (correct: boolean) => {
    setLastAnswerCorrect(correct);
    session.recordAnswer(currentExercise.id, correct);

    // Determine the correct answer string for FeedbackBanner if wrong
    if (!correct) {
      if (currentExercise.type === 'MultipleChoice') {
        setLastCorrectAnswer(currentExercise.correctAnswer);
      } else if (currentExercise.type === 'TrueFalse') {
        setLastCorrectAnswer(currentExercise.correctAnswer || (currentExercise.isTrue ? "صحیح" : "غلط"));
      } else {
        setLastCorrectAnswer(undefined);
      }
      loseHeart();
      playSound('incorrect');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else {
      playSound('correct');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    setIsFeedbackVisible(true);
  };

  const handleContinue = () => {
    setIsFeedbackVisible(false);

    if (session.heartsLost >= 5 && hearts === 0) {
      // They died
      router.replace('/(tabs)/');
      return;
    }

    if (session.currentIndex >= session.exercises.length - 1 && (!lastAnswerCorrect && session.currentIndex === session.exercises.length - 1 ? false : true)) {
       if(!lastAnswerCorrect) {
          // If they got the last one wrong, we need to push it to the end of the queue
          // A simplified approach is just to end it here for now if they got through them all,
          // but a real duolingo clone would make them repeat it.
          // Implementing repeat queue logic:
          const failedEx = session.exercises[session.currentIndex];
          session.exercises.push(failedEx);
          session.advanceExercise();
       } else {
           // Lesson complete
            const score = Math.round(((session.exercises.length - session.heartsLost) / session.exercises.length) * 100);

            router.replace({
                pathname: `/lesson-complete/[id]`,
                params: {
                id: id as string,
                xp: xpReward,
                heartsLost: session.heartsLost,
                score,
                answers: JSON.stringify(session.answers)
                }
            });
       }
    } else {
      session.advanceExercise();
    }
  };

  const handleQuit = () => {
    router.replace('/(tabs)/');
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
        xpEarned={Math.round(xpReward / session.exercises.length)} // XP per correct answer roughly
        onContinue={handleContinue}
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