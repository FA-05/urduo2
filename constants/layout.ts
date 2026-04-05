import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Layout = {
  window: { width, height },
  isSmallDevice: width < 375,
  isShortDevice: height < 720,

  // ── Spacing tokens ──────────────────────────────────────────────────────────
  spacing: {
    xs2: 2,
    xs:  4,
    sm:  8,
    md:  16,
    lg:  24,
    xl:  32,
    xxl: 48,
    tabBar: 56,   // Fixed tab bar height (before safe area insets)
  },

  // ── Border radii ────────────────────────────────────────────────────────────
  radius: {
    xs:    4,
    sm:    8,
    md:    12,
    lg:    16,
    xl:    20,
    xxl:   28,
    round: 100,
  },

  // ── Standard hit slop for accessibility (WCAG 2.5.5 ≥ 44px touch target) ──
  hitSlop: { top: 12, bottom: 12, left: 12, right: 12 },

  // ── Shadows ─────────────────────────────────────────────────────────────────
  shadow: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    xs: {
      shadowColor: '#1A1A2E',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
      elevation: 1,
    },
    card: {
      shadowColor: '#1A1A2E',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 3,
    },
    button: {
      shadowColor: '#1A1A2E',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.10,
      shadowRadius: 6,
      elevation: 4,
    },
    elevated: {
      shadowColor: '#1A1A2E',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.14,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};