import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { urduStyle } from '../../utils/rtl';

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const italianFlagX = useSharedValue(-200);
  const pakiFlagX = useSharedValue(200);
  const contentY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    italianFlagX.value = withSpring(0, { damping: 12, stiffness: 90 });
    pakiFlagX.value = withSpring(0, { damping: 12, stiffness: 90 });
    contentY.value = withDelay(300, withSpring(0, { damping: 15, stiffness: 100 }));
    opacity.value = withDelay(300, withSpring(1));
  }, []);

  const italianFlagStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: italianFlagX.value }],
  }));

  const pakiFlagStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pakiFlagX.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentY.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + Layout.spacing.xl }]}>
      <View style={styles.flagsContainer}>
        <Animated.Text style={[styles.flag, italianFlagStyle]}>🇮🇹</Animated.Text>
        <Animated.Text style={[styles.flag, pakiFlagStyle]}>🇵🇰</Animated.Text>
      </View>

      <Animated.View style={[styles.contentContainer, contentStyle]}>
        <Text style={[styles.title, urduStyle]}>اطالوی سیکھیں!</Text>
        <Text style={[styles.subtitle, urduStyle]}>آسان، مزیدار اور مفت</Text>
      </Animated.View>

      <Animated.View style={[styles.buttonContainer, contentStyle]}>
        <Button
          title="شروع کریں"
          onPress={() => router.push('/onboarding/select-goal')}
          size="lg"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Layout.spacing.xl,
    justifyContent: 'center',
  },
  flagsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Layout.spacing.md,
    marginBottom: Layout.spacing.xxl,
  },
  flag: {
    fontSize: 80,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xxl * 2,
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: 36,
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: Layout.spacing.sm,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 20,
    color: Colors.textMid,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: Layout.spacing.xxl,
    left: Layout.spacing.xl,
    right: Layout.spacing.xl,
  },
});