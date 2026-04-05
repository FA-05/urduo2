/**
 * vocabulary.ts
 *
 * Vocabulary helpers. The master word list and topic groupings are built
 * lazily on first access using the lesson loader so that exercise data is
 * not parsed at app startup.
 */

import { orderedSectionsMeta } from './registry-meta';
import { getLessonExercises } from './lesson-loader';
import { VocabularyCardExercise } from './types';

export interface VocabularyWord {
  id: string;
  italian: string;
  urdu: string;
  emoji: string;
  pronunciation: string;
  exampleItalian: string;
  exampleUrdu: string;
}

export interface VocabularyTopic {
  title: string;
  words: VocabularyWord[];
  lessonId: string;
}

export interface SectionVocabulary {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  topics: VocabularyTopic[];
}

// ── Internal helpers ────────────────────────────────────────────────────────

function toWord(ex: VocabularyCardExercise): VocabularyWord {
  return {
    id: ex.id,
    italian: ex.italian,
    urdu: ex.urdu,
    emoji: ex.emoji,
    pronunciation: ex.pronunciation,
    exampleItalian: ex.exampleItalian,
    exampleUrdu: ex.exampleUrdu,
  };
}

// ── Lazy-cached master list ─────────────────────────────────────────────────

let _masterVocabularyList: VocabularyWord[] | null = null;

export const extractVocabulary = (): VocabularyWord[] => {
  if (_masterVocabularyList) return _masterVocabularyList;

  const vocab: VocabularyWord[] = [];

  for (const section of orderedSectionsMeta) {
    for (const lessonMeta of section.lessons) {
      const exercises = getLessonExercises(lessonMeta.id);
      if (!exercises) continue;
      for (const ex of exercises) {
        if (ex.type === 'VocabularyCard') {
          vocab.push(toWord(ex as VocabularyCardExercise));
        }
      }
    }
  }

  _masterVocabularyList = vocab;
  return vocab;
};

/**
 * All vocabulary words across every lesson (lazily loaded on first call).
 * After the first call the result is identical to a plain array — fully
 * spreadable, iterable, and indexable without any Proxy overhead.
 */
export const getMasterVocabularyList = (): VocabularyWord[] => extractVocabulary();

/**
 * @deprecated Use getMasterVocabularyList() for lazy loading.
 * Kept as a thin wrapper so existing call sites compile without changes.
 */
export const masterVocabularyList: VocabularyWord[] = new Proxy([] as VocabularyWord[], {
  get(_target, prop, receiver) {
    return Reflect.get(extractVocabulary(), prop, receiver);
  },
});

export const getWordById = (id: string): VocabularyWord | undefined =>
  extractVocabulary().find((w) => w.id === id);

// ── Lazy-cached topic list ──────────────────────────────────────────────────

let _topicsCache: VocabularyTopic[] | null = null;

export const getVocabularyByTopic = (): VocabularyTopic[] => {
  if (_topicsCache) return _topicsCache;

  const topics: VocabularyTopic[] = [];

  for (const section of orderedSectionsMeta) {
    for (const lessonMeta of section.lessons) {
      const exercises = getLessonExercises(lessonMeta.id);
      if (!exercises) continue;

      const words: VocabularyWord[] = [];
      for (const ex of exercises) {
        if (ex.type === 'VocabularyCard') {
          words.push(toWord(ex as VocabularyCardExercise));
        }
      }

      if (words.length > 0) {
        topics.push({ title: lessonMeta.title, words, lessonId: lessonMeta.id });
      }
    }
  }

  _topicsCache = topics;
  return topics;
};

export const getVocabularyForTopic = (title: string): VocabularyWord[] => {
  const topic = getVocabularyByTopic().find((t) => t.title === title);
  return topic ? topic.words : [];
};

// ── Lazy-cached section vocabulary ──────────────────────────────────────────

let _sectionVocabCache: SectionVocabulary[] | null = null;

export const getVocabularyBySection = (): SectionVocabulary[] => {
  if (_sectionVocabCache) return _sectionVocabCache;

  const sectionVocab: SectionVocabulary[] = [];

  for (const sectionMeta of orderedSectionsMeta) {
    const topics: VocabularyTopic[] = [];

    for (const lessonMeta of sectionMeta.lessons) {
      const exercises = getLessonExercises(lessonMeta.id);
      if (!exercises) continue;

      const words: VocabularyWord[] = [];
      for (const ex of exercises) {
        if (ex.type === 'VocabularyCard') {
          words.push(toWord(ex as VocabularyCardExercise));
        }
      }

      if (words.length > 0) {
        topics.push({ title: lessonMeta.title, words, lessonId: lessonMeta.id });
      }
    }

    if (topics.length > 0) {
      sectionVocab.push({
        id: sectionMeta.id,
        title: sectionMeta.title,
        subtitle: sectionMeta.subtitle,
        icon: sectionMeta.icon,
        topics,
      });
    }
  }

  _sectionVocabCache = sectionVocab;
  return sectionVocab;
};