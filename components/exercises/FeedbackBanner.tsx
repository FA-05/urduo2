import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { Button } from '../ui/Button';
import { urduStyle } from '../../utils/rtl';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FeedbackBannerProps {
  visible: boolean;
  isCorrect: boolean;
  correctAnswer?: string;
  onContinue: () => void;
  outOfHearts?: boolean;
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  visible,
  isCorrect,
  correctAnswer,
  onContinue,
  outOfHearts = false,
}) => {
  const translateY = useSharedValue(300);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    translateY.value = visible
      ? withTiming(0, { duration: 280, easing: Easing.out(Easing.cubic) })
      : withTiming(300, { duration: 220, easing: Easing.in(Easing.quad) });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const theme = outOfHearts
    ? {
        bg: Colors.errorLight,
        border: Colors.error,
        iconBg: Colors.error,
        iconColor: Colors.white,
        iconName: 'heart-dislike' as const,
        titleColor: Colors.errorDark,
        title: 'دل ختم ہو گئے',
        buttonTitle: 'ہوم اسکرین پر جائیں',
        buttonVariant: 'danger' as const,
      }
    : isCorrect
    ? {
        bg: Colors.primaryLight,
        border: Colors.primary,
        iconBg: Colors.primary,
        iconColor: Colors.white,
        iconName: 'checkmark-circle' as const,
        titleColor: Colors.primaryDark,
        title: 'بہت خوب! 🎉',
        buttonTitle: 'جاری رکھیں',
        buttonVariant: 'primary' as const,
      }
    : {
        bg: Colors.errorLight,
        border: Colors.error,
        iconBg: Colors.error,
        iconColor: Colors.white,
        iconName: 'close-circle' as const,
        titleColor: Colors.errorDark,
        title: 'غلط جواب',
        buttonTitle: 'جاری رکھیں',
        buttonVariant: 'danger' as const,
      };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.bg,
          borderTopColor: theme.border,
          paddingBottom: Math.max(insets.bottom, Layout.spacing.lg),
        },
        animatedStyle,
      ]}
    >
      <View style={styles.content}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View style={[styles.iconCircle, { backgroundColor: theme.iconBg }]}>
            <Ionicons name={theme.iconName} size={22} color={theme.iconColor} />
          </View>

          <View style={styles.textBlock}>
            <Text style={[styles.title, urduStyle, { color: theme.titleColor }]}>
              {theme.title}
            </Text>
            {!isCorrect && correctAnswer && (
              <View style={styles.correctAnswerBlock}>
                <Text style={[styles.correctAnswerLabel, urduStyle, { color: theme.titleColor }]}>
                  صحیح جواب:
                </Text>
                <Text style={[styles.correctAnswerText, urduStyle, { color: theme.titleColor }]}>
                  {correctAnswer}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Continue Button */}
        <Button
          title={theme.buttonTitle}
          variant={theme.buttonVariant}
          onPress={onContinue}
          style={styles.button}
          size="lg"
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
    paddingTop: Layout.spacing.lg,
    ...Layout.shadow.elevated,
  },
  content: {
    gap: Layout.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  textBlock: {
    flex: 1,
    alignItems: 'flex-end',
    gap: Layout.spacing.xs,
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: Layout.isShortDevice ? 19 : 22,
  },
  correctAnswerBlock: {
    alignItems: 'flex-end',
    gap: 2,
  },
  correctAnswerLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    opacity: 0.75,
  },
  correctAnswerText: {
    fontFamily: Fonts.extraBold,
    fontSize: Layout.isShortDevice ? 15 : 17,
  },
  button: {
    width: '100%',
  },
});