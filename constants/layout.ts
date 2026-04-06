import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Layout = {
  window: { width, height },
  isSmallDevice: width < 375,
  isShortDevice: height < 720,

  // ── Spacing tokens (APP_CONTEXT §4.1) ──────────────────────────────────────
  spacing: {
    1:  4,    // Icon gaps, tight inline
    2:  8,    // Between badges/pills, small gaps
    3:  12,   // Card internal padding (tight)
    4:  16,   // Standard horizontal screen padding
    5:  20,   // Card internal padding (comfortable)
    6:  24,   // Section gaps, vertical breathing room
    8:  32,   // Between major screen sections
    10: 40,   // Hero padding
    // Convenience aliases for common use
    xs:  4,
    sm:  8,
    md:  16,
    lg:  24,
    xl:  32,
    xxl: 48,
    tabBar: 56,
  },

  // ── Border radius (APP_CONTEXT §4.2) ───────────────────────────────────────
  radius: {
    sm:   12,   // Word tiles, small chips, badges
    md:   18,   // Example sentence blocks, inner cards
    lg:   24,   // Section banners, primary cards, topic cards
    xl:   32,   // Main exercise cards, profile card
    full: 100,  // Pills, stat chips, toggles, nav dots
  },

  // ── Standard hit slop for accessibility (WCAG 2.5.5 ≥ 44px touch target) ──
  hitSlop: { top: 12, bottom: 12, left: 12, right: 12 },

  // ── Shadows (APP_CONTEXT §5.1) ────────────────────────────────────────────
  shadow: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    xs: {
      shadowColor: '#0F1F15',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 1,
    },
    card: {
      shadowColor: '#0F1F15',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.10,
      shadowRadius: 24,
      elevation: 4,
    },
    btn: {
      shadowColor: '#71D561',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 16,
      elevation: 4,
    },
    elevated: {
      shadowColor: '#0F1F15',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.14,
      shadowRadius: 16,
      elevation: 8,
    },
    // Aliases for old code
    button: {
      shadowColor: '#71D561',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 16,
      elevation: 4,
    },
  },

  // ── Node-specific shadows (APP_CONTEXT §5.1) ──────────────────────────────
  // These can't be expressed as simple RN shadows due to multi-layer nature.
  // Components should apply these inline.
  nodeShadow: {
    done: {
      shadowColor: '#336D3D',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.50,
      shadowRadius: 0,
      elevation: 6,
    },
    active: {
      shadowColor: '#336D3D',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.55,
      shadowRadius: 2,
      elevation: 8,
    },
    locked: {
      shadowColor: '#C8C8CC',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.50,
      shadowRadius: 0,
      elevation: 3,
    },
  },
};
