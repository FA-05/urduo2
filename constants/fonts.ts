// Font family keys — loaded in app/_layout.tsx
export const Fonts = {
  // ── Latin / Italian (Nunito) ───────────────────────────────────────────────
  regular:   'Nunito-Regular',
  semiBold:  'Nunito-SemiBold',
  bold:      'Nunito-Bold',
  extraBold: 'Nunito-ExtraBold',

  // ── Urdu / Nastaliq script ─────────────────────────────────────────────────
  // NotoNastaliqUrdu provides authentic Nastaliq calligraphy,
  // essential for correct Urdu rendering (descenders, ligatures).
  urdu:      'NotoNastaliqUrdu-Regular',
};

// ── Type scale (font sizes in sp) ─────────────────────────────────────────────
export const TypeScale = {
  display:  36,  // Large hero text (vocabulary card Italian word)
  h1:       28,  // Screen titles
  h2:       22,  // Section/card headers
  h3:       18,  // Sub-section labels
  body:     16,  // Body copy
  caption:  13,  // Supporting text, timestamps
  label:    12,  // Badges, tags
  micro:    10,  // Counts, superscripts
};

// ── Urdu type scale — slightly larger for Nastaliq legibility ─────────────────
export const UrduTypeScale = {
  display:  40,  // e.g. vocabulary card Urdu translation
  h1:       30,
  h2:       24,
  h3:       20,
  body:     17,
  caption:  14,
};