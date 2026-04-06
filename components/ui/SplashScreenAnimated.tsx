import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withSpring,
  runOnJS,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Fonts, TypeScale, UrduTypeScale, Tracking } from '../../constants/fonts';

const { width, height } = Dimensions.get('window');

interface SplashScreenAnimatedProps {
  onFinish: () => void;
}

export default function SplashScreenAnimated({ onFinish }: SplashScreenAnimatedProps) {
  const logoScale = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);
  const subtitleOpacity = useSharedValue(0);
  const dotScale1 = useSharedValue(0);
  const dotScale2 = useSharedValue(0);
  const dotScale3 = useSharedValue(0);
  const fadeOut = useSharedValue(1);

  useEffect(() => {
    // Phase 1: Logo appears with spring
    logoOpacity.value = withTiming(1, { duration: 400 });
    logoScale.value = withSpring(1, {
      damping: 12,
      stiffness: 100,
      mass: 0.8,
    });

    // Phase 2: Title slides up and fades in
    titleOpacity.value = withDelay(350, withTiming(1, { duration: 500 }));
    titleTranslateY.value = withDelay(350, withSpring(0, { damping: 14, stiffness: 90 }));

    // Phase 3: Subtitle fades in
    subtitleOpacity.value = withDelay(650, withTiming(1, { duration: 400 }));

    // Phase 4: Loading dots pulse
    const dotPulse = (delay: number) =>
      withDelay(
        800 + delay,
        withSequence(
          withTiming(1, { duration: 300 }),
          withTiming(0.3, { duration: 300 }),
          withTiming(1, { duration: 300 }),
          withTiming(0.3, { duration: 300 }),
          withTiming(1, { duration: 300 }),
        ),
      );
    dotScale1.value = dotPulse(0);
    dotScale2.value = dotPulse(150);
    dotScale3.value = dotPulse(300);

    // Phase 5: Fade everything out
    fadeOut.value = withDelay(
      2600,
      withTiming(0, { duration: 400, easing: Easing.out(Easing.ease) }, (finished) => {
        if (finished) {
          runOnJS(onFinish)();
        }
      }),
    );
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  const dot1Style = useAnimatedStyle(() => ({
    opacity: dotScale1.value,
    transform: [{ scale: interpolate(dotScale1.value, [0.3, 1], [0.8, 1]) }],
  }));

  const dot2Style = useAnimatedStyle(() => ({
    opacity: dotScale2.value,
    transform: [{ scale: interpolate(dotScale2.value, [0.3, 1], [0.8, 1]) }],
  }));

  const dot3Style = useAnimatedStyle(() => ({
    opacity: dotScale3.value,
    transform: [{ scale: interpolate(dotScale3.value, [0.3, 1], [0.8, 1]) }],
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: fadeOut.value,
  }));

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      {/* Background gradient effect using layered views */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      <View style={styles.content}>
        {/* Logo */}
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        {/* App Name */}
        <Animated.View style={titleAnimatedStyle}>
          <Animated.Text style={styles.title}>URDUO</Animated.Text>
        </Animated.View>

        {/* Subtitle in Urdu */}
        <Animated.View style={subtitleAnimatedStyle}>
          <Animated.Text style={styles.subtitle}>اردو سیکھیں</Animated.Text>
        </Animated.View>

        {/* Loading dots */}
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, dot1Style]} />
          <Animated.View style={[styles.dot, dot2Style]} />
          <Animated.View style={[styles.dot, dot3Style]} />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.jadeDim,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  bgCircle1: {
    position: 'absolute',
    width: width * 1.4,
    height: width * 1.4,
    borderRadius: width * 0.7,
    backgroundColor: 'rgba(34, 199, 122, 0.08)',
    top: -width * 0.3,
    left: -width * 0.2,
  },
  bgCircle2: {
    position: 'absolute',
    width: width * 1.0,
    height: width * 1.0,
    borderRadius: width * 0.5,
    backgroundColor: 'rgba(34, 199, 122, 0.06)',
    bottom: -width * 0.2,
    right: -width * 0.3,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 90,
    height: 90,
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: 42,
    color: Colors.white,
    letterSpacing: Tracking.display * 42,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: Fonts.urduSemiBold,
    fontSize: UrduTypeScale.h2,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 48,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.jadeVivid,
  },
});
