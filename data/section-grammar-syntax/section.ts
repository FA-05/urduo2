import { Section } from '../types';
import { lesson as prepositions } from './lesson-1-prepositions';
import { lesson as essereAvere } from './lesson-2-essere-avere';
import { lesson as adverbs } from './lesson-3-adverbs';
import { lesson as conjunctions } from './lesson-4-conjunctions';

export const section: Section = {
  id: "grammar-syntax",
  title: "قواعد: جملے بنانا",
  subtitle: "Grammar: Sentence Building",
  lessons: [prepositions, essereAvere, adverbs, conjunctions]
};
