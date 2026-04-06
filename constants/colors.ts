// ── URDUO Design Language — Color Tokens ─────────────────────────────────────

export const Colors = {
  // ── Brand Palette ─────────────────────────────────────────────────────────
  jade:        '#336D3D',      // Secondary — brand identity, borders, icons
  jadeVivid:   '#71D561',      // Primary — CTA buttons, active states, progress fills
  jadeDim:     '#17412D',      // Tertiary — dark surfaces, section heroes
  jadeLight:   '#336D3D',      // Hover states, secondary accents
  jadeGlow:    'rgba(113,213,97,0.18)', // Focus rings, card tints

  // ── System: Saffron (warning / streaks) ──────────────────────────────────
  saffron:      '#F4A92A',
  saffronLight: '#FFD166',
  saffronDim:   '#8A5E0D',

  // ── System: Rose (error / hearts) ────────────────────────────────────────
  rose:    '#E8445A',
  roseDim: '#7A1525',

  // ── Accent ───────────────────────────────────────────────────────────────
  indigo: '#17412D',           // Secondary sections (tertiary green)
  sky:    '#336D3D',           // Informational states (secondary green)

  // ── Neutrals ──────────────────────────────────────────────────────────────
  cream:     '#FFFFFF',        // App background, screen base
  creamDeep: '#F1F1F3',        // Subtle dividers, secondary surfaces
  white:     '#FFFFFF',        // Card surfaces, active node fill
  ink:       '#0F1F15',        // Primary text
  inkMid:    '#2D4A38',        // Secondary headings
  inkSoft:   '#5A7A66',        // Body text, subtitles
  inkMuted:  '#8FA89A',        // Placeholder text, locked labels, captions

  // ── Locked state ──────────────────────────────────────────────────────────
  lockedFill:   '#E8E8EA',     // Locked node fill
  lockedShadow: '#C8C8CC',     // Locked node shadow

  // ── Derived / Utility ─────────────────────────────────────────────────────
  jadeBorder08:    'rgba(51,109,61,0.08)',   // Card borders
  jadeBorder10:    'rgba(51,109,61,0.10)',   // Option tile borders
  jadeBorder12:    'rgba(51,109,61,0.12)',   // Tab bar top border
  jadeBorder15:    'rgba(51,109,61,0.15)',   // Bank tile borders
  jadeBorder20:    'rgba(51,109,61,0.20)',   // Secondary button border
  jadeBorder25:    'rgba(51,109,61,0.25)',   // Dashed slot border
  jadeTint06:      'rgba(113,213,97,0.06)',  // Example block bg
  jadeTint08:      'rgba(113,213,97,0.08)',  // TTS button tint
  jadeTint10:      'rgba(113,213,97,0.10)',  // Correct option bg
  jadeTint12:      'rgba(113,213,97,0.12)',  // Correct feedback bg
  jadeTint22:      'rgba(113,213,97,0.22)',  // Chip hover

  saffronTint12:   'rgba(244,169,42,0.12)', // Streak pill bg
  saffronBorder30: 'rgba(244,169,42,0.30)', // Streak pill border

  roseTint08:      'rgba(232,68,90,0.08)',   // Wrong feedback bg
  roseTint10:      'rgba(232,68,90,0.10)',   // Hearts pill bg
  roseBorder25:    'rgba(232,68,90,0.25)',   // Hearts pill border
};
