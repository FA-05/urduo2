// ── URDUO Design Language — Typography ────────────────────────────────────────
// Source of truth: APP_CONTEXT.md §3
//
// Latin: Sora — geometric but warm, strong weight range 300–800
// Urdu:  Noto Nastaliq Urdu — culturally correct Nastaliq script

export const Fonts = {
  // ── Latin / Italian + UI (Sora) ────────────────────────────────────────────
  regular:   'Sora_400Regular',
  medium:    'Sora_500Medium',
  semiBold:  'Sora_600SemiBold',
  bold:      'Sora_700Bold',
  extraBold: 'Sora_800ExtraBold',

  // ── Urdu / Nastaliq script ─────────────────────────────────────────────────
  urdu:         'NotoNastaliqUrdu_400Regular',
  urduMedium:   'NotoNastaliqUrdu_500Medium',
  urduSemiBold: 'NotoNastaliqUrdu_600SemiBold',
  urduBold:     'NotoNastaliqUrdu_700Bold',
};

// ── Latin type scale (sizes in px) ───────────────────────────────────────────
// Spec: Display 38–42, H1 22–24, H2 18–20, H3 15–16, Body 13–15, Caption 10–12
export const TypeScale = {
  display:  40,   // Hero words on flashcards
  h1:       24,   // Screen titles, brand name
  h2:       20,   // Section names, card titles
  h3:       16,   // Node callout titles, pref labels
  body:     14,   // Descriptions, subtitles
  caption:  11,   // Tags, badges, uppercase labels
  micro:    10,   // Counts, superscripts
};

// ── Urdu type scale — larger for Nastaliq legibility ─────────────────────────
// Spec: Display 28–38, Body 16–22, Caption 12–14
export const UrduTypeScale = {
  display:  34,   // Vocab word backs, hero Urdu
  h1:       26,   // Section titles RTL
  h2:       22,   // Exercise prompts
  h3:       18,   // Node labels
  body:     18,   // Body text
  caption:  13,   // Nav labels, captions
};

// ── Letter spacing tokens ────────────────────────────────────────────────────
export const Tracking = {
  display:  -0.04,  // tight for large Latin
  h1:       -0.03,
  h2:       -0.02,
  h3:       -0.01,
  body:      0,
  caption:   0.08,  // loose for uppercase caps labels
};
