# URDUO - App Context & Summary

> **Purpose of this document:** Provide full context for an AI assistant to understand this app and help with UI/UX revamp.

---

## What Is This App?

**URDUO** is a mobile language learning app built for **Urdu speakers learning Italian**. Think Duolingo, but specifically Italian→Urdu. It features interactive lessons with flashcards, quizzes, sentence building exercises, a hearts/lives system, streaks, and vocabulary review.

---

## Tech Stack

- **React Native** 0.81 + **Expo** 54 (Expo Router for file-based routing)
- **TypeScript**
- **Zustand** for state management (4 stores: auth, progress, settings, completion)
- **Supabase** for auth (email/password) + optional cloud sync
- **AsyncStorage** for local-first persistence
- **Google AdMob** for monetization (rewarded ads for hearts, interstitial on lesson complete)
- **Expo Speech** for Italian text-to-speech pronunciation
- **React Native Reanimated** for animations
- **Expo Haptics** for vibration feedback

---

## Project Structure

```
app/                          # Screens (Expo Router)
├── (tabs)/
│   ├── index.tsx            # Home - Lesson path/tree
│   ├── vocabulary.tsx       # Vocabulary topic browser
│   ├── profile.tsx          # User profile, stats, settings
│   └── _layout.tsx          # Tab navigator layout
├── auth/
│   ├── login.tsx            # Email/password login
│   └── register.tsx         # Registration
├── lesson/[id].tsx          # Exercise session (dynamic route)
├── completion.tsx           # Post-lesson celebration screen
├── vocabulary/[topic].tsx   # Flashcard viewer for a topic
└── _layout.tsx              # Root layout (auth routing)

components/
├── exercises/
│   ├── ExerciseWrapper.tsx  # Session container (progress bar, hearts, quit)
│   ├── VocabularyCard.tsx   # Flip card (Italian front / Urdu back)
│   ├── MultipleChoice.tsx   # 4-option quiz
│   ├── TrueFalse.tsx        # True/false question
│   ├── SentenceReconstruction.tsx  # Reorder words to form sentence
│   └── FeedbackBanner.tsx   # Correct/incorrect feedback
├── home/
│   ├── LessonPath.tsx       # Scrollable lesson tree
│   ├── LessonNode.tsx       # Circle node (completed/active/locked)
│   ├── SectionHeader.tsx    # Section divider with title
│   └── StreakWidget.tsx     # Streak badge with flame
├── ui/
│   ├── Button.tsx           # Button with variants (primary/secondary/danger/outline/ghost)
│   ├── Card.tsx             # Generic card
│   ├── Modal.tsx            # Dialog
│   ├── HeartBar.tsx         # Hearts display (5 max)
│   ├── ProgressBar.tsx      # Linear progress
│   ├── Avatar.tsx           # Emoji avatar
│   ├── Badge.tsx            # Small label
│   ├── ConfettiCannon.tsx   # Celebration particles
│   ├── Sparkles.tsx         # Sparkle effects
│   ├── StatusModal.tsx      # Status feedback
│   └── AdRewardModal.tsx    # "Watch ad for hearts" modal
└── navigation/
    └── TabBar.tsx           # Custom bottom tab bar (Urdu labels)

data/                         # All lesson content
├── types.ts                 # Exercise type definitions
├── registry.ts              # Full lesson registry
├── registry-meta.ts         # Lightweight metadata (no exercises loaded)
├── lesson-loader.ts         # Lazy loader for exercises
├── vocabulary.ts            # Master vocab list + topic extraction
├── section-foundations/     # Lessons 1-6: Greetings, basics
├── section-essential-grammar/
├── section-body-parts/
├── section-family-emotions/
├── section-animals-wildlife/
├── section-daily-life/
├── section-daily-life-home/
├── section-colors-style/
├── section-conv-interactions/
├── section-conv-health/
├── section-education/
├── section-professions/
├── section-shopping/
├── section-conv-practical/
├── section-admin-finance/
├── section-grammar-verbs/
├── section-conv-city/
├── section-opinions-social/
├── section-leisure-sports/
├── section-technology/
├── section-idioms-social/
├── section-grammar-syntax/
├── section-travel-transport/
├── section-restaurant-social/
├── section-weather-nature/
├── section-advanced-grammar/
└── section-art-culture-history/
    # (28 sections total, ~150+ lessons, 8-12 exercises each)

store/                        # Zustand state
├── authStore.ts             # Session, user, guest mode
├── progressStore.ts         # Completed lessons, streaks, accuracy
├── settingsStore.ts         # Sound, reminders, username, avatar
└── completionStore.ts       # Transient post-lesson data

hooks/
├── useProgress.ts           # Progress tracking
├── useExerciseSession.ts    # Exercise flow management
├── useHearts.ts             # Hearts system (5 max, 30-min regen)
├── useSound.ts              # Audio + TTS
├── useAdManager.ts          # AdMob integration
├── useDailyReminder.ts      # Notification scheduling
└── useNetworkSync.ts        # Wi-Fi-only Supabase sync

utils/
├── storage.ts               # AsyncStorage wrapper with typed keys
├── supabase.ts              # Supabase client (lazy singleton)
├── notifications.ts         # Push notification service
├── rtl.ts                   # Urdu RTL text styling helper
└── shuffle.ts               # Array shuffle utility

constants/
├── colors.ts                # Color palette
├── fonts.ts                 # Font families (Nunito + NotoNastaliqUrdu)
├── layout.ts                # Spacing, radii, shadows
├── sounds.ts                # Sound asset paths
└── Ads.ts                   # AdMob config
```

