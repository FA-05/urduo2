import { Fonts, UrduTypeScale } from '../constants/fonts';

// ── RTL / Urdu text helpers ────────────────────────────────────────────────────
// Rules:
// 1. NEVER globally force RTL — it breaks LTR Italian layout
// 2. Apply urduStyle selectively on any element containing Urdu script
// 3. NotoNastaliqUrdu has tall ascenders/descenders — use generous lineHeight

/** Standard Urdu body text — right-aligned, Nastaliq font, generous line height */
export const urduStyle = {
  writingDirection: 'rtl' as const,
  textAlign: 'right' as const,
  fontFamily: Fonts.urdu,
  lineHeight: UrduTypeScale.body * 1.9,  // Nastaliq needs ~1.9x for descenders
};

/** Large Urdu text — for section titles and modal headers */
export const urduStyleLarge = {
  writingDirection: 'rtl' as const,
  textAlign: 'right' as const,
  fontFamily: Fonts.urdu,
  lineHeight: UrduTypeScale.h1 * 1.9,
};

/** Urdu display text — for vocabulary card translations */
export const urduStyleDisplay = {
  writingDirection: 'rtl' as const,
  textAlign: 'right' as const,
  fontFamily: Fonts.urdu,
  lineHeight: UrduTypeScale.display * 1.6,
};

/** Caption-size Urdu text — for word counts, labels */
export const urduStyleCaption = {
  writingDirection: 'rtl' as const,
  textAlign: 'right' as const,
  fontFamily: Fonts.urdu,
  lineHeight: UrduTypeScale.caption * 1.9,
};