import { Fonts, UrduTypeScale } from '../constants/fonts';

// ── RTL / Urdu text helpers ────────────────────────────────────────────────────
// Rules (APP_CONTEXT §10):
// 1. NEVER globally force RTL — it breaks LTR Italian layout
// 2. Apply urduStyle selectively on any element containing Urdu script
// 3. NotoNastaliqUrdu has tall ascenders/descenders — lineHeight min 1.5
// 4. Never left-align Urdu — always text-align: right

/** Standard Urdu body text — right-aligned, Nastaliq bold, generous line height */
export const urduStyle = {
  writingDirection: 'rtl' as const,
  textAlign: 'right' as const,
  fontFamily: Fonts.urduBold,
  lineHeight: UrduTypeScale.body * 1.7,
};

/** Large Urdu text — for section titles and modal headers */
export const urduStyleLarge = {
  writingDirection: 'rtl' as const,
  textAlign: 'right' as const,
  fontFamily: Fonts.urduBold,
  lineHeight: UrduTypeScale.h1 * 1.7,
};

/** Urdu display text — for vocabulary card translations */
export const urduStyleDisplay = {
  writingDirection: 'rtl' as const,
  textAlign: 'right' as const,
  fontFamily: Fonts.urduBold,
  lineHeight: UrduTypeScale.display * 1.6,
};

/** Caption-size Urdu text — for word counts, nav labels */
export const urduStyleCaption = {
  writingDirection: 'rtl' as const,
  textAlign: 'right' as const,
  fontFamily: Fonts.urduMedium,
  lineHeight: UrduTypeScale.caption * 1.7,
};
