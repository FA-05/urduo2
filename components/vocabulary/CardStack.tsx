import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  Extrapolation,
  runOnJS,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { CardFront } from './CardFront';
import { CardBack } from './CardBack';
import { SwipeOverlay } from './SwipeOverlay';
import { Colors } from '../../constants/colors';
import { Layout } from '../../constants/layout';
import { VocabularyWord } from '../../data/vocabulary';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 48;
const CARD_HEIGHT = 420;
const SWIPE_THRESHOLD = 80;
const ROTATION_FACTOR = 0.08;

// Stacking offsets — each card peeks out below the one above
const STACK = {
  card2: { translateY: 16, scale: 0.95, opacity: 0.7 },
  card3: { translateY: 30, scale: 0.90, opacity: 0.45 },
  card4: { translateY: 42, scale: 0.85, opacity: 0.25 },
};

interface CardStackProps {
  words: VocabularyWord[];
  currentIndex: number;
  onSwipeRight: (wordId: string) => void;
  onSwipeLeft: (wordId: string) => void;
  isFlipped: boolean;
  onFlip: () => void;
}

export const CardStack: React.FC<CardStackProps> = ({
  words,
  currentIndex,
  onSwipeRight,
  onSwipeLeft,
  isFlipped,
  onFlip,
}) => {
  const panX = useSharedValue(0);
  const flipVal = useSharedValue(0);
  const isAnimating = useSharedValue(false);

  // Background card shared values — card 2 (next)
  const bg2TranslateY = useSharedValue(STACK.card2.translateY);
  const bg2Scale = useSharedValue(STACK.card2.scale);
  const bg2Opacity = useSharedValue(STACK.card2.opacity);
  // Card 3
  const bg3TranslateY = useSharedValue(STACK.card3.translateY);
  const bg3Scale = useSharedValue(STACK.card3.scale);
  const bg3Opacity = useSharedValue(STACK.card3.opacity);
  // Card 4 (deepest)
  const bg4TranslateY = useSharedValue(STACK.card4.translateY);
  const bg4Scale = useSharedValue(STACK.card4.scale);
  const bg4Opacity = useSharedValue(STACK.card4.opacity);

  // Reset everything when currentIndex changes
  useEffect(() => {
    panX.value = 0;
    flipVal.value = withTiming(0, { duration: 200 });
    isAnimating.value = false;

    bg2TranslateY.value = STACK.card2.translateY;
    bg2Scale.value = STACK.card2.scale;
    bg2Opacity.value = STACK.card2.opacity;

    bg3TranslateY.value = STACK.card3.translateY;
    bg3Scale.value = STACK.card3.scale;
    bg3Opacity.value = STACK.card3.opacity;

    bg4TranslateY.value = STACK.card4.translateY;
    bg4Scale.value = STACK.card4.scale;
    bg4Opacity.value = STACK.card4.opacity;
  }, [currentIndex]);

  // Sync flip state from parent
  useEffect(() => {
    const target = isFlipped ? 180 : 0;
    if (flipVal.value !== target) {
      flipVal.value = withTiming(target, {
        duration: 500,
        easing: Easing.out(Easing.back(1.2)),
      });
    }
  }, [isFlipped]);

  const handleSwipeRight = useCallback(() => {
    if (currentIndex < words.length) {
      onSwipeRight(words[currentIndex].id);
    }
  }, [currentIndex, words, onSwipeRight]);

  const handleSwipeLeft = useCallback(() => {
    if (currentIndex < words.length) {
      onSwipeLeft(words[currentIndex].id);
    }
  }, [currentIndex, words, onSwipeLeft]);

  // Swipe overlay opacities
  const knowOpacity = useDerivedValue(() =>
    interpolate(panX.value, [20, SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP)
  );

  const dunnoOpacity = useDerivedValue(() =>
    interpolate(panX.value, [-SWIPE_THRESHOLD, -20], [1, 0], Extrapolation.CLAMP)
  );

  const springConfig = { damping: 14, stiffness: 120, mass: 0.8 };

  const animateSwipeOut = (direction: 'left' | 'right') => {
    'worklet';
    isAnimating.value = true;
    const targetX = direction === 'right' ? 400 : -400;

    panX.value = withTiming(targetX, { duration: 300 }, (finished) => {
      if (finished) {
        // Card 2 → position 1 (front)
        bg2TranslateY.value = withSpring(0, springConfig);
        bg2Scale.value = withSpring(1, springConfig);
        bg2Opacity.value = withSpring(1, springConfig);

        // Card 3 → position 2
        bg3TranslateY.value = withSpring(STACK.card2.translateY, springConfig);
        bg3Scale.value = withSpring(STACK.card2.scale, springConfig);
        bg3Opacity.value = withSpring(STACK.card2.opacity, springConfig);

        // Card 4 → position 3
        bg4TranslateY.value = withSpring(STACK.card3.translateY, springConfig);
        bg4Scale.value = withSpring(STACK.card3.scale, springConfig);
        bg4Opacity.value = withSpring(STACK.card3.opacity, springConfig);

        if (direction === 'right') {
          runOnJS(handleSwipeRight)();
        } else {
          runOnJS(handleSwipeLeft)();
        }
      }
    });
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((event) => {
      if (isAnimating.value) return;
      panX.value = event.translationX;

      // Interactive peek: as user drags, bg cards rise slightly toward next position
      const dragProgress = Math.min(Math.abs(event.translationX) / SWIPE_THRESHOLD, 1);

      bg2TranslateY.value = interpolate(dragProgress, [0, 1],
        [STACK.card2.translateY, STACK.card2.translateY * 0.4], Extrapolation.CLAMP);
      bg2Scale.value = interpolate(dragProgress, [0, 1],
        [STACK.card2.scale, 0.975], Extrapolation.CLAMP);
      bg2Opacity.value = interpolate(dragProgress, [0, 1],
        [STACK.card2.opacity, 0.9], Extrapolation.CLAMP);

      bg3TranslateY.value = interpolate(dragProgress, [0, 1],
        [STACK.card3.translateY, STACK.card3.translateY * 0.6], Extrapolation.CLAMP);
      bg3Scale.value = interpolate(dragProgress, [0, 1],
        [STACK.card3.scale, 0.94], Extrapolation.CLAMP);
      bg3Opacity.value = interpolate(dragProgress, [0, 1],
        [STACK.card3.opacity, 0.6], Extrapolation.CLAMP);

      bg4TranslateY.value = interpolate(dragProgress, [0, 1],
        [STACK.card4.translateY, STACK.card4.translateY * 0.7], Extrapolation.CLAMP);
      bg4Scale.value = interpolate(dragProgress, [0, 1],
        [STACK.card4.scale, 0.88], Extrapolation.CLAMP);
      bg4Opacity.value = interpolate(dragProgress, [0, 1],
        [STACK.card4.opacity, 0.35], Extrapolation.CLAMP);
    })
    .onEnd(() => {
      if (isAnimating.value) return;

      if (panX.value > SWIPE_THRESHOLD) {
        animateSwipeOut('right');
      } else if (panX.value < -SWIPE_THRESHOLD) {
        animateSwipeOut('left');
      } else {
        // Spring back everything
        panX.value = withSpring(0, { damping: 15, stiffness: 200 });

        bg2TranslateY.value = withSpring(STACK.card2.translateY, springConfig);
        bg2Scale.value = withSpring(STACK.card2.scale, springConfig);
        bg2Opacity.value = withSpring(STACK.card2.opacity, springConfig);

        bg3TranslateY.value = withSpring(STACK.card3.translateY, springConfig);
        bg3Scale.value = withSpring(STACK.card3.scale, springConfig);
        bg3Opacity.value = withSpring(STACK.card3.opacity, springConfig);

        bg4TranslateY.value = withSpring(STACK.card4.translateY, springConfig);
        bg4Scale.value = withSpring(STACK.card4.scale, springConfig);
        bg4Opacity.value = withSpring(STACK.card4.opacity, springConfig);
      }
    });

  const tapGesture = Gesture.Tap()
    .onEnd(() => {
      if (isAnimating.value) return;
      runOnJS(onFlip)();
    });

  const composedGesture = Gesture.Exclusive(panGesture, tapGesture);

  // Main card animated style (pan + rotation)
  const mainCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: panX.value },
      { rotate: `${panX.value * ROTATION_FACTOR}deg` },
    ],
  }));

  // Front face style (flip)
  const frontStyle = useAnimatedStyle(() => ({
    opacity: interpolate(flipVal.value, [0, 90], [1, 0], Extrapolation.CLAMP),
    transform: [{ rotateY: `${flipVal.value}deg` }],
    backfaceVisibility: 'hidden' as const,
  }));

  // Back face style (flip)
  const backStyle = useAnimatedStyle(() => ({
    opacity: interpolate(flipVal.value, [90, 180], [0, 1], Extrapolation.CLAMP),
    transform: [{ rotateY: `${flipVal.value - 180}deg` }],
    backfaceVisibility: 'hidden' as const,
  }));

  // Background card styles
  const bg2Style = useAnimatedStyle(() => ({
    transform: [
      { translateY: bg2TranslateY.value },
      { scale: bg2Scale.value },
    ],
    opacity: bg2Opacity.value,
  }));

  const bg3Style = useAnimatedStyle(() => ({
    transform: [
      { translateY: bg3TranslateY.value },
      { scale: bg3Scale.value },
    ],
    opacity: bg3Opacity.value,
  }));

  const bg4Style = useAnimatedStyle(() => ({
    transform: [
      { translateY: bg4TranslateY.value },
      { scale: bg4Scale.value },
    ],
    opacity: bg4Opacity.value,
  }));

  const currentWord = words[currentIndex];
  const word2 = words[currentIndex + 1];
  const word3 = words[currentIndex + 2];
  const word4 = words[currentIndex + 3];

  if (!currentWord) {
    return null;
  }

  return (
    <View style={styles.stackContainer}>
      {/* Card 4 — deepest */}
      {word4 && (
        <Animated.View style={[styles.bgCard, bg4Style]}>
          <View style={styles.bgCardContent}>
            <CardFront word={word4} />
          </View>
        </Animated.View>
      )}

      {/* Card 3 */}
      {word3 && (
        <Animated.View style={[styles.bgCard, bg3Style]}>
          <View style={styles.bgCardContent}>
            <CardFront word={word3} />
          </View>
        </Animated.View>
      )}

      {/* Card 2 — next up */}
      {word2 && (
        <Animated.View style={[styles.bgCard, bg2Style]}>
          <View style={styles.bgCardContent}>
            <CardFront word={word2} />
          </View>
        </Animated.View>
      )}

      {/* Main card — front & center */}
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.mainCard, mainCardStyle]}>
          {/* Front face */}
          <Animated.View style={[styles.cardFace, frontStyle]}>
            <CardFront word={currentWord} />
          </Animated.View>

          {/* Back face */}
          <Animated.View style={[styles.cardFace, styles.cardFaceBack, backStyle]}>
            <CardBack word={currentWord} />
          </Animated.View>

          {/* Swipe overlays */}
          <SwipeOverlay type="know" opacity={knowOpacity} />
          <SwipeOverlay type="dunno" opacity={dunnoOpacity} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  stackContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT + 48, // extra room for the deeper stack
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  bgCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: Layout.radius.xl,
    borderWidth: 1.5,
    borderColor: Colors.jadeBorder08,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    ...Layout.shadow.xs,
  },
  bgCardContent: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: Layout.radius.xl,
  },
  mainCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: Layout.radius.xl,
    ...Layout.shadow.card,
    overflow: 'hidden',
  },
  cardFace: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Layout.radius.xl,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  cardFaceBack: {
    backgroundColor: Colors.ink,
  },
});
