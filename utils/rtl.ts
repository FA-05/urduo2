import { Fonts } from '../constants/fonts';

// NEVER globally force RTL — it breaks the whole layout
// Instead, apply RTL selectively on Urdu text elements:
export const urduStyle = {
  writingDirection: 'rtl' as const,
  textAlign: 'right' as const,
  fontFamily: Fonts.bold,  // Nunito handles Arabic script acceptably
};