---

## App Flow

### Navigation
```
Root Layout (auth check)
├── Guest or Authenticated → Tab Navigator
│   ├── Tab 1: Home (lesson path tree)
│   │   └── Tap lesson → lesson/[id] (exercise session)
│   │       └── Complete → completion.tsx (celebration + stats)
│   ├── Tab 2: Vocabulary (topic grid)
│   │   └── Tap topic → vocabulary/[topic] (flashcards)
│   └── Tab 3: Profile (stats, settings, auth)
│       └── Login/Register if guest
└── Not Authenticated → auth/login or auth/register
```

### Lesson Flow
1. User taps an unlocked lesson node on the home path
2. Opens `lesson/[id].tsx` which loads exercises via `useExerciseSession`
3. Exercises are presented one by one (VocabularyCard → MultipleChoice → TrueFalse → SentenceReconstruction)
4. `ExerciseWrapper` shows progress bar + hearts at top
5. Wrong answers lose a heart; 0 hearts = session ends
6. On completion → navigate to `completion.tsx` with score, accuracy, hearts lost
7. Completion screen shows confetti, stats, and optional rewarded ad for hearts

### Hearts System
- 5 max hearts, displayed in HeartBar
- Lose 1 per wrong answer
- Regenerate 1 every 30 minutes
- Watch rewarded ad to refill all 5
- Persisted in AsyncStorage with regen timestamp

### Streak System
- Track consecutive days of completing at least 1 lesson
- Longest streak recorded
- Displayed on home screen via StreakWidget

---

## Exercise Types

### 1. VocabularyCard (Flashcard)
- Front: Italian word + emoji + pronunciation bracket
- Back: Urdu translation + example sentences (both languages)
- 3D flip animation on tap
- Speaker icon for TTS pronunciation
- "Know It" / "Need Practice" buttons

### 2. MultipleChoice
- Question in Urdu or Italian
- 4 options to choose from
- Immediate feedback (green correct / red incorrect)

### 3. TrueFalse
- Statement like "Arrivederci = goodbye"
- True or False buttons
- Explanation on wrong answer

### 4. SentenceReconstruction
- Given a sentence, arrange shuffled word tiles in correct order
- Supports Italian→Urdu and Urdu→Italian directions
- Includes decoy words to increase difficulty

---

## Data Model

### Exercise (data/types.ts)
```typescript
type ExerciseType = 'VocabularyCard' | 'MultipleChoice' | 'TrueFalse' | 'SentenceReconstruction'

// VocabularyCard
{ id, type, italian, urdu, emoji, pronunciation, exampleItalian, exampleUrdu }

// MultipleChoice
{ id, type, question, options: string[], correctAnswer }

// TrueFalse
{ id, type, statement, isTrue, correctAnswer? (explanation) }

// SentenceReconstruction
{ id, type, question, correctSequence: string[], shuffledWords: string[], direction }
```

### Lesson & Section
```typescript
interface Lesson {
  id: string           // e.g., "lesson-1"
  title: string        // e.g., "Greetings & Basics"
  description: string  // Urdu description
  icon: string         // emoji
  exercises: Exercise[] // 8-12 per lesson
}

interface Section {
  id: string
  title: string
  subtitle: string     // Urdu
  icon: string         // emoji
  lessons: Lesson[]    // 4-6 per section
}
```

