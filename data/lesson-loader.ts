/**
 * lesson-loader.ts
 *
 * Loads lesson exercise data on demand (lazy) and caches the result.
 */

import { Exercise } from './types';

const cache = new Map<string, Exercise[]>();

const lessonLoaders: Record<string, () => Exercise[]> = {
  // ── Foundations ──────────────────────────────────────────────────────────
  'lesson-1':  () => require('./section-foundations/lesson-01-greetings').lesson.exercises,
  'lesson-2':  () => require('./section-foundations/lesson-02-pronouns-singular').lesson.exercises,
  'lesson-3':  () => require('./section-foundations/lesson-03-pronouns-plural').lesson.exercises,
  'lesson-4':  () => require('./section-foundations/lesson-04-numbers-1-5').lesson.exercises,
  'lesson-5':  () => require('./section-foundations/lesson-05-polite-expressions').lesson.exercises,
  'lesson-6':  () => require('./section-foundations/lesson-06-introductions').lesson.exercises,

  // ── Essential Grammar ─────────────────────────────────────────────────────
  'lesson-7':  () => require('./section-essential-grammar/lesson-07-numbers-6-10').lesson.exercises,
  'lesson-8':  () => require('./section-essential-grammar/lesson-08-articles-masc').lesson.exercises,
  'lesson-9':  () => require('./section-essential-grammar/lesson-09-articles-fem').lesson.exercises,
  'lesson-10': () => require('./section-essential-grammar/lesson-10-essere-part1').lesson.exercises,
  'lesson-11': () => require('./section-essential-grammar/lesson-11-essere-part2').lesson.exercises,

  // ── The Human Body ────────────────────────────────────────────────────────
  'body-l1': () => require('./section-body-parts/lesson-1-face-head').lesson.exercises,
  'body-l2': () => require('./section-body-parts/lesson-2-torso-limbs').lesson.exercises,
  'body-l3': () => require('./section-body-parts/lesson-3-internal-organs').lesson.exercises,
  'body-l4': () => require('./section-body-parts/lesson-4-body-plurals').lesson.exercises,

  // ── Family & Emotions ─────────────────────────────────────────────────────
  'family-l1': () => require('./section-family-emotions/lesson-1-family-close').lesson.exercises,
  'family-l2': () => require('./section-family-emotions/lesson-2-family-extended').lesson.exercises,
  'family-l3': () => require('./section-family-emotions/lesson-3-feelings').lesson.exercises,
  'family-l4': () => require('./section-family-emotions/lesson-4-relationships').lesson.exercises,

  // ── Animals & Wildlife ───────────────────────────────────────────────────
  'animals-l1': () => require('./section-animals-wildlife/lesson-01-pets').lesson.exercises,
  'animals-l2': () => require('./section-animals-wildlife/lesson-02-wild').lesson.exercises,
  'animals-l3': () => require('./section-animals-wildlife/lesson-03-farm').lesson.exercises,
  'animals-l4': () => require('./section-animals-wildlife/lesson-04-birds').lesson.exercises,

  // ── Daily Life (Basic) ────────────────────────────────────────────────────
  'lesson-12': () => require('./section-daily-life/lesson-12-objects-food').lesson.exercises,
  'lesson-13': () => require('./section-daily-life/lesson-13-objects-home').lesson.exercises,
  'lesson-14': () => require('./section-daily-life/lesson-14-adjectives').lesson.exercises,

  // ── Everyday Interactions ────────────────────────────────────────────────
  'conv1-l1': () => require('./section-conv-interactions/lesson-1-meeting').lesson.exercises,
  'conv1-l2': () => require('./section-conv-interactions/lesson-2-time').lesson.exercises,
  'conv1-l3': () => require('./section-conv-interactions/lesson-3-requests').lesson.exercises,
  'conv1-l4': () => require('./section-conv-interactions/lesson-4-origin').lesson.exercises,

  // ── Colors & Style ────────────────────────────────────────────────────────
  'colors-l1': () => require('./section-colors-style/lesson-1-colors-basic').lesson.exercises,
  'colors-l2': () => require('./section-colors-style/lesson-2-shades-patterns').lesson.exercises,
  'colors-l3': () => require('./section-colors-style/lesson-3-clothes-basic').lesson.exercises,
  'colors-l4': () => require('./section-colors-style/lesson-4-accessories').lesson.exercises,

  // ── Home & Living ─────────────────────────────────────────────────────────
  'sec11-l1': () => require('./section-daily-life-home/lesson-01-rooms').lesson.exercises,
  'sec11-l2': () => require('./section-daily-life-home/lesson-02-furniture').lesson.exercises,
  'sec11-l3': () => require('./section-daily-life-home/lesson-03-kitchen').lesson.exercises,

  // ── Health & Wellbeing ─────────────────────────────────────────────────────
  'health-l1': () => require('./section-health-wellness/lesson-1-symptoms').lesson.exercises,
  'health-l2': () => require('./section-health-wellness/lesson-2-at-hospital').lesson.exercises,
  'health-l3': () => require('./section-health-wellness/lesson-3-treatments').lesson.exercises,
  'health-l4': () => require('./section-health-wellness/lesson-4-hygiene').lesson.exercises,

  // ── Health & Emergency Dialogue ──────────────────────────────────────────
  'conv3-l1': () => require('./section-conv-health/lesson-1-ambulance').lesson.exercises,
  'conv3-l2': () => require('./section-conv-health/lesson-2-pharmacy').lesson.exercises,
  'conv3-l3': () => require('./section-conv-health/lesson-3-pain').lesson.exercises,
  'conv3-l4': () => require('./section-conv-health/lesson-4-first-aid').lesson.exercises,

  // ── Education ─────────────────────────────────────────────────────────────
  'sec5-l1': () => require('./section-education/lesson-01-school-basics').lesson.exercises,
  'sec5-l2': () => require('./section-education/lesson-02-classroom-tools').lesson.exercises,
  'sec5-l3': () => require('./section-education/lesson-03-study-exams').lesson.exercises,
  'sec5-l4': () => require('./section-education/lesson-04-higher-ed').lesson.exercises,

  // ── Professions ───────────────────────────────────────────────────────────
  'sec6-l1': () => require('./section-professions/lesson-01-intro').lesson.exercises,
  'sec6-l2': () => require('./section-professions/lesson-02-advanced').lesson.exercises,
  'sec6-l3': () => require('./section-professions/lesson-03-office').lesson.exercises,

  // ── Shopping ──────────────────────────────────────────────────────────────
  'sec7-l1': () => require('./section-shopping/lesson-01-intro').lesson.exercises,
  'sec7-l2': () => require('./section-shopping/lesson-02-prices').lesson.exercises,
  'sec7-l3': () => require('./section-shopping/lesson-03-grocery').lesson.exercises,

  // ── Practical Contexts ────────────────────────────────────────────────────
  'conv2-l1': () => require('./section-conv-practical/lesson-1-shop').lesson.exercises,
  'conv2-l2': () => require('./section-conv-practical/lesson-2-problem').lesson.exercises,
  'conv2-l3': () => require('./section-conv-practical/lesson-3-work').lesson.exercises,
  'conv2-l4': () => require('./section-conv-practical/lesson-4-appointment').lesson.exercises,

  // ── Administrative & Finance ──────────────────────────────────────────────
  'admin-l1': () => require('./section-admin-finance/lesson-1-documents').lesson.exercises,
  'admin-l2': () => require('./section-admin-finance/lesson-2-banking').lesson.exercises,
  'admin-l3': () => require('./section-admin-finance/lesson-3-services').lesson.exercises,
  'admin-l4': () => require('./section-admin-finance/lesson-4-work-salary').lesson.exercises,

  // ── Intermediate Grammar: Verbs ──────────────────────────────────────────
  'sec12-l4': () => require('./section-grammar-verbs/lesson-1-are-verbs').lesson.exercises,
  'gram1-l2': () => require('./section-grammar-verbs/lesson-2-ere-verbs').lesson.exercises,
  'gram1-l3': () => require('./section-grammar-verbs/lesson-3-ire-verbs').lesson.exercises,
  'gram1-l4': () => require('./section-grammar-verbs/lesson-4-modals').lesson.exercises,

  // ── City & Neighborly Talk ────────────────────────────────────────────────
  'conv4-l1': () => require('./section-conv-city/lesson-1-neighbor').lesson.exercises,
  'conv4-l2': () => require('./section-conv-city/lesson-2-directions').lesson.exercises,
  'conv4-l3': () => require('./section-conv-city/lesson-3-services').lesson.exercises,
  'conv4-l4': () => require('./section-conv-city/lesson-4-area').lesson.exercises,

  // ── Opinions & Social Talk ───────────────────────────────────────────────
  'opinions-l1': () => require('./section-opinions-social/lesson-01-opinions').lesson.exercises,
  'opinions-l2': () => require('./section-opinions-social/lesson-02-agreement').lesson.exercises,
  'opinions-l3': () => require('./section-opinions-social/lesson-03-advice').lesson.exercises,
  'opinions-l4': () => require('./section-opinions-social/lesson-04-doubts').lesson.exercises,

  // ── Leisure & Sports ──────────────────────────────────────────────────────
  'sec8-l1': () => require('./section-leisure-sports/lesson-01-hobbies').lesson.exercises,
  'sec8-l2': () => require('./section-leisure-sports/lesson-02-sports').lesson.exercises,
  'sec8-l3': () => require('./section-leisure-sports/lesson-03-travel').lesson.exercises,
  'sec8-l4': () => require('./section-leisure-sports/lesson-04-entertainment').lesson.exercises,

  // ── Technology ────────────────────────────────────────────────────────────
  'sec9-l1': () => require('./section-technology/lesson-01-basics').lesson.exercises,
  'sec9-l2': () => require('./section-technology/lesson-02-internet').lesson.exercises,
  'sec9-l3': () => require('./section-technology/lesson-03-devices').lesson.exercises,
  'sec9-l4': () => require('./section-technology/lesson-04-apps').lesson.exercises,

  // ── Idioms & Social Nuances ───────────────────────────────────────────────
  'idioms-l1': () => require('./section-idioms-social/lesson-1-fillers').lesson.exercises,
  'idioms-l2': () => require('./section-idioms-social/lesson-2-idioms').lesson.exercises,
  'idioms-l3': () => require('./section-idioms-social/lesson-3-social').lesson.exercises,
  'idioms-l4': () => require('./section-idioms-social/lesson-4-slang').lesson.exercises,

  // ── Grammar: Sentence Building ────────────────────────────────────────────
  'sec12-l5': () => require('./section-grammar-syntax/lesson-1-prepositions').lesson.exercises,
  'sec12-l2': () => require('./section-grammar-syntax/lesson-2-essere-avere').lesson.exercises,
  'gram2-l3': () => require('./section-grammar-syntax/lesson-3-adverbs').lesson.exercises,
  'gram2-l4': () => require('./section-grammar-syntax/lesson-4-conjunctions').lesson.exercises,

  // ── Travel & Transport ────────────────────────────────────────────────────
  'sec13-l1': () => require('./section-travel-transport/lesson-01-airport').lesson.exercises,
  'sec13-l2': () => require('./section-travel-transport/lesson-02-transit').lesson.exercises,
  'sec13-l3': () => require('./section-travel-transport/lesson-03-driving').lesson.exercises,

  // ── Restaurant & Social ───────────────────────────────────────────────────
  'sec14-l1': () => require('./section-restaurant-social/lesson-01-restaurant').lesson.exercises,
  'sec14-l2': () => require('./section-restaurant-social/lesson-02-social').lesson.exercises,
  'sec14-l3': () => require('./section-restaurant-social/lesson-03-cuisine').lesson.exercises,

  // ── Weather & Nature ──────────────────────────────────────────────────────
  'sec15-l1': () => require('./section-weather-nature/lesson-01-weather').lesson.exercises,
  'sec15-l2': () => require('./section-weather-nature/lesson-02-nature').lesson.exercises,
  'sec15-l3': () => require('./section-weather-nature/lesson-03-seasons').lesson.exercises,

  // ── Advanced Syntax ──────────────────────────────────────────────────────
  'sec12-l1': () => require('./section-advanced-grammar/lesson-01-pronouns').lesson.exercises,
  'sec12-l3': () => require('./section-advanced-grammar/lesson-03-articles-plurals').lesson.exercises,
  'adv-gram-l4': () => require('./section-advanced-grammar/lesson-04-past-tense-1').lesson.exercises,
  'adv-gram-l5': () => require('./section-advanced-grammar/lesson-05-past-tense-2').lesson.exercises,

  // ── Art, Culture & History ────────────────────────────────────────────────
  'sec16-l1': () => require('./section-art-culture-history/lesson-01-art-music').lesson.exercises,
  'sec16-l2': () => require('./section-art-culture-history/lesson-02-books-lit').lesson.exercises,
  'sec16-l3': () => require('./section-art-culture-history/lesson-03-cinema-theater').lesson.exercises,
  'sec16-l4': () => require('./section-art-culture-history/lesson-04-history-traditions').lesson.exercises,
  'sec16-l5': () => require('./section-art-culture-history/lesson-05-festivals-events').lesson.exercises,
};

export const getLessonExercises = (id: string): Exercise[] | null => {
  if (cache.has(id)) return cache.get(id)!;
  const loader = lessonLoaders[id];
  if (!loader) return null;
  const exercises = loader();
  cache.set(id, exercises);
  return exercises;
};

export const prefetchLesson = (id: string): void => {
  if (!cache.has(id) && lessonLoaders[id]) {
    getLessonExercises(id);
  }
};
