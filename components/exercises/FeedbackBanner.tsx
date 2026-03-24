import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { Button } from '../ui/Button';
import { urduStyle } from '../../utils/rtl';

interface FeedbackBannerProps {
  visible: boolean;
  isCorrect: boolean;
  correctAnswer?: string; // Passed when incorrect to show the right answer
  xpEarned?: number;
  onContinue: () => void;
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  visible,
  isCorrect,
  correctAnswer,
  xpEarned = 10,
  onContinue,
}) => {
  const translateY = useSharedValue(200);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 15, stiffness: 200 });
    } else {
      translateY.value = withTiming(200, { duration: 300 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const getTheme = () => {
    if (isCorrect) {
      return {
        bg: Colors.greenLight,
        border: Colors.green,
        icon: '✓',
        iconColor: Colors.greenDark,
        titleColor: Colors.greenDark,
        buttonVariant: 'primary' as const,
      };
    } else {
      return {
        bg: Colors.redLight,
        border: Colors.red,
        icon: '✗',
        iconColor: Colors.redDark,
        titleColor: Colors.redDark,
        buttonVariant: 'danger' as const,
      };
    }
  };

  const theme = getTheme();

  return (
    <Animated.View style={[styles.container, { backgroundColor: theme.bg, borderTopColor: theme.border }, animatedStyle]}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={[styles.iconContainer, { backgroundColor: theme.bg }]}>
            <Text style={[styles.iconText, { color: theme.iconColor }]}>{theme.icon}</Text>
          </View>
          <View style={styles.textContainer}>
             <Text style={[styles.title, urduStyle, { color: theme.titleColor }]}>
               {isCorrect ? 'بہت خوب! 🎉' : 'غلط جواب'}
             </Text>
             {isCorrect ? (
                <Text style={styles.subtitle}>XP earned +{xpEarned} XP</Text>
             ) : (
                <View style={styles.correctAnswerContainer}>
                    <Text style={[styles.correctAnswerLabel, urduStyle, { color: theme.titleColor }]}>صحیح جواب:</Text>
                    <Text style={[styles.correctAnswerText, urduStyle, { color: theme.titleColor }]}>{correctAnswer}</Text>
                </View>
             )}
          </View>
        </View>
        <Button
          title="جاری رکھیں"
          variant={theme.buttonVariant}
          onPress={onContinue}
          style={styles.button}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.xxl, // Account for safe area roughly
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  content: {
    flexDirection: 'column',
    gap: Layout.spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.md,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  iconText: {
    fontFamily: Fonts.extraBold,
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: 24,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.textMid,
  },
  correctAnswerContainer: {
    alignItems: 'flex-end',
  },
  correctAnswerLabel: {
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
  correctAnswerText: {
    fontFamily: Fonts.extraBold,
    fontSize: 18,
  },
  button: {
    width: '100%',
  },
});