---

## Current Design System

### Colors (constants/colors.ts)
- **Primary**: #3D9970 (olive green)
- **Error**: #D94F3D (red)
- **Warning**: #E8923D (orange)
- **Gold**: #F0A500 (rewards/XP)
- **Indigo**: #6366F1 (secondary)
- **Background**: #F0EDE8 (warm off-white)
- **Text**: #1A1A2E (dark)
- Warm, earthy palette inspired by Italian + South Asian aesthetics

### Typography (constants/fonts.ts)
- **Latin text**: Nunito (Regular, SemiBold, Bold, ExtraBold)
- **Urdu text**: NotoNastaliqUrdu (Nastaliq script)
- Larger sizes for Urdu legibility

### Layout (constants/layout.ts)
- Spacing scale: 2px → 48px
- Border radii: 4px → 100px (round)
- Shadow presets: none, xs, card, button, elevated
- 44px minimum touch targets (WCAG)

### Styling Method
- React Native `StyleSheet.create()` with inline styles
- Reanimated for animations
- Expo LinearGradient for gradients
- No external UI library (all custom components)

---

## State Management (Zustand)

### authStore
- `session`, `user`, `isGuest`
- `initialize()`, `signOut()`, `setGuest()`

### progressStore
- `completedLessons: string[]`, `masteredWords`, `weakWords`
- `streak`, `longestStreak`, `totalExercises`, `correctExercises`
- `completeLesson()`, `markWordMastered()`, `recordExerciseResult()`
- Loads from AsyncStorage, syncs to Supabase in background (Wi-Fi only)

### settingsStore
- `soundEnabled`, `dailyReminderEnabled`, `username`, `avatar`

### completionStore
- `data: { lessonId, score, answers, heartsLost }` (transient, cleared after viewing)

---

## Backend (Supabase)

- **Auth**: Email/password sign-up/login
- **Database**: `profiles` table (id, username, email)
- **Sync**: Progress and settings synced to Supabase in background (Wi-Fi only)
- **Guest mode**: Fully local, no Supabase interaction until user registers

---

## Monetization (AdMob)

- **Rewarded ads**: Watch to refill hearts (shown in completion screen and profile)
- **Interstitial ads**: Full-screen ad after lesson completion (~50% chance)
- Ad unit IDs configured per platform (iOS/Android) in .env

---

## Key Behaviors & Patterns

1. **Offline-first**: Everything works without internet. Supabase sync is optional/background.
2. **Lazy loading**: Lesson exercises loaded on-demand via `lesson-loader.ts` (not all at once).
3. **Guest mode**: Full functionality without account. Can upgrade later.
4. **Bilingual UI**: Tab labels in Urdu (گھر, الفاظ, پروفائل), descriptions in Urdu, content in Italian+Urdu.
5. **RTL support**: Urdu text uses RTL alignment via `utils/rtl.ts`.
6. **Vocabulary extraction**: Vocab topics are dynamically extracted from lesson VocabularyCard exercises.
7. **Locked content**: Lessons unlock sequentially. Vocabulary topics unlock when their lesson is completed.

---

## What Needs Revamping

The UI/UX needs a complete visual overhaul including:
- **Page layouts & visual hierarchy** across all screens
- **Card designs** (flashcards, lesson nodes, vocabulary topics)
- **Exercise UI** (multiple choice, true/false, sentence reconstruction)
- **Navigation flow** and transitions between screens
- **Home screen** lesson path/tree design
- **Completion/celebration screen**
- **Profile screen** layout and stats presentation
- **Overall visual language**: colors, spacing, typography, animations
- **Component consistency** and design system refinement

The functional logic, data layer, state management, and backend integration should remain intact — only the visual presentation and user experience flow need to change.


-- PROMPT

Act as a UX designer and help me to improve this learning app for non italian users, from urdu to italian, like Duolingo, currenrltly the app looks cluttered, bit bording and emotionless and we need to improve, there are a lot of UX and UI things out of place, let's work to fix this, analze the MD file and the context of the app the screens and then start writing the HTML for the new style ad facsimil of the app so we can iterate on the design and then use it on the real app, we need to define a color palette, a new fornt ( much more modern and unique, for urdu as well ) + the style, 