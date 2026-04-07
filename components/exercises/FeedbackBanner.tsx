import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
      ? withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) })
      : withTiming(300, { duration: 220, easing: Easing.in(Easing.quad) });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Spec §6.5: Feedback Banner
  const theme = outOfHearts
    ? {
        bg: '#FDEDEF',
        border: '#F5C6CB',
        iconBg: Colors.rose,
        iconText: '✗',
        titleColor: Colors.roseDim,
        title: 'دل ختم ہو گئے',
        buttonTitle: 'ہوم اسکرین پر جائیں',
        buttonVariant: 'danger' as const,
      }
    : isCorrect
    ? {
        bg: '#E8F8E5',
        border: '#B7E4AF',
        iconBg: Colors.jadeVivid,
        iconText: '✓',
        titleColor: Colors.jadeDim,
        title: 'بہت خوب! 🎉',
        buttonTitle: 'جاری رکھیں',
        buttonVariant: 'primary' as const,
      }
    : {
        bg: '#FDEDEF',
        border: '#F5C6CB',
        iconBg: Colors.rose,
        iconText: '✗',
        titleColor: Colors.roseDim,
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
        <View style={styles.headerRow}>
          {/* Spec: 32x32 filled circle with white icon */}
          <View style={[styles.iconCircle, { backgroundColor: theme.iconBg }]}>
            <Text style={styles.iconText}>{theme.iconText}</Text>
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
    borderTopWidth: 1.5,
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.lg,
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
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconText: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: Fonts.extraBold,
  },
  textBlock: {
    flex: 1,
    alignItems: 'flex-end',
    gap: Layout.spacing.xs,
  },
  title: {
    fontFamily: Fonts.urduBold,
    fontSize: Layout.isShortDevice ? 19 : 22,
    lineHeight: Layout.isShortDevice ? 19 * 2.2 : 22 * 2.2,
  },
  correctAnswerBlock: {
    alignItems: 'flex-end',
    gap: 2,
  },
  correctAnswerLabel: {
    fontFamily: Fonts.urduSemiBold,
    fontSize: 12,
    lineHeight: 12 * 2.2,
    opacity: 0.75,
  },
  correctAnswerText: {
    fontFamily: Fonts.urduBold,
    fontSize: Layout.isShortDevice ? 15 : 17,
    lineHeight: Layout.isShortDevice ? 15 * 2.2 : 17 * 2.2,
  },
  button: {
    width: '100%',
  },
});
