import { Section } from '../types';
import { lesson as pronouns } from './lesson-01-pronouns';
import { lesson as articlesPlurals } from './lesson-03-articles-plurals';
import { lesson as pastTense1 } from './lesson-04-past-tense-1';
import { lesson as pastTense2 } from './lesson-05-past-tense-2';

export const section: Section = {
  id: "advanced-grammar",
  title: "اعلیٰ قواعد",
  subtitle: "Advanced Syntax",
  lessons: [pronouns, articlesPlurals, pastTense1, pastTense2]
};
