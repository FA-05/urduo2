import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Svg, { Ellipse, Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import * as Haptics from 'expo-haptics';

const POD_W = 100;
const POD_H = 89;
const SHADOW_OFFSET = 16; // SVG units

interface LessonNodeProps {
  id: string;
  icon: string;
  status: 'completed' | 'active' | 'locked';
  onPress: (id: string, status: 'completed' | 'active' | 'locked') => void;
  index: number;
  sectionIndex?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/* ── Pod background SVG ─────────────────────────────────────────────── */
const PodSvg = React.memo(({ status }: { status: 'completed' | 'active' | 'locked' }) => {
  const fillColor = status === 'locked' ? Colors.lockedFill : Colors.jadeVivid;
  const strokeColor = status === 'locked' ? Colors.lockedShadow : Colors.jadeVivid;
  const shadowColor = status === 'locked' ? Colors.lockedShadow : Colors.jade;

  return (
    <Svg width={POD_W} height={POD_H} viewBox="0 0 214 190">
      {/* Drop shadow (hard offset, same shape shifted down) */}
      <Ellipse
        cx={106.639}
        cy={86.5975 + SHADOW_OFFSET}
        rx={106.639}
        ry={86.5975}
        fill={shadowColor}
      />
      {/* Main filled ellipse */}
      <Ellipse cx={106.639} cy={86.5975} rx={106.639} ry={86.5975} fill={fillColor} />
      {/* Border stroke */}
      <Path
        d="M106.64 7.5C162.927 7.50012 205.778 44.2969 205.778 86.5977C205.778 128.898 162.927 165.695 106.64 165.695C50.3521 165.695 7.5001 128.898 7.5 86.5977C7.5 44.2968 50.3521 7.5 106.64 7.5Z"
        stroke={strokeColor}
        strokeWidth={15}
        fill="none"
      />
      {/* Shine overlays (only on green pods) */}
      {status !== 'locked' && (
        <>
          <Path
            d="M131.408 17.5392L146.248 21.7412L158.588 27.4857L68.6173 152.06L55.8301 146.154L43.1347 138.353L131.408 17.5392Z"
            fill="white"
            fillOpacity={0.18}
          />
          <Path
            d="M96.6948 15.5838L109.423 14.5903L122.951 15.9967L37.4706 133.4L30.1572 125.803L23.1278 116.004L96.6948 15.5838Z"
            fill="white"
            fillOpacity={0.18}
          />
        </>
      )}
    </Svg>
  );
});

/* ── Star icon SVG ──────────────────────────────────────────────────── */
const StarSvg = React.memo(() => (
  <Svg width={36} height={33} viewBox="0 0 89 81">
    <Path
      d="M51.4084 8.45199L58.6576 21.6287C59.6462 23.4629 62.2822 25.2223 64.5066 25.5592L77.6455 27.5432C86.0481 28.816 88.0254 34.3562 81.9704 39.8215L71.7558 49.105C70.0256 50.6772 69.0786 53.7093 69.6137 55.8807L72.5384 67.3728C74.8448 76.4692 69.5313 79.9881 60.676 75.2338L48.3605 68.6082C46.1365 67.4103 42.4708 67.4103 40.2051 68.6082L27.8899 75.2338C19.0756 79.9881 13.7211 76.4317 16.0276 67.3728L18.952 55.8807C19.4874 53.7093 18.5401 50.6772 16.8102 49.105L6.59545 39.8215C0.581915 34.3562 2.51779 28.816 10.9202 27.5432L24.0594 25.5592C26.2424 25.2223 28.8784 23.4629 29.8669 21.6287L37.1161 8.45199C41.0702 1.30214 47.4955 1.30214 51.4084 8.45199Z"
      fill="white"
      stroke="white"
      strokeWidth={6.179}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
));

/* ── Lock icon SVG ──────────────────────────────────────────────────── */
const LockSvg = React.memo(() => (
  <Svg width={28} height={34} viewBox="0 0 72 88">
    <Path
      d="M4.14936 71.7298C5.06614 78.5392 10.7061 83.8737 17.5695 84.1892C23.3447 84.4546 29.2113 84.5932 35.6717 84.5932C42.1322 84.5932 47.9986 84.4546 53.7738 84.1892C60.6374 83.8737 66.2772 78.5392 67.1941 71.7298C67.7926 67.2861 68.2859 62.7319 68.2859 58.0942C68.2859 53.4565 67.7926 48.9023 67.1941 44.4586C66.2772 37.6492 60.6374 32.3147 53.7738 31.9992C47.9986 31.7337 42.1322 31.5952 35.6717 31.5952C29.2113 31.5952 23.3447 31.7337 17.5695 31.9992C10.7061 32.3147 5.06614 37.6492 4.14936 44.4586C3.55101 48.9023 3.05756 53.4565 3.05756 58.0942C3.05756 62.7319 3.55101 67.2861 4.14936 71.7298Z"
      fill="white"
      stroke="white"
      strokeWidth={6.115}
    />
    <Path
      d="M17.3263 31.595V21.4031C17.3263 11.2712 25.5398 3.05762 35.6718 3.05762C45.8037 3.05762 54.0172 11.2712 54.0172 21.4031V31.595"
      stroke="white"
      strokeWidth={6.115}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M36.1813 58.0939H35.6717M36.6909 58.0939C36.6909 58.6569 36.2347 59.1131 35.6717 59.1131C35.1087 59.1131 34.6525 58.6569 34.6525 58.0939C34.6525 57.5309 35.1087 57.0747 35.6717 57.0747C36.2347 57.0747 36.6909 57.5309 36.6909 58.0939Z"
      stroke={Colors.lockedFill}
      strokeWidth={6.115}
      strokeLinecap="round"
    />
  </Svg>
));

export const LessonNode = React.memo<LessonNodeProps>(({
  id,
  icon,
  status,
  onPress,
  index,
  sectionIndex = 0,
}) => {
  const pulseScale = useSharedValue(1);
  const shakeOffset = useSharedValue(0);
  const pressScale = useSharedValue(1);

  React.useEffect(() => {
    if (status === 'active') {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1100, easing: Easing.inOut(Easing.ease) }),
          withTiming(1.0, { duration: 1100, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    } else {
      pulseScale.value = withTiming(1, { duration: 200 });
    }
  }, [status]);

  const handlePressIn = () => {
    if (status !== 'locked') {
      pressScale.value = withTiming(0.95, { duration: 120 });
    }
  };
  const handlePressOut = () => {
    pressScale.value = withTiming(1, { duration: 120 });
  };

  const handlePress = () => {
    if (status === 'locked') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      shakeOffset.value = withSequence(
        withTiming(-4, { duration: 50 }),
        withTiming(4, { duration: 50 }),
        withTiming(-2, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress(id, status);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: status === 'active' ? pulseScale.value * pressScale.value : pressScale.value },
      { translateX: shakeOffset.value },
    ],
  }));

  // Zigzag path: positions at 26% / 50% / 68% of screen width
  const offsetIndex = index % 6;
  const screenW = Layout.window.width;
  const positions = [0.5, 0.68, 0.5, 0.26, 0.5, 0.68];
  const centerX = (positions[offsetIndex] - 0.5) * screenW;

  return (
    <View
      style={[
        styles.container,
        {
          transform: [{ translateX: centerX }],
          opacity: status === 'locked' ? 0.8 : 1,
        },
      ]}
    >
      {/* Completed badge */}
      {status === 'completed' && (
        <View style={[styles.badgeContainer, styles.badgeDone]}>
          <Text style={styles.badgeCheck}>✓</Text>
        </View>
      )}

      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={animatedStyle}
        accessibilityRole="button"
        accessibilityLabel={`Lesson ${index + 1}, Status: ${status}`}
        hitSlop={Layout.hitSlop}
      >
        <View style={styles.node}>
          <PodSvg status={status} />
          {/* Icon centered on the ellipse (offset up to account for shadow) */}
          <View style={styles.iconOverlay}>
            {status === 'locked' ? <LockSvg /> : <StarSvg />}
          </View>
        </View>
      </AnimatedPressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Layout.spacing.lg,
  },
  node: {
    width: POD_W,
    height: POD_H,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 8, // offset for the pod's built-in shadow
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ── Badges ──────────────────────────────────────────────────────────────
  badgeContainer: {
    position: 'absolute',
    top: -8,
    right: 6,
    zIndex: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDone: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.jadeVivid,
  },
  badgeCheck: {
    fontSize: 14,
    color: Colors.jadeVivid,
    fontFamily: Fonts.extraBold,
  },
});
