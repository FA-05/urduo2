import { Section } from '../types';
import { lesson as food } from './lesson-12-objects-food';
import { lesson as home } from './lesson-13-objects-home';
import { lesson as adjectives } from './lesson-14-adjectives';
import { lesson as colors1 } from './lesson-15-colors-part1';
import { lesson as colors2 } from './lesson-16-colors-part2';

export const section: Section = {
  id: "daily-life",
  title: "روزمرہ کی زندگی",
  subtitle: "Daily Life",
  lessons: [
    food,
    home,
    adjectives,
    colors1,
    colors2
  ]
};
