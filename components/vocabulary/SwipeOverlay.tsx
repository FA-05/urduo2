import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, SharedValue } from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';

interface SwipeOverlayProps {
  type: 'know' | 'dunno';
  opacity: SharedValue<number>;
}

export const SwipeOverlay: React.FC<SwipeOverlayProps> = ({ type, opacity }) => {
  const isKnow = type === 'know';

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.overlay,
        isKnow ? styles.overlayKnow : styles.overlayDunno,
        animatedStyle,
      ]}
      pointerEvents="none"
    >
      <Animated.View
        style={[
          styles.labelBox,
          isKnow ? styles.labelBoxKnow : styles.labelBoxDunno,
          { transform: [{ rotate: isKnow ? '-15deg' : '15deg' }] },
        ]}
      >
        <Text style={[styles.labelText, isKnow ? styles.labelTextKnow : styles.labelTextDunno]}>
          {isKnow ? 'KNOW ✓' : 'STUDY ✗'}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Layout.radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  overlayKnow: {
    backgroundColor: 'rgba(113,213,97,0.15)',
    borderWidth: 3,
    borderColor: Colors.jadeVivid,
  },
  overlayDunno: {
    backgroundColor: 'rgba(232,68,90,0.12)',
    borderWidth: 3,
    borderColor: Colors.rose,
  },
  labelBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 3,
    borderRadius: Layout.radius.md,
  },
  labelBoxKnow: {
    borderColor: Colors.jadeVivid,
  },
  labelBoxDunno: {
    borderColor: Colors.rose,
  },
  labelText: {
    fontFamily: Fonts.extraBold,
    fontSize: 28,
    letterSpacing: 2,
  },
  labelTextKnow: {
    color: Colors.jadeVivid,
  },
  labelTextDunno: {
    color: Colors.rose,
  },
});
